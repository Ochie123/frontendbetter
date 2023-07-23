import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url'; // Add the fileURLToPath function

const __filename = fileURLToPath(import.meta.url); // Get the current module's filename
const __dirname = path.dirname(__filename); // Get the directory name from the filename

const hostname = 'https://www.cars-bids.com'; // Replace this with your actual website URL
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml'); // The path where you want to save the sitemap file

// Array of URLs to include in the sitemap
const urls = [
  { url: '/', changefreq: 'weekly', priority: 1.0 }, // homepage
  { url: '/auctions', changefreq: 'weekly', priority: 1.0 }, // auctions
  { url: '/blog', changefreq: 'weekly', priority: 0.8 }, // blog page
  { url: '/discover-our-collection', changefreq: 'monthly', priority: 0.8 }, // our collection page
  { url: '/about-us', changefreq: 'monthly', priority: 0.8 }, // about page
  { url: '/knowledge-center', changefreq: 'monthly', priority: 0.8 }, // knowledge center page
  { url: '/contact-us', changefreq: 'monthly', priority: 0.6 }, // contact page
  { url: '/how-to-sell', changefreq: 'monthly', priority: 0.6 }, // How to sell page
  { url: '/our-safeguards', changefreq: 'monthly', priority: 0.6 }, // Our Safeguards
  { url: '/affiliate-program', changefreq: 'monthly', priority: 0.8 }, // affiliate program page
  // Add more URLs as needed
];

// Generate the sitemap
const sitemapStream = new SitemapStream({ hostname, cacheTime: 600000 });

// Populate the sitemap with URLs
urls.forEach((url) => {
  sitemapStream.write(url);
});
sitemapStream.end();

// Save the sitemap to a file
streamToPromise(sitemapStream).then((sm) =>
  fs.writeFileSync(sitemapPath, sm.toString())
);
//
//run.. node --experimental-modules generateSitemap.mjs