"use strict";
import { Note } from "./types.js";
import { getNotes, setupButtons } from "./util.js";
const dateRegexp = new RegExp(/(0?[1-9]|[1-2][0-9]|3[01])\/(0?[1-9]|1[0-2])\/([12][0-9]{3})/g);
const INVALID_DATE_ERROR = "Digite uma data válida.";
setupButtons();
const idParam = new URLSearchParams(window.location.search).get("id");
const title = document.getElementById("note-title");
const content = document.getElementById("note-content");
const expirationDate = document.getElementById("expiration-date");
let notes = getNotes();
function nextId(notes) {
    return notes.length == 0 ? 0 : notes.sort((a, b) => a.id - b.id)[0].id + 1;
}
let note;
let isNewNote;
if (isNewNote = idParam === null)
    notes.push(note = new Note(nextId(notes)));
else {
    const id = parseInt(idParam);
    const found = notes.find((note, _, __) => note.id == id);
    if (isNewNote = found === undefined)
        notes.push(note = new Note(nextId(notes)));
    else {
        const radios = Array.from(document.querySelectorAll("input[type=\"radio\"]"));
        note = found;
        title.value = note.title;
        content.value = note.content;
        radios.find((radio, _, __) => radio.id == `priority-${note.priority}`).checked = true;
        expirationDate.value = new Date(note.expirationDate).toLocaleDateString("pt-BR");
        if (note.isExpired()) {
            title.disabled = content.disabled = expirationDate.disabled =
                document.querySelector("input[type=\"submit\"]").disabled = true;
            for (let radio of radios)
                radio.disabled = true;
        }
    }
}
document.getElementById("note-form").onsubmit = event => {
    event.preventDefault();
    const t = title.value.toLowerCase();
    if (isNewNote || t != note.title.toLowerCase()) {
        if (notes.some((note, _, __) => t == note.title.toLowerCase())) {
            alert("Uma nota com o mesmo nome já existe.");
            return;
        }
    }
    const results = dateRegexp.exec(expirationDate.value.trim());
    if (results === null || results.length != 4) {
        alert(INVALID_DATE_ERROR);
        return;
    }
    let rawExpirationDate = new Date(parseInt(results[3]), parseInt(results[2]) - 1, parseInt(results[1]), 0, 0, 0, 0).valueOf();
    if (Date.now() > rawExpirationDate) {
        alert(INVALID_DATE_ERROR);
        return;
    }
    note.title = title.value;
    note.content = content.value;
    note.expirationDate = rawExpirationDate;
    note.priority = document.querySelector("input[name=\"priority-radio\"]:checked").value;
    window.localStorage.setItem("notes", JSON.stringify(notes));
    window.location.href = "./index.html";
};
//# sourceMappingURL=note.js.map