export type Categories = 'personal' | 'insurance'

export type Post = {
	title: string
	description: string
	slug: string
	date: string
	categories: Categories[]
	published: boolean
}
