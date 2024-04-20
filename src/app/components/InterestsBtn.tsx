import React, { FC } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "./ui/button";

interface InterestProp {
  name: string;
}

const InterestsBtn: FC<InterestProp> = (prop: InterestProp) => {
  return (
    <div>
      {" "}
      <Button>{prop.name}</Button>{" "}
    </div>
  );
};

export default InterestsBtn;
