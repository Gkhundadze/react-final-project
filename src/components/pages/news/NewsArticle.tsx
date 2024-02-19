import brokenImage from '../../../assets/images/broken-image.gif'


export const NewsArticle = (props:any) => {
    const { article } = props
    
    const imgErrorHandler = (e:any) => {
        e.target.src = brokenImage
    }
    return (
        <div className="article-card">
            <img
                src={article.image_url ? article.image_url : brokenImage}
                alt={article.title}
                onError={imgErrorHandler}
            />
            <h3 title={article.title}>{article.title}</h3>
            <p title={article.description}>{article.description ? article.description : 'No Description Available'}</p>
        </div>
    )
}