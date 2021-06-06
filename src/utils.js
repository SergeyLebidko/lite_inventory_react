// Функция возвращает перечень изменений, которые нужно сделать в srcList, чтобы привести его в соответствие с destList
export function getUpdates(srcList, destList, fields) {
    // Ищем объекты, которые нужно создать в БД (у таких объектов нет id, присваиваемого базой данных)
    let toCreate = destList.filter(destItem => !('id' in destItem));

    // Ищем объекты, которые нужно удалить из БД (такие объекты есть в исходном списке, но отсутствуют в конечном)
    let toRemove = srcList.filter(srcItem => {
        let findFlag = false;
        for (let destItem of destList) {
            if (srcItem.id === destItem.id) {
                findFlag = true;
                break;
            }
        }
        return !findFlag;
    });

    // Ищем объекты, которые нужно обновить в БД (такие объекты есть в обоих списках, но значения их полей отличаются)
    let toUpdate = destList.filter(destItem => {
        for (let srcItem of srcList) {
            if (destItem.id === srcItem.id) {
                for (let field of fields) {
                    if (destItem[field] !== srcItem[field]) return true;
                }
            }
        }
        return false;
    });

    return {toRemove, toUpdate, toCreate};
}

// Функция возвращает текстовое описание типа по его идентификатору или null - если описание найти не удалось
export function getTypeTitle(types, typeId) {
    for (let type of (types || [])) if (type.id === typeId) return type.title;
    return null;
}

// Функция возвращает список характеристик, принадлежащих только переданной карточке
export function getFeaturesList(features, cardId) {
    return features.filter(feature => feature.equipment_card === cardId);
}

// Функция форматирования даты
export function formatDate(dateString) {
    let [, y, m, d] = /(\d{4})-(\d{2})-(\d{2})/.exec(dateString);
    let months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${d} ${months[+m - 1]} ${y} г.`;
}