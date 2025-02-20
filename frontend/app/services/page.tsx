"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const services = [
  { id: "stock_info", name: "Stock Info" },
  { id: "stock_summary", name: "Stock Summary" },
  { id: "insights", name: "Insights" },
  { id: "custom_mail", name: "Custom Mail" },
];

export default function ServicesPage() {
  const [data, setData] = useState<string | null>(null);
  const [activeService, setActiveService] = useState<string | null>(null);

  const fetchData = async (serviceId: string) => {
    try {
      const requestBody = {}; // Define body based on API requirements
  
      if (serviceId === "stock_info" || serviceId === "stock_summary") {
        requestBody.company_name = "Tesla"; // Replace with user input
      } else if (serviceId === "insights") {
        requestBody.category = "Finance";
        requestBody.idea = "Stock market trends"; // Replace with user input
      } else if (serviceId === "custom_mail") {
        requestBody.company_info = "Example Company"; // Replace with user input
      }
  
      const res = await fetch(`https://processpilot.pythonanywhere.com/${serviceId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
  
      const result = await res.json();
      setData(JSON.stringify(result, null, 2)); // Pretty print response
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  

  return (
    <div className="flex flex-col items-center p-10 min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <motion.h1
        className="text-4xl font-extrabold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Services
      </motion.h1>
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {services.map((service) => (
          <motion.button
            key={service.id}
            className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform 
              ${activeService === service.id ? "bg-yellow-400 text-black scale-105" : "bg-white text-blue-900 hover:bg-yellow-300 hover:scale-110"}`}
            onClick={() => fetchData(service.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {service.name}
          </motion.button>
        ))}
      </motion.div>
      {data && (
        <motion.div
          className="w-full max-w-lg p-6 bg-white text-gray-900 rounded-lg shadow-lg mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-3 text-center">Service Data:</h2>
          <p className="text-lg text-center">{data}</p>
        </motion.div>
      )}
    </div>
  );
}
