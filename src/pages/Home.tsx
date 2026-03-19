import Explore from "@components/Homepage/Explore";
import Featured from "@components/Homepage/Featured";
import Hero from "@components/Homepage/Hero";

const Home = () => {
  return (
    <section className="min-h-[90vh]">
      <Hero />
      <Featured />
      <Explore />
    </section>
  );
};

export default Home;
