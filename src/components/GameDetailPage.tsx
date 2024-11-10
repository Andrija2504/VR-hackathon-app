import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { gamePosts, posts } from '../data';
import { MapContainer, TileLayer, Marker, Polyline, useMap, useMapEvents, Popup } from 'react-leaflet';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Map, X } from 'lucide-react'; // Import icons for the toggle button
import L, { LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Sphere360 from './Sphere360';

// Add at the top of the file with other imports
const finalPositionIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Calculate distance using the Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in meters
  return distance;
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
      setPosition(null); // Reset marker position when coordinates are cleared
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

  // Filter the posts for the current game
  const gamePostIds = gamePosts.filter(gp => gp.gameId === Number(gameId)).map(gp => gp.postId);
  const gameImages = posts.filter(post => gamePostIds.includes(post.id));

  const handleGuess = () => {
    if (lat !== null && lng !== null && currentIndex < gameImages.length) {
      const currentPost = gameImages[currentIndex];
      const correctLat = currentPost.latitude;
      const correctLng = currentPost.longitude;

      // Set the final position immediately after guess
      setFinalPosition([correctLat, correctLng]);
      setShowFinalPosition(true);

      // Rest of existing handleGuess logic...
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
      }, 5000);
    }
  };

  // Function to fit the map bounds
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

  if (currentIndex >= gameImages.length) {
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
      <div className={`game-content ${showMap ? 'show-map' : ''}`}>
        <div className="material-card viewer-card">
          <Canvas style={{ height: '800px' }}>
            <OrbitControls enableZoom={false} />
            <Sphere360 imageUrl={gameImages[currentIndex].img_url} />
          </Canvas>
          <div className="score-banner">
            <span className="score-label">Current Score:</span>
            <span className="score-value">{score}</span>
          </div>
        </div>

        <button
          className="mobile-map-toggle"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? (
            <><X className="w-6 h-6" /> Close Map</>
          ) : (
            <><Map className="w-6 h-6" /> Make Guess</>
          )}
        </button>

        <div className="material-card map-card">
          <MapContainer center={[47.5162, 14.5501]} zoom={4} style={{ height: '800px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LocationMarker lat={lat} lng={lng} onLocationSelected={(lat, lng) => {
              setLat(lat);
              setLng(lng);
            }} />
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
          <button
            onClick={handleGuess}
            disabled={isButtonDisabled || lat === null || lng === null}
            className={`material-button ${(isButtonDisabled || lat === null || lng === null) ? 'disabled' : ''}`}
          >
            Make a Guess
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDetailPage;
