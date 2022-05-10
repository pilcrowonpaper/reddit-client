/// <reference types="@sveltejs/kit" />

import type { User, UserPrefs } from '$lib/types/reddit/identity';

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces

declare global {
	declare namespace App {
		interface Locals {}
		interface Platform {}
		interface Session {
			exists: boolean;
			user?: User;
			prefs?: UserPrefs;
			arctic?: {
				icon_img: string
			}
		}
		interface Stuff {}
	}
}
