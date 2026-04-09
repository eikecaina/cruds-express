"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateUser = void 0;
const validateCreateUser = (req, res, next) => {
    const { name, email } = req.body;
    const hasEmptyField = [name, email].some((value) => typeof value !== 'string' || value.trim() === '');
    if (hasEmptyField) {
        return res.status(400).json({
            message: 'name and email are required and cannot be empty',
        });
    }
    next();
};
exports.validateCreateUser = validateCreateUser;
