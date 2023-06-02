import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
//import MKTypography from "components/MKTypography";

// Images
//import logoCT from "assets/images/logo-ct-dark.png";

const date = new Date().getFullYear();

export default function Footers() {
    return (
      <>
        <div className="">
          <div className="">
            All rights reserved. Copyright
            © <script>
              document.write(new Date().getFullYear()) 
            </script>
            &nbsp;About us
            <a href="about" className="" target="\\">Tradeking</a>.
          </div>
        </div>
      </>
    );
  }
  
  
  