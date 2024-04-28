import "@/app/components/Sidebar/Sidebar.css";
import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
import { FaBars } from "react-icons/fa";

interface SidebarProps {
  style?: React.CSSProperties;
}

const SidebarPanel = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar collapsed={collapsed} breakPoint="md">
        <Menu>
          <SubMenu title="Charts">
            <MenuItem>Pie charts</MenuItem>
            <MenuItem>Line charts</MenuItem>
          </SubMenu>
          <MenuItem>Documentation</MenuItem>
        </Menu>
      </Sidebar>
      <div className="flex-grow">{/* Rest of your component */}</div>
    </div>
  );
};

export default SidebarPanel;
