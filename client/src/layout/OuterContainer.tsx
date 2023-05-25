import React, {ReactNode} from "react";

interface ContainerProps {
    children: ReactNode;
}

const OuterContainer = ({children}: ContainerProps) => {
    return (
        <div className="card container w-30 min-vh-60 mx-auto my-auto p-3 mb-5">
            <div className="row my-3">
                {children}
            </div>
        </div>
    );
}
export default OuterContainer;