
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"

type CardProps = React.ComponentProps<typeof Card>

export function CardDemo() {
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
}
