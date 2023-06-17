import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  Navigate,
  Outlet,
} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <h1>App Layout</h1>
        <Link to='users'>Users List Page</Link>
        <Routes>
          <Route index element={<MainPage />} />
          <Route path='users' element={<UsersLayout />}>
            <Route index element={<UserListPage />} />
            <Route path=':userId' element={<Outlet />}>
              <Route index element={<Navigate to='profile' />} />
              <Route path='profile' element={<UserPage />} />
              <Route path='edit' element={<EditUserPage />} />
            </Route>
          </Route>
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
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

function UsersLayout() {
  return (
    <>
      <h1>Users Layout</h1>

      <Link to='/'>Main Page</Link>

      <Outlet />
    </>
  )
}

function UserPage() {
  const { userId } = useParams()

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

function UserListPage() {
  const users = [
    { id: 0, name: 'User 0' },
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
  ]

  return (
    <>
      <h1>Users List Page</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

function EditUserPage() {
  const { userId } = useParams()
  const anotherUserId = Number(userId) ? Number(userId) + 1 : userId + 1

  return (
    <>
      <h1>Edit User Page</h1>
      <ul>
        <li>
          <Link to={`/users/${userId}`}>Users profile Page</Link>
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
