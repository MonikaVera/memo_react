import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './pages/home-page/Home';
import SinglePlayerOptions from './pages/sp-modes-page';
import SinglePlayerGame from './pages/sp-game-page';
import SignIn from './pages/sign-in-page';
import './App.css';
import Register from './pages/register-page';
import { REGISTER, SINGLEPLAYERGAME, SINGLEPLAYERMODES, SIGNIN, HOME, PLAY, STATS, SPSTATS, MULTYPLAYERMODES, MPSTATS } from './config';
import Play from './pages/play-page';
import { AuthProvider } from './common/AuthContext';
import Stats from './pages/stats-page';
import SPStats from './pages/sp-stats-page';
import Navbar from './common/Navbar/Navbar';
import MultiPlayer from './pages/mp-modes-page/index';
import Leaderboard from './pages/mp-stats-page/index';
//npm start

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
            <Route 
              path={SIGNIN} 
              element={<SignIn/>} 
            />
            <Route 
              path={REGISTER} 
              element={<Register/>}
            />
            <Route 
              path={HOME}  
              element={<Home/>}
            />
            <Route path={PLAY}>
              <Route index={true} element={<Play/>}/>
              <Route path={SINGLEPLAYERMODES}>
                <Route index={true} element={<SinglePlayerOptions/>}/>
                <Route path = {SINGLEPLAYERGAME} element={ <SinglePlayerGame/>}/>
              </Route>
              <Route path={MULTYPLAYERMODES}>
                <Route index={true} element={<MultiPlayer/>}/>
              </Route>
            </Route>
            <Route path={STATS}>
              <Route index={true} element={<Stats/>}/>
              <Route path={MPSTATS} element={<Leaderboard/>}/>
              <Route path={SPSTATS} element={<SPStats />} />
            </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
