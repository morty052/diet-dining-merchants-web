import Header from "./partials/Header";
import HomeHero from "./partials/HomeHero";

export function Home() {
  return (
    <div className="min-h-screen pb-10 bg-darkGrey">
      <Header />
      <HomeHero />
    </div>
  );
}
