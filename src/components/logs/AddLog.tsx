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
import { addLog } from "@/lib/log-actions";

interface AddLogProps {
  date: Date;
  petId: string;
}

export default function AddLog({ date, petId }: AddLogProps) {
  const [log, setLog] = useState("");
  const [tag, setTag] = useState<Tag>("other");
  const [message, setMessage] = useState<string | null>(null);

  const handleAction = async () => {
    try {
      await addLog(date, log, tag, petId);
    } catch {
      setMessage("Failed to add log. Please try again.");
    } finally {
      setLog("");
      setTag("other");
    }
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
            value={log}
            onChange={(e) => setLog(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-end">
            {message && <p className="text-sm text-destructive">{message}</p>}
            <Button size="sm" onClick={handleAction} disabled={!log.trim()}>
              <Send className="mr-2 h-4 w-4" />
              Add Log
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
