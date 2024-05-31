import React, { useState, useEffect } from "react";
import axios from "axios";
import { useInitialContext } from "../context/InitialContext";

const AddVideolinks = () => {
  const { adminloginData } = useInitialContext();
  console.log("adminloginData:", adminloginData);
  const [formData, setFormData] = useState({
    subcode: "",
    topcode: "",
    title: "",
    link: "",
    description: "",
    created_by: adminloginData?.userData?.name || "",
  });
  const [subjects, setSubjects] = useState([]);
  const [topcodes, setTopcodes] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        "https://railwaymcq.com/student/subMaster_api.php"
      );
      setSubjects(response.data);
      console.log("Subject Code is ::::::-" + formData.subcode);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopcodes = async (subcode) => {
    try {
      const response = await axios.get(
        `https://railwaymcq.com/student/topicMaster_api.php?subcode=${subcode}`
      );
      setTopcodes(response.data);
    } catch (error) {
      console.error(error);
      setTopcodes([]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "subcode") {
      console.log(formData);

      fetchTopcodes(value);
    }
  };
  const handleInsert = async () => {
    if (
      !formData.subcode ||
      !formData.topcode ||
      !formData.title ||
      !formData.link ||
      !formData.description
    ) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      console.log("All inserted form data::::op", formData);
      const response = await axios.post(
        "https://railwaymcq.com/student/videolinks_api.php",
        formData
      );
      alert("Data inserted successfully!");
      resetForm();
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to insert data!");
    }
  };
  const resetForm = () => {
    setFormData({
      subcode: "",
      topcode: "",
      title: "",
      link: "",
      description: "",
      created_by: adminloginData?.userData?.name || "",
    });
  };

  console.log(formData);
  return (
    <div>
      <h2>Video links added by:-{adminloginData?.userData?.name}</h2>

      <form>
        <select
          name="subcode"
          //   value={formData.subcode}
          onChange={handleInputChange}
        >
          <option key="default" value="">
            Select Subject
          </option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject.subcode}>
              {subject.sub}
            </option>
          ))}
        </select>
        <select
          name="topcode"
          value={formData.topcode}
          onChange={handleInputChange}
        >
          <option value="">Select Topic</option>
          {topcodes.map((topcode) => (
            <option key={topcode.topcode} value={topcode.topcode}>
              {topcode.topic}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title of video"
        />

        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleInputChange}
          placeholder="Enter your link like zdpz01Nccyo"
        />
        <textarea
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter your description"
        />
        <input
          type="hidden"
          name="created_by"
          value={adminloginData?.userData?.name}
          onChange={handleInputChange}
          disabled
        />

        <button type="button" onClick={handleInsert}>
          Insert
        </button>
      </form>
    </div>
  );
};

export default AddVideolinks;
