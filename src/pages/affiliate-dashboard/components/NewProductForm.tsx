import { UploadBody } from "@sanity/client";
import { Pen, ArrowLeft } from "lucide-react";
import React from "react";
import { Combobox } from "../../../components";
import { Button } from "../../../components/ui/button";
import { baseUrl } from "../../../constants/baseUrl";
import { sanityClient } from "../../../lib/sanityClient";
import { toast } from "../../../components/ui/use-toast";
import { ProductPhoneMockUp } from "@/components/phone-mockup";
import { useNavigate } from "react-router-dom";

type TnewProduct = {
  _type: "products";
  name: string;
  description: string;
  price: string;
  image: {
    _type: "image";
    asset: {
      _type: "reference";
      _ref: string;
    };
  };
};

function ImageInput({ setUploadable, imageFile, setImageFile }: any) {
  function handleFileChange(e: any) {
    console.log(e.target.files[0]);
    setUploadable(e.target.files[0]);
    setImageFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div className="gap-y-4   w-full border border-dashed rounded-lg">
      <label
        htmlFor="image"
        className={`flex h-36  w-full cursor-pointer items-center justify-center  px-4`}
      >
        <input
          id="image"
          onChange={(e) => handleFileChange(e)}
          className="hidden border bg-transparent text-white"
          type="file"
          accept="png"
        />
        {!imageFile && (
          <span className={"text-center text-sm text-blue-600"}>
            {"Upload Image"}
          </span>
        )}
        {imageFile && (
          <span className={"text-center text-sm text-blue-600"}>
            {"Upload New image"}
          </span>
        )}
      </label>
    </div>
  );
}

function DietaryBox() {
  return (
    <div className="grid h-20 w-20 place-content-center border-2 border-green-300">
      <p className="text-center text-white">126</p>
      <p className="text-center text-white">kcal</p>
    </div>
  );
}

function DietGrid() {
  return (
    <div className="flex flex-col">
      <div className="">
        <p className=" text-white">Dietary Information</p>
      </div>
      <div className=" flex  flex-wrap ">
        <DietaryBox />
        <DietaryBox />
        <DietaryBox />
        <DietaryBox />
        <DietaryBox />
        <DietaryBox />
      </div>
    </div>
  );
}

