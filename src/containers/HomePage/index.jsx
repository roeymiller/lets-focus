import React, {useEffect} from "react";
import styled from "styled-components";
import { Footer } from "../../components/footer";
import { Marginer } from "../../components/marginer";
import { Navbar } from "../../components/navbar";
import {
  InnerPageContainer,
  PageContainer,
} from "../../components/pageContainer";
import { deviceSize } from "../../components/responsive";
import { TopSection } from "./topSection";
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/authActions';


const ContentContainer = styled.div`
  width: 100%;
  max-width: ${deviceSize.laptop}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1em;

  @media screen and (max-width: ${deviceSize.mobile}px) {
    padding: 5px;
  }
`;


export function HomePage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("token")
    dispatch(authActions.checkTokenExist());
  }, []); 

    return (
    <PageContainer>
      <TopSection>
      
        <Navbar />
      </TopSection>


      {/* <InnerPageContainer>
        <Marginer direction="vertical" margin="2em" />
        <ContentContainer>
          <Services />
        </ContentContainer>
        <Marginer direction="vertical" margin="5em" />
        <SpecialistAd />
        <Marginer direction="vertical" margin="5em" />
      </InnerPageContainer>*/}
      <Footer /> 
    </PageContainer>
  );
}




