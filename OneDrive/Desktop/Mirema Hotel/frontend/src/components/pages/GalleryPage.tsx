import { useState } from 'react';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'rooms', name: 'Rooms' },
    { id: 'apartments', name: 'Apartments' },
    { id: 'restaurant', name: 'Restaurant' },
    { id: 'exterior', name: 'Exterior' },
    { id: 'garden', name: 'Garden & Events' },
  ];

  const galleryImages = [
    {
      id: 1,
      category: 'rooms',
      title: 'Standard Room',
      image: 'https://static.wixstatic.com/media/6f7c4d_c35b42f7f1064f4e8895c87a6122c1a4~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 2,
      category: 'rooms',
      title: 'Deluxe Room',
      image: 'https://static.wixstatic.com/media/6f7c4d_a70504333ff845bbb435e14076fea4b7~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 3,
      category: 'rooms',
      title: 'Room Interior',
      image: 'https://static.wixstatic.com/media/6f7c4d_b1c86686d21642b1941e98d7942742a9~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 4,
      category: 'apartments',
      title: 'One-Bedroom Apartment',
      image: 'https://static.wixstatic.com/media/6f7c4d_7ffe20945c0148f9a2d3c4d91da78729~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 5,
      category: 'apartments',
      title: 'Apartment Living Area',
      image: 'https://static.wixstatic.com/media/6f7c4d_1c1b63d7c92d40d5803674f9b459aa1f~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 6,
      category: 'apartments',
      title: 'Apartment Kitchenette',
      image: 'https://static.wixstatic.com/media/6f7c4d_7595fdefcbdb45a78af5e5c24f183832~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 7,
      category: 'restaurant',
      title: 'Restaurant Dining Area',
      image: 'https://static.wixstatic.com/media/6f7c4d_16579c6c118142bc969cf67a75eab8a0~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 8,
      category: 'restaurant',
      title: 'Restaurant Interior',
      image: 'https://static.wixstatic.com/media/6f7c4d_dfa8f843fc2f4511a4faa942cf2bb46b~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 9,
      category: 'restaurant',
      title: 'Dining Experience',
      image: 'https://static.wixstatic.com/media/6f7c4d_c6ffacaac6504cc2ae97288edea88b96~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 10,
      category: 'exterior',
      title: 'Hotel Exterior',
      image: 'https://static.wixstatic.com/media/6f7c4d_408db1459c5d451e86ff108751136f35~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 11,
      category: 'exterior',
      title: 'Building Facade',
      image: 'https://static.wixstatic.com/media/6f7c4d_be817e9cac9b49e2a86f0d8f4d36a98e~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 12,
      category: 'exterior',
      title: 'Entrance',
      image: 'https://static.wixstatic.com/media/6f7c4d_643c3b42aff743f9bb910e7978ca54f0~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 13,
      category: 'garden',
      title: 'Garden Area',
      image: 'https://static.wixstatic.com/media/6f7c4d_058f74f718ce4844a0c1ada12949be0a~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 14,
      category: 'garden',
      title: 'Outdoor Seating',
      image: 'https://static.wixstatic.com/media/6f7c4d_7ce5884da1e0491ab5ee91473ae660ae~mv2.png?originWidth=576&originHeight=384',
    },
    {
      id: 15,
      category: 'garden',
      title: 'Event Space',
      image: 'https://static.wixstatic.com/media/6f7c4d_c4b5476c182b410fb92fe02baa50ea28~mv2.png?originWidth=576&originHeight=384',
    },
  ];

  const filteredImages =
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/6f7c4d_89e1903fcbe343f4a4ac7fa156a841a4~mv2.png?originWidth=1920&originHeight=704"
            alt="Gallery"
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
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl text-primary-foreground/90 max-w-2xl mx-auto"
          >
            Explore our beautiful spaces and accommodations
          </motion.p>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-24">
        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? 'default' : 'outline'}
              className={
                activeCategory === category.id
                  ? 'bg-accent-gold hover:bg-accent-gold/90 text-dark-gray-text font-paragraph font-semibold'
                  : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-paragraph font-semibold'
              }
            >
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid - Masonry Style */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="break-inside-avoid group relative overflow-hidden rounded-lg"
            >
              <Image
                src={image.image}
                alt={image.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110"
                width={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h3 className="font-heading text-2xl text-primary-foreground">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Demo Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16 p-8 bg-accent-gold/10 rounded-lg"
        >
          <p className="font-paragraph text-base text-foreground/70">
            📌 Images are for demonstration purposes only.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
