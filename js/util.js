"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.izip = exports.zip = exports.statusToPtBr = exports.priorityToPtBr = exports.setupButtons = exports.getNotes = exports.createElement = void 0;
const types_js_1 = require("./types.js");
function createElement(tag, properties, ...children) {
    let element = document.createElement(tag);
    const { style } = properties, ps = __rest(properties, ["style"]);
    Object.assign(element, ps);
    if (style !== undefined)
        Object.assign(element.style, style);
    element.append(...children);
    return element;
}
exports.createElement = createElement;
function getNotes() {
    const raw = window.localStorage.getItem("notes");
    return raw == null ? [] : JSON.parse(raw).map((note, _, __) => Object.assign(new types_js_1.Note(note.id), note));
}
exports.getNotes = getNotes;
function setupButtons() {
    for (let button of document.getElementsByTagName("button"))
        if (button.dataset.href !== undefined)
            button.onclick = _ => window.location.href = button.dataset.href;
}
exports.setupButtons = setupButtons;
function priorityToPtBr(priority) {
    switch (priority) {
        case types_js_1.Priority.low:
            return "Baixo";
        case types_js_1.Priority.medium:
            return "Médio";
        case types_js_1.Priority.high:
            return "Alto";
    }
}
exports.priorityToPtBr = priorityToPtBr;
function statusToPtBr(status) {
    switch (status) {
        case types_js_1.Status.ToDo:
            return "A fazer";
        case types_js_1.Status.Doing:
            return "Fazendo";
        case types_js_1.Status.Done:
            return "Pronto";
    }
}
exports.statusToPtBr = statusToPtBr;
function* zip(as, bs) {
    const len = Math.min(as.length, bs.length);
    for (let i = 0; i < len; i++)
        yield [as[i], bs[i]];
}
exports.zip = zip;
function* izip(as, bs) {
    const len = Math.min(as.length, bs.length);
    for (let i = 0; i < len; i++)
        yield [i, as[i], bs[i]];
}
exports.izip = izip;
