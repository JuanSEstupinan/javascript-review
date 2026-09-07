import {ValidationError} from "./errors.js";
import {generateUUID, validateUuid} from "./uuid.js";

export class SupplierID {
    #value;

    constructor(value) {
        if (!validateUuid(value)) {
            throw new ValidationError(`Invalid Supplier ID: ${value}. Must be a valid UUID.`);
        }
        this.#value = value;
        Object.freeze(this);
    }

    static generate() {
        return new SupplierID(generateUUID());
    }

    get value() {
        return this.#value;
    }

    toString() {
        return this.#value;
    }

    equals(other) {
        return other instanceof SupplierID && this.#value === other.value;
    }
}