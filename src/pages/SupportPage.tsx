import { Mail, Phone, MessageSquare, Clock, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import Footer from '../components/Footer';

export default function SupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: 'How do I book a tour?',
      answer: 'Browse our available tours on the home page or search page, click "Book Now" on your preferred tour, and follow the booking process. You can add tours to your cart and proceed to checkout.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and digital wallets. All payments are processed securely through our payment gateway.'
    },
    {
      question: 'Can I cancel or modify my booking?',
      answer: 'Bookings can be cancelled up to 7 days before the tour date for a full refund. Modifications can be made through your account dashboard.'
    },
    {
      question: 'Do you ship handicrafts internationally?',
      answer: 'Yes, we offer international shipping for all handicraft items. Shipping costs and delivery times vary by location. Shipping is free for orders over $100.'
    },
    {
      question: 'Are your tours suitable for families?',
      answer: 'Most of our tours are family-friendly. We offer age recommendations for each tour. Contact us for specific accessibility requirements.'
    },
    {
      question: 'What is your refund policy?',
      answer: 'Tours can be refunded up to 7 days before the date. Handicrafts can be returned within 30 days for a full refund if unused.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-16">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">How Can We Help?</h1>
            <p className="text-xl text-emerald-50">Get answers to common questions and reach out to our support team</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <Mail className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get help via email, typically responded within 24 hours</p>
              <a href="mailto:support@ceylontreasures.com" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                support@ceylontreasures.com
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <Phone className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Call us directly for urgent assistance</p>
              <a href="tel:+94112345678" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                +94 11 234 5678
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <MessageSquare className="h-12 w-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our team in real-time</p>
              <button className="text-emerald-600 hover:text-emerald-700 font-semibold">
                Start Chat
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <Clock className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Support Hours</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Regular Hours</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>Monday - Friday: 9:00 AM - 6:00 PM</li>
                  <li>Saturday: 10:00 AM - 4:00 PM</li>
                  <li>Sunday: Closed</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Emergency Support</h3>
                <p className="text-gray-600">Available 24/7 for critical issues related to active tours</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <HelpCircle className="h-6 w-6 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-left font-semibold text-gray-900">{item.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
                        expandedFaq === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-700">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Didn't find what you're looking for?</h3>
            <p className="text-gray-600 mb-6">Our support team is here to help. Reach out and we'll get back to you as soon as possible.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors whitespace-nowrap">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
