import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative h-[70vh] bg-gradient-to-r from-[#d7d2cc] to-[#304352] overflow-hidden">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl text-white"
        >
          <h1 className="font-playfair text-5xl md:text-6xl mb-6">
            Transform Your Space
          </h1>
          <p className="font-inter text-lg md:text-xl mb-8 text-gray-100">
            India's leading brand for Decorative Laminates and Panels with PAN India Distribution.
          </p>
          <button className="bg-gold hover:bg-gold-light text-white font-inter px-8 py-3 rounded-md transition-colors">
            Explore Our Collection
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;