
import './App.css';
import { w3cwebsocket as w3s } from "websocket";
import {useState, useEffect} from 'react';
import LiveChart from './Components/Charts'
import moment from 'moment';


const client = new w3s('ws://localhost:3000');
function App() {
  const [temp,setTemp] = useState();
  client.onopen = ()=>{
    console.log('websocket client connected')
  }
  client.onmessage = (message)=>{
    
    const dataFromServer = JSON.parse(message.data);
    const mom = {
      x: moment(),
      y: temp
    }
  
    setTemp(dataFromServer);
    
  }
  console.log(temp)
  return (
    <div className="App">
      That's the {temp}.
        <LiveChart props={temp} />
   
    </div>
  );
}

export default App;
