function Card({
  title,
  caption,
  image,
}: {
  title: string;
  caption: string;
  image: string;
}) {
  return (
    <figure className="xl:max-w-sm space-y-4">
      <picture>
        <img className=" w-full object-cover" src={image} alt="" />
      </picture>
      <div className="space-y-2">
        <figcaption className="text-light font-medium">{title}</figcaption>
        <figcaption className="text-light">{caption}</figcaption>
      </div>
    </figure>
  );
}

function HowItWorks() {
  return (
    <section className=" py-10 space-y-8">
      <h3 className="text-light font-semibold text-2xl xl:text-3xl ">
        How Diet Dining works for restaurant partners
      </h3>
      <div className="grid md:grid-cols-2 md:gap-10 xl:grid-cols-3 xl:gap-20">
        <Card
          image="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,w_714,h_476/v1622579235/assets/3c/3f70e6-bd04-495f-84d8-f7288ad01cb7/original/CustomersOrder.svg"
          title="Customers Order"
          caption="A customer finds your restaurant and places an order through the Diet dining app."
        />
        <Card
          image="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,w_714,h_476/v1622579254/assets/f8/3a023b-d455-4aab-97a0-12bc3026cebf/original/YouPrepare.svg"
          title="You prepare"
          caption="Your restaurant accepts and prepares the order."
        />
        <div className="md:col-span-2 xl:col-span-1">
          <Card
            image="https://www.uber-assets.com/image/upload/q_auto:eco,c_fill,w_714,h_476/v1622579274/assets/61/94ae40-5638-4fb7-88d2-94178d4d3eba/original/DeliveryPeopleArrive.svg"
            title="Delivery partners arrive"
            caption="Delivery personnel pick up the order from your restaurant for delivery"
          />
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
