import { Log } from "@prisma/client";

interface TimelineProps {
  logs: Log[];
}

export default function Timeline({ logs }: TimelineProps) {
  return (
    // todo
    <div className="flex flex-col gap-4">
      {logs.map((log) => (
        <div key={log.id} className="flex flex-col gap-2">
          <p>{log.description}</p>
          <p>{log.date.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
