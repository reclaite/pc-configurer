import React, {ReactNode} from "react";

interface WrapperProps {
    children: ReactNode;
}

const Wrapper = ({children}: WrapperProps) => {
    return (
        <div className="min-vh-100 min-vw-80">
            {children}
        </div>
    );
};

export default Wrapper;