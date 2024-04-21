"use client";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Button } from "./ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { group } from "console";
import { NumericKeys } from "react-hook-form/dist/types/path/common";
import { Proportions } from "lucide-react";

interface GroupProp {
  title: string;
  description: string;
  imageurl: string;
  eventurl: string;
  capacity: number;
  date: string;
  price: number;
  groupID: number,
  email: string | null | undefined,
  progress: number,
  numMembers: number,
}

type CardProps = React.ComponentProps<typeof Card>;

const RecommendedGroupCard: FC<GroupProp> = (prop: GroupProp) => {

  const router = useRouter();

  const getProgress = async () => {
    const response = await axios.post("http://localhost:3000/api/usersOfGroup", 
      {
        groupID: prop.groupID,
      });

    if (response.status === 200 && response.data && Array.isArray(response.data)) {
      const usersArray = response.data;
      const totalUsers = usersArray.length;
      
      prop.numMembers = totalUsers;

      // Calculate progress based on some logic (e.g., percentage of users)
      prop.progress = Math.floor((totalUsers / prop.capacity) * 100); // Example logic

    } else {
      // Handle unsuccessful response
      console.error("Failed to fetch users data.");
      prop.progress = 0; // Return 0 if response is unsuccessful
    }
  }
  const handleClick = async () => {
    await axios.post(
      "http://localhost:3000/api/joinGroup",
      {
        email: prop.email,
        groupId: prop.groupID
      }
    );
    router.refresh();
  }

  function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const date = new Date(prop.date);
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
  const month = date.toLocaleDateString("en-US", { month: "long" });
  const dayOfMonth = date.getDate();
  const ordinalSuffix = getOrdinalSuffix(dayOfMonth);
  const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}${ordinalSuffix}`;

  getProgress();

  return (
    <Card>
      <CardHeader>
        <img className="rounded-md pb-3" src={prop.imageurl} alt="Beautiful sunset behind mountains" />
        <CardTitle>{prop.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>More Information</AccordionTrigger>
            <AccordionContent>
              <p className="pb-1 text-lg font-semibold">${prop.price}</p>
              <p className="pb-1 text-lg font-semibold">{formattedDate}</p>
              <p className="pb-1">{prop.description}</p>
              <a href={prop.eventurl} target="_blank">
          Link to Event
        </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div>
          {prop.numMembers} / {prop.capacity} people signed up.
        </div>
        <Progress  value={prop.progress} />
      </CardContent>
      <CardFooter>
        <Button onClick={handleClick} variant="longSecondary">
          Join Group
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendedGroupCard;
