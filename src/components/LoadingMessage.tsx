interface LoadingMessageProps {
  message: string;
}

export default function LoadingMessage({ message }: LoadingMessageProps) {
  return <p className="text-center text-sm text-gray-500 pt-20">{message}</p>;
}
