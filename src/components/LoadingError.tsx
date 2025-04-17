interface LoadingErrorProps {
  message: string;
}

export default function LoadingError({ message }: LoadingErrorProps) {
  return (
    <div className="flex justify-center items-center pt-20">
      <p className="text-3xl text-destructive">{message}</p>
    </div>
  );
}
