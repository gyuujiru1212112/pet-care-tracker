"use client";

import { useParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Headerbar from "@/components/Headerbar";
import AddLog from "@/components/logs/AddLog";
import { Log, Pet } from "@prisma/client";
import { format, startOfDay, subDays } from "date-fns";
import PetDropDown from "@/components/pets/PetDropDown";
import PetSelection from "@/components/pets/PetSelection";
import { CalendarHeart, LucideChevronUpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ExistingLog from "@/components/logs/ExistingLog";
import { addLog, deleteLog } from "@/lib/log-actions";
import LoadingMessage from "@/components/LoadingMessage";

type DateLogs = {
  date: Date;
  logs: Log[];
};

export function usePetId(): string {
  const { id } = useParams();

  if (!id || typeof id !== "string") {
    throw new Error("Invalid pet id");
  }

  return id;
}

export default function PetTimelinePage() {
  const initialDaysToLoad = 3;
  const [pet, setPet] = useState<Pet>();
  const [pets, setPets] = useState<Pet[]>();
  const [message, setMessage] = useState<string | null>(null);
  const [lastLoadedDate, setLastLoadedDate] = useState<Date>(() => {
    return subDays(startOfDay(new Date()), initialDaysToLoad);
  });
  const petId = usePetId();

  function groupLogByDate(logs: Log[]) {
    console.log("Logs: ", logs);
    const grouped = new Map<string, Log[]>();
    for (const log of logs) {
      const dateKey = format(log.date, "yyyy-MM-dd");
      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)!.push(log);
    }

    const groupedLogsByDate: DateLogs[] = dayLogs.map((dayLog) => {
      const dateKey = format(dayLog.date, "yyyy-MM-dd");
      return {
        date: dayLog.date,
        logs: grouped.get(dateKey) || [],
      };
    });

    return groupedLogsByDate;
  }

  const initializeDays = (count: number, startDate: Date): DateLogs[] => {
    const start = startOfDay(startDate);
    return Array.from({ length: count }).map((_, i) => ({
      date: subDays(start, i),
      logs: [],
    }));
  };

  const [isLoading, setIsLoading] = useState(false);
  const [activeDay, setActiveDay] = useState<Date | null>(null);
  const [dayLogs, setDayLogs] = useState<DateLogs[]>(() => {
    return initializeDays(initialDaysToLoad, new Date());
  });

  const loadEarlierDate = async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);

      if (!lastLoadedDate) return;

      console.log("Last loaded date: ", lastLoadedDate);
      const dateStr = new Date(lastLoadedDate).toISOString();

      const earlierDaysToLoad = 2;
      const res = await fetch(
        `/api/pets/${petId}/?withLogs=true&before=${dateStr}&days=${earlierDaysToLoad}`
      );
      const newLogs = await res.json();

      setTimeout(() => {
        // set earlier logs
        const nextOldestDate = subDays(lastLoadedDate, 1);
        const newDays = initializeDays(earlierDaysToLoad, nextOldestDate);
        setDayLogs((prevDays) => [...newDays, ...prevDays]);
        setLastLoadedDate(subDays(nextOldestDate, earlierDaysToLoad - 1));

        if (newLogs.logs && newLogs.logs.length > 0) {
          const groupedByDate = groupLogByDate(newLogs.logs);
          setDayLogs(groupedByDate || []);
        }

        console.log("Set loading to false");
        setIsLoading(false);
      }, 800);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        setMessage(error.message);
      }
    }
  };

  const sortedDays = [...dayLogs].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  useEffect(() => {
    const today = new Date().toISOString();
    fetch(`/api/pets/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error || "Pets not found");
        } else {
          setPets(data);
        }
      })
      .catch(() => {
        setMessage("Error fetching pets");
      });
    fetch(
      `/api/pets/${petId}/?withLogs=true&before=${today}&days=${initialDaysToLoad}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched pet with logs: ", data);

        if (data.error) {
          setMessage(data.error || "Pet with logs not found");
        } else {
          setPet(data);

          const groupedByDate = groupLogByDate(data.logs);
          setDayLogs(groupedByDate || []);
        }
      })
      .catch(() => {
        setMessage("Error fetching pet data");
      });
  }, [petId]);

  const handleAddLog = async (day: Date, log: string, tag: string) => {
    try {
      const newLog = await addLog(day, log, tag, petId);

      if (newLog) {
        const logDate = format(newLog.date, "yyyy-MM-dd");

        setDayLogs((prev) => {
          const logDateObj = new Date(logDate);

          return prev.some((d) => format(d.date, "yyyy-MM-dd") === logDate)
            ? prev.map((d) => {
                const isSameDay = format(d.date, "yyyy-MM-dd") === logDate;
                return isSameDay ? { ...d, logs: [newLog, ...d.logs] } : d;
              })
            : [{ date: logDateObj, logs: [newLog] }, ...prev];
        });
      }
    } catch {
      setMessage("Failed to add log. Please try again.");
      // todo optional fetch?
    } finally {
      setMessage("");
    }
  };

  const handleDeleteLog = async (day: Date, logId: string) => {
    try {
      await deleteLog(logId);
      setDayLogs((prev) =>
        prev.map((dayLog) =>
          dayLog.date === day
            ? {
                ...dayLog,
                logs: dayLog.logs.filter((log) => log.id !== logId),
              }
            : dayLog
        )
      );
    } catch {
      setMessage("Failed to delete log. Please try again.");
      // todo optional fetch?
    } finally {
      setMessage("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('/timeline.jpg')] bg-cover bg-center bg-no-repeat">
      <Headerbar title="Logs" />

      {!pets || !pet ? (
        <LoadingMessage message="Loading pet data..." />
      ) : (
        // Pet dropdown for small screen
        <div className="flex flex-col md:flex-row flex-1 overflow-hidden pt-20 px-4 sm:px-6 max-w-screen-xl mx-auto w-full">
          <div className="block md:hidden px-4 pt-4">
            <PetDropDown pets={pets} selectedPet={pet} />
          </div>

          {/* Sidebar - Pet Selection */}
          <aside className="hidden md:block w-full md:w-64 md:h-[calc(100vh-80px)] overflow-y-auto bg-white opacity-90 border-r rounded-lg mb-4 md:mb-0 md:mr-4">
            <Suspense fallback={<p>Loading pet selection...</p>}>
              <PetSelection pets={pets || []} selectedPet={pet!} />
            </Suspense>
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
            <Suspense fallback={<p>Loading timeline...</p>}>
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
                                isActive
                                  ? "text-primary"
                                  : "text-muted-foreground"
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
                                {day.logs.map((log) => (
                                  <ExistingLog
                                    log={log}
                                    key={log.id}
                                    onDeleteLog={() =>
                                      handleDeleteLog(day.date, log.id)
                                    }
                                  />
                                ))}
                              </div>
                            )}

                            {isActive && (
                              <div className="mt-3">
                                <AddLog
                                  date={day.date}
                                  petId={pet?.id || ""}
                                  onAddLog={(date, log, tag) =>
                                    handleAddLog(date, log, tag)
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </section>
            </Suspense>
          </main>
        </div>
      )}
    </div>
  );
}
