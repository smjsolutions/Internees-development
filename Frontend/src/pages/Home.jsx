import React from 'react'
import ClientReviews from '../components/ClientReviews'
import SalonTeam from '../components/SalonTeam'

import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import AppointmentSection from "../components/AppointmentSection";

import Hero from '../components/Hero'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Packages from "../components/Packages";



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
      <Footer/>
     
    </div>
  )
}

export default Home



  
