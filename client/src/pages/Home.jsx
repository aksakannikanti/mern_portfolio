import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [home, setHome] = useState(null);
  const [editing, setEditing] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchHome();
  }, []);

  // GET is public
  const fetchHome = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/home`
      );

      setHome(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // PUT requires JWT
  const saveChanges = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as admin");
        return;
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/home`,
        home,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Updated Successfully");

      setEditing(false);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
      }
    }
  };

  if (!home) {
    return (
      <div>
        <h2>No Home Data Found</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Home</h2>

        {token && !editing && (
          <button
            className="btn btn-warning btn-sm"
            onClick={() => setEditing(true)}
          >
            ✏️ Edit
          </button>
        )}
      </div>

      {editing ? (
        <>
          <div className="mb-3">
            <label className="form-label">
              Name
            </label>

            <input
              type="text"
              className="form-control"
              value={home.name || ""}
              onChange={(e) =>
                setHome({
                  ...home,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Title
            </label>

            <input
              type="text"
              className="form-control"
              value={home.title || ""}
              onChange={(e) =>
                setHome({
                  ...home,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              About
            </label>

            <textarea
              rows="5"
              className="form-control"
              value={home.about || ""}
              onChange={(e) =>
                setHome({
                  ...home,
                  about: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Education
            </label>

            <textarea
              rows="4"
              className="form-control"
              value={home.education || ""}
              onChange={(e) =>
                setHome({
                  ...home,
                  education: e.target.value,
                })
              }
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Career Objective
            </label>

            <textarea
              rows="4"
              className="form-control"
              value={home.objective || ""}
              onChange={(e) =>
                setHome({
                  ...home,
                  objective: e.target.value,
                })
              }
            />
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-success btn-sm"
              onClick={saveChanges}
            >
              Save
            </button>

            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => {
                setEditing(false);
                fetchHome();
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="display-4 fw-bold">
            {home.name}
          </h1>

          <h3 className="text-muted mb-4">
            {home.title}
          </h3>

          <hr />

          <h2>About Me</h2>
          <p>{home.about}</p>

          <hr />

          <h2>Education</h2>
          <p>{home.education}</p>

          <hr />

          <h2>Career Objective</h2>
          <p>{home.objective}</p>
        </>
      )}
    </div>
  );
}

export default Home;