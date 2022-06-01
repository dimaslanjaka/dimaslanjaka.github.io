const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const sbgPath = path.join(__dirname, 'packages/static-blog-generator');
spawn('yarn', ['install', '--check-files'], { cwd: sbgPath });
spawn('yarn', ['install', '--check-files'], {
  cwd: path.join(sbgPath, 'packages/safelink')
});
spawn('yarn', ['install', '--check-files'], {
  cwd: path.join(sbgPath, 'packages/hexo-post-parser')
});
spawn('yarn', ['install', '--check-files'], {
  cwd: path.join(sbgPath, 'packages/google-news-sitemap')
});
spawn('yarn', ['install', '--check-files'], {
  cwd: path.join(sbgPath, 'packages/hexo-post-parser/packages/persistent-cache')
});
