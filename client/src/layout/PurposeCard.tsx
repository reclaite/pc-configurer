import React from "react";
import {ConfigurationType, saveUser, UserInfo} from "../lib/PcApp";

interface PurposeCardProps {
    user: UserInfo,
    configurationType: ConfigurationType
}

const PurposeCard: React.FC<PurposeCardProps> = ({user, configurationType}) => {

    const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
        user.configurationType = configurationType;
        saveUser(user);
        window.location.reload();
    };

    return (
        <div role="button" className="card col-xs-1 col-sm-5 col-md-3 col-lg-2" onClick={handleClick}>
            <div className="card-body d-flex align-items-center flex-wrap text-center flex-column">
                <img
                    className="img-fluid col-md-4 col-sm-3"
                    src={`/types/${configurationType.name.toLowerCase()}.png`}
                    alt={configurationType.title}
                ></img>
                <h5 className="text-center my-auto card-title fw-bold">{configurationType.title}</h5>
            </div>
        </div>
    );
}

export default PurposeCard;