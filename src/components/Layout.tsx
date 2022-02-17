import React from "react";
import styled from "styled-components";
import Burger from "./Burger";
import Footer from "./Footer";

const LayoutComp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const FullFlex = styled.div`
  display: flex;
  flex-grow: 1;
`;

const Layout: React.FC = ({ children }) => {
  return (
    <LayoutComp>
      <Burger />
      <FullFlex>{children}</FullFlex>
      <Footer />
    </LayoutComp>
  );
};

export default Layout;
