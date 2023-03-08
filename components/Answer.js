const Answer = ({ answer, character, game }) => {
  return (
    <>
      {character && answer && (
        <div className="flex items-center py-2 w-full dark:text-darkMode-600">
          {game === "League of Legends" ? (
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/13.4.1/img/champion/${character.id}.png`}
              className="rounded-full mx-2 w-14 h-14 sm:w-16 md:w-20 sm:h-16 md:h-20"
            />
          ) : (
            <img
              src={`/characters/${character.id}.png`}
              className="rounded-full mx-2 w-14 h-14 sm:w-16 md:w-20 sm:h-16 md:h-20"
            />
          )}

          <p className="px-2 whitespace-pre-line">{answer}</p>
        </div>
      )}
    </>
  )
}
export default Answer
