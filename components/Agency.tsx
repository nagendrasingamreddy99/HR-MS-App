import React, { useState } from 'react';
import { 
  Activity, Search, AlertCircle, CheckCircle, MoreHorizontal, Send, User, X,
  MapPin, Users, Phone, FileText, Calendar, ChevronRight
} from './Icons';
import { Client } from '../types';

export const Agency: React.FC = () => {
  const clients: Client[] = [
    { id: 1, name: "The Royal Orchid", health: "Critical", attrition: "18%", issues: 3, lastCheck: "2 days ago", location: "Mumbai, Bandra", employees: 45, contactPerson: "Mr. Kapoor" },
    { id: 2, name: "Spice Garden", health: "Good", attrition: "4%", issues: 0, lastCheck: "Today", location: "Bangalore, Indiranagar", employees: 22, contactPerson: "Ms. Sharma" },
    { id: 3, name: "Urban Stay Hotels", health: "Warning", attrition: "12%", issues: 1, lastCheck: "Yesterday", location: "Delhi, CP", employees: 120, contactPerson: "Mr. Singh" },
    { id: 4, name: "Cafe Mosaic", health: "Good", attrition: "5%", issues: 0, lastCheck: "Today", location: "Pune, KP", employees: 18, contactPerson: "Mrs. Deshmukh" },
  ];

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{sender: 'me'|'client', text: string, time: string}[]>([
    {sender: 'client', text: 'Hi, we need 3 more waiters for the weekend event.', time: '10:00 AM'},
    {sender: 'me', text: 'Sure, checking the roster now. What are the timings?', time: '10:05 AM'},
    {sender: 'client', text: '6 PM to 12 AM. Experience in fine dining preferred.', time: '10:15 AM'}
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
     if(!newMessage.trim()) return;
     setMessages([...messages, {sender: 'me', text: newMessage, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]);
     setNewMessage('');
  };

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen bg-gray-50/50 pb-12">
      
      <div className="mb-8 flex justify-between items-center">
         <div>
            <h1 className="text-3xl font-bold text-gray-900">Agency Portal</h1>
            <p className="text-gray-500 mt-1">Internal dashboard for Key Account Managers (KAMs).</p>
         </div>
         <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
               type="text" 
               placeholder="Search Client..." 
               className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent w-64 transition-all hover:w-72"
            />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Main List Area */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-900">Client Health Monitor</h3>
                  <button className="text-blue-600 text-xs font-medium hover:underline">Download Report</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full">
                     <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        <tr>
                           <th className="px-6 py-3">Client Name</th>
                           <th className="px-6 py-3">Health Status</th>
                           <th className="px-6 py-3">Attrition</th>
                           <th className="px-6 py-3">Open Tickets</th>
                           <th className="px-6 py-3"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100">
                        {clients.map((client) => (
                           <tr 
                              key={client.id} 
                              onClick={() => { setSelectedClient(client); setChatOpen(true); }}
                              className={`hover:bg-gray-50 transition-colors cursor-pointer ${selectedClient?.id === client.id ? 'bg-blue-50/50' : ''}`}
                           >
                              <td className="px-6 py-4">
                                 <p className="text-sm font-medium text-gray-900">{client.name}</p>
                                 <p className="text-xs text-gray-400">{client.location}</p>
                              </td>
                              <td className="px-6 py-4">
                                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                                    client.health === 'Critical' ? 'bg-red-50 text-red-700 border-red-100' :
                                    client.health === 'Warning' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                                    'bg-green-50 text-green-700 border-green-100'
                                 }`}>
                                    <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                        client.health === 'Critical' ? 'bg-red-500' :
                                        client.health === 'Warning' ? 'bg-yellow-500' :
                                        'bg-green-500'
                                    }`}></div>
                                    {client.health}
                                 </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-500 font-mono">{client.attrition}</td>
                              <td className="px-6 py-4 text-sm text-gray-500">
                                 {client.issues > 0 ? (
                                    <span className="flex items-center text-red-600 font-bold bg-red-50 px-2 py-1 rounded w-fit">
                                       <AlertCircle size={14} className="mr-1" /> {client.issues}
                                    </span>
                                 ) : (
                                    <span className="text-gray-400">-</span>
                                 )}
                              </td>
                              <td className="px-6 py-4 text-gray-400">
                                 <ChevronRight size={16} />
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Client Detail Expansion */}
            {selectedClient && (
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <div className="flex justify-between items-start mb-6">
                     <div>
                        <h2 className="text-2xl font-bold text-gray-900">{selectedClient.name}</h2>
                        <div className="flex items-center mt-1 space-x-4 text-sm text-gray-500">
                           <span className="flex items-center bg-gray-50 px-2 py-1 rounded"><MapPin size={14} className="mr-1"/> {selectedClient.location}</span>
                           <span className="flex items-center bg-gray-50 px-2 py-1 rounded"><Users size={14} className="mr-1"/> {selectedClient.employees} Staff</span>
                        </div>
                     </div>
                     <button onClick={() => setSelectedClient(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                     <div className="p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                        <div className="flex items-center text-xs text-gray-400 uppercase font-bold mb-2">
                            <User size={14} className="mr-1"/> Point of Contact
                        </div>
                        <p className="font-semibold text-gray-900">{selectedClient.contactPerson}</p>
                        <p className="text-xs text-blue-600 mt-1 cursor-pointer hover:underline">View Profile</p>
                     </div>
                     <div className="p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                        <div className="flex items-center text-xs text-gray-400 uppercase font-bold mb-2">
                            <FileText size={14} className="mr-1"/> Contract
                        </div>
                        <p className="font-semibold text-gray-900">Premium Plan</p>
                        <p className="text-xs text-gray-500 mt-1">Valid till Dec 2025</p>
                     </div>
                     <div className="p-4 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                        <div className="flex items-center text-xs text-gray-400 uppercase font-bold mb-2">
                            <Calendar size={14} className="mr-1"/> Renewal
                        </div>
                        <p className="font-semibold text-green-600">In 3 Months</p>
                        <p className="text-xs text-gray-500 mt-1">Auto-renewal ON</p>
                     </div>
                  </div>

                  <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                     <div className="flex items-start p-4 bg-red-50 rounded-xl border border-red-100">
                        <div className="mt-0.5 mr-3 p-1.5 bg-white rounded-full shadow-sm"><AlertCircle size={16} className="text-red-500"/></div>
                        <div>
                           <p className="text-sm font-bold text-red-900">Urgent: Payroll Discrepancy</p>
                           <p className="text-xs text-red-700 mt-1">Ticket #2024 opened yesterday. Needs immediate attention.</p>
                           <button className="mt-2 text-xs bg-red-100 text-red-700 px-3 py-1 rounded-md font-medium hover:bg-red-200">Resolve Now</button>
                        </div>
                     </div>
                     <div className="flex items-start p-4 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="mt-0.5 mr-3 p-1.5 bg-white rounded-full shadow-sm"><CheckCircle size={16} className="text-blue-500"/></div>
                        <div>
                           <p className="text-sm font-bold text-blue-900">New Hiring Request</p>
                           <p className="text-xs text-blue-700 mt-1">Looking for 2 Sous Chefs. Requirements sent via email.</p>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* Side Panel: Chat & Stats */}
         <div className="space-y-6">
            
            {/* Chat Window */}
            <div className={`bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col transition-all duration-300 ${chatOpen ? 'h-[500px]' : 'h-16'}`}>
               <div 
                  className="bg-black text-white p-4 flex justify-between items-center cursor-pointer hover:bg-gray-900"
                  onClick={() => setChatOpen(!chatOpen)}
               >
                  <div className="flex items-center">
                     <div className="relative mr-3">
                        <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center border-2 border-gray-600"><User size={20}/></div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
                     </div>
                     <div>
                        <p className="text-sm font-bold">{selectedClient ? selectedClient.contactPerson : "Select Client"}</p>
                        <p className="text-[10px] text-gray-400">Online | {selectedClient?.name || "No Client"}</p>
                     </div>
                  </div>
                  {chatOpen ? <X size={20} className="text-gray-400 hover:text-white" /> : <div className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">2</div>}
               </div>
               
               {chatOpen && (
                  <>
                     <div className="flex-1 bg-gray-50 p-4 overflow-y-auto space-y-4">
                        {selectedClient ? (
                           <>
                              <div className="text-center text-[10px] text-gray-400 my-2">Today</div>
                              {messages.map((msg, idx) => (
                                 <div key={idx} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                    <div className={`max-w-[80%] p-3 text-sm shadow-sm ${
                                       msg.sender === 'me' 
                                       ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' 
                                       : 'bg-white text-gray-800 border border-gray-100 rounded-2xl rounded-tl-sm'
                                    }`}>
                                       {msg.text}
                                    </div>
                                    <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                                 </div>
                              ))}
                           </>
                        ) : (
                           <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2">
                              <User size={32} className="opacity-20"/>
                              <p className="text-sm">Select a client to start chatting</p>
                           </div>
                        )}
                     </div>
                     <div className="p-3 border-t border-gray-100 flex bg-white items-center gap-2">
                        <button className="text-gray-400 hover:text-gray-600 p-2"><MoreHorizontal size={20}/></button>
                        <input 
                           type="text" 
                           placeholder="Type a message..." 
                           className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                           value={newMessage}
                           onChange={(e) => setNewMessage(e.target.value)}
                           onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                           disabled={!selectedClient}
                        />
                        <button 
                           onClick={handleSendMessage}
                           disabled={!selectedClient}
                           className="bg-black text-white p-2.5 rounded-full hover:bg-gray-800 disabled:opacity-50 transition-colors shadow-sm"
                        >
                           <Send size={18} />
                        </button>
                     </div>
                  </>
               )}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <h3 className="font-semibold text-gray-900 mb-4">Recruitment Pipeline</h3>
               <div className="space-y-5">
                  <div>
                     <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 font-medium">Waiters Placed</span>
                        <span className="font-bold">42/50</span>
                     </div>
                     <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '84%' }}></div>
                     </div>
                     <p className="text-xs text-gray-400 mt-1">8 slots remaining</p>
                  </div>
                  <div>
                     <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600 font-medium">Chefs Interviewing</span>
                        <span className="font-bold">12</span>
                     </div>
                     <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '40%' }}></div>
                     </div>
                     <p className="text-xs text-gray-400 mt-1">3 offers pending</p>
                  </div>
               </div>
            </div>

         </div>

      </div>
    </div>
  );
};