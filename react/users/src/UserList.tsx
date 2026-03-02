import type { User } from "./types";

const UserList = ({ users }: { users: User[] }) => {
  return (
    <div className="user-list">
      {users.map(user => (
        <div className="user-card" key={user.id} >
          <h2>{ user.name }</h2>
          <p>age: { user.age }</p>
        </div>
      ))}
    </div>
  );
}
 
export default UserList;