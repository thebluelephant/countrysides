import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { ODEvent } from '../../types/event.ts';
import fetchEvents from '../../api/events.tsx';
import s from './EventMarker.module.scss'

const EventMarker = () => {
    const [events, setEvents] = useState<ODEvent[]>();


    useEffect(() => {
        fetchEvents().then((resp) => {
            setEvents(resp)
        })
    }, []);

    return events?.map((event) => {
        const beginDate = new Date(event.firstdate_begin).toLocaleDateString("fr")
        const endDate = new Date(event.lastdate_end).toLocaleDateString("fr")
        const hasUniqueDate = event && beginDate === endDate
        const [lat, lon] = [event.location_coordinates.lat, event.location_coordinates.lon]


        return (<Marker
            key={event.uid}
            position={[lat, lon]}
            icon={L.icon({ iconUrl: 'icon/map-event.svg' })}
        >
            <Popup className={s.eventPopUp}>
                <div className={s.content}>
                    <h3 className={s.title}>{event?.title}</h3>
                    <span>
                        <b>{event.location_city}</b>

                        {
                            (event.location_name.length > 1 || event.location_address.length > 1) && <p>- {event.location_name} {event.location_address}</p>
                        }
                    </span>
                    {hasUniqueDate ? <p>Le {beginDate} </p> : <p>Du {beginDate} au {endDate}</p>}
                    <p>{event.description}</p>
                </div>

            </Popup>
        </Marker>)
    })
}

export default EventMarker; 