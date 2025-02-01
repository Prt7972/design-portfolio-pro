import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["Brochures", "Products", "Gallery", "Enquire"];

const Navigation = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`${
                activeTab === tab
                  ? "text-gold border-gold"
                  : "text-gray-600 border-transparent hover:text-gold"
              } relative px-6 py-4 font-inter text-sm font-medium border-b-2 transition-colors`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                />
              )}
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navigation;