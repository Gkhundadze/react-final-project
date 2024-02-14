export const ErrorMessage = (props: { message: string }) => {
    const {message} = props
    return (
        <div className="error-wrapper">
            <h5>{message}</h5>
        </div>
    )
}