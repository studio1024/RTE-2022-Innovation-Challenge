module.exports = {
    success(data = '', msg = 'ok', code = 200) {
        this.status = code
        this.body = {
            msg,
            data
        }
    },
    error(data = '', msg = 'fail', code = 400) {
        this.status = code;
        this.body = {
            msg,
            data
        }
    }
};