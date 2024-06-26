import Header from "@/pages/home/partials/Header";
import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import OnboardingProgressDisplay from "../partials/OnboardingProgress";
import {
  Check,
  Clock,
  Hourglass,
  Image,
  Search,
  StoreIcon,
  UploadCloudIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DragEvent } from "react";
import { baseUrl } from "@/constants/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "@/lib/sanityClient";
import MenuHoursPicker, { days } from "@/components/menu-hours-picker";

const cuisines = [
  { title: "American", value: "American" },
  { title: "Chinese", value: "Chinese" },
  { title: "Indian", value: "Indian" },
  { title: "Italian", value: "Italian" },
  { title: "Keto", value: "Keto" },
  { title: "Thai", value: "Thai" },
  { title: "Gluten-free", value: "Gluten-free" },
  { title: "Vegan", value: "Vegan" },
];

async function fetchSetupProgress() {
  const _id = localStorage.getItem("affiliate_id");
  const res = await fetch(
    `${baseUrl}/affiliates/onboarding-progress?_id=${_id}`
  );
  const dataJson = await res.json();
  console.log(dataJson.phase);
  return dataJson.phase;
}

function SubmitButton({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) {
  return (
    <Button
      className={`w-20 flex items-center justify-center h-9 disabled:text-white   `}
      disabled={loading}
      onClick={onClick}
    >
      {loading && <Hourglass className="w-4 h-4 animate-spin" />}
      {!loading && "Submit"}
    </Button>
  );
}

function CancelButton({ loading }: { loading: boolean }) {
  return (
    <Button
      disabled={loading}
      onClick={() => window.location.assign("/onboarding/store-setup")}
      className="bg-red-300 hover:bg-red-400  hover:text-light"
    >
      Cancel
    </Button>
  );
}

function StepCard({
  children,
  title,
  description,
  to,
  onboardingPhase,
  requiredPhase,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  to: string;
  onboardingPhase: number;
  requiredPhase: number;
}) {
  const completed = React.useMemo(
    () => onboardingPhase > requiredPhase,
    [onboardingPhase, requiredPhase]
  );

  return (
    <div className="px-4 h-24 rounded-xl bg-lightBlack flex items-center">
      {children}
      <div className="flex-1 px-4">
        <p className="text-light font-semibold ">{title}</p>
        <p className="text-light font-semibold text-sm">{description}</p>
      </div>
      {!completed && (
        <Link to={`${to}`}>
          <Button className="rounded-xl shadow-xl">Start &#8594;</Button>
        </Link>
      )}
      {completed && (
        <div className="shadow-xl bg-light grid place-content-center w-8 h-8 rounded-full text-green-400">
          <Check />
        </div>
      )}
    </div>
  );
}

function UnderReviewCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="px-4 h-24 rounded-xl bg-lightBlack flex items-center">
      <div className="flex-1 px-4">
        <p className="text-light font-semibold ">{title}</p>
        <p className="text-light font-semibold text-sm">{description}</p>
      </div>
      <div className="shadow-xl bg-light grid place-content-center w-8 h-8 rounded-full text-green-400">
        <Hourglass />
      </div>
    </div>
  );
}

function ComboBoxResult({
  item,
  selected,
  setSelected,
  onSelect,
  isSelected,
}: {
  item: { title: string; value: string };
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
      {item.title}
      {isSelected && <Check className="h-4 w-4 text-light" />}
    </div>
  );
}

