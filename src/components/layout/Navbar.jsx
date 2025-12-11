import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "./PageContainer";
import Logo from "../../assets/logos/edupress.svg";
import { SearchIcon } from "../../assets/icons/ui";
import PrimaryButton from "../common/PrimaryButton.jsx";

const Header = styled.header`
  background-color: #fff;
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

export default function Navbar() {
  const navigate = useNavigate();

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
            <PrimaryButton
              variant="outline"
              size="md"
              onClick={() => navigate("/login")}
            >
              Login / Register
            </PrimaryButton>

            <PrimaryButton variant="icon" aria-label="Search">
              <SearchIcon />
            </PrimaryButton>
          </RightActions>
        </NavBar>
      </PageContainer>
    </Header>
  );
}
