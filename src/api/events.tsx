import { ODEvent } from '../types/event';
import { supabase } from './config.tsx';

export const fetchEvents = async () => {
    const publicEvents = fetchPublicEvents();
    const userEvents = fetchUsersEvents()
    return Promise.all([publicEvents, userEvents]).then((values) => [...values[0], ...(values[1] as ODEvent[])])
}
export const fetchPublicEvents = async () => {
    const { data } = await supabase
        .from('od_events')
        .select()

    return data
}

export const fetchUsersEvents = async () => {
    const { data } = await supabase
        .from('event')
        .select()

    return data

}
export default fetchEvents