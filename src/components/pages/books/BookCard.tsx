import { SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom";

import 'swiper/css/bundle';



export const BookCard = (props) => {
    const {bookData, formURL, id} = props
    


    return (
            <Link
                to={formURL(id)}
                className="authors-book" key={bookData.author_id}
            >
                <img src={bookData.min_picture} alt={bookData.name} />
                <h4>{bookData.name}</h4>
            </Link>
    )
}