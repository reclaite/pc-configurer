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
        <div className="card text-center col-xs-1 col-sm-6 col-md-3 col-lg-2" onClick={handleClick}>
            <div className="card-body">
                <h5 className="card-title text-center fw-bold">{componentType}</h5>
            </div>
        </div>
    );
};

export default TypeCard;