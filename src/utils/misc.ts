export const getTime = () => {
	return new Date().toLocaleString('ru-RU', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Moscow' })
}
