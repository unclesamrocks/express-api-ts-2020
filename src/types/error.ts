export class ErrorType implements Error {
	name: string
	message: string
	stack: string | undefined
	data?: any
	constructor(public statusCode: number, message?: string, name?: string) {
		this.name = name || ''
		this.message = message || ''
	}
}
