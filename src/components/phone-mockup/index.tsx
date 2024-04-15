import { useNewAffiliate } from "../../models/newAffiliate";
import bg from "../../assets/bg.jpg";
import { ArrowLeft, Heart, Star } from "lucide-react";
import { useState } from "react";

const mockTags = [
  "Store",
  "tags",
  "will",
  "appear",
  "here",
  "when",
  "you",
  "add",
  "them",
];

export function PhoneMockUp({ synced }: { synced: boolean }) {
  const [viewingStoreInfo, setViewingStoreInfo] = useState(false);

  const { affiliate, previewHeader, previewLogo, removeTag } =
    useNewAffiliate();

  const { store_name, store_description, store_address, tags } = affiliate;

  const { street, city, province, postal_code } = store_address;

  return (
    <div
      className={` mx-auto h-[580px] w-[300px]  rounded-3xl  ${!synced && ""}`}
    >
      {/* {viewingStoreInfo && (
          <>
            <div className="mx-auto mt-1 h-[25px] w-24 rounded-full border"></div>
            <div className="flex h-full w-full items-center justify-center pb-40">
              <p className="animate-pulse text-dark">Waiting for connection...</p>
            </div>
          </>
        )} */}

      {!viewingStoreInfo && (
        <div className="relative mx-auto h-[570px] w-[290px] overflow-hidden rounded-3xl  border ">
          {/* NOTCH */}
          <div className="absolute top-2 z-10 w-full">
            <div className="   mx-auto mt-1 h-[25px] w-24  rounded-full border bg-black"></div>
          </div>
          {/* HEADER */}
          <div className="absolute top-0 h-48 w-full rounded-t-3xl bg-white">
            <div className="relative h-full w-full">
              {/* HEADER BUTTONS */}
              <div className="absolute top-4 flex w-full justify-between px-2">
                <div className="grid h-6 w-6 place-content-center rounded-full bg-white">
                  <ArrowLeft className="h-4 w-4 text-brandGreen" />
                </div>
                <div className="grid h-6 w-6 place-content-center rounded-full bg-white">
                  <Heart className="h-4 w-4 text-brandGreen" />
                </div>
              </div>
              {/* HEADER IMAGE */}
              <img
                className="h-full w-full rounded-t-3xl  object-cover"
                src={!previewHeader ? bg : previewHeader}
                alt=""
              />
              {/* HEADER LOGO */}
              {/* <div className="absolute bottom-0 left-0 h-14 w-14 ">
                <img
                  className="h-full w-full rounded-full  object-cover"
                  src={!previewLogo ? bg : previewLogo}
                  alt=""
                />
              </div> */}
            </div>
          </div>

          {/* BODY */}
          <div className="h-full rounded-3xl bg-white pt-[196px]">
            <div className="px-2">
              {/* STORE NAME AND INFO BUTTON */}
              <div className="flex items-center justify-between">
                <p className="flex-1 text-sm font-medium text-dark">
                  {store_name ? store_name : "Store Name"}
                </p>
                <button
                  onClick={() => setViewingStoreInfo(true)}
                  className="rounded-3xl bg-brandGreen px-2 py-1"
                >
                  <p className="text-[10px] font-medium text-white">
                    Store info
                  </p>
                </button>
              </div>
              {/* STORE TAGS */}
              <div className="flex flex-wrap gap-x-2">
                {tags.map((tag, index) => (
                  <div onClick={() => removeTag(tag)} key={tag} className="">
                    <span className="text-[10px] text-dark hover:text-red-400">
                      {tag}
                    </span>
                    {index != tags.length - 1 && (
                      <span className="text-[10px] text-dark"> -</span>
                    )}
                  </div>
                ))}
              </div>
              {/* MOCK TAGS */}
              <div className="flex flex-wrap gap-x-2">
                {tags.length == 0 &&
                  mockTags.map((tag, index) => (
                    <a onClick={() => removeTag(tag)} key={tag} className="h-4">
                      <span className="text-[10px] text-dark hover:text-red-400">
                        {tag}
                      </span>
                      {index != tags.length - 1 && (
                        <span className="text-[10px] text-dark"> -</span>
                      )}
                    </a>
                  ))}
              </div>
              {/* RATINGS */}
              <div className="flex items-center gap-x-1 py-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 " />
                <p className="text-xs font-medium">4.7 (100 ratings)</p>
              </div>

              {/* OPENING TIMES */}
              <div className="mt-3 flex h-14 items-center justify-between rounded-lg border p-2">
                <div className="">
                  <p className="text-center text-[12px] text-dark">Open</p>
                  <p className="text-xs text-dark">10:00 AM</p>
                </div>
                <div className="h-full w-[1px] border"></div>
                <div className="">
                  <p className="text-center text-[12px] text-dark">Close</p>
                  <p className="text-xs text-dark">9:00 PM</p>
                </div>
              </div>
            </div>

            <div className="my-4 h-2 border-y bg-gray-100"></div>
            <div className="px-2">
              <p>Cakes</p>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm">Meal</p>
                  <p className="text-xs">$14-10cal</p>
                </div>
                <img src={bg} className="h-20 w-20 rounded-lg border" />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm">Meal</p>
                  <p className="text-xs">$14-10cal</p>
                </div>
                <img src={bg} className="h-20 w-20 rounded-lg border" />
              </div>
            </div>
          </div>
        </div>
      )}

      {viewingStoreInfo && (
        <div className="relative mx-auto h-[570px] w-[290px] rounded-3xl  border ">
          <div className="absolute top-2 z-10 w-full">
            <div className="   mx-auto mt-1 h-[25px] w-24  rounded-full border bg-black"></div>
          </div>
          {/* HEADER */}
          <div className="absolute top-0 h-48 w-full rounded-t-3xl bg-white">
            <div className="relative h-full w-full">
              {/* HEADER BUTTONS */}
              <div className="absolute top-4 z-50 flex w-full justify-between px-2">
                <button
                  onClick={() => setViewingStoreInfo(false)}
                  className="grid h-6 w-6 cursor-pointer place-content-center rounded-full bg-white"
                >
                  <ArrowLeft
                    onClick={() => setViewingStoreInfo(false)}
                    className="h-4 w-4 cursor-pointer text-brandGreen"
                  />
                </button>
              </div>
              {/* MAP IMAGE */}
              <img
                className="h-full w-full rounded-t-3xl  object-cover"
                src={!previewHeader ? bg : previewHeader}
                alt=""
              />
              {/* HEADER LOGO */}
              <div className="absolute bottom-0 left-0 h-14 w-14 ">
                <img
                  className="h-full w-full rounded-full  object-cover"
                  src={!previewHeader ? bg : previewHeader}
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="px-2 pt-[196px]"></div>
        </div>
      )}
    </div>
  );
}

