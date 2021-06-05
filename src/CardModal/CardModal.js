import React, {useState, useEffect} from 'react';
import {connector} from '../store/storeConnector';
import {getTypeTitle, getFeaturesList} from '../utils';
import {ERROR_TIMEOUT} from '../settings';
import style from './CardModal.module.scss';

const NO_FORM = 'no_form';
const EDIT_MODE = 'edit_mode';
const CREATE_MODE = 'create_mode';

let featureComparator = (a, b) => {
    if (a.name > b.name) return 1;
    if (a.name === b.name) return 0;
    return -1
}

function CardModal({card, types, features, selectedGroup, error, clearError, save, closeForm}) {
    let hasCard = card !== null;

    let [invNumber, setInvNumber] = useState(hasCard ? card.inv_number : '');
    let [type, setType] = useState(hasCard ? card.equipment_type : types[0].id);
    let [title, setTitle] = useState(hasCard ? card.title : '');
    let [comment, setComment] = useState(hasCard ? card.comment : '');
    let [worker, setWorker] = useState(hasCard ? card.worker : '');
    let [purchaseDate, setPurchaseDate] = useState(hasCard ? card.purchase_date : '');
    let [price, setPrice] = useState(hasCard ? card.price : '');

    let [featureFormMode, setFeatureFormMode] = useState(NO_FORM);
    let [tmpFeatures, setTmpFeatures] = useState(hasCard ? getFeaturesList(features, card.id) : []);
    let [selectedFeature, setSelectedFeature] = useState(null);
    let [featureName, setFeatureName] = useState('');
    let [featureValue, setFeatureValue] = useState('');
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

    let featureNameChangeHandler = event => setFeatureName(event.target.value);
    let featureValueChangeHandler = event => setFeatureValue(event.target.value);

    let createFeatureHandler = () => {
        setInputError(null);
        setFeatureName('');
        setFeatureValue('');
        setFeatureFormMode(CREATE_MODE);
    }

    let editFeatureHandler = () => {
        if (!selectedFeature) return;
        setInputError(null);
        setFeatureName(selectedFeature.name);
        setFeatureValue(selectedFeature.value);
        setFeatureFormMode(EDIT_MODE);
    }

    let removeFeatureHandler = () => {
        if (!selectedFeature) return;
        setTmpFeatures(tmpFeatures.filter(feature => feature.id !== selectedFeature.id));
        setSelectedFeature(null);
    }

    let featureFormCancelHandler = () => setFeatureFormMode(NO_FORM);
    let featureFormSaveHandler = () => {
        if (featureName.trim() === '' || featureValue.trim() === '') {
            setInputError('Пустые значения недопустимы');
            setTimeout(() => setInputError(null), ERROR_TIMEOUT);
            return;
        }

        switch (featureFormMode) {
            case CREATE_MODE:
                let createdFeature = {
                    name: featureName.trim(),
                    value: featureValue.trim()
                }
                if (card) createdFeature.equipment_card = card.id;
                setTmpFeatures([...tmpFeatures, createdFeature].sort(featureComparator));
                break;
            case EDIT_MODE:
                setTmpFeatures(tmpFeatures.map(feature => {
                    if (feature !== selectedFeature) return feature;
                    return {
                        ...selectedFeature,
                        name: featureName.trim(),
                        value: featureValue.trim()
                    }
                }).sort(featureComparator));
                break;
        }

        // Закрываем форму
        setFeatureFormMode(NO_FORM);
    }

    // Сохраняем введенные данные
    let saveHandler = () => {
        save(
            card,
            Object.assign(
                card ? {...card} : {},
                {
                    group: (card || {}).group || selectedGroup.id,
                    inv_number: invNumber.trim(),
                    equipment_type: type,
                    title: title.trim(),
                    comment: comment.trim(),
                    worker: worker.trim(),
                    purchase_date: purchaseDate,
                    price: price.trim()
                }
            )
        );
    };

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
            <div className={style.features_block}>
                <h1>Вводите, редактируйте или удаляйте характеристики</h1>
                <div className={style.features_control}>
                    <input type="button" value="Добавить" onClick={createFeatureHandler}/>
                    <input type="button" value="Изменить" onClick={editFeatureHandler}/>
                    <input type="button" value="Удалить" onClick={removeFeatureHandler}/>
                </div>
                {featureFormMode !== NO_FORM ?
                    <div className={style.features_form}>
                        <div>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="feature_name_field">Характеристика:</label>
                                    </td>
                                    <td>
                                        <input type="text"
                                               id="feature_name_field"
                                               value={featureName}
                                               onChange={featureNameChangeHandler}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="feature_value_field">Значение:</label>
                                    </td>
                                    <td>
                                        <input type="text"
                                               id="feature_value_field"
                                               value={featureValue}
                                               onChange={featureValueChangeHandler}
                                        />
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        {inputError ? <div className="error">{inputError}</div> : ''}
                        <input type="button" value="Сохранить" onClick={featureFormSaveHandler}/>
                        <input type="button" value="Отмена" onClick={featureFormCancelHandler}/>
                    </div>
                    :
                    ''
                }
                {tmpFeatures.length > 0 ?
                    <ul>
                        {tmpFeatures.map((feature, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    if (featureFormMode !== EDIT_MODE) setSelectedFeature(feature)
                                }}
                                className={selectedFeature === feature ? style.selected : ''}
                            >
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