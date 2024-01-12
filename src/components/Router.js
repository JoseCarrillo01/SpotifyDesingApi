import React from 'react';
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import Login from './login/Login';
import Playlists from './playlists/Playlists';
import Navbar from './NavbarI';
import TopArtists from './Inicio/topArtistas';

export default function Router() {
  return (
    <BrowserRouter>
      <Navbar /> {/* Navbar está presente en todas las rutas */}
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<Login />} />
          <Route path="/inicio" element={<TopArtists />} />
          <Route path="/playlists" element={<Playlists />} />
          {/* Otras rutas que puedas tener */}
          <Route path="*" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
