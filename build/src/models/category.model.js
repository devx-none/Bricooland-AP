"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var nanoid_1 = require("nanoid");
var nanoid = (0, nanoid_1.customAlphabet)("abcdefghijklmnopqrstuvwxyz0123456789", 10);
var categorySchema = new mongoose_1.default.Schema({
    categoryId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return "category_" + nanoid(); },
    },
    category: { type: String, required: true },
    handyman: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: "Handyman" }],
}, {
    timestamps: true,
});
var CategoryModel = mongoose_1.default.model("Category", categorySchema);
exports.default = CategoryModel;
