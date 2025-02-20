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
  const [userInput, setUserInput] = useState("");
  const [extraInput, setExtraInput] = useState(""); // ✅ Define extraInput state
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const fetchData = async (serviceId: string) => {
    if (serviceId === "insights") {
      if (!userInput.trim() || !extraInput.trim()) {
        alert("Please enter both Company Name and Category!");
        return;
      }
    } else {
      if (!userInput.trim()) {
        alert("Please enter the required input!");
        return;
      }
    }

    setLoading(true);
    setSelectedService(serviceId);

    const requestBody: any = {};

    if (serviceId === "stock_info" || serviceId === "stock_summary") {
      requestBody.company_name = userInput;
    } else if (serviceId === "insights") {
      requestBody.company_name = userInput;
      requestBody.category = extraInput;
    } else if (serviceId === "custom_mail") {
      requestBody.company_info = userInput;
    }

    try {
      const res = await fetch(`https://processpilot.pythonanywhere.com/${serviceId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const result = await res.json();
      setData(JSON.stringify(result.response, null, 2));
    } catch (error) {
      console.error("Error fetching data:", error);
      setData("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Services 🚀
      </motion.h1>

      {/* User Input */}
      <motion.input
        type="text"
        placeholder="Enter company name..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="p-3 text-black rounded-md shadow-md w-80 mb-3"
        whileFocus={{ scale: 1.05 }}
      />

      {/* Extra Input: Show only if "Insights" is selected */}
      {selectedService === "insights" && (
        <motion.input
          type="text"
          placeholder="Enter category..."
          value={extraInput}
          onChange={(e) => setExtraInput(e.target.value)}
          className="p-3 text-black rounded-md shadow-md w-80 mb-6"
          whileFocus={{ scale: 1.05 }}
        />
      )}

      {/* Service Buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {services.map((service) => (
          <motion.button
            key={service.id}
            className={`px-5 py-3 rounded-lg font-semibold transition-all ${
              selectedService === service.id && loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white text-blue-600 hover:bg-blue-400 hover:text-white"
            }`}
            onClick={() => fetchData(service.id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={selectedService === service.id && loading}
          >
            {loading && selectedService === service.id ? "Loading..." : service.name}
          </motion.button>
        ))}
      </div>

      {/* Response Data */}
      {data && (
        <motion.div
          className="bg-gray-100 text-black p-5 rounded-lg shadow-md w-96"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-2">Response:</h2>
          <pre className="text-sm whitespace-pre-wrap">{data}</pre>
        </motion.div>
      )}
    </div>
  );
}
