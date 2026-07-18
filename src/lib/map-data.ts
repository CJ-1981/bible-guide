export interface BibleLocation {
  id: string;
  name: string;
  nameEn: string;
  testament: 'old' | 'new' | 'both';
  x: number;  // SVG 좌표 (0~1000)
  y: number;  // SVG 좌표 (0~700)
  description: string;
  events: { title: string; book: string; era: string }[];
  color: string;
}

export const bibleLocations: BibleLocation[] = [
  // ─── 구약 주요 장소 ───
  {
    id: 'eden', name: '에덴동산', nameEn: 'Garden of Eden', testament: 'old',
    x: 540, y: 120,
    description: '하나님이 아담과 하와를 창조하시어 살게 하신 완벽한 동산. 선악과를 먹고 타락한 후 쫓겨났습니다.',
    events: [
      { title: '천지창조와 인간 창조', book: '창세기 1-2', era: '태초' },
      { title: '인간의 타락', book: '창세기 3', era: '태초' },
    ],
    color: '#4CAF50',
  },
  {
    id: 'ur', name: '우르', nameEn: 'Ur', testament: 'old',
    x: 570, y: 290,
    description: '갈대아 우르는 아브라함이 하나님의 부르심을 받기 전 살던 곳입니다. 메소포타미아 남부의 번성한 도시였습니다.',
    events: [
      { title: '아브라함의 부르심', book: '창세기 12', era: 'B.C. 2000' },
    ],
    color: '#D4A574',
  },
  {
    id: 'harran', name: '하란', nameEn: 'Harran', testament: 'old',
    x: 450, y: 200,
    description: '아브라함이 우르를 떠나 가나안으로 가는 도중 머물렀던 곳입니다. 아브라함의 아버지 데라가 이곳에서 죽었습니다.',
    events: [
      { title: '데라의 죽음과 아브라함의 이동', book: '창세기 11', era: 'B.C. 2000' },
    ],
    color: '#D4A574',
  },
  {
    id: 'egypt', name: '애굽 (이집트)', nameEn: 'Egypt', testament: 'both',
    x: 340, y: 340,
    description: '요셉 시대부터 출애굽까지 이스라엘의 오랜 거주지이자 노예 생활의 장소입니다. 예수님의 유아기에도 피난처가 되었습니다.',
    events: [
      { title: '요셉의 애굽 도래', book: '창세기 39', era: 'B.C. 1800' },
      { title: '이스라엘의 애굽 노예 생활', book: '출애굽기 1', era: 'B.C. 1500' },
      { title: '열 재앙과 출애굽', book: '출애굽기 7-12', era: 'B.C. 1446' },
      { title: '예수님의 애굽 피난', book: '마태복음 2', era: 'A.D. 1' },
    ],
    color: '#FF9800',
  },
  {
    id: 'redsea', name: '홍해', nameEn: 'Red Sea', testament: 'old',
    x: 460, y: 370,
    description: '모세가 지팡이를 들자 바다가 갈라져 이스라엘이 마른 땅으로 건넌 기적의 장소입니다. 애굽 군대는 바다가 다시 합쳐지며 멸망했습니다.',
    events: [
      { title: '홍해 기적', book: '출애굽기 14', era: 'B.C. 1446' },
    ],
    color: '#2196F3',
  },
  {
    id: 'sinai', name: '시내산', nameEn: 'Mount Sinai', testament: 'old',
    x: 490, y: 390,
    description: '하나님이 모세에게 십계명을 주신 거룩한 산입니다. 번개와 불 가운데서 하나님의 영광이 나타났고, 이스라엘과 언약을 맺으셨습니다.',
    events: [
      { title: '십계명 수여', book: '출애굽기 20', era: 'B.C. 1446' },
      { title: '황소 우상 사건', book: '출애굽기 32', era: 'B.C. 1446' },
    ],
    color: '#9C27B0',
  },
  {
    id: 'jericho', name: '여리고', nameEn: 'Jericho', testament: 'both',
    x: 440, y: 310,
    description: '가나안 정복의 첫 번째 도시입니다. 이스라엘이 7일간 돌고 나팔을 불자 성벽이 무너졌습니다. 예수님의 비유에도 등장합니다.',
    events: [
      { title: '여리고 성 함락', book: '여호수아 6', era: 'B.C. 1400' },
      { title: '사가랴의 회복', book: '누가복음 19', era: 'A.D. 30' },
    ],
    color: '#8B6914',
  },
  {
    id: 'jerusalem', name: '예루살렘', nameEn: 'Jerusalem', testament: 'both',
    x: 430, y: 290,
    description: '성경에서 가장 중요한 도시입니다. 다윗이 정복하고 솔로몬이 성전을 건축했습니다. 예수님의 십자가 죽음과 부활이 일어난 곳이며, 종말에 새 예루살렘이 내려올 곳입니다.',
    events: [
      { title: '다윗의 예루살렘 정복', book: '사무엘하 5', era: 'B.C. 1000' },
      { title: '솔로몬 성전 건축', book: '열왕기상 6', era: 'B.C. 960' },
      { title: '예수님의 십자가 죽음과 부활', book: '복음서', era: 'A.D. 30' },
      { title: '성령 강림', book: '사도행전 2', era: 'A.D. 30' },
    ],
    color: '#FFD700',
  },
  {
    id: 'bethlehem', name: '베들레헴', nameEn: 'Bethlehem', testament: 'both',
    x: 425, y: 300,
    description: '다윗의 고향이자 예수님이 탄생하신 곳입니다. "떡집"이라는 뜻으로, 생명의 떡이신 예수님이 태어나기에 적합한 곳이었습니다. 미가서에 메시아의 탄생지로 예언되었습니다.',
    events: [
      { title: '다윗의 탄생', book: '사무엘상 16', era: 'B.C. 1040' },
      { title: '룻과 보아스의 이야기', book: '룻기', era: 'B.C. 1100' },
      { title: '예수님의 탄생', book: '마태복음 2', era: 'A.D. 0' },
    ],
    color: '#E91E63',
  },
  {
    id: 'babylon', name: '바벨론', nameEn: 'Babylon', testament: 'old',
    x: 530, y: 250,
    description: '유다 왕국을 멸망시키고 70년간 유대인을 포로로 잡아간 제국입니다. 바벨탑이 세워진 곳이기도 하며, 요한계시록에서는 세상적 악의 상징으로 나타납니다.',
    events: [
      { title: '바벨탑 사건', book: '창세기 11', era: 'B.C. 2200' },
      { title: '유다의 바벨론 포로', book: '열왕기하 25', era: 'B.C. 586' },
      { title: '다니엘의 사자굴', book: '다니엘 6', era: 'B.C. 540' },
    ],
    color: '#795548',
  },
  {
    id: 'nineveh', name: '니느웨', nameEn: 'Nineveh', testament: 'old',
    x: 520, y: 190,
    description: '앗수르 제국의 수도로 요나가 회개를 선포한 도시입니다. 요나의 설교 후 전 도시가 회개하였으나, 나훔 시대에 다시 포악해져 멸망했습니다.',
    events: [
      { title: '요나의 니느웨 설교', book: '요나 3', era: 'B.C. 760' },
      { title: '니느웨의 멸망', book: '나훔', era: 'B.C. 612' },
    ],
    color: '#607D8B',
  },
  {
    id: 'damascus', name: '다메섹', nameEn: 'Damascus', testament: 'both',
    x: 460, y: 265,
    description: '세계에서 가장 오래된 도시 중 하나입니다. 바울이 예수님을 만나 변화받은 곳이며, 아람의 수도로 구약에도 자주 등장합니다.',
    events: [
      { title: '바울의 회심', book: '사도행전 9', era: 'A.D. 35' },
      { title: '아람과 이스라엘의 전쟁', book: '열왕기상 20', era: 'B.C. 850' },
    ],
    color: '#795548',
  },

  // ─── 신약 주요 장소 ───
  {
    id: 'nazareth', name: '나사렛', nameEn: 'Nazareth', testament: 'new',
    x: 420, y: 280,
    description: '예수님이 자라신 동네입니다. "나사렛에서 무슨 선한 것이 날 수 있느냐"는 편견의 대상이었으나, 예수님은 "나사렛 예수"라 불리셨습니다.',
    events: [
      { title: '수태 고지', book: '누가복음 1', era: 'A.D. 0' },
      { title: '예수님의 어린 시절', book: '누가복음 2', era: 'A.D. 1~30' },
    ],
    color: '#4169E1',
  },
  {
    id: 'galilee', name: '갈릴리', nameEn: 'Galilee', testament: 'new',
    x: 415, y: 260,
    description: '예수님의 공생애 사역의 중심지입니다. 갈릴리 바다에서 제자들을 부르시고, 산상수훈을 가르치시며, 많은 기적을 행하셨습니다.',
    events: [
      { title: '제자 부르심', book: '마태복음 4', era: 'A.D. 27' },
      { title: '산상수훈', book: '마태복음 5-7', era: 'A.D. 28' },
      { title: '물 위를 걸으심', book: '마태복음 14', era: 'A.D. 29' },
    ],
    color: '#00BCD4',
  },
  {
    id: 'antioch', name: '안디옥', nameEn: 'Antioch', testament: 'new',
    x: 400, y: 235,
    description: '제자들이 처음으로 "그리스도인"이라 불린 곳입니다. 바울의 선교 여행의 출발점이 되었으며, 초대 교회의 중요한 거점이었습니다.',
    events: [
      { title: '최초로 그리스도인이라 불림', book: '사도행전 11', era: 'A.D. 42' },
      { title: '바울의 1차 선교 출발', book: '사도행전 13', era: 'A.D. 47' },
    ],
    color: '#2E8B57',
  },
  {
    id: 'athens', name: '아테네', nameEn: 'Athens', testament: 'new',
    x: 290, y: 255,
    description: '고대 그리스의 철학과 지혜의 중심지입니다. 바울이 아레오바고에서 "알지 못하는 신"에게 복음을 전한 곳입니다.',
    events: [
      { title: '아레오바고 설교', book: '사도행전 17', era: 'A.D. 51' },
    ],
    color: '#3F51B5',
  },
  {
    id: 'rome', name: '로마', nameEn: 'Rome', testament: 'new',
    x: 230, y: 210,
    description: '당시 세계 제국의 수도입니다. 바울이 로마에서 복음을 전하며 순교했고, 베드로도 이곳에서 순교했습니다. 로마서의 수신자이기도 합니다.',
    events: [
      { title: '바울의 로마 도착', book: '사도행전 28', era: 'A.D. 60' },
      { title: '바울과 베드로의 순교', book: '전승', era: 'A.D. 64~67' },
    ],
    color: '#8B0000',
  },
  {
    id: 'corinth', name: '고린도', nameEn: 'Corinth', testament: 'new',
    x: 280, y: 270,
    description: '바울이 1년 반 동안 머물며 교회를 세운 도시입니다. 고린도전후서의 수신자이며, 번성하고 타락한 항구 도시에서 복음이 전해졌습니다.',
    events: [
      { title: '고린도 교회 설립', book: '사도행전 18', era: 'A.D. 51' },
    ],
    color: '#795548',
  },
  {
    id: 'patmos', name: '밧모 섬', nameEn: 'Patmos', testament: 'new',
    x: 360, y: 295,
    description: '요한이 로마 당국에 의해 유배된 작은 섬입니다. 이곳에서 요한이 부활하신 예수님을 만나 종말의 계시를 받아 요한계시록을 기록했습니다.',
    events: [
      { title: '요한계시록 기록', book: '요한계시록 1', era: 'A.D. 95' },
    ],
    color: '#FF6347',
  },
];

// 지도상 연결 경로 (주요 여정)
export interface BibleRoute {
  id: string;
  name: string;
  locations: string[];
  color: string;
  description: string;
}

export const bibleRoutes: BibleRoute[] = [
  {
    id: 'exodus',
    name: '출애굽 여정',
    locations: ['egypt', 'redsea', 'sinai', 'jericho'],
    color: '#E74C3C',
    description: '모세가 이스라엘을 이끌고 애굽에서 가나안까지의 여정',
  },
  {
    id: 'abraham',
    name: '아브라함의 여정',
    locations: ['ur', 'harran', 'bethlehem', 'jerusalem'],
    color: '#FF9800',
    description: '아브라함이 우르에서 가나안까지의 믿음 여정',
  },
  {
    id: 'paul-mission',
    name: '바울 선교 여행',
    locations: ['damascus', 'antioch', 'athens', 'corinth', 'rome'],
    color: '#4CAF50',
    description: '바울의 3차 선교 여행과 로마행',
  },
  {
    id: 'jesus-ministry',
    name: '예수님의 사역',
    locations: ['bethlehem', 'nazareth', 'galilee', 'jerusalem'],
    color: '#FFD700',
    description: '예수님의 탄생부터 십자가까지의 사역 여정',
  },
];
