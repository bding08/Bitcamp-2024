"use client";

import React, { FC, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "./ui/button";

interface InterestProp {
  name: string;
  interests: string[];
}

type variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

const InterestsBtn: FC<InterestProp> = (prop: InterestProp) => {
  const [btnClass, setBtnClass] = useState("outline");

  const handleClick = () => {
    const newVariant = btnClass === "secondary" ? "outline" : "secondary";

    if (!prop.interests.includes(prop.name)) {
      prop.interests.push(prop.name);
    } else {
      prop.interests.splice(
        prop.interests.indexOf(prop.name),
        prop.interests.indexOf(prop.name) + 1
      );
    }

    setBtnClass(newVariant);
    console.log(prop.interests);
  };

  return (
    <div className="flex justify-center">
      {" "}
      <Button
        className="text-lg w-full"
        onClick={handleClick}
        variant={btnClass as variant}
      >
        {prop.name}
      </Button>{" "}
    </div>
  );
};

export default InterestsBtn;
