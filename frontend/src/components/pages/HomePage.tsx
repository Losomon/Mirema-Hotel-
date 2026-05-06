// HPI 1.7-G
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Wifi, Car, Home, Clock, UtensilsCrossed, Users, ArrowRight, Star, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StickyBookButton from '@/components/StickyBookButton';
import WhatsAppButton from '@/components/WhatsAppButton';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import FAQSection from '@/components/FAQSection';

// --- Types & Interfaces ---
interface Highlight {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Room {
  id: number;
  name: string;
  description: string;
  image: string;
}

// --- Animation Variants ---
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function HomePage() {
  // --- Canonical Data Sources ---
  const highlights: Highlight[] = [
    { icon: Wifi, title: 'Free High-Speed Wi-Fi', description: 'Stay connected throughout your visit' },
    { icon: Car, title: 'Secure Parking', description: 'Complimentary parking for all guests' },
    { icon: Home, title: 'Serviced Apartments', description: 'Fully furnished for extended stays' },
    { icon: Clock, title: '24/7 Reception', description: 'Round-the-clock assistance' },
    { icon: UtensilsCrossed, title: 'Restaurant & Room Service', description: 'Delicious meals at your convenience' },
    { icon: Users, title: 'Conference Facilities', description: 'Professional meeting spaces' },
  ];

  const featuredRooms: Room[] = [
    {
      id: 1,
      name: 'Standard Room',
      description: 'Comfortable accommodation with modern amenities for a relaxing stay',
      image: 'https://static.wixstatic.com/media/6f7c4d_2f164bf6527e4ab983cbd34a391a177f~mv2.png?originWidth=768&originHeight=576',
    },
    {
      id: 2,
      name: 'Deluxe Room',
      description: 'Spacious rooms with premium features and stunning city views',
      image: 'https://static.wixstatic.com/media/6f7c4d_21142f911ea043e49681baa60682cee0~mv2.png?originWidth=768&originHeight=576',
    },
    {
      id: 3,
      name: 'One-Bedroom Apartment',
      description: 'Fully furnished apartments perfect for extended business or leisure stays',
      image: 'https://static.wixstatic.com/media/6f7c4d_63a9727e0b2043d892986a7fe1de623f~mv2.png?originWidth=768&originHeight=576',
    },
  ];

  // --- Scroll Hooks ---
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background overflow-clip selection:bg-primary selection:text-white">
      <Header />
      <StickyBookButton />
      <WhatsAppButton />

      {/* --- HERO SECTION: Cinematic Parallax --- */}
      <section ref={heroRef} className="relative w-full h-[95vh] flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://static.wixstatic.com/media/6f7c4d_0c7730fd9c1447e4b55d49b62f1a6a15~mv2.png?originWidth=1920&originHeight=1024"
            alt="Mirema Hotel Exterior - Serene Atmosphere"
            className="w-full h-full object-cover scale-105"
            width={1920}
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col gap-8"
            >
              <motion.div variants={fadeInUp} className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-accent-gold" />
                <span className="font-paragraph text-accent-gold tracking-widest uppercase text-sm font-semibold">
                  Welcome to Nairobi
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp} className="font-heading text-5xl md:text-7xl lg:text-8xl text-white leading-[1.1] drop-shadow-lg">
                Comfort & Convenience <br />
                <span className="italic font-light opacity-90">at Mirema Hotel</span>
              </motion.h1>

