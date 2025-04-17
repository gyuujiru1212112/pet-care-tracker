interface LoadingMessageProps {
  message: string;
}

export default function LoadingMessage({ message }: LoadingMessageProps) {
  return (
    <div className="flex justify-center items-center pt-20">
      <p className="text-2xl text-gray">{message}</p>
    </div>
  );
}
