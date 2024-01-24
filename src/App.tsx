import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState(false)

  useEffect(() => {
    axios.get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then(response => setUsers(response.data))
      .catch((error) => setError(error.message))
  }, [])

  return (
    <>
      {error && <p className="text-danger" >{error}</p>}
      <ul>
        {users.map(user => <li key={user.id} >{user.name}</li>)}
      </ul>
    </>
  )
}

export default App
