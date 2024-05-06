import { Footer } from "@/components";
import Cta from "./partials/Cta";
import EnhanceReach from "./partials/EnhanceReach";
import Header from "./partials/Header";
import HomeHero from "./partials/HomeHero";
import HowItWorks from "./partials/HowItWorks";
import KnowUs from "./partials/KnowUs";
import Growth from "./partials/Growth";
import { Button } from "@/components/ui/button";

export function Home() {
  return (
    <main className="min-h-screen bg-darkGrey">
      <Header />
      <HomeHero />
      <EnhanceReach />
      <div className="space-y-6 xl:space-y-12 pb-10 max-w-6xl mx-auto ">
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
