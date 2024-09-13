import { HTMLMotionProps, motion } from "framer-motion"
import { forwardRef, LegacyRef, MouseEventHandler } from "react"

type TagData = Record<'slug' | 'name' | 'url', string>

const tags: TagData[] = [
    {
      "slug": "history",
      "name": "History",
      "url": "https://dummyjson.com/posts/tag/history"
    },
    {
      "slug": "american",
      "name": "American",
      "url": "https://dummyjson.com/posts/tag/american"
    },
    {
      "slug": "crime",
      "name": "Crime",
      "url": "https://dummyjson.com/posts/tag/crime"
    },
    {
      "slug": "french",
      "name": "French",
      "url": "https://dummyjson.com/posts/tag/french"
    },
    {
      "slug": "fiction",
      "name": "Fiction",
      "url": "https://dummyjson.com/posts/tag/fiction"
    },
    {
      "slug": "english",
      "name": "English",
      "url": "https://dummyjson.com/posts/tag/english"
    },
    {
      "slug": "magical",
      "name": "Magical",
      "url": "https://dummyjson.com/posts/tag/magical"
    },
    {
      "slug": "mystery",
      "name": "Mystery",
      "url": "https://dummyjson.com/posts/tag/mystery"
    },
    {
      "slug": "love",
      "name": "Love",
      "url": "https://dummyjson.com/posts/tag/love"
    },
    {
      "slug": "classic",
      "name": "Classic",
      "url": "https://dummyjson.com/posts/tag/classic"
    },
    {
      "slug": "memory",
      "name": "Memory",
      "url": "https://dummyjson.com/posts/tag/memory"
    },
    {
      "slug": "nostalgia",
      "name": "Nostalgia",
      "url": "https://dummyjson.com/posts/tag/nostalgia"
    },
    {
      "slug": "nature",
      "name": "Nature",
      "url": "https://dummyjson.com/posts/tag/nature"
    },
    {
      "slug": "tranquility",
      "name": "Tranquility",
      "url": "https://dummyjson.com/posts/tag/tranquility"
    },
    {
      "slug": "life",
      "name": "Life",
      "url": "https://dummyjson.com/posts/tag/life"
    },
    {
      "slug": "books",
      "name": "Books",
      "url": "https://dummyjson.com/posts/tag/books"
    },
    {
      "slug": "adventure",
      "name": "Adventure",
      "url": "https://dummyjson.com/posts/tag/adventure"
    },
    {
      "slug": "escape",
      "name": "Escape",
      "url": "https://dummyjson.com/posts/tag/escape"
    },
    {
      "slug": "city",
      "name": "City",
      "url": "https://dummyjson.com/posts/tag/city"
    },
    {
      "slug": "urban",
      "name": "Urban",
      "url": "https://dummyjson.com/posts/tag/urban"
    },
    {
      "slug": "energy",
      "name": "Energy",
      "url": "https://dummyjson.com/posts/tag/energy"
    },
    {
      "slug": "stars",
      "name": "Stars",
      "url": "https://dummyjson.com/posts/tag/stars"
    },
    {
      "slug": "universe",
      "name": "Universe",
      "url": "https://dummyjson.com/posts/tag/universe"
    },
    {
      "slug": "wonder",
      "name": "Wonder",
      "url": "https://dummyjson.com/posts/tag/wonder"
    },
    {
      "slug": "stories",
      "name": "Stories",
      "url": "https://dummyjson.com/posts/tag/stories"
    },
    {
      "slug": "emotion",
      "name": "Emotion",
      "url": "https://dummyjson.com/posts/tag/emotion"
    },
    {
      "slug": "ocean",
      "name": "Ocean",
      "url": "https://dummyjson.com/posts/tag/ocean"
    },
    {
      "slug": "power",
      "name": "Power",
      "url": "https://dummyjson.com/posts/tag/power"
    },
    {
      "slug": "beauty",
      "name": "Beauty",
      "url": "https://dummyjson.com/posts/tag/beauty"
    },
    {
      "slug": "garden",
      "name": "Garden",
      "url": "https://dummyjson.com/posts/tag/garden"
    },
    {
      "slug": "color",
      "name": "Color",
      "url": "https://dummyjson.com/posts/tag/color"
    },
    {
      "slug": "harmony",
      "name": "Harmony",
      "url": "https://dummyjson.com/posts/tag/harmony"
    },
    {
      "slug": "peace",
      "name": "Peace",
      "url": "https://dummyjson.com/posts/tag/peace"
    },
    {
      "slug": "reflection",
      "name": "Reflection",
      "url": "https://dummyjson.com/posts/tag/reflection"
    },
    {
      "slug": "serenity",
      "name": "Serenity",
      "url": "https://dummyjson.com/posts/tag/serenity"
    },
    {
      "slug": "music",
      "name": "Music",
      "url": "https://dummyjson.com/posts/tag/music"
    },
    {
      "slug": "joy",
      "name": "Joy",
      "url": "https://dummyjson.com/posts/tag/joy"
    },
    {
      "slug": "lighthouse",
      "name": "Lighthouse",
      "url": "https://dummyjson.com/posts/tag/lighthouse"
    },
    {
      "slug": "hope",
      "name": "Hope",
      "url": "https://dummyjson.com/posts/tag/hope"
    },
    {
      "slug": "ruins",
      "name": "Ruins",
      "url": "https://dummyjson.com/posts/tag/ruins"
    },
    {
      "slug": "desert",
      "name": "Desert",
      "url": "https://dummyjson.com/posts/tag/desert"
    },
    {
      "slug": "resilience",
      "name": "Resilience",
      "url": "https://dummyjson.com/posts/tag/resilience"
    },
    {
      "slug": "bridge",
      "name": "Bridge",
      "url": "https://dummyjson.com/posts/tag/bridge"
    },
    {
      "slug": "engineering",
      "name": "Engineering",
      "url": "https://dummyjson.com/posts/tag/engineering"
    },
    {
      "slug": "rain",
      "name": "Rain",
      "url": "https://dummyjson.com/posts/tag/rain"
    },
    {
      "slug": "market",
      "name": "Market",
      "url": "https://dummyjson.com/posts/tag/market"
    },
    {
      "slug": "vibrant",
      "name": "Vibrant",
      "url": "https://dummyjson.com/posts/tag/vibrant"
    },
    {
      "slug": "mansion",
      "name": "Mansion",
      "url": "https://dummyjson.com/posts/tag/mansion"
    },
    {
      "slug": "train",
      "name": "Train",
      "url": "https://dummyjson.com/posts/tag/train"
    },
    {
      "slug": "journey",
      "name": "Journey",
      "url": "https://dummyjson.com/posts/tag/journey"
    },
    {
      "slug": "landscape",
      "name": "Landscape",
      "url": "https://dummyjson.com/posts/tag/landscape"
    },
    {
      "slug": "village",
      "name": "Village",
      "url": "https://dummyjson.com/posts/tag/village"
    },
    {
      "slug": "community",
      "name": "Community",
      "url": "https://dummyjson.com/posts/tag/community"
    },
    {
      "slug": "tradition",
      "name": "Tradition",
      "url": "https://dummyjson.com/posts/tag/tradition"
    },
    {
      "slug": "library",
      "name": "Library",
      "url": "https://dummyjson.com/posts/tag/library"
    },
    {
      "slug": "knowledge",
      "name": "Knowledge",
      "url": "https://dummyjson.com/posts/tag/knowledge"
    },
    {
      "slug": "meadow",
      "name": "Meadow",
      "url": "https://dummyjson.com/posts/tag/meadow"
    },
    {
      "slug": "flowers",
      "name": "Flowers",
      "url": "https://dummyjson.com/posts/tag/flowers"
    },
    {
      "slug": "piano",
      "name": "Piano",
      "url": "https://dummyjson.com/posts/tag/piano"
    },
    {
      "slug": "kitchen",
      "name": "Kitchen",
      "url": "https://dummyjson.com/posts/tag/kitchen"
    },
    {
      "slug": "family",
      "name": "Family",
      "url": "https://dummyjson.com/posts/tag/family"
    },
    {
      "slug": "lake",
      "name": "Lake",
      "url": "https://dummyjson.com/posts/tag/lake"
    },
    {
      "slug": "mountain",
      "name": "Mountain",
      "url": "https://dummyjson.com/posts/tag/mountain"
    },
    {
      "slug": "inspiration",
      "name": "Inspiration",
      "url": "https://dummyjson.com/posts/tag/inspiration"
    },
    {
      "slug": "beach",
      "name": "Beach",
      "url": "https://dummyjson.com/posts/tag/beach"
    },
    {
      "slug": "sunset",
      "name": "Sunset",
      "url": "https://dummyjson.com/posts/tag/sunset"
    },
    {
      "slug": "theater",
      "name": "Theater",
      "url": "https://dummyjson.com/posts/tag/theater"
    },
    {
      "slug": "culture",
      "name": "Culture",
      "url": "https://dummyjson.com/posts/tag/culture"
    },
    {
      "slug": "sanctuary",
      "name": "Sanctuary",
      "url": "https://dummyjson.com/posts/tag/sanctuary"
    },
    {
      "slug": "bookshop",
      "name": "Bookshop",
      "url": "https://dummyjson.com/posts/tag/bookshop"
    },
    {
      "slug": "magic",
      "name": "Magic",
      "url": "https://dummyjson.com/posts/tag/magic"
    },
    {
      "slug": "orchard",
      "name": "Orchard",
      "url": "https://dummyjson.com/posts/tag/orchard"
    },
    {
      "slug": "blossom",
      "name": "Blossom",
      "url": "https://dummyjson.com/posts/tag/blossom"
    },
    {
      "slug": "marketplace",
      "name": "Marketplace",
      "url": "https://dummyjson.com/posts/tag/marketplace"
    },
    {
      "slug": "journal",
      "name": "Journal",
      "url": "https://dummyjson.com/posts/tag/journal"
    },
    {
      "slug": "memories",
      "name": "Memories",
      "url": "https://dummyjson.com/posts/tag/memories"
    },
    {
      "slug": "secrets",
      "name": "Secrets",
      "url": "https://dummyjson.com/posts/tag/secrets"
    },
    {
      "slug": "paradise",
      "name": "Paradise",
      "url": "https://dummyjson.com/posts/tag/paradise"
    },
    {
      "slug": "fair",
      "name": "Fair",
      "url": "https://dummyjson.com/posts/tag/fair"
    },
    {
      "slug": "celebration",
      "name": "Celebration",
      "url": "https://dummyjson.com/posts/tag/celebration"
    },
    {
      "slug": "cabin",
      "name": "Cabin",
      "url": "https://dummyjson.com/posts/tag/cabin"
    },
    {
      "slug": "woods",
      "name": "Woods",
      "url": "https://dummyjson.com/posts/tag/woods"
    },
    {
      "slug": "retreat",
      "name": "Retreat",
      "url": "https://dummyjson.com/posts/tag/retreat"
    },
    {
      "slug": "art",
      "name": "Art",
      "url": "https://dummyjson.com/posts/tag/art"
    },
    {
      "slug": "gallery",
      "name": "Gallery",
      "url": "https://dummyjson.com/posts/tag/gallery"
    },
    {
      "slug": "concert",
      "name": "Concert",
      "url": "https://dummyjson.com/posts/tag/concert"
    },
    {
      "slug": "farm",
      "name": "Farm",
      "url": "https://dummyjson.com/posts/tag/farm"
    },
    {
      "slug": "activity",
      "name": "Activity",
      "url": "https://dummyjson.com/posts/tag/activity"
    },
    {
      "slug": "trail",
      "name": "Trail",
      "url": "https://dummyjson.com/posts/tag/trail"
    },
    {
      "slug": "challenge",
      "name": "Challenge",
      "url": "https://dummyjson.com/posts/tag/challenge"
    },
    {
      "slug": "cove",
      "name": "Cove",
      "url": "https://dummyjson.com/posts/tag/cove"
    },
    {
      "slug": "ballroom",
      "name": "Ballroom",
      "url": "https://dummyjson.com/posts/tag/ballroom"
    },
    {
      "slug": "elegance",
      "name": "Elegance",
      "url": "https://dummyjson.com/posts/tag/elegance"
    },
    {
      "slug": "grandeur",
      "name": "Grandeur",
      "url": "https://dummyjson.com/posts/tag/grandeur"
    },
    {
      "slug": "castle",
      "name": "Castle",
      "url": "https://dummyjson.com/posts/tag/castle"
    },
    {
      "slug": "ancient",
      "name": "Ancient",
      "url": "https://dummyjson.com/posts/tag/ancient"
    },
    {
      "slug": "river",
      "name": "River",
      "url": "https://dummyjson.com/posts/tag/river"
    },
    {
      "slug": "valley",
      "name": "Valley",
      "url": "https://dummyjson.com/posts/tag/valley"
    },
    {
      "slug": "calm",
      "name": "Calm",
      "url": "https://dummyjson.com/posts/tag/calm"
    },
    {
      "slug": "harbor",
      "name": "Harbor",
      "url": "https://dummyjson.com/posts/tag/harbor"
    },
    {
      "slug": "festival",
      "name": "Festival",
      "url": "https://dummyjson.com/posts/tag/festival"
    },
    {
      "slug": "summer",
      "name": "Summer",
      "url": "https://dummyjson.com/posts/tag/summer"
    },
    {
      "slug": "forest",
      "name": "Forest",
      "url": "https://dummyjson.com/posts/tag/forest"
    },
    {
      "slug": "autumn",
      "name": "Autumn",
      "url": "https://dummyjson.com/posts/tag/autumn"
    },
    {
      "slug": "snow",
      "name": "Snow",
      "url": "https://dummyjson.com/posts/tag/snow"
    },
    {
      "slug": "botanical",
      "name": "Botanical",
      "url": "https://dummyjson.com/posts/tag/botanical"
    },
    {
      "slug": "coast",
      "name": "Coast",
      "url": "https://dummyjson.com/posts/tag/coast"
    },
    {
      "slug": "cliffs",
      "name": "Cliffs",
      "url": "https://dummyjson.com/posts/tag/cliffs"
    },
    {
      "slug": "square",
      "name": "Square",
      "url": "https://dummyjson.com/posts/tag/square"
    },
    {
      "slug": "charm",
      "name": "Charm",
      "url": "https://dummyjson.com/posts/tag/charm"
    },
    {
      "slug": "temple",
      "name": "Temple",
      "url": "https://dummyjson.com/posts/tag/temple"
    },
    {
      "slug": "jungle",
      "name": "Jungle",
      "url": "https://dummyjson.com/posts/tag/jungle"
    },
    {
      "slug": "spirituality",
      "name": "Spirituality",
      "url": "https://dummyjson.com/posts/tag/spirituality"
    },
    {
      "slug": "stream",
      "name": "Stream",
      "url": "https://dummyjson.com/posts/tag/stream"
    },
    {
      "slug": "diversity",
      "name": "Diversity",
      "url": "https://dummyjson.com/posts/tag/diversity"
    },
    {
      "slug": "oak",
      "name": "Oak",
      "url": "https://dummyjson.com/posts/tag/oak"
    },
    {
      "slug": "strength",
      "name": "Strength",
      "url": "https://dummyjson.com/posts/tag/strength"
    },
    {
      "slug": "tea",
      "name": "Tea",
      "url": "https://dummyjson.com/posts/tag/tea"
    },
    {
      "slug": "hospitality",
      "name": "Hospitality",
      "url": "https://dummyjson.com/posts/tag/hospitality"
    },
    {
      "slug": "connection",
      "name": "Connection",
      "url": "https://dummyjson.com/posts/tag/connection"
    },
    {
      "slug": "farmstead",
      "name": "Farmstead",
      "url": "https://dummyjson.com/posts/tag/farmstead"
    },
    {
      "slug": "rural",
      "name": "Rural",
      "url": "https://dummyjson.com/posts/tag/rural"
    },
    {
      "slug": "simplicity",
      "name": "Simplicity",
      "url": "https://dummyjson.com/posts/tag/simplicity"
    },
    {
      "slug": "waterfall",
      "name": "Waterfall",
      "url": "https://dummyjson.com/posts/tag/waterfall"
    },
    {
      "slug": "majestic",
      "name": "Majestic",
      "url": "https://dummyjson.com/posts/tag/majestic"
    },
    {
      "slug": "coastal",
      "name": "Coastal",
      "url": "https://dummyjson.com/posts/tag/coastal"
    },
    {
      "slug": "seafood",
      "name": "Seafood",
      "url": "https://dummyjson.com/posts/tag/seafood"
    },
    {
      "slug": "food",
      "name": "Food",
      "url": "https://dummyjson.com/posts/tag/food"
    },
    {
      "slug": "cathedral",
      "name": "Cathedral",
      "url": "https://dummyjson.com/posts/tag/cathedral"
    },
    {
      "slug": "faith",
      "name": "Faith",
      "url": "https://dummyjson.com/posts/tag/faith"
    },
    {
      "slug": "architecture",
      "name": "Architecture",
      "url": "https://dummyjson.com/posts/tag/architecture"
    },
    {
      "slug": "street",
      "name": "Street",
      "url": "https://dummyjson.com/posts/tag/street"
    },
    {
      "slug": "windmill",
      "name": "Windmill",
      "url": "https://dummyjson.com/posts/tag/windmill"
    },
    {
      "slug": "countryside",
      "name": "Countryside",
      "url": "https://dummyjson.com/posts/tag/countryside"
    },
    {
      "slug": "hills",
      "name": "Hills",
      "url": "https://dummyjson.com/posts/tag/hills"
    },
    {
      "slug": "pastoral",
      "name": "Pastoral",
      "url": "https://dummyjson.com/posts/tag/pastoral"
    },
    {
      "slug": "inn",
      "name": "Inn",
      "url": "https://dummyjson.com/posts/tag/inn"
    },
    {
      "slug": "view",
      "name": "View",
      "url": "https://dummyjson.com/posts/tag/view"
    },
    {
      "slug": "aqueducts",
      "name": "Aqueducts",
      "url": "https://dummyjson.com/posts/tag/aqueducts"
    },
    {
      "slug": "remote",
      "name": "Remote",
      "url": "https://dummyjson.com/posts/tag/remote"
    },
    {
      "slug": "tranquil",
      "name": "Tranquil",
      "url": "https://dummyjson.com/posts/tag/tranquil"
    },
    {
      "slug": "fortress",
      "name": "Fortress",
      "url": "https://dummyjson.com/posts/tag/fortress"
    },
    {
      "slug": "sea",
      "name": "Sea",
      "url": "https://dummyjson.com/posts/tag/sea"
    },
    {
      "slug": "cottage",
      "name": "Cottage",
      "url": "https://dummyjson.com/posts/tag/cottage"
    },
    {
      "slug": "charming",
      "name": "Charming",
      "url": "https://dummyjson.com/posts/tag/charming"
    },
    {
      "slug": "trade",
      "name": "Trade",
      "url": "https://dummyjson.com/posts/tag/trade"
    },
    {
      "slug": "vineyard",
      "name": "Vineyard",
      "url": "https://dummyjson.com/posts/tag/vineyard"
    },
    {
      "slug": "wine",
      "name": "Wine",
      "url": "https://dummyjson.com/posts/tag/wine"
    },
    {
      "slug": "town",
      "name": "Town",
      "url": "https://dummyjson.com/posts/tag/town"
    },
    {
      "slug": "pond",
      "name": "Pond",
      "url": "https://dummyjson.com/posts/tag/pond"
    },
    {
      "slug": "wildlife",
      "name": "Wildlife",
      "url": "https://dummyjson.com/posts/tag/wildlife"
    },
    {
      "slug": "senses",
      "name": "Senses",
      "url": "https://dummyjson.com/posts/tag/senses"
    },
    {
      "slug": "picturesque",
      "name": "Picturesque",
      "url": "https://dummyjson.com/posts/tag/picturesque"
    },
    {
      "slug": "mountains",
      "name": "Mountains",
      "url": "https://dummyjson.com/posts/tag/mountains"
    },
    {
      "slug": "snowy",
      "name": "Snowy",
      "url": "https://dummyjson.com/posts/tag/snowy"
    },
    {
      "slug": "park",
      "name": "Park",
      "url": "https://dummyjson.com/posts/tag/park"
    },
    {
      "slug": "oasis",
      "name": "Oasis",
      "url": "https://dummyjson.com/posts/tag/oasis"
    },
    {
      "slug": "farmhouse",
      "name": "Farmhouse",
      "url": "https://dummyjson.com/posts/tag/farmhouse"
    },
    {
      "slug": "rustic",
      "name": "Rustic",
      "url": "https://dummyjson.com/posts/tag/rustic"
    },
    {
      "slug": "fields",
      "name": "Fields",
      "url": "https://dummyjson.com/posts/tag/fields"
    },
    {
      "slug": "sunlit",
      "name": "Sunlit",
      "url": "https://dummyjson.com/posts/tag/sunlit"
    },
    {
      "slug": "colorful",
      "name": "Colorful",
      "url": "https://dummyjson.com/posts/tag/colorful"
    },
    {
      "slug": "serene",
      "name": "Serene",
      "url": "https://dummyjson.com/posts/tag/serene"
    },
    {
      "slug": "church",
      "name": "Church",
      "url": "https://dummyjson.com/posts/tag/church"
    },
    {
      "slug": "streets",
      "name": "Streets",
      "url": "https://dummyjson.com/posts/tag/streets"
    },
    {
      "slug": "bookstore",
      "name": "Bookstore",
      "url": "https://dummyjson.com/posts/tag/bookstore"
    },
    {
      "slug": "cozy",
      "name": "Cozy",
      "url": "https://dummyjson.com/posts/tag/cozy"
    },
    {
      "slug": "skyline",
      "name": "Skyline",
      "url": "https://dummyjson.com/posts/tag/skyline"
    },
    {
      "slug": "night",
      "name": "Night",
      "url": "https://dummyjson.com/posts/tag/night"
    },
    {
      "slug": "peaceful",
      "name": "Peaceful",
      "url": "https://dummyjson.com/posts/tag/peaceful"
    }
  ]

