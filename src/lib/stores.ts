import { writable } from "svelte/store";

export const uploadFile = writable<File | null>()
export const progress = writable(0)

export const theme = writable('custom')