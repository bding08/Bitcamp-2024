"use client";

import React, { FC, useState } from "react";
import { Button } from "./ui/button";
import { string } from "zod";

interface InterestProp {
  key: string;
  name: string;
  interests: Set<String>;
}

type variant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

const InterestsBtn: FC<InterestProp> = (prop: InterestProp) => {
  const currVariant = prop.interests.has(prop.name as string)
    ? "secondary"
    : "outline";

  const [btnVaraint, setBtnVariant] = useState(currVariant);
  // const session = await getServerSession(authOptions);

  const handleClick = () => {
    const newVariant = btnVaraint === "secondary" ? "outline" : "secondary";

    if (!prop.interests.has(prop.name)) {
      prop.interests.add(prop.name);
    } else {
      prop.interests.delete(prop.name);
    }

    setBtnVariant(newVariant);

    const arr: String[] = Array.from(prop.interests);
    console.log("test: " + arr);
  };

  return (
    <div className="flex justify-center">
      {" "}
      <Button
        className="text-lg w-full"
        onClick={handleClick}
        variant={btnVaraint as variant}
      >
        {prop.name}
      </Button>{" "}
    </div>
  );
};

export default InterestsBtn;
