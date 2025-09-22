import React from 'react';
import Hero from '../components/Hero';
import Mission from '../components/Mission';
import NGOSection from '../components/NGOSection';
import InfoCards from '../components/InfoCards';
import NoMoreSection from '../components/NoMoreSection';
import OutreachBanner from '../components/OutreachBanner';
import SponsorChild from '../components/SponsorChild';
import QuoteBanner from '../components/QuoteBanner';
import Team from '../components/Team';
import Contact from '../components/Contact';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <section id="what-we-do">
        <Mission />
        <NGOSection />
        <InfoCards />
        <NoMoreSection />
      </section>
      <OutreachBanner />
      <section id="projects">
        {/* <DonationSteps /> */}
        <SponsorChild />
      </section>
      <QuoteBanner />
      <section id="get-involved">
        <Team />
        <Contact />
      </section>
    </>
  );
};

export default Home;