import {OrderedMap, Map} from 'immutable';

export function arrToMap(arr, DataRecord = Map) {
    return arr.reduce((acc, item) => {
        return acc.set(item.id, new DataRecord(item));
    }, new OrderedMap({}));
}

export function mapToArr(obj) {
    return obj.valueSeq().toArray();
}