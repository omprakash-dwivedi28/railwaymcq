import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "axios";
import "../Component/css/VideoLearner.css";

const VideoLearner = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredVideos, setFilteredVideos] = useState([]); // State for filtered videos
  const [subjects, setSubjects] = useState([]);
  const [topcodes, setTopcodes] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopcode, setSelectedTopcode] = useState("");
  const [searchFromDate, setSearchFromDate] = useState(""); // State for from date
  const [searchToDate, setSearchToDate] = useState(""); // State for to date

  useEffect(() => {
    fetch("https://railwaymcq.com/student/videolinks_api.php")
      .then((response) => response.json())
      .then((data) => {
        setVideos(data);
        setFilteredVideos(data); // Initialize filtered videos with all videos
        setLoading(false);
        fetchSubjects();
        // fetchTopcodes();
        console.log("Fetched data::::", data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        "https://railwaymcq.com/student/subMaster_api.php"
      );
      setSubjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubjectChange = (e) => {
    const selectedSubcode = e.target.value;
    setSelectedSubject(selectedSubcode);
    console.log("Selected subject:", selectedSubcode);
    fetchTopcodes(selectedSubcode);
  };

  const handleTopcodeChange = (e) => {
    setSelectedTopcode(e.target.value);
  };

  const fetchTopcodes = async () => {
    console.log("Selected subject by op", selectedSubject);
    try {
      const response = await axios.get(
        `https://railwaymcq.com/student/topicMaster_api.php?subcode=${selectedSubject}`
      );
      setTopcodes(response.data);
      console.log("Topic::::::", response.data);
    } catch (error) {
      console.error(error);
      setTopcodes([]);
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleDateChange = (event, type) => {
    const value = event.target.value;
    if (type === "from") {
      setSearchFromDate(value);
    } else if (type === "to") {
      setSearchToDate(value);
    }
  };
  useEffect(() => {
    const filtered = videos.filter((video) => {
      return (
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedSubject === "" ||
          video.subcode.toString() === selectedSubject) &&
        (selectedTopcode === "" ||
          video.topcode.toString() === selectedTopcode) &&
        (searchFromDate === "" ||
          new Date(video.created_date) >= new Date(searchFromDate)) &&
        (searchToDate === "" ||
          new Date(video.created_date) <= new Date(searchToDate))
      );
    });
    setFilteredVideos(filtered);
    fetchSubjects();
    fetchTopcodes();
    console.log("Filtered videos:", filtered);
  }, [
    searchTerm,
    videos,
    selectedSubject,
    selectedTopcode,
    searchFromDate,
    searchToDate,
  ]);

  return (
    <div className="video-learner-container">
      <h2 className="video-learner-heading">Video Learning Playlist</h2>
      <input
        type="text"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-box"
      />
      <select
        name="subcode"
        value={selectedSubject}
        onChange={handleSubjectChange}
      >
        <option value="">Select Subject</option>
        {subjects.map((subject, index) => (
          <option key={index} value={subject.subcode}>
            {subject.sub}+{subject.subcode}
          </option>
        ))}
      </select>
      <select
        name="topcode"
        value={selectedTopcode}
        onChange={handleTopcodeChange}
      >
        <option value="">Select Topic</option>
        {topcodes.map((topcode, index) => (
          <option key={index} value={topcode.topcode}>
            {topcode.topic}
          </option>
        ))}
      </select>
      <div className="datepicker-container">
        <div className="datepicker-header">
          <strong>Start Date:</strong>
        </div>
        <input
          type="date"
          placeholder="Search by from date..."
          value={searchFromDate}
          onChange={(e) => handleDateChange(e, "from")}
          className="date-box"
        />
        <div className="datepicker-header">
          <strong>End Date:</strong>
        </div>
        <input
          type="date"
          placeholder="Search by to date..."
          value={searchToDate}
          onChange={(e) => handleDateChange(e, "to")}
          className="date-box"
        />
      </div>
      <br /> <br />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="video-list">
          {filteredVideos.map((video) => (
            <div key={video.id} className="video-item">
              <div
                className="video-wrapper"
                onClick={() => handleVideoSelect(video)}
              >
                <YouTube
                  videoId={video.link}
                  className="video-player"
                  opts={{ width: "100%", height: "200px" }}
                />
                <h3 className="video-title">{video.title}</h3>
              </div>
              <a
                href={`https://www.youtube.com/watch?v=${video.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="watch-link"
              >
                Watch on YouTube
              </a>
            </div>
          ))}
        </div>
      )}
      {selectedVideo && (
        <div className="modal">
          <div className="modal-content">
            <YouTube
              videoId={selectedVideo.link}
              className="modal-video-player"
              opts={{ width: "100%", height: "400px" }}
            />
            <button className="close-button" onClick={handleCloseVideo}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoLearner;
