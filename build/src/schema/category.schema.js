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
exports.getCategorySchema = exports.deleteCategorySchema = exports.updateCategorySchema = exports.createCategorySchema = void 0;
var zod_1 = require("zod");
/**
 * @openapi
 * components:
 *   schema:
 *     Category:
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
        category: (0, zod_1.string)({ required_error: " category is required" }),
    }),
};
var params = {
    params: (0, zod_1.object)({
        CategoryId: (0, zod_1.string)({
            required_error: "CategoryID is required",
        }),
    }),
};
exports.createCategorySchema = (0, zod_1.object)(__assign({}, payload));
exports.updateCategorySchema = (0, zod_1.object)(__assign(__assign({}, payload), params));
exports.deleteCategorySchema = (0, zod_1.object)(__assign({}, params));
exports.getCategorySchema = (0, zod_1.object)(__assign({}, params));
