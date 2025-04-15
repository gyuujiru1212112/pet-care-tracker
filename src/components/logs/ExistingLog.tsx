"use client";

import { Tag, Tags } from "@/constants/tags";
import { Log } from "@prisma/client";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteLog } from "@/lib/log-actions";

interface ExistingLogProps {
  log: Log;
}

export default function ExistingLog({ log }: ExistingLogProps) {
  const [message, setMessage] = useState<string | null>(null);
  const { label, icon, color } = Tags[log.tag as Tag];

  const handleDelete = async () => {
    try {
      await deleteLog(log.id);
    } catch (error) {
      setMessage("Failed to delete log. Please try again.");
    } finally {
      setMessage(null);
    }
  };

  return (
    <Card key={log.id} className="relative group">
      <CardContent className="p-3">
        <div className="flex items-start gap-2">
          <div className="mt-1 flex-shrink-0">{icon}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-xs text-muted-foreground">
                {log.date.toLocaleTimeString()}
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
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-1 right-1 h-6 w-6"
            onClick={() => handleDelete()}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        {message && <p className="text-sm text-destructive">{message}</p>}
      </CardFooter>
    </Card>
  );
}
