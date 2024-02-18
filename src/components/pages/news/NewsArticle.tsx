import brokenImage from '../../../assets/images/broken-image.gif'


export const NewsArticle = (props:any) => {
    const { article } = props
    

    return (
        <div className="article-card">
            <img
                src={article.image_url ? article.image_url : brokenImage}
                alt={article.title}
            />
            <h3>{article.title}</h3>
            <p>{article.description ? article.description : 'No Description Available'}</p>
        </div>
    )
}