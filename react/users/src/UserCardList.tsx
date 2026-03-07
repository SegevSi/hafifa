import type { User } from "./types";
import UserCard from "./UserCard";

const UserCardList = ({ users }: { users: User[] }) => {
  return (
    <div className="user-list">
      {users.map(user => (
        <UserCard key={user.id} user={user}/>
      ))}
    </div>
  );
}
 
export default UserCardList;