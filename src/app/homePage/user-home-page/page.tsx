import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const UserHomePage = async () => {
  const session = await getServerSession(authOptions);
  // console.log(session);

  if (session?.user) {
    // console.log("username: " + session.user.username);
    return (
      <h2 className="text-2xl">
        Welcome to your Home Page, {session?.user.username}
      </h2>
    );
  }

  return <h2 className="text-2xl">Please login to access your home page</h2>;
};

export default UserHomePage;
