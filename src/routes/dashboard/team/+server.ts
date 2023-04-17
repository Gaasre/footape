import type { Action, Section } from '$lib/enums';
import supabase from '$lib/supabaseClient.server';
import { error, fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Member, User } from '$lib/interfaces';

export const POST = (async ({ request, locals }) => {
    if (!locals.session?.user) return new Response(JSON.stringify(error(401)));
    const body: { toDelete: { action: Action, section: Section }[], toUpdate: { action: Action, section: Section }[] } = await request.json()

    if (body.toUpdate.length > 0) {
        const { error: updateError } = await supabase
            .from('permission')
            .insert(body.toUpdate)

        if (updateError) {
            return new Response(JSON.stringify(fail(422, updateError)));
        }
    }

    if (body.toDelete.length > 0) {
        const { error: deleteError } = await supabase.rpc(
            'bulk_delete_list_permissions', {
            sections: body.toDelete.map(({ section }) => section),
            actions: body.toDelete.map(({ action }) => action)
        }
        )

        if (deleteError) {
            return new Response(JSON.stringify(fail(422, deleteError)));
        }
    }

    return new Response(JSON.stringify({
        success: true
    }), { status: 201 })
}) satisfies RequestHandler;

export const DELETE = (async ({ request, locals, url }) => {
    if (!locals.session?.user) throw error(401);
    const id = url.searchParams.get('id')

    if (locals.fullUser?.confirmed_at) {
        const { error: queryError, data } = await supabase
            .rpc('remove_member', { leader: locals.session.user.id, toremove: id })
            .returns<boolean>()

        if (queryError) {
            return new Response(JSON.stringify(fail(422, queryError)));
        }

        if (data) {
            return new Response(JSON.stringify({ success: true }))
        }
    } else {
        const { data: member } = await supabase.from('member').select('userid').eq('id', id).single<Member>()
        if (!member) return new Response(JSON.stringify(fail(422)));

        const { error: queryError } = await supabase.auth.admin.deleteUser(member?.userid)

        if (queryError) {
            return new Response(JSON.stringify(fail(422)));
        }

        return new Response(JSON.stringify({ success: true }))
    }

    return new Response(JSON.stringify(fail(422)))
}) satisfies RequestHandler;