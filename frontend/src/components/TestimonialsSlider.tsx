import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    location: 'United Kingdom',
    rating: 5,
    text: 'Absolutely wonderful stay! The staff were incredibly welcoming and the rooms were spotless. The location is perfect for business travelers, yet peaceful enough to relax after a long day.',
    date: 'December 2024'
  },
  {
    id: 2,
    name: 'David Kamau',
    location: 'Nairobi, Kenya',
    rating: 5,
    text: 'I have stayed here multiple times for business trips. The service is consistently excellent, and the apartments are well-equipped with everything you need for an extended stay.',
    date: 'November 2024'
  },
  {
    id: 3,
    name: 'Maria Rodriguez',
    location: 'Spain',
    rating: 5,
    text: 'A hidden gem in Nairobi! The serene atmosphere and attentive staff made our family vacation memorable. The restaurant food was delicious, and the parking was very convenient.',
    date: 'October 2024'
  },
  {
    id: 4,
    name: 'James Omondi',
    location: 'Mombasa, Kenya',
    rating: 4,
    text: 'Great value for money. The rooms are comfortable and clean. WiFi is fast, which was essential for my work. Will definitely return on my next visit to Nairobi.',
    date: 'September 2024'
  },
  {
    id: 5,
    name: 'Emily Chen',
    location: 'Singapore',
    rating: 5,
    text: 'Exceeded all expectations! The one-bedroom apartment was spacious and beautifully furnished. Perfect for our two-week stay. The 24/7 reception was very helpful.',
    date: 'August 2024'
  }
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000); // Change slide every 6 seconds

    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section className="w-full py-24 bg-primary text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="text-center mb-16">
          <span className="text-accent-gold font-paragraph text-sm font-bold tracking-widest uppercase block mb-4">
            Guest Reviews
          </span>
          <h2 className="font-heading text-4xl md:text-5xl">What Our Guests Say</h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="relative h-[400px] md:h-[350px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-none">
                  <Quote className="w-12 h-12 text-accent-gold mb-6" />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonials[currentIndex].rating
                            ? 'text-accent-gold fill-accent-gold'
                            : 'text-white/30'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="font-paragraph text-lg md:text-xl text-white/90 leading-relaxed mb-8 italic">
                    "{testimonials[currentIndex].text}"
                  </p>

                  <div className="flex items-center justify-between border-t border-white/10 pt-6">
                    <div>
                      <p className="font-paragraph font-bold text-white text-lg">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="font-paragraph text-white/60 text-sm">
                        {testimonials[currentIndex].location}
                      </p>
                    </div>
                    <p className="font-paragraph text-white/60 text-sm">
                      {testimonials[currentIndex].date}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <Button
              onClick={() => paginate(-1)}
              variant="outline"
              size="icon"
              className="border-white/30 text-white hover:bg-white hover:text-primary rounded-full w-12 h-12"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-accent-gold w-8'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={() => paginate(1)}
              variant="outline"
              size="icon"
              className="border-white/30 text-white hover:bg-white hover:text-primary rounded-full w-12 h-12"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
