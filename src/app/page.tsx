"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex h-screen">
      <div className=" flex justify-center items-center">
        <Image
          fill={true}
          src="/images/campfire.jpg" // Assuming the image is static and public
          alt="campfire"
          className="object-cover opacity-90"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <div className="w-3/4">
          {" "}
          {/* Set width to 3/4 of the screen */}
          <h1 className="text-7xl text-center font-bold mb-4">
            Welcome to Eventure
          </h1>
          <p className="text-xl text-center px-5">
            At Eventure, we're about more than just online interactions; we're
            here to bring you together with like-minded individuals, off the
            screen and into real-life adventures. When you join, we get to know
            you—your personality, interests, and passions. Using cutting-edge
            AI, Eventure identifies the most exciting activities and events
            happening in your city tailored just for you.
          </p>
        </div>
      </div>
    </div>
  );
}
