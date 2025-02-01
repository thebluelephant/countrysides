import React, { useState } from 'react';
import { Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { ODEvent } from '../../types/event.ts';
import s from './EventMarker.module.scss'
import { useAppContext } from '../../index.js';
import { cancelParticipation, getParticipationByEventOrActivityId, postParticipation } from '../../api/participations.tsx';
import { Participation } from '../../types/participation.ts';

type Props = {
    events: ODEvent[] | undefined
}
const EventMarker = ({ events }: Props) => {
    const { account, setAgenda, agenda } = useAppContext();
    const [participants, setParticipants] = useState<Participation[]>();


    //It can be an event, or an activity, but both values are in different rows so we have to specify the 2, assuming one will be null
    const getEventParticipants = (eventId, activityId) => {
        getParticipationByEventOrActivityId(eventId, activityId).then((resp) => {
            if (resp) {
                setParticipants(resp)
                console.log(resp);
            }
        })
    }

    const postUserParticipation = (eventId) => {
        postParticipation(account.id, account.username, eventId, null).then((response) => {
            setAgenda(response)
            getEventParticipants(eventId, null)
        })

    }

    const cancelUserParticipation = (participationId, eventId) => {
        cancelParticipation(participationId).then((response) => {
            if (response) {
                //Delete participation from context agenda
                const newAgenda: Participation[] = agenda.filter((participation) => participation.id !== participationId)
                setAgenda(newAgenda)
                getEventParticipants(eventId, null)
            }
        })
    }
    return events?.map((event) => {
        const beginDate = new Date(event.firstdate_begin).toLocaleDateString("fr")
        const endDate = new Date(event.lastdate_end).toLocaleDateString("fr")
        const hasUniqueDate = event && beginDate === endDate
        const [lat, lon] = [event.location_coordinates.lat, event.location_coordinates.lon]
        const eventRegisteredByUser = agenda.find((date) => date.activity_id === event.uid || date.event_id === event.uid)

        return (<Marker
            key={event.uid}
            position={[lat, lon]}
            icon={L.icon({ iconUrl: 'icon/map-event.svg' })}
            eventHandlers={{
                popupopen: () => {
                    getEventParticipants(event.uid, null)
                },
            }}
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


                    {
                        participants && !!participants.length && <p className={s.participants}>Participants <b>({participants.length})</b></p>
                    }
                    <button className={s.participationButton} onClick={() => eventRegisteredByUser ? cancelUserParticipation(eventRegisteredByUser.id, event.uid) : postUserParticipation(event.uid)}>{eventRegisteredByUser ? "Annuler" : 'Participer'}</button>
                </div>
            </Popup>
        </Marker >)
    })
}

export default EventMarker; 