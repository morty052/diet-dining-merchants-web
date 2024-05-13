import { Button } from "@/components/ui/button";
import { autoComplete, suggestions } from "@/lib/autoComplete";
import React from "react";

type FormProps = {
  address: string;
  floor: string;
  store_name: string;
  firstname: string;
  lastname: string;
  email: string;
};

const AutoCompleteInput = ({
  label,
  name,
  value,
  setValue,
}: {
  label: string;
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<FormProps>>;
}) => {
  const [results, setResults] = React.useState<suggestions[] | null>();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (e.target.value.length == 0) {
      setResults(null);
      return;
    }

    if (e.target.value.length > 4) {
      const results = await autoComplete(e.target.value);
      console.log(results);
      setResults(results);
    }
  };

  const handleSelect = (result: string) => {
    setValue((prev) => ({
      ...prev,
      [name]: result,
    }));
    setResults(null);
  };

  return (
    <div className="space-y-2 relative">
      <label className="text-light" htmlFor="">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => handleChange(e)}
        name={name}
        className="bg-lightBlack w-full h-10 rounded-lg text-light px-2"
        type="text"
      />
      {results && (
        <div className="w-full bg-lightBlack px-2 pt-2 pb-6 space-y-2 backdrop-blur-3xl absolute">
          {results?.map((result, index) => (
            <div
              onClick={() => {
                const address =
                  result.address + "," + result.city + "," + result.state;
                handleSelect(address);
              }}
              key={index}
              className=" hover:bg-green-400 cursor-pointer"
            >
              <p className="text-light">
                {result.address},{result.city}, {result.state}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Input = ({
  label,
  name,
  value,
  setValue,
}: {
  label: string;
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<FormProps>>;
}) => {
  return (
    <div className="space-y-2">
      <label className="text-light" htmlFor="">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
          }))
        }
        name={name}
        className="bg-lightBlack w-full h-10 rounded-lg text-light px-2"
        type="text"
      />
    </div>
  );
};

function SignupForm() {
  const [store, setStore] = React.useState({
    address: "",
    floor: "",
    store_name: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!store.address || !store.store_name) {
      setError("Please enter all required fields");
      return;
    }
    setLoading(true);
    const formattedAddress = store.address.split(",");
    console.log(formattedAddress);
    const storeDetails = {
      store_address: {
        street: formattedAddress[0],
        city: formattedAddress[1],
        province: formattedAddress[2],
      },
      floor: store.floor,
      store_name: store.store_name,
      firstname: store.firstname,
      lastname: store.lastname,
      email: store.email,
    };
    localStorage.setItem("store", JSON.stringify(storeDetails));
    setLoading(false);
    window.location.assign("/onboarding/merchant-name");
  };

  return (
    <form className="px-2 md:px-4 pt-10 max-w-4xl">
      <div className="space-y-4">
        <div className="">
          <h3 className="text-light text-2xl font-semibold">Get Started</h3>
          <p className="text-light font-medium ">
            Start earning with a diet dining merchants account{" "}
            <br className="hidden lg:block" />
            fill the form below to get started
          </p>
        </div>
        <div className="space-y-2">
          {/* <Input
            value={store.address}
            setValue={setStore}
            name={"address"}
            label={"Store address"}
          /> */}
          <AutoCompleteInput
            label="Store address"
            name={"address"}
            setValue={setStore}
            value={store.address}
          />
          <Input
            setValue={setStore}
            value={store.floor}
            name={"floor"}
            label={"Floor/suite"}
          />
          <Input
            setValue={setStore}
            value={store.store_name}
            name={"store_name"}
            label={"Store name"}
          />
          {/* <Input
            setValue={setStore}
            value={store.email}
            name={"email"}
            label={"Email"}
          /> */}
          {error && <p className="text-red-500">{error}</p>}
          <div className="py-2">
            <p className="text-light text-sm ">
              By clicking "Submit", you agree to Diet Dining Merchants Terms and
              Conditions and acknowledge you have read the Privacy Notice.{" "}
            </p>
          </div>
          <Button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="w-full"
          >
            {loading ? "Submitting" : "Submit"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SignupForm;
