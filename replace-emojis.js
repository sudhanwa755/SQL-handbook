const fs = require('fs');
const path = require('path');

const emojiMap = {
  '<i data-lucide="home" class="icon"></i>': 'home',
  '<i data-lucide="play" class="icon"></i>': 'play',
  '<i data-lucide="sparkles" class="icon"></i>': 'sparkles',
  '<i data-lucide="book-open" class="icon"></i>': 'book-open',
  '<i data-lucide="zap" class="icon"></i>': 'zap',
  '<i data-lucide="link" class="icon"></i>': 'link',
  '<i data-lucide="key" class="icon"></i>': 'key',
  '<i data-lucide="bar-chart-2" class="icon"></i>': 'bar-chart-2',
  '<i data-lucide="settings" class="icon"></i>': 'settings',
  '<i data-lucide="search" class="icon"></i>': 'search',
  '<i data-lucide="wrench" class="icon"></i>': 'wrench',
  '<i data-lucide="ruler" class="icon"></i>': 'ruler',
  '<i data-lucide="puzzle" class="icon"></i>': 'puzzle',
  '<i data-lucide="x-circle" class="icon"></i>': 'x-circle',
  '<i data-lucide="check-circle-2" class="icon"></i>': 'check-circle-2',
};

function processFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file.endsWith('.html') || file.endsWith('.js')) {
      const filePath = path.join(dir, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      let modified = false;

      // Replace emojis
      for (const [emoji, icon] of Object.entries(emojiMap)) {
        const regex = new RegExp(emoji, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, `<i data-lucide="${icon}" class="icon"></i>`);
          modified = true;
        }
      }

      // Add Lucide script to HTML files if not present
      if (file.endsWith('.html') && !content.includes('unpkg.com/lucide')) {
        content = content.replace('</body>', 
          '<script src="https://unpkg.com/lucide@latest"></script>\n<script>lucide.createIcons();</script>\n</body>'
        );
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
      }
    }
  }
}

processFiles(__dirname);
