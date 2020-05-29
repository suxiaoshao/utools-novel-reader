import {UTools} from "utools-helper/@types/utools"
import myHistory from "./util/history"
import {PathLike} from "fs"
declare global {
    interface Window {
        utools: UTools;

        getHtml(url: string, encoding: string, then: (str: string) => void): void;

        set_initialization(): void;

        readFile(path: PathLike | number, options: { encoding?: BufferEncoding, flag?: number | string }, then: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        myHistory: myHistory;
    }
}
