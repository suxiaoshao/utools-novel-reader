import {UTools} from "utools-helper/@types/utools"
import myHistory from "./util/history"

declare global {
    interface Window {
        utools: UTools;

        getHtml(url: string, encoding: string, then: (str: string) => void): void;

        set_initialization(): void;

        readFile(path: string, options: { encoding?: BufferEncoding, flag?: number | string }, then: (err: any, data: Buffer) => void): void;
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        myHistory: myHistory;
    }
}
