import { UserInGroupCard } from "../components/UserInGroupCard"
import './active-groups.css';

const ActiveGroupsPage = async () => {
  
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
};

export default ActiveGroupsPage;