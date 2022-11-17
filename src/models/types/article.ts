export interface IArticle {
    slug?: string | undefined,
    title?: string | undefined,
    description?: string | undefined,
    body?: string | undefined,
    tagList?: Array<string> | undefined,
    createdAt?: string | undefined,
    updatedAt?: string | undefined,
    favorited?: boolean | undefined,
    favoritesCount?: number | undefined,
    author?: {
        username: string | undefined,
        bio?: string | undefined,
        image?: string | undefined,
        following?: true | undefined
    }
}