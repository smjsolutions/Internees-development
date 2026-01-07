import React from 'react'
import ClientReviews from '../components/ClientReviews'
import SalonTeam from '../components/SalonTeam'
import Packages from '../components/Packages'


const Home = () => {
  return (
    <div>
      <ClientReviews />
      <SalonTeam />
      <Packages />
    </div>
  )
}

export default Home