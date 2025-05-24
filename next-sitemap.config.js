/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bey-bazaar.vercel.app',
  generateRobotsTxt: true,
  exclude: ["/profile", "/checkout", "/cart", "/update-password"],
  sitemapSize: 7000,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/', disallow: ['/profile', '/checkout', '/cart', '/update-password'] },
    ],
  },
};
