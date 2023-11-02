import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Forgot from "./Components/Auth/Forgot";
import StepsLayout from "./Components/User/Layout/StepsLayout";
import LLMLayout from "./Components/User/Layout/LLMLayout";
import SpokenLayout from "./Components/User/Layout/SpokenLayout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/user" element={<StepsLayout />} />
        <Route path="/user/llm" element={<LLMLayout />} />
        <Route path="/user/speech" element={<SpokenLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
