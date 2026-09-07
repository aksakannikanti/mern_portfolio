import { useState } from "react";
import axios from "axios";

function Admin() {
  const [project, setProject] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveLink: "",
  });

  const handleChange = (e) => {
    setProject({
      ...project,
      [e.target.name]: e.target.value,
    });
  };

  const addProject = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login as admin");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        project,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Added Successfully");

      setProject({
        title: "",
        description: "",
        technologies: "",
        githubLink: "",
        liveLink: "",
      });
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
      } else {
        alert("Failed to add project");
      }
    }
  };

  return (
    <div className="container">
      <h2>Add Project</h2>

      <form onSubmit={addProject}>
        <input
          className="form-control mb-3"
          type="text"
          name="title"
          placeholder="Project Title"
          value={project.title}
          onChange={handleChange}
          required
        />

        <textarea
          className="form-control mb-3"
          name="description"
          placeholder="Description"
          value={project.description}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          type="text"
          name="technologies"
          placeholder="Technologies"
          value={project.technologies}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          type="text"
          name="githubLink"
          placeholder="GitHub Link"
          value={project.githubLink}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          type="text"
          name="liveLink"
          placeholder="Live Link"
          value={project.liveLink}
          onChange={handleChange}
        />

        <button className="btn btn-primary">
          Add Project
        </button>
      </form>
    </div>
  );
}

export default Admin;