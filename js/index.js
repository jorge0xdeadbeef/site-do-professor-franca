"use strict";
import { Priority, Status } from "./types.js";
import { createElement, getNotes, priorityToPtBr, setupButtons, statusToPtBr } from "./util.js";
const removeSelected = document.getElementById("remove-selected-button");
let checks = new Map();
const noteContainer = document.getElementById("notes-table");
function reloadContainer(notes) {
    while (noteContainer.children.length > 0)
        noteContainer.children[0].remove();
    if (notes.length == 0) {
        noteContainer.append(createElement("tr", {}, createElement("td", { colSpan: 5 }, createElement("p", { style: { fontSize: "36px", textAlign: "center" } }, createElement("span", { textContent: "Adicione uma " }), createElement("a", { href: "./note.html", textContent: "nota" }), createElement("span", { textContent: "." })))));
    }
    else {
        function getPriorityColor(priority) {
            switch (priority) {
                case Priority.low:
                    return "#007700";
                case Priority.medium:
                    return "#ffff00";
                case Priority.high:
                    return "#ff0000";
            }
        }
        noteContainer.append(createElement("tr", {}, createElement("th", { textContent: "Título" }), createElement("th", { textContent: "Status" }), createElement("th", { textContent: "Prioridade" }), createElement("th", { textContent: "Data de expiração" })));
        for (let note of notes) {
            let priorityColor, color;
            if (note.isExpired())
                color = priorityColor = "#777777";
            else {
                color = "#ffffff";
                priorityColor = getPriorityColor(note.priority);
            }
            const id = note.id.toString();
            const nextStatus = Status.nextStatus(note.status);
            const tr = createElement("tr", {
                id: id, onclick: _ => {
                    if (checks.get(id) === undefined) {
                        checks.set(id, tr);
                        tr.classList.add("selected");
                    }
                    else {
                        checks.delete(id);
                        tr.classList.remove("selected");
                    }
                    removeSelected.disabled = checks.size == 0;
                }
            }, createElement("td", { style: { backgroundColor: color } }, createElement("a", { href: `./note.html?id=${note.id}`, textContent: note.title })), createElement("td", { style: { backgroundColor: color } }, createElement("p", {
                style: {
                    marginBottom: "4px",
                    marginLeft: "0px",
                    marginRight: "0px",
                    marginTop: "0px"
                },
                textContent: statusToPtBr(note.status)
            }), createElement("button", note.status === nextStatus ?
                { disabled: true, textContent: "Yay!" } :
                { textContent: `Marcar como '${statusToPtBr(nextStatus)}'`, onclick: _ => {
                        note.status = nextStatus;
                        window.localStorage.setItem("notes", JSON.stringify(loadedNotes));
                        reloadContainer(notes);
                    } })), createElement("td", { style: { backgroundColor: priorityColor }, textContent: priorityToPtBr(note.priority) }), createElement("td", { style: { backgroundColor: color }, textContent: new Date(note.expirationDate).toLocaleString() }));
            noteContainer.append(tr);
        }
    }
}
setupButtons();
let loadedNotes = getNotes();
reloadContainer(loadedNotes);
removeSelected.onclick = _ => {
    // loadedNotes tem a mesma shape na DOM
    // i é 1 pois o primeiro filho é sempre o tr > th*
    for (let i = 1, j = 0; i < noteContainer.children.length; ++i, ++j) {
        const child = noteContainer.children[i];
        let tr = checks.get(child.id);
        if (tr !== undefined) {
            loadedNotes.splice(j--, 1);
            --i;
            child.remove();
        }
    }
    checks.clear();
    window.localStorage.setItem("notes", JSON.stringify(loadedNotes));
    reloadContainer(loadedNotes);
};
window.onstorage = event => {
    if (event.key == "notes")
        reloadContainer(loadedNotes = getNotes());
};
//# sourceMappingURL=index.js.map