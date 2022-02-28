import APIService from "../../utils/APIService"


export const validateAuth = (
	isSignup,
	username,
	password,
	confirmPassword,
	setPasswordError,
	setLoginError,
	setUsernameError,
	setErrorMessage,
	setIsSignup,
	setPassword,
    setCookie
) => {
	if (isSignup) {
		// check if username is a string and not more than 10xters
		if (isNaN(username) && username.length <= 20 && username.length >= 5) {
			// check if password has at least 8 xters
			if (password.length >= 8) {
				// check if password similar to repeated password
				if (password === confirmPassword) {
					// register user
					APIService.RegisterUser({ username, password })
						.then((resp) => {
							if (resp.username !== username) {
								setUsernameError(true)
								setErrorMessage(`${resp.username[0]}*`)
							} else {
								setIsSignup(false)
								setPassword("")
							}
						})
						// .catch((error) => console.log(error))
				} else {
					// error message
					setPasswordError(true)
					setErrorMessage("Password didn't match*")
				}
			} else {
				// error message
				setPasswordError(true)
				setErrorMessage("Password should be at least 8 characters*")
			}
		} else {
			// error message
			setUsernameError(true)
			setErrorMessage(
				"Username should be a string of 5 to 20 characters*"
			)
		}
	} else {
		// login user
		APIService.LoginUser({ username, password })
			.then((resp) => {
				if (resp?.token) {
					setCookie("loginToken", resp.token)
					// navigate('/account')
				} else if (resp?.non_field_errors) {
					setLoginError(true)
					setErrorMessage(`${resp?.non_field_errors[0]}*`)
				} else {
					setLoginError(true)
					setErrorMessage("Something went wrong, try again later.*")
				}
			})
			// .catch((error) => console.log(error))
	}
}
