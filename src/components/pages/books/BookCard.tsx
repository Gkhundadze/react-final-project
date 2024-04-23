import { Link } from "react-router-dom";
import { imgErrorHandler } from "../../shared/other/brokenImageHandler";
import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../../../contexts/FavoritesContext";
import { Book } from "../../../interfaces/Book";
import brokenImage from '../../../assets/images/broken-image.gif'





export const BookCard = (props: any) => {
    const { bookData, cardSize, clickable, specialClass, path } = props
    const { handleAddData, handleRemoveData, favorites } = useContext(FavoritesContext)
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
                    src={bookData.min_picture ? bookData.min_picture || bookData.legacy_img : brokenImage} 
                    alt={bookData.name} 
                    onError={imgErrorHandler}
                />
            </Link>
            <h3 className="card-title">{bookData.name}</h3>
            
            {(!bookData.translator || specialClass === 'promo') && cardSize != "small"
            // Books page 
                ? <>
                    <div className='book-price'>{bookData.variations[0].price} ₾</div>
                    <div className="stock-count">
                        დარჩენილია : <span className='count'>{bookData.isInStock}</span> ცალი
                    </div>
                    {/* <div className="translator">
                        თარგმანი :   <span className="person">
                            {bookData?.translator?.fullname ? bookData.translator.fullname : 'ინფორმაცია ვერ მოიძებნა'}
                        </span>
                    </div> */}
                    <div className="card-footer">
                    <Link 
                        to={path}
                        className='details-page card-button'
                    >
                        დეტალურად
                    </Link>
                    </div>
                </>
                : null
            }
            <div 
                className={`favorites-icon ${checkActiveCard(bookData.id)}`}
                onClick={(e) => {
                    
                    if(e.currentTarget.classList.contains('not')) {
                        handleAddData(bookData)
                    }
                    else {
                        handleRemoveData(bookData)
                    }
                    
                }}
            >
                <svg height="44px" width="44px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 501.28 501.28"  fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="3.0076799999999997"></g><g id="SVGRepo_iconCarrier"> <g> <polygon  points="501.28,194.37 335.26,159.33 250.64,12.27 250.64,419.77 405.54,489.01 387.56,320.29 "></polygon> <polygon points="166.02,159.33 0,194.37 113.72,320.29 95.74,489.01 250.64,419.77 250.64,12.27 "></polygon> </g> </g></svg>
            </div>         
            </div>
       
        )
    }
    else if(!clickable && cardSize === 'extra-small') {
        return (
            <div
                className={`card-${cardSize} ${specialClass}`}
            >
                <img 
                    className="card-image" 
                    onError={imgErrorHandler}
                    src={bookData.min_picture ? bookData.min_picture || bookData.legacy_img : brokenImage}
                />
                <h3 className="card-title">{bookData.name}</h3>
                <div 
                    className="remove-favorite-icon"
                    onClick={(e) => {
                        if(e.currentTarget.classList.contains('not')) {
                            handleAddData(bookData)
                        }
                        else {
                            handleRemoveData(bookData)
                        }
                    }}
                >
                    <svg fill="#000000" height="34px" width="34px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.965 27.965">
                        <g>
                            <g id="c142_x">
                                <path d="M13.98,0C6.259,0,0,6.261,0,13.983c0,7.721,6.259,13.982,13.98,13.982c7.725,0,13.985-6.262,13.985-13.982C27.965,6.261,21.705,0,13.98,0z M19.992,17.769l-2.227,2.224c0,0-3.523-3.78-3.786-3.78c-0.259,0-3.783,3.78-3.783,3.78l-2.228-2.224c0,0,3.784-3.472,3.784-3.781c0-0.314-3.784-3.787-3.784-3.787l2.228-2.229c0,0,3.553,3.782,3.783,3.782c0.232,0,3.786-3.782,3.786-3.782l2.227,2.229c0,0-3.785,3.523-3.785,3.787C16.207,14.239,19.992,17.769,19.992,17.769z"/></g>
                            <g id="Capa_1_104_">
                            </g>
                        </g>
                    </svg>
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
                    src={bookData.min_picture ? bookData.min_picture || bookData.legacy_img : brokenImage}
                />
                <h3 className="card-title">{bookData.name}</h3>
                <p>წელი {bookData.year}</p>
                <p>კატეგორია : {bookData.category?.name}</p>
                {bookData.description ? <p>{bookData.description}</p> : <p> წიგნის აღწერა ვერ მოიძებნა</p> }
                <div 
                className={`favorites-icon ${checkActiveCard(bookData.id)}`}
                onClick={(e) => {
                    if(e.currentTarget.classList.contains('not')) {
                        handleAddData(bookData)
                    }
                    else {
                        handleRemoveData(bookData)
                    }
                }}
            >
                <svg height="44px" width="44px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 501.28 501.28"  fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="3.0076799999999997"></g><g id="SVGRepo_iconCarrier"> <g> <polygon  points="501.28,194.37 335.26,159.33 250.64,12.27 250.64,419.77 405.54,489.01 387.56,320.29 "></polygon> <polygon points="166.02,159.33 0,194.37 113.72,320.29 95.74,489.01 250.64,419.77 250.64,12.27 "></polygon> </g> </g></svg>
            </div>  
            </div>
        )
    }
}