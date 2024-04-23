import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";


export const TypeFilter = (props:any) => {
    const {bookType, setBookType, name, uncheck} = props
    const [searchParams, setSearchParams] = useSearchParams();
    const [checked, setChecked] = useState<boolean>(false)
    const [valueToShow, setValueToShow] = useState<string>(() => {
        if(name === 'paper') {
            return 'წიგნი'
        }
        else {
            return 'აუდიო'
        }
    })


    function typeFilter() {
        if(checked) {
            setChecked(false)
            setBookType('')
        }else {
            setChecked(true)
            setBookType(name)
        }
    }

    function checkCheckbox() {
        if(searchParams.getAll('type[]') !== null) {
            searchParams.getAll('type[]').forEach((el) => {
                if(el === name) {
                    setChecked(true)
                    setBookType(name)
                }

            })
        }
    }
    useEffect(() => {
        if(uncheck) {
            setChecked(false)
        }
    }, [uncheck])
    useEffect(() => {
        checkCheckbox()
    }, [])

    return (
        <>
            <label className={`type ${checked ? 'checked' : ''}`} >
                <input 
                    type="checkbox" 
                    name="type-filter"
                    checked={checked}
                    onChange={typeFilter}
                />
                {valueToShow}
            </label>
        </>
    )
}