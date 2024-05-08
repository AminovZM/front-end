document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const formData = new URLSearchParams();
        formData.append('grant_type', '');
        formData.append('username', username);
        formData.append('password', password);
        formData.append('scope', '');
        formData.append('client_id', 1);
        formData.append('client_secret', 1);

        const response = await fetch('https://aminov-test.onrender.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json' // Добавляем заголовок accept
            },
            body: formData,
            credentials: 'include' // Включаем передачу куки
        });
        // Получаем куки из заголовка ответа
        const cookies = response.headers.raw()['set-cookie'];

        if (response.ok) {
            // После успешной авторизации сохраняем куки
            const cookie = cookies.map(cookie => cookie.split(';')[0]).join(';');

            // Далее при выполнении следующих запросов передаем сохраненные куки
            const userDataResponse = await fetch('https://aminov-test.onrender.com/users/me', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Cookie': cookie // Передаем сохраненные куки
                }
            });

            // Обработка ответа
            const userData = await userDataResponse.json();
            console.log('Данные пользователя:', userData);


            alert(response2.status);
            // Если запрос успешен, отобразите полученные данные
            //document.getElementById('response').textContent = `Имя пользователя: ${data.username}, День рождения: ${data.birthdate}`;
            document.getElementById('response').textContent = 'Вы вошли в систему\nstatus code ' + response.status;
            window.location.href = '../index.html'; // Перенаправление на другую страницу в той же директории
            //const { token } = await response.json();

        } else {
            // Если запрос вернул ошибку, отобразите сообщение об ошибке
            document.getElementById('response').textContent = 'Ошибка: Пароль или логин неверны';
        }
    } catch (error) {
        // Если произошла ошибка при выполнении запроса, отобразите сообщение об ошибке
        console.error('Ошибка:', error);
        document.getElementById('response').textContent = 'Ошибка при отправке запроса';
    }
});



