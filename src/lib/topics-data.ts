export interface TopicVerse {
  reference: string; // e.g. "요한복음 3:16"
  text: string;
  note?: string;
}

export interface RecommendedPassage {
  title: string;
  reference: string; // e.g. "로마서 8장"
  description: string;
}

export interface BibleTopic {
  id: string;
  title: string;
  titleEn: string;
  category: 'faith' | 'comfort' | 'growth' | 'life';
  categoryName: string;
  icon: string;
  color: string;
  summary: string;
  verses: TopicVerse[];
  passages: RecommendedPassage[];
  keywords: string[];
}

export interface TopicCategory {
  id: 'faith' | 'comfort' | 'growth' | 'life';
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  gradient: string;
  description: string;
}

export const topicCategories: TopicCategory[] = [
  {
    id: 'faith',
    name: '믿음과 구원',
    nameEn: 'Faith & Salvation',
    icon: '✝️',
    color: '#3B82F6',
    gradient: 'from-blue-700 to-indigo-900',
    description: '하나님의 은혜와 복음의 진리, 십자가의 구원과 믿음의 기초를 다지는 말씀들입니다.',
  },
  {
    id: 'comfort',
    name: '위로와 평안',
    nameEn: 'Comfort & Peace',
    icon: '🕊️',
    color: '#10B981',
    gradient: 'from-emerald-700 to-teal-900',
    description: '고난, 두려움, 외로움과 슬픔 속에서 하나님의 참된 평안과 위로를 얻는 말씀들입니다.',
  },
  {
    id: 'growth',
    name: '기도와 영적 성장',
    nameEn: 'Prayer & Spiritual Growth',
    icon: '🌱',
    color: '#8B5CF6',
    gradient: 'from-purple-700 to-violet-900',
    description: '기도와 찬양, 하나님의 지혜와 순종을 통해 주님을 닮아가는 영적 성장의 말씀들입니다.',
  },
  {
    id: 'life',
    name: '사랑과 삶의 실천',
    nameEn: 'Love & Christian Living',
    icon: '💖',
    color: '#F59E0B',
    gradient: 'from-amber-700 to-orange-900',
    description: '가정, 이웃 사랑, 용서와 나눔, 크리스천으로서 세상 속에서 빛과 소금으로 살아가는 지혜입니다.',
  },
];

