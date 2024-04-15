import { motion } from "framer-motion";
import React from "react";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import OnboardingControlbuttons from "../components/OnboardingControlButtons";
import ProgressBar from "@/components/ProgressBar";
import { baseUrl } from "../../../constants/baseUrl";

function SetNewPasswordScreen({ isAffiliate }: { isAffiliate?: boolean }) {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  async function handleConfirmPassword() {
    if (!password || !confirmPassword) {
      setError("Please enter both fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // * GET_ID
    const _id = localStorage.getItem("_id");

    // * HANDLE AFFILIATE
    if (isAffiliate) {
      const res = await fetch(
        `${baseUrl}/affiliates/set-password?password=${password}&affiliate_id=${_id}`
      );
      // const res = await fetch(`https://diet-dining-server.onrender.com/affiliates/set-password?password=${password}`)
      const data = await res.json();
      console.log(data);
      navigate("register-companion?affiliate=TRUE");
      return;
    }

    // * HANDLE ADMIN
    if (!isAffiliate) {
      const res = await fetch(
        `${baseUrl}/admin/set-password?password=${password}&admin_id=${_id}`
      );
      // const res = await fetch(`https://diet-dining-server.onrender.com/admin/set-password?password=${password}`)
      const data = await res.json();
      console.log(data);
      navigate("register-companion");
      return;
    }

    // navigate('/store-onboarding/description')
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ ease: "easeIn" }}
      className="mx-auto grid w-full max-w-xl gap-y-8 py-20 sm:px-4 xl:max-w-2xl"
    >
      <div className="">
        <p className="text-2xl font-semibold text-white">
          Please enter new password
        </p>
        <p className="text-gray-400">
          Please Enter a new password for your account.{" "}
        </p>
      </div>
      <div className="">
        <input
          onFocus={() => setError("")}
          placeholder="New Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className={` mb-6 w-full border-b-2 bg-transparent p-2 text-lg text-white focus:border-green-400 focus:outline-none ${
            error && "border-red-500"
          }`}
        />
        <input
          onFocus={() => setError("")}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          type="password"
          className={` w-full border-b-2 bg-transparent p-2 text-lg text-white focus:border-green-400 focus:outline-none ${
            error && "border-red-500"
          }`}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <OnboardingControlbuttons onClick={handleConfirmPassword} />

      {/* STEPS LEFT */}
      <div className=" max-w-7xl  pt-6">
        <div className="flex items-center gap-x-2">
          <p className="fontmedium text-sm text-white">
            Step {1} of {2}
          </p>
          <ProgressBar progress={3 * 20} />
        </div>
      </div>
    </motion.div>
  );
}

const RegisterCompanionScreen = ({
  isAffiliate,
}: {
  isAffiliate?: boolean;
}) => {
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  async function handleConfirmCompanion(isAffiliate?: boolean) {
    const _id = localStorage.getItem("_id");
    if (isAffiliate) {
      const url = `${baseUrl}/affiliates/confirm-companion?affiliate_id=${_id}`;
      const res = await fetch(url);
      const data = await res.json();

      return data.status;
    } else {
      const url = `${baseUrl}/admin/confirm-companion?admin_id=${_id}`;
      // const url = `https://diet-dining-server.onrender.com/admin/confirm-companion?admin_id=${_id}`
      const res = await fetch(url);
      const data = await res.json();
      return data.status;
    }
  }

  async function handleFinish() {
    if (isAffiliate) {
      const status = await handleConfirmCompanion(isAffiliate);
      if (status == "CONFIRMED") {
        return navigate("/affiliate");
      }

      if (status == "REJECTED") {
        setError(
          "Companion has not been registered please try again after completing steps above"
        );
        return;
      }
    }

    const status = await handleConfirmCompanion();
    if (status == "CONFIRMED") {
      return navigate("/dashboard");
    }

    if (status == "REJECTED") {
      setError(
        "Companion has not been registered please try again after completing steps above"
      );
      return;
    }
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ ease: "easeIn" }}
      className="mx-auto grid w-full max-w-xl gap-y-8 py-10 sm:px-4 xl:max-w-2xl"
    >
      <div className="">
        <p className="text-2xl font-semibold text-white">Register Companion</p>
        <p className="text-gray-400">
          Please follow steps below to register your companion{" "}
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-x-2">
          <div className="grid h-8 w-8 place-content-center rounded-full border">
            <p className="text-white">1</p>
          </div>
          <p className="  font-medium text-white">Open companion app</p>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="grid h-8 w-8 place-content-center rounded-full border">
            <p className="text-white">2</p>
          </div>
          <p className="  font-medium text-white">Enter account email</p>
        </div>
        {/* <div className="flex items-center gap-x-2">
          <div className="grid h-8 w-8 place-content-center rounded-full border">
            <p className="text-white">3</p>
          </div>
          <p className=" font-medium text-white">Enter Code:123456</p>
        </div> */}
        <div className="flex items-center gap-x-2">
          <div className="grid h-8 w-8 place-content-center rounded-full border">
            <p className="text-white">3</p>
          </div>
          <p className=" font-medium text-white">Click next button below</p>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <OnboardingControlbuttons onClick={() => handleFinish()} />

      {/* STEPS LEFT */}
      <div className=" max-w-7xl  pt-6">
        <div className="flex items-center gap-x-2">
          <p className="fontmedium text-sm text-white">
            Step {2} of {2}
          </p>
          <ProgressBar progress={5 * 20} />
        </div>
      </div>
    </motion.div>
  );
};

function OnboardingRoutes() {
  const [URLSearchParams] = useSearchParams();

  const isAffiliate = URLSearchParams.get("affiliate");
  if (isAffiliate == "TRUE") {
    return (
      <div className="h-screen">
        <Routes>
          <Route path="/" element={<SetNewPasswordScreen isAffiliate />} />
          <Route
            path="/register-companion"
            element={<RegisterCompanionScreen isAffiliate />}
          />
        </Routes>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Routes>
        <Route path="/" element={<SetNewPasswordScreen />} />
        <Route
          path="/register-companion"
          element={<RegisterCompanionScreen />}
        />
      </Routes>
    </div>
  );
}

export default OnboardingRoutes;
