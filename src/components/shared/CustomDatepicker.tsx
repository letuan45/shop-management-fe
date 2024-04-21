import { cn, dateDataFormat, dateFormat } from "@/lib/utils";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";

interface Props {
  onChangeDate: (date: string) => void;
}

const CustomDatepicker = ({ onChangeDate }: Props) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (date) {
      onChangeDate(dateDataFormat(date?.toISOString()));
    } else {
      onChangeDate("");
    }
  }, [date, onChangeDate]);

  const resetDateHandler = () => {
    setDate(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? dateFormat(date.toISOString()) : <span>Chọn một ngày</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
      <button className="ml-1" onClick={resetDateHandler}>
        <CrossCircledIcon />
      </button>
    </Popover>
  );
};

export default CustomDatepicker;
