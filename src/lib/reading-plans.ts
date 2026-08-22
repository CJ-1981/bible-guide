import { bibleCategories, type BibleBook } from './bible-data';

export interface ReadingGroup {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  color: string;
  bookNamesEn: string[]; // List of book nameEns in order
}

export interface ReadingPlanMethod {
  id: 'canonical' | 'chronological' | 'parallel' | 'beginner' | 'mcheyne';
  name: string;
  subtitle: string;
  icon: string;
  badge: string;
  description: string;
  recommendedFor: string;
  paceGuide: string;
  groups: ReadingGroup[];
}

// Map of all books by nameEn for easy fast lookup
const allBooksMap: Record<string, BibleBook> = {};
bibleCategories.forEach((cat) => {
  cat.books.forEach((b) => {
    allBooksMap[b.nameEn] = b;
  });
});

export function getBookByEn(nameEn: string): BibleBook | undefined {
  return allBooksMap[nameEn];
}

export const readingPlanMethods: ReadingPlanMethod[] = [
  // 1. 전통 정경 순서
  {
    id: 'canonical',
    name: '정경 순서 통독',
    subtitle: 'Canonical Order (창세기 ~ 요한계시록)',
    icon: '📖',
    badge: '표준 순서',
    description: '창세기부터 요한계시록까지 성경 66권의 표준 정경 분류(모세오경, 역사서, 시가서, 선지서, 복음서, 서신서 등) 순서대로 통독하는 가장 보편적인 방법입니다.',
    recommendedFor: '처음 성경 전체를 정석대로 통독하고자 하는 분',
    paceGuide: '하루 3.2장 (약 15분) 읽기 시 1년 완독 (총 1,189장)',
    groups: bibleCategories.map((c) => ({
      id: c.id,
      name: c.name,
      nameEn: c.nameEn,
      description: c.description,
      color: c.color,
      bookNamesEn: c.books.map((b) => b.nameEn),
    })),
  },

  // 2. 연대기 순서 통독
  {
    id: 'chronological',
    name: '연대기 순서 통독',
    subtitle: 'Chronological Order (역사적 연대 흐름)',
    icon: '⏳',
    badge: '구속사 중심',
    description: '성경의 사건들이 일어난 실제 역사적 시간순으로 책을 배치하여, 구약과 신약의 역사적 맥락과 하나님의 구원 역사의 거대한 흐름을 한눈에 파악하며 읽는 통독법입니다.',
    recommendedFor: '이스라엘 역사와 구속사의 흐름을 입체적으로 이해하고 싶은 분',
    paceGuide: '시대별 11개 역사 테마로 나누어 체계적인 통독 진행',
    groups: [
      {
        id: 'chrono-patriarch',
        name: '1. 창조 및 족장 시대',
        nameEn: 'Creation & Patriarchal Era',
        description: '세상의 시작, 아브라함·이삭·야곱·요셉의 언약의 시작과 족장 시대의 욥 이야기',
        color: '#D4A574',
        bookNamesEn: ['Genesis', 'Job'],
      },
      {
        id: 'chrono-exodus',
        name: '2. 출애굽과 광야 여정',
        nameEn: 'Exodus & Wilderness Era',
        description: '애굽 탈출, 십계명과 성막, 40년 광야 훈련과 율법의 재선포',
        color: '#C28B5E',
        bookNamesEn: ['Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'],
      },
      {
        id: 'chrono-conquest',
        name: '3. 가나안 정복과 사사 시대',
        nameEn: 'Conquest & Judges Era',
        description: '약속의 땅 정복, 사사들의 통치와 어두운 암흑기 속 룻의 은혜 이야기',
        color: '#8B6914',
        bookNamesEn: ['Joshua', 'Judges', 'Ruth'],
      },
      {
        id: 'chrono-united-kingdom',
        name: '4. 통일 왕국과 지혜의 시대',
        nameEn: 'United Kingdom Era',
        description: '사울·다윗·솔로몬 왕국, 성전 건축, 다윗의 시편과 솔로몬의 지혜서',
        color: '#B8860B',
        bookNamesEn: ['1 Samuel', '2 Samuel', 'Psalms', '1 Chronicles', '1 Kings', 'Proverbs', 'Ecclesiastes', 'Song of Solomon'],
      },
      {
        id: 'chrono-divided-kingdom',
        name: '5. 분열 왕국과 선지자들의 경고',
        nameEn: 'Divided Kingdom & Prophets',
        description: '남북 분열과 우상숭배의 멸망 경고, 엘리야·엘리사와 메시아를 예언한 선지자들',
        color: '#8B0000',
        bookNamesEn: [
          '2 Kings', '2 Chronicles', 'Obadiah', 'Joel', 'Jonah', 'Amos', 'Hosea',
          'Isaiah', 'Micah', 'Nahum', 'Zephaniah', 'Habakkuk', 'Jeremiah', 'Lamentations'
        ],
      },
      {
        id: 'chrono-exile',
        name: '6. 바벨론 포로기',
        nameEn: 'Babylonian Exile Era',
        description: '예루살렘 함락 후 바벨론 포로지에서 선포된 하나님의 주권과 환상',
        color: '#701A75',
        bookNamesEn: ['Ezekiel', 'Daniel'],
      },
      {
        id: 'chrono-return',
        name: '7. 포로 귀환과 성전·성벽 재건',
        nameEn: 'Post-Exile & Return Era',
        description: '3차에 걸친 귀환, 성전과 성벽 재건, 에스더의 구원과 말라기의 마지막 예언',
        color: '#4C1D95',
        bookNamesEn: ['Ezra', 'Nehemiah', 'Esther', 'Haggai', 'Zechariah', 'Malachi'],
      },
      {
        id: 'chrono-gospels',
        name: '8. 예수 그리스도의 탄생과 생애',
        nameEn: 'Life of Jesus Christ (Gospels)',
        description: '약속된 메시아 예수님의 탄생, 공생애 사역, 십자가의 대속과 부활',
        color: '#0284C7',
        bookNamesEn: ['Matthew', 'Mark', 'Luke', 'John'],
      },
      {
        id: 'chrono-early-church',
        name: '9. 초대교회 부흥과 바울의 전도여행',
        nameEn: 'Early Church & Missionary Epistles',
        description: '성령 강림과 교회의 탄생, 이방인을 향한 바울의 1~3차 전도여행과 초기 서신서들',
        color: '#059669',
        bookNamesEn: ['Acts', 'James', 'Galatians', '1 Thessalonians', '2 Thessalonians', '1 Corinthians', '2 Corinthians', 'Romans'],
      },
      {
        id: 'chrono-prison-pastoral',
        name: '10. 옥중 서신과 후기 서신서',
        nameEn: 'Prison, Pastoral & General Epistles',
        description: '로마 옥중에서 보낸 서신들, 교회 지도자들을 위한 목회 서신과 박해 받는 성도들을 향한 편지들',
        color: '#0D9488',
        bookNamesEn: [
          'Ephesians', 'Philippians', 'Colossians', 'Philemon', '1 Timothy', 'Titus', '2 Timothy',
          'Hebrews', '1 Peter', '2 Peter', 'Jude', '1 John', '2 John', '3 John'
        ],
      },
      {
        id: 'chrono-revelation',
        name: '11. 종말과 새 하늘 새 땅의 완성',
        nameEn: 'Consummation & Eternal Glory',
        description: '그리스도의 영광스러운 재림, 악의 최종 심판과 새 예루살렘의 완성',
        color: '#9333EA',
        bookNamesEn: ['Revelation'],
      },
    ],
  },

  // 3. 신구약 균형 병행 통독
  {
    id: 'parallel',
    name: '신구약 균형 병행 통독',
    subtitle: 'Old & New Testament Parallel (1년 균형 통독)',
    icon: '⚖️',
    badge: '1년 1독 추천',
    description: '구약(39권 929장)과 신약(27권 260장)을 분리하지 않고 매일 구약 2~3장과 신약 1장씩을 함께 읽어, 신구약의 약속과 성취를 동시에 경험하는 균형 잡힌 통독법입니다.',
    recommendedFor: '지루하지 않게 신구약을 골고루 묵상하며 1년 1독을 완주하고 싶은 분',
    paceGuide: '매일 구약 2.5장 + 신약 0.7장 (합계 하루 3.2장)',
    groups: [
      {
        id: 'parallel-ot',
        name: '📜 구약 성경 트랙 (39권 / 929장)',
        nameEn: 'Old Testament Track',
        description: '창조부터 말라기까지 — 이스라엘의 역사와 율법, 시가서, 선지서',
        color: '#D97706',
        bookNamesEn: bibleCategories.filter((c) => c.testament === 'old').flatMap((c) => c.books.map((b) => b.nameEn)),
      },
      {
        id: 'parallel-nt',
        name: '✝️ 신약 성경 트랙 (27권 / 260장)',
        nameEn: 'New Testament Track',
        description: '마태복음부터 요한계시록까지 — 복음서와 사도행전, 서신서, 계시록',
        color: '#0284C7',
        bookNamesEn: bibleCategories.filter((c) => c.testament === 'new').flatMap((c) => c.books.map((b) => b.nameEn)),
      },
    ],
  },

  // 4. 초신자 / 입문자 추천 5단계 통독
  {
    id: 'beginner',
    name: '초신자 맞춤 5단계 통독',
    subtitle: 'Beginner-Friendly 5-Stage Plan',
    icon: '🌱',
    badge: '입문자 강추',
    description: '어려운 족보나 제사법이 많은 구약 처음부터 읽다가 포기하지 않도록, 가장 읽기 쉽고 복음의 핵심인 마가복음·요한복음부터 시작해 점진적으로 성경 66권 전체로 확장하는 최적의 코스입니다.',
    recommendedFor: '처음 성경 통독에 도전하거나, 성경을 쉽게 완독하고 싶은 분',
    paceGuide: '단계별 필수 코스를 차례대로 정복하는 맞춤형 성취 플랜',
    groups: [
      {
        id: 'beg-step1',
        name: '1단계: 예수님의 생애와 복음 (필수 입문)',
        nameEn: 'Stage 1: Life of Jesus',
        description: '가장 간결하고 생동감 넘치는 마가복음과 하나님의 사랑이 가득한 요한복음·누가복음',
        color: '#059669',
        bookNamesEn: ['Mark', 'John', 'Luke', 'Matthew'],
      },
      {
        id: 'beg-step2',
        name: '2단계: 초대교회 이야기와 구원의 기초',
        nameEn: 'Stage 2: Early Church & Basics',
        description: '성령의 역사로 교회가 세워지는 사도행전과 구원의 핵심 교리(로마서, 에베소서, 빌립보서)',
        color: '#0284C7',
        bookNamesEn: ['Acts', 'Romans', 'Ephesians', 'Philippians', 'Colossians', 'James'],
      },
      {
        id: 'beg-step3',
        name: '3단계: 인류의 시작과 구약의 흥미진진한 역사',
        nameEn: 'Stage 3: Origins & Stories',
        description: '천지창조와 흥미진진한 믿음의 조상들(창세기), 출애굽 기적과 룻기, 에스더의 감동 드라마',
        color: '#D4A574',
        bookNamesEn: ['Genesis', 'Exodus', 'Joshua', 'Ruth', 'Esther', 'Jonah'],
      },
      {
        id: 'beg-step4',
        name: '4단계: 마음을 만지는 시와 지혜의 말씀',
        nameEn: 'Stage 4: Wisdom & Praise',
        description: '인생의 모든 감정을 치유하는 시편과 일상생활의 지혜를 가르치는 잠언',
        color: '#8B5CF6',
        bookNamesEn: ['Psalms', 'Proverbs', 'Ecclesiastes'],
      },
      {
        id: 'beg-step5',
        name: '5단계: 성경 66권 전체 완독으로의 도약',
        nameEn: 'Stage 5: Deepening & Completion',
        description: '나머지 구약 역사서, 선지서, 서신서 및 요한계시록까지 성경 전체 완독 완성',
        color: '#EC4899',
        bookNamesEn: [
          'Leviticus', 'Numbers', 'Deuteronomy', 'Judges', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings',
          '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Job', 'Song of Solomon',
          'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
          'Obadiah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
          '1 Corinthians', '2 Corinthians', 'Galatians', '1 Thessalonians', '2 Thessalonians',
          '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', '1 Peter', '2 Peter',
          '1 John', '2 John', '3 John', 'Jude', 'Revelation'
        ],
      },
    ],
  },

  // 5. 맥체인 성경 통독 방식
  {
    id: 'mcheyne',
    name: '맥체인 4트랙 통독법',
    subtitle: "M'Cheyne 4-Track Plan",
    icon: '🧭',
    badge: '영적 깊이',
    description: '19세기 스코틀랜드 로버트 맥체인 목사가 고안한 세계적인 통독법으로, 매일 4개 트랙(가정 2트랙, 개인 2트랙)을 동시에 읽어 1년에 구약 1독 + 신약/시편 2독을 달성합니다.',
    recommendedFor: '매일 구약과 신약, 시가서를 조화롭게 읽으며 깊이 있는 영적 성장을 원하는 분',
    paceGuide: '매일 4개 영역에서 각 1장씩 (하루 총 4장)',
    groups: [
      {
        id: 'mc-track1',
        name: '트랙 1: 구약 역사 트랙 (가정 예배용)',
        nameEn: 'Track 1: Old Testament History',
        description: '창세기부터 역대하까지 — 하나님의 창조와 이스라엘 민족의 흥망성쇠',
        color: '#D97706',
        bookNamesEn: ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles'],
      },
      {
        id: 'mc-track2',
        name: '트랙 2: 신약 복음 & 역사 트랙 (가정 예배용)',
        nameEn: 'Track 2: Gospels & Acts',
        description: '마태복음부터 사도행전까지 — 예수님의 사역과 초대교회 성령의 역사',
        color: '#0284C7',
        bookNamesEn: ['Matthew', 'Mark', 'Luke', 'John', 'Acts'],
      },
      {
        id: 'mc-track3',
        name: '트랙 3: 구약 시가 & 선지서 트랙 (개인 묵상용)',
        nameEn: 'Track 3: Poetry & Prophets',
        description: '에스라부터 말라기까지 — 시편, 지혜서 및 모든 대소선지자들의 예언',
        color: '#059669',
        bookNamesEn: [
          'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
          'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah',
          'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi'
        ],
      },
      {
        id: 'mc-track4',
        name: '트랙 4: 신약 서신서 & 계시록 트랙 (개인 묵상용)',
        nameEn: 'Track 4: Epistles & Revelation',
        description: '로마서부터 요한계시록까지 — 사도들의 편지와 교회 교리, 종말의 승리',
        color: '#9333EA',
        bookNamesEn: [
          'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians',
          '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews',
          'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'
        ],
      },
    ],
  },
];
