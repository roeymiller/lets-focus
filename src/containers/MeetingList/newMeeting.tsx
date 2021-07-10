import React, { useContext, useState } from "react";
import {
  BackDrop,
  BoldLink,
  BoxContainer,
  FormContainer,
  HeaderContainer,
  HeaderText,
  Input,
  MutedLink,
  SubmitButton,
  TopContainer,
} from "./common";
import { makeStyles, TextField } from '@material-ui/core';
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import styled from "styled-components";
import {
  InnerPageContainer,
  PageContainer,
} from "../../components/pageContainer";
import { Marginer } from "../../components/marginer";
import {createMeeting} from "../../../backend/controllers/Meeting-ctrl";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import Alert from "react-bootstrap/Alert";



const StyledInnerContainer = styled(InnerPageContainer)`
  margin-top: 2em;

`;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
}));

const BackgroundFilter = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 255);
  display: flex;
  flex-direction: column;
`;

const expandingTransition = {
  type: "spring",
  duration: 2.3,
  stiffness: 30,
};

const backdropVariants = {
  expanded: {
    width: "233%",
    height: "1050px",
    borderRadius: "20%",
    transform: "rotate(60deg)",
  },
  collapsed: {
    width: "160%",
    height: "400px",
    borderRadius: "50%",
    transform: "rotate(60deg)",
  },
};

function setRedirect() {
  throw new Error("Function not implemented.");
}

export function NewMeeting() {
  const classes = useStyles();

  const [name, setName] = useState('');
  //const [hostId, setHostId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [link, setLink] = useState('');
  const [id, setId] = useState('');
  const [zoomLink,setZoomLink] = useState('')
  const [redirect, setRedirect] = useState('');
  const [isExpanded, setExpanded] = useState(false);

   const saveMeeting = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("entered save meeting")
    event.preventDefault();
    const meeting = {
      name:name,
      hostId: localStorage.getItem('userId'),
      date:date,
      time:time,
      zoomLink:zoomLink,
      //hostId: setHostId(localStorage.getItem('userId')),
    }
    console.log(meeting)
    const url = 'http://localhost:3002/api/meeting'
     axios.post(url,meeting)
      .then(res=>{
        if(res.status==201){
          console.log("save meeting succeed");
          setRedirect('/meetingList')
        }
      })
      .catch(err=>{
        console.log("failed");
      });
  }


  function getCurrentDate(){

    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
  

    return `${year}${'-'}${month<10?`0${month}`:`${month}`}${'-'}${date}`;
  
    }

  return (
    <BackgroundFilter>
    <PageContainer>
    <Navbar />
    <StyledInnerContainer>
     <BoxContainer>
     <HeaderContainer>
          <HeaderText>New Meeting</HeaderText>
      </HeaderContainer> 
     <TopContainer> 
          <BackDrop
            variants={backdropVariants}
            transition={expandingTransition}
            initial={false}
            animate={isExpanded ? "expanded" : "collapsed"}
          />
      </TopContainer>
       {/* {redirect? <Redirect to={redirect}/> : null} */}
      <FormContainer className={classes.root} noValidate autoComplete="off" onSubmit={(event)=>{
        saveMeeting(event)
      }}>
        <div>
      <TextField 
          id="name" 
          label="Meeting Name" 
          size="small" 
          onChange={(event)=>{
          setName(event.target.value)
          }}/>
        <form >
        <TextField
          id="Date"
          label="Meeting Date"
          type="date"
          defaultValue={getCurrentDate()}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(event)=>{
            setDate(event.target.value)
          }}
        />
      </form>
      <form>
      <TextField
        id="Time"
        label="Meeting Time"
        type="time"
        defaultValue="07:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={(event)=>{
          setTime(event.target.value)
        }}
      />
      </form>
      <form>
      <TextField
        id="zoomLink"
        label="Zoom Link"
        type="link"
        defaultValue="zoom.us"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(event)=>{
          setZoomLink(event.target.value)
        }}
      />
      </form>
      </div>
      </FormContainer >
      <Marginer direction="vertical" margin="1em" />
      <SubmitButton onClick={(event)=>{saveMeeting(event)}}>Save Meeting</SubmitButton>
      {redirect? <Redirect to={redirect}/> : null}
    </BoxContainer> 
    </StyledInnerContainer>
    <Footer />
    </PageContainer>
    </BackgroundFilter>
  );
}

export default NewMeeting;


