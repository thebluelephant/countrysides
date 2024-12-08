import { Account } from '../types/account.ts';
import { GatheringPlace } from '../types/gathering_place.ts';
import { supabase } from './config.tsx';

/** A Gathering place is somwhere there's at least one user account located here */

export const fetchGatheringPlaces = async () => {
    const { data } = await supabase
        .from('gathering_places')
        .select()

    return data as GatheringPlace[]
}

export const fetchAccountsFromGatheringPlaces = async (accountIds: Pick<Account, 'id'>[]) => {
    const { data } = await supabase
        .from('account')
        .select()
        .in('id', accountIds)
    return data as Account[]
}

export const insertGatheringPlace = async (gp) => {
    const { status } = await supabase
        .from('gathering_places')
        .insert(gp)
    return status

}
export const insertOrUpdateGatheringPlacesWithAccountId = async (gp, accountId) => {
    const { data } = await supabase
        .from('gathering_places')
        .select()
        .eq('location_insee', gp.location_insee)

    const savedGp = data[0] ?? null

    if (savedGp) {
        let accounts = savedGp.accounts
        const { status } = await supabase
            .from('gathering_places')
            .update({ accounts })
            .eq('location_insee', gp.location_insee)

        return status

    } else {
        return insertGatheringPlace({ ...gp, accounts: [accountId] }).then((status) => status)
    }


    /*     const { data, error } = await supabase
            .from('gathering_places')
            .upsert({ location_name: gp.location_name, location_insee: gp.location_insee, location_coordinates: gp.location_coordinates, accounts: ['ok'] }, { onConflict: "location_insee" })
            .select() */

    /*     const { error } = await supabase
            .from('gathering_places')
            .update({ location_name: gp.location_name, location_insee: gp.location_insee, location_coordinates: gp.location_coordinates, accounts: ['ok'] })
            .eq('location_insee', gp.location_insee)
    
        console.log(error); */
}
