import React from 'react';

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: "Felicity Byaruhanga",
      role: "FOUNDER",
      image: "/src/assets/img/pervin.jpg",
      description: "Felicity is passionate about empowering communities and has led Hopely.org since its inception."
    },
    {
      name: "Daniel Israel",
      role: "CO-FOUNDER",
      image: "/src/assets/img/alisha.jpg",
      description: "Daniel is dedicated to making a difference and manages outreach and partnerships."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-16 text-center">
        <h2 className="text-3xl font-bold mb-12 text-slate-800">Meet our awesome team</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {teamMembers.map((member, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 w-80 flex flex-col items-center hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-36 h-36 object-cover rounded-full mb-6 shadow-md" 
              />
              <div className="font-bold text-xl mb-2 text-slate-800">{member.name}</div>
              <div className="text-hopely-pink text-sm font-semibold mb-4 tracking-wider">{member.role}</div>
              <p className="text-gray-700 text-sm leading-relaxed text-center">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
