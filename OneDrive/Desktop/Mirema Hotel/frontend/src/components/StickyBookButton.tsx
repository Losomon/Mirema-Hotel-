import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function StickyBookButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Link to="/booking">
            <Button
              size="lg"
              className="bg-accent-gold hover:bg-accent-gold/90 text-dark-gray-text font-paragraph font-bold px-8 py-6 rounded-full shadow-2xl hover:shadow-accent-gold/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
            >
              <Calendar className="w-5 h-5" />
              Book Now
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
