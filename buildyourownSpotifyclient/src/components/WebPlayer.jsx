import { useState, useEffect } from 'react'
import { BsFillSkipEndFill, BsFillSkipStartFill, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';

export function WebPlayer({access_token}){
    const [currentSong, setCurrentSong] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
    const [player, setPlayer] = useState(undefined)

    useEffect(()=>{
        if (document.querySelector('script[src="https://sdk.scdn.co/spotify-player.js"]')) {
            return;
        }
        if (!access_token) {
            console.log('No access token available');
            return;
        }
        const script = document.createElement('script');
        script.setAttribute('src', 'https://sdk.scdn.co/spotify-player.js');
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = ()=>{
        const player = new Spotify.Player({
            name: 'WebPlaybackSDK', 
            getOAuthToken: cb=>{cb(access_token)},
            volume: 0.5 
        });

        player.addListener('ready', ({ device_id }) => {
            console.log('Connected with Device ID', device_id);
            fetch('https://api.spotify.com/v1/me/player', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    device_ids: [device_id],
                    play: true
                })
            })
            .then(response => {
                console.log('Playback transferred successfully');
            })
        });
        player.addListener('player_state_changed', ({
            position,
            duration,
            track_window: { current_track }
        }) => {
            console.log('Currently Playing', current_track);
            console.log('Position in Song', position);
            console.log('Duration of Song', duration);
            setCurrentSong(current_track)
            
        });
        player.addListener('initialization_error', ({ message }) => {
            console.error('Failed to initialize:', message);
        });

        player.addListener('authentication_error', ({ message }) => {
            console.error('Failed to authenticate:', message);
        });
        setPlayer(player)
        player.connect();
        }
    }, [access_token])

    return (
        <div className="container">
            <div className="song-title flex flex-col items-center">
                <h1 className="font-bold">{currentSong ? currentSong.name : 'No song playing'}</h1>
                <h2 className="font-bold">{currentSong ? currentSong.artists[0].name: ''}</h2>
                <img className="object-center rounded-lg shadow-lg" src={currentSong? currentSong.album.images[0].url: ''} width='30%'/>
            </div>
            <button className="bg-outline-solid btn-back"  type="button" onClick={() => player?.previousTrack()}>
                <BsFillSkipStartFill/>
            </button>
            <button className="btn-playpause" type="button" onClick={() => player?.togglePlay()}>
                {isPaused ? <BsFillPauseFill/> : <BsFillPlayFill/>}
            </button>
            <button className="outline-solid btn-forward" type="button" onClick={() => player?.nextTrack()}>
                <BsFillSkipEndFill/>
            </button>
        </div>
    );
}