const Footer = () => {
  return (
    <div className="bg-leagueBlue-400 text-sm text-white mt-6 p-5 w-full text-center dark:bg-darkMode-300 dark:text-darkMode-700">
      <p> Powered by OpenAI gpt-3.5-turbo model.</p>
      <p>
        Training data is only up to September 2021 so newer characters might
        have weird responses. Requests are currently limited to a certain amount
        / minute.
      </p>
    </div>
  )
}
export default Footer
