export const authErrors = (err, req, res, next) => {
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue);
        return res.status(409).json({ errors: { [field]: `${field} already exists` } });
    }

    if (err.name === 'ValidationError') {
        const errors = {};
        for (let field of Object.keys(err.errors)) {
            errors[field] = err.errors[field].message;
        }

        return res.status(404).json(errors);
    }

    return res.status(500).json({ err });
}