import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Bed } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BookingPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    roomType: '',
    guests: '',
    name: '',
    email: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Booking Request Submitted',
      description: 'We will contact you shortly to confirm your reservation.',
    });
    setFormData({
      checkIn: '',
      checkOut: '',
      roomType: '',
      guests: '',
      name: '',
      email: '',
      phone: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const roomTypes = [
    'Standard Room',
    'Deluxe Room',
    'One-Bedroom Serviced Apartment',
  ];

  const guestOptions = ['1 Guest', '2 Guests', '3 Guests', '4+ Guests'];

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
            Book Your Stay
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl text-primary-foreground/90 max-w-2xl mx-auto"
          >
            Reserve your comfortable accommodation at Mirema Hotel
          </motion.p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        <div className="max-w-4xl mx-auto">
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-primary mb-2">Flexible Dates</h3>
              <p className="font-paragraph text-sm text-foreground/70">
                Choose your preferred check-in and check-out dates
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-lg text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Bed className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-primary mb-2">Room Options</h3>
              <p className="font-paragraph text-sm text-foreground/70">
                Select from our range of comfortable accommodations
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-lg text-center"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl text-primary mb-2">Quick Confirmation</h3>
              <p className="font-paragraph text-sm text-foreground/70">
                We'll confirm your booking via phone or email
              </p>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-12 rounded-lg"
          >
            <h2 className="font-heading text-3xl text-primary mb-8 text-center">
              Booking Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dates */}
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

              {/* Room Type and Guests */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="roomType" className="font-paragraph text-base text-foreground mb-2">
                    Room Type *
                  </Label>
                  <Select
                    required
                    value={formData.roomType}
                    onValueChange={(value) => handleSelectChange('roomType', value)}
                  >
                    <SelectTrigger className="font-paragraph">
                      <SelectValue placeholder="Select room type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((type) => (
                        <SelectItem key={type} value={type} className="font-paragraph">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="guests" className="font-paragraph text-base text-foreground mb-2">
                    Number of Guests *
                  </Label>
                  <Select
                    required
                    value={formData.guests}
                    onValueChange={(value) => handleSelectChange('guests', value)}
                  >
                    <SelectTrigger className="font-paragraph">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {guestOptions.map((option) => (
                        <SelectItem key={option} value={option} className="font-paragraph">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Personal Information */}
              <div className="border-t border-primary/10 pt-8 mt-8">
                <h3 className="font-heading text-2xl text-primary mb-6">
                  Contact Information
                </h3>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="font-paragraph text-base text-foreground mb-2">
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="font-paragraph"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-paragraph text-base text-foreground mb-2">
                      Email Address *
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
                      Phone Number *
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
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="bg-accent-gold hover:bg-accent-gold/90 text-dark-gray-text font-paragraph font-semibold w-full py-6 h-auto text-lg"
                >
                  Submit Booking Request
                </Button>
              </div>

              {/* Note */}
              <div className="bg-accent-gold/10 p-6 rounded-lg">
                <p className="font-paragraph text-sm text-foreground/70 text-center">
                  📌 Note: Booking requests will be confirmed via phone or email. Our team will contact you within 24 hours to finalize your reservation.
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
