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