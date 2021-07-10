import React, {useContext, useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {useParams} from "react-router-dom";
import {Cam } from "../../containers/CamPage/cam";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import { Line } from "react-chartjs-2";


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from "../../components/button";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";

var meetingDate,meetingTime,meetingName, meetingId;
var le;


 function meetingDataToArray(meeting) {
     meetingDate = meeting.date;
     meetingTime = meeting.time;
     meetingName = meeting.name;
     meetingId = meeting._id;

}

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




function getResults(id,data) {

  const url = 'http://localhost:3002/api/meeting/'+id
   axios.get(url).then(res=>{

    const length = res.data.data.participantsArray.length
    var tempResults = 0;
    var toIgnore = 0;

    for(var i = 0; i<length;i++){

      tempResults += res.data.data.participantsArray[i].focus
      if(res.data.data.participantsArray[i].focus===0){toIgnore+=1;}
    }
      tempResults= tempResults/(length-toIgnore)
      console.log(tempResults)
      data.datasets[0].data.push({
        x: Date.now(),
        y: tempResults,
        
        });

  
  }).catch(err=>{
    console.log(err);
  })


}
export function HostPage(props) {
  let { id } = useParams();

  meetingDataToArray(props.data.data)

    const getDataFromPraticpents = async () => {
        setInterval(() => {

            getResults(id,data);
        }, 1000);
    };

    useEffect(()=>{getDataFromPraticpents()}, []);



    const data = {
  datasets: [
    {
      label: "Dataset",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      lineTension: 0,
      borderDash: [8, 4],
      data: []
    }
  ]
};
const options = {
  responsive: true,
  // maintainAspectRatio: false,
  scales: {
    xAxes: [
      {    

        type: "realtime",
                realtime: {
                  onRefresh:  function() {
                    // setInterval(getResults(id,data), 6000);

                  } ,
                  delay: 2000
                }
      }
    ],
    yAxes: [{
      display: true,
      ticks: {
          suggestedMin: 1,   
          suggestedMax: 3.5
      }
  }]
  }
};



        return (
            <div>
<BoxContainer>
<TableContainer component={Paper} >
      <Table >
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
              <TableCell align="center">Host</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>

    <br/>
<HeaderText>Data and statistic will be shown here</HeaderText>
<Line data={data} height={'80%'} options={options} />
{/*data:{data.data}*/}
{/* <SubmitButton onClick={()=>setFocus()} >Click!</SubmitButton> */}
</BoxContainer>

            </div>
        );

}

export default HostPage;
