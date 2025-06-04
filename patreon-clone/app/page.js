import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white h-[44vh] gap-4">
        <div className="font-bold flex gap-5 justify-center items-center text-5xl">
          Get me a fund
          <img src="/fund.gif" width={45} alt="fund" /></div>
        <p>A crowdfunding platform for creators. Get funded by your fans and followers. Start now!</p>
        <div>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
          <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white containor mx-auto p-5">
        <h1 className="text-lg font-bold text-center my-4">Your Fans can fund you</h1>
        <div className="flex gap-5 justify-around">
          <div className="item flex flex-col justify-center items-center">
            <img src="/man.svg" className="bg-slate-200 rounded-full p-4 w-30" alt="man" />
            <p>Fund Yourself</p>
          </div>
          <div className="item flex flex-col justify-center items-center">
            <img src="/coin.jpg" className="bg-slate-200 rounded-full p-4 w-30" alt="coin" />
            <p>Fund Yourself</p>
          </div>
          <div className="item flex flex-col justify-center items-center">
            <img src="/group.jpg" className="bg-slate-200 rounded-full p-4 w-30" alt="group" />
            <p>Fans Want to help?</p>
          </div>
        </div>
      </div>
      <div className="bg-white h-1 opacity-10"></div>
      <div className="text-white containor mx-auto p-5 flex justify-center items-center">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/D9Rl9hZhIp0?si=enhdcFMtKo--c8o4" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  );
}