function NewProductForm() {
  const categories = [
    {
      value: "next.js",
      label: "Beverages",
    },
    {
      value: "sveltekit",
      label: "Salads",
    },
    {
      value: "nuxt.js",
      label: "Pies",
    },
    {
      value: "remix",
      label: "Breakfast",
    },
    {
      value: "astro",
      label: "Lunch",
    },
  ];
  const [product, setProduct] = React.useState<TnewProduct>({
    _type: "products",
    name: "",
    description: "",
    price: "",
    image: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: "",
      },
    },
  });

  const [storeCategories, setStoreCategories] = React.useState(categories);
  const [defaultCategories, setDefaultCategories] = React.useState(categories);
  const [productMainCategory, setProductMainCategory] = React.useState("");
  const [productCategory, setProductCategory] = React.useState("");
  const [imageFile, setImageFile] = React.useState("");
  const [image, setImage] = React.useState<UploadBody | null>(null);
  const [writing, setWriting] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setProduct({
      _type: "products",
      name: "",
      description: "",
      price: "",
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: "",
        },
      },
    });
    setImage(null);
    setImageFile("");
    setProductMainCategory("");
    setProductCategory("");
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) {
      return;
    }

    try {
      if (!image || !product.description || !product.name || !product.price) {
        alert("Please fill in all fields");
        return;
      }
      setLoading(true);
      const _id = localStorage.getItem("_id");
      console.log({
        ...product,
        // category,
      });

      const { _id: image_id } = await sanityClient.assets.upload(
        "image",
        image as UploadBody
      );

      console.log(image_id);

      const newProduct = {
        ...product,
        price: Number(product.price),
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: image_id,
          },
        },
      };

      const res = await fetch(
        `${baseUrl}/affiliates/add-product?affiliate_id=${_id}`,
        {
          method: "POST",
          body: JSON.stringify(newProduct),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await res.json();
      resetForm();
      setLoading(false);
      toast({
        title: "Added to database.",
        description:
          "New product has been added to the database pending approval.",
        // action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  async function handleWriteWithAi() {
    if (!product?.name) {
      alert("Please enter a product name");
      return;
    }

    try {
      const url = `${baseUrl}/write_about_meal?meal_name=${product?.name}`;
      if (writing) {
        return;
      }
      setWriting(true);

      const res = await fetch(url);
      const data = await res.json();

      console.log(data);

      const text = data.data.response;

      setWriting(false);

      setProduct((prev) => ({
        ...prev,
        description: text,
      }));

      console.log("written");
    } catch (error) {
      console.error(error);
      setWriting(false);
    }
  }

  return (
    <div className="">
      <div className="flex justify-between max-w-3xl">
        <ArrowLeft onClick={() => navigate(-1)} className="text-light" />
      </div>
      <div className=" pt-10 grid xl:grid-cols-2 xl:gap-x-12 xl:divide-x ">
        <form className=" mx-auto flex flex-col max-w-2xl gap-y-4 ">
          <div className="flex w-full items-center ">
            <ImageInput
              setImageFile={setImageFile}
              imageFile={imageFile}
              setUploadable={setImage}
            />
            {/* <div className="hidden lg:block">
            <p className="text-white">All fields are required</p>
            <p className="text-sm text-white ">
              Please fill all required fields to contiune
            </p>
          </div> */}
          </div>
          {/* CATEGORIES */}
          <div className="w-full items-center gap-4 md:flex ">
            <div className="w-full">
              <label className=" text-sm text-gray-50" htmlFor="">
                Main category
              </label>
              <Combobox
                Categories={defaultCategories}
                setValue={setProductMainCategory}
                value={productMainCategory}
              />
            </div>

            <div className="w-full">
              <label className=" text-sm text-gray-50" htmlFor="">
                Sub category
              </label>
              <Combobox
                creatable
                Categories={storeCategories}
                setValue={setProductCategory}
                value={productCategory}
              />
            </div>
          </div>
          {/*  NAME  AND PRICE */}
          <div className="w-full items-center gap-4 md:flex ">
            <div className="w-full">
              <label className="text-sm text-gray-50" htmlFor="">
                Product Name
              </label>
              <input
                value={product.name}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Product Name"
                type="text"
                className="h-9 w-full rounded-md px-2 py-2"
              />
            </div>
            <div className="w-full">
              <label className="text-sm text-gray-50" htmlFor="">
                Product price
              </label>
              <input
                value={product.price}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    price: e.target.value,
                  }))
                }
                placeholder="Product Price"
                type="number"
                className="h-9 w-full rounded-md px-2 py-2"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="">
            <div className="flex items-center justify-between pb-2">
              <label className="text-sm text-gray-50" htmlFor="">
                Product description
              </label>
              <div
                onClick={handleWriteWithAi}
                className={`group flex  items-center gap-x-[2px]`}
              >
                <Pen
                  className={` h-5 w-5 text-gray-50 transition-all  ease-linear   ${
                    writing
                      ? "animate-spin cursor-progress"
                      : "cursor-pointer group-hover:-rotate-45"
                  }`}
                />
                <span
                  className={`text-xs font-medium text-gray-50 transition-all ease-linear group-hover:text-green-400 ${
                    writing
                      ? "animate-pulse cursor-progress"
                      : "cursor-pointer duration-300  "
                  } `}
                >
                  {!writing ? "Write with A.I" : "Writing with A.I"}
                </span>
              </div>
            </div>
            <textarea
              value={!writing ? product.description : "thinking..."}
              onChange={(e) =>
                setProduct((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder={!writing ? "Product description" : "thinking.."}
              rows={4}
              className=" w-full rounded-lg p-2"
            />
          </div>

          <Button onClick={(e) => handleSubmit(e)} type="submit">
            {!loading ? "Submit Product" : "Submitting..."}
          </Button>
        </form>
        <div className="hidden xl:block">
          <ProductPhoneMockUp
            product_image={imageFile as string}
            product={product}
          />
        </div>
      </div>
    </div>
  );
}

export default NewProductForm;
