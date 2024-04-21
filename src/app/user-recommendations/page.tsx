import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import "./group-style.css";
import RecommendedGroupCard from "../components/RecommendedGroupCard";
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

const UserRecommendations = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const emailID = session?.user.email;
    const response = await axios.post(
      "http://localhost:3000/api/recommended-groups",
      {
        email: emailID,
      }
    );
    // const eventObject: EventData["event"][] = response.data.map(
    //   (item: { event: any }) => {
    //     return item.event;
    //   }
    // );
    const eventObject = response.data.map((item: EventData) => ({
      groupID: item.groupID,
      event: item.event,
    }));

    return (
      <div className=" space-y-10 w-10/12 h-full pt-28">
        <h1 className="text-4xl">Recommended Activities</h1>

        <div className="grid-3">
          {eventObject.map(
            (obj: {
              groupID: number;
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
                <RecommendedGroupCard
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

export default UserRecommendations;
