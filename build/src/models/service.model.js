"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var nanoid_1 = require("nanoid");
var nanoid = (0, nanoid_1.customAlphabet)("abcdefghijklmnopqrstuvwxyz0123456789", 10);
var serviceSchema = new mongoose_1.default.Schema({
    serviceId: {
        type: String,
        required: true,
        unique: true,
        default: function () { return "category_" + nanoid(); },
    },
    customer: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Customer" },
    handyman: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Handyman" },
    category: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Category" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    statue: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    }
}, {
    timestamps: true,
});
var ServiceModel = mongoose_1.default.model("Service", serviceSchema);
exports.default = ServiceModel;
