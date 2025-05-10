import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="text-3xl font-extrabold text-gray-800">
        <Link to="/" className="hover:text-red-500 transition-colors">
          My Restaurant
        </Link>
      </div>
      <nav className="flex space-x-6 items-center">
        <Link
          to="/menu"
          className="text-gray-600 hover:text-red-500 text-lg font-medium"
        >
          Menu
        </Link>
        <Link
          to="/about"
          className="text-gray-600 hover:text-red-500 text-lg font-medium"
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-gray-600 hover:text-red-500 text-lg font-medium"
        >
          Contact
        </Link>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
          DINE IN
        </button>
      </nav>
    </header>
  );
};

const HeroSection = ({ restaurantId, restaurantTableId }) => {
  return (
    <div
      className="relative flex flex-col items-center justify-center h-[90vh] text-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Welcome to My Restaurant!
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
          Indulge in a culinary journey with our fresh, locally-sourced
          ingredients crafted into unforgettable dishes. Whether you're dining
          in or ordering online, we’re here to make every meal extraordinary.
        </p>
        <button className="bg-red-500 text-white px-8 py-4 rounded-full hover:bg-red-600 transition-transform transform hover:scale-105">
          <Link
            to={`/order?restaurantid=${restaurantId}&restauranttableid=${restaurantTableId}`}
            className="text-white text-lg font-semibold"
          >
            Order Now
          </Link>
        </button>
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Our Culinary Legacy
          </h2>
          <p className="text-gray-600 text-lg mb-4">
            Established in 2010, My Restaurant is a family-owned haven dedicated
            to bringing authentic, high-quality cuisine to our community. Our
            passion for food drives us to source the freshest ingredients,
            ensuring every dish bursts with flavor.
          </p>
          <p className="text-gray-600 text-lg mb-6">
            From our signature pastas to our delectable desserts, our talented
            chefs craft each meal with love and precision. Whether it’s a cozy
            family dinner or a quick lunch, we strive to create memorable dining
            experiences with exceptional service.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
            Learn More
          </button>
        </div>
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          alt="Restaurant interior with delicious food"
          className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
        />
      </div>
    </section>
  );
};

const FeaturedDishes = () => {
  const dishes = [
    {
      name: "Classic Margherita Pizza",
      description:
        "Fresh mozzarella, basil, and house-made tomato sauce on a crispy artisan crust.",
      image: "src/assets/PizzaHaiSan.png",
    },
    {
      name: "Grilled Salmon Delight",
      description:
        "Succulent salmon fillet with lemon herb sauce, served with roasted seasonal vegetables.",
      image: "src/assets/BlackBeanNoodles.jpg",
    },
    {
      name: "Chocolate Lava Cake",
      description:
        "Warm, gooey chocolate cake with a scoop of creamy vanilla ice cream.",
      image: "src/assets/BurgerGa.jpg",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Signature Dishes
      </h2>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {dishes.map((dish, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl shadow-lg overflow-hidden"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {dish.name}
              </h3>
              <p className="text-gray-600 mb-4">{dish.description}</p>
              <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Jane Doe",
      review:
        "The food was absolutely divine! The cozy ambiance and friendly staff made our evening unforgettable.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      name: "John Smith",
      review:
        "Best pizza I’ve ever had! The delivery was lightning-fast, and the flavors were spot on.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    },
    {
      name: "Emily Chen",
      review:
        "The desserts are to die for! Highly recommend the chocolate lava cake.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    },
  ];

  return (
    <section className="bg-gray-100 py-16 px-6">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        What Our Guests Say
      </h2>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex items-center space-x-4"
          >
            <img
              src={review.image}
              alt={review.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {review.name}
              </h3>
              <p className="text-gray-600">{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ContactForm = () => {
  return (
    <section className="py-16 px-6 bg-white">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Get in Touch
      </h2>
      <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Your Email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="5"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="button"
            className="w-full bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600"
          >
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
};

const NewsletterSignup = () => {
  return (
    <section className="py-16 px-6 bg-gray-800 text-white text-center">
      <h2 className="text-4xl font-bold mb-6">Join Our Newsletter</h2>
      <p className="text-lg mb-8 max-w-2xl mx-auto">
        Stay updated with our latest menu items, exclusive offers, and special
        events. Subscribe now!
      </p>
      <div className="max-w-md mx-auto flex">
        <input
          type="email"
          className="flex-1 p-3 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          placeholder="Enter your email"
        />
        <button className="bg-red-500 text-white px-6 py-3 rounded-r-lg hover:bg-red-600">
          Subscribe
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
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
      <div className="text-center text-gray-400 mt-8">
        &copy; 2025 My Restaurant. All rights reserved.
      </div>
    </footer>
  );
};

// The main Home component that brings all sections together
const Home = () => {
  const [searchParams] = useSearchParams();
  const restaurantId = searchParams.get("restaurantid");
  const restaurantTableId = searchParams.get("restauranttableid");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection
        restaurantId={restaurantId}
        restaurantTableId={restaurantTableId}
      />
      <AboutSection />
      <FeaturedDishes />
      <CustomerReviews />
      <ContactForm />
      <NewsletterSignup />
      <Footer />
    </div>
  );
};

export default Home;
