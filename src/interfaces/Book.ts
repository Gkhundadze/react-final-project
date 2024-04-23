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
    legacy_img: string,
    year_start: string,
    year_end: string,
    books: Book[]
}
export interface Book {
    id: number,
    category_id: number,
    category?: {
        name: string
    }
    name: string,
    year: number,
    img: string,
    legacy_img: string,
    min_picture: string
    description: string,
    author_id: number,
    author?: Author,
    variations: [Variations],
    isInStock: number,
    translator: {
        fullname: string,
        id: number
    }
}

interface Variations {
    active_discount?: {
        discount: number,
        end_discount: string,
        id: number,
        laravel_through_key: number,
        start_discount: string
    },
    book_id: number,
    discount: number,
    discounted_price: number,
    id: number,
    original_price: number,
    palitra: number,
    price: number,
    variation: string
}