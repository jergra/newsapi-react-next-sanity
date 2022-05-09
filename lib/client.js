import sanityClient from '@sanity/client'

export const client = sanityClient({
    projectId: 'auuc9ig6',
    dataset: 'production',
    apiVersion: '2022-05-02',
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
})
