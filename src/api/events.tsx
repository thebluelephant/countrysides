import { ODEvent } from '../types/event';
import { supabase } from './config.tsx';
import { codegeo } from './popular_cities';

export const fetchEvents = async () => {
    const publicEvents = fetchPublicEvents();
    const userEvents = fetchUsersEvents()
    return Promise.all([publicEvents, userEvents]).then((values) => [...values[0], ...(values[1] as ODEvent[])])
}
export const fetchPublicEvents = async () => {
    const response = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/evenements-publics-openagenda/records?select=uid%2Cslug%2Ccanonicalurl%2Ctitle_fr%2Cdescription_fr%2Clongdescription_fr%2Cconditions_fr%2Ckeywords_fr%2Ctimings%2Clocation_coordinates%2Clocation_city%2Clocation_address%2Clocation_name%2Clocation_postalcode%2C%20uid%2Cslug%2Ccanonicalurl%2Ctitle_fr%2Cdescription_fr%2Clongdescription_fr%2Cconditions_fr%2Ckeywords_fr%2Clocation_coordinates%2Clocation_city%2Clocation_address%2Clocation_name%2Clocation_postalcode%2Cfirstdate_begin%2Clastdate_end%2C%20location_insee&where=lastdate_end%3E%3Dnow()%20AND%20location_city%20!%3D%20'Paris'%20%20AND%20location_city%20!%3D%20'Marseille'%20AND%20location_city%20!%3D%20'Nice'%20AND%20location_city%20!%3D%20'Toulouse'%20AND%20location_city%20!%3D%20'Montpellier'%20AND%20location_city%20!%3D%20'Rennes'%20AND%20location_city%20!%3D%20'Nantes'%20AND%20location_city%20!%3D%20'Lilles'%20AND%20location_city%20!%3D%20'Bourges'%20AND%20location_city%20!%3D%20'Clermont-ferrand'%20AND%20location_city%20!%3D%20'Cannes'%20AND%20location_city%20!%3D%20'Dunkerque'&limit=20`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const resp: ODEvent[] = await response.json().then((data) => data.results.filter((d) => !codegeo.includes(d.location_insee)))
    return resp;
}

export const fetchUsersEvents = async () => {
    const { data } = await supabase
        .from('event')
        .select()

    return data

}
export default fetchEvents