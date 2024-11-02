"use client";
import { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const countries = [
  {
    value: "ghana",
    label: "Ghana",
  },
  {
    value: "nigeria",
    label: "Nigeria",
  },
  {
    value: "cameroon",
    label: "Cameroon",
  },
  {
    value: "kenya",
    label: "Kenya",
  },
  {
    value: "ivory coast",
    label: "Ivory Coast",
  },
  {
    value: "malawi",
    label: "Malawi",
  },
  {
    value: "senegal",
    label: "Senegal",
  },
];
export const UserProfileCountrySwitcher = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-teal-50 border-none text-teal-600 font-work-sans hover:bg-white"
        >
          {value
            ? countries.find((country) => country.value === value)?.label
            : "Select a country"}
          <ChevronsUpDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search country" />
          <CommandList>
            <CommandEmpty>No country found</CommandEmpty>
            <CommandGroup>
              {countries.map((country) => (
                <CommandItem
                  key={country.value}
                  value={country.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="font-work-sans text-teal-600"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === country.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {country.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
