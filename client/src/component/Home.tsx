import React from 'react';
import {Button, Card} from 'react-bootstrap';

const Home: React.FC = () => {
    return (
        <div className="container">
            <Card>
                <Card.Body>
                    <Card.Title>Welcome to PC Configurer</Card.Title>
                    <Card.Text>
                        Use our website to configure your own custom PC with ease.
                    </Card.Text>
                    <Button variant="primary" href="/configurator">
                        Start Configuring
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Home;