import { BrowserRouter, Route, Routes } from "react-router-dom";
import Blogs from "./components/Blogs";
import Login from "./components/Login";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import BlogDetail from "./components/BlogDetail";
import SearchResults from "./components/SearchResults";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Blogs />} />
              <Route path="search" element={<SearchResults />} />
              <Route path="blog/:id" element={<BlogDetail />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
    </Provider>
  );
}

export default App;
