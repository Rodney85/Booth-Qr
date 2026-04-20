import { useEffect, useState } from "react";
import LeadForm from "./components/LeadForm";
import SuccessScreen from "./components/SuccessScreen";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  if (currentPath === "/admin") {
    return <AdminDashboard />;
  }

  if (currentPath === "/success") {
    return <SuccessScreen />;
  }

  return <LeadForm />;
}

export default App;
