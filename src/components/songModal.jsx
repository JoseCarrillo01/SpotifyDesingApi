import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Modal = ({ show, onClose, artist }) => {
  const [isOpen, setIsOpen] = useState(show);
  const [artistTopTracks, setArtistTopTracks] = useState([]);

  useEffect(() => {
    const getTopTracks = async () => {
      try {
        if (artist) {
          const response = await axios.get(`https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
              // Otros headers necesarios aquí
            },
          });

          setArtistTopTracks(response.data.tracks.slice(0, 5));
        }
      } catch (error) {
        console.error('Error al obtener las canciones del artista:', error);
      }
    };

    getTopTracks();
  }, [artist]);

  const closeModal = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <div className={`fixed z-10 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <span className="close absolute top-0 right-0 p-3 cursor-pointer" onClick={closeModal}>
              &times;
            </span>
            {artist && (
              <div>
                {artist.images && artist.images.length > 0 && (
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="w-full h-full object-cover mb-4 rounded-md"
                  />
                )}
                <h2 className="text-2xl font-bold mb-2">{artist.name}</h2>
                {artistTopTracks && artistTopTracks.length > 0 && (
                  <div className="grid grid-cols-1 gap-4">
                    {artistTopTracks.map((track, index) => (
                      <div key={track.id} className="flex items-center">
                        <span className="font-bold">{index + 1}.</span>
                        <iframe
                          title={`Spotify Track ${track.name}`}
                          src={`https://open.spotify.com/embed/track/${track.id}`}
                          width="300"
                          height="80"
                          frameBorder="0"
                          allowtransparency="true"
                          allow="encrypted-media"
                          className="ml-2 w-full"
                        ></iframe>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