export function StorePhoneMockUp({
  tags,
  store_image,
  store_name,
}: {
  store_image: string;
  store_name: string;
  tags: string[];
}) {
  const [viewingStoreInfo, setViewingStoreInfo] = useState(false);

  const { affiliate, previewHeader, previewLogo, removeTag } =
    useNewAffiliate();

  const { store_description, store_address } = affiliate;

  return (
    <div className={` mx-auto h-[580px] w-[300px]  rounded-3xl`}>
      {/* {viewingStoreInfo && (
          <>
            <div className="mx-auto mt-1 h-[25px] w-24 rounded-full border"></div>
            <div className="flex h-full w-full items-center justify-center pb-40">
              <p className="animate-pulse text-dark">Waiting for connection...</p>
            </div>
          </>
        )} */}

      {!viewingStoreInfo && (
        <div className="relative mx-auto h-[570px] w-[290px] overflow-hidden rounded-3xl  border ">
          {/* NOTCH */}
          <div className="absolute top-2 z-10 w-full">
            <div className="   mx-auto mt-1 h-[25px] w-24  rounded-full border bg-black"></div>
          </div>
          {/* HEADER */}
          <div className="absolute top-0 h-48 w-full rounded-t-3xl bg-white">
            <div className="relative h-full w-full">
              {/* HEADER BUTTONS */}
              <div className="absolute top-4 flex w-full justify-between px-2">
                <div className="grid h-6 w-6 place-content-center rounded-full bg-white">
                  <ArrowLeft className="h-4 w-4 text-brandGreen" />
                </div>
                <div className="grid h-6 w-6 place-content-center rounded-full bg-white">
                  <Heart className="h-4 w-4 text-brandGreen" />
                </div>
              </div>
              {/* HEADER IMAGE */}
              <img
                className="h-full w-full rounded-t-3xl  object-cover"
                src={!store_image ? bg : store_image}
                alt=""
              />
              {/* HEADER LOGO */}
              {/* <div className="absolute bottom-0 left-0 h-14 w-14 ">
                <img
                  className="h-full w-full rounded-full  object-cover"
                  src={!previewLogo ? bg : previewLogo}
                  alt=""
                />
              </div> */}
            </div>
          </div>

          {/* BODY */}
          <div className="h-full rounded-3xl bg-white pt-[196px]">
            <div className="px-2">
              {/* STORE NAME AND INFO BUTTON */}
              <div className="flex items-center justify-between">
                <p className="flex-1 text-sm font-medium text-dark">
                  {store_name ? store_name : "Store Name"}
                </p>
                <button
                  onClick={() => setViewingStoreInfo(true)}
                  className="rounded-3xl bg-brandGreen px-2 py-1"
                >
                  <p className="text-[10px] font-medium text-white">
                    Store info
                  </p>
                </button>
              </div>
              {/* STORE TAGS */}
              <div className="flex flex-wrap gap-x-2">
                {tags?.map((tag, index) => (
                  <div onClick={() => removeTag(tag)} key={tag} className="">
                    <span className="text-[10px] text-dark hover:text-red-400">
                      {tag}
                    </span>
                    {index != tags.length - 1 && (
                      <span className="text-[10px] text-dark"> -</span>
                    )}
                  </div>
                ))}
              </div>
              {/* MOCK TAGS */}
              {/* <div className="flex flex-wrap gap-x-2">
                {tags.length == 0 &&
                  mockTags.map((tag, index) => (
                    <a onClick={() => removeTag(tag)} key={tag} className="h-4">
                      <span className="text-[10px] text-dark hover:text-red-400">{tag}</span>
                      {index != tags.length - 1 && <span className="text-[10px] text-dark"> -</span>}
                    </a>
                  ))}
              </div> */}
              {/* RATINGS */}
              <div className="flex items-center gap-x-1 py-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 " />
                <p className="text-xs font-medium">4.7 (100 ratings)</p>
              </div>

              {/* OPENING TIMES */}
              <div className="mt-3 flex h-14 items-center justify-between rounded-lg border p-2">
                <div className="">
                  <p className="text-center text-[12px] text-dark">Open</p>
                  <p className="text-xs text-dark">10:00 AM</p>
                </div>
                <div className="h-full w-[1px] border"></div>
                <div className="">
                  <p className="text-center text-[12px] text-dark">Close</p>
                  <p className="text-xs text-dark">9:00 PM</p>
                </div>
              </div>
            </div>

            <div className="my-4 h-2 border-y bg-gray-100"></div>
            <div className="px-2">
              <p>Cakes</p>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm">Meal</p>
                  <p className="text-xs">$14-10cal</p>
                </div>
                <img src={bg} className="h-20 w-20 rounded-lg border" />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm">Meal</p>
                  <p className="text-xs">$14-10cal</p>
                </div>
                <img src={bg} className="h-20 w-20 rounded-lg border" />
              </div>
            </div>
          </div>
        </div>
      )}

      {viewingStoreInfo && (
        <div className="relative mx-auto h-[570px] w-[290px] rounded-3xl  border ">
          <div className="absolute top-2 z-10 w-full">
            <div className="   mx-auto mt-1 h-[25px] w-24  rounded-full border bg-black"></div>
          </div>
          {/* HEADER */}
          <div className="absolute top-0 h-48 w-full rounded-t-3xl bg-white">
            <div className="relative h-full w-full">
              {/* HEADER BUTTONS */}
              <div className="absolute top-4 z-50 flex w-full justify-between px-2">
                <button
                  onClick={() => setViewingStoreInfo(false)}
                  className="grid h-6 w-6 cursor-pointer place-content-center rounded-full bg-white"
                >
                  <ArrowLeft
                    onClick={() => setViewingStoreInfo(false)}
                    className="h-4 w-4 cursor-pointer text-brandGreen"
                  />
                </button>
              </div>
              {/* MAP IMAGE */}
              <img
                className="h-full w-full rounded-t-3xl  object-cover"
                src={!previewHeader ? bg : previewHeader}
                alt=""
              />
              {/* HEADER LOGO */}
              <div className="absolute bottom-0 left-0 h-14 w-14 ">
                <img
                  className="h-full w-full rounded-full  object-cover"
                  src={!previewHeader ? bg : previewHeader}
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* BODY */}
          <div className="px-2 pt-[196px]"></div>
        </div>
      )}
    </div>
  );
}

