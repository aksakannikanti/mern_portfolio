import { useEffect, useState } from "react";
import axios from "axios";

function Certifications() {
  const [certificates, setCertificates] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const token = localStorage.getItem("token");

  const [newCertificate, setNewCertificate] = useState({
    title: "",
    issuer: "",
  });

  useEffect(() => {
    fetchCertificates();
  }, []);

  // GET is public
  const fetchCertificates = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/certificates`
      );

      setCertificates(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // POST requires JWT
  const addCertificate = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as admin");
        return;
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/certificates`,
        newCertificate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Certificate Added");

      setNewCertificate({
        title: "",
        issuer: "",
      });

      setShowAddForm(false);

      fetchCertificates();
    } catch (error) {
      console.log(error);

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
      }
    }
  };

  // DELETE requires JWT
  const deleteCertificate = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login as admin");
        return;
      }

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/certificates/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Certificate Deleted");

      fetchCertificates();
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
        <h2>Certifications</h2>

        {token && (
          <button
            className="btn btn-success btn-sm"
            onClick={() =>
              setShowAddForm(!showAddForm)
            }
          >
            + Add Certificate
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="card p-3 mb-4">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Certificate Title"
            value={newCertificate.title}
            onChange={(e) =>
              setNewCertificate({
                ...newCertificate,
                title: e.target.value,
              })
            }
          />

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Issuer"
            value={newCertificate.issuer}
            onChange={(e) =>
              setNewCertificate({
                ...newCertificate,
                issuer: e.target.value,
              })
            }
          />

          <div className="d-flex gap-2">
            <button
              className="btn btn-success btn-sm"
              onClick={addCertificate}
            >
              Save
            </button>

            <button
              className="btn btn-outline-dark btn-sm"
              onClick={() => {
                setShowAddForm(false);

                setNewCertificate({
                  title: "",
                  issuer: "",
                });
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {certificates.length === 0 ? (
        <p>No Certifications Found.</p>
      ) : (
        certificates.map((certificate) => (
          <div
            key={certificate._id}
            className="card p-3 mb-3"
          >
            <div className="d-flex justify-content-between align-items-center">
              <h4>{certificate.title}</h4>

              {token && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    deleteCertificate(certificate._id)
                  }
                >
                  Delete
                </button>
              )}
            </div>

            <p>
              <strong>Issuer:</strong>{" "}
              {certificate.issuer}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Certifications;