import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";

// This can be moved to a config file later for admin control
const galleryItems = {
  brochures: [
    { title: "Product Catalog 2024", description: "Complete range of products", type: "PDF", size: "2.4 MB" },
    { title: "Design Guide", description: "Interior styling tips", type: "PDF", size: "1.8 MB" },
    { title: "Technical Specs", description: "Detailed specifications", type: "PDF", size: "3.1 MB" },
  ],
  products: [
    { title: "Modern Collection", description: "Contemporary designs", imageUrl: "/placeholder.svg", price: "$299" },
    { title: "Classic Series", description: "Timeless elegance", imageUrl: "/placeholder.svg", price: "$399" },
    { title: "Premium Range", description: "Luxury finishes", imageUrl: "/placeholder.svg", price: "$599" },
  ],
  gallery: [
    { title: "Project Alpha", description: "Modern office design", imageUrl: "/placeholder.svg" },
    { title: "Project Beta", description: "Luxury residence", imageUrl: "/placeholder.svg" },
    { title: "Project Gamma", description: "Commercial space", imageUrl: "/placeholder.svg" },
  ]
};

interface GallerySectionProps {
  activeTab: string;
}

const GallerySection = ({ activeTab }: GallerySectionProps) => {
  const items = galleryItems[activeTab as keyof typeof galleryItems] || [];

  return (
    <div className="py-12 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group hover:shadow-lg transition-all duration-300 bg-card border-gold/20 hover:border-gold/40">
                <CardHeader>
                  <CardTitle className="font-syncopate text-xl">{item.title}</CardTitle>
                  <CardDescription className="font-space">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {'imageUrl' in item ? (
                    <div className="relative h-48 rounded-md overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : null}
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  {'type' in item ? (
                    <>
                      <span className="text-sm text-muted-foreground">{item.type} • {item.size}</span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-full bg-gold/20 text-gold hover:bg-gold/30 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                    </>
                  ) : 'price' in item ? (
                    <span className="text-lg font-semibold text-gold">{item.price}</span>
                  ) : null}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default GallerySection;