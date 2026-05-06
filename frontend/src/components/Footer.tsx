import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

function SocialGlyph({ letter, label }: { letter: string; label: string }) {
  return (
    <span
      aria-label={label}
      className="w-5 h-5 inline-flex items-center justify-center text-xs font-semibold"
    >
      {letter}
    </span>
  );
}

export default function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms & Apartments', path: '/rooms' },
    { name: 'About Us', path: '/about' },
    { name: 'Services & Amenities', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Location & Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="font-heading text-2xl mb-6">Mirema Hotel</h3>
            <p className="font-paragraph text-sm text-primary-foreground/80 leading-relaxed">
              Comfortable accommodation with modern amenities in the heart of Nairobi. Your home away from home.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-primary-foreground/80 hover:text-accent-gold transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-xl mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent-gold flex-shrink-0 mt-1" />
                <span className="font-paragraph text-sm text-primary-foreground/80">
                  Mirema Drive, Off Kamiti Road<br />
                  Kasarani, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent-gold flex-shrink-0" />
                <span className="font-paragraph text-sm text-primary-foreground/80">
                  +254 XXX XXX XXX
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent-gold flex-shrink-0" />
                <span className="font-paragraph text-sm text-primary-foreground/80">
                  info@miremahotel.co.ke
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-heading text-xl mb-6">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent-gold flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <SocialGlyph letter="F" label="Facebook" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent-gold flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <SocialGlyph letter="I" label="Instagram" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent-gold flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <SocialGlyph letter="T" label="Twitter" />
              </a>
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="border-t border-primary-foreground/20 pt-8 mb-8">
          <p className="font-paragraph text-sm text-accent-gold text-center">
            ⚠️ This is a demo website concept created for presentation purposes.
          </p>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="font-paragraph text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} Mirema Hotel & Service Apartments. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

