import $ from 'jquery';
import {LOGIN_URL} from '../settings';

export function loadAccount(username, password) {
    return () => {
        $.ajax(LOGIN_URL, {
            method: 'post',
            data: {
                username,
                password
            }
        }).then(data => {
            console.log('Успешно прислали токен ', data);
            localStorage.setItem('li_token', data.token);
        }).catch(err => {
            console.log('Произошла ошибка ', err);
        })
    }
}