const animateConfigData: HTMLMotionProps<'div'> = {
    initial: {
        opacity: 0,
        height: 0,
    },
    animate: {
        opacity: 1,
        height: "auto",

    },
    transition: {
        duration: .4,
        ease: 'easeInOut',
        opacity: {
            duration: .2,
            ease: 'easeInOut',
        }
    },
    exit: {
        opacity: 0,
        height: 0,

    }
}

type TagsContainerProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>)=>void
}

const TagsContainer = forwardRef(({ onClick }: TagsContainerProps, ref: LegacyRef<HTMLDivElement>) => {
    return(
        <motion.div ref={ref} {...animateConfigData} className="absolute top-0 overflow-hidden left-1/2 -translate-x-1/2 w-3/5 bg-white rounded-b-lg py-3 px-5 flex flex-col justify-end gap-8 box-shadow-1">
            <div>
                <p className="first-letter:capitalize text-2xl font-semibold">all tags</p>
            </div>
            <div className="mt-2  max-h-96 overflow-auto">
                <ul className="flex flex-wrap justify-center gap-x-3 gap-y-5 capitalize px-5">
                    {tags.map(el=><li key={el.name} className="flex"><a href="" className="bg-red-500 py-1 px-3 rounded-[4px]">{el.slug}</a></li>)}
                </ul>
            </div>
            <div className="text-end">
                <button type="button" onClick={onClick} className="capitalize bg-red-700 py-1 px-4 rounded-md font" >reset</button>
            </div>
        </motion.div>
    )
})

export default TagsContainer