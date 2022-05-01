import { writable, type Writable } from "svelte/store";

export const post_page_in_view : Writable<boolean> = writable(false)