import { Link } from "react-router-dom";

function Dashboard() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container mt-5">
      <h1>Admin Panel</h1>

      <div className="list-group mt-4">

        <Link
          to="/dashboard/about"
          className="list-group-item"
        >
          Manage About
        </Link>

        <Link
          to="/dashboard/skills"
          className="list-group-item"
        >
          Manage Skills
        </Link>

        <Link
          to="/dashboard/projects"
          className="list-group-item"
        >
          Manage Projects
        </Link>

        <Link
          to="/dashboard/certifications"
          className="list-group-item"
        >
          Manage Certifications
        </Link>

        <Link
          to="/dashboard/resume"
          className="list-group-item"
        >
          Manage Resume
        </Link>

        <Link
          to="/dashboard/contact"
          className="list-group-item"
        >
          Manage Contact
        </Link>

        <Link
  to="/dashboard/home"
  className="list-group-item"
>
  Manage Home
</Link>

      </div>

      <button
        className="btn btn-danger mt-4"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;