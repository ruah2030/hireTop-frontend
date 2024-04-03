import {
  Outlet,
  Link as ReactRouterLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FiMenu, FiBell, FiChevronDown } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axiosClient from "../api/api";
import apiRoute from "../api/route";
import { setUser } from "../redux/userSlice";

import { TiDocumentText } from "react-icons/ti";
import { FiHome, FiSettings } from "react-icons/fi";
import { BiClipboard } from "react-icons/bi";

const SidebarContent = ({ user, onClose, ...rest }) => {
  const [menus, setMenus] = useState([]);

  const LINKS_ITEMS = [
    { name: "Acceuil", icon: FiHome, url: "/admin" },
    { name: "Parametre", icon: FiSettings, url: "/admin/settings" },
  ];
  if (user.is_organisation) {
    LINKS_ITEMS.push({
      name: "Offres",
      icon: BiClipboard,
      url: "/admin/offers",
    });
    LINKS_ITEMS.push({
      name: "Candidatures",
      icon: TiDocumentText,
      url: "/admin/applications",
    });
  } else {
    LINKS_ITEMS.push({
      name: "Mes Dossiers",
      icon: TiDocumentText,
      url: "/admin/folders",
    });
  }
  useEffect(() => {
    setMenus(LINKS_ITEMS);
  }, [user]);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      overflowY="auto"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {/* Logo */}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {menus.map((link) => (
        <NavItem key={link.link} icon={link.icon} link={link}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, link, children, ...rest }) => {
  const location = useLocation();

  let active =
    link.url === location.pathname
      ? { "background-color": "#004e9a", color: "white" }
      : {};
  return (
    <ChakraLink
      as={ReactRouterLink}
      to={link.url}
      style={{ textDecoration: "none" }}
      _activeLink={{
        bg: "blue.500",
        color: "white",
      }}
      // isActive={() => link.url === location.pathname}
    >
      <Box>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          style={active}
          cursor="pointer"
          _hover={{
            bg: "blue.500",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    </ChakraLink>
  );
};

const MobileNav = ({ onOpen, user, ...rest }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {/* Logo */}
      </Text>

      <HStack spacing={{ base: "0", md: "6" }} scrollBehavior={"smooth"}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {user.firstName} {user.lastName}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <ChakraLink
                as={ReactRouterLink}
                to={"/admin/settings"}
                style={{ textDecoration: "none" }}
              >
                <MenuItem>
                  <Box>Settings</Box>
                </MenuItem>
              </ChakraLink>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  axiosClient.post(apiRoute().logout).then((res) => {
                    dispatch(
                      setUser({
                        id: null,
                        email: null,
                        user_name: null,
                        email_verified_at: null,
                        created_at: null,
                        updated_at: null,
                        user_mata: null,
                        first_name: null,
                        last_name: null,
                        deleted_at: null,
                        token: null,
                      })
                    );
                    navigate("/login");
                  });
                }}
              >
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

function AdminLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {}, []);
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        user={user}
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} user={user} />
        </DrawerContent>
      </Drawer>

      <MobileNav onOpen={onOpen} user={user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  );
}
export default AdminLayout;
