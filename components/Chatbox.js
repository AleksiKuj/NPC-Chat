import { useState, useEffect } from "react"
import Answer from "./Answer"
import Prompt from "./Prompt"

const Chatbox = ({ result, character, prompt, inputRef, game }) => {
  const [answers, setAnswers] = useState([])
  const [prompts, setPrompts] = useState([])
  const [chatbox, setChatbox] = useState(null)

  const reset = () => {
    setAnswers([])
    setPrompts([])
  }

  useEffect(() => {
    setChatbox(document.getElementById("chatbox"))
  }, [])

  useEffect(() => {
    setAnswers((oldAnswers) => [...oldAnswers, result])
    setPrompts((oldPrompts) => [...oldPrompts, prompt])
    if (window.innerWidth > 768) {
      inputRef.current.focus() //auto focus input field
    }
  }, [result])

  useEffect(() => {
    reset()
  }, [character])

  useEffect(() => {
    if (chatbox) {
      chatbox.scrollTo({
        top: chatbox.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [answers])
  return (
    <>
      <div
        className=" dark:bg-darkMode-200 m-5 mt-2 w-11/12 h-[55vh]  max-w-3xl  border border-leagueBlue-400 rounded-lg overflow-y-scroll dark:border-darkMode-200  "
        id="chatbox"
      >
        {prompts.length > 0 &&
          prompts.map((prompt, index) => (
            <div key={index}>
              <Prompt prompt={prompt} />
              <Answer
                answer={answers[index]}
                character={character}
                game={game}
              />
            </div>
          ))}
      </div>
    </>
  )
}
export default Chatbox
