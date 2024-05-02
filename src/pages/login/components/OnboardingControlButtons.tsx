import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";

function OnboardingControlbuttons({
  onClick,
  title,
  customPrev,
  customPrevFunc,
}: {
  onClick: () => void;
  title?: string;
  customPrevFunc?: () => void;
  customPrev?: boolean;
}) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between  pt-4">
      <Button
        onClick={() => {
          if (customPrev && customPrevFunc) {
            customPrevFunc();
            return;
          }
          console.log("vvvv");
          navigate(-1);
        }}
        className="bg-white text-black"
      >
        <ArrowLeft />
      </Button>
      <Button
        onClick={() => {
          onClick();
        }}
        className="w-48 bg-white text-black"
      >
        {title ? title : "Next"}
      </Button>
    </div>
  );
}

export default OnboardingControlbuttons;
