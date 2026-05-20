import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, Users, AlertCircle, CheckCircle, Sparkles, 
  ShieldCheck, Calendar, Clock, Activity, AlertTriangle,
  X, FileText, Image, MoreVertical, Phone, Folder, Download, Plus
} from './Icons';
import { generateHRContent, generateSmartRoster } from '../services/geminiService';
import { Employee } from '../types';

const dataAttrition = [
  { name: 'Jan', rate: 12 },
  { name: 'Feb', rate: 15 },
  { name: 'Mar', rate: 8 },
  { name: 'Apr', rate: 5 },
  { name: 'May', rate: 4 },
  { name: 'Jun', rate: 3 },
];

const mockEmployees: Employee[] = [
  { 
    id: 1, name: "Sarah Jenkins", role: "Front Desk Manager", status: "Active", performance: 92, 
    email: "sarah.j@hotel.com", phone: "+91 98765 43210", joinDate: "12 Jan 2023",
    documents: [
       { name: "Employment Contract.pdf", type: 'pdf', date: "12 Jan 2023" },
       { name: "Aadhaar Card.jpg", type: 'img', date: "10 Jan 2023" },
       { name: "Vaccination Cert.pdf", type: 'pdf', date: "15 Jan 2023" },
       { name: "Offer Letter.pdf", type: 'pdf', date: "02 Jan 2023" }
    ]
  },
  { 
    id: 2, name: "Michael Chen", role: "Sous Chef", status: "Active", performance: 88,
    email: "mike.chef@hotel.com", phone: "+91 98765 12345", joinDate: "05 Mar 2022",
    documents: [
       { name: "HACCP Certificate.pdf", type: 'pdf', date: "01 Mar 2024" },
       { name: "Employment Contract.pdf", type: 'pdf', date: "05 Mar 2022" }
    ]
  },
  { 
    id: 3, name: "David Miller", role: "Sr. Server", status: "Active", performance: 74,
    email: "david.m@hotel.com", phone: "+91 91234 56789", joinDate: "20 Jun 2024",
    documents: [
       { name: "ID Proof.jpg", type: 'img', date: "20 Jun 2024" }
    ]
  },
  { 
    id: 4, name: "Priya Singh", role: "Housekeeping", status: "Leave", performance: 95,
    email: "priya.s@hotel.com", phone: "+91 99887 76655", joinDate: "15 Aug 2023",
    documents: []
  }
];

