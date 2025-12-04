import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1200px; /* giống Figma */
  margin: 0 auto; /* căn giữa toàn trang */
  padding-left: 1rem; /* 16px */
  padding-right: 1rem; /* 16px */

  @media (min-width: 1024px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export default function PageContainer({ children, className }) {
  return <Wrapper className={className}>{children}</Wrapper>;
}
