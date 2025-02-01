import { supabase } from './config.tsx';

export const postParticipation = async (accountId, accountUsername, eventId, activityId) => {
    const { status, error } = await supabase
        .from('participation')
        .insert({ account_id: accountId, event_id: eventId ?? null, activity_id: activityId ?? null, account_username: accountUsername })

    if (status === 201) {
        return getUserParticipations(accountId)
    } else return error
}

export const cancelParticipation = async (participationId) => {
    const { data } = await supabase
        .from('participation')
        .delete()
        .eq('id', participationId)

    return data
}

export const getUserParticipations = async (accountId) => {
    const { data } = await supabase
        .from('participation')
        .select()
        .eq('account_id', accountId)
    return data
}

export const getParticipationByEventOrActivityId = async (eventId, activityId) => {
    const { data } = await supabase
        .from('participation')
        .select()
        .eq(`${eventId ? 'event_id' : 'activity_id'}`, eventId ?? activityId)
    return data
}