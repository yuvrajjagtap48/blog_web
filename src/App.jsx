import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./components/Profile";
import BlogDetail from "./components/BlogDetail";
import NewBlog from "./components/NewBlog";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Blogs />} />
              <Route path="blog/:id" element={<BlogDetail />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/newblog" element={<NewBlog />} />
          </Routes>
        </BrowserRouter>
    </Provider>
  );
}

export default App;
