import React, { useState } from "react";
import "./App.css";
import Navbar from "./Component/navbar.jsx";
import FeedBack_user from "./Component/FeedBack_user.jsx";
import About from "./Component/about.jsx";
import LoginForm from "./Component/LoginForm.jsx";
// import Login from "./Component/Login.jsx";
import ShowFeedback from "./Component/ShowFeedback.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizSetup from "./Component/QuizSetup.jsx";
import Quiz1 from "./Component/Quiz1.jsx";
import Quiz from "./Component/Quiz.jsx";
import QbankMaster from "./Component/QbankMaster.jsx";
import EditableQbankData from "./Component/EditableQbankData.jsx";
import FatchQbankFeedback from "./Component/FatchQbankFeedback.jsx";
import MCQverifier from "./Component/MCQverifier.jsx";
import VideoLearner from "./Component/VideoLearner.jsx";
import AddVideolinks from "./Component/AddVideolinks.jsx";
import AdminPage from "./Component/AdminPage.jsx";
import { InitialProvider } from "./context/InitialContext.jsx";
import InspectionNote from "./Component/InspectionNote.jsx";
import SignUpUser from "./Component/SignUpUser.jsx";
import Alert from "./Component/Alert.jsx";
// import ColorPalette from "./Component/ColorPalette.jsx";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <InitialProvider>
      <BrowserRouter>
        <Navbar title="Railway MCQ" quiz="MCQ Section" />
        <Alert alert={alert} />
        {/* <ColorPalette
          colors={["#FF0000", "#00FF00", "#0000FF", "#FFFF00"]}
          onSelect={(color) => console.log("Selected color:", color)}
        /> */}
        <Routes>
          <Route path="/" element={<About />} />
          <Route
            path="/FeedBack_user"
            element={<FeedBack_user showAlert={showAlert} />}
          />
          <Route
            path="/SignUpUser"
            element={<SignUpUser showAlert={showAlert} />}
          />

          <Route
            path="/InspectionNote"
            element={<InspectionNote showAlert={showAlert} />}
          />
          <Route path="/About" element={<About />} />
          <Route
            path="/LoginForm"
            element={<LoginForm showAlert={showAlert} />}
          />

          <Route
            path="/QuizSetup"
            element={<QuizSetup showAlert={showAlert} />}
          />
          <Route path="/Quiz" element={<Quiz showAlert={showAlert} />} />
          <Route path="/Quiz1" element={<Quiz1 showAlert={showAlert} />} />
          <Route
            path="/AddVideolinks"
            element={<AddVideolinks showAlert={showAlert} />}
          />
          <Route
            path="/MCQverifier"
            element={<MCQverifier showAlert={showAlert} />}
          />
          <Route
            path="/FatchQbankFeedback"
            element={<FatchQbankFeedback showAlert={showAlert} />}
          />
          <Route
            path="/EditableQbankData"
            element={<EditableQbankData showAlert={showAlert} />}
          />
          <Route
            path="/QbankMaster"
            element={<QbankMaster showAlert={showAlert} />}
          />
          <Route
            path="/ShowFeedback"
            element={<ShowFeedback showAlert={showAlert} />}
          />
          <Route
            path="/VideoLearner"
            element={<VideoLearner showAlert={showAlert} />}
          />
          <Route
            path="/AdminPage"
            element={<AdminPage showAlert={showAlert} />}
          />
        </Routes>
      </BrowserRouter>
    </InitialProvider>
  );
}

export default App;
