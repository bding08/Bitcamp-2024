"use client";

import { Users } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "./ui/use-toast";
import axios from "axios";
const { GoogleGenerativeAI } = require("@google/generative-ai");

interface InterestPageFooterProp {
  email: string | null | undefined;
  interests: string[];
}

interface Event {
  title: string;
}

const InterestPageFooter: FC<InterestPageFooterProp> = (
  prop: InterestPageFooterProp
) => {
  //   const session = await getServerSession(authOptions);
  const router = useRouter(); 

  const recommendGroupsWithGPT = async () => {

    console.log("running gpt");

    const eventsResponse = await axios.get("/api/recommended-groups");
    const eventsArray: string[] = eventsResponse.data.map((event: { title: string; }) => event.title.trim());

    console.log(eventsArray)
    console.log(prop.interests)

    const api_key = "AIzaSyALezWBKRK3xrxAs8sfw4y2TiWPWzY0ijM";
    const genAI = new GoogleGenerativeAI(api_key);
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro-latest"});

    var prompt = `You are deciding how to recommend what a person should do for fun over the weekend.`;
    prompt += `The person has the following hobbies: ${prop.interests.join(', ')}.`;
    prompt += ` These are some events happening in DC soon: ${eventsArray.join(', ')}`;
    prompt += ` Given the person\'s interests, rank those events in order of which the person would most enjoy.`; 
    prompt += ` Only ouput a numbered list of the given events and nothing else. Make sure there are no hobbies in the final output.`;
    prompt += ` Only use the events in the output.`;

    console.log(prompt);

    const result = await model.generateContent(prompt);
    const modelResponse = await result.response;
    const text = modelResponse.text();
    console.log(text);

    return eventsArray;
  } 

  const handleClick = async () => {
    const response = await fetch("/api/userInterests", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: prop.email,
        interests: prop.interests,
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
