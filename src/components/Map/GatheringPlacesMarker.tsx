import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { GatheringPlace } from '../../types/gathering_place.ts';
import { fetchGatheringPlaces, fetchAccountsFromGatheringPlaces } from '../../api/gathering_places.tsx';
import { Account } from '../../types/account.ts';



const GatheringPlacesMarker = () => {
    const [gatheringPlace, setGatheringPlace] = useState<GatheringPlace[]>();
    const [accountsList, setAccountsList] = useState<Account[]>();

    useEffect(() => {
        fetchGatheringPlaces().then((gp) => {
            setGatheringPlace(gp)
        })
    }, []);

    return gatheringPlace?.map((gp) => {
        const { lat, lon } = gp.location_coordinates

        return (<Marker
            key={lat}
            position={[lat, lon]}
            icon={L.icon({ iconUrl: 'icon/person-pin.svg' })}
            eventHandlers={{
                click: () => {
                    fetchAccountsFromGatheringPlaces(gp.accounts).then((accounts) => {
                        setAccountsList(accounts)
                    })
                    //  onEventClick(event)
                },
            }}
        >
            {
                !!accountsList?.length && (
                    <Popup>
                        {

                            accountsList.map((account) => {
                                return (
                                    <p key={account.id}>{account.id}</p>

                                )
                            })
                        }

                    </Popup>)
            }
        </Marker>)
    })
}

export default GatheringPlacesMarker; 