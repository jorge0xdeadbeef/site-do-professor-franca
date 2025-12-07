"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = exports.Priority = exports.Status = void 0;
var Status;
(function (Status) {
    Status["ToDo"] = "todo";
    Status["Doing"] = "doing";
    Status["Done"] = "done";
})(Status || (exports.Status = Status = {}));
;
(function (Status) {
    function nextStatus(self) {
        switch (self) {
            case Status.ToDo:
                return Status.Doing;
            case Status.Doing:
                return Status.Done;
            default:
                return Status.Done;
        }
    }
    Status.nextStatus = nextStatus;
})(Status || (exports.Status = Status = {}));
var Priority;
(function (Priority) {
    Priority["low"] = "low";
    Priority["medium"] = "medium";
    Priority["high"] = "high";
})(Priority || (exports.Priority = Priority = {}));
;
class Note {
    constructor(id, title = "", status = Status.ToDo, priority = Priority.low, expirationDate = 0, content = "") {
        this.id = id;
        this.title = title;
        this.status = status;
        this.priority = priority;
        this.expirationDate = expirationDate;
        this.content = content;
    }
    isExpired() {
        return this.status == Status.Done || Date.now() >= this.expirationDate;
    }
}
exports.Note = Note;
;
