export type Publisher = {
    publisher_id?: number,
    pubName?: string
}

export type Game = {
    game_id?: number,
    gName?: string,
    genre?: string,
    price?: number,
    release_date?: string,
    g_cr_id?: number
}

export type Critique = {
    critique_id?: number,
    qName?: string
}

export type Creator = {
    creator_id?: number,
    crName?: string,
    active?: boolean
}

export type Hire = {
    hire_id?: number,
    hire_publisher_id?: number,
    hire_creator_id?: number
}

export type Rate = {
    rate_id?: number,
    rate_game_id?: number,
    rate_critique_id?: number
}