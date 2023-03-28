import { getServerSession } from "@supabase/auth-helpers-sveltekit";
import type { LayoutServerLoad } from "./$types";
import supabase from "$lib/supabaseClient.server";
import type { Member, Permission, Team, User } from "$lib/interfaces";

export const load: LayoutServerLoad = async (event) => {
    const session = await getServerSession(event)
    let fullUser: User & Member & Team & { teamid: string } | null = null;

    if (session?.user) {
        fullUser = (await supabase
            .rpc('get_user_info', { user_id: session.user.id })
            .returns<User & Member & Team & { teamid: string }>()).data
    }

    return {
        session,
        fullUser
    }
}