import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Cam } from "../../containers/CamPage/cam";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";

//Table
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Beforeunload } from 'react-beforeunload';
import { data } from "@tensorflow/tfjs";


const SubmitButton = styled.button`

  padding: 10px 10%;
  width: 100%;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  border-radius: 200px 200px 200px 200px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;

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

  &:focus {
    outline: none;
  }

  &:hover {
    filter: brightness(1.03);
  }
`;

const BoxContainer = styled.div`
margin: 50px 0px 50px 0px ;

  width: 80%;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0px 0px 15px 0px rgba(15, 15, 15, 0.28);
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

const HeaderText = styled.h2`
  font-weight: 600;
  color: black;
  z-index: 10;
  margin: 0;
  font-size: 30px;
  line-height: 1.24;
`;

const Container = styled.div`
    text-align: center;  
    `;


async function getJson(url) {
  let response = await fetch(url);
  let data = await response.json()
  return data;
}


export function ParticipantPage(props) {
  const [meetingDate, setMeetingDate] = useState()
  const [meetingTime, setMeetingTime] = useState()
  const [meetingName, setMeetingName] = useState()

  const [camera, setCameraOnOff] = useState(false)

  //participant random id 
  const rand = Math.random() * 10000;
  const participantId = rand.toString(36);

  function deleteUser(meetingId, userId) {
    console.log("deleteUser")
    axios.put('http://localhost:3002/api/deleteparticipant/:' + meetingId, { 'participantId': userId })
      .then(res => console.log(res))
      .catch(err => console.log(err))
    console.log(participantId);
  }

  let { id } = useParams();
  const getMeetingUrl = "http://localhost:3002/api/meeting/" + id
  getJson(getMeetingUrl)
    .then(data => {
      setMeetingDate(() => data.data.date)
      setMeetingTime(() => data.data.time)
      setMeetingName(() => data.data.name)

    }
    );


  return (
    <Beforeunload onBeforeunload={() => {
      console.log(id)
      console.log(participantId)
      return 'You’ll lose your data!'
    }} onClick={() => deleteUser(id, participantId)}>
      <div>
        <BoxContainer>

          <TableContainer component={Paper} >
            <Table>
              <TableHead >
                <TableRow >
                  <TableCell align="center" >Meeting</TableCell>
                  <TableCell align="center" >Date</TableCell>
                  <TableCell align="center" >Time</TableCell>
                  <TableCell align="center" >Host/Participant</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center"> {meetingName} </TableCell>
                  <TableCell align="center">{meetingDate}</TableCell>
                  <TableCell align="center">{meetingTime}</TableCell>
                  <TableCell align="center"> Participant</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <br />
          {!camera && <SubmitButton onClick={() => { setCameraOnOff(true) }}>Start</SubmitButton>}
          {camera && <SubmitButton onClick={() => { setCameraOnOff(false) }}>Stop</SubmitButton>}


          {camera && <Cam meetingId={id} participantId={participantId} />}
        </BoxContainer>

      </div>
    </Beforeunload>
  );

}

export default ParticipantPage;
