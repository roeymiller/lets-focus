// import React from "react";
// import { Line } from "react-chartjs-2";
// import "chartjs-plugin-streaming";
// var createReactClass = require("create-react-class");

// const data = {
//   datasets: [
//     {
//       label: "Dataset",
//       borderColor: "rgb(255, 99, 132)",
//       backgroundColor: "rgba(255, 99, 132, 0.5)",
//       lineTension: 0,
//       borderDash: [8, 4],
//       data: []
//     }
//   ]
// };

// const options = {
//   scales: {
//     xAxes: [
//       {
//         type: "realtime",
//         realtime: {
//           onRefresh: function() {
//             data.datasets[0].data.push({
//               x: Date.now(),
//               y: Math.random() * 100
//             });
//           },
//           delay: 2000
//         }
//       }
//     ]
//   }
// };

// export default createReactClass({
//   render() {
//     return (
//       <div>
//         <Line data={data} options={options} />
//       </div>
//     );
//   }
// });
