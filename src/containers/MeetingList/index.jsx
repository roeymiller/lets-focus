import React,{useState} from "react";
import styled from "styled-components";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import {
  InnerPageContainer,
  PageContainer,
} from "../../components/pageContainer";
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import "chartjs-plugin-streaming";
import { Button, Container, IconButton } from "@material-ui/core";
import { DataGrid,GridToolbar } from "@material-ui/data-grid";
import { BrowserRouter as Router ,useHistory,Route,Link, Redirect } from "react-router-dom";
import { NewMeeting } from "./newMeeting";
import { SubmitButton } from "./common";
import axios from "axios";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useEffect } from "react";
import API from "../../API"
import { backend } from "@tensorflow/tfjs-core";
import UpdateMeeting from "./updateMeeting";
import PropTypes from "prop-types";
// Note: bash url: http://localhost:3002/api/'.


const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      color: 'black',
      maxWidth: '22ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
}));
  
  
const StyledInnerContainer = styled(InnerPageContainer)`
    margin-top: 2em;
`;



export function MeetingList() {
  let today = new Date().toISOString().slice(0, 10)
  let currentTime=new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit',hour12:false});
  const historymeetings = [];
  const futuremeetings = [];
  const [redirect, setRedirect] = useState('');
  const history = useHistory();
  
  const renderRows = () =>{

            arrmeetings.map((meeting,_id)=>{})
            return arrmeetings;
        
    }
    const renderfutureRows = () =>{

      arrmeetings.map((meeting,_id)=>{
        if(meeting.date>today || (meeting.date==today && meeting.time>=currentTime)){
          futuremeetings.push(meeting);
        }
      })
      return futuremeetings;
}
    const renderpastRows = () =>{
      arrmeetings.map((meeting,_id)=>{
        if(meeting.date<today || (meeting.date==today && meeting.time<currentTime)){
          historymeetings.push(meeting);
        }

      })
      return historymeetings;
}    
const [unmounted,setUnmounted ] = useState(false)
const renderButtons = (params) =>{
  const meetingId = params.row._id;
  const url = 'http://localhost:3002/api/updateMeeting/'.concat(meetingId);
  return (
    <strong>
      <IconButton 
        aria-label="delete"
        onClick = {(event)=>{
          HandleDelete(event, meetingId);
        }}
        >
        <DeleteIcon />
      </IconButton>
      <Link to={"updateMeeting/"+meetingId}><IconButton
        aria-label="Edit"
        onClick = {(event)=>{HandleEdit(event,meetingId);}
        }>
        <EditIcon/>
      </IconButton></Link>
    </strong>
  )
}

  const HandleDelete = async (event, meetingId) =>{
    setUnmounted(false);


    console.log("entered delete meeting");
    console.log(meetingId);
    const url = 'http://localhost:3002/api/meeting/'.concat(meetingId)
    console.log(url);
    if(window.confirm(
        `Do tou want to delete the product ${meetingId} permanently?`
      )){
      axios.delete(url,{meetingId}).then(res=>{

      if(res.status==201){
        console.log("delete meeting succeed");
        setRedirect('/meetinglist')

      }
    }).catch(err=>{
      console.log(err);
    })
  }
  reloadListData()


}    

  function HandleEdit(event,meetingId){
    console.log("entered edit meeting");
    console.log(meetingId);
    const url = 'http://localhost:3002/api/updatemeeting/'.concat(meetingId)
    console.log(url);
    event.preventDefault();
    history.push(`/updateMeeting/${meetingId}`);
    return <UpdateMeeting>Update</UpdateMeeting>;


  };   
  
  const [arrmeetings,setMeetingsarr] = useState([]);
    //todo: boolean flag for stop refrashing all the time
    //default value for date and time
    


    const handleRowClick = (param, event) => {
      history.push('/meeting/' + param.row._id)
    };


    const reloadListData = async ()=>{
              
        try {
          await API.getAllMeetings().then((response)=>{  
             const data = response.data;
             // console.log(data);
             setMeetingsarr(data);
             console.log("data has been recieved");
             setUnmounted(true);
           })
           .catch(()=>{
             alert('error retriving data');
           })
         
     } catch (error) {
         alert("error retriving data2")
     }
   }

    
    useEffect( () => {
        if(!unmounted){ 
           reloadListData()
        }
      

    }, [arrmeetings])

    const columns = [
    { field: 'name', headerName: 'Meeting Name', width: 200},
    { field: 'date', headerName: 'Date', width: 130},
    { field: 'time', headerName: 'Time', width: 130},
    { field: 'link', headerName: 'Meeting Link', width: 200},
    { field: '_id', headerName: 'Meeting ID', width: 200},
    { field:'', 
      headerName:'Actions', 
      width: 200,
      overflow: true,
      disableClickEventBubbling :true,
      renderCell: renderButtons ,
    }
  ];


    return (
      <PageContainer>
        <Navbar />
        <StyledInnerContainer>
          <div style={{display:"flex",flexDirection:"row",width:"90%"}}>
          <Link to="/NewMeeting"><SubmitButton 
            >New Meeting</SubmitButton></Link>
          </div>
      <div style={{ height: 300, width: '75%' }}>
        <label><b>Future Meetings:</b></label>
     
        <DataGrid rows={renderfutureRows()} columns={columns} onRowClick={(param)=>handleRowClick(param)} components={{Toolbar : GridToolbar,}} />

      </div>
      <Divider color="black" orientation="horizontal" flexItem />
      <br/>
      <br/>
      <br/>
      <div style={{ height: 300, width: '75%' }}>
      <label><b>Past Meetings:</b></label> 
        <DataGrid  rows={renderpastRows()} columns={columns} disableSelectionOnClick={true} onRowClick={(param)=>handleRowClick(param)} components={{Toolbar : GridToolbar,}} />
      </div>
      <br/>
      <br/>
      </StyledInnerContainer>
      <Footer />
      </PageContainer>
    );
  }
  


