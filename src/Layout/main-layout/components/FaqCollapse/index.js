import Divider from "@mui/material/Divider";
import { Collapse } from "@mui/material";

export default function FaqCollapse({ title, open, onClick, children }) {
    return (
      <>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={onClick}>
        <button style={{ marginRight: '10px' }}>{open ? '-' : '+'}</button>
        <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{title}</h3>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Divider />
        <p>{children}</p>
      </Collapse>
    </>
    );
  }