"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Volume2, Heart, BookOpen, Trophy, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Word {
  id: string;
  word: string;
  language: string;
  meaning: string;
  story: string;
  pronunciation: string;
}

const languages = [
  { name: "Arabic", flag: "🇸🇦", code: "ar-SA" },
  { name: "Swahili", flag: "🇰🇪", code: "sw-KE" },
  { name: "Japanese", flag: "🇯🇵", code: "ja-JP" },
  { name: "Hindi", flag: "🇮🇳", code: "hi-IN" },
  { name: "Turkish", flag: "🇹🇷", code: "tr-TR" },
  { name: "Persian", flag: "🇮🇷", code: "fa-IR" },
  { name: "Korean", flag: "🇰🇷", code: "ko-KR" },
  { name: "Portuguese", flag: "🇧🇷", code: "pt-BR" },
  { name: "Russian", flag: "🇷🇺", code: "ru-RU" },
  { name: "Italian", flag: "🇮🇹", code: "it-IT" },
  { name: "German", flag: "🇩🇪", code: "de-DE" },
  { name: "French", flag: "🇫🇷", code: "fr-FR" },
];

const sampleWords: Record<string, Word[]> = {
  Arabic: [
    {
      id: "najwa",
      word: "نجوى",
      language: "Arabic",
      meaning: "Secret conversation",
      story:
        "Used in classical Arabic poetry to describe intimate whispers between lovers or close friends. This beautiful word captures the essence of private, meaningful exchanges that happen in hushed tones.",
      pronunciation: "NAJ-wah",
    },
    {
      id: "tarab",
      word: "طرب",
      language: "Arabic",
      meaning: "Musical ecstasy",
      story:
        "A state of emotional rapture induced by music and poetry. In Arab culture, tarab represents the highest form of musical appreciation, where the listener becomes completely absorbed in the performance.",
      pronunciation: "ta-RAB",
    },
    {
      id: "barakah",
      word: "بركة",
      language: "Arabic",
      meaning: "Divine blessing",
      story:
        "A spiritual concept representing divine grace that brings abundance and prosperity. Often associated with holy places, righteous people, and blessed objects in Islamic tradition.",
      pronunciation: "ba-RA-kah",
    },
    {
      id: "sabr",
      word: "صبر",
      language: "Arabic",
      meaning: "Patient perseverance",
      story:
        "Not passive waiting, but active endurance with faith and hope. A virtue highly praised in Islamic tradition as essential for spiritual growth.",
      pronunciation: "SABR",
    },
    {
      id: "rahma",
      word: "رحمة",
      language: "Arabic",
      meaning: "Divine mercy",
      story:
        "The all-encompassing mercy of God that embraces all creation. It's the quality that motivates divine forgiveness and compassion toward humanity.",
      pronunciation: "RAH-mah",
    },
    {
      id: "fanaa",
      word: "فناء",
      language: "Arabic",
      meaning: "Annihilation of self",
      story:
        "In Sufi mysticism, fanaa describes the dissolution of the ego to unite with the divine. It represents the ultimate surrender to spiritual truth.",
      pronunciation: "fa-NAA",
    },
    {
      id: "tawakkul",
      word: "توكل",
      language: "Arabic",
      meaning: "Trust in God",
      story:
        "The act of placing complete reliance on God while taking action. A cornerstone of Islamic faith, it balances effort with divine will.",
      pronunciation: "ta-WAK-kul",
    },
    {
      id: "hilm",
      word: "حلم",
      language: "Arabic",
      meaning: "Forbearance",
      story:
        "A quality of gentle patience and self-control in the face of provocation. Celebrated in Arab tradition as a mark of wisdom and dignity.",
      pronunciation: "HILM",
    },
    {
      id: "zawj",
      word: "زوج",
      language: "Arabic",
      meaning: "Partner",
      story:
        "Refers to a spouse or partner, symbolizing harmony and balance. In Islamic teachings, marriage is a sacred bond of mutual support.",
      pronunciation: "ZAWJ",
    },
    {
      id: "qalb",
      word: "قلب",
      language: "Arabic",
      meaning: "Heart",
      story:
        "The spiritual and emotional core of a person. In Arabic culture, the heart is the seat of faith, love, and divine connection.",
      pronunciation: "QALB",
    },
    {
      id: "salaam",
      word: "سلام",
      language: "Arabic",
      meaning: "Peace",
      story:
        "A greeting and blessing that conveys peace and well-being. Rooted in Islamic tradition, it fosters harmony and goodwill.",
      pronunciation: "sa-LAAM",
    },
    {
      id: "fitrah",
      word: "فطرة",
      language: "Arabic",
      meaning: "Natural disposition",
      story:
        "The innate purity and inclination toward goodness in every human. In Islamic belief, it’s the soul’s natural state before worldly influences.",
      pronunciation: "FIT-rah",
    },
    {
      id: "haya",
      word: "حياء",
      language: "Arabic",
      meaning: "Modesty",
      story:
        "A virtue of humility and shyness that reflects purity of character. Highly valued in Arab culture as a sign of moral integrity.",
      pronunciation: "ha-YAA",
    },
    {
      id: "dhikr",
      word: "ذكر",
      language: "Arabic",
      meaning: "Remembrance",
      story:
        "The practice of remembering God through recitation and reflection. A spiritual exercise that brings peace and closeness to the divine.",
      pronunciation: "DHIKR",
    },
    {
      id: "adab",
      word: "أدب",
      language: "Arabic",
      meaning: "Etiquette",
      story:
        "Refined manners and moral conduct that reflect inner nobility. In Arab tradition, adab governs respectful interactions in all spheres of life.",
      pronunciation: "A-dab",
    },
    {
      id: "shukr",
      word: "شكر",
      language: "Arabic",
      meaning: "Gratitude",
      story:
        "The act of giving thanks to God for all blessings. Shukr is a spiritual practice that fosters contentment and appreciation.",
      pronunciation: "SHUKR",
    },
    {
      id: "amanah",
      word: "أمانة",
      language: "Arabic",
      meaning: "Trustworthiness",
      story:
        "The responsibility to uphold trust and fulfill promises. In Islamic ethics, amanah is a sacred duty in personal and communal life.",
      pronunciation: "a-MAA-nah",
    },
    {
      id: "taqwa",
      word: "تقوى",
      language: "Arabic",
      meaning: "God-consciousness",
      story:
        "A state of awareness and reverence for God, guiding one’s actions toward righteousness. Central to Islamic spirituality and moral conduct.",
      pronunciation: "TAQ-wah",
    },
    {
      id: "jihad",
      word: "جهاد",
      language: "Arabic",
      meaning: "Striving",
      story:
        "The effort to align one’s life with divine will, through personal growth or societal good. Often misunderstood, it emphasizes internal struggle.",
      pronunciation: "JI-haad",
    },
    {
      id: "nur",
      word: "نور",
      language: "Arabic",
      meaning: "Light",
      story:
        "The divine light of guidance and wisdom. In Islamic tradition, nur symbolizes spiritual illumination and God’s presence in the heart.",
      pronunciation: "NOOR",
    },
  ],
  Swahili: [
    {
      id: "ubuntu",
      word: "ubuntu",
      language: "Swahili",
      meaning: "I am because we are",
      story:
        "A philosophy emphasizing the interconnectedness of humanity. Ubuntu teaches that our humanity is affirmed through recognizing the humanity of others, forming the foundation of community life.",
      pronunciation: "u-BUN-tu",
    },
    {
      id: "harambee",
      word: "harambee",
      language: "Swahili",
      meaning: "Pulling together",
      story:
        "A tradition of community self-help events where people come together to accomplish tasks for the common good. This practice strengthens social bonds and collective responsibility.",
      pronunciation: "ha-ram-BEE",
    },
    {
      id: "asante",
      word: "asante sana",
      language: "Swahili",
      meaning: "Thank you very much",
      story:
        "More than gratitude, it expresses deep appreciation and recognition of kindness. In East African culture, showing gratitude strengthens community bonds.",
      pronunciation: "a-SAN-te SA-na",
    },
    {
      id: "jambo",
      word: "jambo",
      language: "Swahili",
      meaning: "Hello/peace",
      story:
        "A greeting that wishes peace and well-being. It reflects the Swahili culture’s emphasis on harmony and peaceful coexistence among diverse communities.",
      pronunciation: "JAM-bo",
    },
    {
      id: "pole",
      word: "pole pole",
      language: "Swahili",
      meaning: "Slowly slowly",
      story:
        "A reminder to take life at a measured pace, appreciating each moment. This philosophy encourages mindfulness and patience in a fast-paced world.",
      pronunciation: "PO-le PO-le",
    },
    {
      id: "karibu",
      word: "karibu",
      language: "Swahili",
      meaning: "Welcome",
      story:
        "A warm invitation to join or feel at home. In Swahili culture, hospitality is central, and karibu embodies openness to others.",
      pronunciation: "ka-REE-boo",
    },
    {
      id: "rafiki",
      word: "rafiki",
      language: "Swahili",
      meaning: "Friend",
      story:
        "A term for a trusted companion who shares life’s joys and challenges. Friendship in Swahili culture is a bond of mutual support and loyalty.",
      pronunciation: "ra-FEE-kee",
    },
    {
      id: "safari",
      word: "safari",
      language: "Swahili",
      meaning: "Journey",
      story:
        "Originally meaning a trip or expedition, it evokes adventure and discovery. In Swahili culture, it symbolizes exploration of both land and life.",
      pronunciation: "sa-FAH-ree",
    },
    {
      id: "mungu",
      word: "mungu",
      language: "Swahili",
      meaning: "God",
      story:
        "The divine creator revered in Swahili spiritual traditions. Mungu represents the ultimate source of life and guidance for the community.",
      pronunciation: "MOON-goo",
    },
    {
      id: "heshima",
      word: "heshima",
      language: "Swahili",
      meaning: "Respect",
      story:
        "A core value in Swahili culture, heshima guides interactions with elders, peers, and nature, fostering harmony and dignity.",
      pronunciation: "he-SHEE-ma",
    },
    {
      id: "umoja",
      word: "umoja",
      language: "Swahili",
      meaning: "Unity",
      story:
        "The principle of togetherness that binds communities. Umoja is celebrated as the foundation of strength and collective progress.",
      pronunciation: "oo-MO-ja",
    },
    {
      id: "kujichagulia",
      word: "kujichagulia",
      language: "Swahili",
      meaning: "Self-determination",
      story:
        "The act of defining oneself and one’s path. A principle of Kwanzaa, it emphasizes personal agency and cultural pride.",
      pronunciation: "koo-jee-cha-goo-LEE-a",
    },
    {
      id: "nia",
      word: "nia",
      language: "Swahili",
      meaning: "Purpose",
      story:
        "The driving force of living with intention and focus. In Swahili culture, nia inspires actions that benefit both self and community.",
      pronunciation: "NEE-a",
    },
    {
      id: "kumbukumbu",
      word: "kumbukumbu",
      language: "Swahili",
      meaning: "Memory",
      story:
        "The act of remembering ancestors and history. Kumbukumbu preserves cultural heritage through storytelling and reflection.",
      pronunciation: "koom-boo-KOOM-boo",
    },
    {
      id: "imani",
      word: "imani",
      language: "Swahili",
      meaning: "Faith",
      story:
        "A deep belief in God, community, and self. Imani anchors Swahili culture in hope and resilience through life’s challenges.",
      pronunciation: "ee-MAH-nee",
    },
    {
      id: "ujamaa",
      word: "ujamaa",
      language: "Swahili",
      meaning: "Cooperative economics",
      story:
        "A principle of shared prosperity and collective work. Ujamaa promotes community-driven economic systems for mutual benefit.",
      pronunciation: "oo-JAH-ma",
    },
    {
      id: "shikamoo",
      word: "shikamoo",
      language: "Swahili",
      meaning: "Respectful greeting",
      story:
        "A greeting used to show respect to elders. It reflects Swahili culture’s emphasis on honoring age and wisdom.",
      pronunciation: "shee-ka-MOO",
    },
    {
      id: "habari",
      word: "habari",
      language: "Swahili",
      meaning: "News",
      story:
        "A greeting asking ‘What’s the news?’ It invites connection and conversation, central to Swahili social life.",
      pronunciation: "ha-BAH-ree",
    },
    {
      id: "sala",
      word: "sala",
      language: "Swahili",
      meaning: "Prayer",
      story:
        "The act of spiritual communication with the divine. Sala in Swahili culture fosters peace and divine connection.",
      pronunciation: "SAH-la",
    },
    {
      id: "msafiri",
      word: "msafiri",
      language: "Swahili",
      meaning: "Traveler",
      story:
        "One who embarks on journeys, physical or spiritual. Msafiri embodies the spirit of exploration and growth in Swahili tradition.",
      pronunciation: "msa-FEE-ree",
    },
  ],
  Japanese: [
    {
      id: "ikigai",
      word: "生き甲斐",
      language: "Japanese",
      meaning: "Reason for being",
      story:
        "The intersection of what you love, what you are good at, what the world needs, and what you can be paid for. This concept guides many Japanese people in finding purpose and meaning in life.",
      pronunciation: "ee-kee-GUY",
    },
    {
      id: "wabisabi",
      word: "侘寂",
      language: "Japanese",
      meaning: "Beauty in imperfection",
      story:
        "An aesthetic philosophy that finds beauty in imperfection, impermanence, and incompleteness. It teaches appreciation for the natural cycle of growth and decay in all things.",
      pronunciation: "WAH-bee SAH-bee",
    },
    {
      id: "komorebi",
      word: "木漏れ日",
      language: "Japanese",
      meaning: "Sunlight through leaves",
      story:
        "The interplay of light and leaves when sunlight shines through trees. This word captures a specific moment of natural beauty that evokes peace and contemplation.",
      pronunciation: "ko-mo-REH-bee",
    },
    {
      id: "mono-no-aware",
      word: "物の哀れ",
      language: "Japanese",
      meaning: "Bittersweet awareness",
      story:
        "The pathos of things; a bittersweet awareness of the impermanence of all things and the gentle sadness at their passing. Central to Japanese aesthetic sensibility.",
      pronunciation: "mo-no no ah-WAH-reh",
    },
    {
      id: "kaizen",
      word: "改善",
      language: "Japanese",
      meaning: "Continuous improvement",
      story:
        "The practice of continuous improvement in all aspects of life. Originally a business philosophy, it reflects the Japanese approach to gradual, steady progress.",
      pronunciation: "KAI-zen",
    },
    {
      id: "shoganai",
      word: "仕方ない",
      language: "Japanese",
      meaning: "It cannot be helped",
      story:
        "An acceptance of circumstances beyond one’s control. This phrase reflects Japanese resilience in facing life’s inevitable challenges with grace.",
      pronunciation: "sho-GAH-nai",
    },
    {
      id: "omotenashi",
      word: "おもてなし",
      language: "Japanese",
      meaning: "Selfless hospitality",
      story:
        "The art of selfless, heartfelt hospitality. Omotenashi defines Japanese culture’s dedication to making guests feel truly cared for.",
      pronunciation: "o-mo-te-NAH-shee",
    },
    {
      id: "tsundoku",
      word: "積ん読",
      language: "Japanese",
      meaning: "Book hoarding",
      story:
        "The act of buying books and letting them pile up unread. A charming quirk that reflects a love for knowledge and stories.",
      pronunciation: "tsun-DOH-koo",
    },
    {
      id: "yugen",
      word: "幽玄",
      language: "Japanese",
      meaning: "Profound mystery",
      story:
        "A sense of wonder at the universe’s subtle beauty. Yugen evokes the ineffable depth of nature, art, and existence.",
      pronunciation: "YOO-gen",
    },
    {
      id: "kintsugi",
      word: "金継ぎ",
      language: "Japanese",
      meaning: "Golden repair",
      story:
        "The art of repairing broken pottery with gold, embracing flaws as part of an object’s history. A metaphor for resilience and beauty in imperfection.",
      pronunciation: "KIN-tsoo-gee",
    },
    {
      id: "shinrin-yoku",
      word: "森林浴",
      language: "Japanese",
      meaning: "Forest bathing",
      story:
        "Immersing oneself in nature to rejuvenate. This practice reflects Japan’s deep connection to the healing power of forests.",
      pronunciation: "shin-rin YOH-koo",
    },
    {
      id: "mono",
      word: "物",
      language: "Japanese",
      meaning: "Thing",
      story:
        "A simple word for objects, yet it carries a sense of their transient nature, resonating with Japanese views on impermanence.",
      pronunciation: "MO-no",
    },
    {
      id: "ma",
      word: "間",
      language: "Japanese",
      meaning: "Space or pause",
      story:
        "The meaningful pause or space between things. In Japanese aesthetics, ma enhances harmony in art, music, and daily life.",
      pronunciation: "MA",
    },
    {
      id: "gaman",
      word: "我慢",
      language: "Japanese",
      meaning: "Endurance",
      story:
        "The dignified endurance of hardship without complaint. Gaman reflects Japanese values of resilience and inner strength.",
      pronunciation: "GAH-man",
    },
    {
      id: "natsukashii",
      word: "懐かしい",
      language: "Japanese",
      meaning: "Nostalgic",
      story:
        "A fond longing for the past triggered by a memory or scent. Natsukashii captures the bittersweet joy of recollection.",
      pronunciation: "nat-soo-KAH-shee",
    },
    {
      id: "satori",
      word: "悟り",
      language: "Japanese",
      meaning: "Sudden enlightenment",
      story:
        "A moment of sudden spiritual awakening in Zen Buddhism. Satori is a glimpse of profound truth and inner peace.",
      pronunciation: "sah-TOH-ree",
    },
    {
      id: "okagesama",
      word: "お陰様",
      language: "Japanese",
      meaning: "Thanks to you",
      story:
        "A humble expression of gratitude for others’ support. It reflects the Japanese value of acknowledging interdependence.",
      pronunciation: "o-KAH-geh-sah-ma",
    },
    {
      id: "kawaii",
      word: "可愛い",
      language: "Japanese",
      meaning: "Cute",
      story:
        "The quality of being adorable or charming. Kawaii is a cultural phenomenon that celebrates innocence and joy in everyday life.",
      pronunciation: "ka-WAI-ee",
    },
    {
      id: "seijaku",
      word: "静寂",
      language: "Japanese",
      meaning: "Serenity",
      story:
        "The calm and stillness found in quiet moments. Seijaku is central to Japanese aesthetics, evoking peace in simplicity.",
      pronunciation: "say-JAH-koo",
    },
    {
      id: "honne",
      word: "本音",
      language: "Japanese",
      meaning: "True feelings",
      story:
        "One’s authentic emotions, often hidden in social settings. Honne contrasts with tatemae, reflecting Japan’s nuanced social dynamics.",
      pronunciation: "HON-neh",
    },
  ],
  Hindi: [
    {
      id: "namaste",
      word: "नमस्ते",
      language: "Hindi",
      meaning: "I bow to you",
      story:
        "A greeting that recognizes the divine spark in another person. The gesture of pressing palms together represents the unity of mind and body honoring the soul in another.",
      pronunciation: "na-mas-TE",
    },
    {
      id: "dharma",
      word: "धर्म",
      language: "Hindi",
      meaning: "Righteous duty",
      story:
        "One’s life purpose and moral obligation. In Hindu philosophy, following one’s dharma leads to spiritual fulfillment and maintains cosmic order.",
      pronunciation: "DHAR-ma",
    },
    {
      id: "karma",
      word: "कर्म",
      language: "Hindi",
      meaning: "Action and consequence",
      story:
        "The law of cause and effect governing moral actions. Every action creates consequences that shape one’s future experiences and spiritual evolution.",
      pronunciation: "KAR-ma",
    },
    {
      id: "moksha",
      word: "मोक्ष",
      language: "Hindi",
      meaning: "Liberation",
      story:
        "The ultimate goal of human life - liberation from the cycle of birth and death. Achieved through spiritual realization and union with the divine.",
      pronunciation: "MOKH-sha",
    },
    {
      id: "ahimsa",
      word: "अहिंसा",
      language: "Hindi",
      meaning: "Non-violence",
      story:
        "The principle of not causing harm to any living being in thought, word, or deed. Central to Gandhi’s philosophy and Hindu ethics.",
      pronunciation: "a-HIM-sa",
    },
    {
      id: "satyam",
      word: "सत्यम्",
      language: "Hindi",
      meaning: "Truth",
      story:
        "The pursuit of truth as the foundation of righteous living. In Hindu philosophy, satyam guides moral and spiritual integrity.",
      pronunciation: "SAT-yam",
    },
    {
      id: "seva",
      word: "सेवा",
      language: "Hindi",
      meaning: "Selfless service",
      story:
        "The act of serving others without expectation of reward. Seva is a spiritual practice that fosters compassion and community.",
      pronunciation: "SAY-va",
    },
    {
      id: "bhakti",
      word: "भक्ति",
      language: "Hindi",
      meaning: "Devotion",
      story:
        "The path of loving devotion to God. Bhakti is expressed through prayer, song, and surrender, central to Hindu worship.",
      pronunciation: "BHAK-tee",
    },
    {
      id: "santosha",
      word: "संतोष",
      language: "Hindi",
      meaning: "Contentment",
      story:
        "The state of inner satisfaction regardless of external circumstances. Santosha is a yogic principle for finding peace within.",
      pronunciation: "san-TOH-sha",
    },
    {
      id: "jnana",
      word: "ज्ञान",
      language: "Hindi",
      meaning: "Knowledge",
      story:
        "Spiritual wisdom gained through self-inquiry and study. Jnana is the path to liberation through understanding the true self.",
      pronunciation: "JNAH-na",
    },
    {
      id: "shanti",
      word: "शान्ति",
      language: "Hindi",
      meaning: "Peace",
      story:
        "Inner and outer tranquility sought through meditation and righteous living. Shanti is often chanted to invoke calm.",
      pronunciation: "SHAN-tee",
    },
    {
      id: "sanskriti",
      word: "संस्कृति",
      language: "Hindi",
      meaning: "Culture",
      story:
        "The traditions and values that shape a community’s identity. Sanskriti reflects India’s rich heritage of art, music, and spirituality.",
      pronunciation: "san-SKRI-tee",
    },
    {
      id: "atman",
      word: "आत्मन्",
      language: "Hindi",
      meaning: "Soul",
      story:
        "The eternal self that transcends the physical body. In Hindu philosophy, atman is the divine essence within all beings.",
      pronunciation: "AAT-man",
    },
    {
      id: "yoga",
      word: "योग",
      language: "Hindi",
      meaning: "Union",
      story:
        "The practice of uniting body, mind, and spirit. Yoga is a path to spiritual growth and self-realization in Hindu tradition.",
      pronunciation: "YO-ga",
    },
    {
      id: "guru",
      word: "गुरु",
      language: "Hindi",
      meaning: "Teacher",
      story:
        "A spiritual guide who dispels ignorance with wisdom. The guru is revered in Hinduism as a beacon of divine knowledge.",
      pronunciation: "GOO-roo",
    },
    {
      id: "sutra",
      word: "सूत्र",
      language: "Hindi",
      meaning: "Thread",
      story:
        "A concise teaching or scripture that weaves wisdom into life. Sutras guide spiritual practice in Hindu and Buddhist traditions.",
      pronunciation: "SOO-tra",
    },
    {
      id: "tapas",
      word: "तपस्",
      language: "Hindi",
      meaning: "Discipline",
      story:
        "The practice of austerity and self-discipline to purify the mind and body. Tapas is a yogic virtue for spiritual growth.",
      pronunciation: "TAH-pas",
    },
    {
      id: "maya",
      word: "माया",
      language: "Hindi",
      meaning: "Illusion",
      story:
        "The cosmic illusion that veils the true nature of reality. In Hinduism, overcoming maya leads to spiritual awakening.",
      pronunciation: "MAA-ya",
    },
    {
      id: "artha",
      word: "अर्थ",
      language: "Hindi",
      meaning: "Purpose",
      story:
        "The pursuit of meaningful goals, including wealth and prosperity. Artha is one of the four aims of life in Hindu philosophy.",
      pronunciation: "AR-tha",
    },
    {
      id: "kama",
      word: "काम",
      language: "Hindi",
      meaning: "Desire",
      story:
        "The pursuit of pleasure and love, when balanced, enriches life. Kama is a vital aim in Hindu philosophy for a fulfilled existence.",
      pronunciation: "KAA-ma",
    },
  ],
  Turkish: [
    {
      id: "huzur",
      word: "huzur",
      language: "Turkish",
      meaning: "Peace of mind",
      story:
        "A state of inner tranquility and contentment that comes from being at peace with oneself and one’s circumstances. Highly valued in Turkish culture as a sign of wisdom.",
      pronunciation: "hu-ZUR",
    },
    {
      id: "sabir",
      word: "sabır",
      language: "Turkish",
      meaning: "Patience",
      story:
        "The virtue of enduring difficulties with grace and maintaining hope. In Turkish culture, patience is seen as a strength that leads to eventual success.",
      pronunciation: "sa-BIR",
    },
    {
      id: "merhamet",
      word: "merhamet",
      language: "Turkish",
      meaning: "Compassion",
      story:
        "Deep empathy and kindness toward others’ suffering. Rooted in Islamic values, it represents the divine quality of mercy reflected in human behavior.",
      pronunciation: "mer-ha-MET",
    },
    {
      id: "sevgi",
      word: "sevgi",
      language: "Turkish",
      meaning: "Love/affection",
      story:
        "Pure love and affection that encompasses romantic love, family bonds, and universal compassion. The foundation of meaningful relationships.",
      pronunciation: "sev-GI",
    },
    {
      id: "vefa",
      word: "vefa",
      language: "Turkish",
      meaning: "Loyalty/faithfulness",
      story:
        "Unwavering loyalty and faithfulness to friends, family, and principles. A highly valued trait that builds trust and lasting relationships.",
      pronunciation: "ve-FA",
    },
    {
      id: "gönül",
      word: "gönül",
      language: "Turkish",
      meaning: "Heart/soul",
      story:
        "The emotional and spiritual heart that feels deeply. In Turkish culture, gönül is the source of love, longing, and sincerity.",
      pronunciation: "GÖ-nül",
    },
    {
      id: "özlem",
      word: "özlem",
      language: "Turkish",
      meaning: "Longing",
      story:
        "A deep yearning for someone or something absent. Özlem captures the bittersweet ache of missing loved ones or cherished places.",
      pronunciation: "ÖZ-lem",
    },
    {
      id: "hürmet",
      word: "hürmet",
      language: "Turkish",
      meaning: "Respect",
      story:
        "Deep respect shown to elders, traditions, and values. Hürmet reflects Turkish culture’s emphasis on honoring relationships and heritage.",
      pronunciation: "HÜR-met",
    },
    {
      id: "yaren",
      word: "yaren",
      language: "Turkish",
      meaning: "Close friend",
      story:
        "A trusted companion who shares life’s joys and sorrows. Yaren embodies the Turkish value of deep, loyal friendship.",
      pronunciation: "YA-ren",
    },
    {
      id: "kismet",
      word: "kısmet",
      language: "Turkish",
      meaning: "Fate",
      story:
        "The belief in destiny and divine will shaping one’s life. Kısmet reflects acceptance of life’s unpredictable turns.",
      pronunciation: "KIS-met",
    },
    {
      id: "hasret",
      word: "hasret",
      language: "Turkish",
      meaning: "Yearning",
      story:
        "An intense longing for a distant person or place. Hasret is often expressed in Turkish poetry and music as a poignant emotion.",
      pronunciation: "HAS-ret",
    },
    {
      id: "samimiyet",
      word: "samimiyet",
      language: "Turkish",
      meaning: "Sincerity",
      story:
        "Genuine honesty and warmth in interactions. Samimiyet is cherished in Turkish culture as the foundation of trust.",
      pronunciation: "sa-mi-MI-ye",
    },
    {
      id: "muhabbet",
      word: "muhabbet",
      language: "Turkish",
      meaning: "Affectionate conversation",
      story:
        "Warm, heartfelt conversation among friends or family. Muhabbet is a cornerstone of Turkish social life, fostering connection.",
      pronunciation: "moo-HAB-bet",
    },
    {
      id: "adalet",
      word: "adalet",
      language: "Turkish",
      meaning: "Justice",
      story:
        "The pursuit of fairness and moral rightness. Adalet is a core value in Turkish society, guiding ethical conduct.",
      pronunciation: "a-da-LET",
    },
    {
      id: "naber",
      word: "naber",
      language: "Turkish",
      meaning: "What’s up?",
      story:
        "A casual greeting among friends, inviting connection and conversation. Naber reflects the relaxed warmth of Turkish social bonds.",
      pronunciation: "NA-ber",
    },
    {
      id: "dostluk",
      word: "dostluk",
      language: "Turkish",
      meaning: "Friendship",
      story:
        "The bond of true friendship built on trust and mutual support. Dostluk is a cherished value in Turkish culture.",
      pronunciation: "DOST-luk",
    },
    {
      id: "ihsan",
      word: "ihsan",
      language: "Turkish",
      meaning: "Excellence",
      story:
        "The pursuit of perfection in actions, often with a spiritual dimension. Ihsan reflects doing good with sincerity and care.",
      pronunciation: "IH-san",
    },
    {
      id: "bereket",
      word: "bereket",
      language: "Turkish",
      meaning: "Abundance",
      story:
        "The blessing of prosperity and sufficiency. Bereket is sought in Turkish culture to bring fullness to life and community.",
      pronunciation: "be-RE-ket",
    },
    {
      id: "hoşgörü",
      word: "hoşgörü",
      language: "Turkish",
      meaning: "Tolerance",
      story:
        "The acceptance of others’ differences with kindness. Hoşgörü reflects Turkey’s history as a crossroads of cultures.",
      pronunciation: "HOSH-gö-rü",
    },
    {
      id: "sıla",
      word: "sıla",
      language: "Turkish",
      meaning: "Homeland",
      story:
        "The deep connection to one’s place of origin. Sıla evokes nostalgia and love for the land and people of one’s roots.",
      pronunciation: "SI-la",
    },
  ],
  Persian: [
    {
      id: "ishq",
      word: "عشق",
      language: "Persian",
      meaning: "Divine love",
      story:
        "The passionate love that consumes the lover completely, whether for another person or for the divine. Central theme in Persian poetry and Sufi mysticism.",
      pronunciation: "ESHGH",
    },
    {
      id: "gham",
      word: "غم",
      language: "Persian",
      meaning: "Sweet sorrow",
      story:
        "A bittersweet sadness that paradoxically brings pleasure. In Persian poetry, gham is often associated with the pain of separation from the beloved.",
      pronunciation: "GHAM",
    },
    {
      id: "sahar",
      word: "سحر",
      language: "Persian",
      meaning: "Dawn",
      story:
        "The magical time of dawn when night transforms into day. Symbolizes hope, renewal, and the moment of spiritual awakening.",
      pronunciation: "sa-HAR",
    },
    {
      id: "bulbul",
      word: "بلبل",
      language: "Persian",
      meaning: "Nightingale",
      story:
        "The bird whose song expresses the soul’s longing for the beloved. In Persian poetry, the nightingale’s love for the rose symbolizes the soul’s love for God.",
      pronunciation: "bul-BUL",
    },
    {
      id: "dil",
      word: "دل",
      language: "Persian",
      meaning: "Heart",
      story:
        "The seat of emotions, love, and spiritual experience. In Persian culture, the heart is where true knowledge and divine love reside.",
      pronunciation: "DIL",
    },
    {
      id: "arzoo",
      word: "آرزو",
      language: "Persian",
      meaning: "Wish",
      story:
        "A heartfelt desire or aspiration, often tinged with longing. Arzoo reflects the Persian poetic yearning for the unattainable.",
      pronunciation: "ar-ZOO",
    },
    {
      id: "noor",
      word: "نور",
      language: "Persian",
      meaning: "Light",
      story:
        "The divine or inner light that guides and illuminates. In Persian mysticism, noor symbolizes spiritual wisdom and truth.",
      pronunciation: "NOOR",
    },
    {
      id: "saqi",
      word: "ساقی",
      language: "Persian",
      meaning: "Cupbearer",
      story:
        "The mystical figure who serves the wine of divine love. In Persian poetry, the saqi symbolizes spiritual intoxication and joy.",
      pronunciation: "SAA-kee",
    },
    {
      id: "vafa",
      word: "وفا",
      language: "Persian",
      meaning: "Fidelity",
      story:
        "Unwavering loyalty and devotion to a loved one or cause. Vafa is a cherished virtue in Persian culture and poetry.",
      pronunciation: "va-FA",
    },
    {
      id: "jahan",
      word: "جهان",
      language: "Persian",
      meaning: "World",
      story:
        "The vast universe, often contemplated in Persian poetry as a place of beauty and transience, reflecting the divine order.",
      pronunciation: "ja-HAAN",
    },
    {
      id: "shirin",
      word: "شیرین",
      language: "Persian",
      meaning: "Sweet",
      story:
        "A term for sweetness, often used to describe a beloved’s charm. Shirin is also a legendary figure in Persian love stories.",
      pronunciation: "shee-REEN",
    },
    {
      id: "sohbat",
      word: "صحبت",
      language: "Persian",
      meaning: "Companionship",
      story:
        "The joy of intimate conversation and connection. Sohbat is celebrated in Persian culture as a source of emotional richness.",
      pronunciation: "SOH-bat",
    },
    {
      id: "mahabbat",
      word: "محبت",
      language: "Persian",
      meaning: "Affection",
      story:
        "Warm, heartfelt love that binds people together. Mahabbat is the essence of meaningful relationships in Persian tradition.",
      pronunciation: "ma-HAB-bat",
    },
    {
      id: "ravan",
      word: "روان",
      language: "Persian",
      meaning: "Soul",
      story:
        "The flowing essence of a person’s spirit. In Persian poetry, ravan is the eternal part that seeks union with the divine.",
      pronunciation: "ra-VAAN",
    },
    {
      id: "shab",
      word: "شب",
      language: "Persian",
      meaning: "Night",
      story:
        "The time of mystery, reflection, and poetic inspiration. Shab is a recurring theme in Persian literature, symbolizing longing.",
      pronunciation: "SHAB",
    },
    {
      id: "rang",
      word: "رنگ",
      language: "Persian",
      meaning: "Color",
      story:
        "The vibrancy of life and beauty, often used in poetry to describe emotions or nature’s splendor in Persian culture.",
      pronunciation: "RANG",
    },
    {
      id: "azadi",
      word: "آزادی",
      language: "Persian",
      meaning: "Freedom",
      story:
        "The cherished state of liberty and self-expression. Azadi is a powerful concept in Persian history and literature.",
      pronunciation: "a-zaa-DEE",
    },
    {
      id: "janan",
      word: "جانان",
      language: "Persian",
      meaning: "Beloved",
      story:
        "A term of endearment for the beloved, human or divine. Janan is central to Persian romantic and mystical poetry.",
      pronunciation: "jaa-NAAN",
    },
    {
      id: "safar",
      word: "سفر",
      language: "Persian",
      meaning: "Journey",
      story:
        "A physical or spiritual voyage of discovery. Safar in Persian culture symbolizes the quest for meaning and truth.",
      pronunciation: "sa-FAR",
    },
    {
      id: "hasti",
      word: "هستی",
      language: "Persian",
      meaning: "Existence",
      story:
        "The state of being, contemplated in Persian philosophy as a fleeting yet profound gift from the divine.",
      pronunciation: "HAS-tee",
    },
  ],
  Korean: [
    {
      id: "nunchi",
      word: "눈치",
      language: "Korean",
      meaning: "Social awareness",
      story:
        "The subtle art of reading social situations and understanding unspoken communication. Essential for harmonious relationships in Korean culture.",
      pronunciation: "noon-CHEE",
    },
    {
      id: "jeong",
      word: "정",
      language: "Korean",
      meaning: "Deep affection",
      story:
        "A uniquely Korean concept of deep emotional bonds that develop over time. It encompasses love, loyalty, and attachment that goes beyond words.",
      pronunciation: "JUNG",
    },
    {
      id: "han",
      word: "한",
      language: "Korean",
      meaning: "Deep sorrow",
      story:
        "A complex emotion combining sorrow, regret, and acceptance. Often described as the collective grief of the Korean people throughout history.",
      pronunciation: "HAHN",
    },
    {
      id: "hyo",
      word: "효",
      language: "Korean",
      meaning: "Filial piety",
      story:
        "The virtue of respect and care for one’s parents and ancestors. One of the most important values in Korean Confucian culture.",
      pronunciation: "HYO",
    },
    {
      id: "sarang",
      word: "사랑",
      language: "Korean",
      meaning: "Love",
      story:
        "Deep love that encompasses romantic love, family love, and universal compassion. The force that binds people together.",
      pronunciation: "sa-RANG",
    },
    {
      id: "inyeon",
      word: "인연",
      language: "Korean",
      meaning: "Fate of relationships",
      story:
        "The destined connections between people across lifetimes. Inyeon reflects the Korean belief in meaningful encounters.",
      pronunciation: "in-YUN",
    },
    {
      id: "gohyang",
      word: "고향",
      language: "Korean",
      meaning: "Hometown",
      story:
        "The place of one’s roots, evoking nostalgia and belonging. Gohyang holds deep emotional significance in Korean culture.",
      pronunciation: "go-HYANG",
    },
    {
      id: "seonbi",
      word: "선비",
      language: "Korean",
      meaning: "Scholar-gentleman",
      story:
        "The ideal of a virtuous, educated person who lives with integrity. Seonbi embodies Korean Confucian values of wisdom and morality.",
      pronunciation: "SUN-bee",
    },
    {
      id: "uri",
      word: "우리",
      language: "Korean",
      meaning: "We/our",
      story:
        "A collective pronoun emphasizing community and togetherness. Uri reflects Korea’s strong sense of shared identity.",
      pronunciation: "OO-ree",
    },
    {
      id: "hwaiting",
      word: "화이팅",
      language: "Korean",
      meaning: "Fighting!",
      story:
        "A cheer of encouragement to persevere. Hwaiting is a modern expression of support in Korean culture, especially among youth.",
      pronunciation: "HWAH-ee-ting",
    },
    {
      id: "jeol",
      word: "절",
      language: "Korean",
      meaning: "Bow",
      story:
        "A gesture of respect and gratitude, often performed during ceremonies. Jeol reflects Korean reverence for tradition and elders.",
      pronunciation: "JUL",
    },
    {
      id: "seum",
      word: "섬",
      language: "Korean",
      meaning: "Island",
      story:
        "A symbol of solitude and beauty in Korean poetry. Seum evokes the serene isolation of nature’s untouched places.",
      pronunciation: "SUM",
    },
    {
      id: "gonggi",
      word: "공기",
      language: "Korean",
      meaning: "Air/play",
      story:
        "A traditional children’s game, symbolizing joy and simplicity. Gonggi reflects Korea’s playful cultural heritage.",
      pronunciation: "GONG-gee",
    },
    {
      id: "sang",
      word: "상",
      language: "Korean",
      meaning: "Table",
      story:
        "The communal table where families share meals and stories. Sang is central to Korean culture’s emphasis on togetherness.",
      pronunciation: "SANG",
    },
    {
      id: "narae",
      word: "나래",
      language: "Korean",
      meaning: "Wings",
      story:
        "A poetic term for freedom and aspiration. Narae symbolizes the soul’s desire to soar beyond limitations.",
      pronunciation: "NA-rae",
    },
    {
      id: "bit",
      word: "빛",
      language: "Korean",
      meaning: "Light",
      story:
        "The radiance of hope and inspiration. Bit is often used in Korean literature to signify truth and beauty.",
      pronunciation: "BEET",
    },
    {
      id: "gaseum",
      word: "가슴",
      language: "Korean",
      meaning: "Heart/chest",
      story:
        "The emotional center where feelings reside. Gaseum is a poetic term for deep emotions in Korean culture.",
      pronunciation: "GAH-sum",
    },
    {
      id: "maeum",
      word: "마음",
      language: "Korean",
      meaning: "Mind/heart",
      story:
        "The seat of emotions and intentions. Maeum reflects the Korean belief in the unity of heart and mind.",
      pronunciation: "MAY-oom",
    },
    {
      id: "baram",
      word: "바람",
      language: "Korean",
      meaning: "Wind",
      story:
        "A symbol of change and freedom in Korean poetry. Baram evokes the fleeting, untamed spirit of nature.",
      pronunciation: "BAH-ram",
    },
    {
      id: "suryeon",
      word: "수련",
      language: "Korean",
      meaning: "Self-discipline",
      story:
        "The practice of cultivating oneself through effort and focus. Suryeon is a Confucian value for personal growth.",
      pronunciation: "SOO-ryun",
    },
  ],
  Portuguese: [
    {
      id: "saudade",
      word: "saudade",
      language: "Portuguese",
      meaning: "Bittersweet longing",
      story:
        "A deep emotional state of nostalgic longing for something absent. Considered untranslatable, it captures the Portuguese soul’s relationship with loss and memory.",
      pronunciation: "sau-DA-de",
    },
    {
      id: "cafune",
      word: "cafuné",
      language: "Portuguese",
      meaning: "Gentle head caress",
      story:
        "The tender act of running fingers through someone’s hair as a gesture of love and affection. A uniquely Brazilian expression of intimacy.",
      pronunciation: "ca-fu-NE",
    },
    {
      id: "jeitinho",
      word: "jeitinho",
      language: "Portuguese",
      meaning: "Brazilian way",
      story:
        "The Brazilian knack for finding unconventional ways around rules and obstacles. A cultural trait that values creativity over rigid adherence to rules.",
      pronunciation: "zhei-TI-nho",
    },
    {
      id: "ginga",
      word: "ginga",
      language: "Portuguese",
      meaning: "Graceful sway",
      story:
        "The characteristic swaying movement in capoeira and samba. Represents the Brazilian way of moving through life with grace and rhythm.",
      pronunciation: "ZHIN-ga",
    },
    {
      id: "axé",
      word: "axé",
      language: "Portuguese",
      meaning: "Positive energy",
      story:
        "A Yoruba-derived word meaning positive energy, good vibes, or blessing. Central to Afro-Brazilian culture and spirituality.",
      pronunciation: "a-SHE",
    },
    {
      id: "fado",
      word: "fado",
      language: "Portuguese",
      meaning: "Fate",
      story:
        "A genre of music expressing longing and melancholy. Fado captures the Portuguese soul’s connection to destiny and emotion.",
      pronunciation: "FAH-doo",
    },
    {
      id: "alegria",
      word: "alegria",
      language: "Portuguese",
      meaning: "Joy",
      story:
        "The vibrant happiness that defines Brazilian celebrations like Carnival. Alegria reflects a zest for life and community.",
      pronunciation: "a-le-GREE-a",
    },
    {
      id: "paixao",
      word: "paixão",
      language: "Portuguese",
      meaning: "Passion",
      story:
        "Intense emotion that drives love, art, and life. Paixão is the fiery heart of Portuguese and Brazilian expression.",
      pronunciation: "pai-SHOWN",
    },
    {
      id: "esperança",
      word: "esperança",
      language: "Portuguese",
      meaning: "Hope",
      story:
        "The optimistic belief in a better future. Esperança sustains the Portuguese spirit through challenges and dreams.",
      pronunciation: "es-pe-RAN-sa",
    },
    {
      id: "carinho",
      word: "carinho",
      language: "Portuguese",
      meaning: "Affection",
      story:
        "Tender care and warmth shown to loved ones. Carinho is a cornerstone of close relationships in Portuguese culture.",
      pronunciation: "ca-RI-nyo",
    },
    {
      id: "lua",
      word: "lua",
      language: "Portuguese",
      meaning: "Moon",
      story:
        "A symbol of romance and mystery in Portuguese poetry. Lua evokes the beauty of the night and emotional depth.",
      pronunciation: "LOO-a",
    },
    {
      id: "mar",
      word: "mar",
      language: "Portuguese",
      meaning: "Sea",
      story:
        "The vast sea that shaped Portugal’s history of exploration. Mar symbolizes adventure and the call of the unknown.",
      pronunciation: "MAR",
    },
    {
      id: "sorte",
      word: "sorte",
      language: "Portuguese",
      meaning: "Luck",
      story:
        "The fortunate turn of events embraced with gratitude. Sorte reflects the Portuguese belief in life’s serendipity.",
      pronunciation: "SOR-te",
    },
    {
      id: "amigo",
      word: "amigo",
      language: "Portuguese",
      meaning: "Friend",
      story:
        "A cherished companion who shares life’s joys and sorrows. Amigo embodies the warmth of Portuguese friendships.",
      pronunciation: "a-MEE-go",
    },
    {
      id: "saúde",
      word: "saúde",
      language: "Portuguese",
      meaning: "Health",
      story:
        "A toast to well-being and vitality. Saúde reflects the Portuguese value of cherishing life and good health.",
      pronunciation: "sau-OO-de",
    },
    {
      id: "sonho",
      word: "sonho",
      language: "Portuguese",
      meaning: "Dream",
      story:
        "A vision or aspiration that fuels hope. Sonho is celebrated in Portuguese culture as the spark of creativity.",
      pronunciation: "SON-yo",
    },
    {
      id: "luz",
      word: "luz",
      language: "Portuguese",
      meaning: "Light",
      story:
        "The radiance of hope and truth. Luz is a poetic symbol of inspiration and clarity in Portuguese literature.",
      pronunciation: "LOOZ",
    },
    {
      id: "calor",
      word: "calor",
      language: "Portuguese",
      meaning: "Warmth",
      story:
        "The comforting warmth of human connection or the sun. Calor reflects the Brazilian embrace of life’s vibrancy.",
      pronunciation: "ka-LOR",
    },
    {
      id: "paz",
      word: "paz",
      language: "Portuguese",
      meaning: "Peace",
      story:
        "The state of tranquility and harmony. Paz is a cherished ideal in Portuguese culture, sought in both heart and world.",
      pronunciation: "PAZ",
    },
    {
      id: "ventura",
      word: "ventura",
      language: "Portuguese",
      meaning: "Adventure",
      story:
        "The spirit of bold exploration and discovery. Ventura recalls Portugal’s seafaring legacy and zest for the unknown.",
      pronunciation: "ven-TOO-ra",
    },
  ],
  Russian: [
    {
      id: "dusha",
      word: "душа",
      language: "Russian",
      meaning: "Soul",
      story:
        "The immortal essence of a person that encompasses emotions, spirit, and moral character. Central to Russian understanding of human nature and spirituality.",
      pronunciation: "du-SHA",
    },
    {
      id: "toska",
      word: "тоска",
      language: "Russian",
      meaning: "Spiritual anguish",
      story:
        "A deep spiritual anguish without specific cause, a longing for something indefinable. Nabokov called it untranslatable, representing the Russian soul’s depth.",
      pronunciation: "tos-KA",
    },
    {
      id: "rodina",
      word: "родина",
      language: "Russian",
      meaning: "Motherland",
      story:
        "The beloved homeland that is more than just a country - it’s the spiritual and emotional center of one’s identity and belonging.",
      pronunciation: "RO-di-na",
    },
    {
      id: "pravda",
      word: "правда",
      language: "Russian",
      meaning: "Truth/justice",
      story:
        "Both truth and justice combined into one concept. Represents the Russian quest for ultimate truth and moral righteousness.",
      pronunciation: "PRAV-da",
    },
    {
      id: "lyubov",
      word: "любовь",
      language: "Russian",
      meaning: "Love",
      story:
        "Deep, passionate love that encompasses romantic love, love of family, and love of country. Central to Russian emotional and spiritual life.",
      pronunciation: "lyu-BOV",
    },
    {
      id: "volya",
      word: "воля",
      language: "Russian",
      meaning: "Freedom/will",
      story:
        "The power of free will and inner strength. Volya reflects the Russian spirit’s yearning for liberty and self-determination.",
      pronunciation: "VOL-ya",
    },
    {
      id: "sudba",
      word: "судьба",
      language: "Russian",
      meaning: "Fate",
      story:
        "The inevitable course of one’s life, often accepted with resilience. Sudba is a recurring theme in Russian literature and thought.",
      pronunciation: "sood-BA",
    },
    {
      id: "druzhba",
      word: "дружба",
      language: "Russian",
      meaning: "Friendship",
      story:
        "The deep bond of loyalty and trust between friends. Druzhba is cherished in Russian culture as a lifelong commitment.",
      pronunciation: "DROOZH-ba",
    },
    {
      id: "nadezhda",
      word: "надежда",
      language: "Russian",
      meaning: "Hope",
      story:
        "The sustaining belief in a better future. Nadezhda is a beacon of resilience in Russia’s often turbulent history.",
      pronunciation: "na-DEZH-da",
    },
    {
      id: "serdtse",
      word: "сердце",
      language: "Russian",
      meaning: "Heart",
      story:
        "The emotional and spiritual core of a person. Serdtse is where love, courage, and truth reside in Russian culture.",
      pronunciation: "SERD-tse",
    },
    {
      id: "svet",
      word: "свет",
      language: "Russian",
      meaning: "Light",
      story:
        "The radiance of truth and inspiration. Svet symbolizes hope and clarity in Russian poetry and spirituality.",
      pronunciation: "SVET",
    },
    {
      id: "mir",
      word: "мир",
      language: "Russian",
      meaning: "Peace/world",
      story:
        "A dual meaning of peace and the world. Mir reflects Russia’s aspiration for harmony and global unity.",
      pronunciation: "MEER",
    },
    {
      id: "vera",
      word: "вера",
      language: "Russian",
      meaning: "Faith",
      story:
        "Deep spiritual belief in God or ideals. Vera anchors the Russian soul through challenges and uncertainties.",
      pronunciation: "VYE-ra",
    },
    {
      id: "spasibo",
      word: "спасибо",
      language: "Russian",
      meaning: "Thank you",
      story:
        "A heartfelt expression of gratitude. Spasibo strengthens bonds by acknowledging kindness in Russian culture.",
      pronunciation: "spa-SEE-bo",
    },
    {
      id: "zima",
      word: "зима",
      language: "Russian",
      meaning: "Winter",
      story:
        "The season of resilience and beauty in Russian culture. Zima evokes the stark, poetic stillness of snowy landscapes.",
      pronunciation: "ZEE-ma",
    },
    {
      id: "razluka",
      word: "разлука",
      language: "Russian",
      meaning: "Separation",
      story:
        "The pain of parting from loved ones. Razluka is a poignant theme in Russian literature, capturing longing and loss.",
      pronunciation: "raz-LOO-ka",
    },
    {
      id: "schastye",
      word: "счастье",
      language: "Russian",
      meaning: "Happiness",
      story:
        "The fleeting yet profound state of joy. Schastye is cherished in Russian culture as a rare and precious gift.",
      pronunciation: "SHCHAS-tye",
    },
    {
      id: "put",
      word: "путь",
      language: "Russian",
      meaning: "Path",
      story:
        "The journey of life, both physical and spiritual. Put symbolizes the Russian quest for meaning and purpose.",
      pronunciation: "POOT",
    },
    {
      id: "sila",
      word: "сила",
      language: "Russian",
      meaning: "Strength",
      story:
        "The inner power to overcome adversity. Sila reflects the Russian spirit’s resilience and determination.",
      pronunciation: "SEE-la",
    },
    {
      id: "dukh",
      word: "дух",
      language: "Russian",
      meaning: "Spirit",
      story:
        "The vital essence of life and courage. Dukh embodies the Russian soul’s passion and indomitable will.",
      pronunciation: "DOOKH",
    },
  ],
  Italian: [
    {
      id: "sprezzatura",
      word: "sprezzatura",
      language: "Italian",
      meaning: "Effortless grace",
      story:
        "The art of making difficult things look effortless. A Renaissance concept describing the ideal of nonchalant mastery and studied carelessness.",
      pronunciation: "spret-sa-TU-ra",
    },
    {
      id: "dolcevita",
      word: "dolce vita",
      language: "Italian",
      meaning: "Sweet life",
      story:
        "The sweet life of leisure, pleasure, and luxury. Represents the Italian appreciation for life’s finer pleasures and the art of living well.",
      pronunciation: "DOL-che VEE-ta",
    },
    {
      id: "bello",
      word: "bello",
      language: "Italian",
      meaning: "Beautiful",
      story:
        "Beauty in all its forms - people, art, landscapes, moments. Italians have a deep appreciation for beauty as essential to life.",
      pronunciation: "BEL-lo",
    },
    {
      id: "amore",
      word: "amore",
      language: "Italian",
      meaning: "Love",
      story:
        "Passionate love that is openly expressed and celebrated. Italian culture embraces love as one of life’s greatest gifts.",
      pronunciation: "a-MO-re",
    },
    {
      id: "famiglia",
      word: "famiglia",
      language: "Italian",
      meaning: "Family",
      story:
        "The extended family that forms the center of Italian life. Family bonds are sacred and provide identity, support, and meaning.",
      pronunciation: "fa-MI-glia",
    },
    {
      id: "passione",
      word: "passione",
      language: "Italian",
      meaning: "Passion",
      story:
        "The fiery emotion that fuels art, love, and life. Passione is the heartbeat of Italian culture’s vibrant expression.",
      pronunciation: "pas-SYO-ne",
    },
    {
      id: "gioia",
      word: "gioia",
      language: "Italian",
      meaning: "Joy",
      story:
        "The radiant happiness of living fully in the moment. Gioia captures the Italian zest for life’s simple pleasures.",
      pronunciation: "JOY-a",
    },
    {
      id: "luce",
      word: "luce",
      language: "Italian",
      meaning: "Light",
      story:
        "The brilliance of inspiration and hope. Luce symbolizes clarity and beauty in Italian art and poetry.",
      pronunciation: "LOO-che",
    },
    {
      id: "sogno",
      word: "sogno",
      language: "Italian",
      meaning: "Dream",
      story:
        "The vision of aspiration or fantasy. Sogno reflects the Italian love for imagination and romantic ideals.",
      pronunciation: "SON-yo",
    },
    {
      id: "cuore",
      word: "cuore",
      language: "Italian",
      meaning: "Heart",
      story:
        "The emotional core where love and courage reside. Cuore is central to Italian expressions of deep feeling.",
      pronunciation: "KWOR-e",
    },
    {
      id: "pace",
      word: "pace",
      language: "Italian",
      meaning: "Peace",
      story:
        "The state of inner and outer tranquility. Pace is a cherished ideal in Italian culture, sought through harmony.",
      pronunciation: "PAH-che",
    },
    {
      id: "arte",
      word: "arte",
      language: "Italian",
      meaning: "Art",
      story:
        "The expression of beauty and human experience. Arte is the soul of Italian culture, from Renaissance to today.",
      pronunciation: "AR-te",
    },
    {
      id: "amico",
      word: "amico",
      language: "Italian",
      meaning: "Friend",
      story:
        "A trusted companion who shares life’s joys. Amico embodies the warmth and loyalty of Italian friendships.",
      pronunciation: "a-MEE-ko",
    },
    {
      id: "vita",
      word: "vita",
      language: "Italian",
      meaning: "Life",
      story:
        "The vibrant essence of existence, celebrated daily. Vita reflects the Italian passion for living fully and beautifully.",
      pronunciation: "VEE-ta",
    },
    {
      id: "stella",
      word: "stella",
      language: "Italian",
      meaning: "Star",
      story:
        "A symbol of hope and inspiration in the night sky. Stella evokes the poetic beauty of Italian dreams.",
      pronunciation: "STEL-la",
    },
    {
      id: "riso",
      word: "riso",
      language: "Italian",
      meaning: "Laughter",
      story:
        "The joyful sound of shared happiness. Riso is cherished in Italian culture as a sign of connection and vitality.",
      pronunciation: "REE-so",
    },
    {
      id: "ventura",
      word: "ventura",
      language: "Italian",
      meaning: "Adventure",
      story:
        "The thrill of exploration and discovery. Ventura captures the Italian spirit of embracing life’s possibilities.",
      pronunciation: "ven-TOO-ra",
    },
    {
      id: "grazia",
      word: "grazia",
      language: "Italian",
      meaning: "Grace",
      story:
        "The elegance of movement and spirit. Grazia is a hallmark of Italian style and refinement in all aspects of life.",
      pronunciation: "GRAH-tsya",
    },
    {
      id: "sole",
      word: "sole",
      language: "Italian",
      meaning: "Sun",
      story:
        "The radiant source of warmth and life. Sole symbolizes the Italian love for brightness and vitality.",
      pronunciation: "SO-le",
    },
    {
      id: "fede",
      word: "fede",
      language: "Italian",
      meaning: "Faith",
      story:
        "The steadfast belief in God, love, or ideals. Fede anchors the Italian heart in hope and devotion.",
      pronunciation: "FEH-de",
    },
  ],
  German: [
    {
      id: "gemutlichkeit",
      word: "Gemütlichkeit",
      language: "German",
      meaning: "Cozy warmth",
      story:
        "A feeling of warmth, friendliness, and good cheer that creates a cozy, welcoming atmosphere. Central to German culture’s appreciation for comfort and togetherness.",
      pronunciation: "guh-MYT-likh-kyt",
    },
    {
      id: "wanderlust",
      word: "Wanderlust",
      language: "German",
      meaning: "Desire to travel",
      story:
        "A strong desire to travel and explore the world. This German concept has been adopted globally to describe the irresistible urge to wander and discover.",
      pronunciation: "VAN-der-lust",
    },
    {
      id: "schadenfreude",
      word: "Schadenfreude",
      language: "German",
      meaning: "Joy from others’ misfortune",
      story:
        "The feeling of pleasure derived from another person’s misfortune. This complex emotion reveals a darker aspect of human psychology that Germans have named.",
      pronunciation: "SHAH-den-froy-duh",
    },
    {
      id: "weltschmerz",
      word: "Weltschmerz",
      language: "German",
      meaning: "World-weariness",
      story:
        "A feeling of melancholy and world-weariness caused by the inadequacy of the world to fulfill one’s spiritual and emotional needs. Represents existential sadness.",
      pronunciation: "VELT-shmerts",
    },
    {
      id: "fernweh",
      word: "Fernweh",
      language: "German",
      meaning: "Distance pain",
      story:
        "The pain or ache felt from being away from a distant place. The opposite of homesickness - longing for far-off places you’ve never been.",
      pronunciation: "FERN-vay",
    },
    {
      id: "zeitgeist",
      word: "Zeitgeist",
      language: "German",
      meaning: "Spirit of the age",
      story:
        "The defining spirit or mood of a particular period. Zeitgeist captures the cultural essence shaping German thought and history.",
      pronunciation: "TSIGHT-gyst",
    },
    {
      id: "heimat",
      word: "Heimat",
      language: "German",
      meaning: "Homeland",
      story:
        "The deep emotional connection to one’s roots and home. Heimat evokes a sense of belonging unique to German culture.",
      pronunciation: "HY-mat",
    },
    {
      id: "sehnsucht",
      word: "Sehnsucht",
      language: "German",
      meaning: "Yearning",
      story:
        "An intense longing for something unattainable or indefinable. Sehnsucht is a poetic reflection of the German soul’s depth.",
      pronunciation: "ZAYN-zookht",
    },
    {
      id: "freundschaft",
      word: "Freundschaft",
      language: "German",
      meaning: "Friendship",
      story:
        "The bond of loyalty and trust between friends. Freundschaft is cherished in German culture as a source of strength.",
      pronunciation: "FROYND-shaft",
    },
    {
      id: "geborgenheit",
      word: "Geborgenheit",
      language: "German",
      meaning: "Security",
      story:
        "The feeling of being safe and protected. Geborgenheit reflects the German value of finding comfort in closeness.",
      pronunciation: "ge-BOR-gen-hyt",
    },
    {
      id: "liebe",
      word: "Liebe",
      language: "German",
      meaning: "Love",
      story:
        "The deep emotion of romantic or familial love. Liebe is the heart of German expressions of affection and care.",
      pronunciation: "LEE-buh",
    },
    {
      id: "freude",
      word: "Freude",
      language: "German",
      meaning: "Joy",
      story:
        "The pure happiness of life’s moments. Freude is celebrated in German culture, as in Schiller’s famous ode.",
      pronunciation: "FROY-duh",
    },
    {
      id: "ruhe",
      word: "Ruhe",
      language: "German",
      meaning: "Calm",
      story:
        "The state of peace and quiet. Ruhe is cherished in German culture as a respite from life’s demands.",
      pronunciation: "ROO-uh",
    },
    {
      id: "ordnung",
      word: "Ordnung",
      language: "German",
      meaning: "Order",
      story:
        "The value of structure and discipline. Ordnung reflects the German appreciation for clarity and organization in life.",
      pronunciation: "ORD-noong",
    },
    {
      id: "herz",
      word: "Herz",
      language: "German",
      meaning: "Heart",
      story:
        "The emotional center of love and courage. Herz is a symbol of sincerity in German culture and poetry.",
      pronunciation: "HERTS",
    },
    {
      id: "licht",
      word: "Licht",
      language: "German",
      meaning: "Light",
      story:
        "The radiance of hope and truth. Licht symbolizes inspiration and clarity in German literature and thought.",
      pronunciation: "LIKHT",
    },
    {
      id: "mut",
      word: "Mut",
      language: "German",
      meaning: "Courage",
      story:
        "The bravery to face challenges. Mut reflects the German value of strength in adversity and conviction.",
      pronunciation: "MOOT",
    },
    {
      id: "hoffnung",
      word: "Hoffnung",
      language: "German",
      meaning: "Hope",
      story:
        "The optimistic belief in a better future. Hoffnung sustains the German spirit through trials and dreams.",
      pronunciation: "HOF-noong",
    },
    {
      id: "stille",
      word: "Stille",
      language: "German",
      meaning: "Silence",
      story:
        "The profound quiet that invites reflection. Stille is valued in German culture for its peace and depth.",
      pronunciation: "SHTIL-uh",
    },
    {
      id: "dank",
      word: "Dank",
      language: "German",
      meaning: "Gratitude",
      story:
        "The heartfelt appreciation for kindness received. Dank strengthens bonds in German culture through acknowledgment.",
      pronunciation: "DAHNK",
    },
  ],
  French: [
    {
      id: "joie-de-vivre",
      word: "joie de vivre",
      language: "French",
      meaning: "Joy of living",
      story:
        "The exuberant enjoyment of life and zest for living. This phrase embodies the French appreciation for life’s pleasures and the art of living well.",
      pronunciation: "zhwah duh VEE-vruh",
    },
    {
      id: "savoir-vivre",
      word: "savoir-vivre",
      language: "French",
      meaning: "Knowledge of how to live",
      story:
        "The knowledge of how to live well and behave properly in society. Represents sophistication, good manners, and understanding of social graces.",
      pronunciation: "sa-vwar VEE-vruh",
    },
    {
      id: "flaner",
      word: "flâner",
      language: "French",
      meaning: "To stroll aimlessly",
      story:
        "To stroll leisurely through the streets without purpose, observing life and soaking in the atmosphere. A quintessentially Parisian art of urban exploration.",
      pronunciation: "flah-NAY",
    },
    {
      id: "je-ne-sais-quoi",
      word: "je ne sais quoi",
      language: "French",
      meaning: "Indefinable quality",
      story:
        "An indefinable, elusive quality that makes someone or something distinctive and attractive. Represents that special something that cannot be easily described.",
      pronunciation: "zhuh nuh say KWAH",
    },
    {
      id: "elegance",
      word: "élégance",
      language: "French",
      meaning: "Graceful beauty",
      story:
        "Graceful beauty of style and manner. French élégance encompasses not just appearance but also attitude, movement, and way of being.",
      pronunciation: "ay-lay-GAHNSS",
    },
    {
      id: "amour",
      word: "amour",
      language: "French",
      meaning: "Love",
      story:
        "The passionate and romantic love celebrated in French culture. Amour is the heart of poetry, art, and human connection.",
      pronunciation: "a-MOOR",
    },
    {
      id: "esprit",
      word: "esprit",
      language: "French",
      meaning: "Wit/spirit",
      story:
        "The lively intelligence and charm of conversation. Esprit reflects the French love for cleverness and spirited exchange.",
      pronunciation: "es-PREE",
    },
    {
      id: "charme",
      word: "charme",
      language: "French",
      meaning: "Charm",
      story:
        "The captivating allure of a person or moment. Charme embodies the French art of enchantment through grace and warmth.",
      pronunciation: "SHARM",
    },
    {
      id: "bonheur",
      word: "bonheur",
      language: "French",
      meaning: "Happiness",
      story:
        "The serene joy of a fulfilled life. Bonheur is cherished in French culture as the essence of a life well-lived.",
      pronunciation: "bon-UR",
    },
    {
      id: "lumière",
      word: "lumière",
      language: "French",
      meaning: "Light",
      story:
        "The radiance of inspiration and beauty. Lumière symbolizes hope and clarity in French art and philosophy.",
      pronunciation: "loo-MYAIR",
    },
    {
      id: "coeur",
      word: "cœur",
      language: "French",
      meaning: "Heart",
      story:
        "The emotional core where love, courage, and passion reside. Cœur is central to French expressions of deep feeling.",
      pronunciation: "KUR",
    },
    {
      id: "liberté",
      word: "liberté",
      language: "French",
      meaning: "Freedom",
      story:
        "The cherished ideal of liberty and self-expression. Liberté is a cornerstone of French history and revolutionary spirit.",
      pronunciation: "lee-ber-TAY",
    },
    {
      id: "espoir",
      word: "espoir",
      language: "French",
      meaning: "Hope",
      story:
        "The optimistic belief in a brighter future. Espoir sustains the French spirit through challenges and dreams.",
      pronunciation: "es-PWAR",
    },
    {
      id: "douceur",
      word: "douceur",
      language: "French",
      meaning: "Sweetness",
      story:
        "The gentle sweetness of life’s pleasures, from a kind word to a soft breeze. Douceur reflects French appreciation for subtle joys.",
      pronunciation: "doo-SUR",
    },
    {
      id: "rêve",
      word: "rêve",
      language: "French",
      meaning: "Dream",
      story:
        "The realm of imagination and aspiration. Rêve captures the French love for romantic and creative visions of life.",
      pronunciation: "REV",
    },
    {
      id: "amitié",
      word: "amitié",
      language: "French",
      meaning: "Friendship",
      story:
        "The bond of loyalty and affection between friends. Amitié is cherished in French culture for its warmth and trust.",
      pronunciation: "a-mee-TYAY",
    },
    {
      id: "beauté",
      word: "beauté",
      language: "French",
      meaning: "Beauty",
      story:
        "The aesthetic and emotional allure of people, art, or nature. Beauté is a French obsession, celebrated in all forms.",
      pronunciation: "bo-TAY",
    },
    {
      id: "joie",
      word: "joie",
      language: "French",
      meaning: "Joy",
      story:
        "The radiant happiness of a moment or experience. Joie embodies the French zest for life’s simple pleasures.",
      pronunciation: "ZHWAH",
    },
    {
      id: "paix",
      word: "paix",
      language: "French",
      meaning: "Peace",
      story:
        "The state of inner and outer tranquility. Paix is a cherished ideal in French culture, sought through harmony.",
      pronunciation: "PAY",
    },
    {
      id: "art",
      word: "art",
      language: "French",
      meaning: "Art",
      story:
        "The expression of human creativity and emotion. Art is central to French culture, from painting to cuisine.",
      pronunciation: "AR",
    },
  ],
};