              <motion.p variants={fadeInUp} className="font-paragraph text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed">
                Enjoy peaceful accommodation with modern amenities in the heart of Nairobi. 
                A sanctuary of calm for business and leisure.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
                <Link to="/booking">
                  <Button size="lg" className="bg-accent-gold hover:bg-accent-gold/90 text-white font-paragraph font-medium px-10 py-7 text-lg rounded-none transition-all duration-300 hover:translate-y-[-2px]">
                    Book Now
                  </Button>
                </Link>
                <Link to="/rooms">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-paragraph font-medium px-10 py-7 text-lg rounded-none backdrop-blur-sm transition-all duration-300">
                    Check Availability
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- INTRODUCTION: Split Layout with Reveal --- */}
      <section className="relative w-full py-24 md:py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Text Content */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="lg:col-span-5 flex flex-col gap-8"
            >
              <motion.h2 variants={fadeInUp} className="font-heading text-4xl md:text-5xl text-primary leading-tight">
                A Serene Sanctuary <br />
                <span className="text-accent-gold italic">in the City</span>
              </motion.h2>
              
              <motion.div variants={fadeInUp} className="space-y-6 font-paragraph text-foreground/80 text-lg leading-relaxed">
                <p>
                  Mirema Hotel & Service Apartments offers affordable, comfortable accommodation in a serene neighborhood along Mirema Drive, Nairobi.
                </p>
                <p>
                  Whether for business or leisure, we provide a relaxing and secure environment for all our guests. Experience the perfect blend of Kenyan hospitality and modern convenience.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Link to="/about" className="group inline-flex items-center gap-2 text-primary font-semibold border-b border-primary pb-1 hover:text-accent-gold hover:border-accent-gold transition-colors duration-300">
                  Learn More About Us
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Image Composition */}
            <div className="lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative z-10 aspect-[4/3] overflow-hidden"
              >
                <Image
                  src="https://static.wixstatic.com/media/6f7c4d_2dc2a1efbdb04959aeafe7b3b2d3cb97~mv2.png?originWidth=1152&originHeight=896"
                  alt="Hotel Interior Lobby"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  width={1200}
                />
              </motion.div>
              {/* Decorative Element */}
              <div className="absolute -bottom-8 -left-8 w-2/3 h-2/3 border border-primary/20 z-0 hidden md:block" />
            </div>

          </div>
        </div>
      </section>

      {/* --- AMENITIES: Staggered Grid --- */}
      <section className="w-full py-24 bg-light-gray-background border-y border-primary/5">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-20">
            <span className="text-accent-gold font-paragraph text-sm font-bold tracking-widest uppercase block mb-4">Why Choose Us</span>
            <h2 className="font-heading text-4xl md:text-5xl text-primary">Curated for Your Comfort</h2>
          </div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {highlights.map((item, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeInUp}
                className="group flex flex-col items-start p-8 bg-white border border-transparent hover:border-primary/10 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-none bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-2xl text-primary mb-3">{item.title}</h3>
                <p className="font-paragraph text-foreground/70 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- ACCOMMODATIONS: Sticky Sidebar Layout --- */}
      <section className="relative w-full py-32 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sticky Header */}
            <div className="lg:w-1/3">
              <div className="sticky top-32">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <h2 className="font-heading text-5xl md:text-6xl text-primary mb-6">
                    Our <br /> Accommodations
                  </h2>
                  <p className="font-paragraph text-lg text-foreground/80 mb-8 max-w-md">
                    Choose from our selection of comfortable rooms and fully serviced apartments. Designed for rest, crafted for you.
                  </p>
                  <Link to="/rooms">
                    <Button className="bg-primary text-white hover:bg-primary/90 px-8 py-6 rounded-none font-paragraph">
                      View All Rooms
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Scrollable Cards */}
            <div className="lg:w-2/3 flex flex-col gap-16">
              {featuredRooms.map((room, index) => (
                <RoomCard key={room.id} room={room} index={index} />
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS SLIDER --- */}
      <TestimonialsSlider />

      {/* --- FAQ SECTION --- */}
      <FAQSection />

      {/* --- LOCATION PREVIEW --- */}
      <section className="w-full py-24 bg-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-light-gray-background p-12 border border-primary/10">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4 text-accent-gold">
                <MapPin className="w-5 h-5" />
                <span className="font-paragraph font-bold tracking-wider uppercase text-sm">Prime Location</span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl text-primary mb-4">Convenience at Your Doorstep</h2>
              <p className="font-paragraph text-foreground/70 mb-8 max-w-xl">
                Located along Mirema Drive, off Kamiti Road. Enjoy quick access to Nairobi's business districts while retreating to a quiet, secure neighborhood.
              </p>
              <Link to="/contact">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white rounded-none px-8 py-6">
                  Get Directions
                </Button>
              </Link>
            </div>
            <div className="w-full md:w-1/3 h-64 bg-primary/5 relative overflow-hidden">
               {/* Abstract Map Representation */}
               <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#0A3A2A_1px,transparent_1px)] [background-size:16px_16px]" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-primary text-xl italic">Map View Available</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="w-full py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-accent-gold rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        </div>
        
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20 relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="font-heading text-5xl md:text-7xl mb-8">
              Ready for a comfortable <br /> stay in Nairobi?
            </motion.h2>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/booking">
                <Button size="lg" className="bg-accent-gold hover:bg-accent-gold/90 text-primary font-paragraph font-bold px-12 py-8 text-xl rounded-none min-w-[200px]">
                  Book Your Stay
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white hover:text-primary font-paragraph font-medium px-12 py-8 text-xl rounded-none min-w-[200px]">
                  Contact Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- Sub-Components ---

function RoomCard({ room, index }: { room: Room; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative grid grid-cols-1 md:grid-cols-2 gap-0 bg-white border border-primary/5 shadow-sm hover:shadow-xl transition-shadow duration-500"
    >
      <div className="relative h-[300px] md:h-auto overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          width={800}
        />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
      </div>
      
      <div className="p-8 md:p-12 flex flex-col justify-center">
        <div className="mb-4">
          <span className="text-accent-gold font-paragraph text-xs font-bold tracking-widest uppercase">Accommodation</span>
        </div>
        <h3 className="font-heading text-3xl text-primary mb-4">{room.name}</h3>
        <p className="font-paragraph text-foreground/70 mb-8 leading-relaxed">
          {room.description}
        </p>
        <div className="mt-auto">
          <Link to="/rooms">
            <Button variant="ghost" className="p-0 h-auto font-paragraph font-semibold text-primary hover:text-accent-gold hover:bg-transparent group-hover:translate-x-2 transition-all duration-300">
              View Details <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}