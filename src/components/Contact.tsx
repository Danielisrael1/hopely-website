import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-4 md:px-16">
        <h2 className="text-3xl font-bold font-heading mb-12 text-center text-slate-800">Contact us</h2>
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <form action="https://getform.io/f/axozloob" method="POST" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                name="name"
                placeholder="Full Name" 
                required
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-hopely-pink focus:border-transparent transition-all" 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Email Address" 
                required
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-hopely-pink focus:border-transparent transition-all" 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                name="subject"
                placeholder="Subject" 
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-hopely-pink focus:border-transparent transition-all" 
              />
              <select 
                name="inquiry-type"
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-hopely-pink focus:border-transparent transition-all bg-white"
              >
                <option value="">Select Inquiry Type</option>
                <option value="general">General Information</option>
                <option value="volunteer">Volunteer Opportunities</option>
                <option value="partnership">Partnership</option>
                <option value="donation">Donation Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <textarea 
              name="message"
              placeholder="Type your message here..." 
              required
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-hopely-pink focus:border-transparent transition-all" 
              rows={5}
            ></textarea>
            
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                name="subscribe" 
                value="yes"
                id="newsletter"
                className="rounded border-gray-300 text-hopely-pink focus:ring-hopely-pink"
              />
              <input type="hidden" name="subscribe" value="no" />
              <label htmlFor="newsletter" className="text-sm text-gray-700">
                Subscribe to our newsletter for updates
              </label>
            </div>
            
            {/* Honeypot field to prevent spam */}
            <input type="hidden" name="_gotcha" style={{display: 'none !important'}} />
            
            <button 
              type="submit" 
              className="bg-hopely-pink text-white px-8 py-3 rounded-lg font-bold hover:bg-hopely-pink-dark hover:scale-105 transition-all duration-300 shadow-lg w-full md:w-auto"
            >
              Send Message
            </button>
          </form>
          
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700">
              <div className="text-center">
                <div className="font-bold text-slate-800 mb-1">Email</div>
                <div>info@hopely.org</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-slate-800 mb-1">Phone</div>
                <div>+256 778000100</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-slate-800 mb-1">Address</div>
                <div>Kampala, Uganda</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
