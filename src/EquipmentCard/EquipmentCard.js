import React from 'react';
import {connector} from '../store/storeConnector';
import {getTypeTitle, formatDate} from '../utils';
import style from './EquipmentCard.module.scss';

function EquipmentCard({card, types, featureList, selectedCard, setSelectedCard}) {
    let cardClass = style.card;
    if (selectedCard && selectedCard.id === card.id) cardClass += ' ' + style.selected;

    let typeTitle = getTypeTitle(types, card.equipment_type);
    if (!typeTitle) typeTitle =
        <span className="load_error">{"...не удалось определить тип оборудования..."}</span>;

    return (
        <li key={card.id} className={cardClass} onClick={() => setSelectedCard(card)}>
            <table>
                <tbody>
                {card.inv_number ?
                    <tr>
                        <td>
                            Инв. номер:
                        </td>
                        <td>
                            {card.inv_number}
                        </td>
                    </tr>
                    :
                    null
                }
                <tr>
                    <td>
                        Тип:
                    </td>
                    <td>
                        {typeTitle}
                    </td>
                </tr>
                {card.title ?
                    <tr>
                        <td>
                            Описание:
                        </td>
                        <td>
                            {card.title}
                        </td>
                    </tr>
                    :
                    null
                }
                {card.comment ?
                    <tr>
                        <td>
                            Комментарий:
                        </td>
                        <td>
                            {card.comment}
                        </td>
                    </tr>
                    :
                    null
                }
                {card.worker ?
                    <tr>
                        <td>
                            Должность пользователя:
                        </td>
                        <td>
                            {card.worker}
                        </td>
                    </tr>
                    :
                    null
                }
                {card.purchase_date ?
                    <tr>
                        <td>
                            Дата приобретения:
                        </td>
                        <td>
                            {formatDate(card.purchase_date)}
                        </td>
                    </tr>
                    :
                    null
                }
                {card.price ?
                    <tr>
                        <td>
                            Стоимость:
                        </td>
                        <td>
                            {card.price}
                        </td>
                    </tr>
                    :
                    null
                }
                </tbody>
            </table>
            {featureList.length > 0 ?
                <details>
                    <summary>Характеристики:</summary>
                    <ul className={style.feature_list}>
                        {featureList.map(feature => {
                            return (
                                <li key={feature.id} className={style.feature}>
                                    <span>{feature.name}</span>
                                    <span>{feature.value}</span>
                                </li>
                            )
                        })}
                    </ul>
                </details>
                :
                null
            }
        </li>
    );
}

export default connector(EquipmentCard);