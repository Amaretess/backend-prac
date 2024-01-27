import { useEffect, useState } from "react";
import apiClient, { CanceledError } from "./services/api-client";
import userService, { User } from "./services/user-service";

const App = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // ----> ABORTS ASYNCHRONOUS REQUESTS <-----
    setIsLoading(true)

    userService
      .getAllUsers()
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setIsLoading(false);
      })


    return () => controller.abort();

  }, [])


  const deleteUser = (user: User) => {
    const originalUsers = [...users]

    setUsers(users.filter(u => u.id !== user.id))

    apiClient
      .delete(`/users/${user.id}`)
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers)
      })
  }

  const addUser = () => {
    const originalUsers = [...users];
    const newUser = { id: 0, name: 'Mosh' };
    setUsers([newUser, ...users]);

    apiClient.post('/users', newUser)
      .then(({ data: userData }) => setUsers([userData, ...users]))
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers)
      })
  }

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const updatedUser = { ...user, name: user.name + '!' };
    setUsers(users.map(u => u.id === user.id ? updatedUser : u));

    apiClient.patch('/users/' + user.id, updatedUser)
      .catch(err => {
        setError(err.message);
        setUsers(originalUsers)
      })
  }

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={() => addUser()}>Add</button>
      <ul>
        {users.map(user => <li className="list-group-item d-flex justify-content-between" key={user.id}>{user.name}
          <div>
            <button className="btn btn-outline-secondary" onClick={() => updateUser(user)}>update</button>
            <button className="btn btn-outline-danger mx-1" onClick={() => deleteUser(user)}>Delete</button>
          </div>

        </li>)}
      </ul>
    </>
  )
}

export default App
