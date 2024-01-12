import React, { Component } from "react";
import Global from "../../Global/Global";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen, faHeart } from '@fortawesome/free-solid-svg-icons'
import Header from "../header/Header";
import { Navigate } from "react-router-dom";
import { getRefreshedAccesToken } from "../../utils";
import topArtists from "../Inicio/topArtistas";


export default class Playlists extends Component {

  // searchParams = new URLSearchParams(window.location.search);
  // access_token = this.searchParams.get("access_token");

  access_token = localStorage.getItem('access_token');
  nombreUsuario = localStorage.getItem('user_id');



  state = {
    playlists: [],
    playlistsPublicas: [],
    playlistsPrivadas: [],
    playlistsSeguidas: [],
    statusPlay: false,
    statusLoading: false,
    total: 0,
    songs: [],
    songsText: [],
    statusSong: false,
    imgP: "",
    nombreP: "",
    nombreUsuario: ""
  }

  headers = {
    headers: {
      "Authorization": "Bearer " + this.access_token
    }
  }

  componentDidMount = () => {

    // console.log("en playlist: "+Global.access_token)
    this.getUsuario()
    this.getListas()
    getRefreshedAccesToken();
  }

  getUsuario = () => {
    axios.get("https://api.spotify.com/v1/me", this.headers).then(response => {
      const nombre = response.data.id
      this.setState({
        nombreUsuario: nombre
      })

    })
  }

  offsetPlaylist = 0;
  getListas = () => {
    axios.get("https://api.spotify.com/v1/me/playlists?limit=" + Global.playlistLimit + "&offset=" + this.offsetPlaylist + "", this.headers).then(response => {
      const datos = response.data
      // console.log(datos);
      var totalListas = (datos.total)
      // BUCLE
      if (this.offsetPlaylist < totalListas) {

        for (var i = 0; i < datos.items.length; i++) {
          this.state.playlists.push(datos.items[i])
          if (datos.items[i].public === true) {
            this.state.playlistsPublicas.push(datos.items[i])
          }
          if (datos.items[i].public === false && datos.items[i].owner.display_name === this.state.nombreUsuario) {
            this.state.playlistsPrivadas.push(datos.items[i])
          }
          if (datos.items[i].owner.display_name !== this.nombreUsuario) {
            this.state.playlistsSeguidas.push(datos.items[i])
          }
        }
        this.offsetPlaylist += Global.playlistLimit;
        this.getListas()

      }
      else {
        this.setState({
          playlists: this.state.playlists,
          playlistsPrivadas: this.state.playlistsPrivadas,
          playlistsPublicas: this.state.playlistsPublicas,
          playlistsSeguidas: this.state.playlistsSeguidas,
          statusPlay: true,
          totalListas: totalListas,
        })
      }
    })
  }




