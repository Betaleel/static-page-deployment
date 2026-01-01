from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'church_app')]

# Create the main app
app = FastAPI(title="Biserica Creștină Casa Pâinii API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============== MODELS ==============

class ServiceTime(BaseModel):
    day: str
    time: str
    name: str

class SocialMedia(BaseModel):
    facebook: Optional[str] = None
    instagram: Optional[str] = None
    youtube: Optional[str] = None

class ChurchValue(BaseModel):
    title: str
    description: str

class ChurchInfo(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    tagline: str
    address: str
    phone: str
    email: str
    website: str
    social_media: SocialMedia
    service_times: List[ServiceTime]
    vision: str
    mission: str
    values: List[ChurchValue]

class Leader(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    bio: str
    image: Optional[str] = None

class Sermon(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    video_id: str
    title: str
    speaker: str
    series: Optional[str] = None
    date: str
    duration: Optional[str] = "Live"
    category: str
    video_url: str
    thumbnail: str
    description: Optional[str] = None
    bible_references: List[str] = []
    views: int = 0
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Event(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description: str
    date: str
    time: str
    end_date: Optional[str] = None
    location: str
    category: str
    registration_required: bool = False
    registration_link: Optional[str] = None
    image: Optional[str] = None

class AnnouncementLink(BaseModel):
    text: str
    url: str

class Announcement(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    content: str
    date: str
    category: str
    links: List[AnnouncementLink] = []

class LiveStreamInfo(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    is_live: bool = False
    current_title: str
    stream_url: str
    channel_url: str
    next_service_date: str
    next_service_time: str
    description: str

class BankInfo(BaseModel):
    bank_name: str
    account_holder: str
    iban: str
    bic: str
    details: str

class GivingOption(BaseModel):
    name: str
    description: str
    icon: str

class Verse(BaseModel):
    text: str
    reference: str

class GivingInfo(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    bank_info: BankInfo
    online_options: List[GivingOption]
    verse: Verse

class ContactMessage(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str

# ============== ROUTES ==============

@api_router.get("/")
async def root():
    return {"message": "Biserica Creștină Casa Pâinii API", "status": "running"}

# Church Info
@api_router.get("/church-info", response_model=ChurchInfo)
async def get_church_info():
    info = await db.church_info.find_one({}, {"_id": 0})
    if not info:
        raise HTTPException(status_code=404, detail="Church info not found")
    return info

# Leadership
@api_router.get("/leadership", response_model=List[Leader])
async def get_leadership():
    leaders = await db.leaders.find({}, {"_id": 0}).to_list(100)
    return leaders

# Sermons
@api_router.get("/sermons", response_model=List[Sermon])
async def get_sermons(
    category: Optional[str] = Query(None),
    speaker: Optional[str] = Query(None),
    series: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    limit: int = Query(50, le=100)
):
    query = {}
    if category:
        query["category"] = category
    if speaker:
        query["speaker"] = {"$regex": speaker, "$options": "i"}
    if series:
        query["series"] = series
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    sermons = await db.sermons.find(query, {"_id": 0}).sort("date", -1).to_list(limit)
    return sermons

@api_router.get("/sermons/{sermon_id}", response_model=Sermon)
async def get_sermon(sermon_id: str):
    sermon = await db.sermons.find_one({"id": sermon_id}, {"_id": 0})
    if not sermon:
        raise HTTPException(status_code=404, detail="Sermon not found")
    return sermon

# Events
@api_router.get("/events", response_model=List[Event])
async def get_events(
    category: Optional[str] = Query(None),
    upcoming: bool = Query(True)
):
    query = {}
    if category:
        query["category"] = category
    
    events = await db.events.find(query, {"_id": 0}).sort("date", 1 if upcoming else -1).to_list(100)
    return events

@api_router.get("/events/{event_id}", response_model=Event)
async def get_event(event_id: str):
    event = await db.events.find_one({"id": event_id}, {"_id": 0})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event

# Announcements
@api_router.get("/announcements", response_model=List[Announcement])
async def get_announcements(limit: int = Query(20, le=50)):
    announcements = await db.announcements.find({}, {"_id": 0}).sort("date", -1).to_list(limit)
    return announcements

# Live Stream Info
@api_router.get("/live-stream", response_model=LiveStreamInfo)
async def get_live_stream_info():
    info = await db.live_stream.find_one({}, {"_id": 0})
    if not info:
        raise HTTPException(status_code=404, detail="Live stream info not found")
    return info

# Giving Info
@api_router.get("/giving", response_model=GivingInfo)
async def get_giving_info():
    info = await db.giving_info.find_one({}, {"_id": 0})
    if not info:
        raise HTTPException(status_code=404, detail="Giving info not found")
    return info

# Contact
@api_router.post("/contact", response_model=ContactMessage)
async def submit_contact_message(message: ContactMessageCreate):
    msg = ContactMessage(**message.model_dump())
    doc = msg.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return msg

# Seed endpoint (for initial data population)
@api_router.post("/seed")
async def seed_database():
    """Seed the database with initial data"""
    
    # Church Info
    church_info = {
        "id": str(uuid.uuid4()),
        "name": "Biserica Creștină Casa Pâinii",
        "tagline": "O familie vibrantă în Hristos",
        "address": "Ocna Mureș, Alba, România",
        "phone": "+40 258 871 234",
        "email": "contact@casapainii.ro",
        "website": "www.casapainii.ro",
        "social_media": {
            "facebook": "https://www.facebook.com/CasaPainii.OcnaMures/",
            "instagram": "https://instagram.com/casapainii",
            "youtube": "https://www.youtube.com/channel/UCM784D_A8_Sl5-bcTbt8c4A"
        },
        "service_times": [
            {"day": "Duminică", "time": "10:00", "name": "Serviciu de Duminică"},
            {"day": "Miercuri", "time": "19:00", "name": "Studiu Biblic"},
            {"day": "Vineri", "time": "19:00", "name": "Întâlnire Tineret"}
        ],
        "vision": "Să fim o familie vibrantă în cadrul căreia fiecare persoană să experimenteze bucuria și puterea lui Dumnezeu în fiecare domeniu al vieții.",
        "mission": "Să-L glorificăm pe Dumnezeu ajutând pe oameni să devină urmași ai lui Isus.",
        "values": [
            {"title": "Credință", "description": "Ne încredem în Dumnezeu în toate circumstanțele."},
            {"title": "Comunitate", "description": "Suntem mai puternici împreună, ca o familie."},
            {"title": "Slujire", "description": "Suntem chemați să slujim cu bucurie."},
            {"title": "Excelență", "description": "Dăm tot ce avem mai bun în slujba lui Dumnezeu."}
        ]
    }
    await db.church_info.delete_many({})
    await db.church_info.insert_one(church_info)
    
    # Leadership
    leaders = [
        {"id": str(uuid.uuid4()), "name": "Pastor Principal", "role": "Pastor Principal", "bio": "Slujește biserica cu dedicație și pasiune pentru predicarea Cuvântului.", "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"},
        {"id": str(uuid.uuid4()), "name": "Echipa de Închinare", "role": "Director de Închinare", "bio": "Conduce echipa de închinare și are o inimă pentru prezența lui Dumnezeu.", "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"},
        {"id": str(uuid.uuid4()), "name": "Departament Tineret", "role": "Pastor de Tineret", "bio": "Lucrează cu tinerii și îi ajută să crească în relația cu Dumnezeu.", "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"},
        {"id": str(uuid.uuid4()), "name": "Departament Copii", "role": "Coordonator Copii", "bio": "Se ocupă de programele pentru copii cu dragoste și creativitate.", "image": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face"}
    ]
    await db.leaders.delete_many({})
    await db.leaders.insert_many(leaders)
    
    # Sermons (from real YouTube)
    sermons = [
        {"id": str(uuid.uuid4()), "video_id": "VOvCfdV-qGI", "title": "Așteptăm revenirea Domnului", "speaker": "Biserica Creștină Casa Pâinii", "series": "Serviciu Duminical", "date": "2024-12-28", "duration": "Live", "category": "Serviciu Duminical", "video_url": "https://www.youtube.com/watch?v=VOvCfdV-qGI", "thumbnail": "https://i3.ytimg.com/vi/VOvCfdV-qGI/hqdefault.jpg", "description": "Transmisie de la Casa Pâinii, Ocna Mureș", "bible_references": [], "views": 0},
        {"id": str(uuid.uuid4()), "video_id": "TRk9MRYIwc0", "title": "Sărbătoarea Nașterii Mântuitorului - În vremea aceea, s-a împlinit vremea", "speaker": "Biserica Creștină Casa Pâinii", "series": "Crăciun", "date": "2024-12-25", "duration": "Live", "category": "Crăciun", "video_url": "https://www.youtube.com/watch?v=TRk9MRYIwc0", "thumbnail": "https://i1.ytimg.com/vi/TRk9MRYIwc0/hqdefault.jpg", "description": "Transmisie de la Casa Pâinii, Ocna Mureș", "bible_references": [], "views": 0},
        {"id": str(uuid.uuid4()), "video_id": "Tq2xG4OFfDY", "title": "Surprizele primului Crăciun", "speaker": "Biserica Creștină Casa Pâinii", "series": "Crăciun", "date": "2024-12-21", "duration": "Live", "category": "Crăciun", "video_url": "https://www.youtube.com/watch?v=Tq2xG4OFfDY", "thumbnail": "https://i1.ytimg.com/vi/Tq2xG4OFfDY/hqdefault.jpg", "description": "Transmisie de la Casa Pâinii, Ocna Mureș", "bible_references": [], "views": 0},
        {"id": str(uuid.uuid4()), "video_id": "Rpxcsby-Lv4", "title": "Acasă de Crăciun 2024", "speaker": "Biserica Creștină Casa Pâinii", "series": "Crăciun", "date": "2024-12-15", "duration": "Live", "category": "Crăciun", "video_url": "https://www.youtube.com/watch?v=Rpxcsby-Lv4", "thumbnail": "https://i3.ytimg.com/vi/Rpxcsby-Lv4/hqdefault.jpg", "description": "Transmisie LIVE de la Casa Pâinii, Ocna Mureș", "bible_references": [], "views": 0},
        {"id": str(uuid.uuid4()), "video_id": "OzLoVGA4r7Q", "title": "Acasă de Crăciun - Seara de Colinde", "speaker": "Biserica Creștină Casa Pâinii", "series": "Colinde", "date": "2024-12-15", "duration": "Live", "category": "Colinde", "video_url": "https://www.youtube.com/watch?v=OzLoVGA4r7Q", "thumbnail": "https://i4.ytimg.com/vi/OzLoVGA4r7Q/hqdefault.jpg", "description": "Transmisie de la Casa Pâinii, Ocna Mureș", "bible_references": [], "views": 0},
        {"id": str(uuid.uuid4()), "video_id": "xesMdzk8MAQ", "title": "Miracolul întrupării: Dumnezeu a devenit om", "speaker": "Biserica Creștină Casa Pâinii", "series": "Serviciu Duminical", "date": "2024-12-07", "duration": "Live", "category": "Serviciu Duminical", "video_url": "https://www.youtube.com/watch?v=xesMdzk8MAQ", "thumbnail": "https://i1.ytimg.com/vi/xesMdzk8MAQ/hqdefault.jpg", "description": "Transmisie de la Casa Pâinii, Ocna Mureș", "bible_references": [], "views": 0}
    ]
    await db.sermons.delete_many({})
    await db.sermons.insert_many(sermons)
    
    # Events
    events = [
        {"id": str(uuid.uuid4()), "title": "Serviciu de Anul Nou", "description": "Începem anul împreună în prezența lui Dumnezeu cu laudă și rugăciune.", "date": "2025-01-01", "time": "18:00", "location": "Casa Pâinii, Ocna Mureș", "category": "Serviciu Special", "registration_required": False, "image": "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=400&h=225&fit=crop"},
        {"id": str(uuid.uuid4()), "title": "Tabără de Tineret", "description": "Trei zile de părtășie, închinare și distracție pentru tinerii între 14-25 ani.", "date": "2025-01-17", "time": "09:00", "end_date": "2025-01-19", "location": "Casa de Tabără", "category": "Tineret", "registration_required": True, "registration_link": "#", "image": "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&h=225&fit=crop"},
        {"id": str(uuid.uuid4()), "title": "Seară de Rugăciune", "description": "Ne adunăm să ne rugăm pentru biserică, oraș și țară.", "date": "2025-01-08", "time": "19:00", "location": "Casa Pâinii, Ocna Mureș", "category": "Rugăciune", "registration_required": False, "image": "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=225&fit=crop"},
        {"id": str(uuid.uuid4()), "title": "Serviciu de Duminică", "description": "Serviciul nostru săptămânal de închinare și predicare.", "date": "2025-01-12", "time": "10:00", "location": "Casa Pâinii, Ocna Mureș", "category": "Serviciu Duminical", "registration_required": False, "image": "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&h=225&fit=crop"}
    ]
    await db.events.delete_many({})
    await db.events.insert_many(events)
    
    # Announcements
    announcements = [
        {"id": str(uuid.uuid4()), "title": "Program de Sărbători", "content": "Vă anunțăm programul special pentru perioada sărbătorilor. Serviciul de Anul Nou va avea loc pe 1 Ianuarie la ora 18:00. Vă așteptăm cu drag!", "date": "2024-12-28", "category": "Important", "links": []},
        {"id": str(uuid.uuid4()), "title": "Transmisiuni Live pe YouTube", "content": "Toate serviciile noastre sunt transmise live pe canalul nostru de YouTube. Abonați-vă pentru a nu pierde nicio transmisiune!", "date": "2024-12-20", "category": "General", "links": [{"text": "Canal YouTube", "url": "https://www.youtube.com/channel/UCM784D_A8_Sl5-bcTbt8c4A"}]},
        {"id": str(uuid.uuid4()), "title": "Voluntari pentru Copii", "content": "Căutăm voluntari pentru departamentul de copii. Dacă ai o inimă pentru copii și vrei să te implici, contactează-ne.", "date": "2024-12-15", "category": "Voluntariat", "links": []}
    ]
    await db.announcements.delete_many({})
    await db.announcements.insert_many(announcements)
    
    # Live Stream Info
    live_stream = {
        "id": str(uuid.uuid4()),
        "is_live": False,
        "current_title": "Serviciu de Duminică",
        "stream_url": "https://www.youtube.com/channel/UCM784D_A8_Sl5-bcTbt8c4A/live",
        "channel_url": "https://www.youtube.com/channel/UCM784D_A8_Sl5-bcTbt8c4A",
        "next_service_date": "2025-01-12",
        "next_service_time": "10:00",
        "description": "Alătură-te nouă în fiecare duminică pentru serviciul de închinare. Transmisie LIVE de la Casa Pâinii, Ocna Mureș."
    }
    await db.live_stream.delete_many({})
    await db.live_stream.insert_one(live_stream)
    
    # Giving Info
    giving_info = {
        "id": str(uuid.uuid4()),
        "bank_info": {
            "bank_name": "Banca Transilvania",
            "account_holder": "Biserica Creștină Casa Pâinii",
            "iban": "RO49 AAAA 1B31 0073 0000 0000",
            "bic": "BTRLRO22",
            "details": "Pentru donații, vă rugăm să menționați 'Donație' în descriere."
        },
        "online_options": [
            {"name": "Transfer Bancar", "description": "Transfer direct în contul bisericii", "icon": "building"},
            {"name": "Card Bancar", "description": "Plată online securizată", "icon": "credit-card"},
            {"name": "Donație Recurentă", "description": "Setează o donație lunară automată", "icon": "repeat"}
        ],
        "verse": {
            "text": "Fiecare să dea după cum a hotărât în inima lui: nu cu părere de rău, sau de silă, căci pe cine dă cu bucurie îl iubește Dumnezeu.",
            "reference": "2 Corinteni 9:7"
        }
    }
    await db.giving_info.delete_many({})
    await db.giving_info.insert_one(giving_info)
    
    return {"message": "Database seeded successfully", "collections": ["church_info", "leaders", "sermons", "events", "announcements", "live_stream", "giving_info"]}

# Sync sermons from YouTube RSS
@api_router.post("/sync-youtube")
async def sync_youtube_sermons():
    """Fetch latest videos from YouTube RSS and update sermons collection"""
    import aiohttp
    import xml.etree.ElementTree as ET
    
    CHANNEL_ID = 'UCM784D_A8_Sl5-bcTbt8c4A'
    RSS_URL = f'https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}'
    
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(RSS_URL) as response:
                if response.status != 200:
                    raise HTTPException(status_code=500, detail="Failed to fetch YouTube RSS")
                xml_text = await response.text()
        
        root = ET.fromstring(xml_text)
        ns = {
            'atom': 'http://www.w3.org/2005/Atom',
            'yt': 'http://www.youtube.com/xml/schemas/2015',
            'media': 'http://search.yahoo.com/mrss/'
        }
        
        new_sermons = []
        for entry in root.findall('atom:entry', ns):
            video_id = entry.find('yt:videoId', ns).text
            title = entry.find('atom:title', ns).text
            published = entry.find('atom:published', ns).text.split('T')[0]
            
            # Determine category from title
            title_lower = title.lower()
            if 'colind' in title_lower:
                category = 'Colinde'
            elif 'craciun' in title_lower or 'crăciun' in title_lower:
                category = 'Crăciun'
            elif 'tineret' in title_lower:
                category = 'Tineret'
            else:
                category = 'Serviciu Duminical'
            
            sermon = {
                "id": str(uuid.uuid4()),
                "video_id": video_id,
                "title": title,
                "speaker": "Biserica Creștină Casa Pâinii",
                "series": category,
                "date": published,
                "duration": "Live",
                "category": category,
                "video_url": f"https://www.youtube.com/watch?v={video_id}",
                "thumbnail": f"https://i.ytimg.com/vi/{video_id}/hqdefault.jpg",
                "description": "Transmisie de la Casa Pâinii, Ocna Mureș",
                "bible_references": [],
                "views": 0
            }
            new_sermons.append(sermon)
        
        # Update database (upsert based on video_id)
        for sermon in new_sermons:
            await db.sermons.update_one(
                {"video_id": sermon["video_id"]},
                {"$set": sermon},
                upsert=True
            )
        
        return {"message": f"Synced {len(new_sermons)} videos from YouTube", "count": len(new_sermons)}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
