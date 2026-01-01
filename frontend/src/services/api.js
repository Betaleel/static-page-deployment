// API Service for fetching data from backend

const API_BASE = '/api';

// Helper function to handle API responses
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API fetch error for ${endpoint}:`, error);
    throw error;
  }
}

// Church Info
export async function getChurchInfo() {
  return fetchAPI('/church-info');
}

// Leadership
export async function getLeadership() {
  return fetchAPI('/leadership');
}

// Sermons
export async function getSermons(params = {}) {
  const query = new URLSearchParams();
  if (params.category) query.append('category', params.category);
  if (params.speaker) query.append('speaker', params.speaker);
  if (params.series) query.append('series', params.series);
  if (params.search) query.append('search', params.search);
  if (params.limit) query.append('limit', params.limit);
  
  const queryString = query.toString();
  return fetchAPI(`/sermons${queryString ? `?${queryString}` : ''}`);
}

export async function getSermon(id) {
  return fetchAPI(`/sermons/${id}`);
}

// Events
export async function getEvents(params = {}) {
  const query = new URLSearchParams();
  if (params.category) query.append('category', params.category);
  if (params.upcoming !== undefined) query.append('upcoming', params.upcoming);
  
  const queryString = query.toString();
  return fetchAPI(`/events${queryString ? `?${queryString}` : ''}`);
}

export async function getEvent(id) {
  return fetchAPI(`/events/${id}`);
}

// Announcements
export async function getAnnouncements(limit = 20) {
  return fetchAPI(`/announcements?limit=${limit}`);
}

// Live Stream
export async function getLiveStreamInfo() {
  return fetchAPI('/live-stream');
}

// Giving Info
export async function getGivingInfo() {
  return fetchAPI('/giving');
}

// Contact
export async function submitContactMessage(data) {
  return fetchAPI('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// Sync YouTube (admin function)
export async function syncYouTube() {
  return fetchAPI('/sync-youtube', { method: 'POST' });
}

// Transform API data to match frontend format
export function transformSermon(sermon) {
  return {
    id: sermon.id,
    videoId: sermon.video_id,
    title: sermon.title,
    speaker: sermon.speaker,
    series: sermon.series,
    date: sermon.date,
    duration: sermon.duration,
    category: sermon.category,
    videoUrl: sermon.video_url,
    thumbnail: sermon.thumbnail,
    description: sermon.description,
    bibleReferences: sermon.bible_references || [],
    views: sermon.views || 0,
  };
}

export function transformEvent(event) {
  return {
    id: event.id,
    title: event.title,
    description: event.description,
    date: event.date,
    time: event.time,
    endDate: event.end_date,
    location: event.location,
    category: event.category,
    registrationRequired: event.registration_required,
    registrationLink: event.registration_link,
    image: event.image,
  };
}

export function transformAnnouncement(announcement) {
  return {
    id: announcement.id,
    title: announcement.title,
    content: announcement.content,
    date: announcement.date,
    category: announcement.category,
    links: announcement.links || [],
  };
}

export function transformChurchInfo(info) {
  return {
    name: info.name,
    tagline: info.tagline,
    address: info.address,
    phone: info.phone,
    email: info.email,
    website: info.website,
    socialMedia: info.social_media,
    serviceTimes: info.service_times,
    vision: info.vision,
    mission: info.mission,
    values: info.values,
  };
}

export function transformLiveStream(info) {
  return {
    isLive: info.is_live,
    currentTitle: info.current_title,
    streamUrl: info.stream_url,
    channelUrl: info.channel_url,
    nextServiceDate: info.next_service_date,
    nextServiceTime: info.next_service_time,
    description: info.description,
  };
}

export function transformGivingInfo(info) {
  return {
    bankInfo: {
      bankName: info.bank_info.bank_name,
      accountHolder: info.bank_info.account_holder,
      iban: info.bank_info.iban,
      bic: info.bank_info.bic,
      details: info.bank_info.details,
    },
    onlineOptions: info.online_options,
    verse: info.verse,
  };
}

export function transformLeader(leader) {
  return {
    id: leader.id,
    name: leader.name,
    role: leader.role,
    bio: leader.bio,
    image: leader.image,
  };
}
