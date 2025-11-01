"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import Contact from "@/_components/Contact";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaRobot, FaComments, FaChartBar } from "react-icons/fa";

const Page = () => {
  return (
    <div className="bg-white text-gray-900 scroll-smooth">
      <Head>
        <title>AI Mock Interview</title>
        <meta
          name="description"
          content="Ace your next interview with AI-powered mock interviews and personalized insights."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header Section */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/80 shadow-sm">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 py-4">
          <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">
            AI Mock Interview
          </h1>
          <nav className="flex flex-wrap gap-6 mt-3 md:mt-0 items-center text-gray-700">
            <Link href="#features" className="hover:text-indigo-600 transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="hover:text-indigo-600 transition-colors">
              Feedback
            </Link>
            <Link href="#contact" className="hover:text-indigo-600 transition-colors">
              Contact
            </Link>
            <a
              href="https://github.com/AdityaChauhan-star"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-indigo-600 transition"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between text-center md:text-left pt-36 pb-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl"
        >
          <h2 className="text-5xl font-extrabold leading-tight">
            Ace Your Next Interview
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Practice with AI-powered mock interviews and get personalized feedback
            to boost your confidence.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link
              href="/dashboard"
              className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Get Started
            </Link>
            <a
              href="#features"
              className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-700 transition-all"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* <motion.img
          src="/ai-illustration.svg"
          alt="AI Interview"
          className="w-full md:w-[45%] mb-10 md:mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        /> */}
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-8 bg-gray-50">
        <div className="container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-800"
          >
            Features
          </motion.h2>
          <p className="mt-4 text-lg text-gray-600">
            Unlock your potential with our smart AI-driven tools.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <FaRobot className="text-indigo-600 text-4xl mb-4" />,
                title: "AI Mock Interviews",
                desc: "Simulate real interviews with cutting-edge AI technology.",
              },
              {
                icon: <FaComments className="text-indigo-600 text-4xl mb-4" />,
                title: "Instant Feedback",
                desc: "Get personalized insights to refine your communication.",
              },
              {
                icon: <FaChartBar className="text-indigo-600 text-4xl mb-4" />,
                title: "Performance Reports",
                desc: "Track progress and identify strengths and weaknesses.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                {f.icon}
                <h3 className="text-2xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-8 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800">User Feedback</h2>
          <p className="mt-4 text-lg text-gray-600">
            Hear what our users have to say about their experience.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Aditya Chauhan",
                feedback:
                  "Good experience overall! The feedback was actionable and helped me perform better.",
              },
              {
                name: "Yogesh Dangwal",
                feedback:
                  "The AI’s suggestions were spot on — improved my confidence for real interviews.",
              },
              {
                name: "Vivek Singh",
                feedback:
                  "Amazing platform! The mock interviews felt realistic and truly helped me grow.",
              },
              {
                name: "Aditya Sridhar",
                feedback:
                  "This tool pinpointed my weak areas clearly. Loved the reports!",
              },
              {
                name: "Abhay Baghel",
                feedback:
                  "Highly recommended! It reduces anxiety and helps in structured thinking.",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-indigo-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <p className="text-gray-700 italic">"{t.feedback}"</p>
                <h4 className="mt-4 font-semibold text-indigo-700">- {t.name}</h4>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50 px-8">
        <Contact />
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-gray-300 py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">AI Mock Interview</h3>
            <p className="text-gray-400">
              Empowering your career with AI-driven preparation.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="hover:text-indigo-400 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-indigo-400 transition">
                  Feedback
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-indigo-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com/AdityaChauhan-star"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/aditya-chauhan-016986247/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400 transition"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3 text-white">Stay Updated</h4>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md bg-slate-800 border border-slate-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Button className="bg-indigo-600 hover:bg-indigo-500 transition-all text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="text-center mt-10 text-gray-500 text-sm">
          © {new Date().getFullYear()} AI Mock Interview. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Page;
