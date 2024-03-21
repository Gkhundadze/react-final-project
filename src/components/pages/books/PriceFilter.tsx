import { useEffect, useState } from "react"
import { Book } from "../../../interfaces/Book"



export const PriceFilter = (props:any) => {
    const maxPrice = 200
    const {Books, setBooks, uncheck} = props
    const [priceFrom, setPriceFrom] = useState<number>(0)
    const [priceTo, setPriceTo] = useState<number>(maxPrice)

    function priceFromHandler(e:any) {
        setPriceFrom(Number(e.target.value))
    }

    function priceToHandler(e:any) {
        setPriceTo(Number(e.target.value))
    }

    function filterData() {
        const filtered = Books.filter((book:Book) => {
            return book.variations[0].price >= priceFrom && book.variations[0].price <= priceTo
        })
        setFilteredData(filtered)
    }

    function setFilteredData(data:Book[]) {
        if(data.length > 0) {
            setBooks(data)
        }
    }
    
    useEffect(() => {
        if(uncheck) {
            setPriceFrom(0)
            setPriceTo(maxPrice)
        }
        filterData()
    }, [priceFrom, priceTo, uncheck])
    return (
        <>
            <label>
                from
                <input type="text" value={priceFrom} onChange={priceFromHandler} />
            </label>
            <label>
                to
                <input type="text" value={priceTo} onChange={priceToHandler}  />
            </label>
        </>
    )
}