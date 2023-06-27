import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Single from "./pages/Single";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import MyPosts from "./pages/MyPosts";
import "./style.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <NavigationBar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/myPosts",
    element: (
      <>
        <NavigationBar />
        <MyPosts />
        <Footer />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <NavigationBar />
        <Register />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <NavigationBar />
        <Login />
      </>
    ),
  },
  {
    path: "/post/:id",
    element: (
      <>
        <NavigationBar />
        <Single />
        <Footer />
      </>
    ),
  },
  {
    path: "/write",
    element: (
      <>
        <NavigationBar />
        <Write />
        <Footer />
      </>
    ),
  },
  {
    path: "/edit",
    element: (
      <>
        <NavigationBar />
        <Write />
        <Footer />
      </>
    ),
  },
]);

function App() {
  return (
    <div className="app">
      <img className="background" />
      <div className="main">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
