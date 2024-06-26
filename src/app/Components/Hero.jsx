import Background from "./Background";
import { PhotoOrbit } from "./PhotoOrbit";
import TypeEffect from "./TypeEffect";
function Hero() {
  return (
    <section className="w-full h-screen grid grid-cols-1 md:grid-cols-2 items-center ">
      <div className="flex flex-col justify-center items-center h-full order-2 md:order-1">
        <div className="z-20 py-4">
          <h1 className="font-medium text-2xl md:text-4xl ">
            Build <TypeEffect></TypeEffect>
            with Me!
          </h1>
          <h1 className="font-medium text-4xl md:text-6xl ">Md Imran Hossen</h1>
          <h4 className="font-semibold text-2xl md:text-4xl">
            Software Engineer
          </h4>
          <a
            href="/Md Imran Hossen Resume .pdf"
            target="_blank"
            className="relative inline-flex items-center justify-center mt-4 p-4 px-6 py-3 overflow-hidden text-white font-bold transition duration-300 ease-out border-2 border-blue-700 rounded-xl shadow-md group"
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
                />
              </svg>
            </span>
            <span className="absolute flex items-center justify-center w-full h-ful transition-all duration-300 transform group-hover:translate-x-full ease">
              Download Resume
            </span>
            <span className="relative invisible">Download Resume</span>
          </a>
        </div>
      </div>
      <div className="z-20 order-1 md:order-2">
        <PhotoOrbit></PhotoOrbit>
      </div>
      <Background className="z-10"></Background>
    </section>
  );
}

export default Hero;
