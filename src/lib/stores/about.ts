import type { About } from "$lib/types/reddit";
import { writable, type Writable } from "svelte/store";

const about_data : Writable<About> = writable(null)

export default about_data