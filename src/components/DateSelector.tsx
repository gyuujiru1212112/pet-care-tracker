import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateSelectorProps {
  birthDate: Date;
  setBirthDate: (date: Date) => void;
}

export function DateSelector({ birthDate, setBirthDate }: DateSelectorProps) {
  console.log("Current birthdate: ", birthDate);
  const currentYear = new Date().getFullYear();

  // todo style
  const [year, setYear] = useState(birthDate.getFullYear());
  const [month, setMonth] = useState(birthDate.getMonth() + 1); // 1-12
  const [day, setDay] = useState(birthDate.getDate());

  // Update birthDate when year, month, or day changes
  useEffect(() => {
    const newDate = new Date(year, month - 1, day);
    if (!isNaN(newDate.getTime())) {
      setBirthDate(newDate);
    }
  }, [year, month, day, setBirthDate]); // Make sure setBirthDate is stable and doesn't change

  const getDaysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();
  const daysInMonth = getDaysInMonth(year, month);

  return (
    <div className="flex flex-wrap gap-4">
      {/* Year */}
      <div className="w-auto">
        <Select
          value={year.toString()}
          onValueChange={(val) => setYear(parseInt(val))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 30 }, (_, i) => currentYear - i).map((y) => (
              <SelectItem key={y} value={y.toString()}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Month */}
      <div className="w-auto">
        <Select
          value={month.toString()}
          onValueChange={(val) => setMonth(parseInt(val))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <SelectItem key={m} value={m.toString()}>
                {m.toString().padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Day */}
      <div className="w-auto">
        <Select
          value={day.toString()}
          onValueChange={(val) => setDay(parseInt(val))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
              <SelectItem key={d} value={d.toString()}>
                {d.toString().padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
