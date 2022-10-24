import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignInModal from "./components/SignInModal";
import SignUpModal from "./components/SignUpModal";
import Home from "./pages/Home";
import Private from "./pages/Private/Private";
import PrivateHome from "./pages/Private/PrivateHome/PrivateHome";

function App() {
  return (
    <>
      <SignInModal />
      <SignUpModal />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/private" element={<Private />}>
          <Route path="/private/home" element={<PrivateHome />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
