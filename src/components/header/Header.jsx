import React, { Component } from "react";
import axios from "axios";
import "./Header.css";
import { Link, Navigate } from "react-router-dom";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imgLogin from "../../assets/images/logo.png";

export default class Header extends Component {
  // searchParams = new URLSearchParams(window.location.search);
  // access_token = this.searchParams.get("access_token");
  access_token = localStorage.getItem("access_token");

  state = {
    dataPerfil: [],
    statusPerf: false,
    user: "",
    user2: "",
    seleccionPlaylists: "",
    seleccionEstadisticas: "",
  };

  componentDidMount = () => {
    // this.cambiarSeleccion()
    this.datosUsuario();
  };

  // *CAMBIAR MENU
  // cambiarSeleccion = () => {
  //     if(this.props.seleccion === "playlists"){
  //         this.setState({
  //             seleccionPlaylists:"active col-lg-3 col-md-3 col-6"
  //         })
  //     }else{
  //         this.setState({
  //             seleccionPlaylists:"col-lg-3 col-md-3 col-6"
  //         })
  //     }

  //     if(this.props.seleccion === "estadisticas"){
  //         this.setState({
  //             seleccionEstadisticas:"active col-lg-3 col-md-3 col-6"
  //         })
  //     }else{
  //         this.setState({
  //             seleccionEstadisticas:"col-lg-3 col-md-3 col-6"
  //         })
  //     }
  // }

  // *DATOS DE USUARIO
  datosUsuario = () => {
    const headers = {
      headers: {
        Authorization: "Bearer " + this.access_token,
      },
    };
    axios.get("https://api.spotify.com/v1/me", headers).then((response) => {
      const datos = response.data;
      // console.log(datos);
      localStorage.setItem("user_id", datos.id);

      this.setState({
        dataPerfil: datos,
        statusPerf: true,
      });
    });
  };

  // *CERRAR SESION
  cerrarSesion = () => {
    localStorage.clear();
    return <Navigate to="/" />;
  };

  // * ===============================================================================================
  render() {
    return (
      <div className="general mb-4">
        <div>
          <div>
            <img
              className="h-32 w-full object-cover lg:h-48"
              src="https://www.noroeste.com.mx/binrepository/2000x1334/0c0/0d0/none/12707/UAIM/5_1-3079811_20221205093027.jpg"
              alt=""
            />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="flex">
                <img
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvuD5LDgX_fHDySDeccC7a1bSX7zdUgFNjLw&usqp=CAU"
                  alt=""
                />
              </div>
              <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="sm:hidden md:block mt-6 min-w-0 flex-1">

       
                                
                  <h1 className="text-2xl font-bold text-gray-900 truncate">


                  {this.state.dataPerfil.display_name}
                  </h1>
                </div>
                <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                  {this.state.statusPerf === true && (
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      onClick={this.cerrarSesion}
                    >
                      
                      <Link to="/">
                        <span>Cerrar Sesion</span>
                      </Link>
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate">
                Jose
              </h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
