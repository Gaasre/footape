import type { Blog } from '$lib/interfaces';
import supabase from '$lib/supabaseClient.server';
import type { PageServerLoad } from './$types';

const getPagination = (page: number, size: number) => {
    const limit = size ? +size : 11
    const from = page ? page * limit : 0
    const to = page ? from + size - 1 : size - 1

    return { from, to }
}

export const load = (async ({ url }) => {
    let page = 1;

    const pageParam = url.searchParams.get('page')

    if (pageParam) {
        page = parseInt(pageParam)
    }

    const { from, to } = getPagination(page - 1, 10)
    const { data: blogs, count } = await supabase
        .from('blog')
        .select('title, description, image, categories, readingtime, slug', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(from, to)
        .returns<Blog[]>()

    return { blogs, page, pages: count ? Math.ceil(count / 10) : 1  };
}) satisfies PageServerLoad;