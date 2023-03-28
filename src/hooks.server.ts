import type { Member, Team, User } from '$lib/interfaces'
import '$lib/supabaseClient'
import supabase from '$lib/supabaseClient.server'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
    const { session, supabaseClient } = await getSupabase(event)
    let fullUser: User & Member & Team & { teamid: string } | null = null;

    if (session?.user) {
        const { data, error } = await supabase
            .rpc('get_user_info', { user_id: session.user.id })
            .returns<User & Member & Team & { teamid: string }>()

        fullUser = data

        if (error) console.log(error)
    }


    event.locals.sb = supabaseClient
    event.locals.session = session
    event.locals.fullUser = fullUser

    return resolve(event)
}