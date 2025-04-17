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
import { Log } from "@prisma/client";

interface EditLogProps {
  log: Log;
  onEditLog: (
    date: Date,
    logId: string,
    log: string,
    tag: string,
    petId: string
  ) => Promise<void>;
  onCloseEdit: () => void;
}

export default function EditLog({ log, onEditLog, onCloseEdit }: EditLogProps) {
  const [logContent, setLogContent] = useState(log.description);
  const [tag, setTag] = useState<Tag>(log.tag as Tag);
  const [message, setMessage] = useState("");

  const handleClose = () => {
    try {
      onCloseEdit();
    } catch {
      setMessage("Failed to close the edit box. Please refresh the page.");
    }
  };

  const handleAction = async () => {
    try {
      // time matters
      const currentDate = new Date(log.date);
      const now = new Date();
      currentDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

      await onEditLog(currentDate, log.id, logContent, tag, log.petId);
      setMessage("");
    } catch {
      setMessage("Failed to edit. Please try again.");
    } finally {
      setLogContent("");
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
            value={logContent}
            onChange={(e) => setLogContent(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-end">
            {message && (
              <p className="text-md text-destructive mr-3">{message}</p>
            )}
            <Button
              className="text-base"
              size="sm"
              onClick={handleAction}
              disabled={!logContent.trim()}
            >
              <Send className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button className="ml-5 text-base" size="sm" onClick={handleClose}>
              Close
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
