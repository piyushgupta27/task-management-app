import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import TaskPage from "./pages/TaskPage";


const App = () => (
  <Router>
    <Header />
    <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/tasks" element={<TaskPage />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
