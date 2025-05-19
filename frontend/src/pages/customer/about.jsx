import React from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  const [scrolling, setScrolling] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`flex justify-between items-center p-2 px-6 sticky top-0 z-[100] transition-colors duration-300 ${
        scrolling
          ? "bg-white text-black shadow-lg"
          : "bg-transparent text-white"
      }`}
    >
      <div className="text-3xl font-semibold">
        <Link to="/" className="hover:text-red-500 transition-colors">
          My Restaurant
        </Link>
      </div>
      <nav className="flex space-x-6 items-center">
        <Link
          to="/home"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-red-500 text-base font-medium"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          Home
        </Link>
        <Link
          to="/about"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-red-500 text-base font-medium"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          About
        </Link>
        <Link
          to="/contact"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-red-500 text-base font-medium"
          data-aos="fade-down"
          data-aos-delay="300"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};

const AboutHeroSection = () => {
  return (
    <div
      className="relative -top-20 flex flex-col items-center justify-center w-screen h-[80vh] text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/img/about.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10">
        <h1
          className="text-5xl md:text-6xl font-bold text-white mb-6"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          About My Restaurant
        </h1>
        <p
          className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          Discover the story behind our passion for food, our commitment to
          quality, and the people who make it all possible.
        </p>
      </div>
    </div>
  );
};

const OurStorySection = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div data-aos="fade-left" data-aos-duration="1000">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
          <p className="text-gray-600 text-base mb-4">
            Founded in 2010, My Restaurant began as a small family venture with
            a big dream: to create a place where people could enjoy authentic,
            heartfelt cuisine. Over the years, we’ve grown, but our core values
            remain the same—quality, community, and passion.
          </p>
          <p className="text-gray-600 text-base mb-6">
            Every dish tells a story, crafted with locally-sourced ingredients
            and inspired by both tradition and innovation. Our team is dedicated
            to making every visit a memorable experience, whether you’re here
            for a quick bite or a special occasion.
          </p>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
          >
            Explore Our Menu
          </button>
        </div>
        <img
          src="/assets/img/kitchen.jpg"
          alt="Restaurant team preparing food"
          className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
          data-aos="fade-right"
          data-aos-duration="1000"
        />
      </div>
    </section>
  );
};

const OurMissionSection = () => {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className="text-4xl font-bold text-gray-800 mb-6"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Our Mission
        </h2>
        <p
          className="text-gray-600 text-base mb-8 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          At My Restaurant, our mission is to bring people together through
          exceptional food and warm hospitality. We strive to create a welcoming
          environment where every guest feels like family, and every meal is a
          celebration of flavor and connection.
        </p>
        <img
          src="/assets/img/table.jpg"
          alt="Restaurant dining area"
          className="rounded-2xl shadow-lg w-full max-w-4xl mx-auto h-[500px] object-cover"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="400"
        />
      </div>
    </section>
  );
};

const OurTeamSection = () => {
  const teamMembers = [
    {
      name: "Chef Anna Lee",
      role: "Head Chef",
      image: "/assets/img/photo3.jpg",
      description:
        "With over 20 years of culinary expertise, Anna crafts dishes that blend tradition with innovation.",
    },
    {
      name: "Michael Tran",
      role: "Restaurant Manager",
      image: "/assets/img/photo2.jpg",
      description:
        "Michael ensures every guest leaves with a smile, overseeing operations with passion and precision.",
    },
    {
      name: "Sophie Nguyen",
      role: "Pastry Chef",
      image: "/assets/img/photo1.jpg",
      description:
        "Sophie’s desserts are a sweet finale to every meal, created with love and creativity.",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6">
      <h2
        className="text-4xl font-bold text-center text-gray-800 mb-12"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Meet Our Team
      </h2>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay={index * 200}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              {member.name}
            </h3>
            <p className="text-gray-500 font-medium mb-2">{member.role}</p>
            <p className="text-gray-600">{member.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div
        className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div>
          <h3 className="text-2xl font-bold mb-4">My Restaurant</h3>
          <p className="text-gray-300">
            Serving delicious meals with love since 2010. Visit us for an
            unforgettable dining experience.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <p className="text-gray-300">123 Food Street, City</p>
          <p className="text-gray-300">Email: contact@myrestaurant.com</p>
          <p className="text-gray-300">Phone: +123 456 789</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-red-500">
              Facebook
            </a>
            <a href="#" className="text-gray-300 hover:text-red-500">
              Instagram
            </a>
            <a href="#" className="text-gray-300 hover:text-red-500">
              Twitter
            </a>
          </div>
        </div>
      </div>
      <div
        className="text-center text-gray-400 mt-8"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
      >
        © 2025 My Restaurant. All rights reserved.
      </div>
    </footer>
  );
};

const About = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen w-screen flex flex-col">
      <Header />
      <AboutHeroSection />
      <OurStorySection />
      <OurMissionSection />
      <OurTeamSection />
      <Footer />
    </div>
  );
};

export default About;
