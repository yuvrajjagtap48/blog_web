import { BrowserRouter, Route, Routes } from "react-router-dom";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Body from "./components/Body";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path="/feed" element={<Feed />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
