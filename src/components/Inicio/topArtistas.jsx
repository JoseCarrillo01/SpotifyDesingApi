import React, { Component } from 'react';
import axios from 'axios';
import Modal from '../songModal'; 

class TopContent extends Component {
  state = {
    topArtistasMexico: [],
    selectedArtist: null,
    isModalOpen: false,
  };

  headers = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      // Otros headers necesarios aquí
    },
  };

  componentDidMount() {
    this.getTopArtistasMexico();
  }

  getTopArtistasMexico = () => {
    axios.get('https://api.spotify.com/v1/browse/categories/regional_mexican/playlists?limit=1', this.headers)
      .then(response => {
        const playlistID = response.data.playlists.items[0].id;
        axios.get(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, this.headers)
          .then(response => {
            const tracks = response.data.items;
            const artistIds = tracks.map(item => item.track.artists[0].id);
            this.getArtistsDetails(artistIds);
          })
          .catch(error => {
            console.error('Error al obtener las canciones de la lista de reproducción:', error);
          });
      })
      .catch(error => {
        console.error('Error al obtener la lista de reproducción de artistas mexicanos:', error);
      });
  };

  getArtistsDetails = artistIds => {
    const artistRequests = artistIds.map(artistId =>
      axios.get(`https://api.spotify.com/v1/artists/${artistId}`, this.headers)
    );

    axios.all(artistRequests)
      .then(axios.spread((...responses) => {
        const artistDetails = responses.map(response => response.data);
        this.setState({ topArtistasMexico: artistDetails });
      }))
      .catch(error => {
        console.error('Error al obtener detalles de los artistas:', error);
      });
  };

  handleArtistClick = artist => {
    this.setState({ selectedArtist: artist, isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ selectedArtist: null, isModalOpen: false });
  };

  render() {
    const { topArtistasMexico, selectedArtist, isModalOpen } = this.state;

    return (
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Artistas populares en México</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {topArtistasMexico.map(artista => (
              <div key={artista.id} className="group relative" onClick={() => this.handleArtistClick(artista)}>
                {artista.images && artista.images.length > 0 && (
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={artista.images[0].url}
                      alt={artista.name}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                )}
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700 cursor-pointer">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {artista.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {selectedArtist !== null && (
            <Modal show={isModalOpen} onClose={this.closeModal} artist={selectedArtist} />
          )}
        </div>
      </div>
    );
  }
}

export default TopContent;
