
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Navbar from './components/Navbar.jsx'
import User from './components/User.jsx'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar /><Home /></>
    },
    {
      path: "/about",
      element: <><Navbar /><About /></>
    },
    {
      path: "/contact",
      element: <><Navbar /><Contact /></>
    },
    {
      path: "/user/:username",
      element: <><Navbar /><User /></>
    }
  ])

  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
