import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Mission from './components/Mission';
import InfoCards from './components/InfoCards';
import NoMoreSection from './components/NoMoreSection';
import OutreachBanner from './components/OutreachBanner';
import DonationSteps from './components/DonationSteps';
import SponsorChild from './components/SponsorChild';
import QuoteBanner from './components/QuoteBanner';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <Mission />
      <InfoCards />
      <NoMoreSection />
      <OutreachBanner />
      <DonationSteps />
      <SponsorChild />
      <QuoteBanner />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
