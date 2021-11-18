import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import Movement from './Components/Movement';
import Users from './Components/users'
import Login from './Components/login';



function App() {
  
  

  return (
 
    
    <Router>
        
    <header className=''>
   
          <ul className='flex border-red-600 border-2  max-w-screen flex-row-reverse z-2'>
            <li className='p-2'>
              <Link to="/">Home</Link>
            
            </li>
            <li className='p-2'>

              <Link to="/projects/api/projects">Projects</Link>
            </li>
            <li className='p-2'>

              <Link to="/login">Log in</Link>
            </li>
     
         
            </ul>
  
          
    </header>


        <Switch>
          <Route path="/projects/api/projects">
       
          <Movement />
         
           
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
         
          </Route>
        </Switch>
      
  
    </Router>
      

  );
}

export default App;
