import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Booking Inquiry Submitted',
      description: 'We will contact you shortly to confirm your booking.',
    });
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      checkIn: '',
      checkOut: '',
      message: '',
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      details: ['Mirema Drive, Off Kamiti Road', 'Kasarani, Nairobi, Kenya'],
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+254 XXX XXX XXX'],
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@miremahotel.co.ke'],
    },
    {
      icon: Clock,
      title: 'Reception Hours',
      details: ['24/7 Available'],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-primary/90" />
        <div className="relative z-10 text-center px-8">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-5xl md:text-6xl text-primary-foreground mb-6"
          >
            Location & Contact
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl text-primary-foreground/90 max-w-2xl mx-auto"
          >
            Get in touch with us for bookings and inquiries
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <info.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-primary mb-4">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="font-paragraph text-base text-foreground/80">
                  {detail}
                </p>
              ))}
            </motion.div>
          ))}
        </div>

        {/* Map and Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl text-primary mb-8">Find Us</h2>
            <div className="w-full h-[500px] bg-primary/5 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8159!2d36.8919!3d-1.2167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwMTMnMDAuMSJTIDM2wrA1Myc1NC45IkU!5e0!3m2!1sen!2ske!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mirema Hotel Location"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-3xl text-primary mb-8">
              Send Booking Inquiry
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="fullName" className="font-paragraph text-base text-foreground mb-2">
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="font-paragraph"
                />
              </div>

              <div>
                <Label htmlFor="email" className="font-paragraph text-base text-foreground mb-2">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="font-paragraph"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="font-paragraph text-base text-foreground mb-2">
                  Phone *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="font-paragraph"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="checkIn" className="font-paragraph text-base text-foreground mb-2">
                    Check-in Date *
                  </Label>
                  <Input
                    id="checkIn"
                    name="checkIn"
                    type="date"
                    required
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="font-paragraph"
                  />
                </div>

                <div>
                  <Label htmlFor="checkOut" className="font-paragraph text-base text-foreground mb-2">
                    Check-out Date *
                  </Label>
                  <Input
                    id="checkOut"
                    name="checkOut"
                    type="date"
                    required
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="font-paragraph"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="font-paragraph text-base text-foreground mb-2">
                  Message
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any special requests or questions?"
                  className="font-paragraph"
                />
              </div>

              <Button
                type="submit"
                className="bg-accent-gold hover:bg-accent-gold/90 text-dark-gray-text font-paragraph font-semibold w-full py-6 h-auto"
              >
                Submit Inquiry
              </Button>

              <p className="font-paragraph text-sm text-foreground/60 text-center">
                📌 Note: Booking requests will be confirmed via phone or email.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
