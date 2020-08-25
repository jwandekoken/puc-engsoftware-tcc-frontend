import React from "react";

import Navigation from "../../shared/components/navigation/Navigation";
import HeroBanner from "./components/HeroBanner";
import Footer from "../../shared/components/ui-elements/Footer";

const Home = () => {
  return (
    <div>
      <Navigation />
      <HeroBanner />
      <Footer />
    </div>
  );
};

export default Home;
