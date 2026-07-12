import React, { useState, useEffect, useMemo } from 'react';
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
  Tag,
  Send,
  HelpCircle,
  ShieldCheck,
  Smile
} from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Structured Database of Global and Arab League (AL) Countries
const COUNTRIES = [
  { name: 'India', flag: '🇮🇳', dialCode: '+91', greeting: 'Namaste', marketPhrase: 'India\'s hyper-competitive local market', phonePlaceholder: '98765 43210' },
  { name: 'Morocco', flag: '🇲🇦', dialCode: '+212', greeting: 'Bonjour/Salam', marketPhrase: 'the rapid expansion of local commerce in Morocco', phonePlaceholder: '661-123456' },
  { name: 'United Arab Emirates', flag: '🇦🇪', dialCode: '+971', greeting: 'Salam/Hey', marketPhrase: 'UAE\'s fast-paced digital business landscape', phonePlaceholder: '50 123 4567' },
  { name: 'Saudi Arabia', flag: '🇸🇦', dialCode: '+966', greeting: 'Salam/Ahlan', marketPhrase: 'Saudi Arabia\'s Vision 2030 digital expansion', phonePlaceholder: '50 123 4567' },
  { name: 'Egypt', flag: '🇪🇬', dialCode: '+20', greeting: 'Ahlan/Salam', marketPhrase: 'Egypt\'s booming local business and retail market', phonePlaceholder: '10 1234 5678' },
  { name: 'Algeria', flag: '🇩🇿', dialCode: '+213', greeting: 'Salam/Bonjour', marketPhrase: 'Algeria\'s growing local commercial sector', phonePlaceholder: '550 12 34 56' },
  { name: 'Kuwait', flag: '🇰🇼', dialCode: '+965', greeting: 'Salam', marketPhrase: 'Kuwait\'s rich commercial and retail sector', phonePlaceholder: '5123 4567' },
  { name: 'Qatar', flag: '🇶🇦', dialCode: '+974', greeting: 'Salam', marketPhrase: 'Qatar\'s premium sports, retail, and hospitality market', phonePlaceholder: '5512 3456' },
  { name: 'Oman', flag: '🇴🇲', dialCode: '+968', greeting: 'Salam', marketPhrase: 'Oman\'s expanding local trading and service sector', phonePlaceholder: '9123 4567' },
  { name: 'Jordan', flag: '🇯🇴', dialCode: '+962', greeting: 'Salam/Ahlan', marketPhrase: 'Jordan\'s active digital entrepreneurship ecosystem', phonePlaceholder: '7 9123 4567' },
  { name: 'Lebanon', flag: '🇱🇧', dialCode: '+961', greeting: 'Marhaban/Salam', marketPhrase: 'Lebanon\'s resilient commercial and service landscape', phonePlaceholder: '3 123 456' },
  { name: 'Tunisia', flag: '🇹🇳', dialCode: '+216', greeting: 'Salam/Bonjour', marketPhrase: 'Tunisia\'s expanding digital business sector', phonePlaceholder: '20 123 456' },
  { name: 'Bahrain', flag: '🇧🇭', dialCode: '+973', greeting: 'Salam', marketPhrase: 'Bahrain\'s booming local service and finance sector', phonePlaceholder: '3123 4567' },
  { name: 'United States', flag: '🇺🇸', dialCode: '+1', greeting: 'Hey', marketPhrase: 'the US highly competitive digital market', phonePlaceholder: '202-555-0144' },
  { name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44', greeting: 'Hello', marketPhrase: 'the UK\'s fast-moving local service industry', phonePlaceholder: '7911 123456' },
  { name: 'Germany', flag: '🇩🇪', dialCode: '+49', greeting: 'Hallo', marketPhrase: 'Germany\'s premium and detail-oriented local market', phonePlaceholder: '170 1234567' },
  { name: 'France', flag: '🇫🇷', dialCode: '+33', greeting: 'Bonjour', marketPhrase: 'France\'s active and sophisticated local business sector', phonePlaceholder: '6 12 34 56 78' },
  { name: 'Australia', flag: '🇦🇺', dialCode: '+61', greeting: 'G\'day/Hey', marketPhrase: 'Australia\'s growing regional local economy', phonePlaceholder: '412 345 678' },
  { name: 'Canada', flag: '🇨🇦', dialCode: '+1', greeting: 'Hey', marketPhrase: 'Canada\'s diverse and expanding local services market', phonePlaceholder: '416-555-0199' },
  { name: 'Singapore', flag: '🇸🇬', dialCode: '+65', greeting: 'Hello', marketPhrase: 'Singapore\'s mature and tech-forward business space', phonePlaceholder: '8123 4567' }
];

// Seed Mock Data
const INITIAL_SEED_LEADS = [
  {
    id: "seed-1",
    businessName: "Slice & Dice Pizza",
    category: "Cafe",
    city: "Chicago",
    country: "United States",
    phone: "312-555-0144",
    phoneCountryCode: "+1",
    leadCreatedBy: "System Seed",
    websiteLink: "",
    instagramLink: "https://instagram.com/slice_dice_pizza",
    googleMapsLink: "https://maps.google.com/?q=Slice+and+Dice+Pizza+Chicago",
    websiteStatus: "none",
    googleRating: 3.8,
    isWhatsAppAvailable: false,
    followUpStatus: "New",
    pitchTone: "friendly",
    notes: "Haven't posted on IG in 3 months. Website is missing completely. Need to set up basic web presence."
  },
  {
    id: "seed-2",
    businessName: "Pulse Fitness Gym",
    category: "Gym",
    city: "Miami",
    country: "United States",
    phone: "305-555-0199",
    phoneCountryCode: "+1",
    leadCreatedBy: "System Seed",
    websiteLink: "http://pulsefitnessgym.com", // Non-https triggers warning!
    instagramLink: "https://instagram.com/pulse_miami",
    googleMapsLink: "https://maps.google.com/?q=Pulse+Fitness+Gym+Miami",
    websiteStatus: "poor",
    googleRating: 4.2,
    isWhatsAppAvailable: true,
    followUpStatus: "Contacted",
    pitchTone: "analytical",
    notes: "Their main website page returns layout errors on iPhones. Website is not running on secure https:// connection."
  },
  {
    id: "seed-3",
    businessName: "Elite Realty Partners",
    category: "Real Estate",
    city: "Austin",
    country: "United States",
    phone: "512-555-0177",
    phoneCountryCode: "+1",
    leadCreatedBy: "System Seed",
    websiteLink: "https://eliterealtypartners.com",
    instagramLink: "https://instagram.com/elite_realty_austin",
    googleMapsLink: "https://maps.google.com/?q=Elite+Realty+Partners+Austin",
    websiteStatus: "good",
    googleRating: 4.8,
    isWhatsAppAvailable: false,
    followUpStatus: "Interested",
    pitchTone: "professional",
    notes: "Great ratings, website is modern. But missing WhatsApp direct support widget."
  },
  {
    id: "seed-4",
    businessName: "Glow Boutique",
    category: "Retail",
    city: "Los Angeles",
    country: "United States",
    phone: "213-555-0155",
    phoneCountryCode: "+1",
    leadCreatedBy: "System Seed",
    websiteLink: "https://glowboutiquela.com",
    instagramLink: "https://instagram.com/glow_la",
    googleMapsLink: "https://maps.google.com/?q=Glow+Boutique+Los+Angeles",
    websiteStatus: "poor",
    googleRating: 3.9,
    isWhatsAppAvailable: false,
    followUpStatus: "Converted",
    pitchTone: "urgent",
    notes: "Inactive social page, feed is quiet. Website checkout has bugs."
  },
  {
    id: "seed-5",
    businessName: "Chai Shai Cafe",
    category: "Cafe",
    city: "Mumbai",
    country: "India",
    phone: "98765 43210",
    phoneCountryCode: "+91",
    leadCreatedBy: "System Seed",
    websiteLink: "",
    instagramLink: "https://instagram.com/chaishaimumbai",
    googleMapsLink: "https://maps.google.com/?q=Chai+Shai+Mumbai",
    websiteStatus: "none",
    googleRating: 4.1,
    isWhatsAppAvailable: true,
    followUpStatus: "New",
    pitchTone: "friendly",
    notes: "Very active food posts but missing website completely. Needs reservation and delivery setup."
  },
  {
    id: "seed-6",
    businessName: "Atlas Gyms Marrakesh",
    category: "Gym",
    city: "Marrakesh",
    country: "Morocco",
    phone: "661-123456",
    phoneCountryCode: "+212",
    leadCreatedBy: "System Seed",
    websiteLink: "https://atlasgyms.ma",
    instagramLink: "",
    googleMapsLink: "https://maps.google.com/?q=Atlas+Gyms+Marrakesh",
    websiteStatus: "good",
    googleRating: 4.4,
    isWhatsAppAvailable: false,
    followUpStatus: "Contacted",
    pitchTone: "professional",
    notes: "Good website but completely missing Instagram page. Could double membership through social media campaigns."
  },
  {
    id: "seed-7",
    businessName: "Al Diyafah Restaurant",
    category: "Cafe",
    city: "Dubai",
    country: "United Arab Emirates",
    phone: "50 555 4321",
    phoneCountryCode: "+971",
    leadCreatedBy: "System Seed",
    websiteLink: "",
    instagramLink: "",
    googleMapsLink: "https://maps.google.com/?q=Al+Diyafah+Restaurant+Dubai",
    websiteStatus: "none",
    googleRating: 3.7,
    isWhatsAppAvailable: true,
    followUpStatus: "New",
    pitchTone: "friendly",
    notes: "No Instagram linked and missing website. Premium area in Dubai. High value lead."
  }
];

