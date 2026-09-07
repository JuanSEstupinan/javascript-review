import {generateUUID, validateUuid} from "./uuid.js";

export class PurchaseOrderId {
    #value;

    constructor(value) {
        if (!validateUuid(value)) {
            throw new Error(`Invalid PurchaseOrderId: ${value}. Must be a valid UUID.`);
        }
        this.#value = value;
        Object.freeze(this);
    }

    static generate() {
        return new PurchaseOrderId(generateUUID());
    }

    get value() {
        return this.#value;
    }

    equals(other) {
        return other instanceof PurchaseOrderId && this.#value === other.value;
    }

    toString() {
        return this.#value;
    }
}