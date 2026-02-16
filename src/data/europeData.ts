export interface Country {
  id: string;
  nameZh: string;
  flag: string;
  colorIndex: number;
  region: string;
}

export interface Landmark {
  id: string;
  nameZh: string;
  emoji: string;
  countryId: string;
  city: string;
  cityZh: string;
}

export interface Achievement {
  id: string;
  nameZh: string;
  emoji: string;
  description: string;
  requiredCountries: string[];
  minCountries?: number;
}

export const REGIONS = ['北欧', '西欧', '中欧', '南欧', '东欧', '巴尔干'] as const;

export const COUNTRIES: Country[] = [
  // 北欧
  { id: 'IS', nameZh: '冰岛', flag: '🇮🇸', colorIndex: 0, region: '北欧' },
  { id: 'NO', nameZh: '挪威', flag: '🇳🇴', colorIndex: 1, region: '北欧' },
  { id: 'SE', nameZh: '瑞典', flag: '🇸🇪', colorIndex: 2, region: '北欧' },
  { id: 'FI', nameZh: '芬兰', flag: '🇫🇮', colorIndex: 3, region: '北欧' },
  { id: 'DK', nameZh: '丹麦', flag: '🇩🇰', colorIndex: 4, region: '北欧' },
  // 西欧
  { id: 'GB', nameZh: '英国', flag: '🇬🇧', colorIndex: 1, region: '西欧' },
  { id: 'IE', nameZh: '爱尔兰', flag: '🇮🇪', colorIndex: 2, region: '西欧' },
  { id: 'FR', nameZh: '法国', flag: '🇫🇷', colorIndex: 0, region: '西欧' },
  { id: 'NL', nameZh: '荷兰', flag: '🇳🇱', colorIndex: 3, region: '西欧' },
  { id: 'BE', nameZh: '比利时', flag: '🇧🇪', colorIndex: 4, region: '西欧' },
  { id: 'LU', nameZh: '卢森堡', flag: '🇱🇺', colorIndex: 5, region: '西欧' },
  { id: 'MC', nameZh: '摩纳哥', flag: '🇲🇨', colorIndex: 1, region: '西欧' },
  // 中欧
  { id: 'DE', nameZh: '德国', flag: '🇩🇪', colorIndex: 5, region: '中欧' },
  { id: 'CH', nameZh: '瑞士', flag: '🇨🇭', colorIndex: 0, region: '中欧' },
  { id: 'AT', nameZh: '奥地利', flag: '🇦🇹', colorIndex: 2, region: '中欧' },
  { id: 'LI', nameZh: '列支敦士登', flag: '🇱🇮', colorIndex: 3, region: '中欧' },
  { id: 'CZ', nameZh: '捷克', flag: '🇨🇿', colorIndex: 1, region: '中欧' },
  { id: 'SK', nameZh: '斯洛伐克', flag: '🇸🇰', colorIndex: 4, region: '中欧' },
  { id: 'PL', nameZh: '波兰', flag: '🇵🇱', colorIndex: 0, region: '中欧' },
  { id: 'HU', nameZh: '匈牙利', flag: '🇭🇺', colorIndex: 3, region: '中欧' },
  // 南欧
  { id: 'PT', nameZh: '葡萄牙', flag: '🇵🇹', colorIndex: 0, region: '南欧' },
  { id: 'ES', nameZh: '西班牙', flag: '🇪🇸', colorIndex: 1, region: '南欧' },
  { id: 'AD', nameZh: '安道尔', flag: '🇦🇩', colorIndex: 3, region: '南欧' },
  { id: 'IT', nameZh: '意大利', flag: '🇮🇹', colorIndex: 2, region: '南欧' },
  { id: 'MT', nameZh: '马耳他', flag: '🇲🇹', colorIndex: 4, region: '南欧' },
  { id: 'GR', nameZh: '希腊', flag: '🇬🇷', colorIndex: 5, region: '南欧' },
  { id: 'CY', nameZh: '塞浦路斯', flag: '🇨🇾', colorIndex: 0, region: '南欧' },
  { id: 'TR', nameZh: '土耳其', flag: '🇹🇷', colorIndex: 3, region: '南欧' },
  // 东欧
  { id: 'EE', nameZh: '爱沙尼亚', flag: '🇪🇪', colorIndex: 0, region: '东欧' },
  { id: 'LV', nameZh: '拉脱维亚', flag: '🇱🇻', colorIndex: 1, region: '东欧' },
  { id: 'LT', nameZh: '立陶宛', flag: '🇱🇹', colorIndex: 2, region: '东欧' },
  { id: 'BY', nameZh: '白俄罗斯', flag: '🇧🇾', colorIndex: 3, region: '东欧' },
  { id: 'UA', nameZh: '乌克兰', flag: '🇺🇦', colorIndex: 4, region: '东欧' },
  { id: 'MD', nameZh: '摩尔多瓦', flag: '🇲🇩', colorIndex: 5, region: '东欧' },
  { id: 'RO', nameZh: '罗马尼亚', flag: '🇷🇴', colorIndex: 0, region: '东欧' },
  { id: 'BG', nameZh: '保加利亚', flag: '🇧🇬', colorIndex: 1, region: '东欧' },
  // 巴尔干
  { id: 'SI', nameZh: '斯洛文尼亚', flag: '🇸🇮', colorIndex: 2, region: '巴尔干' },
  { id: 'HR', nameZh: '克罗地亚', flag: '🇭🇷', colorIndex: 0, region: '巴尔干' },
  { id: 'BA', nameZh: '波黑', flag: '🇧🇦', colorIndex: 1, region: '巴尔干' },
  { id: 'RS', nameZh: '塞尔维亚', flag: '🇷🇸', colorIndex: 3, region: '巴尔干' },
  { id: 'ME', nameZh: '黑山', flag: '🇲🇪', colorIndex: 4, region: '巴尔干' },
  { id: 'XK', nameZh: '科索沃', flag: '🇽🇰', colorIndex: 5, region: '巴尔干' },
  { id: 'MK', nameZh: '北马其顿', flag: '🇲🇰', colorIndex: 0, region: '巴尔干' },
  { id: 'AL', nameZh: '阿尔巴尼亚', flag: '🇦🇱', colorIndex: 2, region: '巴尔干' },
];

