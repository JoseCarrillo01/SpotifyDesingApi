import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import imgLogin from "../../assets/images/logo.png";
import Global from "../../Global/Global";
import "./Login.css";

const spoty_url = `https://accounts.spotify.com/authorize?client_id=${Global.client_id}&response_type=code&redirect_uri=${Global.redirect_uri}&scope=${Global.scopes}`;

export default function Login() {

    const location = useLocation();
    let navigate = useNavigate();


    useEffect(() => {

        const urlParams = new URLSearchParams(location.search)
        const spotyCode = urlParams.get("code");
        if (spotyCode) {
            autenticateUser(spotyCode)
        }
    })

    const autenticateUser = (spotyCode) => {

        try {
            const searchParams = new URLSearchParams({
                code: spotyCode,
                grant_type: "authorization_code",
                redirect_uri: Global.redirect_uri,
                client_id: Global.client_id,
                client_secret: Global.client_secret,
            });

            axios.post("https://accounts.spotify.com/api/token", searchParams).then(res => {
                localStorage.setItem('access_token', res.data.access_token);
                localStorage.setItem('refresh_token', res.data.refresh_token);
                navigate("/playlists");
            })
        } catch (error) {
            console.log(error);
        }


    }

    function login() {
        window.location.replace(spoty_url);
    };


    return (
        <div className="general" >
              <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto m-0	">
        <div className="m-0	 relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
            <img src={imgLogin} className="logoImg" id="imgLogo" alt="" />
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Spotify</span>{' '} <br />
                <span className="block text-indigo-600 xl:inline">Listas de reproduccion</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
              Visualiza toda la información de tu perfil de Spotify
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">

                <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                    href="#"  onClick={login} id="btnLogin" 
                    className="  w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Iniciar Sesion
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute m-0	 lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://www.noroeste.com.mx/binrepository/2000x1334/0c0/0d0/none/12707/UAIM/5_1-3079811_20221205093027.jpg"
          alt=""
        />
      </div>
    </div>
            
        </div>



    );
}
