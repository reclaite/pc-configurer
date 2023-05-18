import React, {useState} from 'react';

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
        <div className="card container min-vh-60 mx-auto">
            <div className="row justify-content-center mx-auto my-5">
                <div className="col-md-6 col-lg-8">
                    <h1>О нас</h1>
                    <p>Мы команда профессионалов, занимающаяся подбором компьютерных конфигураций.</p>
                    <h2 className="card-title">Свяжитесь с нами</h2>
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
            </div>
        </div>
    );
};

export default AboutPage;