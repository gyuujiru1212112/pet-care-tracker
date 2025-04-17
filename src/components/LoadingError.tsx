export default function LoadingError() {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center text-black space-y-2">
      <h2 className="text-xl font-semibold">Oops! Something went wrong.</h2>
      <p className="text-sm">
        We couldn't load the content. Please try again later or refresh the
        page.
      </p>
    </div>
  );
}