  offsetSongs = 0;
  auxSongs = [];
  getCanciones = (playlist) => {
    const id = playlist.id
    const total = playlist.tracks.total

    this.setState({
      statusSong: false,
      statusLoading: true,
    })

    if (total !== 0) {


      this.setState({
        imgP: playlist.images[0].url,
        nombreP: playlist.name
      })

      axios.get("https://api.spotify.com/v1/playlists/" + id + "/tracks?limit=" + Global.songLimit + "&offset=" + this.offsetSongs + "", this.headers).then(response => {
        // console.log(total);



        if (this.offsetSongs < total) {
          const datos = response.data
          // console.log(datos);
          for (var i = 0; i < datos.items.length; i++) {

            var artists = "";
            if (datos.items[i].track.artists.length === 1) {
              artists = datos.items[i].track.artists[0].name
            } else {
              for (var s = 0; s < datos.items[i].track.artists.length; s++) {
                if (s > 0) {
                  artists += ", " + datos.items[i].track.artists[s].name;
                }
                artists += datos.items[i].track.artists[s].name;
              }
            }

            var album = datos.items[i].track.album.name

            var duration = datos.items[i].track.duration_ms;
            var min = Math.floor((duration / 1000 / 60) << 0);
            var sec = Math.floor((duration / 1000) % 60);

            if (sec.toString().length === 1) {
              sec = "0" + sec;
            }

            function convertMsToMinutesSeconds(durationInMs) {
              const minutes = Math.floor(durationInMs / 60000);
              const seconds = ((durationInMs % 60000) / 1000).toFixed(0);
              return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
            }
            

            this.auxSongs.push(
              <div className="bg-white">
              <div className="max-w-7xl mx-auto overflow-hidden sm:px-6 lg:px-8">
                <h2 className="sr-only">Songs</h2>
            
                <div className="-mx-px border-l border-gray-200 grid grid-cols-2 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                  {datos.items.map((item, i) => (
                    <div key={item.track.id + i} className="group relative p-4 border-r border-b border-gray-200 sm:p-6">
                      <div className="rounded-lg overflow-hidden bg-gray-200 aspect-w-1 aspect-h-1 group-hover:opacity-75">
                        <a href={item.track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                          <img
                            src={item.track.album.images[0].url}
                            alt={item.track.name}
                            className="w-full h-full object-center object-cover"
                          />
                        </a>
                      </div>
                      <div className="pt-10 pb-4 text-center">
                        <h3 className="text-sm font-medium text-gray-900">
                          <a href={item.track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {item.track.name}
                          </a>
                        </h3>
                        <div className="mt-3 flex flex-col items-center">
                          <p className="text-sm text-gray-500">{item.track.artists.map(artist => artist.name).join(', ')}</p>
                          <p className="text-sm text-gray-500">{item.track.album.name}</p>
                          <p className="mt-2 text-sm text-gray-500">{convertMsToMinutesSeconds(item.track.duration_ms)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
              
            )
          }


          this.offsetSongs += Global.songLimit;
          this.getCanciones(playlist)


        } else {
          //ACABA DE AÑADIR TODAS LAS CANCIONES
          this.offsetSongs = 0;
          this.contCanciones = 0;

          this.setState({
            songs: this.auxSongs,
            songsText: this.auxSongs,
            statusSong: true,
            statusLoading: false,
          })
          this.auxSongs = [];
        }

      })
    }

  }


  // *RENDER
  render() {

    if (this.access_token === null) {
      return (<Navigate to="/" />)
    }


    return (
      <div>
        <Header seleccion="playlists" />
        <div className="general">
          <div className="playlists row mx-lg-5 mx-3">
            <div className=" col-sm-12 col-md-3 col-lg-3 p-0">
              <div className="totalPlaylists">
                <h1 className="numeroListas">PLAYLISTS: {this.state.totalListas}</h1>
              </div>
         

              <nav className="h-full overflow-y-auto" aria-label="Directory">
              <div className="listas">
  {this.state.playlists.map((playlist, index) => (
    <div key={playlist.id + index} className="relative">
      <button
        data-plistid={playlist.id}
        onClick={() => this.getCanciones(playlist)}
        className="btnPlist font-bold	 text-base	  bg-white relative px-6 py-5 flex items-center space-x-3 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
      >
        {/* Agregar imagen de la playlist */}
        <img
          className="h-20 w-20 rounded-sm	 mx-1	"
          src={playlist.images[0].url} 
          alt={`Imagen de ${playlist.name}`} // Alt para accesibilidad
        />
        {/* Texto de la playlist */}
        {playlist.name === "" ? "Sin Nombre" : playlist.name}
      </button>
    </div>
  ))}
</div>

</nav>



            </div>
            
            {
              (this.state.statusSong === true) ?
                (
                  <div className="canciones p-0 col-sm-12 col-md-9 col-lg-9">
                    <div className="flex m-3 items-center	">
                      <img className="w-20 rounded h-20 object-center object-cover group-hover:opacity-75"
                       src={this.state.imgP} alt=""></img>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{this.state.nombreP}</dd>
                    </div>
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                   
                          {this.state.songsText}
                    
                    </div>
                  </div>
                ) :
                (this.state.statusLoading === true) ?
                  (
                    <div className="canciones col-sm-12 col-md-9 col-lg-9">
                      <div className="load">
                        <h1>CARGANDO...</h1>
                        <div className="mx-auto carga"></div>
                      </div>
                    </div>
                  ) :
                  (
                    <div className="canciones p-0 col-sm-12 col-md-9 col-lg-9">
                      <div className="noSongs">
                        <h1>NO HAS SELECIONADO UNA PLAYLIST</h1>
                      </div>
                    </div>
                  )
            }

          </div>
        </div>
      </div>
    );
  }
}
