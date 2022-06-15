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
exports.getServiceSchema = exports.deleteServiceSchema = exports.updateServiceSchema = exports.createServiceSchema = void 0;
var zod_1 = require("zod");
/**
 * @openapi
 * components:
 *   schema:
 *     Service:
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
        customer: (0, zod_1.string)({ required_error: "Customer is required" }),
        handyman: (0, zod_1.string)({ required_error: "Handyman is required" }),
        category: (0, zod_1.string)({
            required_error: "Category is required",
        }),
        title: (0, zod_1.string)({
            required_error: "title is required",
        }),
        description: (0, zod_1.string)({
            required_error: "description is required",
        }),
        statue: (0, zod_1.string)({
            required_error: "statue is required",
        }),
    })
};
var params = {
    params: (0, zod_1.object)({
        serviceId: (0, zod_1.string)({
            required_error: "serviceId is required",
        }),
    }),
};
exports.createServiceSchema = (0, zod_1.object)(__assign({}, payload));
exports.updateServiceSchema = (0, zod_1.object)(__assign(__assign({}, payload), params));
exports.deleteServiceSchema = (0, zod_1.object)(__assign({}, params));
exports.getServiceSchema = (0, zod_1.object)(__assign({}, params));
