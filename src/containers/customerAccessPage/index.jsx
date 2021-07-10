import React from "react";
import styled from "styled-components";
import { AccountBox } from "../../components/accountBox";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import {
  InnerPageContainer,
  PageContainer,
} from "../../components/pageContainer";

import { useParams } from "react-router-dom";

const StyledInnerContainer = styled(InnerPageContainer)`
  margin-top: 4em;
`;
const BackgroundFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 255);
  display: flex;
  flex-direction: column;
`;
export function CustomerAccessPage(props) {
  const { action } = useParams();

  return (
    <BackgroundFilter>
    <PageContainer>
      <Navbar />
      <StyledInnerContainer>
        <AccountBox initialActive={action} />
      </StyledInnerContainer>
      <Footer />
    </PageContainer>
    </BackgroundFilter>
  );
}
