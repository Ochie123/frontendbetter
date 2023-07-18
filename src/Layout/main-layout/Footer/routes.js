// react-router-dom components
import {
  createBrowserRouter,
  RouterProvider,
  Route, 
  Link,
} from "react-router-dom";
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "../MKBox";
import MKTypography from "../MKTypography";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

import AboutPage from "../../../view/pages/AboutPage";
import FreebiesPage from "../../../view/pages/FreebiesPage";
import PremiumToolsPage from "../../../view/pages/PremiumToolsPage";
import BlogPage from "../../../view/pages/BlogPage";
import IllustrationsPage from "../../../view/pages/IllustrationsPage";
import BitsSnippetsPage from "../../../view/pages/BitsSnippetsPage";
import AffiliateProgramPage from "../../../view/pages/AffiliateProgramPage";
import ContactUsPage from "../../../view/pages/ContactUsPage";
import KnowledgeCenterPage from "../../../view/pages/KnowledgeCenterPage";
import CustomDevelopmentPage from "../../../view/pages/CustomDevelopmentPage";
import SponsorshipsPage from "../../../view/pages/SponsorshipsPage";
import TermsConditionsPage from "../../../view/pages/TermsConditionsPage";
import PrivacyPolicyPage from "../../../view/pages/PrivacyPolicyPage";
import LicensesPage from "../../../view/pages/LicensesPage";

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
        {
          name: "about us",
          path: "/about",
          component: AboutPage,
        },
        {
          name: "freebies",
          path: "/freebies",
          component: FreebiesPage,
        },
        {
          name: "premium tools",
          path: "/premium-tools",
          component: PremiumToolsPage,
        },
        {
          name: "blog",
          path: "/blog",
          component: BlogPage,
        },
      ],
    },
    {
      name: "resources",
      items: [
        {
          name: "illustrations",
          path: "/illustrations",
          component: IllustrationsPage,
        },
        {
          name: "bits & snippets",
          path: "/bits-snippets",
          component: BitsSnippetsPage,
        },
        {
          name: "affiliate program",
          path: "/affiliate-program",
          component: AffiliateProgramPage,
        },
      ],
    },
    {
      name: "help & support",
      items: [
        {
          name: "contact us",
          path: "/contact-us",
          component: ContactUsPage,
        },
        {
          name: "knowledge center",
          path: "/knowledge-center",
          component: KnowledgeCenterPage,
        },
        {
          name: "custom development",
          path: "/custom-development",
          component: CustomDevelopmentPage,
        },
        {
          name: "sponsorships",
          path: "/sponsorships",
          component: SponsorshipsPage,
        },
      ],
    },
    {
      name: "legal",
      items: [
        {
          name: "terms & conditions",
          path: "/terms-conditions",
          component: TermsConditionsPage,
        },
        {
          name: "privacy policy",
          path: "/privacy-policy",
          component: PrivacyPolicyPage,
        },
        {
          name: "licenses (EULA)",
          path: "/licenses",
          component: LicensesPage,
        },
      ],
    },
  ],
};

export default router;