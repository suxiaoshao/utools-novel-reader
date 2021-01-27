import {UTools} from "utools-helper/@types/utools"
import myHistory from "./util/history"
import {readFile as ReadFile} from "fs"
import iconv from "iconv-lite"

declare global {
    interface Window {
        utools: UTools;
        readFile: typeof ReadFile;
        set_initialization(): void;
    }

    type utools = UTools
}
declare module 'vue/types/vue' {
    interface Vue {
        myHistory: myHistory;
    }
}
