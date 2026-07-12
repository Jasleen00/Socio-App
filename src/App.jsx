import React, { useState, useEffect } from 'react';
import { 
  Store, 
  MapPin, 
  Instagram, 
  Globe, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Search, 
  Sparkles, 
  Copy, 
  Check, 
  ChevronRight, 
  FileSpreadsheet, 
  Database, 
  Info, 
  AlertCircle,
  Zap,
  Flame,
  TrendingUp,
  RefreshCw,
  Sliders,
  CheckCircle2,
  Phone,
  User,
  Map,
  Tag
} from 'lucide-react';

// Seed Mock Data
const INITIAL_SEED_LEADS = [
  {
    id: "seed-1",
    businessName: "Slice & Dice Pizza",
    category: "Cafe",
    city: "Chicago",
    country: "International",
    phone: "+1 312-555-0144",
    leadCreatedBy: "System Seed",
    websiteLink: "",
    instagramLink: "https://instagram.com/slice_dice_pizza",
    googleMapsLink: "https://maps.google.com/?q=Slice+and+Dice+Pizza+Chicago",
    websiteStatus: "none",
    googleRating: 3.8,
    isWhatsAppAvailable: false,
    followUpStatus: "New",
    notes: "Haven't posted on IG in 3 months. Website is missing completely. Need to set up basic web presence.",
    score: 95,
    priority: "Hot",
    recommendedService: "Premium Web Development & Conversion Funnel Setup",
    generatedDM: "Hey Slice & Dice Pizza team! 👋 Stumbled upon your page and love the work you are doing in Chicago. Looking at your local region's growing market, we noticed some huge potential for growth, specifically regarding not having an online web presence. At B Socio, we specialize in Premium Web Development & Conversion Funnel Setup for Cafe & Restaurant brands to help double customer traffic and search visibility. Drop us a quick reply if you're open to a free 3-minute custom audit breakdown we created for you!"
  },
  {
    id: "seed-2",
    businessName: "Pulse Fitness Gym",
    category: "Gym",
    city: "Miami",
    country: "International",
    phone: "+1 305-555-0199",
    leadCreatedBy: "System Seed",
    websiteLink: "https://pulsefitnessgym.com",
    instagramLink: "https://instagram.com/pulse_miami",
    googleMapsLink: "https://maps.google.com/?q=Pulse+Fitness+Gym+Miami",
    websiteStatus: "poor",
    googleRating: 4.2,
    isWhatsAppAvailable: true,
    followUpStatus: "Contacted",
    notes: "Their main website page returns layout errors on iPhones. Slider isn't working.",
    score: 30,
    priority: "Cold",
    recommendedService: "Vite-React Speed Redesign & SEO Overhaul",
    generatedDM: "Hey Pulse Fitness Gym team! 👋 Stumbled upon your page and love the work you are doing in Miami. Looking at your local region's growing market, we noticed some huge potential for growth, specifically regarding a slow-loading, unoptimized website layout. At B Socio, we specialize in Vite-React Speed Redesign & SEO Overhaul for Fitness Gyms and Athletic centers to help double customer traffic and search visibility. Drop us a quick reply if you're open to a free 3-minute custom audit breakdown we created for you!"
  },
  {
    id: "seed-3",
    businessName: "Elite Realty Partners",
    category: "Real Estate",
    city: "Austin",
    country: "International",
    phone: "+1 512-555-0177",
    leadCreatedBy: "System Seed",
    websiteLink: "https://eliterealtypartners.com",
    instagramLink: "https://instagram.com/elite_realty_austin",
    googleMapsLink: "https://maps.google.com/?q=Elite+Realty+Partners+Austin",
    websiteStatus: "good",
    googleRating: 4.8,
    isWhatsAppAvailable: false,
    followUpStatus: "Interested",
    notes: "Great ratings, website is modern. But missing WhatsApp direct support widget.",
    score: 20,
    priority: "Cold",
    recommendedService: "WhatsApp Automation & CRM Pipeline Setup",
    generatedDM: "Hey Elite Realty Partners team! 👋 Stumbled upon your page and love the work you are doing in Austin. Looking at your local region's growing market, we noticed some huge potential for growth, specifically regarding leakage in your lead conversion funnel. At B Socio, we specialize in WhatsApp Automation & CRM Pipeline Setup for Real Estate Brokerages to help double customer traffic and search visibility. Drop us a quick reply if you're open to a free 3-minute custom audit breakdown we created for you!"
  },
  {
    id: "seed-4",
    businessName: "Glow Boutique",
    category: "Retail",
    city: "Los Angeles",
    country: "International",
    phone: "+1 213-555-0155",
    leadCreatedBy: "System Seed",
    websiteLink: "https://glowboutiquela.com",
    instagramLink: "https://instagram.com/glow_la",
    googleMapsLink: "https://maps.google.com/?q=Glow+Boutique+Los+Angeles",
    websiteStatus: "poor",
    googleRating: 3.9,
    isWhatsAppAvailable: false,
    followUpStatus: "Converted",
    notes: "Inactive social page, feed is quiet. Website checkout has bugs.",
    score: 45,
    priority: "Warm",
    recommendedService: "Vite-React Speed Redesign & SEO Overhaul",
    generatedDM: "Hey Glow Boutique team! 👋 Stumbled upon your page and love the work you are doing in Los Angeles. Looking at your local region's growing market, we noticed some huge potential for growth, specifically regarding a slow-loading, unoptimized website layout. At B Socio, we specialize in Vite-React Speed Redesign & SEO Overhaul for Boutique Retail stores to help double customer traffic and search visibility. Drop us a quick reply if you're open to a free 3-minute custom audit breakdown we created for you!"
  },
  {
    id: "seed-5",
    businessName: "Chai Shai Cafe",
    category: "Cafe",
    city: "Mumbai",
    country: "India",
    phone: "+91 98765 43210",
    leadCreatedBy: "System Seed",
    websiteLink: "",
    instagramLink: "https://instagram.com/chaishaimumbai",
    googleMapsLink: "https://maps.google.com/?q=Chai+Shai+Mumbai",
    websiteStatus: "none",
    googleRating: 4.1,
    isWhatsAppAvailable: true,
    followUpStatus: "New",
    notes: "Very active food posts but missing website completely. Needs reservation and delivery setup.",
    score: 55,
    priority: "Warm",
    recommendedService: "Premium Web Development & Conversion Funnel Setup",
    generatedDM: "Namaste Chai Shai Cafe team! 👋 Stumbled upon your page and love the work you are doing in Mumbai. Looking at India's hyper-competitive local market, we noticed some huge potential for growth, specifically regarding not having an online web presence. At B Socio, we specialize in Premium Web Development & Conversion Funnel Setup for Cafe & Restaurant brands to help double customer traffic and search visibility. Drop us a quick reply if you're open to a free 3-minute custom audit breakdown we created for you!"
  },
  {
    id: "seed-6",
    businessName: "Atlas Gyms Marrakesh",
    category: "Gym",
    city: "Marrakesh",
    country: "Morocco",
    phone: "+212 661-123456",
    leadCreatedBy: "System Seed",
    websiteLink: "https://atlasgyms.ma",
    instagramLink: "",
    googleMapsLink: "https://maps.google.com/?q=Atlas+Gyms+Marrakesh",
    websiteStatus: "good",
    googleRating: 4.4,
    isWhatsAppAvailable: false,
    followUpStatus: "Contacted",
    notes: "Good website but completely missing Instagram page. Could double membership through social media campaigns.",
    score: 40,
    priority: "Cold",
    recommendedService: "Social Media Marketing & Instagram Growth Retainer",
    generatedDM: "Bonjour/Salam Atlas Gyms Marrakesh team! 👋 Stumbled upon your page and love the work you are doing in Marrakesh. Looking at the rapid expansion of local commerce in Morocco, we noticed some huge potential for growth, specifically regarding the complete absence of an Instagram channel. At B Socio, we specialize in Social Media Marketing & Instagram Growth Retainer for Fitness Gyms and Athletic centers to help double customer traffic and search visibility. Drop us a quick reply if you're open to a free 3-minute custom audit breakdown we created for you!"
  }
];

