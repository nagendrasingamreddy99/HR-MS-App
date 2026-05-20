import React from 'react';
import { 
  Users, Briefcase, FileText, ShieldCheck, GraduationCap, Heart, ChevronRight, LayoutDashboard
} from './Icons';
import { AppView, FeatureItem } from '../types';

interface LandingProps {
  onNavigate: (view: AppView) => void;
}

export const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  const features: FeatureItem[] = [
    { id: 'recruitment', title: 'Recruitment', icon: Briefcase, isNew: true },
    { id: 'onboarding', title: 'Onboarding', icon: Users },
    { id: 'benefits', title: 'Benefits', icon: Heart, isNew: true },
    { id: 'training', title: 'L&D', icon: GraduationCap },
    { id: 'policy', title: 'Policy', icon: FileText },
    { id: 'compliance', title: 'Compliance', icon: ShieldCheck },
  ];

  return (
    <div className="bg-white">
      {/* Product Strip - Sticky below the 60px Navbar */}
      <div className="border-b border-gray-100 bg-white/95 backdrop-blur z-30 sticky top-[60px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-3 overflow-x-auto no-scrollbar space-x-8">
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest shrink-0">Modules</span>
             {features.map((feature) => (
               <div key={feature.id} className="flex items-center space-x-2 group cursor-pointer shrink-0 opacity-70 hover:opacity-100 transition-opacity">
                 <feature.icon className="text-gray-900" size={16} />
                 <span className="text-sm font-medium text-gray-900">{feature.title}</span>
                 {feature.isNew && (
                   <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full font-bold">New</span>
                 )}
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-black text-white pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2874&auto=format&fit=crop" 
            alt="Hospitality Background" 
            className="w-full h-full object-cover"
           />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
          <h2 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
            All out Hospitality.
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
            The complete operating system for your workforce. From hiring to retiring, we manage it all.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate(AppView.LOGIN)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium text-lg transition-all flex items-center justify-center"
            >
              <LayoutDashboard className="mr-2" size={20}/> Login to Dashboard
            </button>
            <button 
              className="bg-transparent border border-gray-600 hover:border-gray-400 text-white px-8 py-3 rounded-full font-medium text-lg transition-all"
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>

      {/* Value Proposition Grid */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Feature 1: The Pain Point Solver */}
            <div className="bg-white p-12 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-orange-600 font-semibold text-sm tracking-wide uppercase">Retention</span>
              <h3 className="text-4xl font-semibold mt-4 mb-6 text-gray-900">Stop the revolving door.</h3>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Hospitality faces the highest attrition rates. Our engagement tools and "Key Account HR Managers" ensure your staff feels valued, reducing turnover by up to 40%.
              </p>
              <a href="#" className="text-blue-600 font-medium inline-flex items-center hover:underline">
                See how it works <ChevronRight size={16} />
              </a>
            </div>

            {/* Feature 2: Organized Management */}
            <div className="bg-white p-12 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
               <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Efficiency</span>
              <h3 className="text-4xl font-semibold mt-4 mb-6 text-gray-900">Chaotic back-office? Solved.</h3>
              <p className="text-lg text-gray-500 mb-8 leading-relaxed">
                Automated HR calendars, digital onboarding, and instant policy generation. Replace your filing cabinet with a streamlined digital brain.
              </p>
               <a href="#" className="text-blue-600 font-medium inline-flex items-center hover:underline">
                Explore tools <ChevronRight size={16} />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Simple */}
      <footer className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400 text-sm">
          <p>&copy; 2024 TalentPlate. Designed for Hospitality.</p>
        </div>
      </footer>
    </div>
  );
};