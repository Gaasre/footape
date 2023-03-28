import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    const session = await getServerSession(event)
    return { isConnected: !!session?.user };
}) satisfies PageServerLoad;