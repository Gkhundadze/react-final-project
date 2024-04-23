export const PriceFilter = (props:any) => {
    const {startPrice, handleStartPrice, endPrice, handleEndPrice}  = props
   
    return (
        <>
            <label>
                <input
                    value={startPrice}
                    type="text"
                    pattern="[0-9]"
                    maxLength={3}
                    onChange={handleStartPrice}
                />
                ₾ დან
            </label>
            <label>
                <input
                    value={endPrice}
                    type="text"
                    pattern="[0-9]"
                    maxLength={4}
                    onChange={handleEndPrice}
                />
                ₾ მდე
            </label>
            
        </>
    )
}