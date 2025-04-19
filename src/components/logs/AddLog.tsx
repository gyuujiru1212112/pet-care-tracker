"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Tag, Tags } from "@/constants/tags";
import { toast } from "sonner";
import { useTransition } from "react";

interface AddLogProps {
  date: Date;
  petId: string;
  onAddLog: (
    date: Date,
    log: string,
    tag: string,
    petId: string
  ) => Promise<void>;
  onClose: () => void;
}

export default function AddLog({
  date,
  petId,
  onAddLog,
  onClose,
}: AddLogProps) {
  const [logContent, setLogContent] = useState("");
  const [tag, setTag] = useState<Tag>("other");
  const [isPending, startTransition] = useTransition();

  const handleAction = async () => {
    startTransition(async () => {
      try {
        await onAddLog(date, logContent, tag, petId);
      } catch {
        toast.error("Failed to add. Please try again.");
      } finally {
        setLogContent("");
        setTag("other");
      }
    });
  };

  return (
    <Card>
      <CardContent>
        <div className="flex flex-col gap-3">
          <div>
            {/* Tag selection */}
            <Label className="text-sm font-medium mb-2 block">Tag</Label>
            <RadioGroup
              value={tag}
              onValueChange={(value) => setTag(value as Tag)}
              className="flex flex-wrap gap-2"
            >
              {Object.entries(Tags).map(([key, { label, icon, color }]) => (
                <div key={key} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={key}
                    id={`tag-${key}`}
                    className="sr-only peer"
                  />
                  <Label
                    htmlFor={`tag-${key}`}
                    className={cn(
                      "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border",
                      "peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-offset-1",
                      color
                    )}
                  >
                    {icon}
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Log input */}
          <Textarea
            placeholder="Capture the moments!"
            value={logContent}
            onChange={(e) => setLogContent(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-end">
            <Button
              className="text-base hover:bg-gray-300 hover:text-gray-900 transition-all duration-300 ease-in-out"
              size="sm"
              onClick={handleAction}
              disabled={!logContent.trim() || isPending}
            >
              <Send className="mr-2 h-4 w-4" />
              {isPending ? "Adding..." : "Add Log"}
            </Button>
            <Button
              className="ml-5 text-base hover:bg-gray-300 transition-all duration-300"
              variant="secondary"
              size="sm"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
