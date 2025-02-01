import { motion } from "framer-motion";

const categories = [
  {
    name: "Styro Edge",
    logo: "/lovable-uploads/bf82fc8b-4952-4608-85e7-267ca06f0d45.png",
  },
  {
    name: "Ignis",
    logo: "/lovable-uploads/bf82fc8b-4952-4608-85e7-267ca06f0d45.png",
  },
  {
    name: "Canex",
    logo: "/lovable-uploads/bf82fc8b-4952-4608-85e7-267ca06f0d45.png",
  },
  {
    name: "Lamiteq",
    logo: "/lovable-uploads/bf82fc8b-4952-4608-85e7-267ca06f0d45.png",
  },
];

const Categories = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair text-center mb-12">Our Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gold mb-4">
                <img
                  src={category.logo}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-inter text-lg text-center">{category.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;