import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Image, MessageSquare, Package2 } from "lucide-react";
import GallerySection from "./GallerySection";

const tabs = [
  { name: "brochures", icon: FileText },
  { name: "products", icon: Package2 },
  { name: "gallery", icon: Image },
  { name: "enquire", icon: MessageSquare },
];

const Navigation = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <>
      <div className="bg-midnight border-b border-gold/20">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  className={`${
                    activeTab === tab.name
                      ? "text-gold border-gold"
                      : "text-gray-400 border-transparent hover:text-gold/80"
                  } relative px-6 py-4 font-space text-sm font-medium border-b-2 transition-colors flex items-center gap-2 capitalize`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.name}
                  {activeTab === tab.name && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      {activeTab !== "enquire" && <GallerySection activeTab={activeTab} />}
    </>
  );
};

export default Navigation;