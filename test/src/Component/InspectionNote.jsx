import React, { useState, useEffect } from "react";
import axios from "axios";
import { useInitialContext } from "../context/InitialContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./feedback.css";
import { MdDelete } from "react-icons/md";

const InspectionNote = ({ showAlert }) => {
  const { adminloginData } = useInitialContext();

  const [formData, setFormData] = useState({
    userid: adminloginData?.userData?.id || "",
    username: adminloginData?.userData?.name || "",
    inspectionnote: "",
  });

  const [notes, setNotes] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    if (adminloginData) {
      setFormData({
        userid: adminloginData.userData.id,
        username: adminloginData.userData.name,
        inspectionnote: "",
      });
    }
  }, [adminloginData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleQuillChange = (value) => {
    setFormData({ ...formData, inspectionnote: value });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "searchKeyword") setSearchKeyword(value);
    if (name === "fromDate") setFromDate(value);
    if (name === "toDate") setToDate(value);
  };

  const handleDateFilter = (filter) => {
    const now = new Date();
    let startDate;
    let endDate = now.toISOString().split("T")[0];

    switch (filter) {
      case "today":
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        startDate = today.toISOString().split("T")[0];
        endDate = tomorrow.toISOString().split("T")[0];
        break;
      case "thisWeek":
        const firstDayOfWeek = new Date(
          now.setDate(now.getDate() - now.getDay())
        );
        const lastDayOfWeek = new Date(
          now.setDate(now.getDate() - now.getDay() + 6)
        );
        startDate = firstDayOfWeek.toISOString().split("T")[0];
        endDate = lastDayOfWeek.toISOString().split("T")[0];
        break;
      case "lastWeek":
        const lastWeekStart = new Date();
        lastWeekStart.setDate(
          lastWeekStart.getDate() - lastWeekStart.getDay() - 7
        );
        const lastWeekEnd = new Date(lastWeekStart);
        lastWeekEnd.setDate(lastWeekEnd.getDate() + 6);
        startDate = lastWeekStart.toISOString().split("T")[0];
        endDate = lastWeekEnd.toISOString().split("T")[0];
        break;
      case "lastMonth":
        const thisMonth = new Date();
        const firstDayOfLastMonth = new Date(
          thisMonth.getFullYear(),
          thisMonth.getMonth() - 1,
          1
        );
        const lastDayOfLastMonth = new Date(
          thisMonth.getFullYear(),
          thisMonth.getMonth(),
          0
        );
        startDate = firstDayOfLastMonth.toISOString().split("T")[0];
        endDate = lastDayOfLastMonth.toISOString().split("T")[0];
        break;
      case "lastQuarter":
        const startOfQuarter = new Date(
          now.getFullYear(),
          Math.floor(now.getMonth() / 3) * 3,
          1
        );
        const endOfLastQuarter = new Date(startOfQuarter);
        startOfQuarter.setMonth(startOfQuarter.getMonth() - 3);
        endOfLastQuarter.setDate(endOfLastQuarter.getDate() - 1);
        startDate = startOfQuarter.toISOString().split("T")[0];
        endDate = endOfLastQuarter.toISOString().split("T")[0];
        break;
      case "lastYear":
        const startOfLastYear = new Date(now.getFullYear() - 1, 0, 1);
        const endOfLastYear = new Date(startOfLastYear);
        endOfLastYear.setDate(endOfLastYear.getDate() - 1);
        startDate = startOfLastYear.toISOString().split("T")[0];
        endDate = endOfLastYear.toISOString().split("T")[0];
        break;
      default:
        startDate = "";
        endDate = "";
    }
    setFromDate(startDate);
    setToDate(endDate);
  };

  const handleInsert = async () => {
    if (!formData.userid || !formData.username || !formData.inspectionnote) {
      alert("Please fill in all fields or check may be you are logout.");
      return;
    }
    try {
      const response = await axios.post(
        "https://railwaymcq.com/student/InspectionNote_api.php",
        formData
      );
      showAlert("Data inserted successfully!", "success");
      resetForm();
      fetchNotes();
    } catch (error) {
      console.error(error);
      alert("Failed to insert data!");
    }
  };

  const resetForm = () => {
    setFormData({
      userid: adminloginData?.userData?.id,
      username: adminloginData?.userData?.name,
      inspectionnote: "",
    });
  };

  const fetchNotes = async () => {
    try {
      const params = {
        keyword: searchKeyword,
        fromDate: fromDate,
        toDate: toDate,
        userid: adminloginData?.userData?.id,
      };
      console.log("Fetching notes with params:", params); // Debugging statement
      const response = await axios.get(
        "https://railwaymcq.com/student/GetInspectionNotes.php",
        { params }
      );
      console.log("Fetched notes:", response.data); // Debugging statement
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [searchKeyword, fromDate, toDate]);

  const filterNotes = (notes) => {
    return notes.filter((note) => {
      const noteDate = new Date(note.created_date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchesKeyword = searchKeyword
        ? note.note &&
          note.note.toLowerCase().includes(searchKeyword.toLowerCase())
        : true;
      const matchesFromDate = from ? noteDate >= from : true;
      const matchesToDate = to ? noteDate <= to : true;

      return matchesKeyword && matchesFromDate && matchesToDate;
    });
  };

  const handleSelect = (event) => {
    handleDateFilter(event.target.value);
  };

  const handleDelete = async (noteId) => {
    try {
      const response = await axios.post(
        "https://railwaymcq.com/student/DeleteInspectionNote.php",
        {
          id: noteId,
        }
      );
      console.log("Deleted notes:", response.data);
      showAlert("Note deleted successfully!", "success");
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Failed to delete note!");
    }
  };

  return (
    <div className="inspection-note-container">
      <h2>Hello, {adminloginData?.userData?.name} Sir!</h2>

      <form className="note-form">
        <input
          type="hidden"
          name="userid"
          value={formData.userid}
          onChange={handleInputChange}
        />
        <input
          type="hidden"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          disabled
        />
        <ReactQuill
          value={formData.inspectionnote}
          onChange={handleQuillChange}
          theme="snow"
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ size: [] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image", "video"],
              ["clean"],
              [{ color: [] }, { background: [] }],
            ],
          }}
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "list",
            "bullet",
            "indent",
            "link",
            "image",
            "video",
            "color",
            "background",
          ]}
          className="note-textarea"
        />
        <button
          type="button"
          className="btn btn-primary save-note-button"
          onClick={handleInsert}
        >
          Save your Note
        </button>
      </form>
      <div className="search-filters">
        <input
          type="text"
          name="searchKeyword"
          placeholder="Search by keyword"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
        <div className="mb-3">
          <label forName="formGroupExampleInput1" class="form-label">
            Start Date :
          </label>
          <input
            type="date"
            name="fromDate"
            placeholder="From date"
            value={fromDate}
            onChange={handleSearchChange}
          />
        </div>
        <div className="mb-3">
          <label for="formGroupExampleInput" class="form-label">
            End Date :
          </label>
          <input
            type="date"
            name="toDate"
            placeholder="To date"
            value={toDate}
            onChange={handleSearchChange}
          />
        </div>
        <select onChange={handleSelect}>
          <option value="">Select Date Filter</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
          <option value="lastQuarter">Last Quarter</option>
          <option value="lastYear">Last Year</option>
        </select>
      </div>
      <div className="notes-list">
        {filterNotes(notes).map((note) => (
          <div key={note.noteid} className="note-item">
            {console.log("Note id::::", note.noteid)}
            <p>
              <strong> {note.username}:</strong>
            </p>
            <div dangerouslySetInnerHTML={{ __html: note.note }} />
            <p>
              <em>{new Date(note.created_date).toLocaleString()}</em>
            </p>

            {/* <FaTimes
              
              className="delete-note-icon"
              onClick={() => handleDelete(note.noteid)}
            /> */}
            <MdDelete
              con={MdDelete}
              className="delete-note-icon"
              onClick={() => handleDelete(note.noteid)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InspectionNote;
