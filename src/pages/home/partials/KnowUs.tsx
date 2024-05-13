import { Button } from "@/components/ui/button";

function Card({
  title,
  caption,
  image,
  buttonText,
}: {
  title: string;
  caption: string;
  image: string;
  buttonText: string;
}) {
  return (
    <figure className="xl:max-w-sm space-y-4">
      <picture>
        <img className=" w-full lg:max-h-96 object-cover" src={image} alt="" />
      </picture>
      <div className="space-y-2">
        <figcaption className="text-light font-medium">{title}</figcaption>
        <figcaption className="text-light">{caption}</figcaption>
      </div>
      <Button className="bg-transparent hover:bg-transparent px-0 text-light">
        {buttonText}
      </Button>
    </figure>
  );
}

function KnowUs() {
  return (
    <div className="px-2 py-6 space-y-2 lg:space-y-6  xl:py-10">
      <h3 className="text-light text-2xl font-semibold lg:text-4xl">
        Get to know us
      </h3>
      <div className="grid md:grid-cols-2 md:gap-10 xl:grid-cols-3 xl:gap-20">
        <Card
          title="Pricing tailored to your business"
          caption="Learn about our simple and transparent pricing across our services."
          image="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_714,h_476/v1664911187/assets/9c/1a1598-9720-4bbc-a7ba-f8d1e1afad8c/original/220505_UBER_LIS_D-RS1-A_000182_VS_R3.png"
          buttonText="See pricing"
        />
        <Card
          title="Marketing to expand your reach"
          caption="Access a full suite of marketing tools to help grow your sales."
          image="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_714,h_476/v1689362839/assets/d1/3750dc-d635-4f3b-bce4-e5ae1271ff2b/original/M-CTC10_OFFICE_WORK---CAMERA_R_0567_VS_R1.png"
          buttonText="Learn about marketing"
        />
        <div className="md:col-span-2 xl:col-span-1">
          <Card
            title="Support to answer your questions"
            caption="Reach our Support teams easily when you need help.."
            image="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_714,h_476/v1689362823/assets/99/11142d-f5b0-48db-94dd-fe83f2a09415/original/M-ST10_OFFICE_WORK---CAMERA_R_0015_VS_R5.png"
            buttonText="Contact us"
          />
        </div>
      </div>
    </div>
  );
}

export default KnowUs;
