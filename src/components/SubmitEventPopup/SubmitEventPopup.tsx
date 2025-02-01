import React, { useEffect, useState } from 'react';
import s from './SubmitEventPopup.module.scss';
import { postEvent } from '../../api/events.tsx';
import { useAppContext } from '../../index.js';
import Title from '../Title/Title.tsx';
import Autocomplete from "react-google-autocomplete";
import { getInseeCode } from '../../api/place.tsx';

const SubmitEventPopup = () => {
    const { setNotification, account } = useAppContext();
    const [error, setError] = useState<string | null>(null)
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const [event, setEvent] = useState({
        title: null,
        description: null,
        from: new Date(),
        to: new Date(),
    })
    const [eventAddress, setEventAddress] = useState({
        location_coordinates: { lat: null, lon: null },
        location_city: null,
        location_address: null,
        location_postalcode: null,
        location_insee: null
    })

    const sendEvent = () => {
        if (event.from > event.to) {
            setError('La date de début ne peux être supérieur à la fate de fin')
        } else if (!event.title || !event.description || !event.from || !event.to || !eventAddress.location_city || !eventAddress.location_address || !eventAddress.location_postalcode) {
            setError('Tous les champs doivent avoir une valeur')
        } else if (!error) {
            postEvent({
                title: event.title,
                description: event.description,
                timings: { begin: event.from, end: event.to },
                location_coordinates: eventAddress.location_coordinates,
                location_city: eventAddress.location_city,
                location_address: eventAddress.location_address,
                location_postalcode: eventAddress.location_postalcode,
                location_insee: eventAddress.location_insee,
                firstdate_begin: event.from,
                lastdate_end: event.to,
                author_id: account?.id
            }).then((resp) => {
                if (resp === 201) {
                    setNotification({ type: 'success', content: 'Evenement envoyé - Il sera publié une fois validé par nos modérateurs' })
                    setShowPopup(false)
                }
            })
        } else {
            return
        }
    }

    const onPlaceSelection = (placeData) => {
        getInseeCode(placeData.formatted_address).then((code) => {
            const address = placeData.address_components
            setEventAddress({
                location_coordinates: { lat: placeData.geometry.location.lat(), lon: placeData.geometry.location.lng() },
                location_city: address.find((address) => address.types.includes('locality'))?.long_name ?? '',
                location_address: `${address.find((address) => address.types.includes('street_number'))?.long_name ?? ''} ${address.find((address) => address.types.includes('route'))?.long_name ?? ''}`,
                location_postalcode: address.find((address) => address.types.includes('postal_code'))?.long_name ?? '',
                location_insee: code
            })
        })
    }

    useEffect(() => {
        if (error) {
            setError('')
        }
    }, [event, eventAddress]);


    if (!showPopup) {
        return <button className={s.proposeActivityButton} onClick={() => setShowPopup(true)}>Proposer un evenement</button>
    }

    return (
        <div className={s.activityPopupContainer}>
            <div className={s.popUp}>
                <div>
                    <Title title='Proposer un evenement' />
                    <img className={s.closeIcon} src="icon/close.svg" alt="close icon" onClick={() => setShowPopup(false)} />
                    <div className={s.popUp__form}>
                        <span>
                            <label htmlFor="title">Titre</label>
                            <input type="text" name='title' onChange={(e) => setEvent({ ...event, title: e.target.value })} />
                        </span>
                        <span>
                            <label htmlFor="description">Description</label>
                            <input type="longtext" name='description' onChange={(e) => setEvent({ ...event, description: e.target.value })} />
                        </span>
                        <span>
                            <label htmlFor="from">Date de début</label>
                            <input type="date" name='from' onChange={(e) => setEvent({ ...event, from: new Date(e.target.value) })} />
                        </span>
                        <span>
                            <label htmlFor="to">Date de fin</label>
                            <input type="date" name='to' onChange={(e) => setEvent({ ...event, to: new Date(e.target.value) })} />
                        </span>
                        <span>
                            <label htmlFor="address">Adresse</label>
                            <Autocomplete
                                apiKey={process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
                                onPlaceSelected={(place) => onPlaceSelection(place)}
                                options={{
                                    types: ['address'],
                                    componentRestrictions: { country: ['fr'] }
                                }}
                            />
                        </span>
                    </div>
                </div>
                {error && <p className={s.error}>{error}</p>}
                <button className={s.submitButton} onClick={() => sendEvent()} disabled={!!error}>Soumettre</button>
            </div>
        </div>);
}

export default SubmitEventPopup;