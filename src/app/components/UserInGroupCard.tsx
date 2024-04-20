
import { cn } from "@/lib/utils"
import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

type GroupProp = React.ComponentProps<typeof Card>


const UserInGroupCard: FC<GroupProp> = (prop: GroupProp) => { 
  return (
    <Card>
        <CardHeader>
            <CardTitle>Event Name</CardTitle>
            <CardDescription>Event date</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Event Image</p>
            <p>Event Description</p>
        </CardContent>
        <CardFooter>
            <p>Card Footer</p>
        </CardFooter>
    </Card>
  )
};

export default UserInGroupCard;