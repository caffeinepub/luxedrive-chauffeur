import { Toaster } from "@/components/ui/sonner";
import {
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Crown,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Map as MapIcon,
  MapPin,
  Menu,
  Phone,
  Plane,
  Star,
  Twitter,
  Users,
  Wine,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

// ── Schema.org injection ──────────────────────────────────────────────────────
const SchemaOrg = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "LuxeDrive Chauffeur Services",
      telephone: "+1-555-123-4567",
      description:
        "Premium luxury chauffeur and limousine services including airport transfers, corporate travel, and special events.",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "350 Fifth Avenue, Suite 4200",
        addressLocality: "New York",
        addressRegion: "NY",
        postalCode: "10118",
        addressCountry: "US",
      },
      openingHours: "Mo-Su 00:00-24:00",
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return null;
};

// ── Reusable buttons ─────────────────────────────────────────────────────────
const GoldBtn = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
  "data-ocid": dataOcid,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  "data-ocid"?: string;
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    data-ocid={dataOcid}
    className={`inline-flex items-center justify-center gap-2 bg-[#C9A24A] hover:bg-[#B58B34] text-[#111214] font-semibold uppercase tracking-widest text-xs px-6 py-3 rounded-[10px] transition-all duration-200 shadow-[0_4px_24px_rgba(201,162,74,0.25)] hover:shadow-[0_6px_32px_rgba(201,162,74,0.4)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    {children}
  </button>
);

const OutlineBtn = ({
  children,
  onClick,
  className = "",
  "data-ocid": dataOcid,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  "data-ocid"?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    data-ocid={dataOcid}
    className={`inline-flex items-center justify-center gap-2 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-[#111214] font-semibold uppercase tracking-widest text-xs px-6 py-3 rounded-[10px] transition-all duration-200 ${className}`}
  >
    {children}
  </button>
);

const Eyebrow = ({ text }: { text: string }) => (
  <p className="uppercase text-[#C9A24A] tracking-[0.2em] text-xs font-semibold mb-3">
    {text}
  </p>
);

const Stars = ({ count = 5 }: { count?: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].slice(0, count).map((n) => (
      <Star key={n} className="w-4 h-4 fill-[#C9A24A] text-[#C9A24A]" />
    ))}
  </div>
);

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cookieDismissed, setCookieDismissed] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const { actor } = useActor();
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    pickupLocation: "",
    destination: "",
    date: "",
    time: "",
    vehiclePreference: "",
    passengers: "1",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const navLinks = [
    { label: "HOME", href: "#home" },
    { label: "SERVICES", href: "#services" },
    { label: "FLEET", href: "#fleet" },
    { label: "BOOKINGS", href: "#bookings" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      if (!actor) throw new Error("Service unavailable");
      await actor.createBooking({
        name: form.name,
        email: form.email,
        phone: form.phone,
        pickupLocation: form.pickupLocation,
        destination: form.destination,
        date: form.date,
        time: form.time,
        vehiclePreference: form.vehiclePreference,
        passengers: BigInt(form.passengers || "1"),
        specialRequests: form.specialRequests,
      });
      setBookingSuccess(true);
      toast.success("Booking request received! We'll confirm shortly.");
      setForm({
        pickupLocation: "",
        destination: "",
        date: "",
        time: "",
        vehiclePreference: "",
        passengers: "1",
        name: "",
        email: "",
        phone: "",
        specialRequests: "",
      });
    } catch {
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0F1014", fontFamily: "'Inter', sans-serif" }}
    >
      <SchemaOrg />
      <Toaster position="top-right" />

      {/* ── Top Utility Bar */}
      <div className="bg-[#111214] border-b border-[#2A2D33] hidden sm:block">
        <div className="max-w-[1240px] mx-auto px-6 py-2 flex items-center justify-end gap-6">
          <a
            href="tel:+15551234567"
            className="flex items-center gap-2 text-[#B7BCC5] hover:text-[#C9A24A] transition-colors text-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#C9A24A]" />
            Call Us: +1 (555) 123-4567
          </a>
        </div>
      </div>

      {/* ── Sticky Header */}
      <header
        id="home"
        className={`sticky top-0 z-50 bg-[#111214] border-b border-[#2A2D33] transition-shadow duration-300 ${
          scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.5)]" : ""
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-[#C9A24A]/10 border border-[#C9A24A]/30 flex items-center justify-center">
              <Crown className="w-5 h-5 text-[#C9A24A]" />
            </div>
            <div>
              <div
                className="text-white font-bold text-xl tracking-wider"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                LuxeDrive
              </div>
              <div className="text-[#C9A24A] text-[10px] uppercase tracking-[0.18em] font-medium">
                Premium Chauffeur Services
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[#B7BCC5] hover:text-[#C9A24A] text-xs font-medium uppercase tracking-[0.15em] transition-colors"
                data-ocid="nav.link"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+15551234567"
              className="flex items-center gap-1.5 text-[#B7BCC5] hover:text-[#C9A24A] text-xs transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +1 (555) 123-4567
            </a>
            <GoldBtn
              onClick={() => scrollTo("#bookings")}
              data-ocid="header.primary_button"
            >
              BOOK NOW
            </GoldBtn>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden text-white p-2"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#111214] border-t border-[#2A2D33] px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#B7BCC5] hover:text-[#C9A24A] text-sm font-medium uppercase tracking-wider transition-colors py-2 border-b border-[#2A2D33]"
              >
                {l.label}
              </a>
            ))}
            <GoldBtn
              onClick={() => scrollTo("#bookings")}
              className="w-full mt-2"
            >
              BOOK NOW
            </GoldBtn>
          </div>
        )}
      </header>

      {/* ── Hero Section */}
      <section
        className="relative min-h-[92vh] flex items-center"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-car-night.dim_1920x1080.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F1014]/90 via-[#0F1014]/70 to-[#0F1014]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1014]/20 via-transparent to-[#0F1014]/80" />
        <div className="relative z-10 max-w-[1240px] mx-auto px-6 py-24">
          <div className="max-w-xl">
            <Eyebrow text="Premium Chauffeur Services" />
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Arrive in Style.
              <br />
              <span className="text-[#C9A24A]">Travel in Luxury.</span>
            </h1>
            <p className="text-[#B7BCC5] text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Experience world-class chauffeur services tailored for the
              discerning traveler. Airport transfers, corporate travel, special
              events — flawlessly executed.
            </p>
            <div className="flex flex-wrap gap-4">
              <GoldBtn
                onClick={() => scrollTo("#bookings")}
                data-ocid="hero.primary_button"
                className="px-8 py-4 text-sm"
              >
                BOOK NOW
              </GoldBtn>
              <OutlineBtn
                onClick={() => scrollTo("#fleet")}
                data-ocid="hero.secondary_button"
                className="px-8 py-4 text-sm"
              >
                VIEW FLEET
              </OutlineBtn>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-10 bg-gradient-to-b from-[#C9A24A] to-transparent" />
        </div>
      </section>

      {/* ── Booking Form Module */}
      <section id="bookings" className="relative z-20">
        <div className="max-w-[1240px] mx-auto px-6">
          <div
            className="-mt-12 rounded-2xl border border-[#2A2D33] shadow-[0_16px_64px_rgba(0,0,0,0.6)]"
            style={{
              backgroundColor: "rgba(26, 28, 31, 0.97)",
              backdropFilter: "blur(16px)",
            }}
          >
            <div className="p-6 md:p-8 border-b border-[#2A2D33]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#C9A24A]" />
                <Eyebrow text="Reserve Your Luxury Ride" />
              </div>
              <h2
                className="text-2xl font-bold text-white mt-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Book Your Journey
              </h2>
            </div>

            {bookingSuccess ? (
              <div
                className="p-8 md:p-12 flex flex-col items-center text-center"
                data-ocid="bookings.success_state"
              >
                <CheckCircle className="w-16 h-16 text-[#C9A24A] mb-4" />
                <h3
                  className="text-2xl font-bold text-white mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Booking Request Received!
                </h3>
                <p className="text-[#B7BCC5] mb-6">
                  Our team will contact you shortly to confirm your reservation.
                </p>
                <GoldBtn onClick={() => setBookingSuccess(false)}>
                  MAKE ANOTHER BOOKING
                </GoldBtn>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="p-6 md:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="pickupLocation"
                      className="text-[#B7BCC5] text-xs uppercase tracking-wider font-medium"
                    >
                      Pickup Location *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A24A]" />
                      <input
                        id="pickupLocation"
                        name="pickupLocation"
                        value={form.pickupLocation}
                        onChange={handleFormChange}
                        required
                        placeholder="Enter pickup address"
                        className="w-full bg-white text-[#111214] placeholder:text-gray-400 pl-10 pr-4 py-3 rounded-[10px] text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                        data-ocid="bookings.input"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="destination"
                      className="text-[#B7BCC5] text-xs uppercase tracking-wider font-medium"
                    >
                      Destination *
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A24A]" />
                      <input
                        id="destination"
                        name="destination"
                        value={form.destination}
                        onChange={handleFormChange}
                        required
                        placeholder="Enter destination"
                        className="w-full bg-white text-[#111214] placeholder:text-gray-400 pl-10 pr-4 py-3 rounded-[10px] text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="date"
                      className="text-[#B7BCC5] text-xs uppercase tracking-wider font-medium"
                    >
                      Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A24A]" />
                      <input
                        id="date"
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-white text-[#111214] pl-10 pr-4 py-3 rounded-[10px] text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="time"
                      className="text-[#B7BCC5] text-xs uppercase tracking-wider font-medium"
                    >
                      Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A24A]" />
                      <input
                        id="time"
                        name="time"
                        type="time"
                        value={form.time}
                        onChange={handleFormChange}
                        required
                        className="w-full bg-white text-[#111214] pl-10 pr-4 py-3 rounded-[10px] text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="vehiclePreference"
                      className="text-[#B7BCC5] text-xs uppercase tracking-wider font-medium"
                    >
                      Vehicle Type
                    </label>
                    <select
                      id="vehiclePreference"
                      name="vehiclePreference"
                      value={form.vehiclePreference}
                      onChange={handleFormChange}
                      className="w-full bg-white text-[#111214] px-4 py-3 rounded-[10px] text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                      data-ocid="bookings.select"
                    >
                      <option value="">Any Vehicle</option>
                      <option value="Mercedes S-Class">Mercedes S-Class</option>
                      <option value="Mercedes V-Class">Mercedes V-Class</option>
                      <option value="BMW 7 Series">BMW 7 Series</option>
                      <option value="Range Rover">Range Rover</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="passengers"
                      className="text-[#B7BCC5] text-xs uppercase tracking-wider font-medium"
                    >
                      Passengers
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C9A24A]" />
                      <input
                        id="passengers"
                        name="passengers"
                        type="number"
                        min="1"
                        max="10"
                        value={form.passengers}
                        onChange={handleFormChange}
                        className="w-full bg-white text-[#111214] pl-10 pr-4 py-3 rounded-[10px] text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="fullName"
                      className="text-[#B7BCC5] text-xs uppercase tracking-wider font-medium"
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                      placeholder="Your full name"
                      className="w-full bg-white text-[#111214] placeholder:text-gray-400 px-4 py-3 rounded-[10px] text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-[#B7BCC5] text-xs uppercase tracking-wider font-medium"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleFormChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-white text-[#111214] placeholder:text-gray-400 px-4 py-3 rounded-[10px] text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="phone"
                      className="text-[#B7BCC5] text-xs uppercase tracking-wider font-medium"
                    >
                      Phone *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleFormChange}
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white text-[#111214] placeholder:text-gray-400 px-4 py-3 rounded-[10px] text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A24A]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 mb-6">
                  <label
                    htmlFor="specialRequests"
                    className="text-[#B7BCC5] text-xs uppercase tracking-wider font-medium"
                  >
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={form.specialRequests}
                    onChange={handleFormChange}
                    rows={3}
                    placeholder="Child seat, champagne, specific music, etc."
                    className="w-full bg-white text-[#111214] placeholder:text-gray-400 px-4 py-3 rounded-[10px] text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9A24A] resize-none"
                    data-ocid="bookings.textarea"
                  />
                </div>

                <div className="flex justify-end">
                  <GoldBtn
                    type="submit"
                    disabled={bookingLoading}
                    className="px-10 py-4 text-sm"
                    data-ocid="bookings.submit_button"
                  >
                    {bookingLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        PROCESSING...
                      </>
                    ) : (
                      "GET A QUOTE"
                    )}
                  </GoldBtn>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Trust Stats Bar */}
      <section className="py-16 bg-[#111214] border-y border-[#2A2D33] mt-16">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "10+", label: "Years Experience" },
              { value: "50,000+", label: "Rides Completed" },
              { value: "4.9★", label: "Average Rating" },
              { value: "100%", label: "Licensed & Insured" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className="text-4xl font-bold text-[#C9A24A]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {stat.value}
                </div>
                <div className="text-[#B7BCC5] text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services Section */}
      <section id="services" className="py-24 bg-[#0F1014]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center mb-14">
            <Eyebrow text="What We Offer" />
            <h2
              className="text-4xl font-bold text-[#C9A24A] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our Premier Services
            </h2>
            <p className="text-[#B7BCC5] max-w-xl mx-auto">
              From seamless airport transfers to prestigious corporate travel,
              we deliver an unrivaled luxury experience every time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                img: "/assets/generated/service-airport-transfer.dim_600x400.jpg",
                icon: <Plane className="w-6 h-6" />,
                title: "Airport Transfers",
                desc: "Door-to-door luxury airport transfers with flight monitoring and complimentary waiting time.",
              },
              {
                img: "/assets/generated/service-corporate.dim_600x400.jpg",
                icon: <Briefcase className="w-6 h-6" />,
                title: "Corporate Chauffeur",
                desc: "Executive travel solutions for business professionals and corporate events worldwide.",
              },
              {
                img: "/assets/generated/service-events.dim_600x400.jpg",
                icon: <Wine className="w-6 h-6" />,
                title: "Special Events",
                desc: "Make every occasion memorable with our premium event chauffeur services.",
              },
              {
                img: "/assets/generated/service-vip-tour.dim_600x400.jpg",
                icon: <MapIcon className="w-6 h-6" />,
                title: "VIP City Tours",
                desc: "Bespoke private tours of the city in unrivaled comfort and elegance.",
              },
            ].map((svc, i) => (
              <div
                key={svc.title}
                className="group rounded-2xl overflow-hidden border border-[#2A2D33] bg-[#1A1C1F] hover:border-[#C9A24A]/40 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(201,162,74,0.12)] flex flex-col"
                data-ocid={`services.item.${i + 1}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={svc.img}
                    alt={svc.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1F] to-transparent" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="w-10 h-10 rounded-full bg-[#C9A24A]/10 border border-[#C9A24A]/20 flex items-center justify-center text-[#C9A24A] mb-3">
                    {svc.icon}
                  </div>
                  <h3
                    className="text-white font-semibold text-lg mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {svc.title}
                  </h3>
                  <p className="text-[#B7BCC5] text-sm leading-relaxed flex-1">
                    {svc.desc}
                  </p>
                  <button
                    type="button"
                    onClick={() => scrollTo("#bookings")}
                    className="mt-4 flex items-center gap-1.5 text-[#C9A24A] text-xs font-semibold uppercase tracking-wider hover:gap-3 transition-all"
                  >
                    LEARN MORE <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Fleet Section */}
      <section
        id="fleet"
        className="py-24"
        style={{ backgroundColor: "#F3EFE7" }}
      >
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="uppercase text-[#B58B34] tracking-[0.2em] text-xs font-semibold mb-3">
              Our Vehicles
            </p>
            <h2
              className="text-4xl font-bold text-[#1A1C1F] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Exquisite Fleet
            </h2>
            <p className="text-[#5A5A5A] max-w-xl mx-auto text-sm">
              Every vehicle in our fleet is meticulously maintained, offering
              the perfect blend of comfort, safety, and elegance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                img: "/assets/generated/fleet-mercedes-sclass.dim_800x500.jpg",
                model: "Mercedes S-Class",
                specs: ["4 Pax", "4 Bags", "Wi-Fi", "Leather"],
              },
              {
                img: "/assets/generated/fleet-mercedes-vclass.dim_800x500.jpg",
                model: "Mercedes V-Class",
                specs: ["7 Pax", "7 Bags", "Wi-Fi", "TV"],
              },
              {
                img: "/assets/generated/fleet-bmw-7series.dim_800x500.jpg",
                model: "BMW 7 Series",
                specs: ["4 Pax", "4 Bags", "Wi-Fi", "Leather"],
              },
              {
                img: "/assets/generated/fleet-range-rover.dim_800x500.jpg",
                model: "Range Rover",
                specs: ["4 Pax", "3 Bags", "Wi-Fi", "Panoramic"],
              },
            ].map((car, i) => (
              <div
                key={car.model}
                className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgba(201,162,74,0.2)] transition-all duration-300 group"
                data-ocid={`fleet.item.${i + 1}`}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={car.img}
                    alt={car.model}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3
                    className="text-[#1A1C1F] font-bold text-lg mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {car.model}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {car.specs.map((spec) => (
                      <span
                        key={spec}
                        className="bg-[#F3EFE7] text-[#5A5A5A] text-xs px-2.5 py-1 rounded-full border border-[#E0D9CE]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => scrollTo("#bookings")}
                    className="w-full bg-[#C9A24A] hover:bg-[#B58B34] text-[#111214] font-semibold uppercase tracking-widest text-xs py-2.5 rounded-[10px] transition-all duration-200"
                  >
                    SELECT VEHICLE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offers Section */}
      <section className="py-24" style={{ backgroundColor: "#F3EFE7" }}>
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="uppercase text-[#B58B34] tracking-[0.2em] text-xs font-semibold mb-3">
              Exclusive Deals
            </p>
            <h2
              className="text-4xl font-bold text-[#1A1C1F] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Special Offers & Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                badge: "10% OFF",
                title: "Business Class Package",
                desc: "Combine your airport transfers with corporate chauffeur services and save. Perfect for frequent business travelers who demand consistency and excellence.",
                perks: [
                  "Priority dispatch",
                  "Flight tracking included",
                  "Dedicated account manager",
                  "Monthly billing available",
                ],
                cta: "GET QUOTE",
              },
              {
                badge: "COMPLIMENTARY",
                title: "Special Occasions",
                desc: "Celebrate life's finest moments in absolute luxury. Our special occasions package includes complimentary champagne and a dedicated event coordinator.",
                perks: [
                  "Champagne on arrival",
                  "Decorated vehicle",
                  "Red carpet service",
                  "Professional photography",
                ],
                cta: "BOOK NOW",
              },
            ].map((offer, i) => (
              <div
                key={offer.title}
                className="relative bg-white rounded-2xl p-8 shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#E0D9CE] hover:shadow-[0_8px_40px_rgba(201,162,74,0.15)] transition-all duration-300 overflow-hidden"
                data-ocid={`offers.item.${i + 1}`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#C9A24A]/15 to-transparent" />
                <span className="inline-block bg-[#C9A24A] text-[#111214] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                  {offer.badge}
                </span>
                <h3
                  className="text-2xl font-bold text-[#1A1C1F] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {offer.title}
                </h3>
                <p className="text-[#5A5A5A] text-sm leading-relaxed mb-5">
                  {offer.desc}
                </p>
                <ul className="space-y-2 mb-6">
                  {offer.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2 text-[#5A5A5A] text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-[#C9A24A] shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <GoldBtn onClick={() => scrollTo("#bookings")}>
                  {offer.cta}
                </GoldBtn>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials Section */}
      <section className="py-24 bg-[#111214] border-y border-[#2A2D33]">
        <div className="max-w-[1240px] mx-auto px-6">
          <div className="text-center mb-14">
            <Eyebrow text="Client Reviews" />
            <h2
              className="text-4xl font-bold text-[#C9A24A] mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Trusted by Our Clients
            </h2>
            <p className="text-[#B7BCC5] max-w-xl mx-auto text-sm">
              Don’t just take our word for it — hear from the executives,
              celebrities, and discerning travelers who trust LuxeDrive.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                role: "Executive Director",
                initials: "SM",
                review:
                  "Exceptional service from start to finish. The chauffeur was professional, the car immaculate, and I arrived perfectly on time. The attention to detail is unmatched.",
              },
              {
                name: "James R.",
                role: "Groom",
                initials: "JR",
                review:
                  "Used LuxeDrive for our wedding. Absolutely flawless. Every detail was perfect and our guests were amazed. I would not use anyone else for such a special occasion.",
              },
              {
                name: "Elena K.",
                role: "Senior VP, Finance",
                initials: "EK",
                review:
                  "The best corporate transfer service I\u2019ve used. Always on time, always professional. My go-to for all airport transfers. Worth every penny.",
              },
            ].map((t, i) => (
              <div
                key={t.name}
                className="bg-[#1A1C1F] rounded-2xl p-7 border border-[#2A2D33] hover:border-[#C9A24A]/30 transition-all duration-300"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <Stars />
                <p className="text-[#F3F4F6] text-sm leading-relaxed my-5 italic">
                  &ldquo;{t.review}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-[#2A2D33]">
                  <div className="w-10 h-10 rounded-full bg-[#C9A24A]/20 border border-[#C9A24A]/40 flex items-center justify-center text-[#C9A24A] text-sm font-bold">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">
                      {t.name}
                    </div>
                    <div className="text-[#B7BCC5] text-xs">
                      {t.role} &middot;{" "}
                      <span className="text-[#C9A24A]">Verified Client</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner */}
      <section
        id="about"
        className="relative py-24 overflow-hidden"
        style={{ backgroundColor: "#0F1014" }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 30% 50%, rgba(201,162,74,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(201,162,74,0.05) 0%, transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-[1240px] mx-auto px-6 text-center">
          <Eyebrow text="Start Your Journey" />
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ready to Experience Luxury?
          </h2>
          <p className="text-[#B7BCC5] max-w-xl mx-auto mb-8 text-sm leading-relaxed">
            From your first booking to every ride after, LuxeDrive delivers an
            unparalleled chauffeur experience. Available 24/7, 365 days a year.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <GoldBtn
              onClick={() => scrollTo("#bookings")}
              className="px-10 py-4 text-sm"
              data-ocid="cta.primary_button"
            >
              BOOK YOUR RIDE
            </GoldBtn>
            <a
              href="tel:+15551234567"
              className="inline-flex items-center gap-2 border border-[#C9A24A] text-[#C9A24A] hover:bg-[#C9A24A] hover:text-[#111214] font-semibold uppercase tracking-widest text-xs px-10 py-4 rounded-[10px] transition-all duration-200"
            >
              <Phone className="w-4 h-4" />
              CALL US NOW
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer */}
      <footer id="contact" className="bg-[#111214] border-t border-[#2A2D33]">
        <div className="max-w-[1240px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Col 1: Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#C9A24A]/10 border border-[#C9A24A]/30 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-[#C9A24A]" />
                </div>
                <div>
                  <div
                    className="text-white font-bold text-xl tracking-wider"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    LuxeDrive
                  </div>
                  <div className="text-[#C9A24A] text-[9px] uppercase tracking-[0.18em]">
                    Premium Chauffeur Services
                  </div>
                </div>
              </div>
              <p className="text-[#B7BCC5] text-sm leading-relaxed mb-5">
                The pinnacle of luxury ground transportation. Serving discerning
                clients with unrivaled elegance since 2014.
              </p>
              <div className="flex gap-3">
                {(
                  [
                    { Icon: Instagram, label: "Instagram" },
                    { Icon: Facebook, label: "Facebook" },
                    { Icon: Twitter, label: "Twitter" },
                    { Icon: Linkedin, label: "LinkedIn" },
                  ] as const
                ).map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="https://luxedrive.com"
                    aria-label={label}
                    className="w-8 h-8 rounded-full border border-[#2A2D33] flex items-center justify-center text-[#B7BCC5] hover:border-[#C9A24A] hover:text-[#C9A24A] transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div>
              <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-5 pb-3 border-b border-[#2A2D33]">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  "Home",
                  "Services",
                  "Fleet",
                  "Bookings",
                  "About",
                  "Contact",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-[#B7BCC5] hover:text-[#C9A24A] text-sm transition-colors flex items-center gap-2"
                      data-ocid="footer.link"
                    >
                      <ChevronRight className="w-3 h-3 text-[#C9A24A]" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Services */}
            <div>
              <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-5 pb-3 border-b border-[#2A2D33]">
                Our Services
              </h4>
              <ul className="space-y-3">
                {[
                  "Airport Transfers",
                  "Corporate Chauffeur",
                  "Wedding Transport",
                  "VIP City Tours",
                  "Event Chauffeur",
                  "Long Distance Travel",
                ].map((svc) => (
                  <li key={svc}>
                    <a
                      href="#services"
                      className="text-[#B7BCC5] hover:text-[#C9A24A] text-sm transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-3 h-3 text-[#C9A24A]" />
                      {svc}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h4 className="text-white font-semibold uppercase tracking-widest text-xs mb-5 pb-3 border-b border-[#2A2D33]">
                Contact Us
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C9A24A] shrink-0 mt-0.5" />
                  <span className="text-[#B7BCC5] text-sm">
                    350 Fifth Avenue, Suite 4200
                    <br />
                    New York, NY 10118
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#C9A24A] shrink-0" />
                  <a
                    href="tel:+15551234567"
                    className="text-[#B7BCC5] hover:text-[#C9A24A] text-sm transition-colors"
                  >
                    +1 (555) 123-4567
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-[#C9A24A] shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:info@luxedrive.com"
                    className="text-[#B7BCC5] hover:text-[#C9A24A] text-sm transition-colors"
                  >
                    info@luxedrive.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C9A24A] shrink-0 mt-0.5" />
                  <div className="text-[#B7BCC5] text-sm">
                    <div className="font-medium text-white">Available 24/7</div>
                    <div>Monday – Sunday</div>
                    <div>All year round</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#2A2D33]">
          <div className="max-w-[1240px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[#B7BCC5] text-xs">
              &copy; {new Date().getFullYear()} LuxeDrive. All rights reserved.
            </p>
            <p className="text-[#B7BCC5] text-xs">
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9A24A] hover:underline"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex gap-4">
              <a
                href="#contact"
                className="text-[#B7BCC5] hover:text-[#C9A24A] text-xs transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#contact"
                className="text-[#B7BCC5] hover:text-[#C9A24A] text-xs transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#contact"
                className="text-[#B7BCC5] hover:text-[#C9A24A] text-xs transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Cookie Banner */}
      {!cookieDismissed && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 bg-[#111214] border-t border-[#2A2D33] px-6 py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.4)]"
          data-ocid="cookie.modal"
        >
          <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#B7BCC5] text-sm">
              🍪 This site uses cookies to enhance your experience and for
              analytics. View our{" "}
              <a href="#contact" className="text-[#C9A24A] hover:underline">
                Cookie Policy
              </a>{" "}
              and{" "}
              <a href="#contact" className="text-[#C9A24A] hover:underline">
                Privacy Policy
              </a>
              .
            </p>
            <div className="flex gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setCookieDismissed(true)}
                className="border border-[#2A2D33] text-[#B7BCC5] hover:border-[#C9A24A] hover:text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-[8px] transition-all"
                data-ocid="cookie.cancel_button"
              >
                DECLINE
              </button>
              <GoldBtn
                onClick={() => setCookieDismissed(true)}
                className="py-2"
                data-ocid="cookie.confirm_button"
              >
                ACCEPT
              </GoldBtn>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
