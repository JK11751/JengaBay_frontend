/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Box, IconButton, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Dashboard from './Dashboard';

const Layout = ({ children }) => {
  const { isOpen, onToggle } = useDisclosure();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Box display="flex">
      <Dashboard isCollapsed={isCollapsed} onToggleCollapse={handleToggleCollapse} />
      <Box
        ml={{ base: 0, md: isCollapsed ? '60px' : '250px' }}
        transition="margin-left 0.2s"
        w="full"
        p="4"
      >
        <IconButton
          aria-label="Open Sidebar"
          icon={<HamburgerIcon />}
          onClick={onToggle}
          display={{ base: 'block', md: 'none' }}
          mb="4"
        />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
