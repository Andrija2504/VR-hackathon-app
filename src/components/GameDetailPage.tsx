import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { gamePosts, games, posts } from '../data';
import { MapContainer, TileLayer, Marker, Polyline, useMap, useMapEvents, Popup } from 'react-leaflet';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Map, X } from 'lucide-react';
import L, { LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Sphere360 from './Sphere360';
import AudioPlayerWithFade from './AudioPlayerWithFade';

const finalPositionIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

interface LocationMarkerProps {
  lat: number | null;
  lng: number | null;
  onLocationSelected: (lat: number, lng: number) => void;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ lat, lng, onLocationSelected }) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useEffect(() => {
    if (lat === null || lng === null) {
      setPosition(null);
    }
  }, [lat, lng]);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(L.latLng(lat, lng));
      onLocationSelected(lat, lng);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

const GameDetailPage: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [polylineCoords, setPolylineCoords] = useState<[number, number][]>([]);
  const [showFinalPosition, setShowFinalPosition] = useState(false);
  const [finalPosition, setFinalPosition] = useState<[number, number] | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const currentGame = games.find(game => game.gameId === Number(gameId));
  const gamePostIds = gamePosts.filter(gp => gp.gameId === Number(gameId)).map(gp => gp.postId);
  const gameImages = posts.filter(post => gamePostIds.includes(post.id));

  // Start playing audio when component mounts
  useEffect(() => {
    if (currentGame?.audioUrl) {
      setIsAudioPlaying(true);
    }

    return () => {
      // Cleanup: ensure audio stops when component unmounts
      setIsAudioPlaying(false);
    };
  }, []);

  const handleGuess = () => {
    if (lat !== null && lng !== null && currentIndex < gameImages.length) {
      const currentPost = gameImages[currentIndex];
      const correctLat = currentPost.latitude;
      const correctLng = currentPost.longitude;

      setFinalPosition([correctLat, correctLng]);
      setShowFinalPosition(true);

      const distance = calculateDistance(lat, lng, correctLat, correctLng);
      const scoreForRound = Math.max(0, (20037.5 - (distance / 1000)) / 4007.5);
      setScore(prevScore => prevScore + Math.floor(scoreForRound));
      setIsButtonDisabled(true);
      setPolylineCoords([[lat, lng], [correctLat, correctLng]]);

      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        setLat(null);
        setLng(null);
        setIsButtonDisabled(false);
        setPolylineCoords([]);
        setShowFinalPosition(false);
        setFinalPosition(null);
        if (showMap) {
          setShowMap(false);
        }
        
        // Reset the map view using the captured map instance
        if (mapInstance) {
          mapInstance.setView([47.5162, 14.5501], 4);
        } else {
          console.warn('Map instance is not available.');
        }
      }, 5000);
    }
  };

  const FitMapBounds = ({ coordinates }: { coordinates: [number, number][] }) => {
    const map = useMap();
    useEffect(() => {
      if (coordinates.length === 2) {
        const bounds: LatLngBoundsExpression = coordinates.map(coord => [coord[0], coord[1]]) as LatLngBoundsExpression;
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    }, [coordinates, map]);
    return null;
  };

  useEffect(() => {
    if (mapInstance) {
      console.log('Map instance is ready:', mapInstance);
      // You can perform any actions that depend on the map being ready here
    }
  }, [mapInstance]);

  if (currentIndex >= gameImages.length) {
    // Fade out music when game is over
    setIsAudioPlaying(false);
    return (
      <div className="game-over-container">
        <div className="material-card">
          <h1>Game Over!</h1>
          <div className="score-display">
            <span className="score-label">Final Score:</span>
            <span className="score-value">{score}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="score-banner">
        <div className='score-section'>
        <span className="score-label">Current Score:</span>
        <span className="score-value">{score}</span>
        </div>


        {/* Audio player - now tied to game rather than individual posts */}
        {currentGame?.audioUrl && (
          <AudioPlayerWithFade
            audioUrl={currentGame.audioUrl}
            isPlaying={isAudioPlaying}
            fadeInDuration={2000}
            fadeOutDuration={2000}
          />
        )}
      </div>

      <div className={`game-content ${showMap ? 'show-map' : ''}`}>
        <div className="material-card viewer-card">
          <Canvas style={{ height: '800px' }}>
            <OrbitControls enableZoom={false} />
            <Sphere360 imageUrl={gameImages[currentIndex].img_url} />

            {/* Info Button Marker */}
            <mesh
              visible
              userData={{ info: 'This is an informational marker!' }}
              position={[9, 10, 3]}
              rotation={[Math.PI / 2, 0, 0]}
              onClick={() => alert('This is your information message!')}
            >
              <sphereGeometry args={[1, 16, 16]} />
              <meshStandardMaterial color="white" />
            </mesh>
          </Canvas>
        </div>

        <div className="material-card map-card">
          <MapContainer 
          center={[47.5162, 14.5501]} 
          zoom={4} 
          style={{ height: '800px', width: '100%' }} 
          whenReady={(event) => {
            const map = event.target; // Access the map instance from the event
            console.log('Map instance created:', map);
            setMapInstance(map); // Store the reference in state
          }}> {/* // Capture the map instance */}
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LocationMarker
              lat={lat}
              lng={lng}
              onLocationSelected={(lat, lng) => {
                setLat(lat);
                setLng(lng);
              }}
            />
            {showFinalPosition && finalPosition && (
              <Marker position={finalPosition} icon={finalPositionIcon}>
                <Popup>Correct Location</Popup>
              </Marker>
            )}
            {polylineCoords.length === 2 && (
              <>
                <Polyline positions={polylineCoords} color="red" />
                <FitMapBounds coordinates={polylineCoords} />
              </>
            )}
          </MapContainer>

          {/* Desktop controls */}
          <div className="map-controls desktop-map-controls">
            <button
              onClick={handleGuess}
              disabled={isButtonDisabled || lat === null || lng === null}
              className={`material-button ${(isButtonDisabled || lat === null || lng === null) ? 'disabled' : ''}`}
            >
              Submit Guess
            </button>
          </div>
        </div>

        {/* Mobile toggle */}
        { !showMap && (
          <button
            className="mobile-map-toggle"
            onClick={() => setShowMap(!showMap)}
          >
            <><Map className="w-6 h-6" /> Make Guess</>
          </button>
        )
        }

        {/* Mobile controls */}
        {showMap && (
          <div className="map-controls">
            <button
              onClick={handleGuess}
              disabled={isButtonDisabled || lat === null || lng === null}
              className={`material-button ${(isButtonDisabled || lat === null || lng === null) ? 'disabled' : ''}`}
            >
              Submit Guess
            </button>
            <button
              onClick={() => setShowMap(false)}
              disabled={isButtonDisabled}
              className={`material-button ${(isButtonDisabled) ? 'disabled' : ''}`}
            >
              Close Map
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetailPage;