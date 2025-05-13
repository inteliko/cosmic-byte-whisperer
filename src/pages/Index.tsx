
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TeamCarousel from "../components/TeamCarousel";
import TrustedBy from "../components/TrustedBy";
import Problem from "../components/Problem";
import Process from "../components/Process";
import Testimonials from "../components/Testimonials";
import CreativeTalent from "../components/CreativeTalent";
import BuildWithTools from "../components/BuildWithTools";
import WhatYouGet from "../components/WhatYouGet";
import SelectedWork from "../components/SelectedWork";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="bg-white">
        <Hero />
        <TeamCarousel />
        <TrustedBy />
        <Problem />
        <Process />
        <Testimonials />
        <CreativeTalent />
        <BuildWithTools />
        <WhatYouGet />
        <SelectedWork />
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
