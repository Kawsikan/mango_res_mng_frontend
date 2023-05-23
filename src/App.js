import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Signup from './pages/Signup';
// import Login from './pages/Login';
// import Home from './pages/Home';
// import Reservation from './pages/Reservation';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Reservation = lazy(() => import('./pages/Reservation'));


const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reservation" element={<Reservation />} />
      </Routes>
    </Suspense>
  </Router>
);

export default App;