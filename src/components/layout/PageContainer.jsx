import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;

  @media (min-width: 1024px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

export default function PageContainer({ children, className }) {
  return <Wrapper className={className}>{children}</Wrapper>;
}
