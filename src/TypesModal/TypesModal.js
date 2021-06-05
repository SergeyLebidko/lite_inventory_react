import React, {useState, useEffect} from 'react';
import {connector} from '../store/storeConnector';
import style from './TypesModal.module.scss';
import {ERROR_TIMEOUT} from '../settings';

const NO_FORM = 'no_form';
const EDIT_FORM = 'edit_form';
const ADD_FORM = 'add_form';

let typesComparator = (a, b) => {
    if (a.title < b.title) return -1;
    if (a.title === b.title) return 0;
    return 1
}

function TypesModal({update, types, loadTypes, clearTypes, error, clearError, loadError, clearLoadError, closeForm}) {
    let [tmpTypes, setTmpTypes] = useState(types);
    let [selectedType, setSelectedType] = useState(null);

    let [innerFormMode, setInnerFormMode] = useState(NO_FORM);
    let [inputValue, setInputValue] = useState('');
    let [inputError, setInputError] = useState(null);

    // При монтировании сбрасываем список типов и ошибки и снова запускаем загрузку списка типов
    useEffect(() => {
        clearTypes();
        clearLoadError();
        clearError();
        loadTypes();
    }, []);

    // При обновлении списка с сервера, сразу же заносим данные во временный список, с которым будем работать
    useEffect(() => setTmpTypes(types), [types]);

    // Обработчик нажатия на кнопку Удалить
    let removeTypeHandler = () => {
        if (!selectedType) return;
        setTmpTypes(tmpTypes.filter(type => type !== selectedType));
        setSelectedType(null);
    }

    // Обработчик нажатия на кнопку Добавить
    let addTypeHandler = () => {
        setInnerFormMode(ADD_FORM);
        setInputValue('');
    };

    // Обработчик нажатия на кнопку Изменить
    let editTypeHandler = () => {
        if (!selectedType) return;
        setInnerFormMode(EDIT_FORM);
        setInputValue(selectedType.title);
    };

    // Обработчик нажатия на кнопку Сохранить
    let saveChangeHandler = () => update(types, tmpTypes);

    // Обработчик нажатия на кнопку Отмена во внутренней форме
    let innerFormCancelHandler = () => setInnerFormMode(NO_FORM);

    // Обработчик нажатия на кнопку Сохранить во внутренней форме
    let innerFormSaveHandler = () => {
        switch (innerFormMode) {
            case ADD_FORM: {
                if (checkInputValue()) return;

                let addedType = {title: inputValue.trim()}
                setTmpTypes([...tmpTypes, addedType].sort(typesComparator));
                setSelectedType(addedType);
                setInnerFormMode(NO_FORM);
                break;
            }

            case EDIT_FORM: {
                if (checkInputValue()) return;

                let editedType = {...selectedType, title: inputValue.trim()};
                setTmpTypes(tmpTypes.map(type => {
                    if (type !== selectedType) return type;
                    return editedType;
                }).sort(typesComparator));
                setSelectedType(editedType);
                setInnerFormMode(NO_FORM);
                break;
            }
        }
    }

    // Функция для управления полем ввода внутренней формы
    let inputValueChangeHandler = event => {
        let nextValue = event.target.value;
        if (nextValue.trim() === '' && nextValue !== '') return;
        setInputValue(nextValue);
    }

    // Функция для проверки ошибок ввода
    let checkInputValue = () => {
        let error = null
        if (inputValue.trim() === '') error = 'Пустое значение недопустимо';
        for (let type of tmpTypes) if (type.title === inputValue.trim()) error = 'Такой тип уже есть';

        if (error) {
            setInputError(error);
            setTimeout(() => setInputError(null), ERROR_TIMEOUT);
            return true;
        }
        return false
    }

    let content = '';
    if (tmpTypes) {
        content = (
            <>
                <h1>Добавляйте, изменяйте или удаляйте типы оборудования</h1>
                <em>
                    Учтите, что при удалении типа оборудования, все карточки, связанные с этим типом также будут удалены
                </em>
                <div className={style.type_control}>
                    <input type="button" value="Добавить" onClick={addTypeHandler}/>
                    <input type="button" value="Изменить" onClick={editTypeHandler}/>
                    <input type="button" value="Удалить" onClick={removeTypeHandler}/>
                </div>
                {innerFormMode !== NO_FORM ?
                    <div className={style.inner_form}>
                        <div>
                            <input type="text" value={inputValue} onChange={inputValueChangeHandler}/>
                            <input type="button" value="Отмена" onClick={innerFormCancelHandler}/>
                            <input type="button" value="Сохранить" onClick={innerFormSaveHandler}/>
                        </div>
                        {inputError ? <div className="error">{inputError}</div> : ''}
                    </div>
                    :
                    ''
                }
                {tmpTypes.length > 0 ?
                    <ul>
                        {tmpTypes.map((type, index) =>
                            <li key={index}
                                className={type === selectedType ? style.selected : ''}
                                onClick={() => setSelectedType(type)}
                            >
                                {type.title}
                            </li>
                        )}
                    </ul>
                    :
                    ''
                }
            </>
        );
    }

    return (
        <div className={style.container + ' ' + style.modal}>
            {content}
            {loadError ? <div className="load_error">{loadError}</div> : ''}
            {error ? <div className="error">{error}</div> : ''}
            <div className={style.control}>
                <input type="button" value="Отмена" onClick={closeForm}/>
                <input type="button" value="Сохранить" disabled={!Boolean(types)} onClick={saveChangeHandler}/>
            </div>
        </div>
    );
}

export default connector(TypesModal);