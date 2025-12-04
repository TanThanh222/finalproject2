import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import Logo from "../../assets/logos/edupress.svg";
import { SearchIcon } from "../../assets/icons/ui";

const Header = styled.header`
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 40;
`;

const NavBar = styled.nav`
  height: 72px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 700;
  font-size: 28px;

  img {
    height: 30px;
    width: auto;
    display: block;
  }
`;

const NavCenter = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-weight: 600;
  color: #000000;

  @media (max-width: 960px) {
    display: none;
  }
`;

const NavItemLink = styled(NavLink)`
  position: relative;
  padding: 0 20px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  &.active {
    color: #ff782d;
  }
  &.active::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    background: #f5f5f5;
    z-index: -1;
  }
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LoginButton = styled.button`
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid #ff782d;
  background-color: #ffffff;
  color: #111827;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    background-color: #ff782d;
    color: #ffffff;
    box-shadow: 0 8px 16px rgba(249, 115, 22, 0.35);
  }
`;

const SearchButton = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 999px;
  border: 1px solid #ff782d;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  cursor: pointer;
  transition: background-color 0.15s ease, border-color 0.15s ease,
    box-shadow 0.15s ease;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background-color: #fff7f3;
    border-color: #ff782d;
    box-shadow: 0 6px 14px rgba(249, 115, 22, 0.25);
  }
`;

export default function Navbar() {
  const location = useLocation();

  return (
    <Header>
      <PageContainer>
        <NavBar>
          <Brand>
            <img src={Logo} alt="EduPress" />
            <span>EduPress</span>
          </Brand>

          <NavCenter>
            <NavList>
              <li>
                <NavItemLink to="/" end>
                  Home
                </NavItemLink>
              </li>
              <li>
                <NavItemLink to="/courses">Courses</NavItemLink>
              </li>
              <li>
                <NavItemLink to="/blog">Blog</NavItemLink>
              </li>
              <li>
                <NavItemLink to="/pages">Page</NavItemLink>
              </li>
              <li>
                <NavItemLink to="/addons">LearnPress Add-On</NavItemLink>
              </li>
              <li>
                <NavItemLink to="/premium-theme">Premium Theme</NavItemLink>
              </li>
            </NavList>
          </NavCenter>

          <RightActions>
            <LoginButton
              type="button"
              onClick={() => {
                window.location.href = "/loginres";
              }}
            >
              Login / Register
            </LoginButton>
            <SearchButton type="button" aria-label="Search">
              <SearchIcon />
            </SearchButton>
          </RightActions>
        </NavBar>
      </PageContainer>
    </Header>
  );
}
