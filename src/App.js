import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./Sidebar";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TableComponent from "./UsersList";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  CAvatar,
  CCollapse,
  CContainer,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavItem,
  CNavLink,
} from "@coreui/react";
import UsersList from "./UsersList";

const today = new Date();

// Get the day name
const dayName = today.toLocaleDateString("en-US", { weekday: "long" });

// Get the date
const day = today.getDate();

// Get the month name (short format)
const monthName = today.toLocaleDateString("en-US", { month: "short" });

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((res) =>
        setData(
          res.data.users.map((ele) => {
            return { ...ele, name: ele.firstName + " " + ele.lastName };
          })
        )
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="App d-flex">
        <Sidebar />
        <div className="w-100">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <span
                className="navbar-brand rochester-regular fs-1"
                style={{ color: "#d0516d" }}
              >
                Home
              </span>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item dropdown">
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <span className="dropdown-item" href="#">
                          Action
                        </span>
                      </li>
                      <li>
                        <span className="dropdown-item" href="#">
                          Another action
                        </span>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <span className="dropdown-item" href="#">
                          Something else here
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
                <span className="me-2 fs-5 fw-bold">
                  {dayName} , {day} {monthName}
                </span>
                <CAvatar
                  src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"
                  size="md"
                  className="me-3"
                />
              </div>
            </div>
          </nav>
          <header className="App-header">
            <UsersList users={data} />
          </header>
        </div>
      </div>
    </>
  );
}

export default App;
