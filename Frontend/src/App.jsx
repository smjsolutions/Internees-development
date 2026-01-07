import React from 'react';
import AboutSection from "./components/aboutSection";
import ServicesSection from "./components/servicesSection";
import AppointmentSection from "./components/appointmentSection";

function App() {
  return (
    <div className="min-h-screen">
      <AboutSection />
      <ServicesSection />
      <AppointmentSection />
    </div>
  );
}

export default App;
