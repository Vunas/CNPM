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
      className={`flex justify-between items-center p-2 px-6 sticky top-0 z-50 transition-colors duration-300 ${
        scrolling
          ? "bg-white text-black shadow-lg"
          : "bg-transparent text-white"
      }`}
    >
      <div className=" xl:text-2xl sm:text-lg font-semibold">
        <Link to="/" className="hover:text-red-500 transition-colors">
          My Restaurant
        </Link>
      </div>
      <nav className="flex space-x-6 items-center">
        <Link
          to="/home"
          className="hover:text-red-500 text-base font-medium"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-aos="fade-down"
          data-aos-delay="100"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-red-500 text-base font-medium"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-aos="fade-down"
          data-aos-delay="200"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="hover:text-red-500 text-base font-medium"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          data-aos="fade-down"
          data-aos-delay="300"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
};

const ContactHeroSection = () => {
  return (
    <div
      className="relative -top-20 flex flex-col items-center justify-center w-screen h-[80vh] text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/assets/img/contact.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10">
        <h1
          className="text-5xl md:text-6xl font-bold text-white mb-6"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          Get in Touch
        </h1>
        <p
          className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          We’d love to hear from you! Whether you have a question, feedback, or
          want to make a reservation, reach out to us today.
        </p>
      </div>
    </div>
  );
};

const ContactInfoSection = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div data-aos="fade-left" data-aos-duration="1000">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Contact Information
          </h2>
          <p className="text-gray-600 text-base mb-4">
            Visit us at our location, give us a call, or send an email. We’re
            here to assist you with reservations, inquiries, or special
            requests.
          </p>
          <ul className="text-gray-600 text-base space-y-3">
            <li>
              <strong>Address:</strong> 123 Food Street, City, Country
            </li>
            <li>
              <strong>Phone:</strong> +123 456 789
            </li>
            <li>
              <strong>Email:</strong> contact@myrestaurant.com
            </li>
            <li>
              <strong>Hours:</strong> Mon-Sun, 10:00 AM - 10:00 PM
            </li>
          </ul>
          <div className="mt-6">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              Make a Reservation
            </button>
          </div>
        </div>
        <img
          src="/assets/img/about.jpg"
          alt="Restaurant exterior"
          className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
          data-aos="fade-right"
          data-aos-duration="1000"
        />
      </div>
    </section>
  );
};

const ContactFormSection = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-white py-16 px-6">
      <h2
        className="text-4xl font-bold text-center text-gray-800 mb-12"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Send Us a Message
      </h2>
      <div
        className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="200"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="5"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="600"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

const MapSection = () => {
  return (
    <section className="bg-gray-100 py-16 px-6">
      <h2
        className="text-4xl font-bold text-center text-gray-800 mb-12"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Find Us
      </h2>
      <div className="max-w-7xl mx-auto">
        <img
          src="/assets/img/yummy.jpg"
          alt="Map placeholder"
          className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
        />
        <p
          className="text-center text-gray-600 mt-4"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          Visit us at 123 Food Street, City, Country
        </p>
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

const Contact = () => {
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
      <ContactHeroSection />
      <ContactInfoSection />
      <ContactFormSection />
      <MapSection />
      <Footer />
    </div>
  );
};

export default Contact;
