import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";

// Pages
import HomePage from "@/pages/HomePage";
import LivePage from "@/pages/LivePage";
import SermonsPage from "@/pages/SermonsPage";
import SermonDetailPage from "@/pages/SermonDetailPage";
import EventsPage from "@/pages/EventsPage";
import EventDetailPage from "@/pages/EventDetailPage";
import GivingPage from "@/pages/GivingPage";
import MorePage from "@/pages/MorePage";
import AboutPage from "@/pages/AboutPage";
import LeadershipPage from "@/pages/LeadershipPage";
import SchedulePage from "@/pages/SchedulePage";
import ContactPage from "@/pages/ContactPage";
import AnnouncementsPage from "@/pages/AnnouncementsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import TermsPage from "@/pages/TermsPage";

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/live" element={<LivePage />} />
            <Route path="/sermons" element={<SermonsPage />} />
            <Route path="/sermons/:id" element={<SermonDetailPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/giving" element={<GivingPage />} />
            <Route path="/more" element={<MorePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/leadership" element={<LeadershipPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
