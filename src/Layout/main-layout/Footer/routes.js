// react-router-dom components

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

const router = {
  brand: "Cars-Bids",
  socials: [
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/Cars-Bids/",
    },
    {
      icon: <TwitterIcon />,
      link: "https://twitter.com/carsbidske",
    },
    {
      icon: <YouTubeIcon />,
      link: "https://www.youtube.com/",
    },
  ],
  menus: [
    {
      name: "company",
      items: [
        { name: "about us", href: "https://cars-bids.com/about-us" },
        { name: "freebies", href: "https://cars-bids.com/freebies" },
        { name: "blog", href: "https://cars-bids.com/blog" },
      ],
    },
    {
      name: "resources",
      items: [
        { name: "affiliate program", href: "https://cars-bids.com/affiliate-program"},
        { name: "ended auctions", href: "http://localhost:3000/ended-auctions"},
      ],
    },
    {
      name: "help & support",
      items: [
        { name: "contact us", href: "https://cars-bids.com/contact-us"},
        { name: "knowledge center",href: "https://cars-bids.com/knowledge-center" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions", href: "https://cars-bids.com/terms-conditions"},
        { name: "privacy policy", href: "https://cars-bids.com/privacy-policy" },
      ],
    },
  ],
};

export default router;