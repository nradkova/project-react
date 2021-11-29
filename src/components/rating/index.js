import './index.css'

const Rating = () => {
    return (
        <div className="rating">
            <div className="stars">
                <form action="">
                    <input className="star star-5" id="star-5" type="radio" name="star" />
                    <label className="star star-5" htmlFor="star-5"></label>
                    <input className="star star-4" id="star-4" type="radio" name="star" />
                    <label className="star star-4" htmlFor="star-4"></label>
                    <input className="star star-3" id="star-3" type="radio" name="star" />
                    <label className="star star-3" htmlFor="star-3"></label>
                    <input className="star star-2" id="star-2" type="radio" name="star" />
                    <label className="star star-2" htmlFor="star-2"></label>
                    <input className="star star-1" id="star-1" type="radio" name="star" />
                    <label className="star star-1" htmlFor="star-1"></label>
                </form>
            </div>
            <p>click the stars</p>
        </div >
    )
}

export default Rating