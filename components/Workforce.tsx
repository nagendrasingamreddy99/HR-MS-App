import React, { useState } from 'react';
import { 
  MapPin, Clock, Video, Wallet, ArrowRight, Bell, MessageSquare, 
  ChevronLeft, User, Settings, CheckCircle, Calendar, Send, Image, FileText, Phone
} from './Icons';

export const Workforce: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shift' | 'learn' | 'chat' | 'profile'>('shift');
  const [chatMessage, setChatMessage] = useState('');
  const [teamChat, setTeamChat] = useState([
     { id: 1, user: 'Manager', text: 'Team, please ensure table 4 is reserved for 8 PM.', time: '4:30 PM', isMe: false },
     { id: 2, user: 'Raju (You)', text: 'Noted sir. Will set it up now.', time: '4:32 PM', isMe: true },
     { id: 3, user: 'Sarah', text: 'I can help with the decorations.', time: '4:35 PM', isMe: false },
  ]);

  const handleSendChat = () => {
     if (!chatMessage.trim()) return;
     setTeamChat([...teamChat, { id: Date.now(), user: 'Raju (You)', text: chatMessage, time: 'Now', isMe: true }]);
     setChatMessage('');
  };

  const renderContent = () => {
     switch(activeTab) {
        case 'shift':
           return (
              <div className="px-6 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  {/* Check In Card */}
                  <div className="bg-white p-6 rounded-3xl shadow-lg mb-6 mt-[-30px]">
                     <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-500 text-xs font-medium">
                           <MapPin size={14} className="mr-1 text-green-500" />
                           <span>Inside Geofence</span>
                        </div>
                        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded">10:42 AM</span>
                     </div>
                     <button className="w-full bg-black text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-gray-200 hover:scale-[1.02] transition-transform flex items-center justify-center active:scale-95">
                        <Clock className="mr-2" /> Clock In
                     </button>
                     <p className="text-center text-xs text-gray-400 mt-3">Shift starts at 11:00 AM</p>
                  </div>

                  {/* Financial Wellness */}
                  <div className="bg-green-50 p-6 rounded-3xl border border-green-100 mb-6">
                     <div className="flex items-center mb-3">
                        <div className="p-2 bg-green-100 rounded-full mr-3">
                           <Wallet size={20} className="text-green-600" />
                        </div>
                        <div>
                           <h3 className="font-bold text-green-900">Early Wage Access</h3>
                           <p className="text-xs text-green-700">Withdraw up to ₹5,000</p>
                        </div>
                     </div>
                     <button className="w-full bg-white text-green-700 font-semibold py-3 rounded-xl text-sm border border-green-200">
                        Check Eligibility
                     </button>
                  </div>

                  {/* Sentiment Check */}
                  <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-24">
                     <p className="text-sm font-medium text-gray-900 mb-3">How are you feeling today?</p>
                     <div className="flex justify-between px-2">
                        <button className="text-2xl grayscale hover:grayscale-0 transition-all transform hover:scale-125">😡</button>
                        <button className="text-2xl grayscale hover:grayscale-0 transition-all transform hover:scale-125">😐</button>
                        <button className="text-2xl grayscale hover:grayscale-0 transition-all transform hover:scale-125">🙂</button>
                        <button className="text-2xl hover:scale-125 transition-all transform">🤩</button>
                     </div>
                  </div>
              </div>
           );
        case 'learn':
           return (
              <div className="px-6 pt-6 pb-24 h-full bg-white animate-in fade-in zoom-in-95 duration-200">
                 <h2 className="text-xl font-bold text-gray-900 mb-4">Learning Wallet</h2>
                 <div className="space-y-4">
                     {[1, 2, 3].map((i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-2xl flex items-start">
                           <div className="w-20 h-20 bg-gray-200 rounded-xl mr-4 flex-shrink-0 overflow-hidden relative">
                              <img src={`https://picsum.photos/seed/${i+50}/100`} className="w-full h-full object-cover"/>
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                 <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center pl-0.5 shadow-sm">
                                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-black border-b-[4px] border-b-transparent"></div>
                                 </div>
                              </div>
                           </div>
                           <div className="flex-1">
                              <h3 className="text-sm font-bold text-gray-900 mb-1">Advanced Table Setting</h3>
                              <p className="text-xs text-gray-500 mb-2">Mandatory • 15 mins</p>
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                 <div className="bg-green-500 h-1.5 rounded-full" style={{ width: i*30 + '%' }}></div>
                              </div>
                           </div>
                        </div>
                     ))}
                 </div>
              </div>
           );
        case 'chat':
            return (
               <div className="flex flex-col h-full bg-gray-50 pb-20 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     <div className="text-center text-[10px] text-gray-400">Kitchen Team Group</div>
                     {teamChat.map((msg) => (
                        <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                           {!msg.isMe && <span className="text-[10px] text-gray-500 ml-1 mb-0.5">{msg.user}</span>}
                           <div className={`max-w-[80%] p-3 text-sm rounded-2xl shadow-sm ${
                              msg.isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'
                           }`}>
                              {msg.text}
                           </div>
                           <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                        </div>
                     ))}
                  </div>
                  <div className="p-4 bg-white border-t border-gray-100 flex items-center pb-24">
                     <button className="text-gray-400 mr-2"><Image size={20}/></button>
                     <input 
                        type="text" 
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        placeholder="Message team..."
                        className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none"
                     />
                     <button onClick={handleSendChat} className="ml-2 bg-blue-600 text-white p-2 rounded-full">
                        <Send size={16}/>
                     </button>
                  </div>
               </div>
            );
         case 'profile':
            return (
               <div className="px-6 pt-6 pb-24 h-full bg-white animate-in fade-in zoom-in-95 duration-200">
                  <div className="text-center mb-6">
                     <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-3 border-4 border-white shadow-lg overflow-hidden relative group">
                        <img src="https://picsum.photos/seed/raju/200" alt="Profile" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                           <span className="text-white text-xs font-bold">Edit</span>
                        </div>
                     </div>
                     <h2 className="text-xl font-bold text-gray-900">Raju Kumar</h2>
                     <p className="text-sm text-gray-500">Waitstaff • ID: #TP-8842</p>
                  </div>
                  
                  <div className="space-y-3">
                     <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                           <button className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col items-center justify-center shadow-sm active:scale-95 transition-transform">
                              <FileText size={20} className="text-blue-500 mb-2"/>
                              <span className="text-xs font-medium">Payslips</span>
                           </button>
                           <button className="bg-white p-3 rounded-xl border border-gray-100 flex flex-col items-center justify-center shadow-sm active:scale-95 transition-transform">
                              <CheckCircle size={20} className="text-green-500 mb-2"/>
                              <span className="text-xs font-medium">Claims</span>
                           </button>
                        </div>
                     </div>

                     <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center text-sm font-medium"><User size={18} className="mr-3 text-gray-500"/> Personal Details</div>
                        <ArrowRight size={16} className="text-gray-400" />
                     </button>
                     <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center text-sm font-medium"><CheckCircle size={18} className="mr-3 text-gray-500"/> My Documents</div>
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">1 Pending</span>
                     </button>
                     <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                        <div className="flex items-center text-sm font-medium"><Calendar size={18} className="mr-3 text-gray-500"/> Attendance History</div>
                        <ArrowRight size={16} className="text-gray-400" />
                     </button>
                     <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl text-red-600 hover:bg-red-50 transition-colors">
                        <div className="flex items-center text-sm font-medium"><Settings size={18} className="mr-3 text-red-400"/> Settings</div>
                     </button>
                  </div>
               </div>
            );
        default: return null;
     }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 flex justify-center">
      
      {/* Phone Simulator Frame */}
      <div className="bg-white w-full max-w-sm rounded-[3rem] shadow-2xl border-8 border-gray-900 overflow-hidden relative flex flex-col h-[800px]">
         
         {/* Dynamic Island / Notch */}
         <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20"></div>

         {/* Header Area (Only on Shift Tab or static for others) */}
         <div className={`transition-all duration-300 ${activeTab === 'shift' ? 'bg-blue-600 h-48' : 'bg-white h-24 border-b border-gray-100'}`}>
            {activeTab === 'shift' ? (
               <div className="p-8 pt-14 text-white">
                  <div className="flex justify-between items-center mb-6">
                     <div>
                        <p className="text-blue-100 text-sm">Welcome back,</p>
                        <h2 className="text-2xl font-bold">Raju Kumar</h2>
                     </div>
                     <div className="bg-blue-500 p-2 rounded-full relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full border border-blue-500"></span>
                     </div>
                  </div>
                  {/* Quick Stats */}
                  <div className="flex justify-between items-center bg-blue-700/50 p-4 rounded-2xl backdrop-blur-sm">
                     <div className="text-center">
                        <p className="text-xs text-blue-200 uppercase">Attendance</p>
                        <p className="font-bold text-lg">98%</p>
                     </div>
                     <div className="h-8 w-[1px] bg-blue-400/30"></div>
                     <div className="text-center">
                        <p className="text-xs text-blue-200 uppercase">Credits</p>
                        <p className="font-bold text-lg">₹1200</p>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="flex items-center justify-between px-6 pt-12 pb-4">
                  <span className="text-xl font-bold text-gray-900">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                  <div className="p-2 bg-gray-100 rounded-full"><Bell size={18}/></div>
               </div>
            )}
         </div>

         {/* Scrollable Content */}
         <div className="flex-1 overflow-y-auto bg-gray-50 no-scrollbar relative">
             {renderContent()}
         </div>

         {/* Bottom Nav */}
         <div className="absolute bottom-0 w-full bg-white border-t border-gray-100 h-20 px-6 flex justify-between items-start pt-4 z-20">
            <button 
               onClick={() => setActiveTab('shift')}
               className={`flex flex-col items-center transition-colors ${activeTab === 'shift' ? 'text-blue-600' : 'text-gray-300 hover:text-gray-500'}`}
            >
               <Clock size={24} strokeWidth={activeTab === 'shift' ? 2.5 : 2} />
               <span className="text-[10px] font-medium mt-1">Shift</span>
            </button>
            <button 
               onClick={() => setActiveTab('learn')}
               className={`flex flex-col items-center transition-colors ${activeTab === 'learn' ? 'text-blue-600' : 'text-gray-300 hover:text-gray-500'}`}
            >
               <Video size={24} strokeWidth={activeTab === 'learn' ? 2.5 : 2} />
               <span className="text-[10px] font-medium mt-1">Learn</span>
            </button>
            <button 
               onClick={() => setActiveTab('chat')}
               className={`flex flex-col items-center transition-colors ${activeTab === 'chat' ? 'text-blue-600' : 'text-gray-300 hover:text-gray-500'}`}
            >
               <MessageSquare size={24} strokeWidth={activeTab === 'chat' ? 2.5 : 2} />
               <span className="text-[10px] font-medium mt-1">Chat</span>
            </button>
            <button 
               onClick={() => setActiveTab('profile')}
               className={`flex flex-col items-center transition-colors ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-300 hover:text-gray-500'}`}
            >
               <User size={24} strokeWidth={activeTab === 'profile' ? 2.5 : 2} />
               <span className="text-[10px] font-medium mt-1">Profile</span>
            </button>
         </div>

      </div>
    </div>
  );
};