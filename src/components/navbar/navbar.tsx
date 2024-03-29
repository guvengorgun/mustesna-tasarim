import React, { useState } from 'react';
import { Link } from 'gatsby';
import { IoIosSearch, IoIosClose } from 'react-icons/io';
import { DrawerProvider } from '../drawer/drawer-context';
import Menu from './menu';
import MobileMenu from './mobile-menu';
import SearchContainer from '../../containers/search/search';
import HeaderWrapper, {
  NavbarWrapper,
  Logo,
  MenuWrapper,
  NavSearchButton,
  NavSearchWrapper,
  SearchCloseButton,
  NavSearchFromWrapper,
} from './navbar.style';
// import LogoImage from '../../images/logo.png';
import LogoImage from '../../images/mustesna_logo.png';

type NavbarProps = {
  className?: string;
};

const MenuItems = [
  {
    label: 'Ana Sayfa',
    url: '/',
  },
  {
    label: 'Hakkımızda',
    url: '/about',
  },
  {
    label: 'İletişim',
    url: '/contact',
  }/*,
  {
    label: '404 Page',
    url: '/404',
  },*/
];

const Navbar: React.FunctionComponent<NavbarProps> = ({
  className,
  ...props
}) => {
  const [state, setState] = useState({
    toggle: false,
    search: '',
  });

  const toggleHandle = () => {
    setState({
      ...state,
      toggle: !state.toggle,
    });
  };

  // Add al classs to an array
  const addAllClass = ['header'];

  // cla ssName p rop checking
  if (className) {
    addAllClass.push(className);
  }

  return (
    <HeaderWrapper className={addAllClass.join(' ')} {...props}>
      <NavbarWrapper className="navbar">
        <DrawerProvider>
          <MobileMenu items={MenuItems} logo={LogoImage} />
        </DrawerProvider>
        <Logo>
          <Link to="/">
            <img src={LogoImage} alt="logo" />
          </Link>
        </Logo>
        <MenuWrapper>
          <Menu items={MenuItems} />
        </MenuWrapper>
        <NavSearchButton
          type="button"
          aria-label="search"
          onClick={toggleHandle}
        >
          <IoIosSearch size="23px" />
        </NavSearchButton>
      </NavbarWrapper>

      <NavSearchWrapper className={state.toggle === true ? 'expand' : ''}>
        <NavSearchFromWrapper>
          <SearchContainer />
          <SearchCloseButton
            type="submit"
            aria-label="close"
            onClick={toggleHandle}
          >
            <IoIosClose />
          </SearchCloseButton>
        </NavSearchFromWrapper>
      </NavSearchWrapper>
    </HeaderWrapper>
  );
};

export default Navbar;
