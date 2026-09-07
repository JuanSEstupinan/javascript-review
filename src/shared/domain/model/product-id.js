import {ValidationError} from "./errors.js"
import {generateUUID, validateUuid} from "./uuid.js";

export class ProductId {
    #value;

    constructor(value) {
        if (!validateUuid(value)) {
            throw new ValidationError(`Invalid product ID: ${value}. Must be a valid UUID`);
        }
        this.#value = value;
        Object.freeze(this);
    }

    static generate() {
        return new ProductId(generateUUID());
    }

    get value() {
        return this.#value;
    }

    equals(other) {
        return other instanceof ProductId && this.#value === other.value;
    }

    toString() {
        return this.#value;
    }
}