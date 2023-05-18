import {useState} from "react";
import AddComponentForm from "./AddComponentForm";
import OuterContainer from "../../layout/OuterContainer";

const AdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Здесь выполнить проверку учетных данных на сервере
        setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        return (
            <OuterContainer>
                <h1>Админ-панель</h1>
                <button onClick={handleLogin}>Войти</button>
            </OuterContainer>
        );
    }

    return (
        <OuterContainer>
            <h1>Админ-панель</h1>
            <h2>Добавить комплектующие</h2>
            <AddComponentForm />
        </OuterContainer>
    );
};

export default AdminPage;