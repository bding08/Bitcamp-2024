import UserInGroupCard from "../components/UserInGroupCard";
import './active-groups.css';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"
import { toast } from "../components/ui/use-toast";
import { useEffect, useState } from "react";
import axios from "axios";

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

const ActiveGroupsPage = async () => {
  
  const session = await getServerSession(authOptions);

  if (session?.user && session?.user.email) {
    // console.log(session);
     // Call fetchGroups when the component mounts
    const emailID = session?.user.email;
    const response = await axios.post("http://localhost:3000/api/groupsOfUser", {
      email: session?.user.email,
    });
    
    // Usage example:
    const eventObject = response.data.map((item: EventData) => ({
        groupID: item.groupID,
        event: item.event
      }));

    //console.log("Print");
    //console.log(events);


    return (
        <div className="space-y-10 w-10/12 h-full pt-28">
            <h1 className="text-4xl">Your Groups Page</h1>
            
            <div className = "grid-3">
            {eventObject.map(
            (obj: {
              groupID: number,
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
            }) => {
              return (
                <UserInGroupCard
                key={obj.groupID}
                title={obj.event.title}
                description={obj.event.description}
                imageurl={obj.event.imageURL}
                eventurl={obj.event.url}
                capacity={obj.event.capacity}
                date={obj.event.date}
                price={obj.event.price}
                groupID={obj.groupID}
                email={emailID}
                />
              );
            }
          )}
            </div>
            
        </div>
    );
  }
  return <h2 className="text-2xl">Please login to access your home page</h2>;
};

export default ActiveGroupsPage;