import React, {useState} from 'react';
import OuterContainer from "../../layout/OuterContainer";

const AboutPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Отправка данных формы на сервер
        console.log('Отправлено!');
    };

    return (
        <OuterContainer>
            <div className="mx-auto col-md-6 col-lg-8">
                <h1>О нас</h1>
                <hr className="my-4"></hr>
                <p>Мы команда профессионалов, занимающаяся подбором компьютерных конфигураций.</p>
                <h2 className="card-title">Свяжитесь с нами</h2>
                <hr className="my-4"></hr>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 card-text">
                        <label htmlFor="name" className="form-label">Имя</label>
                        <input type="text" className="form-control" id="name" value={name}
                               onChange={e => setName(e.target.value)} required/>
                    </div>
                    <div className="mb-3 card-text">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={email}
                               onChange={e => setEmail(e.target.value)} required/>
                    </div>
                    <div className="mb-3 card-text">
                        <label htmlFor="message" className="form-label">Сообщение</label>
                        <textarea className="form-control" id="message" value={message}
                                  onChange={e => setMessage(e.target.value)} required/>
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">Отправить</button>
                </form>
            </div>
        </OuterContainer>
    );
};

export default AboutPage;