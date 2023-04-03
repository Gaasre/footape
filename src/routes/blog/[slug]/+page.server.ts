import type { Blog } from '$lib/interfaces';
import supabase from '$lib/supabaseClient.server';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { compile } from 'mdsvex';

export const load = (async ({ params }) => {
    const { data: blog } = await supabase
        .from('blog')
        .select('title, description, image, categories, readingtime, slug, content, created_at')
        .eq('slug', params.slug)
        .single<Blog>()

    if (!blog) {
        throw error(404)
    }

    const compiledResponse = await compile(blog.content);
    if (compiledResponse?.code) {
        blog.content = compiledResponse.code;
    }

    return { blog };
}) satisfies PageServerLoad;