import { Link } from "react-router-dom";
import { imgErrorHandler } from "../../shared/other/brokenImageHandler";
import { useContext } from "react";
import { FavoritesContext } from "../../../contexts/FavoritesContext";
import { Book } from "../../../interfaces/Book";






export const BookCard = (props: any) => {
    const { bookData, cardSize, clickable, specialClass, path } = props
    const { handleAddData, favorites } = useContext(FavoritesContext)


    const vaforitesTrigger = (e:any) => {
        e.target.classList.toggle('active')
        
    }

    function findArrayElementById(array:Book[], id:number) {
        return array.find((element:Book) => {
          return element.id === id;
        })
      }
    const checkActiveCard = (id:number) => {
        return findArrayElementById(favorites, id) ? 'active' : 'not'
        
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
            <div 
                className={`vaforites-icon ${checkActiveCard(bookData.id)}`}
                onClick={() => {
                    handleAddData(bookData)
                }}
            >
                <svg height="64px" width="64px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 501.28 501.28"  fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="3.0076799999999997"></g><g id="SVGRepo_iconCarrier"> <g> <polygon  points="501.28,194.37 335.26,159.33 250.64,12.27 250.64,419.77 405.54,489.01 387.56,320.29 "></polygon> <polygon points="166.02,159.33 0,194.37 113.72,320.29 95.74,489.01 250.64,419.77 250.64,12.27 "></polygon> </g> </g></svg>
            </div>         
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