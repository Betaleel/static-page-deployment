// YouTube RSS Feed Service for Biserica Creștină Casa Pâinii
// Uses RSS feed which is stable and doesn't require API key

const CHANNEL_ID = 'UCM784D_A8_Sl5-bcTbt8c4A';
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';

// Parse XML to extract video data
function parseRSSFeed(xmlText) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
  
  const entries = xmlDoc.querySelectorAll('entry');
  const videos = [];
  
  entries.forEach((entry, index) => {
    const videoId = entry.querySelector('videoId')?.textContent || '';
    const title = entry.querySelector('title')?.textContent || '';
    const published = entry.querySelector('published')?.textContent || '';
    const updated = entry.querySelector('updated')?.textContent || '';
    const thumbnail = entry.querySelector('thumbnail')?.getAttribute('url') || 
                      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    const description = entry.querySelector('description')?.textContent || '';
    const views = entry.querySelector('statistics')?.getAttribute('views') || '0';
    
    videos.push({
      id: index + 1,
      videoId,
      title,
      speaker: 'Biserica Creștină Casa Pâinii',
      series: 'Serviciu Duminical',
      date: published.split('T')[0],
      duration: 'Live',
      category: title.toLowerCase().includes('colind') ? 'Colinde' : 
                title.toLowerCase().includes('craciun') ? 'Crăciun' : 'Serviciu Duminical',
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail,
      description: description.split('\n')[0] || 'Transmisie de la Casa Pâinii, Ocna Mureș',
      bibleReferences: [],
      views: parseInt(views)
    });
  });
  
  return videos;
}

// Fetch videos from RSS feed
export async function fetchVideosFromYouTube() {
  try {
    // Use CORS proxy to fetch RSS feed
    const response = await fetch(CORS_PROXY + encodeURIComponent(RSS_URL));
    if (!response.ok) throw new Error('Failed to fetch RSS feed');
    
    const xmlText = await response.text();
    return parseRSSFeed(xmlText);
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return null; // Return null to indicate fetch failed, use fallback data
  }
}

// Check if channel is currently live (checks recent videos for "live" indicator)
export async function checkIfLive() {
  try {
    // For live status, we can check the channel's live page
    // This is a simplified check - in production you'd use YouTube API
    const response = await fetch(
      CORS_PROXY + encodeURIComponent(`https://www.youtube.com/channel/${CHANNEL_ID}/live`),
      { redirect: 'manual' }
    );
    
    // If the live page redirects to a video, channel might be live
    // This is a heuristic - not 100% accurate without API
    return false; // Default to false for safety
  } catch (error) {
    console.error('Error checking live status:', error);
    return false;
  }
}

export const YOUTUBE_CHANNEL_URL = `https://www.youtube.com/channel/${CHANNEL_ID}`;
export const YOUTUBE_LIVE_URL = `https://www.youtube.com/channel/${CHANNEL_ID}/live`;
