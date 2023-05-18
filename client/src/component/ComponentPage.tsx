import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

interface Component {
    id: number;
    name: string;
    price: number;
    socket?: string;
    cores?: number;
    threads?: number;
    capacity?: number;
    type?: string;
    speed?: number;
    ramSlots?: number;
    supportedType?: string;
    storageInterfaces?: string[];
    memorySize?: number;
    memoryType?: string;
}

interface ComponentPageProps {
    type: string;
}

const ComponentPage: React.FC<ComponentPageProps> = ({type}) => {
    const {id} = useParams<{ id: string }>();
    const [component, setComponent] = useState<Component | null>(null);

    useEffect(() => {
        // Fetch the component data from the backend based on the id and type
        // Here, you can make an API request to your backend to get the component details
        // and update the "component" state with the received data
        const fetchComponentData = async () => {
            try {
                const response = await fetch(`/api/${type}/${id}`);
                const data = await response.json();
                setComponent(data);
            } catch (error) {
                console.error('Error fetching component data:', error);
            }
        };

        fetchComponentData();
    }, [id, type]);

    if (!component) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>{component.name}</h1>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Price: ${component.price}</h5>
                    {type === 'cpu' && (
                        <>
                            <p className="card-text">Socket: {component.socket}</p>
                            <p className="card-text">Cores: {component.cores}</p>
                            <p className="card-text">Threads: {component.threads}</p>
                        </>
                    )}
                    {type === 'memory' && (
                        <>
                            <p className="card-text">Capacity: {component.capacity} GB</p>
                            <p className="card-text">Type: {component.type}</p>
                            <p className="card-text">Speed: {component.speed} MHz</p>
                        </>
                    )}
                    {type === 'motherboard' && (
                        <>
                            <p className="card-text">Socket: {component.socket}</p>
                            <p className="card-text">RAM Slots: {component.ramSlots}</p>
                            <p className="card-text">Supported Memory Type: {component.supportedType}</p>
                            <p className="card-text">
                                Storage Interfaces: {component.storageInterfaces?.join(', ')}
                            </p>
                        </>
                    )}
                    {type === 'storage' && (
                        <>
                            <p className="card-text">Capacity: {component.capacity} GB</p>
                            <p className="card-text">Type: {component.type}</p>
                            {/*<p className="card-text">Interface Type: {component.interfaceType}</p>*/}
                        </>
                    )}
                    {type === 'videoCard' && (
                        <>
                            <p className="card-text">Memory Size: {component.memorySize} GB</p>
                            <p className="card-text">Memory Type: {component.memoryType}</p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ComponentPage;