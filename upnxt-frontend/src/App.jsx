import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout/AppLayout";

import Home from "./pages/Home/Home";
import Welcome from "./pages/Welcome/Welcome";
import Dashboard from "./pages/Dashboard/Dashboard";
import FindJobs from "./pages/Jobs/FindJobs";
import JobDetails from "./pages/Jobs/JobDetails";
import Applications from "./pages/Applications/ApplyJob";
import MyApplications from "./pages/Applications/MyApplications";
import PersonalDetails from "./pages/PersonalDetails/PersonalDetails";

import SavedJobs from "./pages/SavedJobs/SavedJobs";
import Assessments from "./pages/Assessments/Assessments";
import Messages from "./pages/Messages/Messages";
import CareerInsights from "./pages/CareerInsights/CareerInsights";

function App() {
  return (
    <Routes>

      {/* Public */}
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />

      {/* Application */}
      <Route element={<AppLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/jobs"
          element={<FindJobs />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/apply/:id"
          element={<Applications />}
        />

        <Route
          path="/applications"
          element={<MyApplications />}
        />

        <Route
          path="/profile"
          element={<PersonalDetails />}
        />

        {/* NEW FEATURES */}

        <Route
          path="/saved-jobs"
          element={<SavedJobs />}
        />

        <Route
          path="/assessments"
          element={<Assessments />}
        />

        <Route
          path="/messages"
          element={<Messages />}
        />

        <Route
          path="/career-insights"
          element={<CareerInsights />}
        />

      </Route>

      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;