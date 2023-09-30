import { styled } from "styled-components";

const Footer = () => (
  <FooterComponent>
    Rob Taylor &copy; {new Date().getFullYear()}
  </FooterComponent>
);
export default Footer;

const FooterComponent = styled.footer`
  display: flex;
  flex: 0;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  align-items: center;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
`;
