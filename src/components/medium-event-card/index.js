import { Link } from 'react-router-dom';

import './index.css';

const EventCardMedium = ({ id, imageUrl, name, date, status }) => {
   
    return (
        <div className="event-card-medium">
            <span className="event-card-medium-img">
                <img src={imageUrl ? imageUrl :"/default_event.png"} alt="event_cover" />
            </span>
            <div className="event-card-medium-content">
                <Link className="details-link" to={`/events/${id}`}>VIEW</Link>
                <div className="event-card-medium-content-text">
                    <p><span className="event-card-medium-content-heading" >Topic: </span>{name}</p>
                    <p> <span className="event-card-medium-content-heading date"> Date: </span>{date}</p>
                    <p><span className="event-card-medium-content-heading">Status: </span>{status}</p>
                </div>
            </div>
        </div>
    )
}

export default EventCardMedium;