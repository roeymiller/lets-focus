import React,{useState} from "react";
import styled from "styled-components";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import {
  InnerPageContainer,
  PageContainer,
} from "../../components/pageContainer";
import { useParams } from "react-router-dom";

import { useRef, useEffect } from "react";
// import "./App.css";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "./utilities";
import { Progress } from "../../components/chartLive/progress";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";


const StyledInnerContainer = styled(InnerPageContainer)`
  margin-top: 4em;
`;

export function CamPage() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);


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
                  onRefresh: function() {
                   
                  },
                  delay: 2000
                }
      }
    ]
  }
};

  //  Load posenet
  const runFacemesh = async () => {
    const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
    setInterval(() => {

      detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make Detections
      const face = await net.estimateFaces({input:video});
      // console.log(face);

      if(face.length > 0){
        face.forEach((f) => {
          if(-5>f.annotations.leftEyeLower0[0][2]) {
            console.log("NOT FOCUS! looking right....");
          }
          else if(20<f.annotations.leftEyeLower0[0][2]) {
            console.log("NOT FOCUS! looking left....");
          }
          else if(-5<f.annotations.leftEyeLower0[0][2]) {
            console.log("YOU ARE FOCUS! looking stright");
          }

          else if(20>f.annotations.leftEyeLower0[0][2]) {
            console.log("YOU ARE FOCUS! looking stright");
          }

          data.datasets[0].data.push({
            x: Date.now(),
            y: nirmol(f.annotations.leftEyeLower0[0][2])
          });
          
        })
      };
       
      // Get canvas context
      const ctx = canvasRef.current.getContext("2d");
      requestAnimationFrame(()=>{drawMesh(face, ctx)});


    }
  };

  //Normalization furmula
  const nirmol = (results) =>{
    results = (((results + 5) / 35) * 10) ;
    if(results > 5)
    {
      results = results + (2*(5 - results)) - 1.5;
    }
    // console.log(results);

    return (results);
  }

  useEffect(()=>{runFacemesh()}, []);

  return (
    <PageContainer>
    <Navbar />
    {/* <Progress done={data}/> */}

    <StyledInnerContainer>

    <div className="App">
      <header className="App-header">

      <Webcam
          ref={webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        /> 

      </header>

    </div>
    <Line data={data} height={'50%'} options={options} />

    </StyledInnerContainer>
    <Footer />
  </PageContainer>

 
  );
}

export default CamPage;
