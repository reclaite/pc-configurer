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
        <div role="button" className="card" onClick={handleClick}>
            <div className="card-body d-flex align-items-center flex-wrap text-center flex-column">
                <div className="col-md-4 col-sm-3 col-2 mx-auto">
                    <img
                        src={`/types/${configurationType.name.toLowerCase()}.png`}
                        className="img-fluid"
                        alt={configurationType.title}
                    ></img>
                </div>
                <h5 className="text-center mx-auto card-title fw-bold">{configurationType.title}</h5>
            </div>
        </div>
    );
}

export default PurposeCard;