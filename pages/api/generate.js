import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    })
    return
  }

  const prompt = req.body.prompt || ""
  const character = req.body.character || ""
  const game = req.body.game || ""
  if (
    prompt.trim().length === 0 ||
    character.trim().length === 0 ||
    game.trim().length === 0
  ) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt and select a character",
      },
    })
    return
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are ${character} from ${game}. Always respond and act like ${character} from ${game}. Never break character.`,
        },
        { role: "user", content: prompt },
      ],
      max_tokens: 300, //sets max length of prompt + answer based on tokens
      temperature: 1.0, //0-2, higher values make answers more random
    })
    res.status(200).json({ result: completion.data.choices[0].message.content })
    console.log(completion.data.choices)
    console.log(character, game)
  } catch (error) {
    if (error.response) {
      if (error.response.status === 500) {
        res
          .status(error.response.status)
          .json(
            `Issue on OpenAI servers, try again later. ${error.response.data}`
          )
      }
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message:
            "An error occurred during your request. The service might be busy currently.",
        },
      })
    }
  }
}
