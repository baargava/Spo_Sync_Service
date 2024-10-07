import './App.css';
import DataGrid from './Components/Table/OldDataGrid';
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import Download from './Screens/Download';
import Navbar from './Screens/Navbar';
import Footer from './Screens/Footer';
import React, { Suspense } from 'react';

const DataGrids = React.lazy(() => import('./Components/Table/OldDataGrid'))

function App() {
  return (
    <div className="flex flex-col min-h-screen App">
      <Suspense fallback={'LOADING.....'}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/datagrid' Component={DataGrids} />
            <Route path='/download' Component={Download} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
