import { CheckCircle, Hourglass } from "lucide-react";

function OnboardingProgressDisplay({ phase }: { phase: number }) {
  return (
    <div className=" mx-auto">
      <div className="flex justify-between items-center relative">
        <div className="flex flex-col items-center  w-fit  z-20 gap-y-2">
          <div className="h-10 w-10 grid place-content-center self-start rounded-full bg-light">
            <CheckCircle className="text-green-500 " />
          </div>
          <div className="">
            <p className="text-light font-medium text-center text-xs md:text-base">
              Verify Email
            </p>
            <p className="text-light  text-left text-xs md:text-sm">Complete</p>
          </div>
        </div>
        <div className="flex flex-col items-center  w-fit  z-20 gap-y-2">
          <div className="h-10 w-10 grid place-content-center rounded-full bg-light">
            {phase != 4 ? (
              <Hourglass className="text-green-500" />
            ) : (
              <CheckCircle className="text-green-500 " />
            )}
          </div>
          <div className="">
            <p className="text-light font-medium text-center text-xs md:text-base">
              Set up store
            </p>
            <p className="text-light  text-center text-xs md:text-sm">
              {phase < 4 ? "In Progress" : "Complete"}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center  w-fit  z-20 gap-y-2">
          <div className="h-10 w-10 grid place-content-center self-end rounded-full bg-light">
            <Hourglass className="text-green-500" />
          </div>
          <div className="">
            <p className="text-light font-medium text-center text-xs md:text-base">
              Wait for Review
            </p>
            <p className="text-light  text-right text-xs md:text-sm">
              Est 1 day
            </p>
          </div>
        </div>

        {/* LINE */}
        <div className="absolute left-10 right-10 h-1 bg-light/80 top-5 flex items-center "></div>
      </div>
    </div>
  );
}

export default OnboardingProgressDisplay;
