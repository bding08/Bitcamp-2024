"use client";

import React, { useState } from "react";
import InterestsBtn from "../components/InterestsBtn";
import { Button } from "../components/ui/button";
import { VariantProps } from "class-variance-authority";

type variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

const setupRoute = () => {
  const [btnClass, setBtnClass] = useState("secondary");

  const interestList = [
    "hiking",
    "biking",
    "boxing",
    "basketball",
    "museum",
    "coding",
    "eating",
    "singing",
    "hiking",
    "biking",
    "boxing",
    "basketball",
    "museum",
    "coding",
    "eating",
    "singing",
    "hiking",
    "biking",
    "boxing",
    "basketball",
    "museum",
    "coding",
    "eating",
    "singing",
  ];

  const handleClick = () => {
    const newVariant = btnClass === "secondary" ? "primary" : "secondary";
    setBtnClass(newVariant);
  };

  return (
    <div className="text-3xl space-y-5 absolute inset-x-0 top-20 ">
      <h1 className="flex items-center justify-center ">Setup Page</h1>

      <div className="grid items-center justify-center grid-cols-6 w-full gap-3 container px10">
        {interestList.map((interestItem) => (
          <InterestsBtn name={interestItem} />
        ))}
      </div>
    </div>
  );
};

export default setupRoute;
