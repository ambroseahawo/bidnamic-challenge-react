export const validateOver18 = (dateString) => {
	let monthDiff = Date.now() - new Date(dateString).getTime()

	//convert the calculated difference in date format
	let ageDate = new Date(monthDiff)

	//extract year from date
	let year = ageDate.getUTCFullYear()

	//now calculate the age of the user
	let age = Math.abs(year - 1970)

	if (Math.abs(age) > 17) {
		return true
	}

	return false
}

export const validateFormField = (formData) => {
	if(isNaN(formData)){
		if(formData.length < 26){
			return true
		}else{
			return { truthy: false, message: "should not exceed 25 characters" }
		}
	}else{
		return { truthy: false, message: "should be a string" }
	}
}

export const validatePhoneNumber = (numberString) =>{
	const phoneRegex = /^\+?1?\d{9,15}$/

	if(numberString.match(phoneRegex)){
		if(numberString.charAt(0) === "+"){
			let number = numberString.substring(1)
			if(!isNaN(number)){
				if( number.length >= 7 && number.length <= 15){
					return true
				}else{
					return { truthy: false, message: "Phone number should be 7 to 15 digits*" }
				}
			}else{
				return { truthy: false, message: "Enter valid phone number*" }
			}
		}else{
			return { truthy: false, message: "Enter valid phone number*" }
		}
	}else{
		return { truthy: false, message: "Enter valid phone number with 7 to 15 digits*" }
	}
}

export const validateGoogleId = (idString) => {
	if(!isNaN(idString) && idString.length === 10){
		while(idString.charAt(0) === '0'){
			idString = idString.substring(1)
		}
		const idRegex = /^\d{10}$/
		if(idString.match(idRegex)){
			return true
		}else{
			return { truthy: false, message: "Enter valid google ads account id*" }
		}
	}else{
		return { truthy: false, message: "Google ads account id should be exactly 10 digits*" }
	}
}

export const validateFullForm = (formData, setError, setErrorMessage) =>{
	let truthy = true

	if (validateFormField(formData.title).truthy === false) {
		setError(true)
		setErrorMessage(`Title ${validateFormField(formData.title).message}*`)
		truthy = false
	}

	if (validateFormField(formData.firstName).truthy === false) {
		setError(true)
		setErrorMessage(
			`First Name ${validateFormField(formData.firstName).message}*`
		)
		truthy = false
	}

	if (validateFormField(formData.surname).truthy === false) {
		setError(true)
		setErrorMessage(
			`Surname ${validateFormField(formData.surname).message}*`
		)
		truthy = false
	}

	if (validateFormField(formData.companyName).truthy === false) {
		setError(true)
		setErrorMessage(
			`Company Name ${validateFormField(formData.companyName).message}*`
		)
		truthy = false
	}

	if (validateFormField(formData.address).truthy === false) {
		setError(true)
		setErrorMessage(
			`Address ${validateFormField(formData.address).message}*`
		)
		truthy = false
	}

	if (validatePhoneNumber(formData.telephone).truthy === false) {
		setError(true)
		setErrorMessage(validatePhoneNumber(formData.telephone).message)
		truthy = false
	}

	if (validateGoogleId(formData.googleAdsId).truthy === false) {
		setError(true)
		setErrorMessage(validateGoogleId(formData.googleAdsId).message)
		truthy = false
	}

	return truthy
}

export const validateResponse = (resp, formData, setError, setErrorMessage) => {
	if (resp?.telephone) {
		if (resp.telephone !== formData.telephone) {
			if (
				resp.telephone[0] === "form with this telephone already exists."
			) {
				setError(true)
				setErrorMessage("Phone number already used*")
			} else if (
				resp.telephone[0] === "The phone number entered is not valid."
			) {
				setError(true)
				setErrorMessage("The phone number entered is not valid.*")
			}
		} else {
			window.location.reload()
		}
	} else if (resp?.google_id) {
		if (resp?.google_id[0] !== formData.googleAdsId) {
			setError(true)
			setErrorMessage("Google ID already exists.*")
		}
	}
}
