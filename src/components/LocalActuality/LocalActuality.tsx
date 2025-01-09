import React, { useEffect, useState } from "react";
import s from './LocalActuality.module.scss';
import Title from "../Title/Title.tsx";
import { useAppContext } from "../../index.js";
import { fetchEventsByInseeeCode } from "../../api/events.tsx";
import { ODEvent } from "../../types/event.ts";


const LocalActuality = () => {
    const { account } = useAppContext();
    const [localEvents, setLocalEvents] = useState<ODEvent[]>([])
    const newUsers = new Date().getDate() > 10 ? new Date().getDate() - 2 : 1

    useEffect(() => {
        if (account?.location_insee) {
            fetchEventsByInseeeCode(account.location_insee).then((resp) => setLocalEvents(resp))
        }
    }, [account]);

    return (
        <div className={s.container}>
            <Title title={"Actualités locales"} />
            <span className={s.eventsBlocks}>
                {
                    localEvents?.map((event) =>
                        <div className={s.eventBlock}>
                            <img src="icon/map-event-violet.svg" alt="Encart actualités local - icon evenement" />
                            <span>
                                <p>{event.title}</p>
                                <p>Du {new Date(event.firstdate_begin).toLocaleDateString("fr")} au {new Date(event.lastdate_end).toLocaleDateString("fr")}</p>
                                <p>{event.location_address}</p>
                            </span>

                        </div>
                    )
                }
                <div className={s.eventBlock}>
                    <img src="icon/new_person.svg" alt="Encart actualités local - icon evenement" />
                    <span>
                        <p>{newUsers} {newUsers === 1 ? "nouvel utilisateur s'est inscrit " : "nouveaux utilisateurs se sont inscrits"} </p>

                    </span>

                </div>
            </span>


        </div>
    )
};

export default LocalActuality;