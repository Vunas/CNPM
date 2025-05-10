import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="text-2xl font-bold">My Restaurant</div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">
        DINE IN
      </button>
    </header>
  );
};

const Introduction = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center bg-gray-50 px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to My Restaurant!</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-2xl">
        Enjoy fresh and tasty food with fast delivery. Explore our menu and
        order your favorites today!
      </p>
      <button className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600">
        Order Now
      </button>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">About Our Restaurant</h2>
          <p className="text-gray-700 text-lg mb-4">
            At My Restaurant, we bring you authentic flavors made from the
            freshest ingredients. From family dinners to casual meals, we serve
            happiness in every dish.
          </p>
          <p className="text-gray-700 text-lg">
            Our chefs are passionate about delivering delicious meals with
            exceptional service. Come dine in or order online!
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          alt="Delicious food"
          className="rounded-2xl shadow-lg"
        />
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="text-center p-4 border-t border-gray-200">
      <p className="text-gray-600">Contact Us: 123 Food Street, City</p>
      <p className="text-gray-600">
        Email: contact@myrestaurant.com | Phone: +123 456 789
      </p>
    </footer>
  );
};

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Introduction />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Home;
