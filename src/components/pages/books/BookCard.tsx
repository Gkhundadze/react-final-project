import { Link } from "react-router-dom";
import { imgErrorHandler } from "../../shared/other/brokenImageHandler";
import brokenImage from '../../../assets/images/broken-image.gif'





export const BookCard = (props: any) => {
    const { bookData, formURL, cardSize, clickable } = props




    if(bookData) {

        console.log(bookData);
    }
    
    function getImage () {
        if(bookData.img) {
            return bookData.img
        }
        else if(bookData.legacy_img) {
            return bookData.legacy_img
        }
        else if(bookData.min_picture) {
            return bookData.min_picture
        }
        else {
            return brokenImage
        }
    }
    
    if (clickable) {
        return (
            <Link
                to={formURL(bookData.id)}
                className={`card-${cardSize}`}
            >
                <img 
                    className="card-image" 
                    src={bookData.min_picture ? bookData.min_picture : bookData.legacy_img} 
                    alt={bookData.name} 
                    onError={imgErrorHandler}
                />
                <h3 className="card-title">{bookData.name}</h3>
            </Link>
        )
    }
    else {
        return (
            <div
                className={`card-${cardSize}`}
            >
                <img 
                    className="card-image" 
                    onError={imgErrorHandler}
                    src={bookData.legacy_img ? bookData.legacy_img : bookData.min_picture}
                />
                {/* <h3 className="card-title">{bookData.name}</h3> */}
            </div>
        )
    }
}