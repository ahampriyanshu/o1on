import { browser } from '$app/environment'
import { writable } from 'svelte/store'

type Theme = 'light' | 'dark'
const userTheme = browser && (localStorage.getItem('theme') as Theme | null)

export const theme = writable<Theme>(userTheme || 'dark')

export function toggleTheme() {
	theme.update((currentTheme) => {
		const newTheme = currentTheme === 'light' ? 'dark' : 'light'
		localStorage.setItem('theme', newTheme)
		document.documentElement.setAttribute('color-scheme', newTheme)
		return newTheme
	})
}

export function setTheme(newTheme: Theme) {
	theme.set(newTheme)
}
