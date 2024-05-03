import { useState } from "react";
import Header from "../home/partials/Header";
import EmailVerificationForm from "./partials/EmailVerificationForm";
import { Routes, Route } from "react-router-dom";
import OtpInput from "../login/components/OtpInput";
import { Button } from "@/components/ui/button";
import OnboardingControlbuttons from "../login/components/OnboardingControlButtons";
import StoreSetupRoutes from "./routes/StoreSetupRoutes";
import { useSignUp } from "@clerk/clerk-react";
import React from "react";
import PasswordForm from "./partials/Passwordform";

function EmailVerification() {
  return (
    <main className="min-h-screen bg-darkGrey">
      <Header minimal />
      <EmailVerificationForm />
    </main>
  );
}

function PasswordSetup() {
  return (
    <main className="min-h-screen bg-darkGrey">
      <Header minimal />
      <PasswordForm />
    </main>
  );
}

function OtpVerification() {
  const [otp, setOtp] = React.useState("");
  const [error, setError] = React.useState("");
  const { isLoaded, signUp } = useSignUp();

  const email = React.useMemo(() => localStorage.getItem("email"), []);

  async function confirmOtp() {
    if (!otp) {
      setError("Please enter OTP");
      return;
    }
    if (!isLoaded) {
      setError(
        "Something went wrong. Please check network status and try again"
      );
      return;
    }
    // TODO :ADD ERROR HANDLING
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: otp,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        // TODO:ADD SETTING ACTIVE
        // await setActive({ session: completeSignUp.createdSessionId })

        //* REDIRECT TO PASSWORD SETUP
        window.location.assign("/onboarding/set-password");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
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
      setError("Please enter both names");
      return;
    }

    // * SAVE AFFILIATE NAMES TO LOCAL STORAGE
    localStorage.setItem(
      "affiliateDetails",
      JSON.stringify({ firstname, lastname })
    );

    // * REDIRECT TO ENTER EMAIL
    window.location.assign("/onboarding");
  }
  return (
    <main className="min-h-screen bg-darkGrey">
      <Header minimal />
      <div className="px-2 pt-6 space-y-4 max-w-lg mx-auto">
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
                onFocus={() => setError("")}
                autoComplete="off"
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="first name"
                type="text"
                className="w-full bg-lightBlack rounded-lg px-4 py-2"
              />
            </div>
            <div className="">
              <input
                value={lastname}
                onFocus={() => setError("")}
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
      <Route path="/set-password" element={<PasswordSetup />} />
      <Route path="/passcode" element={<OtpVerification />} />
      <Route path="/merchant-name" element={<MerchantNameView />} />
      <Route path="/store-setup/*" element={<StoreSetupRoutes />} />
    </Routes>
  );
}
