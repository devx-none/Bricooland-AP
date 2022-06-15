"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHandymanSchema = exports.deleteHandymanSchema = exports.updateHandymanSchema = exports.createHandymanSchema = void 0;
var zod_1 = require("zod");
/**
 * @openapi
 * components:
 *   schema:
 *     Handyman:
 *       type: object
 *       required:
 *        - fisrtName
 *        - lastName
 *        - email
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */
var payload = {
    body: (0, zod_1.object)({
        firstName: (0, zod_1.string)({ required_error: "firstName is required" }),
        lastName: (0, zod_1.string)({ required_error: "lastName is required" }),
        phone: (0, zod_1.string)({ required_error: "phone is required" }),
        city: (0, zod_1.string)({ required_error: "city is required" }),
        category: (0, zod_1.string)({ required_error: "category is required" }),
        email: (0, zod_1.string)({ required_error: "email is required" }),
        password: (0, zod_1.string)({ required_error: "password is required" }),
    }),
};
var params = {
    params: (0, zod_1.object)({
        handymanId: (0, zod_1.string)({
            required_error: "handymanId is required",
        }),
    }),
};
exports.createHandymanSchema = (0, zod_1.object)(__assign({}, payload));
exports.updateHandymanSchema = (0, zod_1.object)(__assign(__assign({}, payload), params));
exports.deleteHandymanSchema = (0, zod_1.object)(__assign({}, params));
exports.getHandymanSchema = (0, zod_1.object)(__assign({}, params));
