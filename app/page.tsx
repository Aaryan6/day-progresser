"use client";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Home() {
  const [startingDate, setStartingDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), 0, 1)
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().getFullYear(), 11, 31)
  );
  const [currentDay, setCurrentDay] = useState<number>(0);

  useEffect(() => {
    if (startingDate) {
      const today = new Date();
      const differenceInTime = today.getTime() - startingDate.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      setCurrentDay(differenceInDays);
    }
  }, [startingDate, endDate, currentDay]);

  function calculateTotalDays() {
    if (startingDate && endDate) {
      const differenceInTime = endDate.getTime() - startingDate.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      return differenceInDays + 1;
    }
    return 0;
  }

  function calculatePercentage() {
    const totalDays = calculateTotalDays();
    const percentage = (currentDay / totalDays) * 100;
    return Math.round(percentage);
  }

  return (
    <main className="h-screen grid place-items-center max-w-xl mx-auto px-4">
      <div className="space-y-8">
        <div className="flex justify-center gap-x-3 w-full mx-auto">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-auto pl-3 text-left font-normal",
                  !startingDate && "text-muted-foreground"
                )}
              >
                {startingDate ? format(startingDate, "PPP") : "Pick a date"}
                <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startingDate}
                onSelect={setStartingDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <div className="">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-auto pl-3 text-left font-normal",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  {endDate ? format(endDate, "PPP") : "Pick a date"}
                  <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={{ before: new Date() }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-3 w-full">
          <Progress
            value={calculatePercentage()}
            max={100}
            className="w-full"
          />
          <div className="font-medium text-3xl">
            <span className="text-base text-slate-600">Day {currentDay},</span>{" "}
            {calculatePercentage()}%
          </div>
        </div>
      </div>
    </main>
  );
}
