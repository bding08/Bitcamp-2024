import React from "react";
import InterestsBtn from "../components/InterestsBtn";
import InterestPageFooter from "../components/InterestPageFooter";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import axios from "axios";

const setupRoute = async () => {
  const session = await getServerSession(authOptions);

  const fitness = [
    "Running",
    "Walking",
    "Cycling",
    "Mountain Biking",
    "Obstacles",
    "Basketball",
    "Football",
    "Exercise",
    "Weightlifting",
  ];

  const personalWellness = ["Meditation", "Reading", "Writing"];

  const travelAndOutdoor = ["Hiking", "Rafting", "Climbing", "Travel"];

  const other = [
    "Cooking",
    "Photography",
    "Music",
    "Painting or drawing",
    "Gardening",
    "Fashion",
    "Film and cinema",
    "Technology ",
    "History",
    "Science",
    "Gaming",
    "Performing arts ",
    "Cars and automotive culture",
    "Social justice and advocacy",
  ];

  const response = await axios.post("http://localhost:3000/api/userInterests", {
    email: session?.user.email,
  });
  const interestArr: string[] = [];

  if (!response.data.interests === null) {
    const interestArr: string[] = response.data.interests;
  }

  if (session?.user) {
    return (
      <div className="space-y-10 w-full h-screen pt-28 ">
        <div className="flex flex-col ml-[8.33%] space-y-8 ">
          <h1 className="text-4xl ">Tell us what you love!</h1>

          <div className="rounded-lg  shadow-lg bg-white p-4 w-11/12 space-y-8">
            <h2 className="text-3xl  mb-4 pl-4">Fitness</h2>

            <div className="grid items-center justify-center grid-cols-3 w-full gap-4 container px10">
              <div className="hidden">
                <InterestsBtn
                  key={"dummy"}
                  name={"dummmy"}
                  interests={interestArr}
                />
              </div>
              {fitness.map((interestItem) => (
                <InterestsBtn
                  key={interestItem}
                  name={interestItem}
                  interests={interestArr}
                />
              ))}
            </div>
          </div>

          <div className="rounded-lg shadow-lg bg-white p-4 w-11/12 space-y-8">
            <h2 className="text-3xl  mb-4 pl-4">Health</h2>

            <div className="grid items-center justify-center grid-cols-3 w-full gap-4 container px10">
              {personalWellness.map((interestItem) => (
                <InterestsBtn
                  key={interestItem}
                  name={interestItem}
                  interests={interestArr}
                />
              ))}
            </div>
          </div>

          <div className="rounded-lg shadow-lg bg-white p-4 w-11/12 space-y-8 ">
            <h2 className="text-3xl  mb-4 pl-4">Travel and Outdoor</h2>

            <div className="grid items-center justify-center grid-cols-3 w-full gap-4 container px10 ">
              {travelAndOutdoor.map((interestItem) => (
                <InterestsBtn
                  key={interestItem}
                  name={interestItem}
                  interests={interestArr}
                />
              ))}
            </div>
          </div>

          <div className="rounded-lg shadow-lg bg-white p-4 w-11/12 space-y-8 ">
            <h2 className="text-3xl  mb-4 pl-4">Other</h2>

            <div className="grid items-center justify-center grid-cols-3 w-full gap-4 container px10 ">
              {other.map((interestItem) => (
                <InterestsBtn
                  key={interestItem}
                  name={interestItem}
                  interests={interestArr}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 left-0 pt-16">
          <InterestPageFooter
            email={session.user.email}
            interests={interestArr}
          />
        </div>
      </div>
    );
  }
  return <h2 className="text-2xl">Please login to access your home page</h2>;
};

export default setupRoute;
