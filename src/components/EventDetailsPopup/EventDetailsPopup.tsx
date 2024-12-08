import React, { useEffect, useState } from 'react';
import s from './EventDetailsPopup.module.scss';
import { ODEvent } from '../../types/event';

type Props = {
    eventDetails: ODEvent
}
const EventDetailsPopup = ({ eventDetails }: Props) => {
    const [event, setEvent] = useState<ODEvent | undefined>();

    useEffect(() => {
        setEvent(eventDetails);
    }, [eventDetails]);

    if (!event) {
        return
    }
    return (
        <div className={s.container}>
            <img className={s.container__closeIcon} src="icon/close.svg" alt="close icon" onClick={() => setEvent(undefined)} />
            <h3>{event?.title_fr}</h3>
            <p><b>{event.location_city}</b> - {event.location_name}, {event.location_address}</p>
            <p>Du {new Date(event.firstdate_begin).toLocaleDateString("fr")} au {new Date(event.lastdate_end).toLocaleDateString("fr")}</p>
            <p>{event.description_fr}</p>

        </div>);
}

export default EventDetailsPopup;