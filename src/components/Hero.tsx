import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-screen bg-gradient-to-br from-midnight to-midnight-light overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-gold/5 to-transparent"></div>
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center"
        >
          <h1 className="font-syncopate text-4xl md:text-6xl lg:text-7xl mb-6 text-white tracking-wider">
            <span className="text-gold">Future</span> of Design
          </h1>
          <p className="font-space text-lg md:text-xl mb-12 text-gray-300">
            India's leading brand for Decorative Laminates and Panels with PAN India Distribution.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gold hover:bg-gold-light text-white font-space px-8 py-4 rounded-full transition-colors duration-300 flex items-center gap-2"
          >
            Explore Collection
            <ChevronDown className="w-5 h-5 animate-float" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;