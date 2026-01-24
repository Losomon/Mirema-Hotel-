import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wifi, Tv, Coffee, Wind, Bed, Users, Home as HomeIcon, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RoomsPage() {
  const [expandedRoom, setExpandedRoom] = useState<number | null>(null);

  const rooms = [
    {
      id: 1,
      name: 'Standard Room',
      description: 'Comfortable queen bed with modern amenities for a relaxing stay',
      image: 'https://static.wixstatic.com/media/6f7c4d_d781258a996a438caef4a9ce79547dc7~mv2.png?originWidth=768&originHeight=448',
      amenities: [
        { icon: Bed, text: 'Comfortable queen bed' },
        { icon: Wifi, text: 'Free Wi-Fi' },
        { icon: Tv, text: 'Flat-screen TV' },
        { icon: Wind, text: 'Air conditioning' },
        { icon: Coffee, text: 'Daily housekeeping' },
      ],
      details: 'Our Standard Rooms offer a perfect blend of comfort and functionality. Each room features a comfortable queen-sized bed with premium linens, an en-suite bathroom with modern fixtures, and all the essential amenities you need for a pleasant stay.',
    },
    {
      id: 2,
      name: 'Deluxe Room',
      description: 'Spacious accommodation with premium features and stunning city views',
      image: 'https://static.wixstatic.com/media/6f7c4d_2e9b41262f09471f9f69893e3a85f798~mv2.png?originWidth=768&originHeight=448',
      amenities: [
        { icon: Bed, text: 'King-size bed' },
        { icon: Wifi, text: 'Free Wi-Fi' },
        { icon: Tv, text: 'Smart TV' },
        { icon: Wind, text: 'Air conditioning' },
        { icon: Users, text: 'Work desk' },
        { icon: Utensils, text: 'Room service' },
      ],
      details: 'Experience enhanced comfort in our Deluxe Rooms. These spacious accommodations feature a king-size bed, a dedicated work area, and a private balcony with city views. Perfect for business travelers or those seeking extra space and luxury.',
    },
    {
      id: 3,
      name: 'One-Bedroom Serviced Apartment',
      description: 'Fully furnished apartments perfect for extended stays',
      image: 'https://static.wixstatic.com/media/6f7c4d_5435702930414748942c0aa49bf0a180~mv2.png?originWidth=768&originHeight=448',
      amenities: [
        { icon: HomeIcon, text: 'Fully furnished' },
        { icon: Utensils, text: 'Kitchenette' },
        { icon: Users, text: 'Living area' },
        { icon: Wifi, text: 'Free Wi-Fi' },
        { icon: Tv, text: 'Smart TV' },
        { icon: Coffee, text: 'Weekly cleaning' },
      ],
      details: 'Our One-Bedroom Serviced Apartments are ideal for extended stays. Each apartment includes a separate bedroom, a comfortable living area, and a fully equipped kitchenette. Enjoy the convenience of home with hotel-quality service and amenities.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/6f7c4d_7f918940de8f49b084145eefe6ce724d~mv2.png?originWidth=1920&originHeight=704"
            alt="Hotel rooms"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="relative z-10 text-center px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl md:text-6xl text-primary-foreground mb-6"
          >
            Rooms & Apartments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl text-primary-foreground/90 max-w-2xl mx-auto"
          >
            Choose from our selection of comfortable rooms and fully serviced apartments
          </motion.p>
        </div>
      </section>

      {/* Rooms List */}
      <section className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="space-y-16">
          {rooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Image */}
                <div className="relative h-96 lg:h-auto">
                  <Image
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover"
                    width={800}
                  />
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h2 className="font-heading text-3xl md:text-4xl text-primary mb-4">
                    {room.name}
                  </h2>
                  <p className="font-paragraph text-lg text-foreground/80 mb-6">
                    {room.description}
                  </p>

                  {/* Amenities */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {room.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <amenity.icon className="w-5 h-5 text-accent-gold flex-shrink-0" />
                        <span className="font-paragraph text-sm text-foreground/70">
                          {amenity.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Expandable Details */}
                  {expandedRoom === room.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6"
                    >
                      <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                        {room.details}
                      </p>
                    </motion.div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => setExpandedRoom(expandedRoom === room.id ? null : room.id)}
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-paragraph font-semibold"
                    >
                      {expandedRoom === room.id ? 'Hide Details' : 'View Details'}
                    </Button>
                    <Link to="/booking" className="flex-1">
                      <Button className="bg-accent-gold hover:bg-accent-gold/90 text-dark-gray-text font-paragraph font-semibold w-full">
                        Book Now
                      </Button>
                    </Link>
                    <Link to="/contact">
                      <Button
                        variant="outline"
                        className="border-2 border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-dark-gray-text font-paragraph font-semibold"
                      >
                        Inquire
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
