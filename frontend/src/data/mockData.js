// Mock data for the church app

export const churchInfo = {
  name: "Biserica Rhema",
  tagline: "Conectați prin credință",
  address: "Strada Bisericii 123, Iași, România",
  phone: "+40 232 123 456",
  email: "contact@bisericarhema.ro",
  website: "www.bisericarhema.ro",
  socialMedia: {
    facebook: "https://facebook.com/bisericarhema",
    instagram: "https://instagram.com/bisericarhema",
    youtube: "https://youtube.com/@bisericarhema"
  },
  serviceTimes: [
    { day: "Duminică", time: "10:00", name: "Serviciu de Duminică" },
    { day: "Miercuri", time: "19:00", name: "Studiu Biblic" },
    { day: "Vineri", time: "19:00", name: "Întâlnire Tineret" }
  ],
  vision: "Să fim o comunitate vibrantă care transformă vieți prin puterea Evangheliei.",
  mission: "Să facem ucenici, să slujim comunitatea și să glorificăm pe Dumnezeu în tot ceea ce facem.",
  values: [
    { title: "Credință", description: "Ne încredem în Dumnezeu în toate circumstanțele." },
    { title: "Comunitate", description: "Suntem mai puternici împreună." },
    { title: "Slujire", description: "Suntem chemați să slujim cu bucurie." },
    { title: "Excelență", description: "Dăm tot ce avem mai bun în slujba lui Dumnezeu." }
  ]
};

export const leadership = [
  {
    id: 1,
    name: "Pastor Ioan Popescu",
    role: "Pastor Principal",
    bio: "Pastor Ioan slujește biserica din 2005 și are o pasiune pentru predicarea Cuvântului.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Maria Ionescu",
    role: "Director de Închinare",
    bio: "Maria conduce echipa de închinare și are o inimă pentru prezența lui Dumnezeu.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Andrei Munteanu",
    role: "Pastor de Tineret",
    bio: "Andrei lucrează cu tinerii și îi ajută să crească în relația cu Dumnezeu.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Elena Vasilescu",
    role: "Coordonator Copii",
    bio: "Elena se ocupă de programele pentru copii cu dragoste și creativitate.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
  }
];

export const sermons = [
  {
    id: 1,
    title: "Puterea Rugăciunii",
    speaker: "Pastor Ioan Popescu",
    series: "Viața de Rugăciune",
    date: "2025-01-05",
    duration: "45 min",
    category: "Serviciu Duminical",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=225&fit=crop",
    description: "Descoperă cum rugăciunea poate transforma viața ta și relația cu Dumnezeu.",
    bibleReferences: ["Matei 6:5-13", "Filipeni 4:6-7", "1 Tesaloniceni 5:17"]
  },
  {
    id: 2,
    title: "Credință în Timpuri Dificile",
    speaker: "Pastor Ioan Popescu",
    series: "Credință Vie",
    date: "2024-12-29",
    duration: "42 min",
    category: "Serviciu Duminical",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&h=225&fit=crop",
    description: "Cum să ne păstrăm credința puternică chiar și în cele mai grele momente.",
    bibleReferences: ["Evrei 11:1", "Romani 8:28", "Isaia 41:10"]
  },
  {
    id: 3,
    title: "Chemarea la Slujire",
    speaker: "Maria Ionescu",
    series: "Slujire cu Bucurie",
    date: "2024-12-22",
    duration: "38 min",
    category: "Serviciu Duminical",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1478147427282-58a87a120781?w=400&h=225&fit=crop",
    description: "Fiecare credincios este chemat să slujească. Descoperă darul tău.",
    bibleReferences: ["1 Petru 4:10", "Romani 12:6-8", "Efeseni 4:11-12"]
  },
  {
    id: 4,
    title: "Tineri pentru Hristos",
    speaker: "Andrei Munteanu",
    series: "Generația Următoare",
    date: "2024-12-15",
    duration: "35 min",
    category: "Tineret",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=225&fit=crop",
    description: "Mesaj special pentru tinerii care vor să facă diferența în lume.",
    bibleReferences: ["1 Timotei 4:12", "Eclesiastul 12:1", "Proverbe 3:5-6"]
  },
  {
    id: 5,
    title: "Familia după Planul lui Dumnezeu",
    speaker: "Pastor Ioan Popescu",
    series: "Familie Puternică",
    date: "2024-12-08",
    duration: "48 min",
    category: "Serviciu Duminical",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=225&fit=crop",
    description: "Principii biblice pentru o familie sănătoasă și binecuvântată.",
    bibleReferences: ["Efeseni 5:22-33", "Proverbe 22:6", "Coloseni 3:18-21"]
  },
  {
    id: 6,
    title: "Conferință Națională 2024",
    speaker: "Invitat Special",
    series: "Conferințe",
    date: "2024-11-20",
    duration: "55 min",
    category: "Conferință",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=225&fit=crop",
    description: "Mesaj puternic de la conferința națională anuală.",
    bibleReferences: ["Faptele Apostolilor 2:17", "Ioel 2:28"]
  }
];

