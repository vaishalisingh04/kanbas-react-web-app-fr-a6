import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import * as client from "./client";
export default function AssignmentEditor() {
  const { cid } = useParams<{ cid: string }>();
  const { aid } = useParams<{ aid: string }>();
  const navigate = useNavigate();
  const [results, setResults] = useState<any[]>([]);
  const [title, setTitle] = useState("New Assignment");
  const [course, setCourse] = useState(cid);
  const [description, setDescription] = useState("New Description");
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("2023-12-15");
  const [availableFrom, setAvailableFrom] = useState("2023-09-10");
  // const { assignments} = useSelector((state: any) => state.assignmentReducer);
  const dispatch = useDispatch();
  const handleCancelClick = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  async function getAssignmentsForCourse(cid: String) {
    console.log("cid ki value",cid)
    const assignments = await client.findAssignmentById(cid as string);
    console.log(assignments);
    setResults([...results , assignments]);
    // /setResults(assignments.filter((assignment: any) => assignment._id === aid));
    if (assignments) {
      setTitle(assignments.title);
      setPoints(assignments.points);
      setDescription(assignments.description);
      setDueDate(assignments.dueDate);
      setAvailableFrom(assignments.availableFrom);
    }
  }

  useEffect(() => {
    getAssignmentsForCourse(aid as string);
  }, []);




  const handleSaveAssignment = async () => {
    const assignmentData = {
      _id: aid, // Ensure you pass the correct assignment _id
      title,
      course: cid,
      description,
      points,
      dueDate,
      availableFrom,
    };

    console.log(results, results[0]?._id, aid);

    if (results[0] && results[0]._id === aid) {
      await client.updateAssignment(assignmentData);
      // dispatch(updateAssignment(assignmentData));
    } else {
      console.log(assignmentData);

      await client.createAssignment(assignmentData);
      // dispatch(addAssignment(assignmentData));
    }

    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <div className="mb-3">
        <label htmlFor="wd-name" className="col-sm-2 col-form-label text-end">
          Assignment Name
        </label>
        <input
          type="text"
          className="form-control"
          id="wd-name"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          id="wd-description"
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
        >
          {description}
        </textarea>
      </div>
      <br />
      <div className="row mb-3">
        <label
          htmlFor="wd-points"
          className="col-sm-2 col-col-sm-2 col-form-label text-end text-end"
        >
          Points
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="wd-points"
            onChange={(e) => setPoints(parseFloat(e.target.value))}
            value={points}
          />
        </div>
      </div>
      <br />
      <div className="row mb-3">
        <label htmlFor="wd-group" className="col-sm-2 col-form-label text-end">
          Assignment Group
        </label>
        <div className="col-sm-10">
          <select className="form-select" id="wd-group">
            <option selected value="Assignments">
              ASSIGNMENTS
            </option>
            <option value="AssignmentWeb">Web</option>
            <option value="AssignmentWebDev">Web Dev</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label
          htmlFor="wd-display-grade-as"
          className="col-sm-2 col-form-label text-end"
        >
          Display Grade as
        </label>
        <div className="col-sm-10">
          <select className="form-select" id="wd-display-grade-as">
            <option selected value="percentage">
              PERCENTAGE
            </option>
            <option value="grade">GRADE</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label
          htmlFor="wd-submission-type"
          className="col-sm-2 col-form-label text-end"
        >
          Submission Type
        </label>
        <div className="col-sm-10">
          <div className="border p-3">
            <select className="form-select" id="wd-submission-type">
              <option selected value="online">
                ONLINE
              </option>
              <option value="offline">OFFLINE</option>
            </select>
            <br />
            <h5 id="wd-checkboxes">Online Entry Options</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="wd-text-entry"
              />
              <label className="form-check-label" htmlFor="wd-text-entry">
                Text Entry
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="wd-website-url"
              />
              <label className="form-check-label" htmlFor="wd-website-url">
                Website URL
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="wd-media-recordings"
              />
              <label className="form-check-label" htmlFor="wd-media-recordings">
                Media Recordings
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="wd-student-annotation"
              />
              <label
                className="form-check-label"
                htmlFor="wd-student-annotation"
              >
                Student Annotation
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="wd-file-upload"
              />
              <label className="form-check-label" htmlFor="wd-file-upload">
                File Uploads
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <label
          htmlFor="wd-assign-to"
          className="col-sm-2 col-form-label text-end"
        >
          Assign
        </label>
        <div className="col-sm-10">
          <div className="border p-3">
            <label htmlFor="wd-assign-to" className="col-sm-2 col-form-label">
              Assign to
            </label>
            <input
              type="text"
              className="form-control"
              id="wd-assign-to"
              value="Everyone"
            />
            <label htmlFor="wd-due-date" className="col-sm-2 col-form-label">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              id="wd-due-date"
              onChange={(e) => setDueDate(e.target.value)}
              value={dueDate}
            />
            <label
              htmlFor="wd-available-from"
              className="col-sm-2 col-form-label"
            >
              Available From
            </label>
            <input
              type="date"
              className="form-control"
              id="wd-available-from"
              onChange={(e) => setAvailableFrom(e.target.value)}
              value={availableFrom}
            />
            <label
              htmlFor="wd-available-until"
              className="col-sm-2 col-form-label"
            >
              Until
            </label>
            <input
              type="date"
              className="form-control"
              id="wd-available-until"
              value="2024-05-20"
            />
          </div>
        </div>
      </div>
      <hr style={{ width: "350%" }} />
      <div className="row mb-3 justify-content-end">
        <div className="col-auto">
          <button
            className="btn btn-light me-2"
            id="wd-assignment-cancel"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            id="wd-assignment-save"
            onClick={handleSaveAssignment}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
