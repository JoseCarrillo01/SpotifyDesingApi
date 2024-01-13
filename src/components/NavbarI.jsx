import React, { Component } from "react";
import axios from "axios";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import classNames from "classnames";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


export default class Navbar extends Component {
  
  // *CERRAR SESION
  cerrarSesion = () => {
    // Limpia los datos almacenados localmente
    localStorage.clear();
    
    // Obtén la función de navegación
    const navigate = useNavigate();
    
    // Redirige al usuario a la ruta '/'
    navigate('/');
  };


    render() {


        
    return (
        <Disclosure as="nav" className="bg-white changesNav">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="data:image/png;base64,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" 
                      alt="Logo"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="data:image/png;base64,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"
                      alt="Logo"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                    <a
                      href="/inicio"
                      className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Inicio
                    </a>
                    <a
                      href="/playlists"
                      className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                    >
                      Musica
                    </a>
                         
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
    
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvuD5LDgX_fHDySDeccC7a1bSX7zdUgFNjLw&usqp=CAU"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
  {({ active }) => (
    <a
      href="#"
      onClick={this.cerrarSesion}
      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
    >
      Sign out
    </a>
  )}
</Menu.Item>

                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
    
            <Disclosure.Panel className="sm:hidden">
              <div className="pt-2 pb-4 space-y-1">
                {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
                <Disclosure.Button
                  as="a"
                  href="/inicio"
                  className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Inicio
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/playlists"
                  className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                >
                  Playlist
                </Disclosure.Button>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    );
  }
}