export const events = [
  {
    id: 1,
    title: "Serviciu de Anul Nou",
    description: "Începem anul împreună în prezența lui Dumnezeu cu laudă și rugăciune.",
    date: "2025-01-01",
    time: "18:00",
    location: "Sala Principală",
    category: "Serviciu Special",
    registrationRequired: false,
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&h=225&fit=crop"
  },
  {
    id: 2,
    title: "Tabără de Tineret",
    description: "Trei zile de părtășie, închinare și distracție pentru tinerii între 14-25 ani.",
    date: "2025-01-17",
    time: "09:00",
    endDate: "2025-01-19",
    location: "Casa de Tabără Slănic Moldova",
    category: "Tineret",
    registrationRequired: true,
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=225&fit=crop"
  },
  {
    id: 3,
    title: "Seară de Rugăciune",
    description: "Ne adunăm să ne rugăm pentru biserică, oraș și țară.",
    date: "2025-01-08",
    time: "19:00",
    location: "Sala de Rugăciune",
    category: "Rugăciune",
    registrationRequired: false,
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=225&fit=crop"
  },
  {
    id: 4,
    title: "Curs Precăsătorie",
    description: "Curs pentru cuplurile care se pregătesc de căsătorie. 6 sesiuni.",
    date: "2025-01-25",
    time: "10:00",
    location: "Sala Mică",
    category: "Familie",
    registrationRequired: true,
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=225&fit=crop"
  },
  {
    id: 5,
    title: "Conferință de Femei",
    description: "O zi specială de încurajare și părtășie pentru femeile din biserică.",
    date: "2025-02-15",
    time: "09:00",
    location: "Sala Principală",
    category: "Conferință",
    registrationRequired: true,
    registrationLink: "#",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=225&fit=crop"
  },
  {
    id: 6,
    title: "Serviciu de Duminică",
    description: "Serviciul nostru săptămânal de închinare și predicare.",
    date: "2025-01-12",
    time: "10:00",
    location: "Sala Principală",
    category: "Serviciu Duminical",
    registrationRequired: false,
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&h=225&fit=crop"
  }
];

export const announcements = [
  {
    id: 1,
    title: "Program de Sărbători",
    content: "Vă anunțăm programul special pentru perioada sărbătorilor. Serviciul de Anul Nou va avea loc pe 1 Ianuarie la ora 18:00. Vă așteptăm cu drag!",
    date: "2024-12-28",
    category: "Important",
    links: []
  },
  {
    id: 2,
    title: "Înscrieri Tabără Tineret",
    content: "Înscrierile pentru tabăra de tineret sunt deschise! Locurile sunt limitate, așa că vă rugăm să vă înscrieți cât mai curând. Cost: 300 RON/persoană.",
    date: "2024-12-20",
    category: "Tineret",
    links: [{ text: "Înscrie-te aici", url: "#" }]
  },
  {
    id: 3,
    title: "Voluntari pentru Copii",
    content: "Căutăm voluntari pentru departamentul de copii. Dacă ai o inimă pentru copii și vrei să te implici, contactează-o pe Elena Vasilescu.",
    date: "2024-12-15",
    category: "Voluntariat",
    links: []
  },
  {
    id: 4,
    title: "Noul Website",
    content: "Ne bucurăm să vă anunțăm că aplicația noastră nouă este acum disponibilă! Puteți urmări predicile, evenimentele și să primiți notificări.",
    date: "2024-12-10",
    category: "General",
    links: []
  },
  {
    id: 5,
    title: "Colectă pentru Familii",
    content: "Organizăm o colectă de alimente și haine pentru familiile nevoiașe din comunitate. Puteți aduce donațiile la secretariatul bisericii.",
    date: "2024-12-05",
    category: "Slujire",
    links: []
  }
];

export const liveStreamInfo = {
  isLive: false,
  currentTitle: "Serviciu de Duminică",
  streamUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  nextServiceDate: "2025-01-12",
  nextServiceTime: "10:00",
  description: "Alătură-te nouă în fiecare duminică pentru serviciul de închinare."
};

export const givingInfo = {
  bankInfo: {
    bankName: "Banca Transilvania",
    accountHolder: "Biserica Rhema Iași",
    iban: "RO49 AAAA 1B31 0073 0000 0000",
    bic: "BTRLRO22",
    details: "Pentru donații, vă rugăm să menționați 'Donație' în descriere."
  },
  onlineOptions: [
    {
      name: "Transfer Bancar",
      description: "Transfer direct în contul bisericii",
      icon: "building"
    },
    {
      name: "Card Bancar",
      description: "Plată online securizată",
      icon: "credit-card"
    },
    {
      name: "Donație Recurentă",
      description: "Setează o donație lunară automată",
      icon: "repeat"
    }
  ],
  verse: {
    text: "Fiecare să dea după cum a hotărât în inima lui: nu cu părere de rău, sau de silă, căci pe cine dă cu bucurie îl iubește Dumnezeu.",
    reference: "2 Corinteni 9:7"
  }
};
