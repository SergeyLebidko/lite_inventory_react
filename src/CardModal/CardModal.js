import React, {useState, useEffect} from 'react';
import {connector} from '../store/storeConnector';
import {getTypeTitle, getFeaturesList} from '../utils';
import style from './CardModal.module.scss';

function CardModal({card, types, features, selectedGroup, error, clearError, save, closeForm}) {
    let hasCard = card !== null;

    let [invNumber, setInvNumber] = useState(hasCard ? card.inv_number : '');
    let [type, setType] = useState(hasCard ? card.equipment_type : types[0].id);
    let [title, setTitle] = useState(hasCard ? card.title : '');
    let [comment, setComment] = useState(hasCard ? card.comment : '');
    let [worker, setWorker] = useState(hasCard ? card.worker : '');
    let [purchaseDate, setPurchaseDate] = useState(hasCard ? card.purchase_date : '');
    let [price, setPrice] = useState(hasCard ? card.price : '');

    let [tmpFeatures, setTmpFeatures] = useState(hasCard ? getFeaturesList(features, card.id) : []);
    let [inputError, setInputError] = useState(null);

    // Сбрасываем ошибки при монтировании
    useEffect(() => clearError(), []);

    let invNumberChangeHandler = event => setInvNumber(event.target.value);
    let typeChangeHandler = event => setType(event.target.value);
    let titleChangeHandler = event => setTitle(event.target.value);
    let commentChangeHandler = event => setComment(event.target.value);
    let workerChangeHandler = event => setWorker(event.target.value);
    let purchaseDateChangeHandler = event => setPurchaseDate(event.target.value);
    let priceChangeHandler = event => {
        if (isNaN(+event.target.value)) return;
        setPrice(event.target.value);
    }

    let saveHandler = () => save(
        Object.assign(
            card || {},
            {
                group: (card || {}).group || selectedGroup.id,
                inv_number: invNumber,
                equipment_type: type,
                title,
                comment,
                worker,
                purchase_date: purchaseDate,
                price
            }
        )
    );

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
                        <input type="text" id="inv_number_field" value={invNumber} onChange={invNumberChangeHandler}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="equipment_type_field">Тип:</label>
                    </td>
                    <td>
                        <select id="equipment_type_field" defaultValue={type} onChange={typeChangeHandler}>
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
                        <input type="text" id="title_field" value={title} onChange={titleChangeHandler}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="comment_field">Комментарий:</label>
                    </td>
                    <td>
                        <input type="text" id="comment_field" value={comment} onChange={commentChangeHandler}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="worker_field">Должность пользователя:</label>
                    </td>
                    <td>
                        <input type="text" id="worker_field" value={worker} onChange={workerChangeHandler}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="purchase_date_field">Дата приобретения:</label>
                    </td>
                    <td>
                        <input type="date"
                               id="purchase_date_field"
                               value={purchaseDate}
                               onChange={purchaseDateChangeHandler}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="price_field">Стоимость приобретения:</label>
                    </td>
                    <td>
                        <input type="text" id="price_field" value={price} onChange={priceChangeHandler}/>
                    </td>
                </tr>
                </tbody>
            </table>
            <div>
                <h1>Вводите, редактируйте или удаляйте характеристики</h1>
                <div>
                    <input type="button" value="Добавить"/>
                    <input type="button" value="Изменить"/>
                    <input type="button" value="Удалить"/>
                </div>
                <div>
                    <div>
                        <input type="text"/>
                        <input type="button" value="Отмена"/>
                        <input type="button" value="Сохранить"/>
                    </div>
                    {inputError ? <div className="error">{inputError}</div> : ''}
                </div>
                {tmpFeatures.length > 0 ?
                    <ul>
                        {tmpFeatures.map(feature => (
                            <li>
                                <span>{feature.name}</span>
                                <span>{feature.value}</span>
                            </li>
                        ))}
                    </ul>
                    :
                    ''
                }
            </div>
            {error ? <div className="error">{error}</div> : ''}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={closeForm}/>
                <input type="button" value="Сохранить" onClick={saveHandler}/>
            </div>
        </div>
    );
}

CardModal.defaultProps = {
    card: null
}

export default connector(CardModal);