export const bibleTopics: BibleTopic[] = [
  // ── 1. 믿음과 구원 ──
  {
    id: 'salvation',
    title: '구원과 영생',
    titleEn: 'Salvation & Eternal Life',
    category: 'faith',
    categoryName: '믿음과 구원',
    icon: '✝️',
    color: '#3B82F6',
    summary: '구원은 우리의 행위가 아닌 오직 하나님의 은혜와 예수 그리스도를 믿는 믿음으로 값없이 주어지는 선물입니다.',
    keywords: ['구원', '영생', '은혜', '십자가', '복음', '예수님', '믿음'],
    verses: [
      {
        reference: '요한복음 3:16',
        text: '하나님이 세상을 이처럼 사랑하사 독생자를 주셨으니 이는 그를 믿는 자마다 멸망하지 않고 영생을 얻게 하려 하심이라',
      },
      {
        reference: '에베소서 2:8-9',
        text: '너희는 그 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 이것은 너희에게서 난 것이 아니요 하나님의 선물이라 행위에서 난 것이 아니니 이는 누구든지 자랑하지 못하게 함이라',
      },
      {
        reference: '로마서 10:9-10',
        text: '네가 만일 네 입으로 예수를 주로 시인하며 또 하나님께서 그를 죽은 자 가운데서 살리신 것을 네 마음에 믿으면 구원을 받으리라 사람이 마음으로 믿어 의에 이르고 입으로 시인하여 구원에 이르느니라',
      },
      {
        reference: '사도행전 16:31',
        text: '이르되 주 예수를 믿으라 그리하면 너와 네 집이 구원을 받으리라 하고',
      },
    ],
    passages: [
      {
        title: '구원의 확신과 하나님의 의',
        reference: '로마서 3장~5장',
        description: '오직 믿음으로 의롭다 함을 얻는 이신칭의의 복음 진리를 상세히 해설합니다.',
      },
      {
        title: '새 생명과 영생의 복음',
        reference: '요한복음 3장',
        description: '니고데모와의 대화를 통해 거듭남(Born again)의 비밀과 영생의 약속을 가르칩니다.',
      },
    ],
  },
  {
    id: 'faith-trust',
    title: '믿음과 신뢰',
    titleEn: 'Faith & Trust',
    category: 'faith',
    categoryName: '믿음과 구원',
    icon: '🛡️',
    color: '#2563EB',
    summary: '눈에 보이지 않는 상황에서도 하나님의 성품과 약속을 온전히 신뢰하며 담대히 나아가는 믿음의 삶입니다.',
    keywords: ['믿음', '신뢰', '확신', '순종', '의지'],
    verses: [
      {
        reference: '히브리서 11:1',
        text: '믿음은 바라는 것들의 실상이요 보이지 않는 것들의 증거니',
      },
      {
        reference: '잠언 3:5-6',
        text: '너는 마음을 다하여 여호와를 신뢰하고 네 명철을 의지하지 말라 너는 범사에 그를 인정하라 그리하면 네 길을 지도하시리라',
      },
      {
        reference: '마가복음 9:23',
        text: '예수께서 이르시되 할 수 있거든이 무슨 말이냐 믿는 자에게는 능히 하지 못할 일이 없느니라 하시니',
      },
      {
        reference: '고린도후서 5:7',
        text: '이는 우리가 믿음으로 행하고 보는 것으로 행하지 아니함이로라',
      },
    ],
    passages: [
      {
        title: '믿음의 명예의 전당',
        reference: '히브리서 11장',
        description: '아벨, 에녹, 노아, 아브라함, 모세 등 믿음으로 승리한 성경 인물들의 증언입니다.',
      },
      {
        title: '아브라함의 믿음과 순종',
        reference: '창세기 12장, 22장',
        description: '본토 친척 아비 집을 떠나고 독자 이삭을 바치기까지 하나님을 신뢰한 아브라함의 여정입니다.',
      },
    ],
  },
  {
    id: 'gods-love',
    title: '하나님의 사랑',
    titleEn: "God's Unfailing Love",
    category: 'faith',
    categoryName: '믿음과 구원',
    icon: '❤️',
    color: '#DC2626',
    summary: '세상의 어떤 권세나 고난도 우리를 하나님의 무조건적이고 영원한 아가페 사랑에서 끊을 수 없습니다.',
    keywords: ['사랑', '은혜', '인자하심', '긍휼', '보살핌'],
    verses: [
      {
        reference: '로마서 8:38-39',
        text: '내가 확신하노니 사망이나 생명이나 천사들이나 권세자들이나 현재 일이나 장래 일이나 능력이나 높음이나 깊음이나 다른 어떤 피조물이라도 우리를 우리 주 그리스도 예수 안에 있는 하나님의 사랑에서 끊을 수 없으리라',
      },
      {
        reference: '요한일서 4:9-10',
        text: '하나님의 사랑이 우리에게 이렇게 나타난 바 되었으니 하나님이 자기의 독생자를 세상에 보내심은 그로 말미암아 우리를 살리려 하심이라 사랑은 여기 있으니 우리가 하나님을 사랑한 것이 아니요 오직 하나님이 우리를 사랑하사 우리 죄를 속하기 위하여 화목제물로 그 아들을 보내셨음이라',
      },
      {
        reference: '예레미야 31:3',
        text: '옛적에 여호와께서 나에게 나타나사 내가 영원한 사랑으로 너를 사랑하기에 인자함으로 너를 이끌었다 하였노라',
      },
      {
        reference: '시편 103:8',
        text: '여호와는 긍휼이 많으시고 은혜로우시며 노하기를 더디 하시고 인자하심이 풍부하시도다',
      },
    ],
    passages: [
      {
        title: '끊을 수 없는 하나님의 사랑',
        reference: '로마서 8장',
        description: '성령의 인도하심과 그리스도 안에서 누리는 영원하고 끊을 수 없는 사랑의 찬가입니다.',
      },
      {
        title: '하나님의 인자하심을 찬양',
        reference: '시편 136편',
        description: '창조부터 구원까지 "그 인자하심이 영원함이로다"를 고백하는 감사의 시입니다.',
      },
    ],
  },
  {
    id: 'repentance-forgiveness',
    title: '회개와 용서',
    titleEn: 'Repentance & Cleansing',
    category: 'faith',
    categoryName: '믿음과 구원',
    icon: '💧',
    color: '#0284C7',
    summary: '우리의 연약함과 죄를 솔직히 고백할 때, 하나님은 미쁘시고 의로우사 모든 불의에서 우리를 깨끗하게 하십니다.',
    keywords: ['회개', '죄사함', '정결', '새마음', '자비'],
    verses: [
      {
        reference: '요한일서 1:9',
        text: '만일 우리가 우리 죄를 자백하면 그는 미쁘시고 의로우사 우리 죄를 사하시며 우리를 모든 불의에서 깨끗하게 하실 것이요',
      },
      {
        reference: '이사야 1:18',
        text: '여호와께서 말씀하시되 오라 우리가 서로 변론하자 너희의 죄가 주홍 같을지라도 눈과 같이 희어질 것이요 진홍 같이 붉을지라도 양털 같이 희게 되리라',
      },
      {
        reference: '시편 51:10',
        text: '하나님이여 내 속에 정한 마음을 창조하시고 내 안에 정직한 영을 새롭게 하소서',
      },
      {
        reference: '미가 7:19',
        text: '다시 우리를 불쌍히 여기셔서 우리의 죄악을 발로 밟으시고 우리의 모든 죄를 깊은 바다에 던지시리이다',
      },
    ],
    passages: [
      {
        title: '다윗의 참회시',
        reference: '시편 51편',
        description: '밧세바 사건 이후 통회하는 심령으로 하나님의 긍휼과 정결케 하심을 구하는 다윗의 기도입니다.',
      },
      {
        title: '탕자의 비유 (돌아온 아들)',
        reference: '누가복음 15장',
        description: '회개하고 돌아오는 자녀를 두 팔 벌려 맞이하시는 하늘 아버지의 무한한 용서를 보여줍니다.',
      },
    ],
  },

  // ── 2. 위로와 평안 ──
  {
    id: 'comfort-suffering',
    title: '고난과 역경 속의 위로',
    titleEn: 'Comfort in Suffering & Trials',
    category: 'comfort',
    categoryName: '위로와 평안',
    icon: '🌈',
    color: '#059669',
    summary: '극심한 시련과 고난 속에서도 하나님은 우리를 홀로 두지 않으시며, 마침내 모든 것을 합력하여 선을 이루십니다.',
    keywords: ['고난', '역경', '시련', '위로', '선하심', '소망'],
    verses: [
      {
        reference: '로마서 8:28',
        text: '우리가 알거니와 하나님을 사랑하는 자 곧 그의 뜻대로 부르심을 입은 자들에게는 모든 것이 합력하여 선을 이루느니라',
      },
      {
        reference: '고린도후서 1:3-4',
        text: '찬송하리로다 그는 우리 주 예수 그리스도의 하나님이시요 자비의 아버지시요 모든 위로의 하나님이시며 우리의 모든 환난 중에서 우리를 위로하사 우리로 하여금 하나님께 받는 위로로써 모든 환난 중에 있는 자들을 능히 위로하게 하시는 이시로다',
      },
      {
        reference: '야고보서 1:2-3',
        text: '내 형제들아 너희가 여러 가지 시험을 당하거든 온전히 기쁘게 여기라 이는 너희 믿음의 시련이 인내를 만들어 내는 줄 너희가 앎이라',
      },
      {
        reference: '시편 34:18-19',
        text: '여호와는 마음이 상한 자를 가까이 하시고 충심으로 통회하는 자를 구원하시는도다 의인은 고난이 많으나 여호와께서 그의 모든 고난에서 건지시는도다',
      },
    ],
    passages: [
      {
        title: '욥의 인내와 회복',
        reference: '욥기 1장~2장, 42장',
        description: '영문 모를 고난 속에서도 순전함을 지키고 하나님의 주권을 인정하며 갑절의 복을 받은 욥의 신앙입니다.',
      },
      {
        title: '영광과 비교할 수 없는 현재의 고난',
        reference: '로마서 8:18-30',
        description: '장차 우리에게 나타날 영광과 성령님의 말할 수 없는 탄식의 중보기도를 다룹니다.',
      },
    ],
  },
  {
    id: 'peace-anxiety',
    title: '평안과 두려움 극복',
    titleEn: 'Peace & Overcoming Anxiety',
    category: 'comfort',
    categoryName: '위로와 평안',
    icon: '🕊️',
    color: '#10B981',
    summary: '세상이 줄 수 없는 참된 평안을 주시는 주님께 모든 염려를 기도로 맡길 때 하나님의 평강이 마음과 생각을 지키십니다.',
    keywords: ['평안', '두려움', '불안', '염려', '근심', '안식'],
    verses: [
      {
        reference: '빌립보서 4:6-7',
        text: '아무 것도 염려하지 말고 다만 모든 일에 기도와 간구로, 너희 구할 것을 감사함으로 하나님께 아뢰라 그리하면 모든 지각에 뛰어난 하나님의 평강이 그리스도 예수 안에서 너희 마음과 생각을 지키시리라',
      },
      {
        reference: '요한복음 14:27',
        text: '평안을 너희에게 끼치노니 곧 나의 평안을 너희에게 주노라 내가 너희에게 주는 것은 세상이 주는 것과 같지 아니하니라 너희는 마음에 근심하지도 말고 두려워하지도 말라',
      },
      {
        reference: '이사야 41:10',
        text: '두려워하지 말라 내가 너와 함께 함이라 놀라지 말라 나는 네 하나님이 됨이라 내가 너를 굳세게 하리라 참으로 너를 도와 주리라 참으로 나의 의로운 오른손으로 너를 붙들리라',
      },
      {
        reference: '시편 23:4',
        text: '내가 사망의 음침한 골짜기로 다닐지라도 해를 두려워하지 않을 것은 주께서 나와 함께 하심이라 주의 지팡이와 막대기가 나를 안위하시나이다',
      },
    ],
    passages: [
      {
        title: '목자 되신 여호와',
        reference: '시편 23편',
        description: '부족함이 없는 푸른 풀밭과 쉴 만한 물 가로 인도하시는 선한 목자 되신 하나님을 노래합니다.',
      },
      {
        title: '염려에 대한 예수님의 교훈',
        reference: '마태복음 6:25-34',
        description: '공중의 새와 들의 백합화를 돌보시는 하나님을 기억하며 먼저 그의 나라와 의를 구하라는 말씀입니다.',
      },
    ],
  },
  {
    id: 'loneliness-depression',
    title: '외로움과 지친 마음의 쉼',
    titleEn: 'Rest for the Weary & Lonely',
    category: 'comfort',
    categoryName: '위로와 평안',
    icon: '🛌',
    color: '#0D9488',
    summary: '모두가 나를 떠난 것 같은 고독과 영적 침체 속에서도, 주님은 지친 영혼을 품으시고 새로운 힘을 공급하십니다.',
    keywords: ['외로움', '낙심', '지침', '피곤', '쉼', '회복', '안식'],
    verses: [
      {
        reference: '마태복음 11:28',
        text: '수고하고 무거운 짐 진 자들아 다 내게로 오라 내가 너희를 쉬게 하리라',
      },
      {
        reference: '이사야 40:29-31',
        text: '피곤한 자에게는 능력을 주시며 무능한 자에게는 힘을 더하시나니 소년이라도 피곤하며 곤비하며 장정이라도 넘어지며 쓰러지되 오직 여호와를 앙망하는 자는 새 힘을 얻으리니 독수리가 날개치며 올라감 같을 것이요',
      },
      {
        reference: '여호수아 1:9',
        text: '내가 네게 명령한 것이 아니냐 강하고 담대하라 두려워하지 말며 놀라지 말라 네가 어디로 가든지 네 하나님 여호와가 너와 함께 하느니라 하시니라',
      },
      {
        reference: '시편 42:11',
        text: '내 영혼아 네가 어찌하여 낙심하며 어찌하여 내 속에서 불안해 하는가 너는 하나님께 소망을 두라 나는 그가 나타나 도우심으로 말미암아 내 하나님을 여전히 찬송하리로다',
      },
    ],
    passages: [
      {
        title: '엘리야의 탈진과 하나님의 세미한 음성',
        reference: '열왕기상 19장',
        description: '로뎀나무 아래 쓰러진 엘리야를 떡과 물로 어루만지시고 세미한 음성으로 회복시키시는 하나님입니다.',
      },
      {
        title: '낙심 중 소망을 구하는 기도',
        reference: '시편 42~43편',
        description: '사슴이 시냇물을 찾듯 하나님을 갈망하며 영혼의 낙심을 찬송으로 바꾸는 시입니다.',
      },
    ],
  },

  // ── 3. 기도와 영적 성장 ──
  {
    id: 'prayer-intercession',
    title: '기도와 응답',
    titleEn: 'Prayer & Answers',
    category: 'growth',
    categoryName: '기도와 영적 성장',
    icon: '🙏',
    color: '#8B5CF6',
    summary: '기도는 하나님과의 깊은 인격적 대화이자 하늘의 문을 여는 열쇠입니다. 믿음으로 구할 때 크고 은밀한 일을 보이십니다.',
    keywords: ['기도', '간구', '응답', '중보', '교제'],
    verses: [
      {
        reference: '예레미야 33:3',
        text: '너는 내게 부르짖으라 내가 네게 응답하겠고 네가 알지 못하는 크고 은밀한 일을 네게 보이리라',
      },
      {
        reference: '마가복음 11:24',
        text: '그러므로 내가 너희에게 말하노니 무엇이든지 기도하고 구하는 것은 받은 줄로 믿으라 그리하면 너희에게 그대로 되리라',
      },
      {
        reference: '데살로니가전서 5:17',
        text: '쉬지 말고 기도하라',
      },
      {
        reference: '야고보서 5:16',
        text: '그러므로 너희 죄를 서로 고백하며 병이 낫기를 위하여 서로 기도하라 의인의 간구는 역사하는 힘이 큼이니라',
      },
    ],
    passages: [
      {
        title: '주기도문과 기도의 본',
        reference: '마태복음 6:5-15',
        description: '외식하는 기도를 경계하고 하나님의 나라와 뜻을 구하는 주기도문의 모범을 가르칩니다.',
      },
      {
        title: '겟세마네 동산의 기도',
        reference: '누가복음 22:39-46',
        description: '땀방울이 핏방울이 되도록 아버지의 원대로 되기를 구하신 예수님의 순종의 기도입니다.',
      },
    ],
  },
  {
    id: 'thanksgiving-praise',
    title: '감사와 찬양',
    titleEn: 'Thanksgiving & Praise',
    category: 'growth',
    categoryName: '기도와 영적 성장',
    icon: '🎵',
    color: '#7C3AED',
    summary: '범사에 감사하고 하나님을 찬양할 때 어두움의 권세가 물러가고 삶의 모든 영역에 기쁨과 축복이 넘칩니다.',
    keywords: ['감사', '찬양', '기쁨', '송축', '영광'],
    verses: [
      {
        reference: '데살로니가전서 5:16-18',
        text: '항상 기뻐하라 쉬지 말고 기도하라 범사에 감사하라 이것이 그리스도 예수 안에서 너희를 향하신 하나님의 뜻이니라',
      },
      {
        reference: '시편 100:4',
        text: '감사함으로 그의 문에 들어가며 찬송함으로 그의 궁정에 들어가서 그에게 감사하며 그의 이름을 송축할지어다',
      },
      {
        reference: '골로새서 3:17',
        text: '또 무엇을 하든지 말에나 일에나 다 주 예수의 이름으로 하고 그를 힘입어 하나님 아버지께 감사하라',
      },
      {
        reference: '하박국 3:17-18',
        text: '비록 무화과나무가 무성하지 못하며 포도나무에 열매가 없으며 감람나무에 소출이 없으며 밭에 먹을 것이 없으며 우리에 양이 없으며 외양간에 소가 없을지라도 나는 여호와로 말미암아 즐거워하며 나의 구원의 하나님으로 말미암아 기뻐하리로다',
      },
    ],
    passages: [
      {
        title: '호흡이 있는 자마다 여호와를 찬양',
        reference: '시편 145~150편',
        description: '시편의 결론부로 온 우주 만물이 창조주 하나님을 목소리 높여 찬양하는 대합창입니다.',
      },
      {
        title: '바울과 실라의 옥중 찬양',
        reference: '사도행전 16:25-34',
        description: '깊은 옥에 갇혀 매를 맞고도 밤중에 하나님을 찬미할 때 옥터가 흔들린 기적의 이야기입니다.',
      },
    ],
  },
  {
    id: 'wisdom-guidance',
    title: '지혜와 인도하심',
    titleEn: 'Wisdom & Divine Guidance',
    category: 'growth',
    categoryName: '기도와 영적 성장',
    icon: '💡',
    color: '#6366F1',
    summary: '여호와를 경외하는 것이 지혜의 근본이며, 주님의 말씀은 내 발의 등이요 내 길의 빛이 되어 갈 길을 밝혀 주십니다.',
    keywords: ['지혜', '명철', '말씀', '인도', '분별', '경외'],
    verses: [
      {
        reference: '야고보서 1:5',
        text: '너희 중에 누구든지 지혜가 부족하거든 모든 사람에게 후히 주시고 꾸짖지 아니하시는 하나님께 구하라 그리하면 주시리라',
      },
      {
        reference: '시편 119:105',
        text: '주의 말씀은 내 발에 등이요 내 길에 빛이니이다',
      },
      {
        reference: '잠언 9:10',
        text: '여호와를 경외하는 것이 지혜의 근본이요 거룩하신 자를 아는 것이 명철이니라',
      },
      {
        reference: '잠언 16:9',
        text: '사람이 마음으로 자기의 길을 계획할지라도 그의 걸음을 인도하시는 이는 여호와시니라',
      },
    ],
    passages: [
      {
        title: '솔로몬이 구한 듣는 마음 (지혜)',
        reference: '열왕기상 3장',
        description: '부와 영광 대신 백성을 올바르게 재판할 지혜를 구하여 하나님의 마음에 합했던 솔로몬의 이야기입니다.',
      },
      {
        title: '지혜의 보고, 잠언',
        reference: '잠언 3장~4장',
        description: '금과 은보다 귀한 지혜를 얻고 마음을 지키는 것이 생명의 근원임을 가르칩니다.',
      },
    ],
  },

  // ── 4. 사랑과 삶의 실천 ──
  {
    id: 'love-neighbor',
    title: '사랑과 나눔의 실천',
    titleEn: 'Love in Action & Charity',
    category: 'life',
    categoryName: '사랑과 삶의 실천',
    icon: '💖',
    color: '#EC4899',
    summary: '말과 혀로만 사랑하지 않고 행함과 진실함으로 이웃을 내 몸과 같이 사랑하며 섬기는 삶입니다.',
    keywords: ['사랑', '나눔', '섬김', '구제', '이웃사랑', '헌신'],
    verses: [
      {
        reference: '고린도전서 13:4-7',
        text: '사랑은 오래 참고 사랑은 온유하며 시기하지 아니하며 사랑은 자랑하지 아니하며 교만하지 아니하며 무례히 행하지 아니하며 자기의 유익을 구하지 아니하며 성내지 아니하며 악한 것을 생각하지 아니하며 불의를 기뻐하지 아니하며 진리와 함께 기뻐하고 모든 것을 참으며 모든 것을 믿으며 모든 것을 바라며 모든 것을 견디느니라',
      },
      {
        reference: '요한복음 13:34-35',
        text: '새 계명을 너희에게 주노니 서로 사랑하라 내가 너희를 사랑한 것 같이 너희도 서로 사랑하라 너희가 서로 사랑하면 이로써 모든 사람이 너희가 내 제자인 줄 알리라',
      },
      {
        reference: '요한일서 3:18',
        text: '자녀들아 우리가 말과 혀로만 사랑하지 말고 행함과 진실함으로 하자',
      },
      {
        reference: '누가복음 6:38',
        text: '주라 그리하면 너희에게 줄 것이니 곧 후히 되어 누르고 흔들어 넘치도록 하여 너희에게 안겨 주리라',
      },
    ],
    passages: [
      {
        title: '사랑장',
        reference: '고린도전서 13장',
        description: '천사의 말을 하고 산을 옮길 믿음이 있어도 사랑이 없으면 아무것도 아님을 천명하는 최고의 사랑 찬가입니다.',
      },
      {
        title: '선한 사마리아인의 비유',
        reference: '누가복음 10:25-37',
        description: '강도 만난 자의 진정한 이웃이 되어 자비를 베푼 사마리아인을 통해 참된 이웃 사랑을 가르칩니다.',
      },
    ],
  },
  {
    id: 'forgiveness-reconciliation',
    title: '용서와 화해',
    titleEn: 'Forgiveness & Reconciliation',
    category: 'life',
    categoryName: '사랑과 삶의 실천',
    icon: '🤝',
    color: '#F59E0B',
    summary: '주께서 우리를 용서하신 것 같이 우리도 형제를 용서하고 원수까지 품을 때 마음의 상처가 치유되고 화평이 임합니다.',
    keywords: ['용서', '화해', '화평', '치유', '관용', '인내'],
    verses: [
      {
        reference: '골로새서 3:13',
        text: '누가 누구에게 불만이 있거든 서로 용납하여 피차 용서하되 주께서 너희를 용서하신 것 같이 너희도 그리하고',
      },
      {
        reference: '에베소서 4:31-32',
        text: '너희는 모든 악독과 노함과 분냄과 떠드는 것과 비방하는 것을 모든 악의와 함께 버리고 서로 친절하게 하며 불쌍히 여기며 서로 용서하기를 하나님이 그리스도 안에서 너희를 용서하심과 같이 하라',
      },
      {
        reference: '마태복음 18:21-22',
        text: '그 때에 베드로가 나아와 이르되 주여 형제가 내게 죄를 범하면 몇 번이나 용서하여 주리이까 일곱 번까지 하오리이까 예수께서 이르시되 네게 이르노니 일곱 번뿐 아니라 일곱 번을 일흔 번까지라도 할지니라',
      },
      {
        reference: '로마서 12:18',
        text: '할 수 있거든 너희로서는 모든 사람과 더불어 화목하라',
      },
    ],
    passages: [
      {
        title: '요셉의 형제 용서와 화해',
        reference: '창세기 45장, 50장',
        description: '자신을 노예로 팔아넘긴 형들을 용서하며 "하나님이 그것을 선으로 바꾸셨다"고 고백하는 감동의 화해입니다.',
      },
      {
        title: '일만 달란트 빚진 자의 비유',
        reference: '마태복음 18:23-35',
        description: '헤아릴 수 없는 큰 빚을 탕감받은 우리가 작은 빚을 진 이웃을 용서해야 할 당위성을 가르칩니다.',
      },
    ],
  },
  {
    id: 'family-home',
    title: '가정과 믿음의 유산',
    titleEn: 'Family, Marriage & Legacy',
    category: 'life',
    categoryName: '사랑과 삶의 실천',
    icon: '🏡',
    color: '#EA580C',
    summary: '하나님을 경외하는 거룩한 가정 안에서 부부가 서로 존중하고 자녀를 주의 교훈과 훈계로 양육하는 축복입니다.',
    keywords: ['가정', '부부', '자녀', '부모', '결혼', '양육', '축복'],
    verses: [
      {
        reference: '여호수아 24:15',
        text: '오직 나와 내 집은 여호와를 섬기겠노라 하니',
      },
      {
        reference: '에베소서 5:25',
        text: '남편들아 아내 사랑하기를 그리스도께서 교회를 사랑하시고 그 교회를 위하여 자신을 주심 같이 하라',
      },
      {
        reference: '에베소서 6:1-4',
        text: '자녀들아 주 안에서 너희 부모에게 순종하라 이것이 옳으니라... 아비들아 너희 자녀를 노엽게 하지 말고 오직 주의 교훈과 훈계로 양육하라',
      },
      {
        reference: '잠언 22:6',
        text: '마땅히 행할 길을 아이에게 가르치라 그리하면 늙어도 그것을 떠나지 아니하리라',
      },
    ],
    passages: [
      {
        title: '그리스도인의 가정 규례',
        reference: '에베소서 5:22~6:4',
        description: '그리스도와 교회의 비밀을 반영하는 부부 관계와 부모-자녀 간의 성경적 원리를 제시합니다.',
      },
      {
        title: '여호와를 경외하는 가정의 복',
        reference: '시편 128편',
        description: '여호와를 경외하며 그의 길을 걷는 자의 결실 있는 아내와 어린 감람나무 같은 자녀들의 축복입니다.',
      },
    ],
  },
  {
    id: 'stewardship-work',
    title: '물질과 청지기의 삶',
    titleEn: 'Stewardship, Work & Finances',
    category: 'life',
    categoryName: '사랑과 삶의 실천',
    icon: '💰',
    color: '#D97706',
    summary: '우리의 모든 소유와 재능은 하나님의 선물임을 인정하고, 정직한 땀과 자족하는 마음으로 주님을 기쁘시게 섬깁니다.',
    keywords: ['재물', '청지기', '일터', '직업', '헌금', '자족', '감사'],
    verses: [
      {
        reference: '마태복음 6:19-21',
        text: '너희를 위하여 보물을 땅에 쌓아 두지 말라... 오직 너희를 위하여 보물을 하늘에 쌓아 두라... 네 보물 있는 그 곳에는 네 마음도 있느니라',
      },
      {
        reference: '디모데전서 6:6-8',
        text: '그러나 자족하는 마음이 있으면 경건은 큰 이익이 되느니라 우리가 세상에 아무 것도 가지고 온 것이 없으매 또한 아무 것도 가지고 가지 못하리니 우리가 먹을 것과 입을 것이 있은즉 족한 줄로 알 것이니라',
      },
      {
        reference: '골로새서 3:23-24',
        text: '무슨 일을 하든지 마음을 다하여 주께 하듯 하고 사람에게 하듯 하지 말라 이는 기업의 상을 주께 받을 줄 아나니 너희는 주 그리스도를 섬기느니라',
      },
      {
        reference: '고린도후서 9:7',
        text: '각각 그 마음에 정한 대로 할 것이요 인색함으로나 억지로 하지 말지니 하나님은 즐겨 내는 자를 사랑하시느니라',
      },
    ],
    passages: [
      {
        title: '달란트 비유 (충성된 청지기)',
        reference: '마태복음 25:14-30',
        description: '각자의 재능에 따라 맡겨주신 은사를 착하고 충성되게 남기는 청지기의 사명을 가르칩니다.',
      },
      {
        title: '재물과 참된 부요함',
        reference: '디모데전서 6장',
        description: '돈을 사랑함이 일만 악의 뿌리임을 경계하고 선한 일에 부요한 자가 되라는 권면입니다.',
      },
    ],
  },
];
