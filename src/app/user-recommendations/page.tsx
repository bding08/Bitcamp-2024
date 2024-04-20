import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import "./group-style.css";
import RecommendedGroupCard from "../components/RecommendedGroupCard";
import axios from "axios";

const UserRecommendations = async () => {
  const session = await getServerSession(authOptions);
  const emailID = session?.user.email;
  const response = await axios.post("http://localhost:3000/api/recommended-groups", {
    email: emailID,
});
  const eventObject = response.data.events;

  // console.log(session);
  // const eventObject = [
  //   {
  //     description:
  //       "On the third Saturday of every month, Highline RxR hosts the best up-and-coming comedians in the country. This month we have FOUR headliner-level comics for ONE low price! Two of DC's best, Randolph Terrance and The Gwynn Factor, along with Trevor Joyner coming back to the area from Los Angeles, and Sista Lu coming up from Columbus, Ohio. You do not want to miss this! Free parking, drink specials, and just five minutes from the Crystal City Metro!",
  //     imageurl:
  //       "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F683383249%2F75916953603%2F1%2Foriginal.20240126-154529?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2400%2C1200&s=994e2701af4abfc50afed084314a7518",
  //     eventurl:
  //       "https://www.eventbrite.com/e/highline-rxr-april-comedy-showcase-tickets-811453347807?aff=ebdssbdestsearch",
  //     title: "Highline RxR April Comedy Showcase",
  //     capacity: 10,
  //   },
  //   {
  //     description:
  //       "On the third Saturday of every month, Highline RxR hosts the best up-and-coming comedians in the country. This month we have FOUR headliner-level comics for ONE low price! Two of DC's best, Randolph Terrance and The Gwynn Factor, along with Trevor Joyner coming back to the area from Los Angeles, and Sista Lu coming up from Columbus, Ohio. You do not want to miss this! Free parking, drink specials, and just five minutes from the Crystal City Metro!",
  //     imageurl:
  //       "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F732770209%2F327624419937%2F1%2Foriginal.20240401-154334?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=79%2C0%2C1468%2C734&s=40a8ab8f24ec244156949bd8ea5a2627",
  //     eventurl:
  //       "https://www.eventbrite.com/e/highline-rxr-april-comedy-showcase-tickets-811453347807?aff=ebdssbdestsearch",
  //     title: "Highline RxR April Comedy Showcase",
  //     capacity: 10,
  //   },
  // ];
  if (session?.user) {
    return (
      <div className=" space-y-10 w-10/12 h-full pt-28">
        <h1 className="text-4xl">Recommended Activities</h1>

        <div className="grid-3">
          {eventObject.map((obj: { title: string; description: string; imageURL: string; url: string; capacity: number; date: string, price: number}) => {
            return (<RecommendedGroupCard
              key={obj.title}
              title={obj.title}
              description={obj.description}
              imageurl={obj.imageURL}
              eventurl={obj.url}
              capacity={obj.capacity}
              date={obj.date}
              price={obj.price}
            />);
          })}
        </div>
      </div>
    );
  }

  return <h2 className="text-2xl">Please login to access your home page</h2>;
};

export default UserRecommendations;