// Helper: Live calculations for lead data
const calculateLeadMetrics = (data) => {
  let websitePoints = 0;
  let ratingPoints = 0;
  let socialPoints = 0;
  let whatsappPoints = 0;

  // 1. Website Status & Link Points (Max 30)
  if (data.websiteStatus === 'none' || !data.websiteLink || data.websiteLink.trim() === '') {
    websitePoints = 30; // Maximum opportunity metric
  } else {
    if (data.websiteStatus === 'poor') {
      websitePoints = 15;
    }
    // If website link is present but is not HTTPS, add extra opportunity weight (+5 points)
    if (data.websiteLink && !data.websiteLink.toLowerCase().startsWith('https://')) {
      websitePoints = Math.min(30, websitePoints + 8);
    }
  }

  // 2. Google Rating & Maps Link Points (Max 25)
  let googleMapsPoints = 0;
  if (!data.googleMapsLink || data.googleMapsLink.trim() === '') {
    googleMapsPoints = 15;
  }
  
  const rating = parseFloat(data.googleRating) || 0;
  if (rating > 0) {
    if (rating < 3.5) {
      ratingPoints = 10;
    } else if (rating < 4.2) {
      ratingPoints = 6;
    } else if (rating < 4.6) {
      ratingPoints = 3;
    }
  } else {
    ratingPoints = 10; // no reviews
  }
  const totalMapsAndRating = Math.min(25, googleMapsPoints + ratingPoints);

  // 3. Instagram Presence & Notes Keyword Audit (Max 25)
  const notesLower = (data.notes || '').toLowerCase();
  let hasPoorSocial = false;
  
  if (!data.instagramLink || data.instagramLink.trim() === '') {
    socialPoints = 20;
  } else {
    const socialFailureKeywords = [
      'inactive', 'no posts', 'quiet', 'rarely post', 'abandoned',
      'no stories', 'old posts', 'month ago', 'months ago', 'weeks ago',
      'stale feed', 'outdated feed'
    ];
    hasPoorSocial = socialFailureKeywords.some(kw => notesLower.includes(kw));
    
    if (hasPoorSocial) {
      socialPoints = 12;
    } else {
      socialPoints = 4;
    }
  }
  
  // Scan notes for extra design audit deductions (max 25 total)
  const auditKeywords = [
    { word: 'slow', pts: 3 },
    { word: 'speed', pts: 3 },
    { word: 'broken', pts: 4 },
    { word: 'unsecured', pts: 4 },
    { word: 'http', pts: 3 },
    { word: 'not secure', pts: 4 },
    { word: 'no cta', pts: 3 },
    { word: 'logo', pts: 2 },
    { word: 'unresponsive', pts: 4 },
    { word: 'mobile issues', pts: 3 },
    { word: 'outdated', pts: 3 }
  ];
  
  let noteAuditAdditions = 0;
  auditKeywords.forEach(item => {
    if (notesLower.includes(item.word)) {
      noteAuditAdditions += item.pts;
    }
  });

  socialPoints = Math.min(25, socialPoints + noteAuditAdditions);

  // 4. WhatsApp / Phone Availability & setup (Max 20)
  if (!data.phone || data.phone.trim() === '') {
    whatsappPoints = 15;
  } else {
    if (!data.isWhatsAppAvailable) {
      whatsappPoints = 10;
    } else {
      whatsappPoints = 3;
    }
    
    // Check for valid phone number length
    const digitOnlyLength = data.phone.replace(/[^0-9]/g, '').length;
    if (digitOnlyLength > 0 && digitOnlyLength < 8) {
      whatsappPoints = Math.min(20, whatsappPoints + 7);
    }
  }

  // Total Clamped Score (0 - 100)
  const score = Math.min(100, Math.max(0, websitePoints + totalMapsAndRating + socialPoints + whatsappPoints));

  // Priority Status placement
  let priority = 'Cold';
  if (score >= 70) priority = 'Hot';
  else if (score >= 40) priority = 'Warm';

  // Tailored pitch recommendation
  let recommendedService = 'Full-Suite Local Expansion Setup';
  if (data.websiteStatus === 'none' || !data.websiteLink || data.websiteLink.trim() === '') {
    recommendedService = 'Premium Web Development & Conversion Funnel Setup';
  } else if (data.websiteStatus === 'poor' || notesLower.includes('slow') || notesLower.includes('speed')) {
    recommendedService = 'Vite-React Speed Redesign & SEO Overhaul';
  } else if (!data.instagramLink || data.instagramLink.trim() === '' || hasPoorSocial) {
    recommendedService = 'Social Media Marketing & Instagram Growth Retainer';
  } else if (!data.googleMapsLink || data.googleMapsLink.trim() === '' || rating < 4.2) {
    recommendedService = 'Google Maps GMB Listing & Reputation Management';
  } else if (!data.isWhatsAppAvailable) {
    recommendedService = 'WhatsApp Automation & CRM Pipeline Setup';
  }

  // Fetch localized config parameters
  const matchedCountry = COUNTRIES.find(c => c.name === data.country) || COUNTRIES[0];
  const greeting = matchedCountry.greeting;
  const countryNotes = matchedCountry.marketPhrase;

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
  } else if (data.websiteLink && !data.websiteLink.toLowerCase().startsWith('https://')) {
    gapDescription = 'running an unsecured non-HTTPS website domain';
  } else if (data.websiteStatus === 'poor') {
    gapDescription = 'a slow-loading, unoptimized website layout';
  } else if (!data.instagramLink || data.instagramLink.trim() === '') {
    gapDescription = 'the complete absence of an Instagram channel';
  } else if (!data.googleMapsLink || data.googleMapsLink.trim() === '') {
    gapDescription = 'an unoptimized local Google Maps search listing';
  } else {
    gapDescription = 'noticeable leakage in your lead conversion funnel';
  }

  let extraNoteText = '';
  if (data.notes && data.notes.trim().length > 5) {
    // Clean notes format for clean integration into DM
    const cleanNotes = data.notes.replace(/\[.*?\]/g, '').trim();
    if (cleanNotes.length > 5) {
      extraNoteText = ` During our audit, we flagged: "${cleanNotes.slice(0, 75).trim()}...".`;
    }
  }

  // Generated DM Messages depending on the Tone selected
  const tone = data.pitchTone || 'friendly';
  let generatedDM = '';

  const bizName = data.businessName || '[Business Name]';
  const bizCity = data.city || '[City]';
  const serviceName = recommendedService;

  if (tone === 'professional') {
    generatedDM = `Hello ${bizName} team, I hope this message finds you well. While reviewing businesses in ${bizCity} matching the ${data.category} sector, we analyzed your digital footprint. Looking at ${countryNotes}, we identified a key optimization area regarding ${gapDescription}.${extraNoteText} Our team at B Socio specializes in ${serviceName} to streamline client acquisition and boost organic local search visibility. Would you be open to a brief 3-minute digital audit breakdown we prepared for you this week? Best regards, B Socio Specialist.`;
  } else if (tone === 'analytical') {
    generatedDM = `${greeting} ${bizName} Leader. 📊 We conducted a digital KPI audit on your brand in ${bizCity}. Based on local market performance indicators in ${countryNotes}, your customer conversion funnel is experiencing friction due to ${gapDescription}.${extraNoteText} Addressing this vulnerability through ${serviceName} typically increases search performance and booking conversion rates by 35%. Let us know if we can share our 3-minute diagnostics roadmap with your team.`;
  } else if (tone === 'urgent') {
    generatedDM = `Quick attention ${bizName} team! 🚨 Competitors in the ${bizCity} ${data.category} space are scaling up their digital systems. Looking at ${countryNotes}, your business currently runs a critical vulnerability: ${gapDescription}.${extraNoteText} To secure your local search dominance and prevent customer loss, implementing a ${serviceName} is highly recommended. Can we send over a quick 3-minute checklist to patch this funnel immediately?`;
  } else {
    // friendly (default)
    generatedDM = `${greeting} ${bizName} team! 👋 Stumbled upon your page and love the work you are doing in ${bizCity}. Looking at ${countryNotes}, we noticed some huge potential for growth, specifically regarding ${gapDescription}.${extraNoteText} At B Socio, we specialize in ${serviceName} for ${categoryTarget} to help double customer traffic and search visibility. Drop us a quick reply if you're open to a free 3-minute custom audit breakdown we created for you!`;
  }

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

