interface SubmenuInterface {
    id: number;
    name: string;
    path?: string;
    scope?: number;
    slug?: string;
    sub?: Array<this>;
    /*sub?: [{
        id: number;
        name: string;
        path?: string;
        scope?: number;
        slug?: string;
    }];*/
}
