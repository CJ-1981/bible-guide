export interface BibleCharacter {
  id: string;
  name: string;
  nameEn: string;
  testament: 'old' | 'new';
  era: string;
  description: string;
  books: string[];
  color: string;
}

export interface CharacterRelation {
  from: string;
  to: string;
  type: '부모-자식' | '배우자' | '형제' | '조상-후손' | '선지자-왕' | '스승-제자' | '동역자' | '적대자' | '선택-부름' | '양육-보호';
  label: string;
}

export const bibleCharacters: BibleCharacter[] = [
  // ─── 구약 인물 ───
  { id: 'adam', name: '아담', nameEn: 'Adam', testament: 'old', era: '태초', description: '하나님이 흙으로 빚으신 최초의 인간. 에덴동산에서 하와와 함께 살다가 선악과를 먹고 타락하여 에덴에서 쫓겨났습니다. 인류의 아버지입니다.', books: ['창세기'], color: '#8B6914' },
  { id: 'eve', name: '하와', nameEn: 'Eve', testament: 'old', era: '태초', description: '아담의 갈빗대로 만들어진 최초의 여성. 생명의 어머니라는 뜻입니다. 뱀의 유혹으로 선악과를 먹고 아담에게도 주어 인류의 타락을 초래했습니다.', books: ['창세기'], color: '#8B6914' },
  { id: 'noah', name: '노아', nameEn: 'Noah', testament: 'old', era: 'B.C. 2400', description: '당대의 의인으로 방주를 건조하여 대홍수에서 가족과 동물들을 구원받았습니다. 홍수 후 하나님과 무지개 언약을 맺었으며, 새 인류의 조상이 되었습니다.', books: ['창세기'], color: '#4169E1' },
  { id: 'abraham', name: '아브라함', nameEn: 'Abraham', testament: 'old', era: 'B.C. 2000', description: '믿음의 조상이라 불리며, 하나님의 부르심을 받아 갈대아 우르에서 가나안으로 이주했습니다. 100세에 이삭을 낳고, 이삭을 번제로 드리려까지 순종한 믿음의 본을 보여주었습니다.', books: ['창세기'], color: '#D4A574' },
  { id: 'isaac', name: '이삭', nameEn: 'Isaac', testament: 'old', era: 'B.C. 1900', description: '아브라함과 사라가 약속대로 얻은 기적의 아들입니다. 모리아 산에서 번제로 드려질 뻔했으나 하나님이 예비하신 수양으로 대체되었습니다. 언약의 상속자입니다.', books: ['창세기'], color: '#D4A574' },
  { id: 'jacob', name: '야곱', nameEn: 'Jacob', testament: 'old', era: 'B.C. 1900', description: '이삭의 쌍둥이 아들로 형 에서의 장자권과 축복을 빼앗았습니다. 벧엘에서 하나님을 만나 이스라엘이라는 새 이름을 받았고, 12아들을 낳아 이스라엘 12지파의 조상이 되었습니다.', books: ['창세기'], color: '#D4A574' },
  { id: 'joseph', name: '요셉', nameEn: 'Joseph', testament: 'old', era: 'B.C. 1800', description: '야곱의 11번째 아들로 총애받아 형들의 시기를 사서 애굽에 종으로 팔렸습니다. 그러나 하나님이 함께하사 애굽의 총리가 되었고, 흉년에 온 가족을 구원하며 "당신들은 나를 해하려 하였으나 하나님은 선하게 하셨다"고 고백했습니다.', books: ['창세기'], color: '#D4A574' },
  { id: 'moses', name: '모세', nameEn: 'Moses', testament: 'old', era: 'B.C. 1500', description: '이스라엘의 위대한 해방자이자 율법 수여자입니다. 애굽에서 태어나 바로의 궁전에서 자랐고, 80세에 하나님의 부르심을 받아 이스라엘을 출애굽으로 인도했습니다. 십계명을 받고 40년간 광야에서 백성을 이끌었습니다.', books: ['출애굽기', '레위기', '민수기', '신명기'], color: '#6B8E23' },
  { id: 'joshua', name: '여호수아', nameEn: 'Joshua', testament: 'old', era: 'B.C. 1400', description: '모세의 후계자로 이스라엘을 이끌고 가나안을 정복했습니다. 여리고 성 함락, 태양이 멈추는 기적 등 하나님의 능력으로 승리하며 약속의 땅을 분배받았습니다. "오직 나와 내 집은 여호와를 섬기겠노라"는 결단이 유명합니다.', books: ['여호수아'], color: '#8B6914' },
  { id: 'david', name: '다윗', nameEn: 'David', testament: 'old', era: 'B.C. 1000', description: '이스라엘의 위대한 왕이자 시편의 주요 저자입니다. 목동에서 골리앗을 무찌르고 왕이 되었으며, 하나님의 마음에 합한 자라 불렸습니다. 밧세바 사건으로 징계받았으나 철저히 회개하였고, 메시아의 조상이 되었습니다.', books: ['사무엘상', '사무엘하', '시편'], color: '#8B0000' },
  { id: 'solomon', name: '솔로몬', nameEn: 'Solomon', testament: 'old', era: 'B.C. 950', description: '다윗의 아들로 이스라엘의 영광스러운 왕입니다. 지혜를 구하여 세상에서 가장 지혜로운 자가 되었고, 성전을 건축했습니다. 그러나 말년에 이방 여인들을 사랑하여 우상 숭배로 타락하고 왕국이 분열되는 원인을 만들었습니다.', books: ['열왕기상', '잠언', '전도서', '아가'], color: '#8B0000' },
  { id: 'elijah', name: '엘리야', nameEn: 'Elijah', testament: 'old', era: 'B.C. 870', description: '갈멜산에서 450명의 바알 선지자와 대결하여 승리한 불의 선지자입니다. 아합 왕과 이세벨의 우상 숭배에 맞서 싸웠고, 불과 비를 기도로 내리며 하나님의 살아 계심을 증명했습니다. 불수레를 타고 승천했습니다.', books: ['열왕기상', '열왕기하'], color: '#9370DB' },
  { id: 'isaiah', name: '이사야', nameEn: 'Isaiah', testament: 'old', era: 'B.C. 700', description: '메시아 예언의 왕자라 불리는 대선지자입니다. 처녀가 잉태할 것, 베들레헴에서 태어날 것, 고난 받는 종 등 예수님에 대한 가장 상세한 예언을 남겼습니다. 구약의 복음이라 불리는 이사야서의 저자입니다.', books: ['이사야'], color: '#8B0000' },
  { id: 'jeremiah', name: '예레미야', nameEn: 'Jeremiah', testament: 'old', era: 'B.C. 627', description: '눈물의 선지자로 유다의 멸망 직전 40년간 회개를 촉구했습니다. 백성의 거절과 핍박 속에서도 새 언약을 약속하며 하나님의 사랑을 전했습니다. "너희를 향한 나의 생각은 평안이요 소망이라"는 말씀이 유명합니다.', books: ['예레미야', '예레미야 애가'], color: '#8B0000' },
  { id: 'daniel', name: '다니엘', nameEn: 'Daniel', testament: 'old', era: 'B.C. 600', description: '바벨론 포로 중에서도 신앙을 지킨 지혜로운 청년입니다. 사자굴에서 구원받고, 느부갓네살과 벨사살의 꿈을 해석하며, 세계 제국의 흥망과 종말의 환상을 보았습니다. 역사의 주관자이신 하나님을 증언합니다.', books: ['다니엘'], color: '#9370DB' },
  { id: 'esther', name: '에스더', nameEn: 'Esther', testament: 'old', era: 'B.C. 470', description: '바사 왕궁의 유대인 왕비로, 민족 멸절 위기에서 "죽으면 죽으리이다"라며 용기 있게 왕에게 나아가 유대인을 구원했습니다. 하나님의 이름은 언급되지 않으나 섭리 가운데 역사하심이 돋보입니다.', books: ['에스더'], color: '#8B6914' },
  { id: 'ruth', name: '룻', nameEn: 'Ruth', testament: 'old', era: 'B.C. 1100', description: '모압 여인으로 시어머니 나오미를 따라 베들레헴으로 온 이방인입니다. "어머니의 백성이 내 백성이요 어머니의 하나님이 내 하나님이시니이다"라는 고백으로 보아스와 결혼하여 다윗의 증조모가 되었습니다.', books: ['룻기'], color: '#8B6914' },

  // ─── 신약 인물 ───
  { id: 'jesus', name: '예수 그리스도', nameEn: 'Jesus Christ', testament: 'new', era: 'A.D. 0~33', description: '성경 전체의 중심이신 하나님의 아들입니다. 동정녀 마리아에게서 태어나사 33년간 사시며 병을 고치시고 죄인을 부르셨습니다. 십자가에서 죽으시고 3일 만에 부활하사 온 인류의 구원을 이루셨습니다.', books: ['마태복음', '마가복음', '누가복음', '요한복음'], color: '#FFD700' },
  { id: 'mary', name: '마리아', nameEn: 'Mary', testament: 'new', era: 'A.D. 0~', description: '예수님의 어머니로 다윗의 자손 요셉과 약혼한 처녀였습니다. 천사 가브리엘의 수태 고지를 받아 성령으로 예수님을 잉태하였으며, 십자가 곁까지 아들을 지켜보았습니다. "주의 계집종이오니 말씀대로 내게 이루어지이다"라는 순종의 본입니다.', books: ['마태복음', '누가복음', '요한복음'], color: '#4169E1' },
  { id: 'john_baptist', name: '세례 요한', nameEn: 'John the Baptist', testament: 'new', era: 'A.D. 27~30', description: '예수님의 길을 예비한 선구자입니다. 광야에서 회개를 선포하며 요단강에서 세례를 베풀었고, 예수님을 "하나님의 어린 양"으로 소개했습니다. "그는 흥하여야 하겠고 나는 쇠하여야 하리라"는 겸손의 고백이 유명합니다.', books: ['마태복음', '마가복음', '누가복음', '요한복음'], color: '#2E8B57' },
  { id: 'peter', name: '베드로', nameEn: 'Peter', testament: 'new', era: 'A.D. 30~68', description: '열두 사도의 수장으로 본명은 시몬입니다. 예수님을 "그리스도"라고 고백하였으나 세 번 부인하기도 했습니다. 부활하신 예수님의 사랑을 확인받고 초대 교회의 지도자가 되었으며, 오순절 설교로 3천 명을 회개시켰습니다.', books: ['마태복음', '사도행전', '베드로전서', '베드로후서'], color: '#4169E1' },
  { id: 'paul', name: '바울', nameEn: 'Paul', testament: 'new', era: 'A.D. 35~67', description: '기독교의 위대한 선교사이자 신학자입니다. 본래 교회를 핍박하던 사울이 다메섹 도상에서 부활하신 예수님을 만나 변화받았습니다. 3차 선교 여행으로 소아시아와 유럽에 복음을 전하고, 13권의 서신을 남겼습니다.', books: ['사도행전', '로마서', '고린도전서', '고린도후서', '갈라디아서', '에베소서', '빌립보서', '골로새서', '데살로니가전서', '데살로니가후서', '디모데전서', '디모데후서', '디도서', '빌레몬서'], color: '#2E8B57' },
  { id: 'john', name: '요한', nameEn: 'John', testament: 'new', era: 'A.D. 30~95', description: '예수님이 사랑하신 제자입니다. 천둥의 아들이라 불렸으나 사랑의 사도로 변화되었습니다. 요한복음, 요한서신, 요한계시록의 저자이며, 밧모 섬에서 종말의 계시를 받았습니다. "하나님은 사랑이시라"는 위대한 진리를 선포했습니다.', books: ['요한복음', '요한일서', '요한이서', '요한삼서', '요한계시록'], color: '#4169E1' },
  { id: 'james', name: '야고보', nameEn: 'James', testament: 'new', era: 'A.D. 45~62', description: '예수님의 동생으로 예수님의 부활 후 믿게 되었습니다. 예루살렘 교회의 지도자로서 교회의 기둥이라 불렸으며, "행함이 없는 믿음은 죽은 것"이라고 가르쳤습니다. 실천적 신앙의 모범을 보였습니다.', books: ['야고보서', '사도행전'], color: '#CD853F' },
  { id: 'stephen', name: '스데반', nameEn: 'Stephen', testament: 'new', era: 'A.D. 34', description: '초대 교회의 최초 순교자입니다. 일곱 집사 중 한 사람으로 은혜와 권능이 충만하여 큰 기사와 표적을 행했습니다. 산헤드린 앞에서 담대히 설교하다가 돌에 맞아 죽으면서 "주여 이 죄를 돌려주지 마옵소서"라고 기도했습니다.', books: ['사도행전'], color: '#FF6347' },
  { id: 'barnabas', name: '바나바', nameEn: 'Barnabas', testament: 'new', era: 'A.D. 35~50', description: '위로의 아들이라는 뜻의 이름을 가진 사도입니다. 핍박자 사울을 교회에 소개하고, 바울과 함께 최초의 선교 여행을 떠났습니다. 성령과 믿음이 충만한 자로서 교회의 일치와 선교에 헌신했습니다.', books: ['사도행전'], color: '#2E8B57' },
  { id: 'timothy', name: '디모데', nameEn: 'Timothy', testament: 'new', era: 'A.D. 50~67', description: '바울의 영적 아들이자 가장 충성된 동역자입니다. 어머니 유니게와 외조모 로이스의 믿음을 이어받아 바울의 선교 여행에 동행했으며, 에베소 교회의 목사로 사역했습니다. 바울은 그에게 두 통의 목회 서신을 보냈습니다.', books: ['사도행전', '디모데전서', '디모데후서'], color: '#2E8B57' },
];

