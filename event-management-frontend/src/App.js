import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import Navbar from "./components/Navbar";
import PrivateRoute from "./auth/PrivateRoute";
import HomePage from "./components/HomePage";
import EventDetailsPage from "./components/EventDetailsPage";
import MyRegistrationsPage from "./pages/MyRegistrationsPage";
import AdminDashboard from "./components/AdminDashboard";
import AdminEventList from "./components/AdminEventList";
import CreateEventForm from "./components/CreateEventForm";
import AdminAttendanceTracker from "./components/AdminAttendanceTracker";
import SearchEvents from "./components/SearchEvents";
import EditEventForm from "./components/EditEventForm";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route
          path="/my-registrations"
          element={
            <PrivateRoute>
              <MyRegistrationsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="ROLE_ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/events/create"
          element={
            <PrivateRoute requiredRole="ROLE_ADMIN">
              <CreateEventForm />
            </PrivateRoute>
          }
        />
        <Route path="/admin/attendance" element={<AdminAttendanceTracker />} />

        <Route path="/admin/events" element={<AdminEventList />} />
        <Route path="/search-events" element={<SearchEvents />} />
        <Route path="/events/edit/:id" element={<EditEventForm />} />


      </Routes>
    </>
  );
}

export default App;
