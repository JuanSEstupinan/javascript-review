import { v7 as uuidv7, validate as uuidValidate } from 'uuid';

export function generateUUID() {
    return uuidv7();
}

export function validateUuid(uuid) {
    return uuidValidate(uuid);
}