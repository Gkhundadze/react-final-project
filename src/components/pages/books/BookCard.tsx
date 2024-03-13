import { Link } from "react-router-dom";
import { imgErrorHandler } from "../../shared/other/brokenImageHandler";
import brokenImage from '../../../assets/images/broken-image.gif'





export const BookCard = (props: any) => {
    const { bookData, formURL, cardSize, clickable, specialClass, path } = props




   
    
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
            <div className={`card-${cardSize} ${specialClass ? specialClass : ''}`}>
            <Link
                to={path}
            >
                <img 
                    className="card-image" 
                    src={bookData.min_picture ? bookData.min_picture : bookData.legacy_img} 
                    alt={bookData.name} 
                    onError={imgErrorHandler}
                />
            </Link>
            <h3 className="card-title">{bookData.name}</h3>
            
                        {(!bookData.translator || specialClass === 'promo') && cardSize != "small"
                            ? <>
                                <div className='book-price'>{bookData.variations[0].price} ₾</div>
                                <div className="stock-count">
                                    დარჩენილია : <span className='count'>{bookData.isInStock}</span> ცალი
                                </div>
                                <div className="translator">
                                    თარგმანი :   <span className="person">
                                        {bookData?.translator?.fullname ? bookData.translator.fullname : 'ინფორმაცია ვერ მოიძებნა'}
                                    </span>
                                </div>
                                <Link 
                                    to={path}
                                    className='details-page'
                                >
                                    დეტალურად
                                </Link>
                            </>
                            : null
                        }
                        
            </div>
       
        )
    }
    else {
        return (
            <div
                className={`card-${cardSize} ${specialClass}`}
            >
                <img 
                    className="card-image" 
                    onError={imgErrorHandler}
                    src={bookData.legacy_img ? bookData.legacy_img : bookData.min_picture}
                />
                <h3 className="card-title">{bookData.name}</h3>
                <p>წელი {bookData.year}</p>
                <p>კატეგორია : {bookData.category?.name}</p>
                {bookData.description ? <p>{bookData.description}</p> : <p> წიგნის აღწერა ვერ მოიძებნა</p> }
            </div>
        )
    }
}