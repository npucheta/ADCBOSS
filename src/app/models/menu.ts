export class Menu {
    public id: number;
    public path: string;
    public name: string;
    public scope?: number;
    public sub?: Array<SubmenuInterface>;
}
