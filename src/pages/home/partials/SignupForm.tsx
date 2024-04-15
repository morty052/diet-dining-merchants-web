import { Button } from "@/components/ui/button";

const Input = ({ label, name }: { label: string; name: string }) => {
  return (
    <div className="space-y-2">
      <label className="text-light" htmlFor="">
        {label}
      </label>
      <input
        name={name}
        className="bg-lightBlack w-full h-10 rounded-lg text-light px-2"
        type="text"
      />
    </div>
  );
};

function SignupForm() {
  return (
    <div className="px-2 md:px-4 pt-10 max-w-4xl">
      <div className="space-y-4">
        <div className="">
          <h3 className="text-light text-2xl font-semibold">Get Started</h3>
          <p className="text-light font-medium ">
            Start earning with a diet dining merchants account{" "}
            <br className="hidden lg:block" />
            fill the form below to get started
          </p>
        </div>
        <form className="space-y-2">
          <Input name={"address"} label={"Store address"} />
          <Input name={"floor"} label={"Floor/suite"} />
          <Input name={"storename"} label={"Store name"} />
          <Input name={"firstname"} label={"First name"} />
          <Input name={"lastname"} label={"Last name"} />
          <Input name={"email"} label={"Email"} />
          <div className="py-2">
            <p className="text-light text-sm ">
              By clicking "Submit", you agree to Diet Dining Merchants Terms and
              Conditions and acknowledge you have read the Privacy Notice.{" "}
            </p>
          </div>
          <Button className="w-full">Submit</Button>
        </form>
      </div>
    </div>
  );
}

export default SignupForm;
