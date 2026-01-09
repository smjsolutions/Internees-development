import React from 'react'
import ClientReviews from '../components/ClientReviews'
import SalonTeam from '../components/SalonTeam'
import Packages from '../components/Packages'
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import AppointmentSection from "../components/AppointmentSection";
import Footer from '../components/Footer'
import Navbar from '../components/NavBar'
import Hero from '../components/Hero'

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



  
