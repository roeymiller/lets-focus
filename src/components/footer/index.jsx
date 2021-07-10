import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import { BrandLogo } from "../brandLogo";
import { Link } from "react-router-dom";

import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { deviceSize } from "../responsive";
import { useMediaQuery } from "react-responsive";

const BackgroundFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(38, 70, 83, 0.9);
  display: flex;
  flex-direction: column;
`;
const FooterContainer = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2em 3em;
  padding-bottom: 0;
  border-top: 0.6px solid rgb(0, 0, 0, 0.3);

  @media screen and (max-width: ${deviceSize.mobile}px) {
    padding: 2em 12px;
  }
`;

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1em;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &:not(:last-of-type) {
    margin-right: 3%;
  }
`;

const Title = styled.h2`
  margin: 0;
  margin-bottom: 13px;
  color: #fff;
  font-weight: 600;
  font-size: 20px;
`;

const FLink = styled.a`
  text-decoration: none;
  color: #6f6f6f;
  font-weight: 500;
  font-size: 15px;
  cursor: pointer;

  &:not(:last-of-type) {
    margin-bottom: 8px;
  }
`;

const styleWhiteLink ={
  color: 'white'
  }


export function Footer(props) {
  const isMobile = useMediaQuery({ maxWidth: deviceSize.mobile });

  return (
    <BackgroundFilter>
    <FooterContainer>
      <TopContainer>
        <ContentContainer>
          <Title>Access</Title>

          {/* <FLink><Link to="/">Home</Link></FLink>
          <FLink><Link to="/customer/access/signin">Login</Link></FLink>
          <FLink><Link to="/customer/access/signup">Join Us</Link></FLink> */}
          <FLink ><Link to="/contact-us" style={styleWhiteLink} >Contact us</Link></FLink>
        </ContentContainer>
      </TopContainer>
    </FooterContainer>
    </BackgroundFilter>
  );
}
