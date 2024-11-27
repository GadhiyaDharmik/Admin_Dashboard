import React, { useState } from "react";
import { CAvatar, CFormInput, CFormSelect } from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoArrowUp, GoArrowDown } from "react-icons/go"; // Import icons
import { VscSearch } from "react-icons/vsc";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const UsersList = ({ users }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [favoriteUsers, setFavoriteUsers] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false); // State to manage filter visibility
  const [filters, setFilters] = useState({
    gender: "",
    birthDate: "",
    age: "",
  }); // Filter state

  // Sort users based on sortConfig
  const sortedUsers = [...(users || [])].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Filter users based on the search query
  const filteredUsers = sortedUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter based on selected filters
  const filteredWithCriteria = filteredUsers.filter((user) => {
    const isGenderMatch = filters.gender
      ? user.gender === filters.gender
      : true;
    const isBirthDateMatch = filters.birthDate
      ? user.birthDate === filters.birthDate
      : true;
    const isAgeMatch = filters.age ? user.age === parseInt(filters.age) : true;

    return isGenderMatch && isBirthDateMatch && isAgeMatch;
  });

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig((prevState) => ({
      key,
      direction:
        prevState.key === key && prevState.direction === "asc" ? "desc" : "asc",
    }));
  };

  // Handle adding/removing a user from favorites
  const toggleFavorite = (user) => {
    setFavoriteUsers((prevFavorites) => {
      if (prevFavorites.includes(user)) {
        return prevFavorites.filter((fav) => fav !== user);
      }
      return [...prevFavorites, user];
    });
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to format date as yyyy-m-d (1996-5-30)
  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = formattedDate.getMonth() + 1; // Months are 0-indexed
    const day = formattedDate.getDate();

    // Return formatted string as yyyy-m-d
    return `${year}-${month}-${day}`;
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // If the filter is for birthDate, format it before updating
    if (name === "birthDate") {
      // Format the date to yyyy-m-d
      const formattedDate = value ? formatDate(value) : "";
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: formattedDate, // Update birthDate filter
      }));
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value, // Update other filters (e.g., search query)
      }));
    }
  };
  // const handleFilterChange = (e) => {
  //   const { name, value } = e.target;
  //   setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  // };

  // Get the sort icon based on the direction
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? <GoArrowUp /> : <GoArrowDown />;
  };

  // Show only favorite users if the state is true
  const usersToDisplay = showFavorites ? favoriteUsers : filteredWithCriteria;

  return (
    <>
      <div className="searchbar-wrapper-container">
        <div className="title-section">
          <h2>Influencers</h2>
        </div>

        <div className="actions-section">
          {/* Search Bar */}
          <div className="searchbar">
            <div className="searchbar-wrapper">
              <div className="searchbar-left">
                <div className="search-icon-wrapper">
                  <span className="search-icon searchbar-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                    </svg>
                  </span>
                </div>
              </div>
              <div className="searchbar-center">
                <div className="searchbar-input-spacer" />
                <input
                  type="text"
                  className="searchbar-input"
                  maxLength={2048}
                  name="q"
                  autoCapitalize="off"
                  autoComplete="off"
                  title="Search"
                  placeholder="Search Influencers..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>

          {/* Favorites Button */}
          <button
            className="favorites-button"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            {showFavorites ? "Show All" : "Favorites "}
          </button>

          {/* Filters Button */}
          <button
            className="filters-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M10 18h4v-2h-4v2zm-7-6v2h18v-2H3zm3-6v2h12V6H6z" />
            </svg>
          </button>

          {/* Filters Section */}
          {showFilters && (
            <div className="filters-section">
              <div className="filter-item">
                <label htmlFor="gender">Gender:</label>
                <CFormSelect
                  name="gender"
                  id="gender"
                  value={filters.gender}
                  onChange={handleFilterChange}
                >
                  <option value="">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="Other">Other</option>
                </CFormSelect>
              </div>

              <div className="filter-item">
                <label htmlFor="birthDate">Birth Date:</label>
                <CFormInput
                  type="date"
                  name="birthDate"
                  id="birthDate"
                  // value={filters.birthDate}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filter-item">
                <label htmlFor="age">Age:</label>
                <CFormInput
                  type="number"
                  name="age"
                  id="age"
                  value={filters.age}
                  onChange={handleFilterChange}
                  min="1"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          maxHeight: "46.5rem",
          overflowY: "auto",
        }}
      >
        <table className="table align-middle">
          <thead className="bg-transparent">
            <tr>
              <th
                onClick={() => handleSort("name")}
                style={{ cursor: "pointer", color: "#989495" }}
              >
                User {getSortIcon("name")}
              </th>
              <th
                onClick={() => handleSort("email")}
                style={{ cursor: "pointer", color: "#989495" }}
              >
                Email {getSortIcon("email")}
              </th>
              <th
                onClick={() => handleSort("gender")}
                style={{ cursor: "pointer", color: "#989495" }}
              >
                Gender {getSortIcon("gender")}
              </th>
              <th
                onClick={() => handleSort("birthDate")}
                style={{ cursor: "pointer", color: "#989495" }}
              >
                Birth Date {getSortIcon("birthDate")}
              </th>
              <th
                onClick={() => handleSort("age")}
                style={{ cursor: "pointer", color: "#989495" }}
              >
                Age {getSortIcon("age")}
              </th>
              <th style={{ cursor: "pointer", color: "#989495" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersToDisplay.map((user, index) => (
              <tr key={index}>
                <td className="user-image">
                  <CAvatar src={user.image} size="md" className="me-3" />
                  <span>{user.name}</span>
                </td>

                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.birthDate.split("-").reverse().join("-")}</td>
                <td>{user.age}</td>
                <td>
                  <span
                    onClick={() => toggleFavorite(user)}
                    className="action-button"
                  >
                    {favoriteUsers.includes(user) ? (
                      <AiFillHeart size={20} />
                    ) : (
                      <AiOutlineHeart size={20} />
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UsersList;
