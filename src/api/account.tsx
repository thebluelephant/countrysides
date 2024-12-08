import { supabase } from './config.tsx';

export const fetchAccountById = async (id: string) => {
    const { data } = await supabase
        .from('account')
        .select()
        .eq('id', id)

    return data
}

export const updateAccountById = async (id: string, data) => {

    const result = await supabase
        .from('account')
        .update(data)
        .eq('id', id)

    return result
}

