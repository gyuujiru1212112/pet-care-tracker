import {
  Cake,
  Clock,
  Footprints,
  Scissors,
  Stethoscope,
  Utensils,
} from "lucide-react";

export type Tag =
  | "feeding"
  | "grooming"
  | "activity"
  | "vet"
  | "anniversary"
  | "other";

export const Tags: Record<
  Tag,
  { label: string; icon: React.ReactNode; color: string }
> = {
  feeding: {
    label: "Feeding",
    icon: <Utensils className="w-4 h-4" />,
    color: "bg-amber-200 text-black-800 hover:bg-amber-300",
  },
  grooming: {
    label: "Grooming",
    icon: <Scissors className="w-4 h-4" />,
    color: "bg-red-100 text-pink-800 hover:bg-red-200",
  },
  activity: {
    label: "Walking",
    icon: <Footprints className="w-4 h-4" />,
    color: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  vet: {
    label: "Vet Visit",
    icon: <Stethoscope className="w-4 h-4" />,
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  anniversary: {
    label: "Anniversary",
    icon: <Cake className="w-4 h-4" />,
    color: "bg-fuchsia-300 text-fuchsia-800 hover:bg-fuchsia-400",
  },
  other: {
    label: "Other",
    icon: <Clock className="w-4 h-4" />,
    color:
      "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300",
  },
};

export function isTag(value: string): value is Tag {
  return [
    "feeding",
    "grooming",
    "activity",
    "vet",
    "anniversary",
    "other",
  ].includes(value);
}
