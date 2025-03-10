import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from "./Home";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Logout from "./Logout";
import Transfer from "./Transfer";


const AppLayout: React.FC = () => {
  
    return (
      <div className="app-container">
        <ToastContainer aria-label={undefined}/>
        <Header/>
  
        <div className="main-content">
          <aside className="left-side">
          </aside>
          
          <main className="main">
              <Routes>
                <Route path="/home"      element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/transfer"  element={<Transfer />} />
                <Route path="/logout"    element={<Logout />} />
              </Routes>
          </main>
          
          <aside className="right-side">
          </aside>
        </div>

        {/* <div className="footer">
          werer
        </div> */}
  
    </div>
  
    );
  };
  
export default AppLayout;