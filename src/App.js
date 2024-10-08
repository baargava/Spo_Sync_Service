import './App.css';
import DataGrid from './Components/Table/OldDataGrid';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import Download from './Screens/Download';
import Navbar from './Screens/Navbar';
import Footer from './Screens/Footer';
import navconfig from './Config/navConfig.json'


function App() {
  return (
    <div className="flex flex-col min-h-screen App">
      <BrowserRouter>
        <Navbar navconfig={navconfig} />
        <Routes>
          <Route path='/' Component={Home} />
          <Route path='/datagrid' Component={DataGrid} />
          <Route path='/download' Component={Download} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
