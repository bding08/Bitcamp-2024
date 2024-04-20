import React, { useState } from "react";
import InterestsBtn from "../components/InterestsBtn";
import InterestPageFooter from "../components/InterestPageFooter";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import router from "next/router";
import axios from "axios";

const setupRoute = async () => {
  const session = await getServerSession(authOptions);

  const interestList = [
    "Cooking",
    "Photography",
    "Traveling",
    "Hiking",
    "Writing",
    "Reading",
    "Music",
    "Painting or drawing",
    "Gardening",
    "Fitness and exercise",
    "Yoga or meditation",
    "Fashion and styling",
    "Film and cinema",
    "Technology and gadgets",
    "History",
    "Science",
    "Sports",
    "Food and culinary exploration",
    "Volunteering + community service",
    "Gaming",
    "Crafting",
    "Performing arts ",
    "Cars and automotive culture",
    "Social justice and advocacy",
  ];

  const response = await axios.post("http://localhost:3000/api/userInterests", {
    email: session?.user.email,
  });
  const interestArr: string[] = response.data.interests;

  if (session?.user) {
    return (
      <div className="text-3xl space-y-5 absolute inset-x-0 top-20 ">
        <h1 className="flex items-center justify-center ">Setup Page</h1>

        <div className="grid items-center justify-center grid-cols-4 w-full gap-3 container px10">
          {interestList.map((interestItem) => (
            <InterestsBtn
              key={interestItem}
              name={interestItem}
              interests={interestArr}
            />
          ))}
        </div>

        <InterestPageFooter
          email={session.user.email}
          interests={interestArr}
        />
      </div>
    );
  }
  return <h2 className="text-2xl">Please login to access your home page</h2>;
};

export default setupRoute;
