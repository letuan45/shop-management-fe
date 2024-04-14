import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import { cn, dateDataFormat, dateFormat } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Datepicker = (props: { field: any }) => {
  const [date, setDate] = useState<Date>();

  useEffect(() => {
    if (date) {
      const formatDate = dateDataFormat(date.toISOString());
      props.field.onChange(formatDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

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
    </Popover>
  );
};

export default Datepicker;
