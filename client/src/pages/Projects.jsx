import { useEffect, useState } from "react";
import axios from "axios";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const token = localStorage.getItem("token");
  const [editingId, setEditingId] = useState(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveLink: "",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/projects"
      );

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addProject = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login as admin");
      return;
    }

    const response = await axios.post(
      "http://localhost:5000/api/projects",
      newProject,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Project added:", response.data);

    alert("Project Added");

    setNewProject({
      title: "",
      description: "",
      technologies: "",
      githubLink: "",
      liveLink: "",
    });

    setShowAddForm(false);

    fetchProjects();
  } catch (error) {
    console.error("Add project error:", error);

    if (error.response?.status === 401) {
      alert("Unauthorized. Please login again.");
    } else if (error.response?.status === 500) {
      alert("Server error. Check the backend terminal.");
    } else {
      alert("Failed to add project.");
    }
  }
};

  const deleteProject = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:5000/api/projects/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const updateProject = async (project) => {
  try {
    const token = localStorage.getItem("token");

    await axios.put(
      `http://localhost:5000/api/projects/${project._id}`,
      project,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Project Updated");

    setEditingId(null);

    fetchProjects();
  } catch (error) {
    console.log(error);
  }
};
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Projects</h2>

        {token && (
          <button
            className="btn btn-success"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            + Add Project
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="card p-3 mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                title: e.target.value,
              })
            }
          />

          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                description: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="form-control mb-2"
            placeholder="Technologies"
            value={newProject.technologies}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                technologies: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="form-control mb-2"
            placeholder="GitHub Link"
            value={newProject.githubLink}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                githubLink: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Live Link"
            value={newProject.liveLink}
            onChange={(e) =>
              setNewProject({
                ...newProject,
                liveLink: e.target.value,
              })
            }
          />

          <div>
  <button
    className="btn btn-primary me-2"
    onClick={addProject}
  >
    Save Project
  </button>

  <button
    className="btn btn-secondary"
    onClick={() => {
      setShowAddForm(false);

      setNewProject({
        title: "",
        description: "",
        technologies: "",
        githubLink: "",
        liveLink: "",
      });
    }}
  >
    Cancel
  </button>
</div>
        </div>
      )}

      {projects.map((project) => (
  <div
    key={project._id}
    className="card p-3 mb-3"
  >
    {editingId === project._id ? (
      <>
        <input
          className="form-control mb-2"
          value={project.title}
          onChange={(e) =>
            setProjects(
              projects.map((p) =>
                p._id === project._id
                  ? { ...p, title: e.target.value }
                  : p
              )
            )
          }
        />

        <textarea
          className="form-control mb-2"
          value={project.description}
          onChange={(e) =>
            setProjects(
              projects.map((p) =>
                p._id === project._id
                  ? {
                      ...p,
                      description: e.target.value,
                    }
                  : p
              )
            )
          }
        />

        <input
          className="form-control mb-2"
          value={project.technologies}
          onChange={(e) =>
            setProjects(
              projects.map((p) =>
                p._id === project._id
                  ? {
                      ...p,
                      technologies: e.target.value,
                    }
                  : p
              )
            )
          }
        />

        <input
          className="form-control mb-2"
          value={project.githubLink}
          onChange={(e) =>
            setProjects(
              projects.map((p) =>
                p._id === project._id
                  ? {
                      ...p,
                      githubLink: e.target.value,
                    }
                  : p
              )
            )
          }
        />

        <input
          className="form-control mb-3"
          value={project.liveLink}
          onChange={(e) =>
            setProjects(
              projects.map((p) =>
                p._id === project._id
                  ? {
                      ...p,
                      liveLink: e.target.value,
                    }
                  : p
              )
            )
          }
        />

        <div className="d-flex gap-2 mt-2">
  <button
    className="btn btn-success btn-sm"
    onClick={() => updateProject(project)}
  >
    Save
  </button>

  <button
    className="btn btn-outline-dark btn-sm"
    onClick={() => setEditingId(null)}
  >
    Cancel
  </button>
</div>
      </>
    ) : (
      <>
        <div className="d-flex justify-content-between align-items-center">
          <h4>{project.title}</h4>

          {token && (
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() =>
                  setEditingId(project._id)
                }
              >
                ✏️
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() =>
                  deleteProject(project._id)
                }
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <p>{project.description}</p>

        <p>
          <strong>Technologies:</strong>{" "}
          {project.technologies}
        </p>

        <div>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="me-3"
            >
              GitHub
            </a>
          )}

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
            >
              Live Demo
            </a>
          )}
        </div>
      </>
    )}
  </div>
))}
    </div>
  );
}

export default Projects;