function ComboBox({
  query,
  setQuery,
  data,
  onSelect,
  placeholder,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  data: { title: string; value: string }[];
  onSelect: (value: string) => void;
  placeholder?: string;
}) {
  const [focused, setFocused] = React.useState(false);
  const [selected, setSelected] = React.useState<string[]>([]);

  const queryResults = React.useMemo(() => {
    const results = data?.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    if (results?.length === 0) {
      return [];
    }

    return results;
  }, [data, query, selected]);

  return (
    <div className="bg-lightBlack w-full flex gap-x-2 md:w-96 px-2 rounded-xl items-center relative ">
      <Search className="h-4 w-4 text-light" />
      <input
        onFocus={() => setFocused(true)}
        onBlur={() =>
          setTimeout(() => {
            setFocused(false);
            setQuery("");
          }, 200)
        }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        className=" bg-transparent w-full  h-10 focus:outline-none text-light"
        placeholder={placeholder}
      />
      {query && focused && (
        <div className="absolute inset-x-0 -bottom-28 ">
          <div className=" bg-lightBlack backdrop-blur-3xl rounded-xl h-24 p-2 space-y-1  w-full  text-light overflow-scroll">
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

export function FileDrop({
  setImageUrl,
}: {
  setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [image, setImage] = React.useState<string | null>(null);

  const uploadButtonRef = React.useRef<HTMLInputElement>(null);

  function openImagePicker() {
    uploadButtonRef.current?.click();
  }

  function pickImage(file: File) {
    console.log("file", file);
    const fileType = file.type;

    if (!fileType.includes("image")) {
      alert("Please select an image file");
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);

    //* Here we'll send the picked image to parent component
    setImageUrl(imageUrl);
  }
  // Define the event handlers
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log("dragging", event);
  };

  // const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
  //   event.preventDefault();
  // };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const fileType = event.dataTransfer.files[0].type;
    console.log(event);
    if (!fileType.includes("image")) {
      alert("Please select an image file");
      return;
    }
    const imageUrl = URL.createObjectURL(event.dataTransfer.files[0]);
    console.log(imageUrl);
    //* Here we'll show the dropped files
    setImage(imageUrl);

    //* Here we'll send the dropped files to parent component
    setImageUrl(imageUrl);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`${
        !image
          ? "bg-lightBlack h-48 rounded-xl w-full grid place-content-center "
          : "h-48 w-full"
      }`}
    >
      {!image && (
        <div className="w-full ">
          <p className="text-light/80 text-center text-xs mb-2 hidden md:block">
            {" "}
            Drop image here to upload{" "}
          </p>
          <input
            onChange={(e) => pickImage(e.target.files?.[0] as File)}
            className="hidden"
            ref={uploadButtonRef}
            type="file"
            name=""
            id="imageBox"
            accept="image/*"
          />
        </div>
      )}
      {!image && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            openImagePicker();
          }}
          className="space-x-2 rounded-xl"
        >
          <UploadCloudIcon />
          <span>Browse files</span>
        </Button>
      )}
      {image && (
        <img className="w-full h-full object-cover" src={image} alt="image" />
      )}
    </div>
  );
}

