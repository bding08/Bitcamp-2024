"use client";

import React, { FC, useState } from "react";
import { Button } from "./ui/button";

interface InterestProp {
  key: string;
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
  const currVariant = prop.interests.includes(prop.name as string)
    ? "secondary"
    : "outline";

  const [btnVaraint, setBtnVariant] = useState(currVariant);
  // const session = await getServerSession(authOptions);

  const handleClick = () => {
    const newVariant = btnVaraint === "secondary" ? "outline" : "secondary";

    if (!prop.interests.includes(prop.name)) {
      prop.interests.push(prop.name);
    } else {
      prop.interests.splice(
        prop.interests.indexOf(prop.name),
        prop.interests.indexOf(prop.name) + 1
      );
    }

    setBtnVariant(newVariant);
    console.log("test: " + prop.interests);
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
