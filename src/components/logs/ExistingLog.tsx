"use client";

import { Tag, Tags } from "@/constants/tags";
import { Log } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

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
  const { label, icon, color } = Tags[log.tag as Tag];

  const handleEdit = async () => {
    try {
      onEditLog(log.id);
    } catch {
      toast.error("Failed to edit log. Please try again.");
    }
  };
  const handleDelete = async () => {
    try {
      await onDeleteLog(log.id);
    } catch {
      toast.error("Failed to delete log. Please try again.");
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
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-8 h-6 w-6"
            onClick={() => handleEdit()}
          >
            <Pencil className="h-3 w-3" />
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-destructive hover:text-destructive-foreground absolute top-1 right-1 h-6 w-6"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this log.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete()}>
                  Yes, delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
