import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";

import {StreamingPlugin, RealTimeScale} from "chartjs-plugin-streaming";
import './../App.css';

import moment from "moment";
import {useState,useEffect} from 'react';

const Chart = require("react-chartjs-2");

const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)"
};

//   console.log('t:',temp.dataFromServer)
const data = {
  datasets: [
    {
      label: "Temp set",
   
      borderColor: 'black',
      fill: true,
      lineTension: 0,
      borderDash: [8, 4],
      data: []
    }
  ]
};

function LiveChart({temp}) {
    
      console.log(temp)
      const options = {
        elements: {
          line: {
            tension: 4
          }
        },
        scales: {
          xAxes: [
            {
              type: "realtime",
              distribution: "linear",
              realtime: {
                onRefresh: function(chart) {
                    chart.data.datasets[0].data.push({
                        x:moment(),
                        y:temp
                    });
                    console.log('defined',chart.data.datasets[0].data)
                },
                // delay: 1000,
                time: {
                  displayFormat: "h:mm"
                }
              },
              ticks: {
                displayFormats: 2,
                maxRotation: 0,
                minRotation: 0,
                stepSize: 1,
                maxTicksLimit: 0,
                minUnit: "second",
                source: "auto",
                autoSkip: false,
                callback: function(value) {
                  return moment(value, "HH:mm:ss").format("mm:ss");
                }
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                max: 50
              }
            }
          ]
        }
      };
  return (
      

    <div className='bg-red-200  h-full  grid  items-center'>
      <Line data={data} options={options}   />
    </div>
      
  );
}

export default LiveChart;
