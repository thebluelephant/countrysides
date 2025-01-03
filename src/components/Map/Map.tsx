import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import s from './Map.module.scss';
import SearchBar from '../SearchBar/SearchBar.tsx';
import EventMarker from './EventMarker.tsx';
import GatheringPlacesMarker from './GatheringPlacesMarker.tsx';

const Map = () => {
    return (

        <div className={s.container}>
            <MapContainer center={[47.0833, 2.4]} zoom={7} scrollWheelZoom={true} className={s.map}>
                <SearchBar />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <EventMarker />
                <GatheringPlacesMarker />
            </MapContainer>
        </div>
    );
}

export default Map; 