export function ProductPhoneMockUp({
  product,
  product_image,
}: {
  product_image?: string;
  product: any;
}) {
  const [viewingNutritionValue, setviewingNutritionValue] = useState(false);

  const { name, description, price } = product ?? {};

  return (
    <div className={` mx-auto h-[580px] w-[300px]  rounded-3xl`}>
      {!viewingNutritionValue && (
        <div className="relative mx-auto h-[570px] w-[290px] overflow-hidden rounded-3xl bg-white pt-4  border ">
          {/* HEADER BUTTONS */}
          <div className=" flex w-full justify-between px-2">
            <div className="grid h-6 w-6 place-content-center rounded-full bg-white">
              <ArrowLeft className="h-4 w-4 text-brandGreen" />
            </div>
            <button
              onClick={() => setviewingNutritionValue(true)}
              className="rounded-3xl bg-brandGreen px-2 py-1"
            >
              <p className="text-[10px] font-medium text-white">
                Nutritional Value
              </p>
            </button>
          </div>
          {/* IMAGE */}
          <div className="h-52 w-full mt-4  bg-white">
            <img
              className="h-full w-full   object-cover"
              src={!product_image ? bg : product_image}
              alt=""
            />
          </div>

          {/* BODY */}
          <div className="h-full pt-2">
            <div className="px-2">
              {/* PRODUCT NAME*/}
              <div className="flex items-center justify-between">
                <p className="flex-1 text-sm font-medium text-dark">
                  {name ? name : "Product Name"}
                </p>
              </div>
              {/* PRODUCT PRICE*/}
              <div className="flex items-center justify-between">
                <p className="flex-1 text-sm font-medium text-dark">
                  {price ? `$${price}` : "$00.00"}
                </p>
              </div>
              {/* RATINGS */}
              <div className="flex items-center gap-x-1 ">
                <Star className="h-4 w-4 fill-brandGreen text-brandGreen " />
                <Star className="h-4 w-4 fill-brandGreen text-brandGreen " />
                <Star className="h-4 w-4 fill-brandGreen text-brandGreen " />
                <Star className="h-4 w-4 fill-brandGreen text-brandGreen " />
                <Star className="h-4 w-4  text-brandGreen " />
              </div>

              {/* DESCRIPTION*/}
              <div className="mt-1 ">
                <p className="text-sm font-light">
                  {" "}
                  {description
                    ? description
                    : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id magnam dolorem quas libero."}
                </p>
              </div>
            </div>

            <div className="my-4 h-2 border-y bg-gray-100"></div>
            <div className="px-2">
              <div className="flex justify-between items-center mb-2">
                <p>Sides</p>
                <div className=" bg-brandGreen h-5 grid place-content-center w-14">
                  <span className="text-[10px] text-white font-light">
                    Required
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm">Tomato sauce</p>
                  <p className="text-xs">$2-10cal</p>
                </div>
                <img src={bg} className="h-20 w-20 rounded-lg border" />
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm">Meal</p>
                  <p className="text-xs">$2-10cal</p>
                </div>
                <img src={bg} className="h-20 w-20 rounded-lg border" />
              </div>
            </div>
          </div>
        </div>
      )}

      {viewingNutritionValue && <div className=""></div>}
    </div>
  );
}
