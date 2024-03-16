import { useState } from "react";



export const CategoryItem = (props:any) => {
    const [checked, setChecked] = useState<boolean>(false)
    const {category, categoryTrigger, pageReset} = props


    function categoryCheck() {
        if(checked) {
            setChecked(false)
            categoryTrigger('')
            pageReset(1)
        }
        else {
            setChecked(true)
            categoryTrigger(category.id)
            pageReset(1)
        }
        
    }

    return (
        <label className='category' >
            <input 
                onChange={categoryCheck} 
                checked={checked}
                type="checkbox" 
                name="category-check"
            />
                {category.name}
        </label>
    )
}