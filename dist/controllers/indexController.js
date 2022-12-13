"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_other = exports.get_index = void 0;
function get_index(req, res) {
    res.send("Hello World");
}
exports.get_index = get_index;
;
function get_other(req, res) {
    res.send("Other");
}
exports.get_other = get_other;
