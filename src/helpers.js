import {OrderedMap, Map} from 'immutable';

export function arrToMap(arr, DataRecord = Map) {
    return arr.reduce((acc, item) => {
        return acc.set(item.id, new DataRecord(item));
    }, new OrderedMap({}));
}

export function mapToArr(obj) {
    return obj.valueSeq().toArray();
}

export function convertBookingToBigCalendar(item) {
    return {
        id: item.id,
        title: item.user_name,
        start: new Date(item.date_start * 1000),
        end: new Date(item.date_end * 1000)
    };
}