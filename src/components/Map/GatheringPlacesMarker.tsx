import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { GatheringPlace } from '../../types/gathering_place.ts';
import { fetchGatheringPlaces, fetchAccountsFromGatheringPlaces } from '../../api/gathering_places.tsx';
import { Account } from '../../types/account.ts';
import s from './GatheringPlacesMarker.module.scss'



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
                        <h3> Ils habitent dans le coin ({accountsList.length} utilisateurs)</h3>
                        {
                            accountsList.map((account) => {
                                return (
                                    <div className={s.accountBlock}>
                                        {
                                            account.validated ?
                                                <>
                                                    <b><p key={account.id}>{account.username}</p></b>
                                                    {
                                                        !!account.centers_of_interest.length &&
                                                        <div className={s.coiBlocks}>
                                                            {
                                                                account.centers_of_interest.map((centerOfInterest) => <p>{centerOfInterest}</p>)
                                                            }
                                                        </div>
                                                    }
                                                </> :
                                                <p>Profil en cours de validation</p>
                                        }
                                    </div>
                                )
                            })
                        }
                    </Popup>)
            }
        </Marker>)
    })
}

export default GatheringPlacesMarker; 