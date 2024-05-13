import { Footer } from "@/components";
import Cta from "./partials/Cta";
import EnhanceReach from "./partials/EnhanceReach";
import Header from "./partials/Header";
import HomeHero from "./partials/HomeHero";
import HowItWorks from "./partials/HowItWorks";
import KnowUs from "./partials/KnowUs";
import Growth from "./partials/Growth";
import { Button } from "@/components/ui/button";
// import Rive from "@rive-app/react-canvas";

// const loGorlv =
//   "https://cdn.sanity.io/files/xnrrhmkl/production/aa3a6cb439b3f4ecf8125493d262661b2e88c3b7.riv";

export function Home() {
  return (
    <main className="min-h-screen bg-darkGrey space-y-6 ">
      <Header />
      <HomeHero />
      {/* <Rive
        // src="https://public.rive.app/community/runtime-files/2195-4346-avatar-pack-use-case.riv"
        src={loGorlv}
        artboard="New Artboard"
        className="w-20 h-20"
        stateMachines="State Machine 1"
      /> */}
      <EnhanceReach />
      <div className="xl:space-y-12 pb-10 max-w-6xl mx-auto px-2 ">
        <HowItWorks />
        <Growth />
        <KnowUs />
      </div>
      <div className="px-2 py-6 bg-green-400 flex justify-center max-w-none">
        <div className="max-w-xl flex items-center flex-col gap-y-4">
          <div className="">
            <h3 className=" text-center font-semibold text-2xl  xl:text-4xl">
              Ready to get started ?{" "}
            </h3>
            <p className="text-center xl:text-lg">
              Get up and running in no time
            </p>
          </div>
          <Button className="text-lg">Sign up</Button>
        </div>
      </div>
      <div className="space-y-6 py-6 xl:space-y-12 pb-10 max-w-6xl mx-auto ">
        <Cta />
      </div>
      <Footer />
    </main>
  );
}
