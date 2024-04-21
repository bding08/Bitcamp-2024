"use client";

import { cn } from "@/lib/utils";
import "./group-card.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
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

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./ui/navigation-menu"

import { ScrollArea } from "./ui/scroll-area"

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
}

type CardProps = React.ComponentProps<typeof Card>;

const UserInGroupCard: FC<GroupProp> = (prop: GroupProp) => {

  const router = useRouter();

  const handleClick = async () => {
    await axios.post(
      "http://localhost:3000/api/deleteGroup",
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

        <div className="centered-content">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>See other guests</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ScrollArea className="h-72 w-48 rounded-md border">
                  {/* <div className="p-4">
                  <h4 className="mb-4 text-sm font-medium leading-none">Guests</h4>
                    {guests.map((guests) => (
                      <>
                    <div key={tag} className="text-sm">
                      {tag}
                    </div>
                  
                    </>
                      ))}
                  </div> */}
    </ScrollArea>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        </div>

      </CardContent>
      <CardFooter>
        <Button onClick={handleClick} variant="longDestructive">
          Leave Group
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserInGroupCard;
