import { UserInGroupCard } from "../components/UserInGroupCard"
import './active-groups.css';
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const ActiveGroupsPage = async () => {
    const session = await getServerSession(authOptions);
  // console.log(session);

  if (session?.user) {
  
    return (
        <div className="space-y-4">
            <h1 className="text-4xl">Your Groups Page</h1>
            
            <div className = "grid-3">
                <UserInGroupCard/>
                <UserInGroupCard/>
                <UserInGroupCard/>
            </div>
            
        </div>
    );
  }
  return <h2 className="text-2xl">Please login to access your home page</h2>;
};

export default ActiveGroupsPage;