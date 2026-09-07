import {ValidationError} from "./errors.js";

/**
 * Value Object representing a currency code (e.g., USD, EUR, GBP).
 */
export class Currency {
    static #VALID_CODES = ['USD', 'EUR', 'GBP', 'JPY'];
    #code;

    /**
     * Creates a new Currency instance.
     * @param {string} code - The currency code (e.g., 'USD', 'EUR', 'GBP').
     * @throws {ValidationError} If the provided code is not a valid currency code.
     */
    constructor(code) {
        if (!Currency.#VALID_CODES.includes(code)) {
            throw new ValidationError(`Invalid currency code: ${code}. Must be one of: ${Currency.#VALID_CODES.join(', ')}`);
        }
        this.#code = code;
        Object.freeze(this);
    }

    /**
     * Gets the currency code.
     * @returns {string} The currency code.
     */
    get code() {
        return this.#code;
    }

    /**
     * Checks if this Currency is equal to another Currency.
     * @param {Currency} other - The other Currency to compare with.
     * @returns {boolean} True if the currencies are equal, false otherwise.
     */
    equals(other) {
        return other instanceof Currency && this.#code === other.code;
    }

    toString() {
        return this.#code;
    }
}