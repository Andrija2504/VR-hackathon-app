import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { gamePosts, posts } from '../data';
import { MapContainer, TileLayer, Marker, Polyline, useMap, useMapEvents } from 'react-leaflet';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import L, { LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Sphere360 from './Sphere360'; // Assuming Sphere360 component is available

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

  // Filter the posts for the current game
  const gamePostIds = gamePosts.filter(gp => gp.gameId === Number(gameId)).map(gp => gp.postId);
  const gameImages = posts.filter(post => gamePostIds.includes(post.id));

  const handleGuess = () => {
    if (lat !== null && lng !== null && currentIndex < gameImages.length) {
      const currentPost = gameImages[currentIndex];

      // Use actual coordinates from the post
      const correctLat = currentPost.latitude;
      const correctLng = currentPost.longitude;

      const distance = calculateDistance(lat, lng, correctLat, correctLng);
      const scoreForRound = Math.max(0, (20037.5 - (distance/1000))/4007.5); // Example scoring formula
      setScore(prevScore => prevScore + Math.floor(scoreForRound));

      // Disable the button right away
        setIsButtonDisabled(true);

      // Draw a line between the guessed location and the correct location
      setPolylineCoords([[lat, lng], [correctLat, correctLng]]);
      setTimeout(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
        setLat(null);
        setLng(null);
        setIsButtonDisabled(false);
        setPolylineCoords([]);
      }, 5000); // Wait 5 seconds before showing next image
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
    return <div style={{ padding: '20px' }}><h1>Game Over! Your final score: {score}</h1></div>;
  }

  return (
    <div style={{ display: 'flex', padding: '20px', gap: '20px' }}>
      <div style={{ flex: 1 }}>
        <Canvas style={{ height: '400px' }}>
          <OrbitControls enableZoom={false} />
          <Sphere360 imageUrl={gameImages[currentIndex].img_url} />
        </Canvas>
        <div style={{ marginTop: '10px' }}>
          <strong>Current Score: {score}</strong>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <MapContainer center={[47.5162, 14.5501]} zoom={4} style={{ height: '400px', width: '100%' }}>
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
            style={{
                marginTop: '10px',
                backgroundColor: isButtonDisabled || lat === null || lng === null ? 'gray' : '#007bff',
                color: 'white',
                cursor: isButtonDisabled || lat === null || lng === null ? 'not-allowed' : 'pointer',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '4px',
            }}
        >
          Make a Guess
        </button>
      </div>
    </div>
  );
};

export default GameDetailPage;
