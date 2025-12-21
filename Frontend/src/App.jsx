import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AllSubmissions from "./pages/admin/AllSubmissions";
import CreateAssignment from "./pages/admin/CreateAssignment";
import Dashboard from "./pages/admin/Dashboard";
import EditAssignment from "./pages/admin/EditAssignments";
import Login from "./pages/admin/Login";
import Profile from "./pages/admin/Profile";
import Register from "./pages/admin/Register";
import ViewSubmissions from "./pages/admin/ViewSubmissions";
import Assignments from "./pages/Assignments";
import SubmitAssignment from "./pages/SubmitAssignment";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/submit/:id" element={<SubmitAssignment />} />
        <Route path="/edit/:id" element={<EditAssignment />} />
        <Route path="/" element={<Assignments />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateAssignment />} />
        <Route path="/submissions/:id" element={<ViewSubmissions />} />
        <Route path="/submissions" element={<AllSubmissions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
