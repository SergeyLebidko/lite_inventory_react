import React from 'react';
import {connector} from '../store/storeConnector';
import style from './EquipmentBlock.module.scss';

function EquipmentBlock({cards, types, features, selectedCard, equipmentsLoadError, setSelectedCard}) {
    let getTypeTitle = typeId => {
        for (let type of types) if (type.id === typeId) return type.title;
        return null;
    }

    let getFeaturesList = cardId => {
        return features.filter(feature => feature.equipment_card === cardId);
    }

    let cardList = '';
    if (cards) {
        cardList = cards.map(card => {
            let typeTitle = getTypeTitle(card.equipment_type);
            if (!typeTitle) typeTitle =
                <span className="load_error">{"...не удалось определить тип оборудования..."}</span>;

            let featureList = getFeaturesList(card.id);

            let cardClass = style.card;
            if (selectedCard && selectedCard.id === card.id) cardClass += ' ' + style.selected;

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
                                    {card.purchase_date}
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
        });
    }

    let content = '';
    if (cardList.length > 0) content = <ul className={style.card_list}>{cardList}</ul>;

    return (
        <div className={style.container}>
            {equipmentsLoadError ? <div className="load_error">{equipmentsLoadError}</div> : content}
        </div>
    );
}

export default connector(EquipmentBlock);