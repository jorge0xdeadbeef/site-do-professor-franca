export enum Status {
    ToDo = "todo",
    Doing = "doing",
    Done = "done"
};
export namespace Status {
    export function nextStatus(self: Status) {
        switch (self) {
            case Status.ToDo:
                return Status.Doing;
            case Status.Doing:
                return Status.Done;
            default:
                return Status.Done;
        }
    }
}
export enum Priority {
    low = "low",
    medium = "medium",
    high = "high"
};
export class Note {
    readonly id: number;
    title: string;
    status: Status;
    priority: Priority;
    expirationDate: number;
    content: string;

    constructor(id: number);
    constructor(id: number, title: string, status: Status, priority: Priority, expirationDate: number, content: string);
    constructor(id: number, title: string = "", status: Status = Status.ToDo, priority: Priority = Priority.low, expirationDate: number = 0, content: string = "") {
        this.id = id;
        this.title = title;
        this.status = status;
        this.priority = priority;
        this.expirationDate = expirationDate;
        this.content = content;
    }

    public isExpired() {
        return this.status == Status.Done || Date.now() >= this.expirationDate;
    }
};