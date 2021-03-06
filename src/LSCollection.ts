import { LSDocument } from "./LSDocument";
import { IDictionary } from "./IDictionary";

export class LSCollection {
    public id: string;
    public parent: LSDocument | undefined;
    public documents: IDictionary<LSDocument> = {};

    constructor(id: string, documents: IDictionary<LSDocument> = {}) {
        this.id = id;
        this.documents = documents;
        Object.values(this.documents).forEach((document: LSDocument) => document.parent = this);
    }

    public Contains(id: string): boolean { return this.documents[id] !== undefined; }
    public Document(id: string): LSDocument | undefined { return this.documents[id]; }
    public Add(document: LSDocument): LSDocument {
        document.parent = this;
        this.documents[document.id] = document;
        if (this.parent) this.parent.Save();
        return this.documents[document.id];
    }
    public Remove(id: string) {
        delete this.documents[id];
    }
}