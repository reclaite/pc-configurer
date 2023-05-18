import React, {ReactNode} from "react";

interface ContainerProps {
    children: ReactNode;
}

const OuterContainer = ({children}: ContainerProps) => {
    return (
        <div className="card container w-30 min-vh-60 mx-auto">
            <div className="row justify-content-center mx-auto my-5">
                {children}
            </div>
        </div>
    );
}
export default OuterContainer;