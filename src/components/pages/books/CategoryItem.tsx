import { useEffect, useState } from "react";



export const CategoryItem = (props:any) => {
    const {
        category, 
        setMainCategory, 
        pageReset, 
        setCheckedCategoryIds, 
        checkedCategoryIds,
        uncheck
    } = props
    const [checked, setChecked] = useState<boolean>(false)

    
    
    // [...prev, category.id]
    function removeOldCategory(oldCategories:number[]) {
        
        if(oldCategories.length > 0) {
            const result:number[] = []
            oldCategories.forEach((oldCat:number) => {
                if(oldCat !== category.id) {
                    result.push(oldCat)
                    
                }else {
                    return result
                }
            })
            return result
        }
        return  []
    }

    function categoryCheck() {
        if(checked) {
            setChecked(false)
            setMainCategory('')
            pageReset(1)
            setCheckedCategoryIds(removeOldCategory(checkedCategoryIds))
        }
        else {
            setCheckedCategoryIds((prev:any) => [... new Set([...prev, category.id])])
            setChecked(true)
            setMainCategory(category.id)
            pageReset(1)
        }
    }
    useEffect(() => {
        if(uncheck) {
            setChecked(false)
        }
    }, [uncheck])
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