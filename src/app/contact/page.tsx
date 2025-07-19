import React from "react";

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="heading-font text-3xl sm:text-4xl font-bold mb-8 text-gray-900">CONTACT US</h1>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Our Office</h2>
        <p className="text-gray-700">123 Placeholder Street, City, Country</p>
      </section>
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Get in Touch</h2>
        <p className="text-gray-700">Email: info@example.com</p>
        <p className="text-gray-700">Phone: (123) 456-7890</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Contact Form</h2>
        <p className="text-gray-700">[Contact form will go here]</p>
      </section>
    </div>
  );
} 