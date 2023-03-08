import Head from "next/head"
import { useState, useEffect, useRef } from "react"
import { PulseLoader } from "react-spinners"

import "../styles/globals.css"

import axios from "axios"
import Select from "react-select"
import Chatbox from "../components/Chatbox"
import Footer from "../components/Footer"
import ErrorNotification from "../components/ErrorNotification"

export default function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [promptInput, setPromptInput] = useState("")
  const [finalPrompt, setFinalPrompt] = useState("")
  const [game, setGame] = useState("League of Legends")

  const [characters, setCharacters] = useState([])
  const [character, setCharacter] = useState("")

  const [options, setOptions] = useState([])
  const [result, setResult] = useState()
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState("")

  const inputRef = useRef(null)

  const games = [{ name: "League of Legends" }, { name: "Team Fortress 2" }]
  const gameOptions = games.map((game) => ({
    value: game.name,
    label: game.name,
  }))

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  //get characters depending on selected game
  async function getCharacters() {
    try {
      if (game === "League of Legends") {
        const response = await axios.get(
          `https://ddragon.leagueoflegends.com/cdn/13.4.1/data/en_US/champion.json`
        )
        setCharacters(Object.values(response.data.data))
        setOptions(
          Object.values(response.data.data).map((character) => ({
            value: character,
            label: character.name,
          }))
        )
      } else {
        const response = await axios.get("/api/tf2characters")
        setCharacters(response.data)
        setOptions(
          response.data.characters.map((character) => ({
            value: character,
            label: character.name,
          }))
        )
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getCharacters()
  }, [])

  useEffect(() => {
    getCharacters()
    setCharacter("")
  }, [game])

  async function onSubmit(event) {
    event.preventDefault()
    try {
      setLoading(true)
      const response = await axios.post(
        "/api/generate",
        JSON.stringify({
          prompt: promptInput,
          character: character.name,
          game,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      const data = response.data

      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }

      setResult(data.result)
      setFinalPrompt(promptInput)
      setPromptInput("")
      setLoading(false)
    } catch (error) {
      console.error(error)
      if (error.response.data) {
        console.error(error.response)
        setError(error.response.data.error.message)
        setTimeout(() => {
          setError("")
        }, 5000)
      } else if (error.message) {
        setError("Please try again later", error.message)
        setTimeout(() => {
          setError("")
        }, 5000)
      } else {
        console.loerror(error)
      }
      setLoading(false)
    }
  }

  const handleCharacterChange = (e) => {
    //if valid option
    const optionExists = options.some((option) => option.value === e.value)
    if (optionExists) {
      setCharacter(e.value)
    }
  }

  const handleGameChange = (e) => {
    //if valid option
    const optionExists = gameOptions.some((option) => option.value === e.value)

    if (optionExists) {
      console.log("gamechange")
      setGame(e.value)
    }
  }

  return (
    <div className={` ${darkMode && "dark"}`}>
      <div
        className={` flex flex-col items-center min-h-screen app-container dark:bg-darkMode-100 `}
      >
        <Head>
          <title>NPC-Chat</title>
        </Head>

        <main
          className={` flex flex-col  flex-grow items-center pt-6 w-11/12 max-w-3xl`}
        >
          <h3 className="text-3xl leading-8 font-bold text-leagueBlue-400 dark:text-darkMode-300 mt-2 mb-6 ">
            NPC-Chat
          </h3>
          {error && <ErrorNotification error={error} />}
          <div className="w-11/12 flex flex-row justify-center">
            <Select
              options={gameOptions}
              value={game}
              onChange={handleGameChange}
              noOptionsMessage={() => null}
              clearValueOnReset={false}
              id="long-value-select"
              instanceId="long-value-select"
              placeholder={game ? game : "Select game"}
              className="w-3/6 px-1"
            />{" "}
            <Select
              options={options}
              value={character.id}
              onChange={handleCharacterChange}
              noOptionsMessage={() => null}
              clearValueOnReset={false}
              id="long-value-select"
              instanceId="long-value-select"
              placeholder={character.name ? character.name : "Select character"}
              className="w-3/6 px-1"
            />{" "}
            <button
              onClick={() => toggleDarkMode()}
              className="dark:text-darkMode-600"
            >
              {darkMode ? (
                <img src="/lightmode.png" width={"36px"} />
              ) : (
                <img src="/darkmode.png" width={"36px"} />
              )}
            </button>
          </div>
          <div className="flex flex-col items-center p-2 dark:text-darkMode-600">
            {character && (
              <>
                <p>
                  Chatting with <b>{character.name}</b>
                </p>
              </>
            )}
          </div>
          <Chatbox
            character={character}
            result={result}
            prompt={finalPrompt}
            inputRef={inputRef}
            game={game}
          />
          <form onSubmit={onSubmit} className="flex flex-col w-11/12">
            <div className="w-full relative inline-block">
              <input
                type="text"
                id="prompt-field"
                ref={inputRef}
                name="prompt"
                placeholder="Send message"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                disabled={loading ? true : false}
                className="leading-6  py-3 pl-2 border border-leagueBlue-400 rounded mb-4 w-full"
              />
            </div>

            <button
              type="submit"
              disabled={loading ? true : false}
              className={`leading-6 py-3 text-white bg-leagueBlue-400 rounded dark:bg-darkMode-300 dark:text-darkMode-700 ${
                !loading ? "cursor-pointer" : "cursor-default"
              }`}
            >
              {loading ? (
                <PulseLoader
                  color={"#FFFFFF"}
                  loading={loading}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Send message"
              )}
            </button>
          </form>
          <p className="text-sm pt-1 dark:text-darkMode-600 ">
            If your request keeps failing, try again later as the OpenAI servers
            might be busy.
          </p>
        </main>
        <Footer />
      </div>
    </div>
  )
}
