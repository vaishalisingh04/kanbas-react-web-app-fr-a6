import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import * as client from "./client";
import { FaPencil } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
export default function PeopleDetails({
  fetchUsers,
}: {
  fetchUsers: () => void;
}) {
  const { uid, cid } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    setEditing(false);
    fetchUsers();
    navigate(`/Kambaz/Courses/${cid}/People`);
  };

  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
  };

  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    let updatedUser: any;
    if (email.length !== 0) {
      updatedUser = { ...user, firstName, lastName, email };
    } else {
      updatedUser = { ...user, firstName, lastName };
    }

    if (email.length !== 0 && role.length !== 0) {
      updatedUser = { ...user, firstName, lastName, email, role };
    } else if (email.length === 0 && role.length !== 0) {
      updatedUser = { ...user, firstName, lastName, role };
    } else {
      updatedUser = { ...user, firstName, lastName };
    }
    await client.updateUser(updatedUser);
    setUser((prev: any) => (prev = updatedUser));
    fetchUsers();
    setEditing(false);
    navigate(`/Kambaz/Courses/${cid}/People`);
  };

  const cancelEdit = () => {
    navigate(`/Kambaz/Courses/${cid}/People`);
    setEditing(false);
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={cancelEdit}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />{" "}
      </button>
      <div className="text-center mt-2">
        {" "}
        <FaUserCircle className="text-secondary me-2 fs-1" />{" "}
      </div>
      <br />
      <div className="d-flex flex-column align-items-start text-danger fs-4 wd-name">
        <div className="w-100 d-flex justify-content-end">
          {!editing && (
            <FaPencil
              onClick={() => setEditing(true)}
              className="fs-5 mt-2 wd-edit"
            />
          )}
          {editing && (
            <FaCheck
              onClick={() => saveUser()}
              className="fs-5 mt-2 me-2 wd-save"
            />
          )}
        </div>
        {!editing && (
          <div className="wd-name mt-2" onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editing && (
          <div className="w-100 mt-2">
            <input
              className="form-control w-75 wd-edit-name my-2"
              defaultValue={`${user.firstName} ${user.lastName}`}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveUser();
                }
              }}
            />
            <input
              type="email"
              className="form-control w-75 wd-edit-email my-2"
              defaultValue={`${user.email}`}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveUser();
                }
              }}
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select w-50 wd-select-role my-2"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveUser();
                }
              }}
            >
              <option value="">All Roles</option>
              <option value="STUDENT">Students</option>
              <option value="TA">Assistants</option>
              <option value="FACULTY">Faculty</option>
            </select>
          </div>
        )}
      </div>
      <b>Roles:</b> <span className="wd-roles"> {user.role} </span> <br />
      <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span>{" "}
      <br />
      <b>Section:</b> <span className="wd-section"> {user.section} </span>{" "}
      <br />
      <b>Email:</b> <span className="wd-email"> {user.email} </span> <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span> <hr />
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        {" "}
        Delete{" "}
      </button>
      <button
        onClick={cancelEdit}
        className="btn btn-secondary float-start float-end me-2 wd-cancel"
      >
        {" "}
        Cancel{" "}
      </button>
    </div>
  );
}