export const Dashboard: React.FC = () => {
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiMode, setAiMode] = useState<'SOP' | 'JD' | 'POLICY' | 'ROSTER'>('SOP');
  
  // Smart Roster AI State
  const [rosterDate, setRosterDate] = useState('Friday Evening');
  const [rosterForecast, setRosterForecast] = useState('High Traffic (Banquet Booking)');
  const [rosterOutput, setRosterOutput] = useState<string | null>(null);
  const [viewRoster, setViewRoster] = useState(false);

  // Employee Detail State
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'docs'>('details');

  const handleAiGenerate = async () => {
    if (aiMode === 'ROSTER') {
      setIsLoadingAi(true);
      const result = await generateSmartRoster(rosterDate, rosterForecast);
      setRosterOutput(result);
      setIsLoadingAi(false);
    } else {
      if (!aiPrompt) return;
      setIsLoadingAi(true);
      const result = await generateHRContent(aiPrompt, aiMode);
      setAiResponse(result);
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen bg-gray-50/50 pb-12">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
           <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
           <p className="text-gray-500 mt-1">Real-time oversight of your hospitality workforce.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button 
            onClick={() => setViewRoster(!viewRoster)}
            className={`flex items-center px-4 py-2 border rounded-full text-sm font-medium transition-colors ${viewRoster ? 'bg-black text-white border-black' : 'bg-white border-gray-200 hover:bg-gray-50 text-gray-700'}`}
          >
            <Calendar size={16} className="mr-2"/> {viewRoster ? 'Hide Roster' : 'View Roster'}
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Plus size={16} className="mr-1"/> New Hire
          </button>
        </div>
      </div>

      {/* Roster View Panel */}
      {viewRoster && (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8 animate-in fade-in slide-in-from-top-4">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Staff Roster - Today</h3>
              <div className="flex space-x-2">
                 <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">Shift A: 08:00 - 16:00</span>
                 <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Shift B: 16:00 - 00:00</span>
              </div>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-sm">
                 <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                    <tr>
                       <th className="px-4 py-3 text-left rounded-l-lg">Employee</th>
                       <th className="px-4 py-3 text-left">Role</th>
                       <th className="px-4 py-3 text-left">Shift</th>
                       <th className="px-4 py-3 text-left">Zone</th>
                       <th className="px-4 py-3 text-left rounded-r-lg">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                    {mockEmployees.map(emp => (
                       <tr key={emp.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{emp.name}</td>
                          <td className="px-4 py-3 text-gray-500">{emp.role}</td>
                          <td className="px-4 py-3 font-mono text-gray-600">08:00 - 16:00</td>
                          <td className="px-4 py-3 text-gray-500">Floor 1 (Restaurant)</td>
                          <td className="px-4 py-3">
                             <span className={`px-2 py-0.5 rounded text-xs font-medium ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                {emp.status === 'Active' ? 'Checked In' : emp.status}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
           <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
              <button className="text-blue-600 text-sm font-medium hover:underline">Download Weekly PDF</button>
           </div>
        </div>
      )}

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Metric 1 */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
               <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Workforce Health</p>
               <h3 className="text-2xl font-bold text-gray-900 mt-1">94%</h3>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
               <Activity size={20} className="text-green-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-3 font-medium flex items-center">
            <TrendingUp size={12} className="mr-1" /> Low Churn Risk
          </p>
        </div>

        {/* Metric 2: Compliance */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <div className="flex justify-between items-start">
            <div>
               <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Compliance</p>
               <h3 className="text-2xl font-bold text-gray-900 mt-1">Good</h3>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg">
               <ShieldCheck size={20} className="text-blue-600" />
            </div>
          </div>
          
          <div className="flex space-x-2 mt-3">
             <div className="flex items-center text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full">PF</div>
             <div className="flex items-center text-[10px] bg-green-100 text-green-800 px-2 py-0.5 rounded-full">ESI</div>
             <div className="flex items-center text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">FSSAI</div>
          </div>
        </div>

        {/* Metric 3: Attrition */}
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
               <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">Attrition Rate</p>
               <h3 className="text-2xl font-bold text-gray-900 mt-1">3.2%</h3>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg">
               <AlertCircle size={20} className="text-orange-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-3 font-medium flex items-center">
            <CheckCircle size={12} className="mr-1" /> Down 12% MoM
          </p>
        </div>

        {/* Metric 4: AI Insight */}
         <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-sm text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <Sparkles size={64} />
            </div>
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">AI Insight</p>
            <p className="mt-2 text-sm font-medium leading-relaxed">
              "Chef Raju has arrived late 3 times this week. Risk of burnout detected."
            </p>
            <button className="mt-3 text-[10px] bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors">
              View Intervention
            </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Left Col: Charts & AI */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Attrition Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataAttrition}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} />
                  <Tooltip />
                  <Area type="monotone" dataKey="rate" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRate)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* AI Generator Tool */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
             <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Sparkles className="text-blue-600 mr-2" size={18} />
                  <h3 className="font-semibold text-gray-900">Gemini Assistant</h3>
                </div>
                <div className="flex space-x-2">
                  {(['SOP', 'JD', 'ROSTER'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setAiMode(mode)}
                      className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wide rounded-md transition-all ${
                        aiMode === mode 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
             </div>
             
             <div className="p-6">
                {aiMode === 'ROSTER' ? (
                   <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Shift Period</label>
                          <input 
                            type="text" 
                            value={rosterDate}
                            onChange={(e) => setRosterDate(e.target.value)}
                            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-500 mb-1">Sales Forecast</label>
                          <input 
                            type="text" 
                            value={rosterForecast}
                            onChange={(e) => setRosterForecast(e.target.value)}
                            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                          />
                        </div>
                      </div>
                      <button
                        onClick={handleAiGenerate}
                        disabled={isLoadingAi}
                        className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                      >
                         {isLoadingAi ? 'Optimizing Schedule...' : 'Generate Smart Roster'}
                      </button>
                      
                      {/* Interactive Roster Visualizer */}
                      <div className="mt-4">
                         <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Generated Schedule</h4>
                         {rosterOutput ? (
                           <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm whitespace-pre-line text-gray-700 font-mono max-h-60 overflow-y-auto">
                              {rosterOutput}
                           </div>
                         ) : (
                           <div className="bg-gray-50 rounded-xl border border-gray-100 p-8 text-center text-gray-400 text-sm">
                              AI can generate a perfectly optimized schedule based on your sales forecast.
                           </div>
                         )}
                      </div>
                   </div>
                ) : (
                  <>
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder={`Draft a ${aiMode}...`}
                      className="w-full p-4 border border-gray-200 rounded-xl outline-none resize-none h-24 text-sm bg-gray-50 mb-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                    <button
                        onClick={handleAiGenerate}
                        disabled={isLoadingAi || !aiPrompt}
                        className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-50 flex justify-center items-center"
                      >
                         {isLoadingAi ? <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"/> : 'Generate Draft'}
                    </button>
                    {aiResponse && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm whitespace-pre-wrap text-gray-700">
                         {aiResponse}
                      </div>
                    )}
                  </>
                )}
             </div>
          </div>
        </div>

        {/* Right Col: Performance & Activity */}
        <div className="space-y-6">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Cards</h3>
             <div className="space-y-4">
               {mockEmployees.map((emp) => (
                 <div 
                   key={emp.id} 
                   onClick={() => setSelectedEmployee(emp)}
                   className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100 group"
                 >
                    <div className="flex items-center">
                       <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 group-hover:bg-black group-hover:text-white transition-colors">
                          {emp.name.charAt(0)}
                       </div>
                       <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{emp.name}</p>
                          <p className="text-xs text-gray-500">{emp.role}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <span className={`text-sm font-bold ${emp.performance < 80 ? 'text-orange-500' : 'text-green-600'}`}>
                         {emp.performance}
                       </span>
                    </div>
                 </div>
               ))}
             </div>
             <button className="w-full mt-4 text-xs text-center text-gray-400 hover:text-gray-600">View All Staff</button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Interventions</h3>
             <div className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                   <div className="flex items-start">
                      <AlertTriangle size={16} className="text-red-500 mt-0.5 mr-2" />
                      <div>
                         <p className="text-sm font-medium text-red-800">Unexplained Absence</p>
                         <p className="text-xs text-red-600 mt-1">Rajesh K. missed 2 shifts.</p>
                      </div>
                   </div>
                </div>
                <div className="p-3 bg-yellow-50 border border-yellow-100 rounded-xl">
                   <div className="flex items-start">
                      <Clock size={16} className="text-yellow-600 mt-0.5 mr-2" />
                      <div>
                         <p className="text-sm font-medium text-yellow-800">Late Arrival Trend</p>
                         <p className="text-xs text-yellow-600 mt-1">Kitchen Team (Avg 15m delay).</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>

      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
           <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
              
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                 <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                       {selectedEmployee.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                       <h2 className="text-2xl font-bold text-gray-900">{selectedEmployee.name}</h2>
                       <p className="text-gray-500 text-sm flex items-center mt-1">
                          <span className="bg-black text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold mr-2">{selectedEmployee.role}</span> 
                          {selectedEmployee.status}
                       </p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedEmployee(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                    <X size={20} />
                 </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100 px-6 pt-2">
                 <button 
                  onClick={() => setActiveTab('details')}
                  className={`mr-8 pb-3 text-sm font-medium transition-colors ${activeTab === 'details' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                    Personal Details
                 </button>
                 <button 
                  onClick={() => setActiveTab('docs')}
                  className={`mr-8 pb-3 text-sm font-medium transition-colors ${activeTab === 'docs' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                    Documents Folder
                 </button>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto flex-1 bg-white">
                 {activeTab === 'details' ? (
                    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
                       <div className="grid grid-cols-2 gap-8">
                          <div>
                             <label className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2 block">Contact Info</label>
                             <div className="space-y-3">
                                <p className="text-sm font-medium text-gray-900 flex items-center bg-gray-50 p-3 rounded-lg"><MoreVertical size={16} className="mr-3 text-gray-400"/> {selectedEmployee.email}</p>
                                <p className="text-sm font-medium text-gray-900 flex items-center bg-gray-50 p-3 rounded-lg"><Phone size={16} className="mr-3 text-gray-400"/> {selectedEmployee.phone}</p>
                             </div>
                          </div>
                          <div>
                             <label className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-2 block">Employment Info</label>
                             <div className="space-y-3">
                                <p className="text-sm font-medium text-gray-900 flex items-center bg-gray-50 p-3 rounded-lg"><Calendar size={16} className="mr-3 text-gray-400"/> Joined: {selectedEmployee.joinDate}</p>
                                <p className="text-sm font-medium text-gray-900 flex items-center bg-gray-50 p-3 rounded-lg"><TrendingUp size={16} className="mr-3 text-gray-400"/> Risk: <span className="ml-2 text-green-600 font-bold">Low</span></p>
                             </div>
                          </div>
                       </div>
                       
                       <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                          <h4 className="text-sm font-bold text-gray-900 mb-4">Performance Overview</h4>
                          <div className="space-y-4">
                             <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 font-medium">Attendance Rate</span>
                                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                                   <div className="bg-blue-600 h-2 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)]" style={{ width: '92%' }}></div>
                                </div>
                                <span className="text-sm font-bold text-gray-900">92%</span>
                             </div>
                             <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 font-medium">Task Completion</span>
                                <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
                                   <div className="bg-purple-600 h-2 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.3)]" style={{ width: '85%' }}></div>
                                </div>
                                <span className="text-sm font-bold text-gray-900">85%</span>
                             </div>
                          </div>
                       </div>
                    </div>
                 ) : (
                    <div className="animate-in fade-in zoom-in-95 duration-200">
                       <div className="flex justify-between items-center mb-6">
                          <h3 className="text-sm font-bold text-gray-900">My Files ({selectedEmployee.documents.length})</h3>
                          <button className="text-xs bg-black text-white px-3 py-1.5 rounded-lg font-medium hover:bg-gray-800">+ Upload New</button>
                       </div>
                       
                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {selectedEmployee.documents.map((doc, idx) => (
                             <div key={idx} className="group relative bg-gray-50 border border-gray-100 p-4 rounded-xl hover:shadow-md hover:border-blue-200 transition-all cursor-pointer aspect-square flex flex-col items-center justify-center text-center">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${doc.type === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                   {doc.type === 'pdf' ? <FileText size={24} /> : <Image size={24} />}
                                </div>
                                <p className="text-xs font-medium text-gray-700 line-clamp-2">{doc.name}</p>
                                <p className="text-[10px] text-gray-400 mt-1">{doc.date}</p>
                                
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button className="p-1.5 bg-white rounded-full shadow-sm text-gray-500 hover:text-black">
                                      <Download size={12} />
                                   </button>
                                </div>
                             </div>
                          ))}
                          {/* Folder Style Placeholder */}
                          <div className="bg-white border-2 border-dashed border-gray-200 p-4 rounded-xl flex flex-col items-center justify-center text-center text-gray-400 hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer aspect-square">
                             <Folder size={32} className="mb-2 opacity-50" />
                             <span className="text-xs font-medium">Drop files here</span>
                          </div>
                       </div>
                    </div>
                 )}
              </div>
              
              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
                 <button onClick={() => setSelectedEmployee(null)} className="mr-3 px-5 py-2.5 text-sm text-gray-500 font-medium hover:text-gray-900 hover:bg-gray-200 rounded-xl transition-colors">Close</button>
                 <button className="px-6 py-2.5 bg-black text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-transform active:scale-95 shadow-lg">Save Changes</button>
              </div>

           </div>
        </div>
      )}

    </div>
  );
};