export interface bookCategory {
    id: number,
    name: string
}

export interface Author {
    id: number,
    country: string,
    description: string,
    fullname: string,
    img: string,
    year_start: string,
    year_end: string,
    books: Book[]
}
export interface Book {
    id: number,
    category_id: number,
    legacy_img: string,
    name: string,
    year: number,
    min_picture: string
    description: string,
    author_id: number,
    author?: Author
}