"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalenderIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useFormContext } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { date } from "zod";

const DatePicker = () => {
  const { setValue, watch } = useFormContext();
  const dateOfBirth = watch("dateOfBirth");

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setValue("dateOfBirth", selectedDate.toISOString());
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalenderIcon className="mr-2 h-4 w-4" />
          {dateOfBirth ? format(new Date(dateOfBirth), "PPP") : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={dateOfBirth ? new Date(dateOfBirth) : undefined}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
