// Data for the church app - Biserica Creștină Casa Pâinii

export const churchInfo = {
  name: "Biserica Creștină Casa Pâinii",
  tagline: "O familie vibrantă în Hristos",
  address: "Ocna Mureș, Alba, România",
  phone: "+40 258 871 234",
  email: "contact@casapainii.ro",
  website: "www.casapainii.ro",
  socialMedia: {
    facebook: "https://www.facebook.com/CasaPainii.OcnaMures/",
    instagram: "https://instagram.com/casapainii",
    youtube: "https://www.youtube.com/channel/UCM784D_A8_Sl5-bcTbt8c4A"
  },
  serviceTimes: [
    { day: "Duminică", time: "10:00", name: "Serviciu de Duminică" },
    { day: "Miercuri", time: "19:00", name: "Studiu Biblic" },
    { day: "Vineri", time: "19:00", name: "Întâlnire Tineret" }
  ],
  vision: "Să fim o familie vibrantă în cadrul căreia fiecare persoană să experimenteze bucuria și puterea lui Dumnezeu în fiecare domeniu al vieții.",
  mission: "Să-L glorificăm pe Dumnezeu ajutând pe oameni să devină urmași ai lui Isus.",
  values: [
    { title: "Credință", description: "Ne încredem în Dumnezeu în toate circumstanțele." },
    { title: "Comunitate", description: "Suntem mai puternici împreună, ca o familie." },
    { title: "Slujire", description: "Suntem chemați să slujim cu bucurie." },
    { title: "Excelență", description: "Dăm tot ce avem mai bun în slujba lui Dumnezeu." }
  ]
};

export const leadership = [
  {
    id: 1,
    name: "Pastor Principal",
    role: "Pastor Principal",
    bio: "Slujește biserica cu dedicație și pasiune pentru predicarea Cuvântului.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Echipa de Închinare",
    role: "Director de Închinare",
    bio: "Conduce echipa de închinare și are o inimă pentru prezența lui Dumnezeu.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Departament Tineret",
    role: "Pastor de Tineret",
    bio: "Lucrează cu tinerii și îi ajută să crească în relația cu Dumnezeu.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Departament Copii",
    role: "Coordonator Copii",
    bio: "Se ocupă de programele pentru copii cu dragoste și creativitate.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"
  }
];

