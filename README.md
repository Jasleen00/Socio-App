# B Socio // AI Lead Scoring Engine

B Socio is a specialized outbound business intelligence dashboard designed to score local business leads based on their digital maturity and generate localized, high-converting outreach message templates. 

Built as a futuristic, glassmorphism dark-themed dashboard using **Vite**, **React**, and **Tailwind CSS**, B Socio enables marketing freelancers and sales development reps (SDRs) to audit, qualify, and message prospects directly.

---

## ⚡ Key Features

* **🌐 20 Region-Locked National Locales**: Embedded database of Arab League (Morocco, UAE, Saudi Arabia, Egypt, Algeria, Kuwait, Qatar, Oman, Jordan, Lebanon, Tunisia, Bahrain) and major global commerce regions (India, US, UK, Germany, France, Australia, Canada, Singapore) with emojis, localized greetings (*Namaste, Salam, Ahlan, Bonjour, G'day*), and market contexts.
* **📱 Smart Phone Synchronization & Paste Parser**:
  * Selecting a country automatically switches active dial codes and phone placeholders.
  * Pasting a number containing an international prefix (e.g. `+971...`) triggers a parsing detector that auto-selects the country dropdown and formats input display.
* **🔍 Multi-Factor Technical Audit & Scoring**:
  * Scans web links to flag security vulnerabilities (unsecure `http://` configurations penalize opportunity metrics by +8 pts).
  * Scans reviews and rating scales to highlight deficiencies.
  * Notes and findings are parsed in real-time for keywords like `slow`, `unresponsive`, `broken`, `no cta` to automatically adjust lead visibility priority.
* **🏷️ Rapid Annotation Audit Tags**: Group of clickable diagnostic labels (e.g. `+ Unsecured http`, `+ Slow load speed`) to append notes and update scores instantly without typing.
* **💬 Multi-Tone AI Outreach Copywriter**: Real-time message template compilation with 4 selectable tones (**Friendly, Professional, Analytical, and Urgent**).
* **📊 Visual Ratios & Pipeline Analytics**: Interactive distribution graphs representing category segments and outreach statuses.
* **📋 Data Utilities**: Real-time searching, sorting, loading mock data seeds, and exporting current leads to CSV.

---

## 🛠️ Built With

* **Core**: React 18.3.1
* **Build System**: Vite 5.2+
* **Styling**: Tailwind CSS & Vanilla CSS Transitions
* **Icons**: Lucide React

---

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Jasleen00/Socio-App.git
   ```
2. Navigate to the project root:
   ```bash
   cd Socio-App
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the Vite development server:
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Building for Production

To compile files and output optimized code to the `dist/` directory:
```bash
npm run build
```
Preview the compiled bundle:
```bash
npm run preview
```

---

## 📂 Project Structure

```text
Socio-App/
├── src/
│   ├── App.jsx       # Diagnostic logic, form states & glassmorphic UI components
│   ├── main.jsx      # Rendering entrypoint
│   └── index.css     # Tailwind imports and custom gauge transitions
├── index.html        # HTML envelope & core typography fonts
├── tailwind.config.js
└── package.json
```
