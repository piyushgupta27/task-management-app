import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


const App = () => (
  <Router>
    <Header />
    <Routes>
      {/* add all routes here */}
    </Routes>
    <Footer />
  </Router>
);

export default App;
