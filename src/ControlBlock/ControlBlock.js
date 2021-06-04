import React, {useRef, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import StatModal from '../StatModal/StatModal';
import GroupCreateModal from '../GroupCreateModal/GroupCreateModal';
import RemoveGroupModal from '../RemoveGroupModal/RemoveGroupModal';
import RenameGroupModal from '../RenameGroupModal/RenameGroupModal';
import RemoveCardModal from '../RemoveCardModal/RemoveCardModal';
import CardModal from '../CardModal/CardModal';
import TypesModal from '../TypesModal/TypesModal';
import {CONTROL_BLOCK_MODES} from '../store/actionCreators';
import {connector} from '../store/storeConnector';
import style from './ControlBlock.module.scss';

function ControlBlock({mode, setMode, history, selectedGroup, selectedCard, hasGroups, hasCards}) {
    // Сразу же при монтировании сбрасываем режим работы
    useEffect(() => setMode(CONTROL_BLOCK_MODES.NO_FORM), []);

    let modalContainerRef = useRef(null);

    let closeForm = () => setMode(CONTROL_BLOCK_MODES.NO_FORM);

    let showGroupCreateForm = () => setMode(CONTROL_BLOCK_MODES.GROUP_CREATE_FORM);
    let showRemoveGroupForm = () => setMode(CONTROL_BLOCK_MODES.REMOVE_GROUP_FORM);
    let showRenameGroupForm = () => setMode(CONTROL_BLOCK_MODES.RENAME_GROUP_FORM);
    let showRemoveCardForm = () => setMode(CONTROL_BLOCK_MODES.REMOVE_CARD_FORM);
    let showEditCardForm = () => setMode(CONTROL_BLOCK_MODES.EDIT_CARD_FORM);
    let showCreateCardForm = () => setMode(CONTROL_BLOCK_MODES.CREATE_CARD_FORM);
    let showTypesForm = () => setMode(CONTROL_BLOCK_MODES.TYPES_FORM);
    let showStatForm = () => setMode(CONTROL_BLOCK_MODES.STAT_FORM);

    // Отслеживаем нажатие на клавишу Esc для закрытия форм
    useEffect(() => {
        let formContainerKeyHandler = event => {
            if (event.key === 'Escape' && mode !== CONTROL_BLOCK_MODES.NO_FORM) closeForm();
        };
        document.addEventListener('keydown', formContainerKeyHandler)
        return () => document.removeEventListener('keydown', formContainerKeyHandler);
    })

    // Обработчик клика на поле вокруг модального окна. Закрывает модальное окно
    let formContainerMouseHandler = event => {
        if (event.target !== modalContainerRef.current) return;
        closeForm();
    }

    let form;
    switch (mode) {
        case CONTROL_BLOCK_MODES.STAT_FORM:
            form = <StatModal closeForm={closeForm}/>;
            break;
        case CONTROL_BLOCK_MODES.GROUP_CREATE_FORM:
            form = <GroupCreateModal closeForm={closeForm}/>;
            break;
        case CONTROL_BLOCK_MODES.REMOVE_GROUP_FORM:
            form = <RemoveGroupModal closeForm={closeForm}/>;
            break;
        case CONTROL_BLOCK_MODES.RENAME_GROUP_FORM:
            form = <RenameGroupModal closeForm={closeForm}/>;
            break;
        case CONTROL_BLOCK_MODES.REMOVE_CARD_FORM:
            form = <RemoveCardModal closeForm={closeForm}/>;
            break;
        case CONTROL_BLOCK_MODES.EDIT_CARD_FORM:
            form = <CardModal closeForm={closeForm}/>;
            break;
        case CONTROL_BLOCK_MODES.CREATE_CARD_FORM:
            form = <CardModal closeForm={closeForm}/>;
            break;
        case CONTROL_BLOCK_MODES.TYPES_FORM:
            form = <TypesModal card={selectedCard} closeForm={closeForm}/>;
            break;
    }

    let modalContainerStyle = mode === CONTROL_BLOCK_MODES.NO_FORM ? {display: 'none'} : {display: 'flex'};

    return (
        <>
            <div className={`${style.container} ${style.group_control}`}>
                <input type="button"
                       disabled={!hasGroups}
                       value="Добавить"
                       onClick={showGroupCreateForm}
                />
                <input type="button"
                       disabled={!Boolean(selectedGroup)}
                       value="Переименовать"
                       onClick={showRenameGroupForm}
                />
                <input type="button"
                       disabled={!Boolean(selectedGroup)}
                       value="Удалить"
                       onClick={showRemoveGroupForm}
                />
            </div>
            <div className={`${style.container} ${style.equipment_control}`}>
                <input type="button"
                       value="На главную"
                       onClick={() => history.push('/')}
                />
                <input type="button"
                       disabled={!hasCards}
                       value="Добавить"
                       onClick={showCreateCardForm}
                />
                <input type="button"
                       disabled={!Boolean(selectedCard)}
                       value="Редактировать"
                       onClick={showEditCardForm}
                />
                <input type="button"
                       disabled={!Boolean(selectedCard)}
                       value="Удалить"
                       onClick={showRemoveCardForm}
                />
                <input type="button"
                       value="Типы оборудования"
                       onClick={showTypesForm}
                />
                <input type="button"
                       disabled={!hasGroups}
                       value="Статистика"
                       onClick={showStatForm}
                />
            </div>
            <div ref={modalContainerRef} className={style.modal_container} style={modalContainerStyle}
                 onClick={formContainerMouseHandler}>
                {form}
            </div>
        </>
    );
}

export default withRouter(connector(ControlBlock));