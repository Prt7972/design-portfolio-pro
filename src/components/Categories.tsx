import { motion } from "framer-motion";
import { Expand } from "lucide-react";

const categories = [
  {
    name: "Styro Edge",
    logo: "/lovable-uploads/bf82fc8b-4952-4608-85e7-267ca06f0d45.png",
    description: "Premium Edge Solutions",
  },
  {
    name: "Ignis",
    logo: "/lovable-uploads/bf82fc8b-4952-4608-85e7-267ca06f0d45.png",
    description: "Fire-Resistant Materials",
  },
  {
    name: "Canex",
    logo: "/lovable-uploads/bf82fc8b-4952-4608-85e7-267ca06f0d45.png",
    description: "Contemporary Designs",
  },
  {
    name: "Lamiteq",
    logo: "/lovable-uploads/bf82fc8b-4952-4608-85e7-267ca06f0d45.png",
    description: "Technical Laminates",
  },
];

const Categories = () => {
  return (
    <div className="py-24 bg-midnight">
      <div className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-syncopate text-center mb-16 text-white"
        >
          Our <span className="text-gold">Brands</span>
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-midnight-light rounded-xl p-8 cursor-pointer"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-gold/20 rounded-full filter blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gold">
                  <img
                    src={category.logo}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
              <h3 className="font-syncopate text-xl text-center text-white mb-2">{category.name}</h3>
              <p className="font-space text-sm text-center text-gray-400 mb-4">{category.description}</p>
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full bg-gold/20 text-gold hover:bg-gold/30 transition-colors"
                >
                  <Expand className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;