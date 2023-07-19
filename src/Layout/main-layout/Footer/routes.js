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
        { name: "about us", href: "http://localhost:3000/about-us" },
        { name: "freebies", href: "http://localhost:3000/freebies" },
        { name: "blog", href: "http://localhost:3000/blog" },
      ],
    },
    {
      name: "resources",
      items: [
        { name: "affiliate program", href: "http://localhost:3000/affiliate-program"},
      ],
    },
    {
      name: "help & support",
      items: [
        { name: "contact us", href: "http://localhost:3000/contact-us"},
        { name: "knowledge center",href: "http://localhost:3000/knowledge-center" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions", href: "http://localhost:3000/terms-conditions"},
        { name: "privacy policy", href: "http://localhost:3000/privacy-policy" },
      ],
    },
  ],
};

export default router;