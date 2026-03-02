import "./index.css"
import UserList from "./UserList";
import useFetch from "./useFetch";
import type { User } from "./types";

const server: string = "http://localhost:8000";

const App = () => {
  const { error, isPending, data: users } = useFetch<User[]>(`${server}/users`);

  if (error) 
    alert("moadim lesimha");

  return (
    <div className=".app">
      { error && <div>{ "shilat buchnik" }</div> }
      { isPending && <div>Loading...</div> }
      { users && <UserList users={users} /> }
    </div>
  );
}
 

export default App
