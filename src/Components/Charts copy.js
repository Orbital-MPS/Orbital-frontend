import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import './../App.css';
import moment from "moment";
import {useState,useEffect} from 'react';

const Chart = require("react-chartjs-2").Chart;



function LiveChart({temp}) {
    
    // const [temperature,setTemperature]= useState(null);s
    // setTemperature(temp)
    // useEffect(() => {
        
    // }, [])
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
         
            borderColor: chartColors.blue,
            fill: true,
            lineTension: 0,
            borderDash: [8, 4],
            data: []
          }
        ]
      };
      
      const options = {
        elements: {
          line: {
            tension: 1
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
                max: 30
              }
            }
          ]
        }
      };
  return (
      <div className="Container">

    <div className="App">
      <Line data={data} options={options} />
    </div>
      </div>
  );
}

export default LiveChart;