export default function App() {
  // Leads Database State
  const [leads, setLeads] = useState(() => {
    let rawLeads = INITIAL_SEED_LEADS;
    const saved = localStorage.getItem('bsocio-leads');
    if (saved) {
      try {
        rawLeads = JSON.parse(saved);
        if (!Array.isArray(rawLeads)) {
          rawLeads = INITIAL_SEED_LEADS;
        }
      } catch (e) {
        rawLeads = INITIAL_SEED_LEADS;
      }
    }
    
    // Map initial attributes to ensure integrity and run calculations
    return rawLeads.map(lead => {
      const detectedCountry = COUNTRIES.find(c => c.dialCode === lead.phoneCountryCode) || COUNTRIES[0];
      const baseLead = {
        country: detectedCountry.name,
        phoneCountryCode: lead.phoneCountryCode || detectedCountry.dialCode,
        phone: lead.phone || '',
        leadCreatedBy: lead.leadCreatedBy || 'Admin',
        websiteLink: lead.websiteLink || '',
        instagramLink: lead.instagramLink || '',
        googleMapsLink: lead.googleMapsLink || '',
        websiteStatus: lead.websiteStatus || 'none',
        googleRating: lead.googleRating || 3.8,
        isWhatsAppAvailable: lead.isWhatsAppAvailable !== undefined ? lead.isWhatsAppAvailable : true,
        followUpStatus: lead.followUpStatus || 'New',
        pitchTone: lead.pitchTone || 'friendly',
        notes: lead.notes || '',
        ...lead
      };
      
      const metrics = calculateLeadMetrics(baseLead);
      return {
        ...baseLead,
        ...metrics
      };
    });
  });

  // Intake Form Inputs State
  const [formData, setFormData] = useState({
    businessName: '',
    category: 'Cafe',
    city: '',
    country: 'India',
    phoneCountryCode: '+91',
    phone: '',
    leadCreatedBy: '',
    websiteLink: '',
    instagramLink: '',
    googleMapsLink: '',
    websiteStatus: 'none',
    googleRating: 3.8,
    isWhatsAppAvailable: true,
    followUpStatus: 'New',
    pitchTone: 'friendly',
    notes: ''
  });

  // Active Scorecard / Focus Lead View State
  const [selectedLead, setSelectedLead] = useState(null);

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('score'); // 'score', 'name', 'priority'
  const [sortOrder, setSortOrder] = useState('desc');

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

  // Dynamic Country Search / Dropdown configuration
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const filteredCountries = useMemo(() => {
    return COUNTRIES.filter(c => 
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dialCode.includes(countrySearch)
    );
  }, [countrySearch]);

  // Real-time phone parsing / autopaste country detector
  const handlePhoneInputChange = (e) => {
    const value = e.target.value;
    
    // Check if user pasted a number starting with a country dial code
    if (value.startsWith('+')) {
      // Find matching dialCode
      // Sort country dial codes by length descending to match longest code matches first (e.g. +971 before +9)
      const sortedCountries = [...COUNTRIES].sort((a,b) => b.dialCode.length - a.dialCode.length);
      const matched = sortedCountries.find(c => value.startsWith(c.dialCode));
      
      if (matched) {
        const cleanNumber = value.replace(matched.dialCode, '').trim();
        setFormData(prev => ({
          ...prev,
          phone: cleanNumber,
          phoneCountryCode: matched.dialCode,
          country: matched.name
        }));
        showToast(`Auto-detected: ${matched.name} ${matched.flag}`);
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, phone: value }));
  };

  // Live preview metrics of currently editing form
  const liveMetrics = useMemo(() => calculateLeadMetrics(formData), [formData]);

  // Form input change handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const next = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
      
      // Auto-synchronize phone country code dropdown prefix
      if (name === 'country') {
        const matched = COUNTRIES.find(c => c.name === value);
        if (matched) {
          next.phoneCountryCode = matched.dialCode;
        }
      }
      // If code changes, sync country name
      else if (name === 'phoneCountryCode') {
        const matched = COUNTRIES.find(c => c.dialCode === value);
        if (matched) {
          next.country = matched.name;
        }
      }
      return next;
    });
  };

  // Quick notes tags applicator
  const appendNoteTag = (tag) => {
    setFormData(prev => {
      const rawNotes = prev.notes || '';
      const separator = rawNotes.trim() === '' ? '' : ' ';
      return {
        ...prev,
        notes: rawNotes + separator + tag
      };
    });
    showToast(`Appended label: ${tag}`);
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
      phoneCountryCode: '+91',
      phone: '',
      leadCreatedBy: '',
      websiteLink: '',
      instagramLink: '',
      googleMapsLink: '',
      websiteStatus: 'none',
      googleRating: 3.8,
      isWhatsAppAvailable: true,
      followUpStatus: 'New',
      pitchTone: 'friendly',
      notes: ''
    });
  };

  // Copy DM to clipboard action
  const handleCopyDM = (text) => {
    if (!text || text.includes('[Business Name]')) {
      showToast('Fill out client name to populate outreach!');
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2000);
      showToast('Outreach Pitch copied to clipboard!');
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
    const uniqueSeeds = INITIAL_SEED_LEADS.filter(seed => 
      !leads.some(l => l.businessName.toLowerCase() === seed.businessName.toLowerCase())
    );

    if (uniqueSeeds.length === 0) {
      showToast('Demo records already exist in database!');
      return;
    }

    // Enhance seed leads before adding
    const enhancedSeeds = uniqueSeeds.map(seed => {
      const calculated = calculateLeadMetrics(seed);
      return {
        ...seed,
        ...calculated
      };
    });

    const merged = [...enhancedSeeds, ...leads];
    setLeads(merged);
    setSelectedLead(merged[0]);
    showToast(`Loaded ${uniqueSeeds.length} demo records!`);
  };

  // Clear all leads
  const handleClearAll = () => {
    if (confirm('Clear all leads? This cannot be undone.')) {
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

    let csv = 'Business Name,Category,Country,City,Phone,Lead Created By,Website Link,Instagram Link,Google Maps Link,Website Status,Google Rating,WhatsApp,Score,Priority,Follow-up Status,Pitch Service,Tone,Pitch DM\n';
    leads.forEach(l => {
      csv += `"${l.businessName.replace(/"/g, '""')}",`;
      csv += `"${l.category}",`;
      csv += `"${(l.country || 'India').replace(/"/g, '""')}",`;
      csv += `"${l.city.replace(/"/g, '""')}",`;
      csv += `"${((l.phoneCountryCode || '') + ' ' + (l.phone || '')).trim().replace(/"/g, '""')}",`;
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
      csv += `"${l.recommendedService.replace(/"/g, '""')}",`;
      csv += `"${l.pitchTone || 'friendly'}",`;
      csv += `"${l.generatedDM.replace(/"/g, '""')}"\n`;
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
      phoneCountryCode: lead.phoneCountryCode || '+91',
      phone: lead.phone || '',
      leadCreatedBy: lead.leadCreatedBy || '',
      websiteLink: lead.websiteLink || '',
      instagramLink: lead.instagramLink || '',
      googleMapsLink: lead.googleMapsLink || '',
      websiteStatus: lead.websiteStatus,
      googleRating: lead.googleRating,
      isWhatsAppAvailable: lead.isWhatsAppAvailable,
      followUpStatus: lead.followUpStatus || 'New',
      pitchTone: lead.pitchTone || 'friendly',
      notes: lead.notes || ''
    });
    showToast('Loaded lead back to editor!');
  };

  // Outreach tone modifier for active scorecard
  const changeSelectedLeadTone = (tone) => {
    if (!selectedLead) return;
    
    const updatedLeadData = {
      ...selectedLead,
      pitchTone: tone
    };
    const calculated = calculateLeadMetrics(updatedLeadData);
    const updatedLead = {
      ...updatedLeadData,
      ...calculated
    };

    // Update active
    setSelectedLead(updatedLead);
    
    // Sync into database list
    setLeads(prev => prev.map(l => l.id === selectedLead.id ? updatedLead : l));
    showToast(`Pitch tone changed to ${tone}`);
  };

  // Notification Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    const tm = setTimeout(() => setToastMessage(''), 3000);
    return () => clearTimeout(tm);
  };

  // Sort & Filter computations
  const filteredLeads = useMemo(() => {
    let result = leads.filter(l => {
      const matchesSearch = 
        l.businessName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        l.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (l.notes || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = filterCategory === 'All' || l.category === filterCategory;
      const matchesPriority = filterPriority === 'All' || l.priority === filterPriority;
      const matchesStatus = filterStatus === 'All' || l.followUpStatus === filterStatus;
      
      return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
    });

    // Apply Sorting
    return result.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === 'businessName') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [leads, searchTerm, filterCategory, filterPriority, filterStatus, sortBy, sortOrder]);

  // Statistics computations
  const totalCount = leads.length;
  const hotCount = leads.filter(l => l.priority === 'Hot').length;
  const averageScore = totalCount > 0 ? Math.round(leads.reduce((sum, curr) => sum + curr.score, 0) / totalCount) : 0;
  const webIssuesCount = leads.filter(l => l.websiteStatus === 'none' || l.websiteStatus === 'poor').length;

  // Category counts representation
  const categorySummaryStats = useMemo(() => {
    const counts = { Cafe: 0, Gym: 0, Retail: 0, 'Real Estate': 0, 'E-commerce': 0, 'Local Service': 0 };
    leads.forEach(l => {
      if (counts[l.category] !== undefined) {
        counts[l.category]++;
      } else {
        counts[l.category] = (counts[l.category] || 0) + 1;
      }
    });
    return counts;
  }, [leads]);

  // Follow-up status statistics
  const statusSummaryStats = useMemo(() => {
    const counts = { New: 0, Contacted: 0, Interested: 0, 'Not Interested': 0, Converted: 0 };
    leads.forEach(l => {
      const status = l.followUpStatus || 'New';
      if (counts[status] !== undefined) {
        counts[status]++;
      }
    } );
    return counts;
  }, [leads]);

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      
      {/* Dynamic Futuristic Glowing Background Spheres */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-teal-900/10 blur-[120px] pointer-events-none"></div>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900/90 backdrop-blur-xl border border-slate-800 text-white font-semibold py-3 px-5 rounded-2xl shadow-2xl flex items-center space-x-3 text-xs sm:text-sm animate-fade-in border-indigo-500/30">
          <div className="h-2 w-2 rounded-full bg-teal-400 animate-ping"></div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Premium Sleek Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-900 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 flex items-center justify-center shadow-lg shadow-indigo-500/10 relative group">
              <Zap className="w-5 h-5 text-white fill-white group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 rounded-2xl bg-indigo-400/20 blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-display font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                  B Socio <span className="text-indigo-400 font-light">//</span> Lead Scorer
                </h1>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">v2.1</span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 font-medium">Arab League & Global Outreach Qualification Engine</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-1.5 bg-slate-900/60 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-400">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              <span className="font-semibold text-slate-300">Live Evaluation Sandbox</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex flex-col space-y-6 z-10">

        {/* Dashboard Top Stats Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-2xl flex items-center space-x-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-slate-800/80 transition-all group">
            <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Leads Logged</p>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white mt-0.5">{totalCount}</h3>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-2xl flex items-center space-x-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-slate-800/80 transition-all group">
            <div className="p-3 bg-rose-500/10 text-rose-450 rounded-xl group-hover:bg-rose-500/20 transition-colors">
              <Flame className="w-5 h-5 fill-rose-500/10 text-rose-400" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Hot Outreach Gaps</p>
              <h3 className="text-xl sm:text-2xl font-black font-display text-rose-400 mt-0.5">{hotCount}</h3>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-2xl flex items-center space-x-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-slate-800/80 transition-all group">
            <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl group-hover:bg-teal-500/20 transition-colors">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Avg Lead Score</p>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white mt-0.5">{averageScore}%</h3>
            </div>
          </div>

          <div className="bg-slate-900/40 border border-slate-900 p-4 rounded-2xl flex items-center space-x-4 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-slate-800/80 transition-all group">
            <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl group-hover:bg-amber-500/20 transition-colors">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Deficient Web / SEO</p>
              <h3 className="text-xl sm:text-2xl font-black font-display text-white mt-0.5">{webIssuesCount}</h3>
            </div>
          </div>

        </section>

        {/* Visual Analytics Segment Panels */}
        <section className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)] text-xs text-slate-400">
          
          {/* Categories Metric Bars */}
          <div className="space-y-3.5">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-300 uppercase tracking-widest text-[9px] flex items-center space-x-1.5">
                <Sliders className="w-3.5 h-3.5 text-indigo-400" />
                <span>Lead Category Distribution</span>
              </span>
              <span className="text-[10px] font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-900">Total Classified</span>
            </div>
            <div className="space-y-2">
              {Object.entries(categorySummaryStats).map(([cat, val]) => {
                const percent = totalCount > 0 ? Math.round((val / totalCount) * 100) : 0;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-semibold text-slate-300">{cat}</span>
                      <span className="text-slate-500">{val} ({percent}%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${percent}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sales Pipeline Metrics */}
          <div className="space-y-3.5">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-300 uppercase tracking-widest text-[9px] flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Conversion Pipeline Stage Ratio</span>
              </span>
              <span className="text-[10px] font-bold bg-slate-950 px-2 py-0.5 rounded border border-slate-900">Outreach Funnel</span>
            </div>
            <div className="space-y-2">
              {Object.entries(statusSummaryStats).map(([status, val]) => {
                const percent = totalCount > 0 ? Math.round((val / totalCount) * 100) : 0;
                let colorClass = 'from-slate-700 to-slate-800';
                if (status === 'Converted') colorClass = 'from-emerald-500 to-emerald-600';
                else if (status === 'Interested') colorClass = 'from-indigo-500 to-indigo-600';
                else if (status === 'Contacted') colorClass = 'from-amber-500 to-amber-600';
                else if (status === 'Not Interested') colorClass = 'from-rose-500 to-rose-600';
                
                return (
                  <div key={status} className="space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-semibold text-slate-300">{status}</span>
                      <span className="text-slate-500">{val} ({percent}%)</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${percent}%` }}
                        className={`h-full rounded-full bg-gradient-to-r ${colorClass} transition-all duration-500`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </section>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT: Intake Form (5 cols) */}
          <section className="lg:col-span-5 bg-slate-900/80 backdrop-blur-xl border border-slate-900 rounded-2xl p-6 shadow-xl flex flex-col space-y-4 hover:border-slate-800 transition-colors">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
              <div className="flex items-center space-x-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                <h2 className="font-display font-semibold text-sm sm:text-base">Lead Profile Diagnostic Inputs</h2>
              </div>
              <button 
                type="button" 
                onClick={resetForm}
                className="text-[10px] font-bold text-slate-500 hover:text-rose-455 hover:text-rose-450 transition-colors px-2 py-0.5 rounded bg-slate-950 border border-slate-900"
              >
                Clear Inputs
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-300">
              
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
                    placeholder="e.g. Arab Palace Cafe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-colors font-medium text-slate-200"
                  />
                </div>
              </div>

              {/* Category & Searchable Target Country */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors font-medium text-slate-200"
                  >
                    <option value="Cafe">Cafe</option>
                    <option value="Gym">Gym</option>
                    <option value="Retail">Retail</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Local Service">Local Service</option>
                  </select>
                </div>
                
                {/* Searchable Custom Country Selector Dropdown */}
                <div className="relative">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Target Country *</label>
                  <button
                    type="button"
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-2.5 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors font-medium text-slate-200 flex justify-between items-center"
                  >
                    <span className="truncate">
                      {COUNTRIES.find(c => c.name === formData.country)?.flag} {formData.country}
                    </span>
                    <span className="text-[9px] text-slate-500">▼</span>
                  </button>

                  {isCountryDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-1.5 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl z-50 p-2 space-y-2">
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-500 pointer-events-none">
                          <Search className="w-3 h-3" />
                        </span>
                        <input
                          type="text"
                          placeholder="Filter countries..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg py-1 pl-7 pr-2 text-[11px] focus:outline-none text-slate-200"
                        />
                      </div>
                      
                      <div className="max-h-40 overflow-y-auto divide-y divide-slate-850 rounded-lg">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map(c => (
                            <button
                              key={c.name}
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({
                                  ...prev,
                                  country: c.name,
                                  phoneCountryCode: c.dialCode
                                }));
                                setIsCountryDropdownOpen(false);
                                setCountrySearch('');
                              }}
                              className={`w-full text-left py-1.5 px-2 hover:bg-indigo-600 hover:text-white transition-colors text-[11px] flex items-center space-x-2 ${formData.country === c.name ? 'bg-slate-800 text-indigo-400' : 'text-slate-300'}`}
                            >
                              <span>{c.flag}</span>
                              <span className="font-semibold flex-grow">{c.name}</span>
                              <span className="text-[9px] text-slate-500">{c.dialCode}</span>
                            </button>
                          ))
                        ) : (
                          <div className="py-2 text-center text-[10px] text-slate-500">No match</div>
                        )}
                      </div>
                    </div>
                  )}
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
                      placeholder="e.g. Dubai or Mumbai"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors font-medium text-slate-200"
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
                      placeholder="e.g. Agent Name"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors font-medium text-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* Phone / WhatsApp Number with smart matching */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  Phone / WhatsApp Number 
                  <span className="lowercase font-normal text-[10px] text-slate-500 pl-1.5">(starts with + prefix auto-detects country)</span>
                </label>
                <div className="flex gap-2">
                  <div className="w-28 flex-shrink-0">
                    <select
                      name="phoneCountryCode"
                      value={formData.phoneCountryCode}
                      onChange={handleInputChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors font-medium text-slate-200"
                    >
                      {COUNTRIES.map(c => (
                        <option key={c.name} value={c.dialCode}>
                          {c.dialCode} {c.flag}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-grow relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500 pointer-events-none">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneInputChange}
                      placeholder={COUNTRIES.find(c => c.name === formData.country)?.phonePlaceholder || '123 4567'}
                      className="w-full bg-slate-950 border border-slate-805 border-slate-800 rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors font-medium text-slate-200"
                    />
                  </div>
                </div>
              </div>

              {/* Presence / Links Group */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Digital Footprint Assets</label>
                  {formData.websiteLink && !formData.websiteLink.toLowerCase().startsWith('https://') && (
                    <span className="text-[8px] font-bold text-rose-400 bg-rose-500/10 px-1 py-0.5 rounded border border-rose-500/20 flex items-center space-x-1 animate-pulse">
                      <ShieldCheck className="w-3 h-3 text-rose-400" />
                      <span>Unsecure HTTP Link Found</span>
                    </span>
                  )}
                </div>
                
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors font-medium text-slate-200"
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
                    className="w-full bg-slate-950 border border-slate-805 border-slate-800 rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors font-medium text-slate-200"
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
                    placeholder="Google Maps Location Listing Link"
                    className="w-full bg-slate-950 border border-slate-805 border-slate-800 rounded-xl py-2 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors font-medium text-slate-200"
                  />
                </div>
              </div>

              {/* Website Status & Follow-up Status */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Website Diagnosis *</label>
                  <select
                    name="websiteStatus"
                    value={formData.websiteStatus}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors font-medium text-slate-200"
                  >
                    <option value="none">No Website Found</option>
                    <option value="poor">Poor / Not Optimized</option>
                    <option value="good">Good Website Presence</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Conversion Status *</label>
                  <select
                    name="followUpStatus"
                    value={formData.followUpStatus}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-2.5 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors font-medium text-slate-200"
                  >
                    <option value="New">New Lead</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Interested">Interested</option>
                    <option value="Not Interested">Not Interested</option>
                    <option value="Converted">Converted Client</option>
                  </select>
                </div>
              </div>

              {/* Pitch Outreach Default Tone Selection */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Default Pitch Tone *</label>
                <div className="grid grid-cols-4 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-850">
                  {['friendly', 'professional', 'analytical', 'urgent'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, pitchTone: t }))}
                      className={`py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all ${
                        formData.pitchTone === t 
                          ? 'bg-indigo-600 text-white shadow-sm' 
                          : 'text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Google Rating Slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Google GMB Rating</label>
                  <span className={`text-[10px] font-bold ${formData.googleRating < 4.2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {formData.googleRating} ★ {formData.googleRating < 3.5 ? '(Critical)' : formData.googleRating < 4.2 ? '(Slight)' : '(Strong)'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  name="googleRating"
                  value={formData.googleRating}
                  onChange={(e) => handleRatingChange(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500 mt-2"
                />
              </div>

              {/* WhatsApp Toggle */}
              <div className="flex items-center justify-between bg-slate-950/60 p-3 rounded-xl border border-slate-900">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-slate-300">WhatsApp Reachable?</span>
                  <span className="text-[9px] text-slate-500">Number is registered on WhatsApp</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isWhatsAppAvailable"
                    checked={formData.isWhatsAppAvailable}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-8 h-4 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-emerald-500"></div>
                </label>
              </div>

              {/* Notes and Quick Technical Tags */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Audits Notes & Findings</label>
                  <span className="text-[8px] font-semibold text-slate-500">Live score factor: {liveMetrics.score} pts</span>
                </div>
                
                {/* Rapid audit triggers */}
                <div className="flex flex-wrap gap-1 pb-1">
                  {[
                    { label: 'Unsecured http', tag: '[Unsecured HTTP]' },
                    { label: 'No Website', tag: '[No Web Presence]' },
                    { label: 'Slow load speed', tag: '[Slow Website]' },
                    { label: 'Outdated design', tag: '[Outdated Layout]' },
                    { label: 'No posts feed', tag: '[Inactive IG Feed]' },
                    { label: 'Unlisted GMB', tag: '[Unlisted Google Maps]' }
                  ].map(item => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => appendNoteTag(item.tag)}
                      className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-400 hover:text-indigo-400 transition-all uppercase tracking-tight"
                    >
                      + {item.label}
                    </button>
                  ))}
                </div>

                <textarea
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Website loads slowly. No posts on Instagram feed for 3 months. [Slow Website]"
                  className="w-full bg-slate-950 border border-slate-805 border-slate-808 border-slate-800 rounded-xl py-2 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors font-medium text-slate-200 placeholder-slate-700"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md hover:shadow-glow-indigo flex items-center justify-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Evaluate Lead Parameters</span>
              </button>
            </form>
          </section>

          {/* RIGHT: Selected Scorecard & Leads History (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">

            {/* Focal Scorecard Card */}
            <section className="bg-slate-900/60 backdrop-blur-xl border border-slate-900 rounded-2xl p-6 shadow-xl relative overflow-hidden transition-all duration-350 hover:border-slate-800">
              <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex items-center space-x-2 border-b border-slate-900 pb-3 mb-4 justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4.5 h-4.5 text-indigo-400 animate-pulse" />
                  <h2 className="font-display font-extrabold text-sm sm:text-base text-slate-200">
                    Lead Audit Assessment: <span className="text-indigo-400 font-black">{selectedLead ? selectedLead.businessName : 'Evaluation Pending'}</span>
                  </h2>
                </div>
                {selectedLead && (
                  <span className="text-[9px] font-extrabold bg-slate-950 px-2 py-0.5 rounded border border-slate-850 text-slate-500 uppercase tracking-widest">
                    ID: {selectedLead.id.replace('lead-', '').replace('seed-', 'demo-')}
                  </span>
                )}
              </div>

              {selectedLead && (
                <div className="flex flex-wrap items-center gap-2 text-[10px] text-slate-400 mb-5 px-1">
                  <span className="flex items-center space-x-1.5 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-900">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{selectedLead.city}, {selectedLead.country}</span>
                  </span>
                  <span className="flex items-center space-x-1.5 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-900">
                    <Tag className="w-3.5 h-3.5 text-teal-400" />
                    <span>{selectedLead.category}</span>
                  </span>
                  {selectedLead.leadCreatedBy && (
                    <span className="flex items-center space-x-1.5 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-900">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>By: {selectedLead.leadCreatedBy}</span>
                    </span>
                  )}
                  {selectedLead.phone && (
                    <span className="flex items-center space-x-1.5 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-900">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{selectedLead.phoneCountryCode || ''} {selectedLead.phone}</span>
                    </span>
                  )}
                </div>
              )}

              {selectedLead ? (
                <div className="space-y-6 animate-fade-in relative z-10">
                  
                  {/* Gauge & Details Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    
                    {/* Score SVG circle (4 cols) */}
                    <div className="sm:col-span-4 flex flex-col items-center text-center">
                      <div className="relative w-36 h-36 flex items-center justify-center group">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="72" cy="72" r="62" strokeWidth="8" stroke="#090d16" fill="transparent"></circle>
                          <circle 
                            cx="72" 
                            cy="72" 
                            r="62" 
                            strokeWidth="10" 
                            stroke={
                              selectedLead.priority === 'Hot' ? '#ef4444' : 
                              selectedLead.priority === 'Warm' ? '#f59e0b' : '#3b82f6'
                            } 
                            fill="transparent"
                            strokeDasharray="390"
                            strokeDashoffset={((100 - selectedLead.score) / 100) * 390}
                            strokeLinecap="round"
                            className="gauge-circle drop-shadow-[0_0_8px_rgba(99,102,241,0.15)] group-hover:scale-105 transition-transform"
                          ></circle>
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-3xl sm:text-4xl font-black font-display text-white">{selectedLead.score}</span>
                          <span className="text-[8px] text-slate-500 uppercase tracking-widest font-extrabold mt-0.5">Scoring Point</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-center mt-3.5">
                        <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                          selectedLead.priority === 'Hot' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-glow-rose' : 
                          selectedLead.priority === 'Warm' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-glow-indigo' : 
                          'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                        }`}>
                          <Flame className="w-3.5 h-3.5 fill-current" />
                          <span>{selectedLead.priority} Lead</span>
                        </span>
                        
                        <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                          selectedLead.followUpStatus === 'Converted' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                          selectedLead.followUpStatus === 'Interested' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 
                          selectedLead.followUpStatus === 'Contacted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                          selectedLead.followUpStatus === 'Not Interested' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                          'bg-slate-950 text-slate-400 border-slate-900'
                        }`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{selectedLead.followUpStatus || 'New'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Breakdown & Recommendations (8 cols) */}
                    <div className="sm:col-span-8 flex flex-col space-y-4">
                      
                      {/* Premium Health Check & Gap Analysis */}
                      <div className="space-y-2.5">
                        <span className="text-slate-500 font-extrabold uppercase tracking-widest text-[8px] block px-1">HEALTH & Gap Vulnerability Analysis</span>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          
                          {/* Web Presence Card */}
                          <div className={`p-2.5 rounded-xl border flex flex-col justify-between leading-normal transition-all ${
                            !selectedLead.websiteLink || selectedLead.websiteStatus === 'none' 
                              ? 'bg-rose-500/5 border-rose-500/10 text-rose-400' 
                              : selectedLead.websiteStatus === 'poor' || (selectedLead.websiteLink && !selectedLead.websiteLink.startsWith('https://'))
                              ? 'bg-amber-500/5 border-amber-500/10 text-amber-400'
                              : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400'
                          }`}>
                            <div className="flex justify-between items-center mb-1 bg-slate-950/20 p-0.5 rounded px-1">
                              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Web Presence</span>
                              <span className="text-[8px] font-extrabold uppercase text-[7px]">
                                {!selectedLead.websiteLink || selectedLead.websiteStatus === 'none' ? 'None' : selectedLead.websiteStatus === 'poor' ? 'Poor' : 'Secure'}
                              </span>
                            </div>
                            <span className="text-slate-200 font-bold leading-tight truncate">
                              {selectedLead.websiteLink ? selectedLead.websiteLink.replace('https://', '').replace('http://', '') : 'No Active Site'}
                            </span>
                            {selectedLead.websiteLink && !selectedLead.websiteLink.startsWith('https://') && (
                              <span className="text-[8px] text-rose-400 font-semibold mt-1">⚠️ Security Link: HTTP non-secure</span>
                            )}
                          </div>

                          {/* SEO & Visibility Card */}
                          <div className={`p-2.5 rounded-xl border flex flex-col justify-between leading-normal transition-all ${
                            !selectedLead.googleMapsLink 
                              ? 'bg-rose-500/5 border-rose-500/10 text-rose-400' 
                              : selectedLead.googleRating < 4.2
                              ? 'bg-amber-500/5 border-amber-500/10 text-amber-400'
                              : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400'
                          }`}>
                            <div className="flex justify-between items-center mb-1 bg-slate-950/20 p-0.5 rounded px-1">
                              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">GMB Local Maps</span>
                              <span className="text-[8px] font-extrabold uppercase text-[7px]">
                                {!selectedLead.googleMapsLink ? 'Unlisted' : selectedLead.googleRating < 4.2 ? 'Critical' : 'Good'}
                              </span>
                            </div>
                            <span className="text-slate-200 font-bold leading-tight flex items-center">
                              {selectedLead.googleRating} ★ Rating 
                              {selectedLead.googleMapsLink && <span className="text-[9px] text-slate-500 ml-1.5 font-normal truncate">(Listed)</span>}
                            </span>
                          </div>

                          {/* Social Engagement Card */}
                          <div className={`p-2.5 rounded-xl border flex flex-col justify-between leading-normal transition-all ${
                            !selectedLead.instagramLink 
                              ? 'bg-rose-500/5 border-rose-500/10 text-rose-400' 
                              : ['inactive', 'no posts', 'slow', 'missing', 'quiet'].some(kw => (selectedLead.notes || '').toLowerCase().includes(kw))
                              ? 'bg-amber-500/5 border-amber-500/10 text-amber-400'
                              : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400'
                          }`}>
                            <div className="flex justify-between items-center mb-1 bg-slate-950/20 p-0.5 rounded px-1">
                              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Social Status</span>
                              <span className="text-[8px] font-extrabold uppercase text-[7px]">
                                {!selectedLead.instagramLink ? 'Missing' : ['inactive', 'no posts', 'slow', 'missing', 'quiet'].some(kw => (selectedLead.notes || '').toLowerCase().includes(kw)) ? 'Stale' : 'Active'}
                              </span>
                            </div>
                            <span className="text-slate-200 font-bold leading-tight truncate">
                              {selectedLead.instagramLink ? selectedLead.instagramLink.replace('https://instagram.com/', '@') : 'No Linked Socials'}
                            </span>
                          </div>

                          {/* Contactability Card */}
                          <div className={`p-2.5 rounded-xl border flex flex-col justify-between leading-normal transition-all ${
                            !selectedLead.phone 
                              ? 'bg-rose-500/5 border-rose-500/10 text-rose-400' 
                              : !selectedLead.isWhatsAppAvailable
                              ? 'bg-amber-500/5 border-amber-500/10 text-amber-400'
                              : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400'
                          }`}>
                            <div className="flex justify-between items-center mb-1 bg-slate-950/20 p-0.5 rounded px-1">
                              <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400">Outreach Channel</span>
                              <span className="text-[8px] font-extrabold uppercase text-[7px]">
                                {!selectedLead.phone ? 'No Number' : !selectedLead.isWhatsAppAvailable ? 'SMS Only' : 'WhatsApp'}
                              </span>
                            </div>
                            <span className="text-slate-200 font-bold leading-tight truncate">
                              {selectedLead.phone ? `${selectedLead.phoneCountryCode || ''} ${selectedLead.phone}` : 'No Dial Address'}
                            </span>
                          </div>

                        </div>
                      </div>

                      {/* Interactive links group */}
                      <div className="flex gap-2 text-[10px] uppercase font-bold tracking-wider">
                        {selectedLead.websiteLink ? (
                          <a href={selectedLead.websiteLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 px-2.5 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors flex-1 justify-center rounded-xl">
                            <Globe className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Verify Site</span>
                          </a>
                        ) : (
                          <span className="flex items-center space-x-1.5 px-2.5 py-2.5 bg-slate-900/10 border border-slate-950 rounded-xl text-slate-700 flex-1 justify-center cursor-not-allowed select-none">
                            <Globe className="w-3.5 h-3.5 text-slate-800" />
                            <span>No Site Link</span>
                          </span>
                        )}

                        {selectedLead.instagramLink ? (
                          <a href={selectedLead.instagramLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 px-2.5 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors flex-1 justify-center rounded-xl">
                            <Instagram className="w-3.5 h-3.5 text-pink-400" />
                            <span>Instagram</span>
                          </a>
                        ) : (
                          <span className="flex items-center space-x-1.5 px-2.5 py-2.5 bg-slate-900/10 border border-slate-950 rounded-xl text-slate-700 flex-1 justify-center cursor-not-allowed select-none">
                            <Instagram className="w-3.5 h-3.5 text-slate-800" />
                            <span>No IG Link</span>
                          </span>
                        )}

                        {selectedLead.googleMapsLink ? (
                          <a href={selectedLead.googleMapsLink} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1.5 px-2.5 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-400 hover:text-white transition-colors flex-1 justify-center rounded-xl">
                            <Map className="w-3.5 h-3.5 text-teal-400" />
                            <span>Google Maps</span>
                          </a>
                        ) : (
                          <span className="flex items-center space-x-1.5 px-2.5 py-2.5 bg-slate-900/10 border border-slate-950 rounded-xl text-slate-700 flex-1 justify-center cursor-not-allowed select-none">
                            <Map className="w-3.5 h-3.5 text-slate-800" />
                            <span>No GMB Link</span>
                          </span>
                        )}
                      </div>

                    </div>
                  </div>

                  {/* Recommend service */}
                  <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 mt-2">
                    <span className="text-indigo-400 font-extrabold uppercase tracking-widest text-[8px] block mb-0.5">B SOCIO PROPOSED SOLUTION</span>
                    <h4 className="font-display font-extrabold text-xs sm:text-sm text-slate-100">{selectedLead.recommendedService}</h4>
                  </div>

                  {/* Dynamic Pitch Outreach Customizer */}
                  <div className="border-t border-slate-900 pt-4 flex flex-col space-y-3.5">
                    
                    {/* Tone Selection Headers */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[9px] flex items-center space-x-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                        <span>AI OUTREACH pitch message configuration</span>
                      </span>
                      
                      <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-900">
                        <span className="text-[9px] font-bold text-slate-500 px-1 uppercase tracking-tight">Tone:</span>
                        {['friendly', 'professional', 'analytical', 'urgent'].map(t => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => changeSelectedLeadTone(t)}
                            className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wider transition-all ${
                              (selectedLead.pitchTone || 'friendly') === t 
                                ? 'bg-indigo-600 text-white shadow-sm' 
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Outreach message text box */}
                    <div className="relative bg-slate-950 border border-slate-900 p-4 rounded-xl text-slate-300 text-xs leading-relaxed font-medium">
                      <p className="pr-10 whitespace-pre-wrap">{selectedLead.generatedDM}</p>
                      
                      <button 
                        type="button" 
                        onClick={() => handleCopyDM(selectedLead.generatedDM)}
                        className={`absolute top-3 right-3 p-2.5 rounded-lg border transition-all ${
                          copiedState 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-450 text-emerald-400' 
                            : 'bg-slate-900 border-slate-850 text-slate-500 hover:text-white hover:border-slate-700'
                        }`}
                        title="Copy outreach text"
                      >
                        {copiedState ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center gap-2 pt-1">
                      <span className="text-[9px] text-slate-500 font-semibold uppercase bg-slate-950 px-2 py-0.5 rounded tracking-widest">{(selectedLead.generatedDM || '').length} characters</span>
                      
                      <div className="flex gap-2">
                        {selectedLead.phone && (
                          <a 
                            href={`https://wa.me/${selectedLead.phoneCountryCode?.replace('+', '') || ''}${(selectedLead.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(selectedLead.generatedDM || '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 text-[9px] bg-emerald-600 hover:bg-emerald-500 hover:text-white text-slate-50 font-extrabold rounded-xl transition-all uppercase flex items-center space-x-1.5 shadow-md shadow-emerald-950/20"
                          >
                            <Send className="w-3 h-3" />
                            <span>Send via WhatsApp</span>
                          </a>
                        )}
                        
                        <button 
                          type="button"
                          onClick={() => handleLoadLeadToForm(selectedLead)}
                          className="px-3 py-2 text-[9px] bg-slate-950 hover:bg-slate-900 text-slate-350 hover:text-white font-bold rounded-xl border border-slate-500/10 hover:border-slate-800 transition-colors uppercase"
                        >
                          Edit Lead Data
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="h-14 w-14 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-900 text-slate-700 mb-3 animate-pulse">
                    <Sparkles className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-400">Diagnostic Sandbox Idle</h4>
                  <p className="text-[10px] text-slate-600 max-w-xs mt-1">Submit the profile evaluator on the left or select a registered lead record from history pipeline below to inspect evaluation audit.</p>
                </div>
              )}
            </section>

            {/* History Table Log */}
            <section className="bg-slate-900/60 backdrop-blur-xl border border-slate-900 rounded-2xl p-6 shadow-xl flex flex-col space-y-4 hover:border-slate-800 transition-colors">
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-900 pb-3.5 gap-3">
                <div className="flex items-center space-x-2">
                  <h2 className="font-display font-semibold text-sm sm:text-base">Outreach Leads Pipeline</h2>
                  <span className="bg-slate-950 text-indigo-400 border border-slate-850 px-2 py-0.5 rounded-full text-[10px] font-bold font-sans">
                    {filteredLeads.length} leads
                  </span>
                </div>

                {/* Database utility tools */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <button 
                    type="button" 
                    onClick={handleLoadSeedData}
                    className="p-1.5 px-2.5 text-[10px] bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl border border-slate-858 border-slate-900 transition-colors flex items-center space-x-1.5 font-bold"
                  >
                    <Database className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Load Demo Seeds</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={handleExportCSV}
                    className="p-1.5 px-2.5 text-[10px] bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-emerald-400 rounded-xl border border-slate-858 border-slate-900 transition-colors flex items-center space-x-1.5 font-bold"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-450" />
                    <span>Export CSV</span>
                  </button>
                  <button 
                    type="button" 
                    onClick={handleClearAll}
                    className="p-1.5 px-2.5 text-[10px] bg-rose-950/20 hover:bg-rose-900/30 text-rose-400 rounded-xl border border-rose-900/30 transition-colors flex items-center space-x-1.5 font-bold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Format Logs</span>
                  </button>
                </div>
              </div>

              {/* Advanced multi-filters toolbar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-900 text-[10px] sm:text-xs">
                
                {/* Search */}
                <div className="relative col-span-2 md:col-span-1">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-slate-500 pointer-events-none">
                    <Search className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search name, city..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 pl-8 pr-2.5 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                {/* Sort selector */}
                <div className="flex items-center space-x-1">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[8px] flex-shrink-0">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-1.5 text-[11px] text-slate-300 focus:outline-none"
                  >
                    <option value="score">By Score</option>
                    <option value="businessName">By Name</option>
                    <option value="city">By City</option>
                    <option value="category">By Category</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                    className="p-1.5 bg-slate-900 border border-slate-850 hover:bg-slate-800 rounded-lg text-slate-400"
                    title={sortOrder === 'desc' ? 'Descending' : 'Ascending'}
                  >
                    <span className="text-[10px] font-bold">{sortOrder === 'desc' ? '▼' : '▲'}</span>
                  </button>
                </div>

                {/* Category filtering */}
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[8px] flex-shrink-0">Cat:</span>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-1.5 text-[11px] text-slate-300 focus:outline-none"
                  >
                    <option value="All">All Categories</option>
                    <option value="Cafe">Cafe</option>
                    <option value="Gym">Gym</option>
                    <option value="Retail">Retail</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="Local Service">Local Service</option>
                  </select>
                </div>

                {/* Priority filtering */}
                <div className="flex items-center space-x-1.5">
                  <span className="text-slate-500 font-bold uppercase tracking-wider text-[8px] flex-shrink-0">Prior:</span>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg py-1.5 px-1.5 text-[11px] text-slate-300 focus:outline-none"
                  >
                    <option value="All">All Priority</option>
                    <option value="Hot">Hot</option>
                    <option value="Warm">Warm</option>
                    <option value="Cold">Cold</option>
                  </select>
                </div>

              </div>

              {/* Grid / List output */}
              <div className="max-h-96 overflow-y-auto border border-slate-900 rounded-xl bg-slate-950/20">
                {filteredLeads.length > 0 ? (
                  <div className="divide-y divide-slate-900">
                    {filteredLeads.map((lead) => {
                      const isActive = selectedLead && selectedLead.id === lead.id;
                      
                      // Priority border mapping
                      let leftBorderColor = 'border-l-indigo-500/20';
                      if (lead.priority === 'Hot') leftBorderColor = 'border-l-rose-500 border-l-4';
                      else if (lead.priority === 'Warm') leftBorderColor = 'border-l-amber-500 border-l-4';
                      else if (lead.priority === 'Cold') leftBorderColor = 'border-l-blue-500 border-l-4';

                      return (
                        <div 
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`p-3.5 flex items-center justify-between hover:bg-slate-900/60 cursor-pointer transition-colors border-l ${leftBorderColor} ${
                            isActive ? 'bg-slate-900/80 shadow-inner' : ''
                          }`}
                        >
                          <div className="space-y-1.5 pr-4 truncate flex-grow">
                            <div className="flex items-center space-x-2 truncate">
                              <h4 className={`font-semibold text-xs sm:text-sm truncate transition-colors ${isActive ? 'text-indigo-400 font-bold' : 'text-slate-100'}`}>
                                {/* Search highlighting inside table logs link */}
                                {searchTerm ? (
                                  (() => {
                                    const text = lead.businessName;
                                    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
                                    return parts.map((part, idx) => 
                                      part.toLowerCase() === searchTerm.toLowerCase() 
                                        ? <mark key={idx} className="bg-indigo-500/35 text-white px-0.5 rounded">{part}</mark>
                                        : part
                                    );
                                  })()
                                ) : (
                                  lead.businessName
                                )}
                              </h4>
                              
                              <span className={`text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded border leading-none ${
                                lead.followUpStatus === 'Converted' ? 'bg-emerald-500/10 text-emerald-450 border-emerald-500/20 text-emerald-400' : 
                                lead.followUpStatus === 'Interested' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 
                                lead.followUpStatus === 'Contacted' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                                lead.followUpStatus === 'Not Interested' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                                'bg-slate-950 text-slate-500 border-slate-900'
                              }`}>
                                {lead.followUpStatus || 'New'}
                              </span>
                            </div>
                            
                            <div className="flex items-center space-x-2 text-[9px] text-slate-500 font-bold tracking-wider uppercase">
                              <span>{lead.category}</span>
                              <span>•</span>
                              <span>{lead.city}, {lead.country || 'India'}</span>
                              {lead.leadCreatedBy && (
                                <>
                                  <span>•</span>
                                  <span className="text-indigo-405 text-indigo-400/80 font-normal">By: {lead.leadCreatedBy}</span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-3.5 flex-shrink-0">
                            {/* Score and priority representation */}
                            <div className="text-right">
                              <span className="font-extrabold text-xs text-slate-200 block">{lead.score}/100</span>
                              <span className={`text-[8px] font-extrabold uppercase tracking-widest ${
                                lead.priority === 'Hot' ? 'text-rose-400' : 
                                lead.priority === 'Warm' ? 'text-amber-400' : 'text-indigo-400'
                              }`}>
                                {lead.priority}
                              </span>
                            </div>

                            <ChevronRight className={`w-4 h-4 text-slate-650 transition-transform ${isActive ? 'translate-x-1 text-indigo-405 text-indigo-400' : ''}`} />
                            
                            <button 
                              type="button" 
                              onClick={(e) => handleDeleteLead(lead.id, e)}
                              className="p-2 hover:bg-rose-950/20 text-slate-550 hover:text-rose-400 rounded-xl transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                      </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-16 px-4 text-center">
                    <AlertCircle className="w-9 h-9 text-slate-800 mx-auto mb-2" />
                    <h4 className="font-semibold text-xs text-slate-500">No records found matching filters</h4>
                    <p className="text-[9px] text-slate-600 mt-1">Try widening your search terms or relaxing category scopes.</p>
                  </div>
                )}
              </div>

            </section>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="bg-slate-950/60 border-t border-slate-900 py-6 mt-12 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-display font-extrabold text-slate-400">B SOCIO PLATFORM</span>
            <span>© 2026. Leadscoring Outreach Automat.</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Developer Portal</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Charter</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-405 hover:text-indigo-400 transition-colors">SDR Support</a>
          </div>
        </div>
      </footer>

      <SpeedInsights />
    </div>
  );
}
