// import { Button } from "@/components/ui/button";

// function Cta() {
//   return (
//     <div className="px-2 py-6 bg-green-400 flex justify-center">
//       <div className="max-w-xl flex items-center flex-col gap-y-4">
//         <div className="">
//           <h3 className=" text-center font-semibold text-2xl  xl:text-4xl">
//             Ready to get started ?{" "}
//           </h3>
//           <p className="text-center xl:text-lg">
//             Get up and running in no time
//           </p>
//         </div>
//         <Button className="text-lg">Sign up</Button>
//       </div>
//     </div>
//   );
// }
function Cta() {
  return (
    <div className="bg-darkGrey">
      <div className="px-4  mx-auto">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <h2 className="text-white font-semibold text-2xl md:text-4xl md:leading-tight">
            How to start selling
          </h2>
          <p className="mt-1 text-light">
            Get your store on Diet dining to immediately boost earnings and
            reach <br /> by selling to a larger audience in a few steps
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          <div className="aspect-w-16 aspect-h-9 lg:aspect-none">
            <img
              className="w-full object-cover rounded-xl"
              src="https://images.unsplash.com/photo-1587614203976-365c74645e83?q=80&w=480&h=600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Image Description"
            />
          </div>

          <div className="">
            <div className="mb-4">
              <h3 className="text-green-400 text-xs font-medium uppercase">
                Steps
              </h3>
            </div>

            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-light">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex flex-shrink-0 justify-center items-center size-8 border border-lightBlack text-green-400 font-semibold text-xs uppercase rounded-full">
                    1
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm lg:text-base text-light">
                  Create a merchant account
                </p>
              </div>
            </div>
            <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-light">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex flex-shrink-0 justify-center items-center size-8 border border-lightBlack text-green-400 font-semibold text-xs uppercase rounded-full">
                    2
                  </span>
                </div>
              </div>
              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm lg:text-base text-light">
                  Provide required documentation
                </p>
              </div>
            </div>
            <div className="flex gap-x-5 ms-1">
              <div className="relative   ">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex flex-shrink-0 justify-center items-center size-8 border border-lightBlack text-green-400 font-semibold text-xs uppercase rounded-full">
                    3
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm md:text-base text-light">
                  Set up your store
                </p>
              </div>
            </div>

            {/* <div className="flex gap-x-5 ms-1">
              <div className="relative last:after:hidden after:absolute after:top-8 after:bottom-0 after:start-4 after:w-px after:-translate-x-[0.5px] after:bg-neutral-800">
                <div className="relative z-10 size-8 flex justify-center items-center">
                  <span className="flex flex-shrink-0 justify-center items-center size-8 border border-lightBlack text-green-400 font-semibold text-xs uppercase rounded-full">
                    4
                  </span>
                </div>
              </div>

              <div className="grow pt-0.5 pb-8 sm:pb-12">
                <p className="text-sm md:text-base text-light">
                  Start selling!
                </p>
              </div>
            </div> */}

            <a
              className="group inline-flex items-center gap-x-2 py-2 px-3 bg-green-400 text-light font-medium text-sm hover:bg-green-600 transition-colors duration-300 ease-in rounded-full focus:outline-none"
              href="#"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cta;
