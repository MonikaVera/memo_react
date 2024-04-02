const Card = ({title, description, iconClass}) => {
    return  <div className="card col m-2 p-2 border-dark text-bg-secondary">
        <h3>
            <i className={`bi ${iconClass}`}/>
            {title}
            <i className={`bi ${iconClass}`}/>
        </h3>
        <p>{description}</p>
    </div>
};

export default Card;