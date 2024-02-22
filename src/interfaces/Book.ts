export interface bookCategory {
    id: number,
    name: string
}

export interface Book {
    id: number,
    category_id: number,
    legacy_img: string,
    name: string,
    year: number,
    description: string
}