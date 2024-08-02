// error.js

export class BaseError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.isSuccess = false;
    }
}