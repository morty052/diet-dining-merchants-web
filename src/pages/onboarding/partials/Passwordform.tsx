import { Button } from "@/components/ui/button";
import { baseUrl } from "@/constants/baseUrl";
import React from "react";

// FIXME: SIMPLIFY CODE
// TODO: ADD DELETING LOCAL STORAGE STUFF AFTER CREATING USER
async function createUser() {
  const storeData = localStorage.getItem("store");
  const afilliateData = localStorage.getItem("affiliateDetails");
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  const { store_name, store_address } = JSON.parse(storeData as string);
  const { firstname, lastname } = JSON.parse(afilliateData as string);

  try {
    const res = await fetch(`${baseUrl}/affiliates/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeDetails: {
          store_name,
          store_address,
        },
        affiliateDetails: {
          email,
          password,
          firstname,
          lastname,
        },
      }),
    });
    const data = await res.json();
    const { _id, status, store_id } = data;
    if (status.success) {
      localStorage.setItem("affiliate_id", _id);
      localStorage.setItem("store_id", store_id);
    }
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
  }
}

function Divide() {
  return (
    <div className="flex items-center">
      <div className="h-px w-full bg-brandGreen flex-1 mt-px"></div>
    </div>
  );
}

function PasswordForm() {
  const [password, setPassword] = React.useState("");
  const [passwordRef, setPasswordRef] = React.useState("");
  const [error, setError] = React.useState("");

  async function handlePress(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (!password || !passwordRef) {
      setError("Please enter both fields");
      return;
    }
    // * SAVE PASSWORD TO LOCAL STORAGE BEFORE CREATING USER
    localStorage.setItem("password", password);

    // * CREATE USER
    await createUser();

    // * REDIRECT TO STORE SETUP
    window.location.assign("/onboarding/store-setup");
  }

  return (
    <section className="max-w-md mx-auto space-y-4 px-2 pt-4 ">
      <h1 className="text-3xl font-semibold text-white ">
        Create account password
      </h1>
      <form action="">
        <div className="flex flex-col gap-y-4">
          <div className="space-y-4">
            <input
              onFocus={() => setError("")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="w-full bg-lightBlack rounded-lg px-4 py-2 text-light"
            />
            <input
              onFocus={() => setError("")}
              value={passwordRef}
              onChange={(e) => setPasswordRef(e.target.value)}
              placeholder="Confirm Password"
              type="password"
              className="w-full bg-lightBlack rounded-lg px-4 py-2 text-light"
            />
            {error && (
              <p className="text-red-500 text-center text-sm">{error}</p>
            )}
          </div>
          <Divide />
          <Button onClick={(e) => handlePress(e)} className="w-full">
            Continue
          </Button>
          <div className="">
            <p className="text-light text-sm">
              Password must contain at least 8 characters
            </p>
            <p className="text-light text-sm">
              Password must contain at least 1 number or uppercase letter
            </p>
            <p className="text-light text-sm">
              Password must not include your email
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}

export default PasswordForm;
