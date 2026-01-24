import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'What are the check-in and check-out times?',
    answer: 'Check-in time is from 2:00 PM onwards, and check-out time is by 11:00 AM. Early check-in or late check-out can be arranged subject to availability. Please contact our reception for special requests.'
  },
  {
    question: 'Do you offer airport transfer services?',
    answer: 'Yes, we provide airport transfer services to and from Jomo Kenyatta International Airport (JKIA) and Wilson Airport. Please inform us of your flight details at least 24 hours in advance, and we will arrange a comfortable transfer for you at competitive rates.'
  },
  {
    question: 'Is parking available at the hotel?',
    answer: 'Yes, we offer complimentary secure parking for all our guests. The parking area is monitored 24/7 for your peace of mind.'
  },
  {
    question: 'What amenities are included in the rooms?',
    answer: 'All our rooms and apartments include free high-speed Wi-Fi, flat-screen TV with satellite channels, air conditioning, en-suite bathroom with hot water, tea/coffee making facilities, and a work desk. Service apartments also include a fully equipped kitchenette.'
  },
  {
    question: 'Do you have a restaurant on-site?',
    answer: 'Yes, we have an on-site restaurant serving breakfast, lunch, and dinner with a variety of local and international cuisine. We also offer room service for your convenience.'
  },
  {
    question: 'Are pets allowed at the hotel?',
    answer: 'Unfortunately, we do not allow pets at our property, with the exception of certified service animals. Please contact us in advance if you require accommodation for a service animal.'
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Cancellations made 48 hours or more before check-in are fully refundable. Cancellations made within 48 hours of check-in will incur a charge of one night\'s accommodation. No-shows will be charged the full reservation amount.'
  },
  {
    question: 'Do you offer long-term stay discounts?',
    answer: 'Yes, we offer attractive rates for extended stays of 7 nights or more. Our serviced apartments are ideal for long-term guests. Please contact our reservations team for customized long-term stay packages.'
  },
  {
    question: 'Is Wi-Fi available throughout the property?',
    answer: 'Yes, complimentary high-speed Wi-Fi is available in all rooms, apartments, and public areas including the restaurant and conference facilities.'
  },
  {
    question: 'Do you have conference or meeting facilities?',
    answer: 'Yes, we have well-equipped conference facilities suitable for meetings, workshops, and small events. Our team can assist with setup, catering, and audio-visual equipment. Please contact us for availability and rates.'
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function FAQSection() {
  return (
    <section className="w-full py-24 bg-light-gray-background">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-accent-gold" />
            <span className="text-accent-gold font-paragraph text-sm font-bold tracking-widest uppercase">
              Have Questions?
            </span>
          </div>
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-paragraph text-foreground/70 text-lg max-w-2xl mx-auto">
            Find answers to common questions about your stay at Mirema Hotel
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeInUp}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white border border-primary/10 px-6 rounded-none"
              >
                <AccordionTrigger className="font-paragraph font-semibold text-left text-primary hover:text-accent-gold hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-paragraph text-foreground/80 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mt-12"
        >
          <p className="font-paragraph text-foreground/70 mb-4">
            Still have questions? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-primary font-paragraph font-semibold border-b-2 border-primary pb-1 hover:text-accent-gold hover:border-accent-gold transition-colors duration-300"
          >
            Contact Our Team
          </a>
        </motion.div>
      </div>
    </section>
  );
}
