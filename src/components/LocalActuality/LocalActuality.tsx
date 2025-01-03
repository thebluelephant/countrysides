import React, { useEffect, useState } from "react";
import s from './LocalActuality.module.scss';
import Title from "../Title/Title.tsx";
import { useAppContext } from "../../index.js";
import { fetchEventsByInseeeCode } from "../../api/events.tsx";
import { ODEvent } from "../../types/event.ts";


const LocalActuality = () => {
    const { account } = useAppContext();
    const [localEvents, setLocalEvents] = useState<ODEvent[]>([])

    useEffect(() => {
        if (account) {
            fetchEventsByInseeeCode(account.location_insee).then((resp) => setLocalEvents(resp))
        }

    }, []);

    return (
        <div className={s.container}>
            <Title title={"Actualités locales"} />
            {
                localEvents?.map((event) =>
                    <div className={s.eventBlock}>
                        <img src="icon/map-event-violet.svg" alt="Encart actualités local - icon evenement" />
                        <span>
                            <p>{event.title_fr}</p>
                            <p>Du {new Date(event.firstdate_begin).toLocaleDateString("fr")} au {new Date(event.lastdate_end).toLocaleDateString("fr")}</p>
                            <p>{event.location_address}</p>
                        </span>

                    </div>
                )
            }

        </div>
    )
};

export default LocalActuality;