// temp page for checking ui
"use client";
import AddLog from "@/components/logs/AddLog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarHeart, LucideChevronUpCircle } from "lucide-react";
import { useState } from "react";
import { Log, Pet } from "@prisma/client";
import { startOfDay, subDays, format } from "date-fns";
import ExistingLog from "@/components/logs/ExistingLog";
import Headerbar from "@/components/Headerbar";
import PetSelection from "@/components/pets/PetSelection";
import PetDropDown from "@/components/pets/PetDropDown";

type DateLogs = {
  date: Date;
  logs: Log[];
};

export default function Temp() {
  const generateDays = (count: number, startDate: Date): DateLogs[] => {
    const start = startOfDay(startDate);
    return Array.from({ length: count }).map((_, i) => ({
      date: subDays(start, i),
      logs: [],
    }));
  };
  const [isLoading, setIsLoading] = useState(false);
  const [activeDay, setActiveDay] = useState<Date | null>(null);
  const [days, setDays] = useState<DateLogs[]>(() => {
    return generateDays(5, new Date());
  });

  const loadEarlierDate = () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      // call api for earlier logs
      setIsLoading(false);
    }, 800);
  };

  const sortedDays = [...days].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  return (
    <div className="min-h-screen flex flex-col bg-[url('/timeline.jpg')] bg-cover bg-center bg-no-repeat">
      <Headerbar title="Logs" email="Guest" />

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden pt-20 px-4 sm:px-6 max-w-screen-xl mx-auto w-full">
        <div className="block md:hidden px-4 pt-4">
          <PetDropDown />
        </div>

        {/* Sidebar - Pet Selection */}
        <aside className="hidden md:block w-full md:w-64 md:h-[calc(100vh-80px)] overflow-y-auto bg-white opacity-90 border-r rounded-lg mb-4 md:mb-0 md:mr-4">
          {/* <PetSelection /> */}
        </aside>

        {/* Timeline Content */}
        <main className="flex-1 h-[calc(100vh-80px)] overflow-y-auto border rounded-lg bg-white shadow-md opacity-90">
          {/* Load more button */}
          <div className="py-4 flex justify-center sticky top-0 bg-background z-10 border-b">
            <Button
              variant="outline"
              size="sm"
              onClick={loadEarlierDate}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                <>
                  <LucideChevronUpCircle className="h-4 w-4" />
                  Load Earlier Dates
                </>
              )}
            </Button>
          </div>

          {/* Timeline */}
          <section className="p-4 pb-8">
            {sortedDays.map((day, index) => {
              const isActive =
                activeDay &&
                startOfDay(activeDay).getTime() ===
                  startOfDay(day.date).getTime();
              const dateStr = format(day.date, "EEEE, MMMM d, yyyy");
              const isLastDay = index === sortedDays.length - 1;

              return (
                <div key={dateStr} className="relative">
                  <div className="flex items-start gap-4 mb-8">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center border-2",
                          isActive
                            ? "border-primary bg-primary/10"
                            : "border-muted-foreground/30"
                        )}
                      >
                        <CalendarHeart
                          className={cn(
                            "w-5 h-5",
                            isActive ? "text-primary" : "text-muted-foreground"
                          )}
                        />
                      </div>
                      {!isLastDay && (
                        <div className="w-0.5 h-full mt-2 bg-muted absolute top-10 bottom-0 left-5 -translate-x-1/2" />
                      )}
                    </div>

                    <div className="flex-1 pt-1 pb-8">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">{dateStr}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setActiveDay(isActive ? null : day.date)
                            }
                          >
                            {isActive ? "Close" : "Add Log"}
                          </Button>
                        </div>

                        {day.logs.length > 0 && (
                          <div className="mt-3 space-y-3">
                            {/* {day.logs.map((log) => (
                              <ExistingLog log={log} key={log.id} />
                            ))} */}
                          </div>
                        )}

                        {isActive && (
                          <div className="mt-3">
                            <AddLog date={day.date} petId={""} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </main>
      </div>
    </div>
  );
}
