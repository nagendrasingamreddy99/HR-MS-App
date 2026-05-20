import React from 'react';
import { Briefcase, GraduationCap, Search, ArrowRight } from './Icons';

export const Marketplace: React.FC = () => {
  const candidates = [
    { id: 1, name: "Sarah Jenkins", role: "Hotel General Manager", exp: "12 Years", rating: 4.9 },
    { id: 2, name: "Michael Chen", role: "Executive Chef", exp: "8 Years", rating: 4.8 },
    { id: 3, name: "David Miller", role: "Front Office Manager", exp: "5 Years", rating: 4.7 },
  ];

  const trainings = [
    { id: 1, title: "Hygiene & Safety Standards (HACCP)", duration: "4 Hours", level: "Mandatory" },
    { id: 2, title: "Premium Guest Experience", duration: "2 Days", level: "Advanced" },
    { id: 3, title: "Conflict Resolution in Hospitality", duration: "3 Hours", level: "Intermediate" },
  ];

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen bg-white">
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">Talent & Training Marketplace</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Connect with vetted professionals and industry-leading training modules.
        </p>
      </div>

      {/* Recruitment Section */}
      <div className="mb-24">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Top Talent</h2>
            <p className="text-gray-500 mt-1">Available for immediate hiring.</p>
          </div>
          <button className="text-blue-600 font-medium text-sm flex items-center hover:underline">
            View all candidates <ArrowRight size={14} className="ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {candidates.map((c) => (
            <div key={c.id} className="group relative bg-gray-50 rounded-3xl p-6 hover:bg-gray-100 transition-colors">
              <div className="absolute top-6 right-6 bg-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                ⭐ {c.rating}
              </div>
              <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 overflow-hidden">
                <img src={`https://picsum.photos/seed/${c.id + 50}/200`} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{c.name}</h3>
              <p className="text-blue-600 font-medium text-sm mb-2">{c.role}</p>
              <p className="text-gray-500 text-sm mb-6">{c.exp} Experience</p>
              <button className="w-full bg-white border border-gray-200 text-gray-900 font-medium py-2 rounded-full text-sm hover:bg-black hover:text-white transition-colors shadow-sm">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* L&D Section */}
      <div className="mb-24">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Learning & Development</h2>
            <p className="text-gray-500 mt-1">Upskill your workforce with certified courses.</p>
          </div>
          <button className="text-blue-600 font-medium text-sm flex items-center hover:underline">
            Browse catalog <ArrowRight size={14} className="ml-1" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trainings.map((t) => (
            <div key={t.id} className="flex flex-col justify-between bg-black text-white rounded-3xl p-8 min-h-[240px]">
              <div>
                <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-xs font-medium mb-4">
                  {t.level}
                </span>
                <h3 className="text-xl font-semibold leading-tight">{t.title}</h3>
              </div>
              <div className="flex items-center justify-between mt-8">
                <span className="text-gray-400 text-sm">{t.duration}</span>
                <button className="bg-white text-black rounded-full p-2 hover:scale-105 transition-transform">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};