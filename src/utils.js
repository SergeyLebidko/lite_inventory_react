// Функция возвращает перечень изменений, которые нужно сделать в srcList, чтобы привести его в соответствие с destList
export function getUpdates(srcList, destList, fields) {
    let toRemove;
    let toUpdate;
    let toCreate;

    // Ищем объекты, которые нужно создать в БД (у таких объектов нет id, присваиваемого базой данных)
    toCreate = destList.filter(destItem => !('id' in destItem));

    // Ищем объекты, которые нужно удалить из БД (такие объекты есть в исходном списке, но отсутствуют в конечном)
    toRemove = srcList.filter(srcItem => {
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
    toUpdate = destList.filter(destItem => {
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