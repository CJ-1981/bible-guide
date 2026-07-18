import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const outputDir = '/home/z/my-project/public/bible-images';

const categories = [
  {
    id: 'pentateuch',
    prompt: 'Ancient scroll with Hebrew text, golden light from heaven, desert landscape with mountains in background, Moses parting the Red Sea scene, biblical art style, warm amber tones, dramatic lighting, high quality detailed illustration'
  },
  {
    id: 'historical',
    prompt: 'Ancient city of Jerusalem with temple, stone walls and towers, warriors with swords and shields, Israelite kingdom, biblical art style, warm golden and brown tones, dramatic sunset, high quality detailed illustration'
  },
  {
    id: 'poetry',
    prompt: 'Open ancient book with lyre harp, olive branches, gentle rain and sunshine, peaceful garden scene, Psalms and poetry, biblical art style, soft green and warm tones, serene atmosphere, high quality detailed illustration'
  },
  {
    id: 'major-prophets',
    prompt: 'Prophet standing on mountain top with scroll, dramatic sky with angels, divine light breaking through clouds, Isaiah prophecy vision, biblical art style, deep red and gold tones, powerful atmosphere, high quality detailed illustration'
  },
  {
    id: 'minor-prophets',
    prompt: 'Twelve small prophetic scrolls arranged in a circle, divine light from above, olive tree in center, biblical prophecy themes, biblical art style, purple and amber tones, mystical atmosphere, high quality detailed illustration'
  },
  {
    id: 'gospels',
    prompt: 'Jesus Christ teaching on a hillside with followers, peaceful Galilee lake in background, dove descending from heaven, warm sunlight, biblical art style, sky blue and golden tones, serene and holy atmosphere, high quality detailed illustration'
  },
  {
    id: 'acts',
    prompt: 'Tongues of fire above disciples heads at Pentecost, Holy Spirit descending, early Christian church gathering, ancient Jerusalem upper room, biblical art style, orange and fiery tones, powerful spiritual atmosphere, high quality detailed illustration'
  },
  {
    id: 'pauline',
    prompt: 'Apostle Paul writing a letter with quill in Roman prison, scrolls and parchment, chains on the wall, candlelight, biblical art style, teal and warm tones, contemplative atmosphere, high quality detailed illustration'
  },
  {
    id: 'general-epistles',
    prompt: 'Ancient letters being delivered between early Christians, Roman roads and ships, scrolls sealed with wax, fellowship of believers, biblical art style, amber and brown tones, warm community atmosphere, high quality detailed illustration'
  },
  {
    id: 'revelation',
    prompt: 'New Jerusalem descending from heaven, golden city with pearly gates, crystal river of life, throne of God with rainbow, book of Revelation, biblical art style, brilliant gold and white tones, glorious heavenly atmosphere, high quality detailed illustration'
  }
];

async function generateImages() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const zai = await ZAI.create();

  for (const cat of categories) {
    const outputPath = path.join(outputDir, `${cat.id}.jpg`);
    
    if (fs.existsSync(outputPath)) {
      console.log(`Skipping ${cat.id} - already exists`);
      continue;
    }

    try {
      console.log(`Generating image for: ${cat.id}`);
      const response = await zai.images.generations.create({
        prompt: cat.prompt,
        size: '1344x768'
      });

      const imageBase64 = response.data[0].base64;
      const buffer = Buffer.from(imageBase64, 'base64');
      fs.writeFileSync(outputPath, buffer);
      console.log(`✓ Saved: ${outputPath}`);
    } catch (error) {
      console.error(`✗ Failed: ${cat.id} - ${error}`);
    }
  }

  console.log('Image generation complete!');
}

generateImages().catch(console.error);
