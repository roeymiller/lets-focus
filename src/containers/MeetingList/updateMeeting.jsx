import React, {useState} from "react";
import {useParams, Redirect} from "react-router-dom";
import { Footer } from "../../components/footer";
import styled from "styled-components";
import { Navbar } from "../../components/navbar";
import {PageContainer, InnerPageContainer } from "../../components/pageContainer";
import { makeStyles, TextField } from '@material-ui/core';
import {SubmitButton ,BoxContainer ,FormContainer, HeaderContainer, HeaderText,TopContainer,BackDrop,} from "./common";
import apis from "../../API";
import axios from "axios";
import {Form,Label} from 'semantic-ui-react'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  label:{
    width:50,
    fontSize: '0.5rom',
    opacity: 0.6,
    marginRight:theme.spacing(1),
    display: 'inline',
  },
}));

const BackgroundFilter = styled.div`
width: 100%;
height: 100%;
background-color: rgba(255, 255, 255, 255);
display: flex;
flex-direction: column;
`;

const StyledInnerContainer = styled(InnerPageContainer)`
    margin-top: 2em;
`;

async function getJson(url) {
  let response = await fetch(url);
  let data = await response.json()
  return data;
}



export function UpdateMeeting(props) {

    let { id } = useParams();
    const [redirect, setRedirect] = useState('');
    const [meetingDate,setMeetingDate] = useState()
    const [meetingTime,setMeetingTime] = useState()
    const [meetingName,setMeetingName] = useState()

    const [prevmeetingDate,setprevMeetingDate] = useState()
    const [prevmeetingTime,setprevMeetingTime] = useState()
    const [prevmeetingName,setprevMeetingName] = useState()

    const classes = useStyles();
    const getMeetingUrl = "http://localhost:3002/api/meeting/" + id

    getJson(getMeetingUrl)
    .then(data => {
      setprevMeetingName(()=> data.data.name)
      setprevMeetingTime(()=> data.data.time)
      setprevMeetingDate(()=> data.data.date)
     }
   );

  //  const meeting = apis.getMeetingById(id);
  //  console.log(meeting);

   const handleChangeInputName = async(event) => {
    setMeetingName(event.target.value);
  };

  const handleChangeInputDate = async (event) => {
    setMeetingDate(event.target.value);
  }

  const handleChangeInputTime = async (event) => {
    setMeetingTime(event.target.value);
  }

  const handleUpdate = event =>{
    event.preventDefault();
    const meeting = {
      name: meetingName,
      hostId: localStorage.getItem('userId'),
      date:meetingDate,
      time:meetingTime,
    }
    console.log(meeting);
    const url = 'http://localhost:3002/api/updatemeeting/'.concat(id)
    console.log(url);
    setRedirect('../meetingList')
    axios.put(url,meeting).then(res=>{
      if(res.status==201){
        console.log("edit succeedd");
      }
    }).catch(err=>{
      console.log("failed");
    })
  }

  const handleCencel = async()=>{
    setRedirect('../meetingList')
  }

    return (
        <PageContainer>
        <BackgroundFilter>
         <Navbar/>   
         <HeaderContainer>
              <HeaderText>Update Meeting ID: {id}</HeaderText> 
            </HeaderContainer> 
           <StyledInnerContainer>
             <BoxContainer>
              <FormContainer className={classes.root} noValidate autoComplete="off" onSubmit={(event)=>{
                handleUpdate(event)}}>
                <div>
                <Form.Field inline>
                <TextField required
                  id="name" 
                  label="Meeting Name"
                  size="small" 
                  //value={prevmeetingName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChangeInputName}
                  helperText={prevmeetingName}
                  />
                  {/* <Label pointing="right" opacity='0.5'>{meetingName}</Label> */}
                  </Form.Field>

                <form >
                <TextField required
                  id="Date"
                  label="Meeting Date"
                  type="date"
                  //value={prevmeetingDate}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={handleChangeInputDate}
                  helperText={prevmeetingDate}

                />
                </form>
                <form>
                <TextField required
                  id="Time"
                  label="Meeting Time"
                  type="time"
                  //value={prevmeetingTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    step: 300, // 5 min
                  }}
                  onChange={handleChangeInputTime}
                  helperText={prevmeetingTime}
                />
                </form>
                <form>
                <TextField 
                  id="Zoom Link"
                  label="Zoom Link"
                  type="link"
                  //defaultValue="zoom.us"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  //onChange={}
                />
                </form>
                </div>
              </FormContainer >
              <SubmitButton onClick={(event)=>{handleUpdate(event)}}>Update Meeting</SubmitButton>
              {redirect? <Redirect to={redirect}/>:null}
              <br/>
              <SubmitButton onClick={handleCencel}>Cencel Update</SubmitButton>
              {redirect? <Redirect to={redirect}/>:null}
              </BoxContainer>
           </StyledInnerContainer>
         <Footer />        
        </BackgroundFilter>
       </PageContainer>
    );
}

export default UpdateMeeting;
