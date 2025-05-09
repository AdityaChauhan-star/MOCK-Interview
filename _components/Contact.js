'use client';

import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold text-gray-800">Contact Us</h2>
      <p className="mt-4 text-lg text-gray-800">
        Have questions? Reach out to us!
      </p>
      <form className="mt-8 max-w-lg mx-auto">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Your Message"
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
      <button
        onClick={() => window.location.href = 'mailto:your-email@example.com'}
        className="mt-8 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
      >
        Contact Me Directly
      </button>
    </div>
  );
};

export default Contact;
