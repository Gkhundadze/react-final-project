import { createContext, useEffect, useState } from "react"



export const NavigationContext = createContext<string>('')

export const NavigationProvider = ({children}:any) => {
    const [navigationURL, setNavigationURL] = useState<string>('')

    function handleNavigationUrl(urlString:any):void {

        if(urlString.length > 0) {
            setNavigationURL(urlString)
        }
        else {
            return
        }

    }
    return (
        <NavigationContext.Provider value={
                {
                    handleNavigationUrl,
                    navigationURL
                }
            }
        >
            {children}
        </NavigationContext.Provider>
    )

}