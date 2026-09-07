export class DateTime {
    #date;

    constructor(date = new Date()) {
        const parsedDate = date instanceof Date ? date : new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new Error(`Invalid date: ${date}`);
        }
        this.#date = new Date(parsedDate);
        Object.freeze(this);
    }

    get date() {
        return new Date(this.#date.getTime());
    }

    toISOString() {
        return this.#date.toISOString();
    }

    toString() {
        let options = { year: 'numeric', month: 'long', day: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true };
        return this.#date.toLocaleString('en-US', options);
    }

    /**
     * Checks if this DateTime instance is equal to another DateTime instance.
     * @param {DateTime} other - The other DateTime instance to compare with.
     * @returns {boolean} True if both DateTime instances represent the same point in time, false otherwise.
     */
    equals(other) {
        return other instanceof DateTime && this.#date.getTime() === other.date.getTime();
    }
}