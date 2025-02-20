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
  const [extraInput, setExtraInput] = useState(""); // Extra input for "Insights"
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const fetchData = async (serviceId: string) => {
    if (serviceId === "insights" && (!userInput.trim() || !extraInput.trim())) {
      alert("Please enter both Company Name and Category!");
      return;
    } else if (!userInput.trim()) {
      alert("Please enter the required input!");
      return;
    }

    setLoading(true);
    setSelectedService(serviceId);
    
    const requestBody: any = {
      company_name: serviceId === "stock_info" || serviceId === "stock_summary" ? userInput : undefined,
      category: serviceId === "insights" ? extraInput : undefined,
      idea: serviceId === "insights" ? userInput : undefined, 
      company_info: serviceId === "custom_mail" ? userInput : undefined,
    };    

    try {
      const res = await fetch(`https://processpilot.pythonanywhere.com/${serviceId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) throw new Error("Failed to fetch data");

      const result = await res.json();
      setData(result.response);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData({ error: "Error fetching data. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-[linear-gradient(136deg,rgba(188,165,255,0)_0%,#214d76_100%)] bg-[#00040f] text-white p-6">
      {/* Title */}
      <motion.h1
        className="text-3xl font-bold mt-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Services 🚀
      </motion.h1>

      {/* Response Display */}
      <div className="w-full max-w-3xl bg-white text-black p-5 rounded-lg shadow-lg mt-4 overflow-y-auto max-h-[60vh]">
        {loading ? (
          <div className="flex items-center justify-center text-xl">⏳ Loading...</div>
        ) : data ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">Response:</h2>

            {/* Answer Section */}
            {data.answer && (
              <div className="mb-4 p-4 bg-gray-100 rounded-md">
                <h3 className="font-bold">📌 Answer:</h3>
                <p>{data.answer}</p>
              </div>
            )}

            {/* Query and Response Time */}
            <div className="text-sm text-gray-600">
              {data.query && <p>🔍 <strong>Query:</strong> {data.query}</p>}
              {data.response_time && <p>⏱ <strong>Response Time:</strong> {data.response_time} sec</p>}
            </div>

            {/* News Articles */}
            {data.results && data.results.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">📰 Related Articles:</h3>
                <div className="space-y-4">
                  {data.results.map((article: any, index: number) => (
                    <div key={index} className="p-4 border rounded-lg bg-gray-50">
                      <h4 className="font-bold text-blue-600">{article.title}</h4>
                      <p className="text-sm text-gray-600">📅 {new Date(article.published_date).toLocaleString()}</p>
                      <p className="text-sm mt-2">{article.content.slice(0, 150)}...</p>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline mt-2 block"
                      >
                        🔗 Read More
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">Choose a service to fetch data.</p>
        )}
      </div>

      {/* Inputs and Buttons at Bottom */}
      <div className="w-full max-w-md mt-auto" style={{ minWidth: "-webkit-fill-available" }}>
        {/* Input Field */}
        <motion.input
          type="text"
          placeholder="Enter company name..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="p-3 text-black rounded-md shadow-md w-full mt-4"
          whileFocus={{ scale: 1 }}
        />

        {/* Extra Input for Insights */}
        {selectedService === "insights" && (
          <motion.input
            type="text"
            placeholder="Enter category..."
            value={extraInput}
            onChange={(e) => setExtraInput(e.target.value)}
            className="p-3 text-black rounded-md shadow-md w-full mt-2"
            whileFocus={{ scale: 1.02 }}
          />
        )}

        {/* Service Buttons */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          {services.map((service) => (
            <motion.button
              key={service.id}
              className={`px-5 py-3 rounded-lg font-semibold transition-all ${
                selectedService === service.id && loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-white text-blue-600 hover:bg-blue-400 hover:text-white"
              }`}
              onClick={() => fetchData(service.id)}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.9 }}
              disabled={selectedService === service.id && loading}
            >
              {loading && selectedService === service.id ? "Loading..." : service.name}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

