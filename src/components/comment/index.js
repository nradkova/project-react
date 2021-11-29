import './index.css'

const CustomComment = ({ id,creator,text }) => {

    return (
        <div className="comment-container">
            <div className="comment-author"> 
            <i className="fas fa-user-circle"></i>
            <span>{creator}</span>
            </div>
            <div className="comment-text">
                {text}
            </div>
        </div>
    )
}

export default CustomComment