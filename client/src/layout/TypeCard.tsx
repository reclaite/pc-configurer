import React from 'react';
import {useNavigate} from "react-router-dom";

interface TypeCardProps {
    componentType: string;
    linkTo: string
}

const TypeCard: React.FC<TypeCardProps> = ({componentType, linkTo}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(linkTo)
    }

    return (
        <div role="button" className="card col-xs-1 col-sm-6 col-md-3 col-lg-2" onClick={handleClick}>
            <div className="card-body d-flex align-items-center flex-wrap text-center flex-column">
                <div className="col-md-4 mx-auto">
                    <img src={`${linkTo}.png`} className="img-fluid" alt={componentType}></img>
                </div>
                <h5 className="text-center mx-auto card-title fw-bold">{componentType}</h5>
            </div>
        </div>
    );
};

export default TypeCard;