export const characterRelations: CharacterRelation[] = [
  // ─── 창세기 가계도 ───
  { from: 'adam', to: 'eve', type: '배우자', label: '부부' },
  { from: 'adam', to: 'noah', type: '조상-후손', label: '10대 후손' },
  { from: 'noah', to: 'abraham', type: '조상-후손', label: '10대 후손' },
  { from: 'abraham', to: 'isaac', type: '부모-자식', label: '부자' },
  { from: 'isaac', to: 'jacob', type: '부모-자식', label: '부자' },
  { from: 'jacob', to: 'joseph', type: '부모-자식', label: '부자' },

  // ─── 출애굽 계보 ───
  { from: 'abraham', to: 'moses', type: '조상-후손', label: '레비 지파' },
  { from: 'moses', to: 'joshua', type: '선택-부름', label: '후계자' },

  // ─── 다윗 왕조 ───
  { from: 'jacob', to: 'david', type: '조상-후손', label: '유다 지파' },
  { from: 'david', to: 'solomon', type: '부모-자식', label: '부자' },
  { from: 'elijah', to: 'david', type: '선지자-왕', label: '아합 시대' },

  // ─── 선지자 관계 ───
  { from: 'isaiah', to: 'david', type: '선지자-왕', label: '다윗 왕조 예언' },
  { from: 'jeremiah', to: 'david', type: '선지자-왕', label: '유다 왕들 경고' },
  { from: 'daniel', to: 'david', type: '조상-후손', label: '유다 지파' },

  // ─── 구약-신약 연결 ───
  { from: 'david', to: 'jesus', type: '조상-후손', label: '다윗의 자손' },
  { from: 'abraham', to: 'jesus', type: '조상-후손', label: '아브라함의 자손' },
  { from: 'isaiah', to: 'jesus', type: '선지자-왕', label: '메시아 예언' },

  // ─── 신약 관계 ───
  { from: 'jesus', to: 'mary', type: '부모-자식', label: '어머니' },
  { from: 'jesus', to: 'john_baptist', type: '선택-부름', label: '길을 예비' },
  { from: 'jesus', to: 'peter', type: '스승-제자', label: '사도' },
  { from: 'jesus', to: 'john', type: '스승-제자', label: '사도' },
  { from: 'jesus', to: 'james', type: '부모-자식', label: '동생' },
  { from: 'jesus', to: 'paul', type: '선택-부름', label: '부르심' },
  { from: 'peter', to: 'john', type: '동역자', label: '교회 기둥' },
  { from: 'peter', to: 'james', type: '동역자', label: '교회 기둥' },
  { from: 'paul', to: 'barnabas', type: '동역자', label: '1차 선교' },
  { from: 'paul', to: 'timothy', type: '스승-제자', label: '영적 아들' },
  { from: 'paul', to: 'stephen', type: '선택-부름', label: '순교로 부름' },

  // ─── 구약 여인들 ───
  { from: 'noah', to: 'ruth', type: '조상-후손', label: '이방인 구원 예표' },
  { from: 'ruth', to: 'david', type: '조상-후손', label: '증조모' },
  { from: 'esther', to: 'daniel', type: '동역자', label: '포로 시대' },
];

// 관계 유형별 색상
export const relationColors: Record<CharacterRelation['type'], string> = {
  '부모-자식': '#E74C3C',
  '배우자': '#E91E63',
  '형제': '#9C27B0',
  '조상-후손': '#FF9800',
  '선지자-왕': '#2196F3',
  '스승-제자': '#4CAF50',
  '동역자': '#00BCD4',
  '적대자': '#F44336',
  '선택-부름': '#FFD700',
  '양육-보호': '#8BC34A',
};
