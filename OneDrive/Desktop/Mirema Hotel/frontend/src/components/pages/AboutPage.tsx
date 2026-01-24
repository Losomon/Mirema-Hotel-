import { motion } from 'framer-motion';
import { MapPin, DollarSign, Users, Home, Briefcase, Shield } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const reasons = [
    {
      icon: MapPin,
      title: 'Strategic Location',
      description: 'Conveniently located along Mirema Drive, off Kamiti Road in Kasarani, Nairobi',
    },
    {
      icon: DollarSign,
      title: 'Affordable Rates',
      description: 'Competitive pricing without compromising on quality and comfort',
    },
    {
      icon: Users,
      title: 'Friendly Staff',
      description: 'Warm, professional service from our dedicated team available 24/7',
    },
    {
      icon: Home,
      title: 'Clean & Spacious Rooms',
      description: 'Well-maintained accommodations with modern amenities and ample space',
    },
    {
      icon: Briefcase,
      title: 'Ideal for Business & Leisure',
      description: 'Perfect for both corporate travelers and families seeking relaxation',
    },
    {
      icon: Shield,
      title: 'Secure Environment',
      description: 'Round-the-clock security ensuring your safety and peace of mind',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/6f7c4d_8f866393746d410e991cecf6a686adca~mv2.png?originWidth=1920&originHeight=704"
            alt="About Mirema Hotel"
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
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl text-primary-foreground/90 max-w-2xl mx-auto"
          >
            Your trusted partner for comfortable stays in Nairobi
          </motion.p>
        </div>
      </section>

      {/* About Content */}
      <section className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-8">
              Our Story
            </h2>
            <div className="space-y-6">
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                Mirema Hotel & Service Apartments is a mid-range hotel located along Mirema Drive off Kamiti Road in Nairobi. We are dedicated to offering our guests comfort, convenience, and quality service in a quiet and secure environment.
              </p>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                Since our establishment, we have been committed to providing exceptional hospitality to both business and leisure travelers. Our strategic location, combined with our modern amenities and personalized service, makes us the ideal choice for anyone seeking a peaceful retreat in the heart of Nairobi.
              </p>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                Whether you're visiting for a short business trip or planning an extended stay, our team is dedicated to ensuring your experience with us is comfortable, memorable, and exceeds your expectations.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px]"
          >
            <Image
              src="https://static.wixstatic.com/media/6f7c4d_74edcd1f2c8147cdb3bca6625096ff66~mv2.png?originWidth=768&originHeight=576"
              alt="Hotel building"
              className="w-full h-full object-cover rounded-lg"
              width={800}
            />
          </motion.div>
        </div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
            Why Choose Us
          </h2>
          <p className="font-paragraph text-lg text-foreground/80 max-w-3xl mx-auto">
            Discover what makes Mirema Hotel & Service Apartments the preferred choice for travelers in Nairobi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-8"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <reason.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-4">{reason.title}</h3>
              <p className="font-paragraph text-base text-foreground/80 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-primary/5 py-24">
        <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-8">
              Our Mission
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 leading-relaxed">
              To provide exceptional hospitality services that exceed our guests' expectations through comfortable accommodations, personalized service, and a commitment to creating a home away from home for every visitor to Nairobi.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
