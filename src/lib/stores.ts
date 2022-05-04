import { writable, type Writable } from "svelte/store"
import type { Post } from "$lib/types/reddit"

export const selected_post : Writable<Post> = writable()