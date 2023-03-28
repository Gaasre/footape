import type { Video } from '$lib/interfaces';
import s3Client from '$lib/s3.server';
import supabase from '$lib/supabaseClient.server';
import { error, fail } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

async function emptyS3Directory(bucket: string, dir: string) {
    const listParams = {
        Bucket: bucket,
        Prefix: dir
    };

    const listedObjects = await s3Client.listObjectsV2(listParams).promise();

    if (listedObjects.Contents?.length === 0) return;

    const deleteParams = {
        Bucket: bucket,
        Delete: { Objects: [] as { Key: string }[] }
    };

    listedObjects.Contents?.forEach(({ Key }) => {
        if (Key) {
            deleteParams.Delete.Objects.push({ Key });
        }
    });

    await s3Client.deleteObjects(deleteParams).promise();

    if (listedObjects.IsTruncated) await emptyS3Directory(bucket, dir);
}

export const DELETE = (async ({ locals, url }) => {
    if (!locals.session?.user) throw error(401);
    const id = url.searchParams.get('id')

    const { error: queryError, data } = await supabase
        .from('video')
        .select('*')
        .eq('id', id)
        .single<Video>()

    if (!data) throw error(401)

    try {
        await emptyS3Directory('footape', data.channelId + '/' + data.id)

        const { error: queryErrorDelete } = await supabase
            .from('video')
            .delete()
            .eq('id', id)

        if (queryErrorDelete) {
            return new Response(JSON.stringify(fail(422)));
        }
    } catch (err) {
        console.log(err)
        return new Response(JSON.stringify(fail(422)));
    }

    return new Response(JSON.stringify({ success: true }))
}) satisfies RequestHandler;