export default function HomePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Arabic");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [savedWords, setSavedWords] = useState<Record<string, Word>>({});
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFavorites = JSON.parse(
        localStorage.getItem("lexislore-favorites") || "[]"
      );
      const savedWordsData = JSON.parse(
        localStorage.getItem("lexislore-saved-words") || "{}"
      );
      setFavorites(savedFavorites);
      setSavedWords(savedWordsData);

      const isDark = localStorage.getItem("lexislore-dark-mode") === "true";
      setDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add("dark");
      }

      const handleVoicesChanged = () => {
        const voices = window.speechSynthesis.getVoices();
        console.log(
          "Available voices:",
          voices.map((v) => ({ name: v.name, lang: v.lang }))
        );
      };
      window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
      handleVoicesChanged(); // Try loading voices immediately
      return () => {
        window.speechSynthesis.onvoiceschanged = null;
      };
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("lexislore-dark-mode", newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const currentWords = sampleWords[selectedLanguage] || [];

  const pronounceWord = (
    word: string,
    language: string,
    pronunciation?: string
  ) => {
    if ("speechSynthesis" in window) {
      const lang = languages.find((l) => l.name === language)?.code || "en-US";
      const utterance = new SpeechSynthesisUtterance(
        language === "Arabic" && pronunciation ? pronunciation : word
      );
      utterance.lang = lang;
      utterance.rate = 0.8;

      const voices = window.speechSynthesis.getVoices();
      if (language === "Arabic") {
        const arabicVoice = voices.find((v) => v.lang.includes("ar"));
        if (!arabicVoice && pronunciation) {
          utterance.lang = "en-US";
          console.warn(
            "No Arabic voice available, using English pronunciation."
          );
        } else if (!arabicVoice) {
          alert("Arabic text-to-speech is not supported on this device.");
          return;
        } else {
          utterance.voice = arabicVoice;
        }
      }

      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  const toggleFavorite = (wordId: string) => {
    const word = currentWords.find((w) => w.id === wordId);
    if (!word) return;

    const newSavedWords = { ...savedWords, [wordId]: word };
    setSavedWords(newSavedWords);
    localStorage.setItem(
      "lexislore-saved-words",
      JSON.stringify(newSavedWords)
    );

    const newFavorites = favorites.includes(wordId)
      ? favorites.filter((id) => id !== wordId)
      : [...favorites, wordId];

    setFavorites(newFavorites);
    localStorage.setItem("lexislore-favorites", JSON.stringify(newFavorites));
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-slate-900 to-slate-800"
          : "bg-gradient-to-br from-orange-50 to-pink-50"
      }`}
    >
      <header
        className={`backdrop-blur-sm border-b transition-colors duration-300 ${
          darkMode
            ? "bg-slate-800/80 border-slate-700"
            : "bg-white/80 border-orange-200"
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between  flex-col sm:flex-row gap-5 sm:gap-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3"
            >
              <div className="text-3xl">📚</div>
              <div>
                <h1
                  className={`text-3xl font-bold transition-colors duration-300 ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  LexisLore
                </h1>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Discover Heritage Words
                </p>
              </div>
            </motion.div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleDarkMode}
                className={darkMode ? "text-white hover:bg-slate-700" : ""}
              >
                {darkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>

              <Link href="/favorites">
                <Button
                  variant="ghost"
                  size="sm"
                  className={darkMode ? "text-white hover:bg-slate-700" : ""}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </Button>
              </Link>

              <Link href="/quiz">
                <Button
                  variant="ghost"
                  size="sm"
                  className={darkMode ? "text-white hover:bg-slate-700" : ""}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2
            className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Explore Beautiful Words from Around the World
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Discover rare and meaningful words that capture the essence of
            different cultures and their unique perspectives on life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3
            className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Choose a Language
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {languages.map((language) => (
              <motion.button
                key={language.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedLanguage(language.name);
                  setCurrentWordIndex(0);
                }}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedLanguage === language.name
                    ? darkMode
                      ? "border-teal-500 bg-teal-900/20 text-teal-400"
                      : "border-orange-500 bg-orange-50 text-orange-700"
                    : darkMode
                    ? "border-slate-600 hover:border-teal-400 bg-slate-800 text-white"
                    : "border-gray-200 hover:border-orange-300 bg-white text-gray-700"
                }`}
              >
                <div className="text-2xl mb-2">{language.flag}</div>
                <div className="font-medium text-sm">{language.name}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLanguage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`text-2xl font-bold transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {selectedLanguage} Words
              </h3>
              <div
                className={`text-sm transition-colors duration-300 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {currentWords.length} words available
              </div>
            </div>

            {currentWords.length > 0 && (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 8000, disableOnInteraction: false }}
                breakpoints={{
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                className="word-swiper"
              >
                {currentWords.map((word, index) => (
                  <SwiperSlide key={word.id}>
                    <Card
                      className={`h-full transition-all duration-300 hover:shadow-xl ${
                        darkMode
                          ? "bg-slate-800 border-slate-700 shadow-lg"
                          : "bg-white shadow-lg"
                      }`}
                    >
                      <CardContent className="p-6 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h4
                              className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {word.word}
                            </h4>
                            <p
                              className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                                darkMode ? "text-teal-400" : "text-orange-600"
                              }`}
                            >
                              {word.meaning}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(word.id)}
                            className={`${
                              favorites.includes(word.id)
                                ? darkMode
                                  ? "text-red-400 hover:text-red-300"
                                  : "text-red-500 hover:text-red-600"
                                : darkMode
                                ? "text-gray-400 hover:text-red-400"
                                : "text-gray-400 hover:text-red-500"
                            }`}
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                favorites.includes(word.id)
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          </Button>
                        </div>

                        <p
                          className={`text-sm leading-relaxed mb-4 flex-1 transition-colors duration-300 ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {word.story}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-600">
                          <span
                            className={`text-xs font-mono transition-colors duration-300 ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                            }`}
                          >
                            {word.pronunciation}
                          </span>
                          <Button
                            onClick={() =>
                              pronounceWord(
                                word.word,
                                word.language,
                                word.pronunciation
                              )
                            }
                            size="sm"
                            className={`transition-colors duration-300 ${
                              darkMode
                                ? "bg-teal-600 hover:bg-teal-700 text-white"
                                : "bg-orange-500 hover:bg-orange-600 text-white"
                            }`}
                          >
                            <Volume2 className="h-4 w-4 mr-1" />
                            Listen
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <div
            className={`inline-flex items-center space-x-4 px-6 py-3 rounded-full transition-colors duration-300 ${
              darkMode
                ? "bg-slate-800 border border-slate-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <BookOpen
              className={`h-5 w-5 transition-colors duration-300 ${
                darkMode ? "text-teal-400" : "text-orange-500"
              }`}
            />
            <span
              className={`text-sm transition-colors duration-300 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Discover the beauty of language, one word at a time
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
