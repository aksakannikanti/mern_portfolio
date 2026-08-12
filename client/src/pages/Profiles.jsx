import { useEffect, useState } from "react";
import axios from "axios";

function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const [newProfile, setNewProfile] = useState({
    name: "",
    link: "",
  });

  useEffect(() => {
    fetchProfiles();
  }, []);

  // GET is public
  const fetchProfiles = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/profiles"
      );

      setProfiles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // POST requires JWT
  const addProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as admin");
        return;
      }

      await axios.post(
        "http://localhost:5000/api/profiles",
        newProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Added");

      setNewProfile({
        name: "",
        link: "",
      });

      setShowAddForm(false);

      fetchProfiles();
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
      }
    }
  };

  // PUT requires JWT
  const updateProfile = async (profile) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as admin");
        return;
      }

      await axios.put(
        `http://localhost:5000/api/profiles/${profile._id}`,
        profile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated");

      setEditingId(null);

      fetchProfiles();
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
      }
    }
  };

  // DELETE requires JWT
  const deleteProfile = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as admin");
        return;
      }

      await axios.delete(
        `http://localhost:5000/api/profiles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Deleted");

      fetchProfiles();
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
      }
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Profiles</h2>

        {token && (
          <button
            className="btn btn-success btn-sm"
            onClick={() =>
              setShowAddForm(!showAddForm)
            }
          >
            + Add Profile
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="card p-3 mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Profile Name"
            value={newProfile.name}
            onChange={(e) =>
              setNewProfile({
                ...newProfile,
                name: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Profile Link"
            value={newProfile.link}
            onChange={(e) =>
              setNewProfile({
                ...newProfile,
                link: e.target.value,
              })
            }
          />

          <div className="d-flex gap-2">
            <button
              className="btn btn-success btn-sm"
              onClick={addProfile}
            >
              Save
            </button>

            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => {
                setShowAddForm(false);

                setNewProfile({
                  name: "",
                  link: "",
                });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {profiles.map((profile) => (
        <div
          key={profile._id}
          className="card p-3 mb-3"
        >
          {editingId === profile._id ? (
            <>
              <input
                className="form-control mb-2"
                value={profile.name}
                onChange={(e) =>
                  setProfiles(
                    profiles.map((p) =>
                      p._id === profile._id
                        ? {
                            ...p,
                            name: e.target.value,
                          }
                        : p
                    )
                  )
                }
              />

              <input
                className="form-control mb-3"
                value={profile.link}
                onChange={(e) =>
                  setProfiles(
                    profiles.map((p) =>
                      p._id === profile._id
                        ? {
                            ...p,
                            link: e.target.value,
                          }
                        : p
                    )
                  )
                }
              />

              <div className="d-flex gap-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={() =>
                    updateProfile(profile)
                  }
                >
                  Save
                </button>

                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() =>
                    setEditingId(null)
                  }
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{profile.name}</h5>

                <a
                  href={profile.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {profile.link}
                </a>
              </div>

              {token && (
                <div>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() =>
                      setEditingId(profile._id)
                    }
                  >
                    ✏️
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deleteProfile(profile._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Profiles;