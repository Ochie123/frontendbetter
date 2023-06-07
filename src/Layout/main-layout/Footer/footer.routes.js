// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "../MKTypography";

// Images
//import logoCT from "assets/images/logo-ct-dark.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Cars-Bids",
  
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      link: "https://www.facebook.com/Cars-Bids/",
    },
    {
      icon: <TwitterIcon />,
      link: "https://twitter.com/cars-bids",
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
        { name: "about us", href: "https://www.cars-bids.com/presentation" },
        { name: "freebies", href: "https://www.cars-bids.com/templates/free" },
        { name: "premium tools", href: "https://www.cars-bids.com/templates/premium" },
        { name: "blog", href: "https://www.cars-bids.com/blog" },
      ],
    },
    {
      name: "resources",
      items: [
        { name: "illustrations", href: "https://cars-bids.io/" },
        { name: "bits & snippets", href: "https://www.cars-bids.com/bits" },
        { name: "affiliate program", href: "https://www.cars-bids.com/affiliates/new" },
      ],
    },
    {
      name: "help & support",
      items: [
        { name: "contact us", href: "https://www.cars-bids.com/contact-us" },
        { name: "knowledge center", href: "https://www.cars-bids.com/knowledge-center" },
        { name: "custom development", href: "https://cars-bids.com/" },
        { name: "sponsorships", href: "https://www.cars-bids.com/sponsorships" },
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions", href: "https://www.cars-bids.com/terms" },
        { name: "privacy policy", href: "https://www.cars-bids.com/privacy" },
        { name: "licenses (EULA)", href: "https://www.cars-bids.com/license" },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} 
      <MKTypography
        component="a"
        href="https://www.creative-tim.com"
        target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
     
      </MKTypography>
      .
    </MKTypography>
  ),
};