export const TOTAL_COUNTRIES = COUNTRIES.length;

export const MAP_COLORS = [
  'hsl(25, 95%, 60%)',   // orange
  'hsl(145, 55%, 48%)',  // green
  'hsl(210, 80%, 58%)',  // blue
  'hsl(340, 72%, 58%)',  // pink
  'hsl(270, 55%, 58%)',  // purple
  'hsl(175, 55%, 42%)',  // teal
];

export const LANDMARKS: Landmark[] = [
  { id: 'eiffel', nameZh: '埃菲尔铁塔', emoji: '🗼', countryId: 'FR', city: 'paris', cityZh: '巴黎' },
  { id: 'bigben', nameZh: '大本钟', emoji: '🕰️', countryId: 'GB', city: 'london', cityZh: '伦敦' },
  { id: 'colosseum', nameZh: '罗马斗兽场', emoji: '🏛️', countryId: 'IT', city: 'rome', cityZh: '罗马' },
  { id: 'neuschwanstein', nameZh: '新天鹅堡', emoji: '🏰', countryId: 'DE', city: 'munich', cityZh: '慕尼黑' },
  { id: 'sagrada', nameZh: '圣家堂', emoji: '⛪', countryId: 'ES', city: 'barcelona', cityZh: '巴塞罗那' },
  { id: 'tulips', nameZh: '库肯霍夫花园', emoji: '🌷', countryId: 'NL', city: 'amsterdam', cityZh: '阿姆斯特丹' },
  { id: 'matterhorn', nameZh: '马特洪峰', emoji: '🏔️', countryId: 'CH', city: 'zermatt', cityZh: '采尔马特' },
  { id: 'charles', nameZh: '查理大桥', emoji: '🌉', countryId: 'CZ', city: 'prague', cityZh: '布拉格' },
  { id: 'acropolis', nameZh: '雅典卫城', emoji: '🏛️', countryId: 'GR', city: 'athens', cityZh: '雅典' },
  { id: 'vienna', nameZh: '维也纳歌剧院', emoji: '🎵', countryId: 'AT', city: 'vienna', cityZh: '维也纳' },
  { id: 'budapest', nameZh: '布达城堡', emoji: '🏰', countryId: 'HU', city: 'budapest', cityZh: '布达佩斯' },
  { id: 'bluelagoon', nameZh: '蓝湖温泉', emoji: '♨️', countryId: 'IS', city: 'reykjavik', cityZh: '雷克雅未克' },
  { id: 'fjord', nameZh: '峡湾', emoji: '🌊', countryId: 'NO', city: 'bergen', cityZh: '卑尔根' },
  { id: 'kronborg', nameZh: '克伦堡宫', emoji: '🏰', countryId: 'DK', city: 'copenhagen', cityZh: '哥本哈根' },
  { id: 'santa', nameZh: '圣诞老人村', emoji: '🎅', countryId: 'FI', city: 'rovaniemi', cityZh: '罗瓦涅米' },
  { id: 'porto', nameZh: '波尔图酒庄', emoji: '🍷', countryId: 'PT', city: 'porto', cityZh: '波尔图' },
  { id: 'venice', nameZh: '威尼斯水城', emoji: '🎭', countryId: 'IT', city: 'venice', cityZh: '威尼斯' },
  { id: 'dubrovnik', nameZh: '杜布罗夫尼克', emoji: '🏰', countryId: 'HR', city: 'dubrovnik', cityZh: '杜布罗夫尼克' },
  { id: 'aurora', nameZh: '北极光', emoji: '🌌', countryId: 'SE', city: 'kiruna', cityZh: '基律纳' },
  { id: 'manneken', nameZh: '撒尿小童', emoji: '⛲', countryId: 'BE', city: 'brussels', cityZh: '布鲁塞尔' },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'trio', nameZh: '法德意三国游', emoji: '✨', requiredCountries: ['FR', 'DE', 'IT'], description: '打卡法国、德国和意大利' },
  { id: 'nordic', nameZh: '北欧探索者', emoji: '❄️', requiredCountries: ['NO', 'SE', 'FI', 'DK', 'IS'], description: '打卡全部五个北欧国家' },
  { id: 'mediterranean', nameZh: '地中海之旅', emoji: '🌊', requiredCountries: ['ES', 'IT', 'GR'], description: '打卡西班牙、意大利和希腊' },
  { id: 'central', nameZh: '中欧漫步', emoji: '🏰', requiredCountries: ['AT', 'CZ', 'HU', 'PL'], description: '打卡奥地利、捷克、匈牙利和波兰' },
  { id: 'british', nameZh: '不列颠探索', emoji: '🍀', requiredCountries: ['GB', 'IE'], description: '打卡英国和爱尔兰' },
  { id: 'western', nameZh: '西欧通', emoji: '🌍', requiredCountries: ['FR', 'DE', 'NL', 'BE', 'LU'], description: '打卡法德荷比卢五国' },
  { id: 'balkan', nameZh: '巴尔干冒险家', emoji: '⚡', requiredCountries: ['HR', 'RS', 'ME', 'BA', 'AL'], description: '打卡巴尔干五国' },
  { id: 'master', nameZh: '欧洲达人', emoji: '🌟', requiredCountries: [], minCountries: 10, description: '打卡10个以上欧洲国家' },
];
