import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { ODEvent } from '../../types/event.ts';
import fetchEvents from '../../api/events.tsx';



const EventMarker = () => {
    const [events, setEvents] = useState<ODEvent[]>();

    useEffect(() => {
        fetchEvents().then((resp) => {
            setEvents(resp)
        })
    }, []);

    return events?.map((event) => {
        const [lat, lon] = [event.location_coordinates.lat, event.location_coordinates.lon]
        return (<Marker
            key={event.uid}
            position={[lat, lon]}
            icon={L.icon({ iconUrl: 'icon/map-od-event.svg' })}
        >
            <Popup>
                <h3>{event?.title_fr}</h3>
                <p><b>{event.location_city}</b> - {event.location_name}, {event.location_address}</p>
                <p>Du {new Date(event.firstdate_begin).toLocaleDateString("fr")} au {new Date(event.lastdate_end).toLocaleDateString("fr")}</p>
                <p>{event.description_fr}</p>
            </Popup>
        </Marker>)
    })
}

export default EventMarker; 