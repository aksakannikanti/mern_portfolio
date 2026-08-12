import { useEffect, useState } from "react";
import axios from "axios";

function Resume() {
  const [resume, setResume] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchResume();
  }, []);

  // GET is public
  const fetchResume = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/resume"
      );

      setResume(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // POST /upload requires JWT
  const uploadResume = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login as admin");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Resume Uploaded Successfully");

      setFile(null);
      setShowUpload(false);

      fetchResume();
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
      } else {
        alert("Upload Failed");
      }
    }
  };

  return (
    <div>
      <h2>Resume</h2>

      {resume ? (
        <button
          className="btn btn-primary"
          onClick={() =>
            window.open(
              `http://localhost:5000/${resume.filepath}`,
              "_blank"
            )
          }
        >
          View Resume
        </button>
      ) : (
        <p>No Resume Uploaded</p>
      )}

      {token && (
        <div className="mt-4">
          {!showUpload ? (
            <button
              className="btn btn-success btn-sm"
              onClick={() => setShowUpload(true)}
            >
              Upload New Resume
            </button>
          ) : (
            <div className="card p-3 mt-3">
              <input
                type="file"
                className="form-control mb-3"
                accept=".pdf,.doc,.docx"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />

              <div className="d-flex gap-2">
                <button
                  className="btn btn-success btn-sm"
                  onClick={uploadResume}
                >
                  Upload
                </button>

                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={() => {
                    setShowUpload(false);
                    setFile(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Resume;