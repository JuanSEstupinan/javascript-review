import {SupplierID} from "../../../shared/domain/model/supplier-id.js";

export class PurchaseOrderState {
    static #VALID_STATES = {
        DRAFT: 'draft',
        SUBMITTED: 'Submitted',
        APPROVED: 'Approved',
        SHIPPED: 'Shipped',
        COMPLETED: 'Completed',
        CANCELLED: 'Cancelled'
    }
    #value;

    constructor(value = PurchaseOrderState.#VALID_STATES.DRAFT) {
        this.#validateState(value);
        this.#value = value;
    }

    #validateState(value) {
        if (!Object.values(PurchaseOrderState.#VALID_STATES).includes(state)) {
            throw new Error(`Invalid purchase order state: ${state}`);
        }
    }

    get value() {
        return this.#value;
    }

    equals(other) {
        return other instanceof PurchaseOrderState && this.#value === other.value;
    }

    toSubmittedFrom(currentState) {
        if (currentState !== PurchaseOrderState.#VALID_STATES.DRAFT) {
            throw new Error(`Cannot transition from ${currentState.value} to Submitted`);
        }
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.SUBMITTED);
    }

    toApprovedFrom(currentState) {
        if (currentState !== PurchaseOrderState.#VALID_STATES.SUBMITTED) {
            throw new Error(`Cannot transition from ${currentState.value} to Approved`);
        }
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.APPROVED);
    }

    toShippedFrom(currentState) {
        if (currentState !== PurchaseOrderState.#VALID_STATES.APPROVED) {
            throw new Error(`Cannot transition from ${currentState.value} to Shipped`);
        }
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.SHIPPED);
    }

    toCompletedFrom(currentState) {
        if (currentState !== PurchaseOrderState.#VALID_STATES.SHIPPED) {
            throw new Error(`Cannot transition from ${currentState.value} to Completed`);
        }
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.COMPLETED);
    }

    toCancelledFrom(currentState) {
        if (currentState !== PurchaseOrderState.#VALID_STATES.COMPLETED) {
            throw new Error(`Cannot transition from ${currentState.value} to Completed`);
        }
        return new PurchaseOrderState(PurchaseOrderState.#VALID_STATES.CANCELLED);
    }

    inDraft(currentState) {
        return this.value === PurchaseOrderState.#VALID_STATES.DRAFT;
    }
}