import { useEffect, useState } from "react"


export const TypeFilter = (props:any) => {
    const {bookType, setBookType, name, uncheck} = props
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

    useEffect(() => {
        if(uncheck) {
            setChecked(false)
        }
    }, [uncheck])

    return (
        <>
            <label className="type">
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