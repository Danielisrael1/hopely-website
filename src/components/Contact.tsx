import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-4xl mx-auto px-4 md:px-16">
        <h2 className="text-3xl font-bold font-heading mb-12 text-center text-slate-800">Contact us</h2>
        <div className="bg-white rounded-xl p-2">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                type="text" 
                placeholder="Name" 
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-hopely-pink focus:border-transparent transition-all" 
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-hopely-pink focus:border-transparent transition-all" 
              />
            </div>
            <textarea 
              placeholder="Type your message here..." 
              className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:ring-2 focus:ring-hopely-pink focus:border-transparent transition-all" 
              rows={5}
            ></textarea>
            <button 
              type="submit" 
              className="bg-hopely-pink text-white px-8 py-3 rounded-lg font-bold hover:bg-hopely-pink-dark hover:scale-105 transition-all duration-300 shadow-lg"
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
