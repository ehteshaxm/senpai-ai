import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { storage } from '../firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const Episode = ({ name, date, emoji, url }) => {
  const [loaded, setLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [loading, setLoading] = useState(false);

  const PlayRef = useRef();
  const { user, signIn } = useAuth();

  async function playAudio() {
    if (user === null) {
      return signIn();
    }

    setLoading(true);

    // Get a reference to the audio file in Firebase Storage
    const audioRef = ref(storage, `episodes/${url}`);

    // Get the download URL for the audio file
    getDownloadURL(audioRef)
      .then((url) => {
        // Create a new Audio object using the download URL
        // audio = new Audio(url);
        PlayRef.current.setAttribute('src', url);

        // Play the audio
        PlayRef.current.play();

        setLoading(false);
        setIsPaused(false);
        setLoaded(true);
      })
      .catch((error) => {
        console.error('Error getting download URL:', error);
      });
  }

  function managePlay() {
    PlayRef.current.play();
    setIsPaused(false);
  }

  function managePause() {
    PlayRef.current.pause();
    setIsPaused(true);
  }

  function handleEnd() {
    setIsPaused(true);
  }

  console.log(PlayRef);

  return (
    <div
      className='w-full bg-gray-100 border rounded-xl p-5 px-7 flex justify-between items-center my-2 transition md:hover:scale-105'
      onClick={() => {
        if (user === null) {
          signIn();
        }
      }}
    >
      <audio ref={PlayRef} onEnded={handleEnd} />
      <div className='flex items-center'>
        {loading === true ? (
          <div className='rounded-full md:p-3 p-2 mr-4 bg-green-300 cursor-pointer hover:bg-green-400'>
            <div className='bg-gray-600 animate-pulse p-1 rounded-full'></div>
          </div>
        ) : isPaused ? (
          <div
            className='rounded-full md:p-3 p-2 mr-4 bg-green-300 cursor-pointer hover:bg-green-400'
            onClick={() => {
              if (loaded === false) {
                playAudio();
              } else {
                managePlay();
              }
            }}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path
                fillRule='evenodd'
                d='M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        ) : (
          <div
            className='rounded-full md:p-3 p-2 mr-4 bg-green-300 cursor-pointer hover:bg-green-400'
            onClick={managePause}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path
                fillRule='evenodd'
                d='M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        )}

        <div>
          <p className='font-black leading-tight text-md md:text-2xl'>{name}</p>
          <p className='text-xs mt-1 md:mt-0 md:text-base'>{date}</p>
        </div>
      </div>
      <div className='text-3xl md:text-5xl'>{emoji}</div>
    </div>
  );
};

export default Episode;
