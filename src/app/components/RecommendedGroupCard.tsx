import { cn } from "@/lib/utils";
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

interface GroupProp {
  title: string;
  description: string;
  imageurl: string;
  eventurl: string;
  capacity: number;
  date: string;
  price: number;
}

type CardProps = React.ComponentProps<typeof Card>;

const RecommendedGroupCard: FC<GroupProp> = (prop: GroupProp) => {
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
        <img src={prop.imageurl} alt="Beautiful sunset behind mountains" />
        <CardTitle>{prop.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent>
              <p>${prop.price}</p>
              <p>{formattedDate}</p>
              <p>{prop.description}</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter>
        <a href={prop.eventurl} target="_blank">
          Link to Event
        </a>
      </CardFooter>
    </Card>
  );
};

export default RecommendedGroupCard;
