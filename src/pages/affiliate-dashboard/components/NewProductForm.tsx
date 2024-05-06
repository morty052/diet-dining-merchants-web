import { UploadBody } from "@sanity/client";
import { Pen, ArrowLeft, Search, Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { Button } from "../../../components/ui/button";
import { baseUrl } from "../../../constants/baseUrl";
import { sanityClient } from "../../../lib/sanityClient";
import { toast } from "../../../components/ui/use-toast";
import { ProductPhoneMockUp } from "@/components/phone-mockup";
import { FileDrop } from "@/pages/onboarding/routes/StoreSetupRoutes";

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
  category: string;
  sold_separately: boolean;
};

function ComboBoxResult({
  item,
  selected,
  setSelected,
  onSelect,
  isSelected,
}: {
  item: { label: string; value: string };
  selected: string[];
  isSelected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  onSelect: (value: string) => void;
}) {
  return (
    <div
      onClick={() => {
        onSelect(item.value);
        setSelected([...selected, item.value]);
      }}
      key={item.value}
      className={` px-4 py-px text-sm  ${
        isSelected
          ? "text-light bg-green-400/20 flex justify-between items-center"
          : "hover:bg-dark cursor-pointer"
      }`}
    >
      {item.label}
      {isSelected && <Check className="h-4 w-4 text-light" />}
    </div>
  );
}

function ComboBox({
  query,
  setQuery,
  data,
  onSelect,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  data: { label: string; value: string }[];
  onSelect: (value: string) => void;
}) {
  const [focused, setFocused] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);

  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const queryResults = React.useMemo(() => {
    const results = data?.filter((item) =>
      item.value.toLowerCase().includes(query.toLowerCase())
    );

    if (results?.length === 0) {
      return [];
    }

    return results;
  }, [data, query]);

  return (
    <div
      onKeyDown={(e) => {
        console.log(e.key);
      }}
      className="bg-lightBlack w-full flex gap-x-1 justify-between  px-2 rounded-xl items-center relative "
    >
      <Search className="h-4 w-4 text-light" />
      <input
        onFocus={() => setFocused(true)}
        onBlur={() =>
          setTimeout(() => {
            setFocused(false);
          }, 200)
        }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className=" bg-transparent w-full  h-10  focus:outline-none text-light"
      />
      <ChevronsUpDown className="h-4 w-4 text-light" />
      {focused && (
        <div className="absolute inset-x-0 -bottom-[104px] ">
          <div
            ref={dropdownRef}
            className=" bg-lightBlack backdrop-blur-3xl rounded-xl h-24 p-2 space-y-1  w-full  text-light overflow-scroll"
          >
            {queryResults.map((item) => (
              <ComboBoxResult
                key={item.value}
                selected={selected}
                isSelected={selected.includes(item.value)}
                setSelected={setSelected}
                onSelect={onSelect}
                item={item}
              />
            ))}
            {queryResults.length === 0 && (
              <p className="text-light text-center">No results found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
const categories = [
  {
    value: "Beverages",
    label: "Beverages",
  },
  {
    value: "Salads",
    label: "Salads",
  },
  {
    value: "Pies",
    label: "Pies",
  },
  {
    value: "Burgers",
    label: "Burgers",
  },
  {
    value: "cookies",
    label: "Cookies",
  },
];

function NewProductForm({
  setCreating,
}: {
  setCreating: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
    category: "",
    sold_separately: true,
  });

  const [image, setImage] = React.useState<UploadBody | null>(null);
  const [writing, setWriting] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [categoryQuery, setCategoryQuery] = React.useState("");
  const [menuQuery, setMenuQuery] = React.useState("");

  // const navigate = useNavigate();

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
      sold_separately: true,
      category: "",
    });
    setImage(null);
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
      const _id = localStorage.getItem("affiliate_id");

      const imageRes = await fetch(`${imageUrl}`);
      const imageBlob = await imageRes.blob();
      const { _id: image_id } = await sanityClient.assets.upload(
        "image",
        imageBlob
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
        <ArrowLeft onClick={() => setCreating(false)} className="text-light" />
      </div>
      <div className=" pt-10 grid lg:grid-cols-2 lg:gap-x-12 lg:divide-x pb-6">
        <form className=" mx-auto flex flex-col max-w-2xl gap-y-4 ">
          <div className="flex w-full items-center ">
            <FileDrop setImageUrl={setImageUrl} />
          </div>
          {/* CATEGORIES */}
          <div className="w-full items-center gap-4 md:flex ">
            <div className="w-full">
              <label className=" text-sm text-gray-50" htmlFor="">
                Menu
              </label>
              <ComboBox
                onSelect={(category) => {
                  setProduct((prev) => ({ ...prev, category }));
                  setMenuQuery(category);
                }}
                query={menuQuery}
                setQuery={setMenuQuery}
                data={categories}
              />
            </div>

            <div className="w-full">
              <label className=" text-sm text-gray-50" htmlFor="">
                Category
              </label>
              <ComboBox
                onSelect={(category) =>
                  setProduct((prev) => ({ ...prev, category }))
                }
                query={categoryQuery}
                setQuery={setCategoryQuery}
                data={categories}
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
                autoCapitalize=""
                value={product.name}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                placeholder="Product Name"
                type="text"
                className="h-9 w-full bg-lightBlack text-light text-sm rounded-md px-2 py-2"
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
                className="h-9 w-full bg-lightBlack text-light text-sm rounded-md px-2 py-2"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="">
            {/* HEADER */}
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
              className=" w-full bg-lightBlack text-light text-sm rounded-lg p-2"
            />
          </div>

          <div className="">
            <label className="text-light text-sm" htmlFor="">
              Selling item on its own ?
            </label>
            <fieldset className="flex items-center gap-x-1">
              <input value={"yes"} type="checkbox" />
              <label className="text-light mb-1" htmlFor="">
                yes
              </label>
              <input checked type="checkbox" />
              <label className="text-light mb-1" htmlFor="">
                no
              </label>
            </fieldset>
          </div>
          <Button onClick={(e) => handleSubmit(e)} type="submit">
            {!loading ? "Submit Product" : "Submitting..."}
          </Button>
        </form>
        <div className="hidden lg:block">
          <ProductPhoneMockUp
            product_image={imageUrl as string}
            product={product}
          />
        </div>
      </div>
    </div>
  );
}

export default NewProductForm;
