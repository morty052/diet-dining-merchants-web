import { ArrowUp } from "lucide-react";
import SignupForm from "./SignupForm";

function HomeHero() {
  return (
    <div className="max-w-6xl mx-auto px-2 lg:px-4  lg:grid grid-cols-2 lg:gap-x-5 xl:gap-x-10 items-center  ">
      <div className="pt-8 space-y-4 lg:pb-10 ">
        <div className="">
          <h1 className="text-light font-black text-[45px] leading-[2.5rem] lg:text-5xl">
            Unlock a <span className="text-green-400">stable</span> <br />{" "}
            <span className="text-green-400 ml-2">revenue </span>
            stream
          </h1>
        </div>
        <div className=" bg-lightBlack h-72 rounded-lg p-4 ">
          <div className="space-y-1">
            <p className="text-light font-semibold text-xl">Revenue</p>
            <div className="flex items-center">
              <ArrowUp className="text-green-400" />
              <p className="text-light font-semibold text-5xl">65%</p>
            </div>
            <p className="text-light font-light text-sm">
              + $6,500 from last week
            </p>
          </div>
          <div className="pt-4 lg:pt-0">
            <svg
              className="w-full"
              viewBox="0 0 218 69"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 67.5C27.8998 67.5 24.6002 15 52.5 15C80.3998 15 77.1002 29 105 29C132.9 29 128.6 52 156.5 52C184.4 52 189.127 63.8158 217.027 63.8158"
                stroke="url(#paint0_linear_622:13664)"
                stroke-width="3"
                stroke-linecap="round"
              />
              <path
                d="M0 67.5C27.2601 67.5 30.7399 31 58 31C85.2601 31 80.7399 2 108 2C135.26 2 134.74 43 162 43C189.26 43 190.74 63.665 218 63.665"
                stroke="url(#paint1_linear_622:13664)"
                stroke-width="3"
                stroke-linecap="round"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_622:13664"
                  x1="217.027"
                  y1="15"
                  x2="7.91244"
                  y2="15"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#4DFFDF" />
                  <stop offset="1" stop-color="#4DA1FF" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_622:13664"
                  x1="218"
                  y1="18.3748"
                  x2="5.4362"
                  y2="18.9795"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#E323FF" />
                  <stop offset="1" stop-color="#7517F8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <SignupForm />
    </div>
  );
}

export default HomeHero;
