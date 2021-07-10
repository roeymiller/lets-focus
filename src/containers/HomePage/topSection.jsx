import React from "react";
import { useMediaQuery } from "react-responsive";
import { matchPath } from "react-router";
import styled from "styled-components";
import { BrandLogo } from "../../components/brandLogo";
import { Button } from "../../components/button";
import { Marginer } from "../../components/marginer";
import { deviceSize } from "../../components/responsive";
import { CamPage } from "../../containers/CamPage";
import { Link } from "react-router-dom";
import { MeetingList } from "../../containers/MeetingList";
import TopSectionBackgroundImg from "../../images/landing-page.jpg";
import TheBestSpecialistsImg from "../../images/Work only with the best.png";
import { Meeting } from "../MeetingPage/Meeting";

const TopSectionContainer = styled.div`
  width: 100%;
  height: 800px;
  background-color: rgba(0, 0, 0, 0);


  @media screen and (max-width: ${deviceSize.mobile}px) {
    height: 700px;
    background-position: 0px 0px;
  }
`;

const BackgroundFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
`;

const TopSectionInnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const StandoutImage = styled.div`
  width: 44em;
  height: 34em;

  img {
    width: 100%;
    height: 100%;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @media screen and (max-width: ${deviceSize.mobile}px) {
    align-items: center;
  }
`;

const SloganText = styled.h3`
  margin: 0;
  line-height: 1.4;
  color: #000;
  font-weight: 500;
  font-size: 35px;

  @media screen and (max-width: ${deviceSize.mobile}px) {
    font-size: 24px;
  }
`;



const SloganText2 = styled.h3`
  margin: 0;
  line-height: 1.4;
  color: #000;
  font-weight: 500;
  font-size: 16px;

  @media screen and (max-width: ${deviceSize.mobile}px) {
    font-size: 16px;
  }
`;
export function TopSection(props) {
  const { children } = props;

  const isMobile = useMediaQuery({ maxWidth: deviceSize.mobile });

  return (
    <TopSectionContainer>
      <BackgroundFilter>
        {children}
        <TopSectionInnerContainer>
          <LogoContainer>

            <Marginer direction="vertical" margin={8} />
            <SloganText> HOW FOCUSED ARE MY STUDENTS? </SloganText>
            <SloganText2>Try our app and you will know how focused your students are on online meetings!</SloganText2>
            <Marginer direction="vertical" margin={15} />
            <Link to="/meeting/60bf8f89eebcfe190805ed72">
            <Button >Try Now!</Button>
            </Link>
            
          </LogoContainer>
          {!isMobile && (
            <StandoutImage>
              <img src={TheBestSpecialistsImg} alt="best in the field" />
            </StandoutImage>
          )}
        </TopSectionInnerContainer>
      </BackgroundFilter>
    </TopSectionContainer>
  );
}
