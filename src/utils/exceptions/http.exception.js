class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.error = true
        this.status = status;
        this.message = message;
    }
}

export default HttpException;
