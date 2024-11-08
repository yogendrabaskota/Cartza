"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
require("./model/index");
app.get("/", (req, res) => {
    res.send("hello world");
});
app.get("/ok", (req, res) => {
    res.send("ok ");
});
app.listen(PORT, () => {
    console.log("server has started at port ", PORT);
});
