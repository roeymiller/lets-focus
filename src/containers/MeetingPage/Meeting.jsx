import {React,useState} from "react";
import {useParams} from "react-router-dom";
import { Footer } from "../../components/footer";
import styled from "styled-components";
import { Navbar } from "../../components/navbar";
import {PageContainer } from "../../components/pageContainer";
import {Cam } from "../../containers/CamPage/cam";
import API from "../../API"
import {HostPage} from './HostPage'
import {ParticipantPage} from './ParticipantPage'

import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const HeaderText = styled.h2`
  font-weight: 100;
  color: black;
  z-index: 10;
  margin: 0;
  font-size: 16px;
  line-height: 1.24;
`;

const BoxContainer = styled.div`

  width: 80%;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0px 0px 2.7px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;

  left: 50%;
  -ms-transform: translate(-50%, 0%);
  transform: translate(-50%, 0%);
`;

const TopContainer = styled.div`
  width: 50%;
  height: 255px;
  display: flex;
  padding: 0 1.8em;
  padding-bottom: 7em;
`;

const BackDrop = styled(motion.div)`
zIndex: 900;
  position: absolute;
  width: 160%;
  height: 550px;
  border-radius: 50%;
  transform: rotate(180deg);
  top: -400px;
  left: -330px;
  background: #8360c3; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2ebf91,
    #8360c3
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;



   const BackgroundFilter = styled.div`
   width: 100%;
   height: 100%;
   background-color: rgba(255, 255, 255, 255);
   display: flex;
   flex-direction: column;
 `;


 var host ;

 async function getJson(url) {
  let response = await fetch(url);
  let data = await response.json()
  return data;
}

function checkIfHost(data) {
 if(data===localStorage.getItem('userId')){
   host = true;
 }else{
   host = false;
 }
 return data;
}
var idata ;

function meetingDataToArray(meeting) {

  idata = meeting;
}
      
export function Meeting(){ 
  const [meetingName,setMeetingName] = useState()
  const [meetingDate,setMeetingDate] = useState()
  const [meetingTime,setMeetingTime] = useState()
  const [zoomLink,setZoomLink] = useState()

     let { id } = useParams();
     const ivitationLink = "http://localhost:3000/meeting/" + id;
     const token = useSelector((state) => state.authReducer.token);
     const getHostIDUrl = "http://localhost:3002/api/meeting0/" + id
     const getMeetingUrl = "http://localhost:3002/api/meeting/" + id


     getJson(getHostIDUrl)
     .then(data => checkIfHost(data.data));

     getJson(getMeetingUrl)
     .then(data => {
       meetingDataToArray(data)
       setMeetingDate(()=> data.data.date)
       setZoomLink(data.data.zoomLink)
      }
    );
    return (
      
     <PageContainer>
       
      <BackgroundFilter>
       <Navbar/>  
       <br/>

       <BoxContainer>
       <BackDrop />

       <br/>
       <HeaderText>Invitation link: {<input value={ivitationLink} type="text" color="black" />}
       | Zoom Meeting link: {<input value={zoomLink} type="text" color="black" />}</HeaderText>

    {host &&  <HostPage style={{zindex: 1000}} data={idata}  />}
    {!host &&  <ParticipantPage data={idata}  />}

    </BoxContainer>
    <br/>

       <Footer /> 
       
      </BackgroundFilter>
     </PageContainer>

    
    )}