export default function App() {
  // Leads Database State
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('bsocio-leads');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Backfill new fields for compatibility
        return parsed.map(lead => ({
          country: 'India',
          phone: '',
          leadCreatedBy: 'Admin',
          websiteLink: '',
          googleMapsLink: '',
          followUpStatus: 'New',
          ...lead
        }));
      } catch (e) {
        return INITIAL_SEED_LEADS;
      }
    }
    return INITIAL_SEED_LEADS;
  });

  // Intake Form Inputs State
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'Cafe',
    city: '',
    country: 'India',
    phone: '',
    leadCreatedBy: '',
    websiteLink: '',
    instagramLink: '',
    googleMapsLink: '',
    websiteStatus: 'none',
    googleRating: 3.8,
    isWhatsAppAvailable: true,
    followUpStatus: 'New',
    notes: ''
  });

  // Active Scorecard / Focus Lead View State
  const [selectedLead, setSelectedLead] = useState(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Copy Clipboard Toast State
  const [copiedState, setCopiedState] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Persist leads state
  useEffect(() => {
    localStorage.setItem('bsocio-leads', JSON.stringify(leads));
  }, [leads]);

  // Set default selected lead on load if available
  useEffect(() => {
    if (leads.length > 0 && !selectedLead) {
      setSelectedLead(leads[0]);
    }
  }, [leads, selectedLead]);

  // Helper: Live calculations for lead data
  const calculateLeadMetrics = (data) => {
    let websitePoints = 0;
    let ratingPoints = 0;
    let socialPoints = 0;
    let whatsappPoints = 0;

    // 1. Website Status & link Points (Max 30)
    if (data.websiteStatus === 'none' || !data.websiteLink || data.websiteLink.trim() === '') {
      websitePoints = 30;
    } else if (data.websiteStatus === 'poor') {
      websitePoints = 15;
    }

    // 2. Google Rating & Maps Link Points (Max 25)
    let googleMapsPoints = 0;
    if (!data.googleMapsLink || data.googleMapsLink.trim() === '') {
      googleMapsPoints += 15;
    }
    const rating = parseFloat(data.googleRating) || 0;
    if (rating < 4.0) {
      ratingPoints = 10;
    } else if (rating >= 4.0 && rating <= 4.5) {
      ratingPoints = 5;
    }
    const totalMapsAndRating = googleMapsPoints + ratingPoints;

    // 3. Instagram presence & activity Points (Max 25)
    const notesLower = (data.notes || '').toLowerCase();
    const hasLowSocialKeywords = ['inactive', 'no posts', 'slow', 'missing', 'quiet', "haven't posted", "3 months"].some(kw => notesLower.includes(kw));

    if (!data.instagramLink || data.instagramLink.trim() === '') {
      socialPoints = 20;
    } else if (hasLowSocialKeywords) {
      socialPoints = 10;
    } else {
      socialPoints = 5;
    }

    // 4. WhatsApp / Phone Availability & setup (Max 20)
    if (!data.phone || data.phone.trim() === '') {
      whatsappPoints = 15;
    } else if (!data.isWhatsAppAvailable) {
      whatsappPoints = 10;
    } else {
      whatsappPoints = 5;
    }

    // Total clamped Score (0 - 100)
    const score = Math.min(100, Math.max(0, websitePoints + totalMapsAndRating + socialPoints + whatsappPoints));

    // Priority Status
    let priority = 'Cold';
    if (score >= 75) priority = 'Hot';
    else if (score >= 45) priority = 'Warm';

    // Tailored pitch recommendation
    let recommendedService = 'Full-Suite Local Expansion Setup';
    if (data.websiteStatus === 'none' || !data.websiteLink || data.websiteLink.trim() === '') {
      recommendedService = 'Premium Web Development & Conversion Funnel Setup';
    } else if (data.websiteStatus === 'poor') {
      recommendedService = 'Vite-React Speed Redesign & SEO Overhaul';
    } else if (!data.instagramLink || data.instagramLink.trim() === '' || hasLowSocialKeywords) {
      recommendedService = 'Social Media Marketing & Instagram Growth Retainer';
    } else if (!data.googleMapsLink || data.googleMapsLink.trim() === '' || rating < 4.2) {
      recommendedService = 'Google Maps GMB Listing & Reputation Management';
    } else if (!data.isWhatsAppAvailable) {
      recommendedService = 'WhatsApp Automation & CRM Pipeline Setup';
    }

    // Set up customized Greetings based on country
    let greeting = 'Hey';
    let countryNotes = '';
    if (data.country === 'India') {
      greeting = 'Namaste';
      countryNotes = 'India\'s hyper-competitive local market';
    } else if (data.country === 'Morocco') {
      greeting = 'Bonjour/Salam';
      countryNotes = 'the rapid expansion of local commerce in Morocco';
    } else {
      greeting = 'Hey';
      countryNotes = 'your local region\'s growing market';
    }

    // Set up category details
    let categoryTarget = 'businesses';
    if (data.category === 'Cafe') categoryTarget = 'Cafe & Restaurant brands';
    else if (data.category === 'Gym') categoryTarget = 'Fitness Gyms and Athletic centers';
    else if (data.category === 'Retail') categoryTarget = 'Boutique Retail stores';
    else if (data.category === 'Real Estate') categoryTarget = 'Real Estate Brokerages';
    else if (data.category === 'E-commerce') categoryTarget = 'Direct-to-Consumer e-commerce brands';
    else if (data.category === 'Local Service') categoryTarget = 'Local service agencies';

    // Set up gap description
    let gapDescription = '';
    if (data.websiteStatus === 'none' || !data.websiteLink || data.websiteLink.trim() === '') {
      gapDescription = 'not having an online web presence';
    } else if (data.websiteStatus === 'poor') {
      gapDescription = 'a slow-loading, unoptimized website layout';
    } else if (!data.instagramLink || data.instagramLink.trim() === '') {
      gapDescription = 'the complete absence of an Instagram channel';
    } else if (!data.googleMapsLink || data.googleMapsLink.trim() === '') {
      gapDescription = 'an unoptimized local Google Maps search listing';
    } else {
      gapDescription = 'leakage in your lead conversion funnel';
    }

    let extraNoteText = '';
    if (data.notes && data.notes.trim().length > 5) {
      extraNoteText = ` Specifying on the notes: our review flagged issues: "${data.notes.slice(0, 80)}...".`;
    }

    const generatedDM = `${greeting} ${data.businessName || '[Business Name]'} team! 👋 Stumbled upon your page and love the work you are doing in ${data.city || '[City]'}. Looking at ${countryNotes}, we noticed some huge potential for growth, specifically regarding ${gapDescription}.${extraNoteText} At B Socio, we specialize in ${recommendedService} for ${categoryTarget} to help double customer traffic and search visibility. Drop us a quick reply if you're open to a free 3-minute custom audit breakdown we created for you!`;

    return {
      score,
      priority,
      recommendedService,
      generatedDM,
      breakdown: {
        website: websitePoints,
        rating: ratingPoints,
        socials: socialPoints,
        whatsapp: whatsappPoints
      }
    };
  };

  // Live preview metrics of currently editing form
  const liveMetrics = calculateLeadMetrics(formData);

  // Form input change handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Slider change helper
  const handleRatingChange = (val) => {
    setFormData(prev => ({
      ...prev,
      googleRating: val
    }));
  };

  // Submit Handler: Log lead to database
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessName.trim() || !formData.city.trim()) {
      showToast('Please fill out all required fields!');
      return;
    }

    const calculated = calculateLeadMetrics(formData);
    const newLead = {
      id: `lead-${Date.now()}`,
      ...formData,
      ...calculated
    };

    setLeads(prev => [newLead, ...prev]);
    setSelectedLead(newLead);
    resetForm();
    showToast('Lead evaluated and logged successfully!');
  };

  // Reset form inputs
  const resetForm = () => {
    setFormData({
      businessName: '',
      category: 'Cafe',
      city: '',
      country: 'India',
      phone: '',
      leadCreatedBy: '',
      websiteLink: '',
      instagramLink: '',
      googleMapsLink: '',
      websiteStatus: 'none',
      googleRating: 3.8,
      isWhatsAppAvailable: true,
      followUpStatus: 'New',
      notes: ''
    });
  };

  // Copy DM to clipboard action
  const handleCopyDM = (text) => {
    if (!text || text.includes('[Business Name]')) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2000);
      showToast('DM message copied to clipboard!');
    });
  };

  // Delete lead handler
  const handleDeleteLead = (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this lead?')) {
      const updated = leads.filter(l => l.id !== id);
      setLeads(updated);
      if (selectedLead && selectedLead.id === id) {
        setSelectedLead(updated.length > 0 ? updated[0] : null);
      }
      showToast('Lead removed from history.');
    }
  };

  // Load Seed database
  const handleLoadSeedData = () => {
    // Avoid double seeding
    const uniqueSeeds = INITIAL_SEED_LEADS.filter(seed => 
      !leads.some(l => l.businessName.toLowerCase() === seed.businessName.toLowerCase())
    );

    if (uniqueSeeds.length === 0) {
      showToast('Demo records already exist in database!');
      return;
    }

    const merged = [...uniqueSeeds, ...leads];
    setLeads(merged);
    setSelectedLead(merged[0]);
    showToast(`Loaded ${uniqueSeeds.length} demo records!`);
  };

  // Clear all leads
  const handleClearAll = () => {
    if (confirm('Clear all logs? This cannot be undone.')) {
      setLeads([]);
      setSelectedLead(null);
      showToast('Database wiped.');
    }
  };

  // Export CSV handler
  const handleExportCSV = () => {
    if (leads.length === 0) {
      showToast('No leads available to export!');
      return;
    }

    let csv = 'Business Name,Category,Country,City,Phone,Lead Created By,Website Link,Instagram Link,Google Maps Link,Website Status,Google Rating,WhatsApp,Score,Priority,Follow-up Status,Pitch Service\n';
    leads.forEach(l => {
      csv += `"${l.businessName.replace(/"/g, '""')}",`;
      csv += `"${l.category}",`;
      csv += `"${(l.country || 'India').replace(/"/g, '""')}",`;
      csv += `"${l.city.replace(/"/g, '""')}",`;
      csv += `"${(l.phone || '').replace(/"/g, '""')}",`;
      csv += `"${(l.leadCreatedBy || '').replace(/"/g, '""')}",`;
      csv += `"${(l.websiteLink || '').replace(/"/g, '""')}",`;
      csv += `"${(l.instagramLink || '').replace(/"/g, '""')}",`;
      csv += `"${(l.googleMapsLink || '').replace(/"/g, '""')}",`;
      csv += `"${l.websiteStatus}",`;
      csv += `${l.googleRating},`;
      csv += `"${l.isWhatsAppAvailable ? 'Yes' : 'No'}",`;
      csv += `${l.score},`;
      csv += `"${l.priority}",`;
      csv += `"${(l.followUpStatus || 'New').replace(/"/g, '""')}",`;
      csv += `"${l.recommendedService.replace(/"/g, '""')}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `bsocio_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported CSV file!');
  };

  // Load a lead from history back into editing form
  const handleLoadLeadToForm = (lead) => {
    setFormData({
      businessName: lead.businessName,
      category: lead.category,
      city: lead.city,
      country: lead.country || 'India',
      phone: lead.phone || '',
      leadCreatedBy: lead.leadCreatedBy || '',
      websiteLink: lead.websiteLink || '',
      instagramLink: lead.instagramLink || '',
      googleMapsLink: lead.googleMapsLink || '',
      websiteStatus: lead.websiteStatus,
      googleRating: lead.googleRating,
      isWhatsAppAvailable: lead.isWhatsAppAvailable,
      followUpStatus: lead.followUpStatus || 'New',
      notes: lead.notes || ''
    });
    showToast('Loaded lead back to editor!');
  };

  // Notification Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    // Auto clear toast
    const tm = setTimeout(() => setToastMessage(''), 3000);
    return () => clearTimeout(tm);
  };

  // Filtered Leads list computed properties
  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.businessName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          l.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (l.notes || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || l.category === filterCategory;
    const matchesPriority = filterPriority === 'All' || l.priority === filterPriority;
    const matchesStatus = filterStatus === 'All' || (l.followUpStatus || 'New') === filterStatus;
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  // Statistics computations
  const totalCount = leads.length;
  const hotCount = leads.filter(l => l.priority === 'Hot').length;
  const averageScore = totalCount > 0 ? Math.round(leads.reduce((sum, curr) => sum + curr.score, 0) / totalCount) : 0;
  const webIssuesCount = leads.filter(l => l.websiteStatus === 'none' || l.websiteStatus === 'poor').length;

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans transition-colors duration-350">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 border border-slate-800 text-white font-bold py-3 px-5 rounded-xl shadow-2xl flex items-center space-x-3 text-xs sm:text-sm animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sleek Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent">
                B Socio // AI Lead Scoring Engine
              </h1>
              <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Outreach Automation and Pitch Qualification</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping"></span>
              <span>LIVE SCORING</span>
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col space-y-6">

        {/* Dashboard Top Stats Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-905 bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex items-center space-x-3.5 shadow-sm hover:border-slate-700/50 transition-colors">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Total Leads</p>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white">{totalCount}</h3>
            </div>
          </div>
          <div className="bg-slate-905 bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex items-center space-x-3.5 shadow-sm hover:border-slate-700/50 transition-colors">
            <div className="p-3 bg-rose-500/10 text-rose-400 rounded-xl">
              <Flame className="w-5 h-5 fill-rose-500/10 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Hot Priority</p>
              <h3 className="text-xl sm:text-2xl font-black font-display text-rose-450 text-rose-455 text-rose-400">{hotCount}</h3>
            </div>
          </div>
          <div className="bg-slate-905 bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex items-center space-x-3.5 shadow-sm hover:border-slate-700/50 transition-colors">
            <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Avg Lead Score</p>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white">{averageScore}%</h3>
            </div>
          </div>
          <div className="bg-slate-905 bg-slate-900/40 border border-slate-800/60 p-4 rounded-2xl flex items-center space-x-3.5 shadow-sm hover:border-slate-700/50 transition-colors">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Needs Web/SEO</p>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white">{webIssuesCount}</h3>
            </div>
          </div>
        </section>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Intake Form (5 cols) */}
          <section className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4.5 h-4.5 text-indigo-400" />
                <h2 className="font-display font-bold text-base">Lead Intake Data</h2>
              </div>
              <button 
                type="button" 
                onClick={resetForm}
                className="text-[10px] font-semibold text-slate-500 hover:text-rose-400 transition-colors"
              >
                Reset Inputs
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Business Name */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Business Name *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                    <Store className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="e.g. Slice & Dice Pizza"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors font-medium text-slate-200"
                  />
                </div>
              </div>

              {/* Category & Country */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors font-medium text-slate-200"
                  >
                    <option value="Cafe">Cafe</option>
                    <option value="Gym">Gym</option>
                    <option value="Retail">Retail</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Local Service">Local Service</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Target Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors font-medium text-slate-200"
                  >
                    <option value="India">India 🇮🇳</option>
                    <option value="Morocco">Morocco 🇲🇦</option>
                    <option value="International">International 🌐</option>
                  </select>
                </div>
              </div>

              {/* City & Created By */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">City *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                      <MapPin className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai or Chicago"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors font-medium text-slate-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Lead Created By</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      type="text"
                      name="leadCreatedBy"
                      value={formData.leadCreatedBy}
                      onChange={handleInputChange}
                      placeholder="e.g. Jasleen"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors font-medium text-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* Phone / WhatsApp Number */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Phone / WhatsApp Number</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                    <Phone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={
                      formData.country === 'India' ? 'e.g. +91 98765 43210' :
                      formData.country === 'Morocco' ? 'e.g. +212 661-123456' :
                      'e.g. +1 555-0199 (Intl Number)'
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors font-medium text-slate-200"
                  />
                </div>
              </div>

              {/* Presence / Links Group */}
              <div className="space-y-2.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Digital Presence Links</label>
                
                {/* Website Link */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                    <Globe className="w-4 h-4" />
                  </span>
                  <input
                    type="url"
                    name="websiteLink"
                    value={formData.websiteLink}
                    onChange={handleInputChange}
                    placeholder="Website Link (e.g. https://mybusiness.com)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors font-medium text-slate-200"
                  />
                </div>

                {/* Instagram Link */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                    <Instagram className="w-4 h-4" />
                  </span>
                  <input
                    type="url"
                    name="instagramLink"
                    value={formData.instagramLink}
                    onChange={handleInputChange}
                    placeholder="Instagram Link (e.g. https://instagram.com/mybusiness)"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors font-medium text-slate-200"
                  />
                </div>

                {/* Google Maps Link */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                    <Map className="w-4 h-4" />
                  </span>
                  <input
                    type="url"
                    name="googleMapsLink"
                    value={formData.googleMapsLink}
                    onChange={handleInputChange}
                    placeholder="Google Maps Location Link"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors font-medium text-slate-200"
                  />
                </div>
              </div>

              {/* Website Status & Follow-up Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Website Status *</label>
                  <select
                    name="websiteStatus"
                    value={formData.websiteStatus}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors font-medium text-slate-200"
                  >
                    <option value="none">No Website</option>
                    <option value="poor">Poor/Outdated</option>
                    <option value="good">Good Website</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Follow-up Status *</label>
                  <select
                    name="followUpStatus"
                    value={formData.followUpStatus}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors font-medium text-slate-200"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Converted">Converted</option>
                  </select>
                </div>
              </div>

              {/* Google Rating Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Google Reviews Rating</label>
                  <span className="text-[10px] font-bold text-indigo-400">{formData.googleRating} ★</span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  name="googleRating"
                  value={formData.googleRating}
                  onChange={(e) => handleRatingChange(parseFloat(e.target.value))}
                  className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-2"
                />
              </div>

              {/* WhatsApp Toggle */}
              <div className="flex items-center justify-between bg-slate-950/50 p-3 rounded-xl border border-slate-850">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-350">WhatsApp Active?</span>
                  <span className="text-[9px] text-slate-500">Number set up on WhatsApp</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isWhatsAppAvailable"
                    checked={formData.isWhatsAppAvailable}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4.5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {/* Notes */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Audits & Notes</label>
                  {['inactive', 'no posts', 'slow', 'missing', 'quiet'].some(kw => formData.notes.toLowerCase().includes(kw)) && (
                    <span className="text-[9px] font-bold text-teal-400 flex items-center animate-pulse">
                      <Sparkles className="w-3 h-3 mr-1" /> Low Social Presence Detected
                    </span>
                  )}
                </div>
                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Website loads slowly. No posts on Instagram feed for 3 months."
                  className="w-full bg-slate-950 border border-slate-805 border-slate-800 rounded-xl py-2 px-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-colors font-medium text-slate-200 placeholder-slate-600"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-glow-indigo flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Evaluate & Log Lead</span>
              </button>
            </form>
          </section>

          {/* RIGHT: Selected Scorecard & Leads History (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">

            {/* Focal Scorecard Card */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center space-x-2 border-b border-slate-800 pb-3 mb-4">
                <Sparkles className="w-4.5 h-4.5 text-indigo-400" />
                <h2 className="font-display font-bold text-base">
                  Active Lead Report: <span className="text-slate-400">{selectedLead ? selectedLead.businessName : 'Pending Form Input'}</span>
                </h2>
              </div>

              {selectedLead && (
                <div className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs text-slate-400 mb-5 px-1">
                  <span className="flex items-center space-x-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-850">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{selectedLead.city}, {selectedLead.country}</span>
                  </span>
                  <span className="flex items-center space-x-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-850">
                    <Tag className="w-3.5 h-3.5 text-teal-400" />
                    <span>{selectedLead.category}</span>
                  </span>
                  {selectedLead.leadCreatedBy && (
                    <span className="flex items-center space-x-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-850">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>By: {selectedLead.leadCreatedBy}</span>
                    </span>
                  )}
                  {selectedLead.phone && (
                    <span className="flex items-center space-x-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-850">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{selectedLead.phone}</span>
                    </span>
                  )}
                </div>
              )}

              {selectedLead ? (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Gauge & Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    
                    {/* Score SVG circle (4 cols) */}
                    <div className="sm:col-span-4 flex flex-col items-center text-center">
                      <div className="relative w-32 h-32 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="64" cy="64" r="54" strokeWidth="8" stroke="#1e293b" fill="transparent"></circle>
                          <circle 
                            cx="64" 
                            cy="64" 
                            r="54" 
                            strokeWidth="9" 
                            stroke={
                              selectedLead.priority === 'Hot' ? '#ef4444' : 
                              selectedLead.priority === 'Warm' ? '#f59e0b' : '#3b82f6'
                            } 
                            fill="transparent"
                            strokeDasharray="339"
                            strokeDashoffset={((100 - selectedLead.score) / 100) * 339}
                            strokeLinecap="round"
                            className="gauge-circle"
                          ></circle>
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-3xl font-extrabold font-display text-white">{selectedLead.score}</span>
                          <span className="text-[8px] text-slate-500 uppercase tracking-widest font-semibold">Points</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-center mt-3">
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                          selectedLead.priority === 'Hot' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                          selectedLead.priority === 'Warm' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                          'bg-sky-500/10 text-sky-400 border-sky-500/20'
                        }`}>
                          <Flame className="w-3.5 h-3.5 fill-current" />
                          <span>{selectedLead.priority}</span>
                        </span>
                        
                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                          selectedLead.followUpStatus === 'Converted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                          selectedLead.followUpStatus === 'Interested' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 
                          selectedLead.followUpStatus === 'Contacted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                          selectedLead.followUpStatus === 'Not Interested' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                          'bg-slate-500/15 text-slate-350 border-slate-750'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{selectedLead.followUpStatus || 'New'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Breakdown & Recommendations (8 cols) */}
                    <div className="sm:col-span-8 flex flex-col space-y-4">
                      
                      {/* Metric Values Grid */}
                      <div className="grid grid-cols-2 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-850 text-[10px] sm:text-xs text-slate-400">
                        <div>
                          <span className="text-slate-500 block uppercase tracking-wider text-[8px] mb-0.5">Website</span>
                          <span className="font-bold text-slate-200 capitalize">{selectedLead.websiteLink ? 'Link Provided' : selectedLead.websiteStatus === 'none' ? 'No Website' : selectedLead.websiteStatus}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block uppercase tracking-wider text-[8px] mb-0.5">Google Reviews</span>
                          <span className="font-bold text-slate-200">{selectedLead.googleRating} / 5.0 ★</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block uppercase tracking-wider text-[8px] mb-0.5">WhatsApp Setup</span>
                          <span className="font-bold text-slate-200">{selectedLead.isWhatsAppAvailable ? 'Active Support' : 'Not Connected'}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block uppercase tracking-wider text-[8px] mb-0.5">Social Check</span>
                          <span className="font-bold text-slate-200">
                            {selectedLead.instagramLink ? (
                              ['inactive', 'no posts', 'slow', 'missing', 'quiet'].some(kw => (selectedLead.notes || '').toLowerCase().includes(kw)) ? 'Low Activity' : 'Active Channel'
                            ) : (
                              'No IG link'
                            )}
                          </span>
                        </div>
                      </div>

                      {/* Interactive links group */}
                      <div className="flex gap-2 text-[10px] uppercase font-bold tracking-wider">
                        {selectedLead.websiteLink ? (
                          <a href={selectedLead.websiteLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-950 hover:bg-slate-850 hover:text-white border border-slate-800 rounded-lg text-slate-400 transition-colors flex-1 justify-center">
                            <Globe className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Website</span>
                          </a>
                        ) : (
                          <span className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-950/20 border border-slate-900/60 rounded-lg text-slate-700/50 flex-1 justify-center select-none cursor-not-allowed">
                            <Globe className="w-3.5 h-3.5 text-slate-800" />
                            <span>No Web Link</span>
                          </span>
                        )}

                        {selectedLead.instagramLink ? (
                          <a href={selectedLead.instagramLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-950 hover:bg-slate-850 hover:text-white border border-slate-800 rounded-lg text-slate-400 transition-colors flex-1 justify-center">
                            <Instagram className="w-3.5 h-3.5 text-pink-400" />
                            <span>Instagram</span>
                          </a>
                        ) : (
                          <span className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-950/20 border border-slate-900/60 rounded-lg text-slate-700/50 flex-1 justify-center select-none cursor-not-allowed">
                            <Instagram className="w-3.5 h-3.5 text-slate-800" />
                            <span>No IG Link</span>
                          </span>
                        )}

                        {selectedLead.googleMapsLink ? (
                          <a href={selectedLead.googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-950 hover:bg-slate-850 hover:text-white border border-slate-800 rounded-lg text-slate-400 transition-colors flex-1 justify-center">
                            <Map className="w-3.5 h-3.5 text-teal-400" />
                            <span>Google Maps</span>
                          </a>
                        ) : (
                          <span className="flex items-center space-x-1 px-2.5 py-1.5 bg-slate-950/20 border border-slate-900/60 rounded-lg text-slate-700/50 flex-1 justify-center select-none cursor-not-allowed">
                            <Map className="w-3.5 h-3.5 text-slate-800" />
                            <span>No Maps</span>
                          </span>
                        )}
                      </div>

                      {/* Recommend service */}
                      <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/20 font-sans">
                        <span className="text-indigo-400 font-extrabold uppercase tracking-widest text-[8px] block mb-0.5">B SOCIO PITCH RECOMMENDATION</span>
                        <h4 className="font-display font-extrabold text-sm text-slate-100">{selectedLead.recommendedService}</h4>
                      </div>
                    </div>
                  </div>

                  {/* Generated DM Box */}
                  <div className="border-t border-slate-800/80 pt-4 flex flex-col space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center space-x-1">
                        <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                        <span>AI Personalized Pitch Outreach DM</span>
                      </span>
                      <span className="bg-slate-950 text-slate-500 px-2 py-0.5 rounded font-bold text-[9px]">{selectedLead.generatedDM.length} chars</span>
                    </div>

                    <div className="relative bg-slate-950 border border-slate-850 p-3.5 rounded-xl text-slate-300 text-xs leading-relaxed font-medium">
                      <p className="pr-10 whitespace-pre-wrap">{selectedLead.generatedDM}</p>
                      
                      <button 
                        type="button" 
                        onClick={() => handleCopyDM(selectedLead.generatedDM)}
                        className={`absolute top-2.5 right-2.5 p-2 rounded-lg border transition-all ${
                          copiedState 
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        }`}
                        title="Copy outreach text"
                      >
                        {copiedState ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    
                    <div className="flex justify-end space-x-1.5 pt-1">
                      <button 
                        type="button"
                        onClick={() => handleLoadLeadToForm(selectedLead)}
                        className="px-2.5 py-1 text-[9px] bg-slate-800 hover:bg-slate-750 text-slate-300 font-bold rounded-lg border border-slate-700/50 transition-colors uppercase"
                      >
                        Edit Inputs
                      </button>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="h-12 w-12 bg-slate-950 rounded-full flex items-center justify-center border border-slate-850 text-slate-600 mb-3 animate-pulse">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-450">No Evaluation Loaded</h4>
                  <p className="text-[10px] text-slate-650 max-w-xs mt-1">Submit the lead intake form or select a logged record from history database below to review scorecard analytics.</p>
                </div>
              )}
            </section>

            {/* History Table Log */}
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col space-y-4">
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-3 gap-3">
                <div className="flex items-center space-x-2">
                  <h2 className="font-display font-bold text-base">Leads History Log</h2>
                  <span className="bg-slate-950 text-slate-400 border border-slate-800 px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {filteredLeads.length} leads
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-1.5">
                  <button 
                    type="button" 
                    onClick={handleLoadSeedData}
                    className="p-1 px-2 text-[10px] bg-slate-950 hover:bg-slate-800 text-slate-350 hover:text-white rounded-lg border border-slate-805 border-slate-800 transition-colors flex items-center space-x-1"
                  >
                    <Database className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Load Demo</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={handleExportCSV}
                    className="p-1 px-2 text-[10px] bg-slate-950 hover:bg-slate-850 text-slate-350 hover:text-emerald-400 rounded-lg border border-slate-805 border-slate-800 transition-colors flex items-center space-x-1"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-450" />
                    <span>Export</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={handleClearAll}
                    className="p-1 px-2 text-[10px] bg-rose-950/20 hover:bg-rose-900/30 text-rose-400 rounded-lg border border-rose-900/30 transition-colors flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All</span>
                  </button>
                </div>
              </div>
                   {/* Filters toolbar */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-850 text-[10px] sm:text-xs">
                {/* Search */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-650 pointer-events-none">
                    <Search className="w-3.5 h-3.5 text-slate-500" />
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name or city..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 pl-8 pr-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Priority */}
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[9px]">Priority:</span>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="flex-grow bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="All">All Priority</option>
                    <option value="Hot">Hot</option>
                    <option value="Warm">Warm</option>
                    <option value="Cold">Cold</option>
                  </select>
                </div>

                {/* Category */}
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[9px]">Category:</span>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="flex-grow bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="All">All Category</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Gym">Gym</option>
                    <option value="Retail">Retail</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Local Service">All Services</option>
                  </select>
                </div>

                {/* Follow-up Status */}
                <div className="flex items-center space-x-2">
                  <span className="text-slate-500 font-semibold uppercase tracking-wider text-[9px]">Status:</span>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="flex-grow bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-2 text-xs text-slate-300 focus:outline-none"
                  >
                    <option value="All">All Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Converted">Converted</option>
                  </select>
                </div>
              </div>

              {/* Grid / List output */}
              <div className="max-h-80 overflow-y-auto border border-slate-850 rounded-xl">
                {filteredLeads.length > 0 ? (
                  <div className="divide-y divide-slate-850">
                    {filteredLeads.map((lead) => (
                      <div 
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className={`p-3.5 flex items-center justify-between hover:bg-slate-850/40 cursor-pointer transition-colors ${
                          selectedLead && selectedLead.id === lead.id ? 'bg-slate-850/60' : ''
                        }`}
                      >
                        <div className="space-y-1.5 pr-4 truncate flex-grow">
                          <div className="flex items-center space-x-2 truncate">
                            <h4 className="font-bold text-xs sm:text-sm text-slate-100 truncate">{lead.businessName}</h4>
                            <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border leading-none ${
                              lead.followUpStatus === 'Converted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                              lead.followUpStatus === 'Interested' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 
                              lead.followUpStatus === 'Contacted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                              lead.followUpStatus === 'Not Interested' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                              'bg-slate-950 text-slate-450 border-slate-800'
                            }`}>
                              {lead.followUpStatus || 'New'}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 text-[9px] text-slate-500 font-semibold tracking-wider uppercase">
                            <span>{lead.category}</span>
                            <span>•</span>
                            <span>{lead.city}, {lead.country || 'India'}</span>
                            {lead.leadCreatedBy && (
                              <>
                                <span>•</span>
                                <span className="text-indigo-400/80">By: {lead.leadCreatedBy}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 flex-shrink-0">
                          {/* Score and priority */}
                          <div className="text-right">
                            <span className="font-extrabold text-xs text-slate-200 block">{lead.score}/100</span>
                            <span className={`text-[8px] font-bold uppercase tracking-widest ${
                              lead.priority === 'Hot' ? 'text-rose-400' : 
                              lead.priority === 'Warm' ? 'text-amber-400' : 'text-sky-400'
                            }`}>
                              {lead.priority}
                            </span>
                          </div>

                          <ChevronRight className="w-4 h-4 text-slate-500" />
                          
                          <button 
                            type="button" 
                            onClick={(e) => handleDeleteLead(lead.id, e)}
                            className="p-1.5 hover:bg-rose-950/20 text-slate-500 hover:text-rose-400 rounded-lg transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 px-4 text-center">
                    <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <h4 className="font-bold text-xs text-slate-400">No matching leads found</h4>
                    <p className="text-[9px] text-slate-500 mt-0.5">Try widening your search terms or filters.</p>
                  </div>
                )}
              </div>

            </section>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-805 border-slate-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-display font-extrabold text-slate-350">B SOCIO</span>
            <span>© 2026. Automated outreach platform.</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Support Portal</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
