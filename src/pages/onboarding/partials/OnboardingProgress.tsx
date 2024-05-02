import { CheckCircle, Hourglass } from "lucide-react";

function OnboardingProgressDisplay() {
  return (
    <div className=" mx-auto">
      <div className="flex justify-between items-center relative">
        <div className="flex flex-col items-center  w-fit  z-20 gap-y-2">
          <div className="h-10 w-10 grid place-content-center rounded-full bg-light">
            <CheckCircle className="text-green-500 " />
          </div>
          <p className="text-light font-medium text-center text-xs md:text-base">
            Email Verified
          </p>
        </div>
        <div className="flex flex-col items-center  w-fit  z-20 gap-y-2">
          <div className="h-10 w-10 grid place-content-center rounded-full bg-light">
            <Hourglass className="text-green-500" />
          </div>
          <p className="text-light font-medium text-center text-xs md:text-base">
            Set up store
          </p>
        </div>
        <div className="flex flex-col items-center  w-fit  z-20 gap-y-2">
          <div className="h-10 w-10 grid place-content-center rounded-full bg-light">
            <Hourglass className="text-green-500" />
          </div>
          <p className="text-light font-medium text-center text-xs md:text-base">
            Wait for Review
          </p>
        </div>

        {/* LINE */}
        <div className="absolute left-10 right-10 h-1 bg-light/80 top-5 flex items-center "></div>
      </div>
    </div>
  );
}

export default OnboardingProgressDisplay;
