import { NavLink } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const navStyle = ({ isActive }) => ({
    display: "block",
    padding: "10px 15px",
    marginBottom: "10px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "white",
    backgroundColor: isActive ? "#495057" : "transparent",
    border: isActive ? "1px solid #6c757d" : "1px solid transparent",
    transition: "all 0.3s ease",
    fontWeight: isActive ? "600" : "400",
  });

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#212529",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px",
      }}
    >
      <h3 className="text-white mb-4">My Portfolio</h3>

      <div className="d-flex flex-column">
        <NavLink to="/" end style={navStyle}>
          Home
        </NavLink>

        <NavLink to="/skills" style={navStyle}>
          Skills
        </NavLink>

        <NavLink to="/projects" style={navStyle}>
          Projects
        </NavLink>

        <NavLink to="/certifications" style={navStyle}>
          Certifications
        </NavLink>

        <NavLink to="/resume" style={navStyle}>
          Resume
        </NavLink>

        <NavLink to="/profiles" style={navStyle}>
          Profiles
        </NavLink>

        {!token ? (
          <NavLink className="btn btn-success mt-3" to="/login">
            Admin Login
          </NavLink>
        ) : (
          <button
            className="btn btn-danger mt-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;