class AmharicLetter {
    letters = [];

    constructor(letters) {
        this.letters = letters;
    }
};

export function shuffleToCopy(array) {
    const clone = structuredClone(array); // Allocate new memory for a copy
    
    for (let i = clone.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    
    return clone;
};

export const amharicAlphabetList = [
    new AmharicLetter( [{name: "ሀ", sound: "ha"}, {name: "ሁ", sound: "hu"}, {name: "ሂ", sound: "hee"}, {name: "ሃ", sound: "ha"}, {name: "ሄ", sound: "hae"}, {name: "ህ", sound: "heh"}, {name: "ሆ", sound: "ho"}] ),
    new AmharicLetter( [{name: "ለ", sound: "le"}, {name: "ሉ", sound: "lu"}, {name: "ሊ", sound: "lee"}, {name: "ላ", sound: "la"}, {name: "ሌ", sound: "lay"}, {name: "ል", sound: "leh"}, {name: "ሎ", sound: "lo"}] ),
    new AmharicLetter( [{name: "ሐ", sound: "ha"}, {name: "ሑ", sound: "hu"}, {name: "ሒ", sound: "hee"}, {name: "ሓ", sound: "ha"}, {name: "ሔ", sound: "hae"}, {name: "ሕ", sound: "heh"}, {name: "ሖ", sound: "ho"}] ),
    new AmharicLetter( [{name: "መ", sound: "muh"}, {name: "ሙ", sound: "moo"}, {name: "ሚ", sound: "mee"}, {name: "ማ", sound: "ma"}, {name: "ሜ", sound: "mae"}, {name: "ም", sound: "mih"}, {name: "ሞ", sound: "mo"}] ),
    new AmharicLetter( [{name: "ሠ", sound: "seh"}, {name: "ሡ", sound: "soo"}, {name: "ሢ", sound: "see"}, {name: "ሣ", sound: "sa"}, {name: "ሤ", sound: "sae"}, {name: "ሥ", sound: "sih"}, {name: "ሦ", sound: "so"}] ),
    new AmharicLetter( [{name: "ረ", sound: "reh"}, {name: "ሩ", sound: "roo"}, {name: "ሪ", sound: "ree"}, {name: "ራ", sound: "ra"}, {name: "ሬ", sound: "rae"}, {name: "ር", sound: "rih"}, {name: "ሮ", sound: "ro"}] ),
    new AmharicLetter( [{name: "ሰ", sound: "seh"}, {name: "ሱ", sound: "soo"}, {name: "ሲ", sound: "see"}, {name: "ሳ", sound: "sa"}, {name: "ሴ", sound: "sae"}, {name: "ስ", sound: "sih"}, {name: "ሶ", sound: "so"}] ),
    new AmharicLetter( [{name: "ሸ", sound: "sheh"}, {name: "ሹ", sound: "shoo"}, {name: "ሺ", sound: "shee"}, {name: "ሻ", sound: "sha"}, {name: "ሼ", sound: "shae"}, {name: "ሽ", sound: "shih"}, {name: "ሾ", sound: "sho"}] ),
    new AmharicLetter( [{name: "ቀ", sound: "qeh"}, {name: "ቁ", sound: "qoo"}, {name: "ቂ", sound: "qee"}, {name: "ቃ", sound: "qa"}, {name: "ቄ", sound: "qae"}, {name: "ቅ", sound: "qih"}, {name: "ቆ", sound: "qo"}] ),
    new AmharicLetter( [{name: "በ", sound: "beh"}, {name: "ቡ", sound: "boo"}, {name: "ቢ", sound: "bee"}, {name: "ባ", sound: "ba"}, {name: "ቤ", sound: "bae"}, {name: "ብ", sound: "bih"}, {name: "ቦ", sound: "bo"}] ),
    new AmharicLetter( [{name: "ቨ", sound: "veh"}, {name: "ቩ", sound: "voo"}, {name: "ቪ", sound: "vee"}, {name: "ቫ", sound: "va"}, {name: "ቬ", sound: "vae"}, {name: "ቭ", sound: "vih"}, {name: "ቮ", sound: "vo"}] ),
    new AmharicLetter( [{name: "ተ", sound: "teh"}, {name: "ቱ", sound: "too"}, {name: "ቲ", sound: "tee"}, {name: "ታ", sound: "ta"}, {name: "ቴ", sound: "tae"}, {name: "ት", sound: "tih"}, {name: "ቶ", sound: "to"}] ),
    new AmharicLetter( [{name: "ቸ", sound: "cheh"}, {name: "ቹ", sound: "choo"}, {name: "ቺ", sound: "chee"}, {name: "ቻ", sound: "cha"}, {name: "ቼ", sound: "chae"}, {name: "ች", sound: "chih"}, {name: "ቾ", sound: "cho"}] ),
    new AmharicLetter( [{name: "ኀ", sound: "ha"}, {name: "ኁ", sound: "hu"}, {name: "ኂ", sound: "hee"}, {name: "ኃ", sound: "ha"}, {name: "ኄ", sound: "hae"}, {name: "ኅ", sound: "heh"}, {name: "ኆ", sound: "ho"}] ),
    new AmharicLetter( [{name: "ነ", sound: "neh"}, {name: "ኑ", sound: "noo"}, {name: "ኒ", sound: "nee"}, {name: "ና", sound: "na"}, {name: "ኔ", sound: "nae"}, {name: "ን", sound: "nih"}, {name: "ኖ", sound: "no"}] ),
    new AmharicLetter( [{name: "ኘ", sound: "gneh"}, {name: "ኙ", sound: "gnoo"}, {name: "ኚ", sound: "gnee"}, {name: "ኛ", sound: "gna"}, {name: "ኜ", sound: "gnae"}, {name: "ኝ", sound: "gnih"}, {name: "ኞ", sound: "gno"}] ),
    new AmharicLetter( [{name: "አ", sound: "aa"}, {name: "ኡ", sound: "oo"}, {name: "ኢ", sound: "ee"}, {name: "ኣ", sound: "aa"}, {name: "ኤ", sound: "ae"}, {name: "እ", sound: "ih"}, {name: "ኦ", sound: "o"}] ),
    new AmharicLetter( [{name: "ከ", sound: "keh"}, {name: "ኩ", sound: "koo"}, {name: "ኪ", sound: "kee"}, {name: "ካ", sound: "ka"}, {name: "ኬ", sound: "kae"}, {name: "ክ", sound: "kih"}, {name: "ኮ", sound: "ko"}] ),
    new AmharicLetter( [{name: "ኸ", sound: "huh"}, {name: "ኹ", sound: "hu"}, {name: "ኺ", sound: "hee"}, {name: "ኻ", sound: "ha"}, {name: "ኼ", sound: "hae"}, {name: "ኽ", sound: "heh"}, {name: "ኾ", sound: "ho"}] ),
    new AmharicLetter( [{name: "ወ", sound: "weh"}, {name: "ዉ", sound: "woo"}, {name: "ዊ", sound: "wee"}, {name: "ዋ", sound: "wa"}, {name: "ዌ", sound: "wae"}, {name: "ው", sound: "wih"}, {name: "ዎ", sound: "wo"}] ),
    new AmharicLetter( [{name: "ዐ", sound: "aa"}, {name: "ዑ", sound: "oo"}, {name: "ዒ", sound: "ee"}, {name: "ዓ", sound: "aa"}, {name: "ዔ", sound: "ae"}, {name: "ዕ", sound: "ih"}, {name: "ዖ", sound: "o"}] ),
    new AmharicLetter( [{name: "ዘ", sound: "ze"}, {name: "ዙ", sound: "zu"}, {name: "ዚ", sound: "zee"}, {name: "ዛ", sound: "zaa"}, {name: "ዜ", sound: "zae"}, {name: "ዝ", sound: "zih"}, {name: "ዞ", sound: "zo"}] ),
    new AmharicLetter( [{name: "ዠ", sound: "zjeh"}, {name: "ዡ", sound: "zjoo"}, {name: "ዢ", sound: "zjee"}, {name: "ዣ", sound: "zjaa"}, {name: "ዤ", sound: "zjae"}, {name: "ዥ", sound: "zjih"}, {name: "ዦ", sound: "zjo"}] ),
    new AmharicLetter( [{name: "የ", sound: "ye"}, {name: "ዩ", sound: "yu"}, {name: "ዪ", sound: "yee"}, {name: "ያ", sound: "yaa"}, {name: "ዬ", sound: "yae"}, {name: "ይ", sound: "yih"}, {name: "ዮ", sound: "yo"}] ),
    new AmharicLetter( [{name: "ደ", sound: "duh"}, {name: "ዱ", sound: "doo"}, {name: "ዲ", sound: "dee"}, {name: "ዳ", sound: "daa"}, {name: "ዴ", sound: "dae"}, {name: "ድ", sound: "dih"}, {name: "ዶ", sound: "do"}] ),
    new AmharicLetter( [{name: "ጀ", sound: "je"}, {name: "ጁ", sound: "joo"}, {name: "ጂ", sound: "jee"}, {name: "ጃ", sound: "jaa"}, {name: "ጄ", sound: "jae"}, {name: "ጅ", sound: "jih"}, {name: "ጆ", sound: "jo"}] ),
    new AmharicLetter( [{name: "ገ", sound: "guh"}, {name: "ጉ", sound: "goo"}, {name: "ጊ", sound: "gee"}, {name: "ጋ", sound: "ga"}, {name: "ጌ", sound: "gae"}, {name: "ግ", sound: "gih"}, {name: "ጎ", sound: "go"}] ),
    new AmharicLetter( [{name: "ጠ", sound: "tte"}, {name: "ጡ", sound: "ttu"}, {name: "ጢ", sound: "ttee"}, {name: "ጣ", sound: "ttaa"}, {name: "ጤ", sound: "ttae"}, {name: "ጥ", sound: "ttih"}, {name: "ጦ", sound: "tto"}] ),
    new AmharicLetter( [{name: "ጨ", sound: "chhe"}, {name: "ጩ", sound: "chhoo"}, {name: "ጪ", sound: "chhee"}, {name: "ጫ", sound: "chhaa"}, {name: "ጬ", sound: "chhae"}, {name: "ጭ", sound: "chhih"}, {name: "ጮ", sound: "cho"}] ),
    new AmharicLetter( [{name: "ጰ", sound: "ppuh"}, {name: "ጱ", sound: "ppoo"}, {name: "ጲ", sound: "ppee"}, {name: "ጳ", sound: "ppaa"}, {name: "ጴ", sound: "ppae"}, {name: "ጵ", sound: "ppih"}, {name: "ጶ", sound: "ppo"}] ),
    new AmharicLetter( [{name: "ጸ", sound: "tse"}, {name: "ጹ", sound: "tsoo"}, {name: "ጺ", sound: "tsee"}, {name: "ጻ", sound: "tsaa"}, {name: "ጼ", sound: "tsae"}, {name: "ጽ", sound: "tsih"}, {name: "ጾ", sound: "tso"}] ),
    new AmharicLetter( [{name: "ፀ", sound: "tse"}, {name: "ፁ", sound: "tsoo"}, {name: "ፂ", sound: "tsee"}, {name: "ፃ", sound: "tsaa"}, {name: "ፄ", sound: "tsae"}, {name: "ፅ", sound: "tsih"}, {name: "ፆ", sound: "tso"}] ),
    new AmharicLetter( [{name: "ፈ", sound: "fuh"}, {name: "ፉ", sound: "foo"}, {name: "ፊ", sound: "fee"}, {name: "ፋ", sound: "faa"}, {name: "ፌ", sound: "fae"}, {name: "ፍ", sound: "fih"}, {name: "ፎ", sound: "fo"}] ),
    new AmharicLetter( [{name: "ፐ", sound: "peh"}, {name: "ፑ", sound: "poo"}, {name: "ፒ", sound: "pee"}, {name: "ፓ", sound: "paa"}, {name: "ፔ", sound: "pae"}, {name: "ፕ", sound: "pih"}, {name: "ፖ", sound: "po"}] )
];