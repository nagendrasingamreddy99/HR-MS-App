# 🍽️ TalentPlate - Hospitality HR Redefined

**TalentPlate** is a premium, full-suite HR Technology and Services operating system purpose-built for the hospitality industry. By marrying powerful digital workflow engines with real-time AI capabilities, TalentPlate streamlines employee lifecycle management—from recruitment to retirement—while addressing hospitality's biggest pain point: staff retention.

---

## 🚀 Key Portal Workspaces

TalentPlate is designed as a unified multi-tenant dashboard tailored to all roles within the hospitality business ecosystem:

### 1. 👑 Owner & Admin Command Center (`Dashboard`)
The strategic heart of the operation, giving management real-time workforce analytics and high-impact control.
- **Workforce Health Diagnostics**: Live tracking of employee attrition, performance metrics, and compliance standings.
- **Data Visualizations**: Responsive interactive charts (attrition trends, retention goals) powered by `Recharts` and `d3`.
- **Burnout & Turnover Warnings**: Proactive, actionable notifications triggered by irregular attendance or fatigue indicators.
- **Digital Document Vault**: Standard compliance tracking (contract signatures, ID documents, sanitation check compliance folders).

### 2. 📱 Workforce Companion App (`Workforce`)
An immersive, mobile-optimized simulator experience for frontline service staff (Waitstaff, Chefs, Front Desk).
- **Geofenced Clock-In**: Live location-based check-in ensuring accurate timecard tracking inside designated venues.
- **Financial Wellness (Early Wage Access)**: Lets workers gain advance access to earned wages to curb sudden high-stress financial needs.
- **Interactive Training (Learning Wallet)**: Short-duration hospitality courses (micro-learning modules) with inline progress tracking.
- **Daily Mood Check**: Real-time sentiment self-reports enabling management to track morale.
- **Team Communications Desk**: Instant group chat to align shift objectives and resolve reservations or floor tasks on the go.

### 3. 🤝 Key Account Manager / Agency Portal (`Agency`)
An specialized CRM hub for dedicated staffing coordinators or internal HR service agency officers (KAMs).
- **Client Health Monitor**: Live overview of managed client sites, staff counts, core account managers, and renewal statistics.
- **Urgent Ticket Resolution**: Immediate priority markers for unresolved payroll discrepancy queries or urgent staff deficits.
- **Bespoke Staff Routing Desk**: Smooth communication streams between venue managers and account coordinators.

---

## 🧠 Smart Gemini AI Capabilities

Powered by the state-of-the-art `@google/genai` Integration layer, TalentPlate automates tedious, manual HR tasks:

```
                      ┌───────────────────────┐
                      │    Gemini AI Engine   │
                      │  (gemini-2.5-flash)   │
                      └───────────┬───────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│  Smart Roster   │      │ SOPs & Policies │      │ Feedback Mood   │
│ Staffing Engine │      │   Generator     │      │ Sentiment Radar │
└─────────────────┘      └─────────────────┘      └─────────────────┘
```

* **Intelligent Staffing Rosters**: Generates customized shift lineups optimized for forecasted sales spikes, banquets, and high-footfall hours.
* **Instant SOP & Policy Drafter**: Generates industry-compliant Standard Operating Procedures (SOPs), Job Descriptions (JDs), and customized HR policies in seconds.
* **Sentiment Feedback Radar**: Examines handwritten employee commentary to diagnose deep-seated morale issues and generates proactive intervention steps.

---

## 🛠️ Technology Stack

* **Core Framework**: React 19 / TypeScript 5.x
* **Build System**: Vite 6.x (Fast, lightweight, Hot-Reload enabled)
* **Design & Styling**: Tailwind CSS (Predefined mobile-first responsiveness, custom layout animations)
* **Interactive Visualizations**: Recharts / D3
* **AI Integration**: Google GenAI SDK (`@google/genai`)
* **Icons Elements**: Lucide React

---

## 💻 Getting Started and Installation

### 1. Prerequisites
Ensure you have `Node.js` (v18.x or newer) and `npm` installed.

### 2. Clone the Repository
```bash
git clone https://github.com/your-username/talentplate.git
cd talentplate
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a file named `.env` in the root folder and add your Google Gemini API key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 5. Start Open Development Server
Run the local dev command. The application is pre-bound and configured to expose cleanly:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) inside your web browser to play around.

### 6. Build for Production
To bundle and optimize the files for a production-ready CDN or static server:
```bash
npm run build
```
Outputs are compiled into the `/dist` directory.

---

## 📂 Codebase Directory Overview

```
├── components/          # Reusable view workspaces & components
│   ├── Landing.tsx      # Core promotional Landing page & navigation
│   ├── Dashboard.tsx    # Owner workspace and Gemini assistant forms
│   ├── Workforce.tsx    # Frontline phone simulator & employee logs
│   ├── Agency.tsx       # B2B Client agency hub & ticket managers
│   ├── Login.tsx        # Multi-role authentication selector
│   └── Icons.tsx        # Structured SVG Vector elements wrapper
├── services/
│   └── geminiService.ts # Google GenAI SDK model connector initialization
├── App.tsx              # Application core container & router state managers
├── index.html           # Root entry point markup
├── types.ts             # Shared database interfaces and structures
├── vite.config.ts       # Module aliases and port binding configurations
└── metadata.json        # Main Application Capabilities configuration
```

---

## 📄 License

This software is distributed under the private proprietary license. All rights reserved. Designed specifically for next-generation hospitality service groups.
