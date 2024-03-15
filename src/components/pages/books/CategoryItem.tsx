import { useState } from "react";



export const CategoryItem = (props:any) => {
    const [checked, setChecked] = useState<boolean>(false)
    const {category, categoryTrigger} = props


    function categoryCheck() {
        if(checked) {
            setChecked(false)
            categoryTrigger('')
        }
        else {
            setChecked(true)
            categoryTrigger(category.id)
        }
        
    }

    return (
        <label className='category' >
            <input 
                onChange={categoryCheck} 
                checked={checked}
                type="checkbox" 
                name="category-check"/>
                {category.name}
        </label>
    )
}