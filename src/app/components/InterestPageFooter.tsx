"use client";

import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "./ui/use-toast";
import axios from "axios";
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

interface InterestPageFooterProp {
  email: string | null | undefined;
  interests: Set<String>;
}

interface Event {
  title: string;
  eventID: number;
}

interface EventData {
  groupID: number;
  eventID: number;
  event: {
    eventID: number;
    description: string;
    url: string;
    imageURL: string;
    title: string;
    capacity: number;
    date: string;
    price: number;
  };
}

const InterestPageFooter: FC<InterestPageFooterProp> = (
  prop: InterestPageFooterProp
) => {
  //   const session = await getServerSession(authOptions);
  const router = useRouter();

  const recommendGroupsWithGPT = async () => {
    console.log("running gpt");

    const userCurrentGroups = await axios.post(
      "http://localhost:3000/api/groupsOfUser",
      {
        email: prop.email,
      }
    );

    // Usage example:
    const userEventObject: number[] = userCurrentGroups.data.map(
      (item: EventData) => item.eventID
    );

    const allEventsResponse = await axios.get("/api/recommended-groups");

    console.log(allEventsResponse.data);

    //const allEventsIDsArray: number[] = allEventsResponse.data.map((event: { eventID: number; }) => event.eventID);

    const filteredData = allEventsResponse.data.filter(
      (item: { title: string; eventID: number }) =>
        !userEventObject.includes(item.eventID)
    );

    //const removedCurrentIDs: number[] = allEventsIDsArray.filter(allEventsIDsArray => !userEventObject.includes(allEventsIDsArray));

    console.log(filteredData);
    //console.log(removedCurrentIDs)

    const formattedString: string = filteredData
      .map(
        (item: { title: string; eventID: number }) =>
          `${item.title} (${item.eventID})`
      )
      .join(", ");
    console.log(formattedString);
    const eventsTitlesArray: string[] = filteredData.map(
      (event: { title: string }) => event.title.trim()
    );

    console.log(eventsTitlesArray);
    console.log(prop.interests);
    const interestArr: String[] = Array.from(prop.interests);

    console.log("interestArr: " + interestArr);

    const api_key = process.env.NEXT_PUBLIC_GEMINI_KEY;

    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest" });

    var prompt = `You are recommending what events a person might be interested in based on their interests.`;
    prompt += `The person has the following hobbies: ${interestArr.join(
      ", "
    )}.`;
    prompt += ` These are some events happening in DC soon: ${formattedString}`;
    prompt += ` Given the person\'s interests, rank those events in order of which the person would most enjoy based on the event title.`;
    prompt += ` Make sure to rank the events based on the person's hobbies that we provided. Do not select events with comedy in the tile unless otherwise prompted`;
    prompt += ` For the output, give only the ids of the events in a comma seperated array. Make sure there are no hobbies in the final output.`;
    prompt += ` Only use the events in the output. Limit to the 5 best matching events.`;

    const result = await model.generateContent(prompt);

    console.log(result);
    if (result == null || result == undefined) {
      console.error("Gemini generate failed.");
    }
    const modelResponse = await result.response;
    const text = modelResponse.text();

    const outputArray = text.split(", ").map(Number);

    console.log(outputArray);

    await axios.put("/api/recommended-groups", {
      email: prop.email,
      eventIDs: outputArray,
    });
  };

  const handleClick = async () => {
    const interestArr: String[] = Array.from(prop.interests);

    const response = await fetch("/api/userInterests", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: prop.email,
        interests: interestArr,
      }),
    });

    if (response.ok) {
      router.refresh();
      router.push("/user-recommendations");
    } else {
      toast({
        title: "Error Updating Interests",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }

    recommendGroupsWithGPT();
    router.refresh();
  };

  return (
    <div className="py-2 bg-zinc-100 border-b border-s-zinc-200 fixed w-full z-10 bottom-0">
      <div className="float-right px-10">
        <Button variant="outline" onClick={handleClick}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default InterestPageFooter;
