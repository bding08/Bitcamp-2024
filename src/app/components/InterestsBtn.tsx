"use client";

import React, { FC, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "./ui/button";

interface InterestProp {
  name: string;
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
    setBtnClass(newVariant);
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