// TODO:ENCRYPT NUMBERS
function StoreSetupHome() {
  const { data: onboardingPhase, isLoading } = useQuery({
    queryKey: ["fetchSetupProgress"],
    queryFn: fetchSetupProgress,
  });

  if (isLoading) {
    return null;
  }

  console.log(onboardingPhase);

  return (
    <main className="min-h-screen bg-darkGrey">
      <Header minimal />
      <section className=" px-2 py-6 sm:py-0 max-w-3xl mx-auto">
        <OnboardingProgressDisplay phase={onboardingPhase} />
        {onboardingPhase < 4 && (
          <div className="pt-12 max-w-2xl mx-auto space-y-4">
            <p className="text-light font-semibold text-2xl md:text-3xl">
              Set up and verify your store
            </p>
            <div className="space-y-4">
              <StepCard
                requiredPhase={1}
                onboardingPhase={onboardingPhase}
                to="/onboarding/store-setup/details"
                title="Enter Store details"
                description="Tell us your  phone number and cuisine "
              >
                <StoreIcon className="text-light" />
              </StepCard>
              <StepCard
                requiredPhase={2}
                onboardingPhase={onboardingPhase}
                to="/onboarding/store-setup/image"
                title="Add store image"
                description="Add your store image and logo."
              >
                <Image className="text-light" />
              </StepCard>{" "}
              <StepCard
                requiredPhase={3}
                onboardingPhase={onboardingPhase}
                to="/onboarding/store-setup/hours"
                title="Setup hours"
                description="Provide your opening and closing times."
              >
                <Clock className="text-light" />
              </StepCard>{" "}
            </div>
          </div>
        )}
        {onboardingPhase >= 4 && (
          <div className="pt-12 max-w-2xl mx-auto space-y-4">
            <div className="">
              <p className="text-light font-semibold text-2xl md:text-3xl">
                Store under review
              </p>
              <p className="text-light font-semibold text-sm">
                Thanks for choosing diet dining. <br />
                give us a moment to process the information you provided
              </p>
            </div>
            <div className="space-y-4">
              <UnderReviewCard
                title="Pending Review"
                description="keep an eye on your email for updates from us."
              />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

function StoreTag({
  value,
  handlePress,
}: {
  value: string;
  handlePress: (value: string) => void;
}) {
  return (
    <div
      role="button"
      onClick={() => handlePress(value)}
      className="bg-green-400 px-4 py-1 rounded-lg group cursor-pointer hover:bg-red-500 transition-colors ease-in-out duration-300 flex gap-x-2 items-center"
    >
      <p className="text-light font-semibold text-sm">{value}</p>
      <div className="cursor-pointer pt-px group-hover:text-white">
        <X size={12} />
      </div>
    </div>
  );
}

// TODO: ADD ERROR HANDLING
function StoreDetailsSetup() {
  const [cuisine, setCuisine] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  function addTag(value: string) {
    const isIncluded = tags.includes(value);
    if (isIncluded) {
      return;
    }
    setTags([...tags, value]);
  }

  function removeTag(value: string) {
    const updatedList = tags.filter((tags) => tags !== value);

    setTags(updatedList);
  }

  const updateMerchantDetails = async () => {
    if (loading) {
      return;
    }
    if (tags.length === 0 || !phone) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/affiliates/submit-store-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: localStorage.getItem("affiliate_id"),
          store_id: localStorage.getItem("store_id"),
          tags,
          phone,
        }),
      });
      const data = await res.json();
      const { status } = data;
      if (status.success) {
        window.location.assign("/onboarding/store-setup");
        return;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-darkGrey">
      <Header minimal />

      <section className="pt-4 px-2 max-w-xl mx-auto">
        <p className="text-light font-semibold text-xl mb-2 hidden md:block">
          Enter store details
        </p>
        <div className=" space-y-6 md:border border-light/60 md:px-4 md:py-8 rounded-xl">
          <div className="pb-1">
            <p className="text-light font-semibold text-xl mb-1">
              What's your store's phone number?
            </p>
            <p className="text-light font-semibold text-sm">
              We'll call this number or share it with a user if there's an issue
              with an active order.
            </p>
          </div>
          <div className="flex gap-x-2">
            <div className="bg-lightBlack w-14 grid place-content-center rounded-xl  h-10">
              <p className="text-light font-semibold text-2xl ">+1</p>
            </div>
            <input
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className=" bg-lightBlack w-full px-2 text-light rounded-xl md:w-96 h-10"
            />
          </div>
          <div className="h-px bg-brandGreen/50 "></div>
          <p className="text-light font-semibold text-xl mb-1">
            What kinds of food do you offer at your store?
          </p>
          <div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-x-2">
                {tags?.map((tag, index) => (
                  <StoreTag
                    handlePress={(value) => removeTag(value)}
                    key={index}
                    value={tag}
                  />
                ))}
              </div>
            )}
          </div>
          <ComboBox
            placeholder="Ex: Vegan"
            onSelect={(value) => addTag(value)}
            data={cuisines}
            query={cuisine}
            setQuery={setCuisine}
          />
        </div>
      </section>
      <nav className="max-w-xl mx-auto py-4 px-2 flex justify-end gap-x-2 items-center">
        <CancelButton loading={loading} />
        <SubmitButton onClick={updateMerchantDetails} loading={loading} />
      </nav>
    </main>
  );
}

