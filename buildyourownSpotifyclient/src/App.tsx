import { useState, useEffect } from 'react'
import './App.css'
import type {ProfileData, PlaylistData} from './types.ts'

const clientId = '60ff40a659e340c683ceba3cd2b58e90'
const redirectUrl = 'http://localhost:5173'
const BASE_URL = "https://accounts.spotify.com"
const authUrl = new URL("https://accounts.spotify.com/authorize")

const CV_LENGTH = 86 //code verifier length
const SCOPE = 'user-read-private user-read-email' //enabled access scopes

//spotify boilerplate
function generateCodeVerifier(len: number){
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const values = crypto.getRandomValues(new Uint8Array(len));
  return values.reduce((acc, y)=>acc + possible[y % possible.length], "")
}

async function generateCodeChallenge(plaintext: string){
  const encoder = new TextEncoder();
  const data = encoder.encode(plaintext)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode(...new Uint8Array(digest))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

async function getToken(code: string): Promise<string | null> {
  const url = "https://accounts.spotify.com/api/token";
  const code_verifier = window.localStorage.getItem('code_verifier')
  if(!code_verifier){return null;}
  console.log(code_verifier)
  const params = {
    grant_type: 'authorization_code', 
    code: code, 
    redirect_uri: redirectUrl, 
    client_id: clientId, 
    code_verifier: code_verifier,
  }
  const body = await fetch(url, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }, 
    body: new URLSearchParams(params), 
  })
  const response = await body.json(); 
  if(body.status === 200){
    const {access_token} = response;
    localStorage.setItem('access_token', access_token)
    return access_token
  }
  return null;
}

async function getProfile(access_token: string): Promise<ProfileData> {
  const response = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + access_token
    }, 
  });
  return response.json();
}


async function getAllPlaylists(access_token: string): Promise<PlaylistData>{
  const body = await fetch('https://api.spotify.com/v1/me/playlists', {
    method: "GET", 
    headers: {
      'Authorization': 'Bearer ' + access_token
    }, 
  });
  const response: PlaylistData = await body.json()
  console.log(body.status)
  return response;
}


async function getPlaylist(playlist_id: number){
  const body = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
    method: "GET"
  });
  return body.json();
}


function App() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [playlists, setPlaylists] = useState<any>([])
  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (code) {
        const tok = await getToken(code);
        if (tok) {
          const data = await getProfile(tok);
          setProfileData(data);
          const res = await getAllPlaylists(tok);
          setPlaylists(res.items)
        }
      } else {
        const codeVerifier = generateCodeVerifier(CV_LENGTH);
        const codeChallenge = await generateCodeChallenge(codeVerifier);
        window.localStorage.setItem('code_verifier', codeVerifier);
        
        const params = {
          client_id: clientId, 
          response_type: 'code',
          redirect_uri: redirectUrl,
          scope: SCOPE, 
          code_challenge_method: 'S256', 
          code_challenge: codeChallenge
        }
        
        authUrl.search = new URLSearchParams(params).toString();
        window.location.href = authUrl.toString();
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <h1 className="font-bold">Spotify Playlist Web</h1>
    {profileData && (
      <div>{ profileData.country} { profileData.display_name}
      </div>)}  
    <ul>
      {playlists.map((p)=>{
        return (
        <li key={p.id}>
            {p.title}
            <img src={p.images[0].url} width={p.images[0].width * 0.5} height={p.images[0].height * 0.5}/>
        </li>
        );
        }
      )}
    </ul>
    </>
    )
}

export default App
