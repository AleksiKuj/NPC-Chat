const Prompt = ({ prompt }) => {
  return (
    <>
      {prompt && (
        <div className="flex items-center w-full justify-end py-2 bg-slate-100 dark:bg-darkMode-100 dark:text-darkMode-600  ">
          <p className="float-right px-5">{prompt}</p>

          <img
            src={"/poro.png"}
            alt="poro"
            className="rounded-full w-14 sm:w-16 md:w-20 mx-2"
          />
        </div>
      )}
    </>
  )
}
export default Prompt
