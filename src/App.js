import AddArticle from "./components/AddArticle";
import Articles from "./components/Articles";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { ToastContainer } from "react-toastify";
import Article from "./components/Article";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/signin" element={<Login />} />
          <Route path="/article/:id" element={<Article/>} />
          <Route 
            path="/" element={
            <div className="row">
              <div className="col-md-8">
                <Articles />
              </div>
              <div className="col-md-4">
                <AddArticle />
                <ToastContainer />
              </div>
            </div>
          } />
        </Routes>
      <Navbar />
      
      </Router>
    </div>
  );
}

export default App;
