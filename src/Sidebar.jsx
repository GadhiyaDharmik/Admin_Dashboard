import {
  cilCloudDownload,
  cilLayers,
  cilPuzzle,
  cilSpeedometer,
} from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import {
  CBadge,
  CNavGroup,
  CNavItem,
  CNavTitle,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
} from "@coreui/react";
import React from "react";
import { FaChartLine } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { LuMessageSquare } from "react-icons/lu";
import { MdStars } from "react-icons/md";
import { TbSpeakerphone } from "react-icons/tb";

function Sidebar() {
  return (
    <CSidebar className="border-end" narrow>
      <CSidebarHeader>
        <CSidebarBrand className="logo" style={{ fontSize: "3.5rem" }}>
          <MdStars />
        </CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavItem href="#">
          <GoHome className="nav-icon" />
        </CNavItem>
        <span className="link-name">Home</span>
        <CNavItem href="#">
          <TbSpeakerphone className="nav-icon" />
        </CNavItem>
        <span className="link-name">Campaigns</span>
        <CNavItem href="#">
          <FaChartLine className="nav-icon" />
        </CNavItem>
        <span className="link-name">Insights</span>
        <CNavItem href="#">
          <LuMessageSquare className="nav-icon" />
        </CNavItem>
        <span className="link-name">Messages</span>
      </CSidebarNav>
    </CSidebar>
  );
}

export default Sidebar;
