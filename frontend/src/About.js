import HeroSection from "./components/HeroSection";

const About = () => {
  const data = {
    name: "Akr Ecommerce",
  };

  return (
    <>
      <HeroSection myData={data} />
    </>
  );
};

export default About;