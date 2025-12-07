import { Note, Priority, Status } from "./types.js";

type MinimalArray<T> = {
    readonly length: number,
    readonly [n: number]: T
};

export function createElement<K extends keyof HTMLElementTagNameMap>(
    tag: K,
    properties: Partial<Omit<HTMLElementTagNameMap[K], "style"> & { style: Partial<CSSStyleDeclaration> }>,
    ...children: HTMLElement[]
) {
    let element = document.createElement(tag);
    const {style, ...ps} = properties;
    Object.assign(element, ps);
    if (style !== undefined)
        Object.assign(element.style, style);
    element.append(...children);
    return element;
}
export function getNotes() {
    const raw = window.localStorage.getItem("notes");
    return raw == null ? [] : <Note[]>(<any[]>JSON.parse(raw)).map((note, _, __) => Object.assign(new Note(note.id), note));
}
export function setupButtons() {
    for (let button of document.getElementsByTagName("button"))
        if (button.dataset.href !== undefined)
            button.onclick = _ => window.location.href = button.dataset.href!;
}
export function priorityToPtBr(priority: Priority) {
    switch (priority) {
        case Priority.low:
            return "Baixo";
        case Priority.medium:
            return "Médio";
        case Priority.high:
            return "Alto";
    }
}
export function statusToPtBr(status: Status) {
    switch (status) {
        case Status.ToDo:
            return "A fazer";
        case Status.Doing:
            return "Fazendo";
        case Status.Done:
            return "Pronto";
    }
}
export function* zip<A, B>(as: MinimalArray<A>, bs: MinimalArray<B>) {
    const len = Math.min(as.length, bs.length);
    for (let i = 0; i < len; i++)
        yield [as[i], bs[i]] as [A, B];
}
export function* izip<A, B>(as: MinimalArray<A>, bs: MinimalArray<B>) {
    const len = Math.min(as.length, bs.length);
    for (let i = 0; i < len; i++)
        yield [i, as[i], bs[i]] as [number, A, B];
}