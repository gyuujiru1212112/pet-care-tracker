"use client";

import { Tag, Tags } from "@/constants/tags";
import { Log } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

interface ExistingLogProps {
  log: Log;
  onDeleteLog: (logId: string) => Promise<void>;
  onEditLog: (logId: string) => void;
}

export default function ExistingLog({
  log,
  onDeleteLog,
  onEditLog,
}: ExistingLogProps) {
  const [message, setMessage] = useState("");
  const { label, icon, color } = Tags[log.tag as Tag];

  const handleEdit = async () => {
    try {
      onEditLog(log.id);
      setMessage("");
    } catch {
      setMessage("Failed to edit log. Please try again.");
    }
  };
  const handleDelete = async () => {
    try {
      await onDeleteLog(log.id);
      setMessage("");
    } catch {
      setMessage("Failed to delete log. Please try again.");
    }
  };

  return (
    <Card key={log.id} className="relative group">
      <CardContent>
        <div className="flex items-start gap-2">
          <div className="mt-1 flex-shrink-0">{icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs text-muted-foreground">
                {format(log.date, "HH:mm")}
              </p>
              {/* Selected Tag */}
              <Badge
                variant="outline"
                className={cn("text-xs py-0 h-5", color)}
              >
                {label}
              </Badge>
            </div>
            <p className="text-sm">{log.description}</p>
          </div>

          {/* Delete button */}
          {message && (
            <p className="text-md text-destructive mr-5 absolute top-5 right-5">
              {message}
            </p>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-8 h-6 w-6"
            onClick={() => handleEdit()}
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-destructive hover:text-destructive-foreground absolute top-1 right-1 h-6 w-6"
            onClick={() => handleDelete()}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
