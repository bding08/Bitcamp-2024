
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { FC } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

interface GroupProp {
  title: string,
  description: string,
  imageurl: string,
  eventurl: string,
  capacity: number,
}

type CardProps = React.ComponentProps<typeof Card>

const RecommendedGroupCard: FC<GroupProp> = (prop: GroupProp) => {
  return (
    <Card>
        <CardHeader>
          <img src={prop.imageurl} alt="Beautiful sunset behind mountains"/>
            <CardTitle>{prop.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
            <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
              <p>{prop.description}</p>
              </AccordionContent>
          </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>
          <a href={prop.eventurl} target="_blank">Link to Event</a>
        </CardFooter>
    </Card>
  )
};

export default RecommendedGroupCard;