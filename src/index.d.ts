import {UTools} from "utools-helper/@types/utools"
import myHistory from "./util/history"
import {readFile as ReadFile} from "fs"
declare global {
    interface Window {
        utools: UTools;

        getHtml(url: string, encoding: string, then: (str: string) => void): void;

        set_initialization(): void;

        readFile:typeof ReadFile
    }
}
declare module 'vue/types/vue' {
    interface Vue {
        myHistory: myHistory;
    }
}
