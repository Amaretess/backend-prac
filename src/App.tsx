import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";


const App = () => {

  const { users, setUsers, error, setError, } = useUsers()

  const updateUser = (user: User) => {
    const originalUsers = [...users]
    const updatedUser = { ...user, name: 'you selected: ' + user.name }
    setUsers(users.map(u => u.id === user.id ? updatedUser : u))

    userService.update(updatedUser).catch((err) => {
      setError(err.message);
      setUsers(originalUsers);
    })

  }
  const deleteUser = (id: number) => {
    setUsers(users.filter(u => u.id !== id))

    userService.delete(id);
  }

  return (
    <>
      {error && <p className="text-danger">{error}</p>}
      {isLoading && <p className="spinner-border"></p>}
      <ul className="list-group" >
        {users.map((user) => (
          <li className="list-group-item d-flex justify-content-between" key={user.id}>
            {user.name}
            <div>
              <button className="btn btn-outline-secondary" onClick={() => updateUser(user)}>Update</button>
              <button className="btn btn-outline-danger" onClick={() => deleteUser(user.id)} >Delete</button>
            </div>
          </li>

        ))}

      </ul>
    </>
  )
}

export default App
