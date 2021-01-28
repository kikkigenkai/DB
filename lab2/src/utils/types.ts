export type Anime = {
    a_name?: string,
    description?: string,
    series?: number,
    genre?: number
}

export type Genre = {
    g_name?: string
}

export type Passport = {
    name?: string,
    surname?: string,
    birth_date?: string
}

export type Review = {
    r_text?: string,
    rev_user_id?: number,
    rev_anime_id?: number
}

export type User = {
    username?: string,
    registry_date?: string
}

export type UserPassport = {
    up_passport_id?: number,
    up_user_id?: number
}

export type Watched = {
    watch_anime_id?: number,
    watch_user_id?: number
}