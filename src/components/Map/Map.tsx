import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import s from './Map.module.scss';
import SearchBar from '../SearchBar/SearchBar.tsx';
import EventMarker from './EventMarker.tsx';
import GatheringPlacesMarker from './GatheringPlacesMarker.tsx';
import { ODEvent } from '../../types/event.ts';
import fetchEvents from '../../api/events.tsx';

const Map = () => {
    const [events, setEvents] = useState<ODEvent[]>();
    const [filteredEvents, setFilteredEvents] = useState<ODEvent[] | null>();

    useEffect(() => {
        fetchEvents().then((resp) => {
            setEvents(resp)
        })
    }, []);

    const filterEventsThroughDate = (date: string) => {
        const filteredEventsByDate = events?.filter((event) => event.firstdate_begin <= date && event.lastdate_end >= date)
        setFilteredEvents(filteredEventsByDate)
    }


    return (
        <div className={s.mapContainer}>
            <MapContainer center={[47.0833, 2.4]} zoom={7} scrollWheelZoom={true} className={s.map}>
                <SearchBar onFilterOnDate={filterEventsThroughDate} resetDateFilter={() => setFilteredEvents(null)} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {(events || filteredEvents) && <EventMarker events={filteredEvents ?? events} />}
                <GatheringPlacesMarker />
            </MapContainer>
        </div>

    );
}

export default Map; 