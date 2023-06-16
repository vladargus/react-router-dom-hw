import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useParams,
  Redirect,
} from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <h1>App Layout</h1>
        <Link to='/users'>Users List Page</Link>
        <Switch>
          <Route path='/users/:userId?/:type?' component={Users} />
          <Route path='/' exact component={MainPage} />
          <Redirect from='*' to='/' />
        </Switch>
      </BrowserRouter>
    </>
  )
}

function MainPage() {
  return (
    <>
      <h1>Main Page</h1>
    </>
  )
}

function Users() {
  const { userId, type } = useParams()
  const getUser = userId => users.find(user => user.id === userId)
  const users = [
    { id: 0, name: 'User 0' },
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
  ]

  return (
    <>
      <h1>Users Layout</h1>

      <Link to='/'>Main Page</Link>

      {userId ? (
        type === 'edit' ? (
          <EditUser />
        ) : (
          <User user={getUser(userId)} userId={userId} />
        )
      ) : (
        <UserList users={users} />
      )}
    </>
  )
}

function User() {
  const { userId, type } = useParams()

  if (type !== 'profile' && type !== 'edit')
    return <Redirect to={`/users/${userId}/profile`} />

  return (
    <>
      <h1>User Page</h1>
      <ul>
        <li>
          <Link to='/users'>Users List page</Link>
        </li>
        <li>
          <Link to={`/users/${userId}/edit`}>Edit this user</Link>
        </li>
      </ul>
      <p> {`userId: ${userId}`} </p>
    </>
  )
}

function UserList({ users }) {
  return (
    <>
      <h1>Users List Page</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}/profile`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

function EditUser() {
  const { userId } = useParams()
  const anotherUserId = Number(userId) + 1

  return (
    <>
      <h1>Edit User Page</h1>
      <ul>
        <li>
          <Link to={`/users/${userId}/profile`}>Users profile Page</Link>
        </li>
        <li>
          <Link to={`/users/${anotherUserId}`}>Another User</Link>
        </li>
        <li>
          <Link to='/users'>User List page</Link>
        </li>
      </ul>
      <p> {`userId: ${userId}`} </p>
    </>
  )
}

export default App
