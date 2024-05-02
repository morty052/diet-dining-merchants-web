import { useState } from "react";
import Header from "../home/partials/Header";
import EmailVerificationForm from "./partials/EmailVerificationForm";
import { Routes, Route, useSearchParams } from "react-router-dom";
import OtpInput from "../login/components/OtpInput";
import { Button } from "@/components/ui/button";
import OnboardingControlbuttons from "../login/components/OnboardingControlButtons";
import StoreSetupRoutes from "./routes/StoreSetupRoutes";

function EmailVerification() {
  return (
    <main className="min-h-screen bg-darkGrey">
      <Header minimal />
      <EmailVerificationForm />
    </main>
  );
}

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const [URLSearchParams] = useSearchParams();

  const email = URLSearchParams.get("email");

  async function confirmOtp() {
    if (!otp) {
      setError("Please enter OTP");
      return;
    }
    window.location.assign("/onboarding/merchant-name");
  }
  return (
    <main className="min-h-screen bg-darkGrey">
      <Header minimal />
      <div className="max-w-sm mx-auto space-y-10 pt-8 px-2 md:px-0">
        <form className="">
          <div className="space-y-8">
            {/* EMAIL AND HEADER TEXT */}
            <div className="">
              <p className="text-light text-2xl">
                Enter the 6-digit code sent to you at:
              </p>
              <p className="text-light text-2xl">{email}</p>
            </div>
            {/* OTP INPUT */}
            <div className="space-y-2">
              <OtpInput
                isManual
                confirmOtp={confirmOtp}
                value={otp}
                setValue={(e) => setOtp(e)}
              />
              <p className="text-gray-400 text-sm">
                Tip: Make sure to check your inbox and spam folders
              </p>
            </div>

            <Button className="w-20 rounded-xl">Resend</Button>
            {error && <p className="text-center text-red-400">{error}</p>}
          </div>
        </form>
        <OnboardingControlbuttons
          customPrev
          customPrevFunc={() => {
            window.location.assign("/onboarding");
          }}
          onClick={confirmOtp}
        />
      </div>
    </main>
  );
}

function MerchantNameView() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");

  async function handleNext() {
    if (!firstname || !lastname) {
      setError("Please enter OTP");
      return;
    }
  }
  return (
    <main className="min-h-screen bg-darkGrey">
      <Header minimal />
      <div className="px-2 pt-6 space-y-4">
        <div className="">
          <h1 className="text-3xl font-semibold text-white ">
            What's your name ?
          </h1>
          <p className="text-light">Let us know how we can address you</p>
        </div>
        <form>
          <div className="flex flex-col gap-y-4">
            <div className="">
              <input
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="first name"
                type="text"
                className="w-full bg-lightBlack rounded-lg px-4 py-2"
              />
            </div>
            <div className="">
              <input
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Last name"
                type="text"
                className="w-full bg-lightBlack rounded-lg px-4 py-2"
              />
            </div>
          </div>
        </form>
        {error && <p className="text-center text-red-400">{error}</p>}
        <OnboardingControlbuttons onClick={handleNext} />
      </div>
    </main>
  );
}

export function OnboardingRoutes() {
  return (
    <Routes>
      <Route path="/" element={<EmailVerification />} />
      <Route path="/passcode" element={<OtpVerification />} />
      <Route path="/merchant-name" element={<MerchantNameView />} />
      <Route path="/store-setup/*" element={<StoreSetupRoutes />} />
    </Routes>
  );
}