// Fallback sermons - will be replaced by real YouTube data
export const sermons = [
  {
    id: 1,
    videoId: "VOvCfdV-qGI",
    title: "Așteptăm revenirea Domnului",
    speaker: "Biserica Creștină Casa Pâinii",
    series: "Serviciu Duminical",
    date: "2024-12-28",
    duration: "Live",
    category: "Serviciu Duminical",
    videoUrl: "https://www.youtube.com/watch?v=VOvCfdV-qGI",
    thumbnail: "https://i3.ytimg.com/vi/VOvCfdV-qGI/hqdefault.jpg",
    description: "Transmisie de la Casa Pâinii, Ocna Mureș",
    bibleReferences: []
  },
  {
    id: 2,
    videoId: "TRk9MRYIwc0",
    title: "Sărbătoarea Nașterii Mântuitorului - În vremea aceea, s-a împlinit vremea",
    speaker: "Biserica Creștină Casa Pâinii",
    series: "Crăciun",
    date: "2024-12-25",
    duration: "Live",
    category: "Crăciun",
    videoUrl: "https://www.youtube.com/watch?v=TRk9MRYIwc0",
    thumbnail: "https://i1.ytimg.com/vi/TRk9MRYIwc0/hqdefault.jpg",
    description: "Transmisie de la Casa Pâinii, Ocna Mureș",
    bibleReferences: []
  },
  {
    id: 3,
    videoId: "Tq2xG4OFfDY",
    title: "Surprizele primului Crăciun",
    speaker: "Biserica Creștină Casa Pâinii",
    series: "Crăciun",
    date: "2024-12-21",
    duration: "Live",
    category: "Crăciun",
    videoUrl: "https://www.youtube.com/watch?v=Tq2xG4OFfDY",
    thumbnail: "https://i1.ytimg.com/vi/Tq2xG4OFfDY/hqdefault.jpg",
    description: "Transmisie de la Casa Pâinii, Ocna Mureș",
    bibleReferences: []
  },
  {
    id: 4,
    videoId: "Rpxcsby-Lv4",
    title: "Acasă de Crăciun 2024",
    speaker: "Biserica Creștină Casa Pâinii",
    series: "Crăciun",
    date: "2024-12-15",
    duration: "Live",
    category: "Crăciun",
    videoUrl: "https://www.youtube.com/watch?v=Rpxcsby-Lv4",
    thumbnail: "https://i3.ytimg.com/vi/Rpxcsby-Lv4/hqdefault.jpg",
    description: "Transmisie LIVE de la Casa Pâinii, Ocna Mureș",
    bibleReferences: []
  },
  {
    id: 5,
    videoId: "OzLoVGA4r7Q",
    title: "Acasă de Crăciun - Seara de Colinde",
    speaker: "Biserica Creștină Casa Pâinii",
    series: "Colinde",
    date: "2024-12-15",
    duration: "Live",
    category: "Colinde",
    videoUrl: "https://www.youtube.com/watch?v=OzLoVGA4r7Q",
    thumbnail: "https://i4.ytimg.com/vi/OzLoVGA4r7Q/hqdefault.jpg",
    description: "Transmisie de la Casa Pâinii, Ocna Mureș",
    bibleReferences: []
  },
  {
    id: 6,
    videoId: "xesMdzk8MAQ",
    title: "Miracolul întrupării: Dumnezeu a devenit om",
    speaker: "Biserica Creștină Casa Pâinii",
    series: "Serviciu Duminical",
    date: "2024-12-07",
    duration: "Live",
    category: "Serviciu Duminical",
    videoUrl: "https://www.youtube.com/watch?v=xesMdzk8MAQ",
    thumbnail: "https://i1.ytimg.com/vi/xesMdzk8MAQ/hqdefault.jpg",
    description: "Transmisie de la Casa Pâinii, Ocna Mureș",
    bibleReferences: []
  }
];

export const events = [
  {
    id: 1,
    title: "Serviciu de Anul Nou",
    description: "Începem anul împreună în prezența lui Dumnezeu cu laudă și rugăciune.",
    date: "2025-01-01",
    time: "18:00",
    location: "Casa Pâinii, Ocna Mureș",
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
    location: "Casa de Tabără",
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
    location: "Casa Pâinii, Ocna Mureș",
    category: "Rugăciune",
    registrationRequired: false,
    image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=225&fit=crop"
  },
  {
    id: 4,
    title: "Serviciu de Duminică",
    description: "Serviciul nostru săptămânal de închinare și predicare.",
    date: "2025-01-12",
    time: "10:00",
    location: "Casa Pâinii, Ocna Mureș",
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
    title: "Transmisiuni Live pe YouTube",
    content: "Toate serviciile noastre sunt transmise live pe canalul nostru de YouTube. Abonați-vă pentru a nu pierde nicio transmisiune!",
    date: "2024-12-20",
    category: "General",
    links: [{ text: "Canal YouTube", url: "https://www.youtube.com/channel/UCM784D_A8_Sl5-bcTbt8c4A" }]
  },
  {
    id: 3,
    title: "Voluntari pentru Copii",
    content: "Căutăm voluntari pentru departamentul de copii. Dacă ai o inimă pentru copii și vrei să te implici, contactează-ne.",
    date: "2024-12-15",
    category: "Voluntariat",
    links: []
  }
];

export const liveStreamInfo = {
  isLive: false,
  currentTitle: "Serviciu de Duminică",
  streamUrl: "https://www.youtube.com/channel/UCM784D_A8_Sl5-bcTbt8c4A/live",
  channelUrl: "https://www.youtube.com/channel/UCM784D_A8_Sl5-bcTbt8c4A",
  nextServiceDate: "2025-01-12",
  nextServiceTime: "10:00",
  description: "Alătură-te nouă în fiecare duminică pentru serviciul de închinare. Transmisie LIVE de la Casa Pâinii, Ocna Mureș."
};

export const givingInfo = {
  bankInfo: {
    bankName: "BRD",
    accountHolder: "Biserica Creștină Casa Pâinii",
    iban: "RO24BRDE010SV42968800100",
    bic: "BRDEROBU",
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
