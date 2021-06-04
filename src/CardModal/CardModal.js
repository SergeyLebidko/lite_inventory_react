import React, {useState} from 'react';
import {connector} from '../store/storeConnector';
import {getTypeTitle} from '../utils';
import style from './CardModal.module.scss';

function CardModal({card, types, closeForm}) {
    let [invNumber, setInvNumber] = useState(card === null ? '' : card.inv_number);
    let [title, setTitle] = useState(card === null ? '' : card.title);
    let [comment, setComment] = useState(card === null ? '' : card.comment);
    let [worker, setWorker] = useState(card === null ? '' : card.worker);
    let [purchaseDate, setPurchaseDate] = useState(card === null ? '' : card.purchase_date);
    let [price, setPrice] = useState(card === null ? '' : card.price);

    return (
        <div className={style.container + ' ' + style.modal}>
            <h1>Введите или отредактируйте поля учетной карточки</h1>
            <table>
                <tbody>
                <tr>
                    <td>
                        <label htmlFor="inv_number_field">Инв. номер:</label>
                    </td>
                    <td>
                        <input type="text" id="inv_number_field" value={invNumber}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="equipment_type_field">Тип:</label>
                    </td>
                    <td>
                        <select id="equipment_type_field" defaultValue={card.equipment_type}>
                            {types.map(type => (
                                <option key={type.id} value={type.id}>
                                    {getTypeTitle(types, type.id)}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="title_field">Описание:</label>
                    </td>
                    <td>
                        <input type="text" id="title_field" value={title}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="comment_field">Комментарий:</label>
                    </td>
                    <td>
                        <input type="text" id="comment_field" value={comment}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="worker_field">Должность пользователя:</label>
                    </td>
                    <td>
                        <input type="text" id="worker_field" value="worker"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="purchase_date_field">Дата приобретения:</label>
                    </td>
                    <td>
                        <input type="date" id="purchase_date_field" value={purchaseDate}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="price_field">Стоимость приобретения:</label>
                    </td>
                    <td>
                        <input type="text" id="price_field" value={price}/>
                    </td>
                </tr>
                </tbody>
            </table>
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={closeForm}/>
                <input type="button" value="Сохранить"/>
            </div>
        </div>
    );
}

export default connector(CardModal);

