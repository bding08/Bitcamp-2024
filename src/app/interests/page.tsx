"use client";

import React, { useState } from "react";
import InterestsBtn from "../components/InterestsBtn";
import { Button } from "../components/ui/button";
import { VariantProps } from "class-variance-authority";

interface variant {
  default: "bg-primary text-primary-foreground hover:bg-primary/90";
  destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90";
  outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80";
  ghost: "hover:bg-accent hover:text-accent-foreground";
  link: "text-primary underline-offset-4 hover:underline";
}

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

      <div className="grid space-x-2 items-center justify-center  grid-cols-4 gap-3 container px10">
        {interestList.map((interestItem) => (
          //{btnClass as variant}>
          <Button onClick={handleClick} variant="secondary">
            {interestItem}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default setupRoute;
