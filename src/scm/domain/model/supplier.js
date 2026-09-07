import {SupplierId} from "../../../shared/domain/model/supplier-id.js";
import {ValidationError} from "../../../shared/domain/model/errors.js";
import {Money} from "../../../shared/domain/model/money.js";

export class Supplier {
    #id;
    #name;
    #contactEmail;
    #lastOrderTotalPrice;

    constructor({ id, name, contactEmail = null, lastOrderTotalPrice = null }) {
        if (!id instanceof SupplierId) {
            throw new ValidationError("Supplier ID must be an instance of SupplierId");
        }
        this.#id = id;
        this.changeName(name);
        if (contactEmail !== null) {
            this.updateEmail(contactEmail);
        } else {
            this.#contactEmail = null;
        }
        if (lastOrderTotalPrice !== null) {
            this.recordOrder(lastOrderTotalPrice);
        } else {
            this.#lastOrderTotalPrice = null;
        }

    }

    #isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    changeName(newName) {
        if (typeof newName !== 'string' || newName.length < 2 || newName.length > 100) {
            throw new ValidationError("Supplier name must be a string between 2 and 100 characters");
        }
        this.#name = newName;
    }

    updateEmail(newEmail) {
        if (!this.#isValidEmail(newEmail)) {
            throw new ValidationError(`Invalid email format: ${newEmail}`);
        }
        this.#contactEmail = newEmail;
    }

    recordOrder(orderTotal) {
        if (!(orderTotal instanceof Money)) {
            throw new ValidationError("Order total must be an instance of Money");
        }
        this.#lastOrderTotalPrice = orderTotal;
    }

    get id() {
        return this.#id;
    }

    get name() {
        return this.#name;
    }

    get contactEmail() {
        return this.#contactEmail;
    }

    get lastOrderTotalPrice() {
        return this.#lastOrderTotalPrice;
    }
}