function StoreHoursSetup() {
  const [startTime, setStartTime] = React.useState("");
  const [startTimeOfDay, setStartTimeOfDay] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [endTimeOfDay, setEndTimeOfDay] = React.useState("");
  const [selectedDays, setSelectedDays] = React.useState(days.slice(1, 6));
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const opening_time = `${startTime} ${startTimeOfDay}`;
    const closing_time = `${endTime} ${endTimeOfDay}`;
    const hours = {
      opening_time,
      closing_time,
      open_days: selectedDays,
    };

    const res = await fetch(`${baseUrl}/affiliates/update-hours`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        hours,
        _id: localStorage.getItem("affiliate_id"),
        store_id: localStorage.getItem("store_id"),
      }),
    });
    const data = await res.json();
    console.log(data);
    setLoading(false);
    window.location.assign("/onboarding/store-setup");
  };

  return (
    <main className="min-h-screen bg-darkGrey">
      <Header minimal />
      <section className="max-w-2xl mx-auto space-y-4">
        <div className="">
          <h3 className="text-light font-semibold text-2xl">Set store hours</h3>
          <p className="text-light font-semibold text-sm">
            Set your opening and closing times
          </p>
        </div>
        <MenuHoursPicker
          selectedDays={selectedDays}
          setSelectedDays={setSelectedDays}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          setStartTimeOfDay={setStartTimeOfDay}
          setEndTimeOfDay={setEndTimeOfDay}
          startTime={startTime}
          startTimeOfDay={startTimeOfDay}
          endTime={endTime}
          endTimeOfDay={endTimeOfDay}
        />
      </section>
      <nav className="max-w-2xl mx-auto py-4 px-2 flex justify-end gap-x-2 items-center">
        <CancelButton loading={loading} />
        <SubmitButton loading={loading} onClick={handleSubmit} />
      </nav>
    </main>
  );
}

function StoreImageSetup() {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    if (!imageUrl) {
      console.log("no url", imageUrl);
      setLoading(false);
      return;
    }
    try {
      const imageRes = await fetch(`${imageUrl}`);
      const imageBlob = await imageRes.blob();
      const { _id: image_id } = await sanityClient.assets.upload(
        "image",
        imageBlob
      );
      console.log(image_id);
      await fetch(`${baseUrl}/affiliates/submit-store-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: localStorage.getItem("affiliate_id"),
          store_id: localStorage.getItem("store_id"),
          image_id,
        }),
      });
      window.location.assign("/onboarding/store-setup");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-darkGrey">
      <Header minimal />

      <section className="pt-4 px-2 max-w-xl mx-auto">
        <p className="text-light font-semibold text-xl mb-2 hidden sm:block">
          Enter store images
        </p>
        <div className=" space-y-6 sm:border border-light/60 sm:px-4 sm:py-8 rounded-xl">
          <div className="pb-1">
            <p className="text-light font-semibold text-xl ">
              Upload your store image
            </p>
            <p className="text-light  text-xs mb-2">
              this image will be visible to users and can be changed later
            </p>
            <FileDrop setImageUrl={setImageUrl} />
          </div>
        </div>
      </section>
      <nav className="max-w-xl mx-auto py-4 px-2 flex justify-end gap-x-2 items-center">
        <CancelButton loading={loading} />
        {imageUrl && <SubmitButton onClick={handleSubmit} loading={loading} />}
      </nav>
    </main>
  );
}

function StoreSetupRoutes() {
  return (
    <Routes>
      <Route path="/" element={<StoreSetupHome />} />
      <Route path="/details" element={<StoreDetailsSetup />} />
      <Route path="/image" element={<StoreImageSetup />} />
      <Route path="/hours" element={<StoreHoursSetup />} />
    </Routes>
  );
}

export default StoreSetupRoutes;
