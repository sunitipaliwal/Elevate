const { join } = require('path');

/**
 * @type {import("puppeteer").Configuration}
 */
module.exports = {
  // Changes the cache location for Puppeteer so it survives Render's build process
  cacheDirectory: join(__dirname, '.cache', 'puppeteer'),
};