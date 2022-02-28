export function convertDate(inputFormat) {
	function pad(s) {
		return s < 10 ? "0" + s : s
	}
	var d = new Date(inputFormat)
	return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/")
}

export const handleLogout = () => {
	let cookies = document.cookie.split(";")

	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i]
		let eqPos = cookie.indexOf("=")
		let name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie
		document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
	}
	window.location.reload()
}
