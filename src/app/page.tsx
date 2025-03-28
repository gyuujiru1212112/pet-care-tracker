import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col md:flex-row">
      {/* Text and Button */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-accent p-8 md:flex-col">
        <div className="w-full overflow-hidden mb-6">
          <div className="scrolling-text">
            <span>🚶‍♂️ Walked for 1 hour</span>
            <span>🪮 Brushed 2 times</span>
            <span>🍭 Played a stick toy</span>
          </div>
        </div>

        <h1 className="text-5xl text-amber-600 font-semibold mb-4 text-center">
          🐾 Welcome to Pet Care Tracker 🐾
        </h1>
        <Link href="/register">
          <Button className="mt-6 text-amber-600 bg-white border border-amber-600 hover:bg-amber-100 px-6 py-5 text-xl">
            Get Started
          </Button>
        </Link>
      </div>
      {/* Image */}
      {/* todo adjust the image space */}
      <div className="relative flex-shrink-0 w-full md:w-1/2 aspect-w-16 aspect-h-9 overflow-hidden bg-cover bg-repeat">
        <img
          src="/background.jpg"
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
