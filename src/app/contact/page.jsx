// app/contact/page.jsx or pages/contact.jsx
"use client";

import PerformanceLayout from "@/components/layout/PerformanceLayout";
import CursorTrail from "@/components/layout/CursorTrail/cursorTrail";
import Navbar from "@/components/layout/navbar/navbar";
// import HeroBanner from "@/components/contact/hero/hero";
import ContactCard from "@/components/contact/information/info";

export default function Contact() {
  return (
    <PerformanceLayout>
      <CursorTrail />
      <Navbar />

      <main className="contact-page">
        {/* Uncomment and customize the Hero section if you need it */}
        {/*
        <section data-cursor-text="Contact Me">
          <HeroBanner
            title="Get In Touch"
            subtitle="Let's work together or just say hello"
          />
        </section>
        */}

        {/* Contact Information Section */}
        <section data-cursor-text="Reach Out">
          <ContactCard />
        </section>

        {/* Optionally add a contact form section here later */}
      </main>
    </PerformanceLayout>
  );
}
