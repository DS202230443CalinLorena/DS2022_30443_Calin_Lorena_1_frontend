import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import ListDevices from './pages/ListDevices';
import ListUsers from './pages/ListUsers';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddDevice from './devices/AddDevice';
import UpdateDevice from './devices/UpdateDevice';
import ViewDevice from './devices/ViewDevice';
import Administrator from './pages/Administrator';
import AddUser from './users/AddUser';
import UpdateUser from './users/UpdateUser';
import ViewUser from './users/ViewUser';
import ListDevicesByUser from './pages/ListDevicesByUser';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/admin" element={<Administrator/>}/>
          <Route exact path="/devices" element={<ListDevices/>}/>
          <Route exact path="/users" element={<ListUsers/>}/>
          <Route exact path="/adddevice" element={<AddDevice/>}/>
          <Route exact path="/adduser" element={<AddUser/>}/>
          <Route exact path="/editdevice/:deviceId" element={<UpdateDevice/>}/>
          <Route exact path="/edituser/:userId" element={<UpdateUser/>}/>
          <Route exact path="/viewdevice/:deviceId" element={<ViewDevice/>}/>
          <Route exact path="/viewuser/:userId" element={<ViewUser/>}/>
          <Route exact path="/user-devices/:userId" element={<ListDevicesByUser/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
