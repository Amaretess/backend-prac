import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users")
      .then((res => setUsers(res.data)))
      .catch((err) => setError(err.message))

    // -------> TRY CATCH <-------
    // const getUsers = async () => {
    //   try {
    //     const res = await axios
    //       .get<User[]>("https://jsonplaceholder.typicode.com/users");
    //     setUsers(res.data);
    //   } catch (err) {
    //     setError((err as AxiosError).message)
    //   }
    // }
    // getUsers()
  }, [])

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {users.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </>
  )
}

export default App
