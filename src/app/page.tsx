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
          className="object-cover opacity-70"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
        <div className="w-3/4">
          {" "}
          {/* Set width to 3/4 of the screen */}
          <h1 className="text-7xl text-center font-bold mb-4">Welcome!</h1>
          <p className="text-3xl text-center px-5">
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah blah blah blah
            blah blah blah blah blah blah blah blah blah blah
          </p>
        </div>
      </div>
    </div>
  );
}
