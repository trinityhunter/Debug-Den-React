import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import Navbar from './components/Navbar/Navbar';
// import NavbarMUI from './components/Navbar/NavbarMUI';
import AllRoutes from './AllRoutes';
import { fetchAllQuestions } from './actions/question'
import { fetchAllUsers } from './actions/users';

function App() {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])
  

  return (
    <div className="App">
      <Router>
        <Navbar/>
        {/* <NavbarMUI/> */}

        <AllRoutes/>
      </Router>
    </div>
  );
}

export default App;
