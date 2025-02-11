
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const images = [
  "/lovable-uploads/bf82fc8b-4952-4608-85e7-267ca06f0d45.png",
  "https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=2532&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2400&auto=format&fit=crop",
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent"></div>
      </div>

      <Carousel className="w-full h-full" opts={{ loop: true }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="h-full">
              <div
                className={`w-full h-full transition-opacity duration-1000 ${
                  currentImage === index ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 z-20">
        <nav className="w-full bg-black/50 backdrop-blur-sm border-b border-gold/20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="text-gold font-playfair text-2xl font-bold tracking-wider">CHINTAMANI</div>
              <div className="flex space-x-8">
                {["Home", "About", "Products", "Contact"].map((item) => (
                  <button
                    key={item}
                    className="text-white/90 hover:text-gold transition-colors font-inter text-sm tracking-wide"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="container mx-auto px-4 h-[calc(100%-5rem)] flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center"
          >
            <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl mb-6 text-white tracking-wider">
              <span className="text-gold">Chintamani</span> Decors
            </h1>
            <p className="font-inter text-lg md:text-xl mb-12 text-gray-100">
              India's leading brand for Decorative Laminates and Panels with PAN
              India Distribution.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gold hover:bg-gold-light text-white font-inter px-8 py-4 rounded-full transition-colors duration-300 flex items-center gap-2"
            >
              Explore Collection
              <ChevronDown className="w-5 h-5 animate-float" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
