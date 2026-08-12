import { useEffect, useState } from "react";
import axios from "axios";

function Skills() {
  const [skillData, setSkillData] = useState(null);
  const [editingSkills, setEditingSkills] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSkills();
  }, []);

  // GET is public
  const fetchSkills = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/skills"
      );

      setSkillData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // PUT requires JWT
  const saveSkills = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as admin");
        return;
      }

      await axios.put(
        "http://localhost:5000/api/skills",
        {
          skills: skillData.skills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Skills Updated");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
      }
    }
  };

  if (!skillData) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Skills</h2>

        {token && (
          <button
            className="btn btn-warning btn-sm"
            onClick={() => setEditingSkills(true)}
          >
            ✏️
          </button>
        )}
      </div>

      {editingSkills ? (
        <>
          <textarea
            className="form-control mb-3"
            rows="6"
            value={skillData.skills.join(", ")}
            onChange={(e) =>
              setSkillData({
                ...skillData,
                skills: e.target.value
                  .split(",")
                  .map((skill) => skill.trim()),
              })
            }
          />

          <button
            className="btn btn-success me-2"
            onClick={async () => {
              await saveSkills();
              setEditingSkills(false);
            }}
          >
            Save
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => {
              setEditingSkills(false);
              fetchSkills();
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <div className="mt-3">
          {skillData.skills.map((skill, index) => (
            <span
              key={index}
              className="badge bg-primary me-2 mb-2"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Skills;