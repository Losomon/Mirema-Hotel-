import { motion } from 'framer-motion';
import {
  Clock,
  UtensilsCrossed,
  Shirt,
  Car,
  Shield,
  Wifi,
  Users,
  Trees,
  Plane,
} from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ServicesPage() {
  const services = [
    {
      icon: Clock,
      title: '24-Hour Front Desk',
      description: 'Our reception team is available around the clock to assist with any needs or inquiries',
    },
    {
      icon: UtensilsCrossed,
      title: 'Room Service',
      description: 'Enjoy delicious meals delivered directly to your room at your convenience',
    },
    {
      icon: Shirt,
      title: 'Laundry Services',
      description: 'Professional laundry and dry cleaning services available for all guests',
    },
    {
      icon: Car,
      title: 'Free Parking',
      description: 'Complimentary secure parking space for all our guests',
    },
    {
      icon: Shield,
      title: 'Security Services',
      description: '24/7 security personnel ensuring your safety and peace of mind',
    },
  ];

  const amenities = [
    {
      icon: Wifi,
      title: 'Free Wi-Fi',
      description: 'High-speed internet access throughout the property',
    },
    {
      icon: UtensilsCrossed,
      title: 'Restaurant',
      description: 'On-site dining with a variety of local and international cuisine',
    },
    {
      icon: Users,
      title: 'Conference / Meeting Rooms',
      description: 'Professional spaces equipped for business meetings and events',
    },
    {
      icon: Trees,
      title: 'Garden / Outdoor Sitting Area',
      description: 'Peaceful outdoor spaces perfect for relaxation',
    },
    {
      icon: Plane,
      title: 'Airport Transfer',
      description: 'Convenient airport pickup and drop-off services available on request',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/6f7c4d_f2b6cf3cee504f06aee0561a86090203~mv2.png?originWidth=1920&originHeight=704"
            alt="Hotel services"
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
            Services & Amenities
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl text-primary-foreground/90 max-w-2xl mx-auto"
          >
            Everything you need for a comfortable and convenient stay
          </motion.p>
        </div>
      </section>

      {/* Hotel Services */}
      <section className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
            Hotel Services
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
            Comprehensive services designed to make your stay effortless and enjoyable
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4">{service.title}</h3>
              <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Amenities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
            Amenities
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
            Modern facilities and features to enhance your experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg"
            >
              <div className="w-16 h-16 rounded-full bg-accent-gold/20 flex items-center justify-center mb-6">
                <amenity.icon className="w-8 h-8 text-accent-gold" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4">{amenity.title}</h3>
              <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                {amenity.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Image Section */}
      <section className="bg-primary/5 py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px]"
            >
              <Image
                src="https://static.wixstatic.com/media/6f7c4d_97ab925abac842c390e2b3146000f293~mv2.png?originWidth=768&originHeight=448"
                alt="Hotel facilities"
                className="w-full h-full object-cover rounded-lg"
                width={800}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-8">
                Experience Comfort & Convenience
              </h2>
              <p className="font-paragraph text-lg text-foreground/80 mb-6 leading-relaxed">
                At Mirema Hotel & Service Apartments, we've thoughtfully designed every aspect of our property to ensure your stay is as comfortable and convenient as possible.
              </p>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                From our modern amenities to our attentive service, every detail is crafted with your comfort in mind. Whether you're here for business or leisure, we're committed to making your stay exceptional.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
