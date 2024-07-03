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
        { name: "about us", href: "/about-us" },
        { name: "freebies", href: "/freebies" },
        { name: "blog", href: "/blog" },
      ],
    },
    {
      name: "resources",
      items: [
        { name: "affiliate program", href: "/affiliate-program"},
        { name: "ended auctions", href: "/ended-auctions"},
      ],
    },
    {
      name: "help & support",
      items: [
        { name: "contact us", href: "/contact-us"},
        { name: "knowledge center",href: "/knowledge-center" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions", href: "/terms-conditions"},
        { name: "privacy policy", href: "/privacy-policy" },
      ],
    },
  ],
};

export default router;