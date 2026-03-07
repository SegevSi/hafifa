import type { User } from "./types";

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="user-card"  >
        <h2>{ user.name }</h2>
        <p>age: { user.age }</p>
    </div>
  );
}
 
export default UserCard;