/**
 * InfoCard Component
 * A presentation component that displays information in a card format, including a title, description, and icons.
 *
 * @param {string} title - The title of the card, displayed prominently at the top.
 * @param {string} description - A brief description or content of the card, displayed below the title.
 * @param {string} iconClass - The class name for the Bootstrap icon to be displayed alongside the title.
 *
 * Usage:
 * ```jsx
 * <InfoCard 
 *   title="Sample Title" 
 *   description="This is a sample description for the InfoCard component." 
 *   iconClass="example-icon"
 * />
 * ```
 */
const InfoCard = ({title, description, iconClass}) => {
    return  <div className="card col mb-2 border-dark text-bg-secondary">
        <div  className="card-body">
            <h3 className="card-title">
                <i className={`bi ${iconClass}`}/>
                {title}
                <i className={`bi ${iconClass}`}/>
            </h3>
            <p className="card-text">{description}</p>
        </div>
    </div>
};

export default InfoCard;