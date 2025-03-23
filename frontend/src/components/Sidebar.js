// frontend/src/components/Sidebar.js
import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import icons
import HomeIcon from '@mui/icons-material/Home';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'; // For XDEX
import SmartToyIcon from '@mui/icons-material/SmartToy'; // For AI Agents
import StorefrontIcon from '@mui/icons-material/Storefront';
import PaymentIcon from '@mui/icons-material/Payment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import PieChartIcon from '@mui/icons-material/PieChart';
import GavelIcon from '@mui/icons-material/Gavel';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AssessmentIcon from '@mui/icons-material/Assessment';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline'; // For Projx Social
import ChatIcon from '@mui/icons-material/Chat'; // For PROJX

const drawerWidth = 260;
const collapsedWidth = 80;

const SidebarContainer = styled('div')(({ theme }) => ({
  height: '100%',
  overflowY: 'auto',
  padding: theme.spacing(2),
  background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(0,32,64,0.95))',
  borderRight: '1px solid rgba(0,229,255,0.3)'
}));

// Updated menuItems: removed Payment Services and Payment Networks
const menuItems = [
  { text: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
  { text: 'XDEX', icon: <SwapHorizIcon />, path: '/xdex' },
  { text: 'Projx Social', icon: <PeopleOutlineIcon />, path: '/projx-social' },
  { text: 'AI Agents', icon: <SmartToyIcon />, path: '/ai-agents' },
  { text: 'PROJX', icon: <ChatIcon />, path: '/projx' },  // PROJX tab
  { text: 'NFT Marketplace', icon: <StorefrontIcon />, path: '/nft-marketplace' },
  { text: 'XCasino', icon: <SportsEsportsIcon />, path: '/x-casino' },
  { text: 'MAKE A MEME', icon: <PaymentIcon />, path: '/make-a-meme' },
  { text: 'Wallet Dashboard', icon: <AccountBalanceWalletIcon />, path: '/wallet' },
  { text: 'DeFi Lending', icon: <MonetizationOnIcon />, path: '/defi-lending' },
  { text: 'Prediction Markets', icon: <AssessmentIcon />, path: '/prediction-markets' },
  { text: 'Crowdfunding', icon: <TrendingUpIcon />, path: '/crowdfunding' },
  // Instead of { text: 'Music Streaming', ... } do:
{ text: 'Xstream', icon: <VideoLibraryIcon />, path: '/xstream' },
  { text: 'Innovation Challenges', icon: <TrendingUpIcon />, path: '/innovation-challenges' },
  
  { text: 'Influencer Tracking', icon: <TrendingUpIcon />, path: '/social-trading-influencers' }
];

const listItemVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    backgroundColor: 'rgba(0,229,255,0.2)',
    transition: { duration: 0.3 }
  }
};

const Sidebar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!open);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          background: 'linear-gradient(135deg, rgba(0,0,0,0.95), rgba(0,32,64,0.95))',
          borderRight: '1px solid rgba(0,229,255,0.3)',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
          })
        }
      }}
    >
      <SidebarContainer>
        <IconButton
          onClick={toggleDrawer}
          sx={{ display: 'flex', justifyContent: open ? 'flex-end' : 'center', mb: 2 }}
        >
          {open ? (
            <ChevronLeftIcon sx={{ color: '#00e5ff' }} />
          ) : (
            <ChevronRightIcon sx={{ color: '#00e5ff' }} />
          )}
        </IconButton>
        <List>
          {menuItems.map((item, idx) => (
            <Tooltip key={idx} title={!open ? item.text : ''} placement="right">
              <motion.div
                variants={listItemVariants}
                initial="initial"
                whileHover="hover"
              >
                <ListItem button component={Link} to={item.path}>
                  <ListItemIcon sx={{ color: '#00e5ff' }}>
                    {item.icon}
                  </ListItemIcon>
                  {open && <ListItemText primary={item.text} sx={{ color: '#fff' }} />}
                </ListItem>
              </motion.div>
            </Tooltip>
          ))}
        </List>
      </SidebarContainer>
    </Drawer>
  );
};

export default Sidebar;