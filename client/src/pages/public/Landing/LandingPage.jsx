import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Problem from './sections/Problem';
import PlatformOverview from './sections/PlatformOverview';
import StudentExperience from './sections/StudentExperience';
import InstitutionExperience from './sections/InstitutionExperience';
import CompanyExperience from './sections/CompanyExperience';
import HowItWorks from './sections/HowItWorks';
import SkillMappingDemo from './sections/SkillMappingDemo';
import Opportunities from './sections/Opportunities';
import AIAssistance from './sections/AIAssistance';
import FinalCTA from './sections/FinalCTA';
import Footer from './sections/Footer';

export default function LandingPage() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <PlatformOverview />
        <StudentExperience />
        <InstitutionExperience />
        <CompanyExperience />
        <HowItWorks />
        <SkillMappingDemo />
        <Opportunities />
        <AIAssistance />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
