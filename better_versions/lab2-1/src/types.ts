export type Tags = {
    tagId?: number,
    tName?: string,
    description?: string
}

export type Users = {
    userId?: number,
    username?: string,
    reg_date?: string,
    rating?: number
}

export type GoogleProfile = {
   gpId?: number,
   email?: string,
   nickname?: string,
   adIdentifier?: number,
   questionUser?: number
}

export type Question = {
    questionId?: number,
    qHeader?: string,
    qText?: string,
    creationDate?: string,
    authorId?: number
}

export type QuestionTagsBinding = {
    qtId?: number,
    qt_tag_id?: number,
    qt_question_id?: number
}

export type Answer = {
    answerId?: number,
    aHeader?: string,
    aText?: string,
    aCreationDate?: string,
    a_author_id?: number,
    a_question_id?: number
}