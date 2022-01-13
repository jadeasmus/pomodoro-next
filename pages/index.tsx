import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'

import Timer from '../src/components/Timer'
import { supabase } from '../utils/supabase'

/*
  Handles spoify login and display of timer and player components
*/

interface Playlist { 
  collaborative: boolean, 
  description: string, 
  external_urls: {},
  href: string,
  id: string,
  images: [],
  name: string,
  owner: {}, 
  primary_color: null,
  public: boolean,
  snapshot_id: string,
  tracks: {href:string, total:number},
  type: string,
  uri: string
}

interface Item { 
  added_at: string,
  added_by: {},
  is_local: boolean,
  primary_color: null,
  track: Track,
  video_thumbnail: {}
}

interface Track { 
  album: {},
  artists: [],
  available_markets: {},
  disc_number: number,
  duration_ms: number,
  episode: boolean,
  explicit: boolean,
  external_ids: {},
  external_urls: {},
  href: string,
  id: string,
  is_local: boolean,
  name: string,
  popularity: number,
  preview_url: string,
  track: boolean,
  track_number: number,
  type: string,
  uri: string
}


export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [playlistData, setPlaylistData] = useState<Playlist[]>([])
  const [tracksEndpoint, setTracksEndpoint] = useState<string>('')
  const [tracks, setTracks] = useState<Item[]>([]) 
  const [trackURIs, setTrackURIs] = useState<string[]>([])

  const logged = supabase.auth.user()
  // console.log('user: ', logged)
  const provider_token = supabase.auth.session()?.provider_token
  // const refresh_token = supabase.auth.session()?.refresh_token

  const playlists_endpoint = 'https://api.spotify.com/v1/me/playlists'

  useEffect(() => {
    axios.get(playlists_endpoint, {
      headers: {
        Authorization: `Bearer ${provider_token}`,
      },
    })
    .then(response => {
      setPlaylistData(response.data.items)
      // console.log('data: ', response.data.items)
    })
    .catch(error => {
      console.log(error)
    })

    
  }, [logged]);
  
  useEffect(() => {
    setIsLoggedIn(supabase.auth.user() ? true : false)
  }, [logged])

  const handleTracks = (e: any) => {
    const key = e.target.textContent

    // if name param of obj is e, then grab that object's tracks
    playlistData.filter(obj => {
      obj.name===e.target.textContent ?
        // console.log(obj.tracks)
        setTracksEndpoint(obj.tracks.href)
        :
        null  
    })

    // make call with endpoint
    axios.get(tracksEndpoint, {
      headers: {
        Authorization: `Bearer ${provider_token}`
      },
    })
    .then(response => {
      // console.log(response)
      setTracks(response.data.items)
      // console.log(tracks)

    })
    .catch(error => {
      console.log(error)
    })

    
  }
  
  // useEffect(() => {
  //   // check that each song is being read and that the song match playlist chosen
  //   tracks.map(obj => {
  //     console.log(obj.track.uri, obj.track.name)
  //   })
    
  //   // store track uri's
  //   tracks.map(obj => {
  //     setTrackURIs(trackURIs.concat(obj.track.uri))
  //   })

  //   console.log('uris: ', trackURIs)

  // }, [tracks])
  
  // console.log(playlistData)

  return (
    <div>
      {/* Login button */}
      <div className="absolute top-8">
        <Link href='/login'>
          {isLoggedIn ? 
            <svg className="cursor-pointer fill-green-glow" xmlns="http://www.w3.org/2000/svg" height="80" width="270" viewBox="-33.4974 -55.829 290.3108 334.974"><path d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0"/></svg>
          :
            <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="80" width="270" viewBox="-33.4974 -55.829 290.3108 334.974"><path d="M177.707 98.987c-35.992-21.375-95.36-23.34-129.719-12.912-5.519 1.674-11.353-1.44-13.024-6.958-1.672-5.521 1.439-11.352 6.96-13.029 39.443-11.972 105.008-9.66 146.443 14.936 4.964 2.947 6.59 9.356 3.649 14.31-2.944 4.963-9.359 6.6-14.31 3.653m-1.178 31.658c-2.525 4.098-7.883 5.383-11.975 2.867-30.005-18.444-75.762-23.788-111.262-13.012-4.603 1.39-9.466-1.204-10.864-5.8a8.717 8.717 0 015.805-10.856c40.553-12.307 90.968-6.347 125.432 14.833 4.092 2.52 5.38 7.88 2.864 11.968m-13.663 30.404a6.954 6.954 0 01-9.569 2.316c-26.22-16.025-59.223-19.644-98.09-10.766a6.955 6.955 0 01-8.331-5.232 6.95 6.95 0 015.233-8.334c42.533-9.722 79.017-5.538 108.448 12.446a6.96 6.96 0 012.31 9.57M111.656 0C49.992 0 0 49.99 0 111.656c0 61.672 49.992 111.66 111.657 111.66 61.668 0 111.659-49.988 111.659-111.66C223.316 49.991 173.326 0 111.657 0"/></svg> 
          }
          
        </Link>
      </div>


      {/* Timer component */}
      <Timer />

      {/* Choose playlist */}
      <div className="relative">
        <div className="fixed mt-10 left-1/3 ml-32 w-96 bg-blue-400 p-3 rounded h-1/2 overflow-auto">
        <h1 className="font-bold mt-2 mb-4 text-white text-center">Choose a playlist to listen to</h1>
          {playlistData ? 
            playlistData.map((obj) => 
              <button onClick={(event) => handleTracks(event)} className="flex mx-auto bg-white py-3 m-2 px-4 w-full rounded">{ obj.name }</button>
            ) 
          : 
            null 
          } 
        </div>
      </div>

    
    </div>
  )
}

// export const getServerSideProps = async () => {
//   const data = await fetch('https://api.spotify.com/v1/me/playlists',
//   {
//     headers: {
//       Authorization: `Bearer ${supabase.auth.session()?.provider_token}`
//     }
//   })
//   .then(response => response.json())

//   console.log(data)

//   return { 
//     props: {
//       playlists: data
//     }
//   }
// }