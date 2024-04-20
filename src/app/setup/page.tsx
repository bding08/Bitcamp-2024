import React from "react";
import InterestsBtn from "../components/InterestsBtn";
import { Button } from "../components/ui/button";

const setupRoute = () => {
  const interestList = [
    "hiking",
    "biking",
    "boxing",
    "basketball",
    "museum",
    "coding",
    "eating",
    "singing",
  ];

  return (
    <div className="text-2xl">
      <h1 className="flex items-center justify-center bg: ">Setup Page</h1>

      <div className="flex space-x-2 ">
        {interestList.map((interest) => (
          <Button>{interest}</Button>
        ))}
      </div>
    </div>
  );
};

export default setupRoute;
