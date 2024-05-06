import * as React from "react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, CheckIcon, ChevronsUpDown, Plus } from "lucide-react";
import { baseUrl } from "../../constants/baseUrl";

const categories = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

function ButtonLoader() {
  return (
    <div className="">
      <div className="grid h-6 w-6 animate-pulse place-content-center rounded-full border-4 border-green-600">
        <div className=" h-2 w-2 animate-spin  bg-black"></div>
      </div>
    </div>
  );
}

export function Combobox({
  value,
  setValue,
  Categories,
  creatable,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  creatable?: boolean;
  Categories: {
    label: string;
    value: string;
  }[];
}) {
  const [loading, setLoading] = React.useState(false);
  const [created, setCreated] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [newCategoryValue, setNewCategoryValue] = React.useState("");

  async function createCategory() {
    console.log(newCategoryValue);
    const affiliate_id = localStorage.getItem("_id");
    setLoading(true);
    const res = await fetch(
      `${baseUrl}/stores/create-category?category=${newCategoryValue}&affiliate_id=${affiliate_id}`
    );
    const data = await res.json();
    console.log(data);
    setLoading(false);
    setCreated(true);
    setTimeout(() => {
      setCreated(false);
    }, 1000);
    setStoreCategories((prev) => [
      { value: newCategoryValue, label: newCategoryValue },
      ...prev,
    ]);
    setNewCategoryValue("");
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className=" w-full flex-1 justify-between py-2"
        >
          {value
            ? Categories.find((category) => category.value === value)?.label
            : "Select Category..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" p-0">
        <Command>
          {creatable && (
            <div className="flex">
              <input
                className="h-9 flex-1 rounded-l-md px-3 text-sm placeholder:text-sm placeholder:text-muted-foreground "
                placeholder="Create new category "
                type="text"
                value={newCategoryValue}
                onChange={(e) => setNewCategoryValue(e.target.value)}
              />
              <button
                disabled={!newCategoryValue || loading}
                onClick={() => createCategory()}
                className=" h-9 rounded-r-md  bg-dark  px-2 disabled:cursor-not-allowed disabled:bg-gray-200"
              >
                {loading && !created && <ButtonLoader />}
                {!loading && !created && (
                  <Plus className="h-4 w-4 text-white" />
                )}
                {created && <Check className="h-4 w-4 text-green-400" />}
              </button>
            </div>
          )}
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            {Categories?.map((category) => (
              <CommandItem
                key={category.value}
                value={category.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {category.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === category.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
