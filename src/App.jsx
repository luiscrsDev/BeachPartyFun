import { useState } from "react";
import { Search, MapPin, Star, Heart, User, Menu, X, SlidersHorizontal, ChevronRight } from "lucide-react";

const NAVY  = "#1B3A5C";
const GOLD  = "#F5A623";
const CORAL = "#E8604C";
const WHITE = "#FFFFFF";

// ─── Regions ────────────────────────────────────────────────────────────────
const regions = [
  { id: "all",         label: "All Properties", icon: "🌴" },
  { id: "miami-beach", label: "Miami Beach",    icon: "🌊" },
  { id: "key-west",    label: "Key West",       icon: "🦩" },
  { id: "sarasota",    label: "Sarasota",       icon: "🌅" },
  { id: "homestead",   label: "Homestead",      icon: "🌾" },
];

// ─── Properties ─────────────────────────────────────────────────────────────
const properties = [
  { id:1, region:"miami-beach", title:"Penthouse Ocean Drive",          location:"South Beach, Miami Beach",       type:"Luxury Penthouse",  price:620, rating:4.97, reviews:214, beds:3, baths:2, guests:6, tag:"Top Pick",          tagColor:CORAL,     gradient:`linear-gradient(135deg,${NAVY} 0%,#1a6bb5 50%,#7ecef4 100%)`,  emoji:"🏙️", image:"https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?auto=format&fit=crop&w=600&h=400&q=80", highlights:["Ocean view","Private pool","24h Concierge"] },
  { id:2, region:"miami-beach", title:"Art Deco Villa Collins Ave",     location:"Mid-Beach, Miami Beach",         type:"Historic Villa",    price:380, rating:4.92, reviews:87,  beds:2, baths:2, guests:4, tag:null,               tagColor:null,      gradient:`linear-gradient(135deg,${NAVY} 0%,#2c5282 50%,#4a90d9 100%)`,  emoji:"🏛️", image:"https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=600&h=400&q=80", highlights:["Art Deco architecture","Steps to beach","Tropical garden"] },
  { id:3, region:"miami-beach", title:"Beachfront Luxury Apartment",    location:"North Beach, Miami Beach",       type:"Apartment",         price:290, rating:4.88, reviews:163, beds:2, baths:1, guests:4, tag:null,               tagColor:null,      gradient:`linear-gradient(135deg,#0d4f3c 0%,#1a8a6e 50%,#5ecfb0 100%)`, emoji:"🌴", image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=400&q=80", highlights:["Oceanfront","Gourmet kitchen","Parking included"] },
  { id:4, region:"key-west",   title:"Conch Cottage — Old Town Heart", location:"Old Town, Key West",             type:"Historic Cottage",  price:310, rating:4.96, reviews:301, beds:2, baths:1, guests:4, tag:"Guest Favorite",   tagColor:"#00A699", gradient:`linear-gradient(135deg,#7b2d00 0%,${CORAL} 50%,#f1948a 100%)`, emoji:"🏡", image:"https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&h=400&q=80", highlights:["Century-old home","Porch swing","5 min Duval St"] },
  { id:5, region:"key-west",   title:"Tropical Bungalow with Pool",    location:"New Town, Key West",             type:"Bungalow",          price:420, rating:4.91, reviews:119, beds:3, baths:2, guests:6, tag:null,               tagColor:null,      gradient:`linear-gradient(135deg,#4a1a6b 0%,#8e44ad 50%,#c39bd3 100%)`, emoji:"🌺", image:"https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&h=400&q=80", highlights:["Private pool","Private pier","Gulf views"] },
  { id:6, region:"sarasota",   title:"Siesta Key Beachfront Villa",    location:"Siesta Key, Sarasota",           type:"Beach Villa",       price:545, rating:4.98, reviews:78,  beds:4, baths:3, guests:8, tag:"New",              tagColor:GOLD,      gradient:`linear-gradient(135deg,#7a4000 0%,${GOLD} 50%,#f9ca74 100%)`, emoji:"🌊", image:"https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=600&h=400&q=80", highlights:["White sand at door","Chef kitchen","BBQ gazebo"] },
  { id:7, region:"sarasota",   title:"Lido Beach Cottage",             location:"Lido Beach, Sarasota",           type:"Cottage",           price:280, rating:4.85, reviews:54,  beds:2, baths:2, guests:4, tag:null,               tagColor:null,      gradient:`linear-gradient(135deg,#0d5c4a 0%,#16a085 50%,#76d7c4 100%)`, emoji:"🏖️", image:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&h=400&q=80", highlights:["Beach access","Bikes included","St. Armands nearby"] },
  { id:8, region:"homestead",  title:"Organic Farm — Redland Estate",  location:"Redland, Homestead",             type:"Boutique Farm",     price:195, rating:4.94, reviews:142, beds:2, baths:1, guests:4, tag:"Unique Experience",tagColor:"#27ae60", gradient:`linear-gradient(135deg,#1a4a1a 0%,#27ae60 50%,#a9dfbf 100%)`, emoji:"🌿", image:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&h=400&q=80", highlights:["Pick-your-own harvest","Farm trails","Organic breakfast"] },
  { id:9, region:"homestead",  title:"Everglades Edge Cabin",          location:"Homestead, near National Park", type:"Eco-cabin",         price:165, rating:4.89, reviews:96,  beds:1, baths:1, guests:2, tag:null,               tagColor:null,      gradient:`linear-gradient(135deg,#3b1f0f 0%,#8d6e63 50%,#bcaaa4 100%)`, emoji:"🌳", image:"https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&h=400&q=80", highlights:["Everglades gateway","Bird watching","Rustic & cozy"] },
];

// ─── Regional services ───────────────────────────────────────────────────────
const services = {
  "miami-beach": [
    { icon:"🍹", cat:"Dining & Bars",    items:["Joe's Stone Crab (since 1913)","Zuma Rooftop – Japanese fusion","Nikki Beach Club","La Sandwicherie – locals' fave"] },
    { icon:"🏄", cat:"Activities",       items:["Surfing lessons at South Beach","Art Basel (December)","Lincoln Road flea market","Wynwood Walls graffiti tour"] },
    { icon:"🏖️", cat:"Beaches",         items:["South Beach (12th St) – most vibrant","Lummus Park – family-friendly","North Shore Open Space Park","Haulover Sandbar"] },
    { icon:"🚗", cat:"Getting Around",   items:["Miami Beach Trolley – free","Citi Bike rentals","Water taxi to Brickell","Uber/Lyft widely available"] },
  ],
  "key-west": [
    { icon:"🌮", cat:"Dining & Bars",    items:["Sloppy Joe's – Hemingway's spot","Blue Heaven for brunch","Mallory Square sunset","Pepe's Café (est. 1909)"] },
    { icon:"🤿", cat:"Activities",       items:["Snorkeling at Dry Tortugas","Sunset catamaran cruise","Kayak through mangroves","Hemingway Home & Museum"] },
    { icon:"🐬", cat:"Nature",           items:["Key West Butterfly Conservatory","Fort Zachary Taylor State Park","Smathers Beach – calmest waters","Dolphin watching tours"] },
    { icon:"🚲", cat:"Getting Around",   items:["Bicycle – best way in Old Town","Conch Tour Train","Golf cart rentals","Duval Street is walkable"] },
  ],
  sarasota: [
    { icon:"🎭", cat:"Arts & Culture",   items:["The Ringling Museum of Art","Asolo Repertory Theatre","Sarasota Opera House","Art Center Sarasota"] },
    { icon:"🍽️", cat:"Dining",          items:["Owen's Fish Camp – Gulf catch","Der Dutchman – Amish comfort","Selva Grill – Latin flavors","Pastry Art Bake Shoppe"] },
    { icon:"🌊", cat:"Beaches",          items:["Siesta Key – voted #1 US beach","Lido Beach – family-friendly","Venice Beach – shark teeth","Longboat Key – exclusive"] },
    { icon:"🏝️", cat:"Day Trips",       items:["Myakka River State Park airboat","St. Armands Circle shopping","Mote Marine Aquarium","Midnight Pass kayak trail"] },
  ],
  homestead: [
    { icon:"🌿", cat:"Farm Experiences", items:["Knaus Berry Farm – cinnamon rolls!","Schnebly Redland's Winery","Robert Is Here fruit stand","Coral Castle – mystery landmark"] },
    { icon:"🐊", cat:"Nature & Parks",   items:["Everglades National Park","Biscayne National Park boat tour","Florida City Eco Heritage Trail","Anhinga Trail bird watching"] },
    { icon:"🚜", cat:"Farm Tours",       items:["Avocado & mango grove tours","Organic herb farms","Tropical fruit orchards","Bee-keeping experience"] },
    { icon:"🌮", cat:"Local Food",       items:["Rosita's Restaurante – Mexican","El Toro Taqueria – local fave","Cici's Sandwiches","Miami Produce Market"] },
  ],
};

// ─── Curiosities ─────────────────────────────────────────────────────────────
const curiosities = {
  "miami-beach": [
    { emoji:"🏛️", fact:"Miami Beach has the largest collection of Art Deco architecture in the world — over 800 buildings protected by the National Register of Historic Places." },
    { emoji:"🌡️", fact:"Miami Beach averages 248 sunny days per year, with water temperatures rarely dropping below 72°F — making it a true year-round beach destination." },
    { emoji:"🎨", fact:"Wynwood Walls, just 15 min from the beach, is the world's largest open-air street art museum, founded in 2009 and drawing 600,000 visitors annually." },
    { emoji:"🦀", fact:"Joe's Stone Crab (open since 1913) is so iconic their crabs are flown to restaurants across the US. The season runs October to May only." },
  ],
  "key-west": [
    { emoji:"🌅", fact:"Key West is the southernmost point in the continental US, just 90 miles from Cuba — marked by a famous buoy at Whitehead & South Street." },
    { emoji:"✍️", fact:"Ernest Hemingway lived in Key West for 12 years, writing 'A Farewell to Arms' here. His six-toed cats still roam his historic home." },
    { emoji:"🌈", fact:"Key West was the first city in Florida to host a Pride parade (1982) and is consistently ranked one of the most LGBTQ+-friendly destinations worldwide." },
    { emoji:"🦐", fact:"The 'Conch Republic' was born in 1982 when Key West symbolically seceded from the US — then surrendered after one minute and applied for $1 billion in foreign aid." },
  ],
  sarasota: [
    { emoji:"🎪", fact:"John Ringling of Ringling Brothers Circus moved to Sarasota in the 1920s and essentially built the city, donating his mansion and world-class art collection." },
    { emoji:"🏖️", fact:"Siesta Key's sand is 99% pure quartz crystal — so fine it stays cool even on the hottest days. It regularly wins 'Best Beach in the USA' rankings." },
    { emoji:"🦅", fact:"Sarasota Bay is home to one of Florida's largest bottlenose dolphin populations. Locals spot them riding bow waves of passing boats year-round." },
    { emoji:"🌃", fact:"Sarasota has more theater seats per capita than any US city outside New York, earning its well-deserved nickname 'The Cultural Coast of Florida'." },
  ],
  homestead: [
    { emoji:"🌿", fact:"The Redland area grows over 500 varieties of tropical fruits — many exotic species found nowhere else in the continental US, from mamey sapote to jackfruit." },
    { emoji:"🐊", fact:"The Everglades is the only place on Earth where alligators and crocodiles naturally coexist. The park protects over 1.5 million acres of subtropical wilderness." },
    { emoji:"🏰", fact:"Coral Castle was built singlehandedly by Edward Leedskalnin using hand tools between 1923–1951. He moved 1,100 tons of coral alone — the method was never revealed." },
    { emoji:"🚀", fact:"Homestead Air Reserve Base played a critical role in the Cuban Missile Crisis of 1962, flying reconnaissance missions over Cuba from just 100 miles away." },
  ],
};

const allCuriosities = Object.values(curiosities).flat();

// ─── Sub-components ──────────────────────────────────────────────────────────
function BPFLogo({ size = "md" }) {
  const sz = { sm:"text-lg", md:"text-2xl", lg:"text-4xl" }[size];
  return (
    <span style={{ fontFamily:"Georgia,'Times New Roman',serif" }}>
      <span className={`${sz} font-extrabold`}        style={{ color:WHITE }}> Beach</span>
      <span className={`${sz} font-extrabold italic`} style={{ color:GOLD  }}>Party</span>
      <span className={`${sz} font-extrabold`}        style={{ color:CORAL }}>Fun</span>
    </span>
  );
}

function PropertyCard({ property }) {
  const [liked, setLiked] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group">
      <div className="relative h-48 overflow-hidden" style={{ background:property.gradient }}>
        {/* Real photo — falls back to gradient+emoji on error */}
        {property.image && !imgErr ? (
          <img
            src={property.image}
            alt={property.title}
            onError={()=>setImgErr(true)}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-20 group-hover:scale-110 transition-transform duration-500 select-none pointer-events-none">
            {property.emoji}
          </div>
        )}
        {/* Dark gradient overlay so text is always readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 p-3">
          <p className="text-white text-xs uppercase tracking-widest font-semibold drop-shadow">{property.type}</p>
        </div>
        {property.tag && (
          <div className="absolute top-3 left-3 text-white text-xs font-bold px-3 py-1 rounded-full shadow" style={{ backgroundColor:property.tagColor }}>
            {property.tag}
          </div>
        )}
        <button
          onClick={(e)=>{ e.stopPropagation(); setLiked(!liked); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white bg-opacity-90 flex items-center justify-center shadow hover:scale-110 transition-transform"
        >
          <Heart size={15} className={liked ? "fill-red-500 text-red-500" : "text-gray-400"} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-semibold text-gray-900 text-sm leading-tight flex-1 pr-2">{property.title}</h3>
          <div className="flex items-center gap-1 shrink-0">
            <Star size={12} className="fill-gray-900 text-gray-900" />
            <span className="text-sm font-semibold">{property.rating}</span>
            <span className="text-gray-400 text-xs">({property.reviews})</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
          <MapPin size={11} /><span>{property.location}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {property.highlights.slice(0,2).map((h,i)=>(
            <span key={i} className="text-xs rounded-full px-2 py-0.5 border" style={{ backgroundColor:"#EBF5FB", color:NAVY, borderColor:"#BEE3F8" }}>{h}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-400">{property.beds} bd · {property.baths} ba · {property.guests} guests</span>
          <div>
            <span className="font-bold text-gray-900">${property.price}</span>
            <span className="text-gray-400 text-xs"> /night</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesSection({ regionId }) {
  const [activeTab, setActiveTab] = useState(0);
  const currentServices = regionId !== "all" ? services[regionId] : null;

  return (
    <div className="mt-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold" style={{ color:NAVY }}>Local Services & Experiences</h2>
        <p className="text-gray-500 text-sm mt-1">The best of what each destination has to offer</p>
      </div>

      {regionId === "all" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.entries(services).map(([regId, cats])=>{
            const reg = regions.find(r=>r.id===regId);
            return (
              <div key={regId} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{reg?.icon}</span>
                  <h3 className="font-bold text-lg" style={{ color:NAVY }}>{reg?.label}</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {cats.map((cat,i)=>(
                    <div key={i}>
                      <div className="flex items-center gap-1.5 mb-2">
                        <span className="text-base">{cat.icon}</span>
                        <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">{cat.cat}</span>
                      </div>
                      <ul className="space-y-1">
                        {cat.items.slice(0,3).map((item,j)=>(
                          <li key={j} className="text-xs text-gray-500 flex items-start gap-1">
                            <ChevronRight size={10} className="mt-0.5 shrink-0" style={{ color:GOLD }} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-100">
            {currentServices.map((cat,i)=>(
              <button
                key={i}
                onClick={()=>setActiveTab(i)}
                className="flex items-center gap-2 px-5 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2"
                style={ activeTab===i ? { borderBottomColor:CORAL, color:NAVY } : { borderBottomColor:"transparent", color:"#888" } }
              >
                <span>{cat.icon}</span>{cat.cat}
              </button>
            ))}
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentServices[activeTab]?.items.map((item,i)=>(
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition cursor-pointer">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm" style={{ backgroundColor:"#FEF3E2" }}>
                    {currentServices[activeTab].icon}
                  </div>
                  <span className="text-sm text-gray-700 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CuriositiesSection({ regionId }) {
  const facts = regionId === "all" ? allCuriosities : (curiosities[regionId] || []);
  const regionLabel = regions.find(r=>r.id===regionId)?.label || "South Florida";

  return (
    <div className="mt-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold" style={{ color:NAVY }}>
          Did You Know? {regionId !== "all" && <span style={{ color:CORAL }}>— {regionLabel}</span>}
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          {regionId === "all"
            ? "Fascinating facts about South Florida's most iconic destinations"
            : `Fascinating facts about ${regionLabel}`}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {facts.map((item,i)=>(
          <div
            key={i}
            className="rounded-2xl p-5 border border-gray-100 hover:shadow-md transition"
            style={{ background: i%2===0 ? "#FEFBF3" : "#F0F8FF" }}
          >
            <div className="text-3xl mb-3 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: i%2===0 ? "#FEF3E2" : "#E8F4FD" }}>
              {item.emoji}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{item.fact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeRegion, setActiveRegion] = useState("all");
  const [searchValue,  setSearchValue]  = useState("");

  const filtered = properties.filter(p =>
    (activeRegion === "all" || p.region === activeRegion) &&
    (searchValue === "" ||
      p.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      p.location.toLowerCase().includes(searchValue.toLowerCase()))
  );

  const regionCounts = regions.map(r => ({
    ...r,
    count: r.id === "all" ? properties.length : properties.filter(p => p.region === r.id).length,
  }));

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor:"#f7f8fa" }}>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white border-opacity-10 shadow-sm" style={{ backgroundColor:NAVY }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="shrink-0"><BPFLogo size="md" /></div>

          <div className="flex-1 max-w-xl">
            <div className="flex items-center bg-white rounded-full px-4 py-2 gap-2 shadow-inner">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                placeholder="Search Miami Beach, Key West, Sarasota, Homestead…"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
              />
              {searchValue && <button onClick={()=>setSearchValue("")}><X size={14} className="text-gray-400"/></button>}
              <div className="w-px h-4 bg-gray-200"/>
              <SlidersHorizontal size={14} className="text-gray-400"/>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden md:block text-sm font-medium px-4 py-2 rounded-full border" style={{ color:WHITE, borderColor:"rgba(255,255,255,0.3)" }}>
              Become a Host
            </button>
            <button className="flex items-center gap-2 rounded-full px-3 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 transition">
              <Menu size={14} style={{ color:WHITE }}/>
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor:GOLD }}>
                <User size={12} style={{ color:NAVY }}/>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <div className="relative overflow-hidden" style={{ background:`linear-gradient(135deg,${NAVY} 0%,#1a5276 40%,#1b3a5c 70%,#0d1f33 100%)`, minHeight:280 }}>
        <div className="absolute inset-0 flex items-center justify-around text-8xl opacity-10 pointer-events-none select-none">
          🌴 🌊 🦩 🌺 🌾
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background:`linear-gradient(to right,${GOLD},${CORAL},${GOLD})` }}/>
        <div className="relative max-w-7xl mx-auto px-4 py-14 text-center">
          <div className="mb-3"><BPFLogo size="lg"/></div>
          <p className="italic text-lg mb-2 font-light" style={{ color:"rgba(255,255,255,0.75)", fontFamily:"Georgia,serif" }}>
            "Where every stay is a blast."
          </p>
          <p className="text-sm mb-8" style={{ color:"rgba(255,255,255,0.5)", letterSpacing:"0.1em" }}>beachpartyfun.com</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { icon:"🌊", label:"Miami Beach", id:"miami-beach" },
              { icon:"🦩", label:"Key West",    id:"key-west"   },
              { icon:"🌅", label:"Sarasota",    id:"sarasota"   },
              { icon:"🌾", label:"Homestead",   id:"homestead"  },
            ].map(r=>(
              <button
                key={r.id}
                onClick={()=>setActiveRegion(r.id)}
                className="flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-white transition-all"
                style={{ border:`1.5px solid ${activeRegion===r.id ? GOLD : "rgba(255,255,255,0.25)"}`, backgroundColor: activeRegion===r.id ? "rgba(245,166,35,0.25)" : "rgba(255,255,255,0.08)" }}
              >
                {r.icon} {r.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* REGION TABS */}
      <div className="bg-white border-b border-gray-200 sticky top-[73px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
          <div className="flex gap-1 py-2.5 min-w-max">
            {regionCounts.map(r=>(
              <button
                key={r.id}
                onClick={()=>setActiveRegion(r.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap"
                style={ activeRegion===r.id ? { backgroundColor:NAVY, color:WHITE } : { color:"#555" } }
              >
                <span>{r.icon}</span><span>{r.label}</span>
                <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                  style={ activeRegion===r.id ? { backgroundColor:GOLD, color:NAVY } : { backgroundColor:"#eee", color:"#888" } }>
                  {r.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            <span className="font-semibold text-gray-900 text-base">{filtered.length} properties</span>
            {activeRegion !== "all" ? ` in ${regions.find(r=>r.id===activeRegion)?.label}` : " across South Florida"}
            {searchValue && ` matching "${searchValue}"`}
          </p>
          <select className="text-sm border border-gray-200 rounded-full px-3 py-1.5 text-gray-600 focus:outline-none">
            <option>Sort: Featured</option>
            <option>Lowest price</option>
            <option>Highest rated</option>
          </select>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => <PropertyCard key={p.id} property={p}/>)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-semibold text-gray-600">No properties found</p>
            <p className="text-sm text-gray-400 mt-1">Try a different filter or search term.</p>
          </div>
        )}

        <ServicesSection regionId={activeRegion} />
        <CuriositiesSection regionId={activeRegion} />

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6" style={{ color:NAVY }}>Explore Our Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon:"🌊", id:"miami-beach", title:"Miami Beach",  desc:"Glamour, art deco, and world-famous nightlife on the turquoise Atlantic coast." },
              { icon:"🦩", id:"key-west",    title:"Key West",     desc:"Bohemian charm, legendary sunsets, and the southernmost tip of the USA." },
              { icon:"🌅", id:"sarasota",    title:"Sarasota",     desc:"The Gulf Coast gem — pristine white sands and a vibrant cultural scene." },
              { icon:"🌾", id:"homestead",   title:"Homestead",    desc:"Organic farms, Everglades adventures, and authentic South Florida nature." },
            ].map(item=>(
              <div key={item.id} onClick={()=>setActiveRegion(item.id)}
                className="rounded-2xl p-5 bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition cursor-pointer">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-1.5" style={{ color:NAVY }}>{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={{ backgroundColor:NAVY }} className="mt-16">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white border-opacity-10">
            <div>
              <BPFLogo size="md"/>
              <p className="italic text-sm mt-1" style={{ color:"rgba(255,255,255,0.5)", fontFamily:"Georgia,serif" }}>
                "Where every stay becomes a memory."
              </p>
              <p className="text-xs mt-1" style={{ color:"rgba(255,255,255,0.3)" }}>beachpartyfun.com</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {["Miami Beach","Key West","Sarasota","Homestead"].map(dest=>(
                <span key={dest} className="text-xs px-3 py-1.5 rounded-full border" style={{ color:"rgba(255,255,255,0.6)", borderColor:"rgba(255,255,255,0.2)" }}>{dest}</span>
              ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6 text-xs" style={{ color:"rgba(255,255,255,0.4)" }}>
            <span>© 2026 BeachPartyFun · beachpartyfun.com · All rights reserved</span>
            <div className="flex gap-5">
              {["About","Contact","Privacy","Terms"].map(l=>(
                <a key={l} href="#" className="hover:text-white transition">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
