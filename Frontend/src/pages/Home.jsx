import React from 'react'
import ClientReviews from '../components/ClientReviews'
import SalonTeam from '../components/SalonTeam'
import Packages from '../components/Packages'
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import AppointmentSection from "../components/AppointmentSection";

import Hero from '../components/Hero'
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
     <Navbar/>
      <Hero/>

      <ClientReviews />
      <SalonTeam />
      <Packages />
      <AboutSection />
      <ServicesSection />
      <AppointmentSection />
      
     
    </div>
  )
}

export default Home



  
