import React, { useState } from "react"
import APIService from "../../utils/APIService"
import { useCookies } from "react-cookie"
import { validateResponse, validateFullForm } from "../../utils/Validate"

const FullForm = (props) => {
    const [cookies] = useCookies(['loginToken'])
	const [formData, setFormData] = useState({
		title: props.title || '', firstName: props.firstName || '',
		surname: props.surname || '', companyName: props.companyName || '',
		address: props.address || '', telephone: props.telephone || '',
		biddingSettings: props.biddingSettings || '', dob: props.dob || '',
		googleAdsId: props.googleAdsId || ''
	})
	const [formError, setFormError] = useState(false)
	const [responseError, setResponseError] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}
    
    const handleSubmit = (e) => {
        e.preventDefault();
		setFormError(false)
		setResponseError(false)

		// validate submitted form data
		let validationTruthy =  validateFullForm(formData, setFormError, setErrorMessage)

		if(validationTruthy === false) return

		const userData = {
			title: formData.title,
			first_name: formData.firstName,
			bid: formData.biddingSettings,
			surname: formData.surname,
			dob: formData.dob,
			telephone: formData.telephone,
			company_name: formData.companyName,
			address: formData.address,
			google_id: formData.googleAdsId,
		}

		if(props.editDetails === true){
			// send PUT request to edit details
			APIService.UpdateDetails(cookies.loginToken, props.id, userData)
					.then((resp) => {
						validateResponse(resp, formData, setResponseError, setErrorMessage)
					})
					// .catch((error) => console.log(error))
		}else if(props.editDetails === false){
			// send POST request to create details
			APIService.PostDetails(cookies.loginToken, userData)
					.then((resp) => {
						console.log(resp)
						validateResponse(resp, formData, setResponseError, setErrorMessage)
					})
					// .catch((error) => console.log(error))
		}

    }
    
	return (
		<section className="section-center">
			<form className="details-form" onSubmit={handleSubmit}>
				<h3>{ props.editDetails ? "Edit Details" : "Fill Details" }</h3>
				{ (responseError || formError) && <span style={{color: "red", fontSize: "1rem", fontStyle: "italic"}}>{ errorMessage }</span>}
				
				<div className="form-control">
					<div className="form-field">
						<label htmlFor="name">Title: </label>
						<input
							required
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							className="detail"
						/>
					</div>
					<div className="form-field">
						<label htmlFor="quantity">First Name: </label>
						<input
							required
							type="text"
							name="firstName"
							value={formData.firstName || ""}
							onChange={handleChange}
							className="detail"
						/>
					</div>
					<div className="form-field">
						<label htmlFor="quantity">Surname: </label>
						<input
							required
							type="text"
							name="surname"
							value={formData.surname || ""}
							onChange={handleChange}
							className="detail"
						/>
					</div>
					<div className="form-field">
						<label htmlFor="quantity">Date of Birth: </label>
						<input
							required
							type="text"
							name="dob"
							value={formData.dob || ""}
							disabled
							className="detail"
						/>
					</div>
					<div className="form-field">
						<label htmlFor="quantity">Company Name: </label>
						<input
							required
							type="text"
							name="companyName"
							value={formData.companyName || ""}
							onChange={handleChange}
							className="detail"
						/>
					</div>
					<div className="form-field">
						<label htmlFor="quantity">Address: </label>
						<input
							required
							type="text"
							name="address"
							value={formData.address || ""}
							onChange={handleChange}
							className="detail"
						/>
					</div>
					<div className="form-field">
						<label htmlFor="quantity">Telephone: </label>
						<input
							required
							type="text"
							name="telephone"
							value={formData.telephone || ""}
							onChange={handleChange}
							className="detail"
						/>
					</div>
					<div className="form-field">
						<label htmlFor="quantity">Bidding Settings: </label>
						<select required name="biddingSettings" value={ formData.biddingSettings } onChange={ handleChange }>
							<option value="">--- Select Bid ---</option>
							<option value="high">High</option>
							<option value="medium">Medium</option>
							<option value="low">Low</option>
						</select>
					</div>
					<div className="form-field">
						<label htmlFor="quantity">
							Google Ads Account ID:{" "}
						</label>
						<input
							required
							type="text"
							name="googleAdsId"
							value={formData.googleAdsId || ""}
							onChange={handleChange}
							className="detail"
						/>
					</div>

					<div className="custom-margin">
						<button type="submit" className="submit-btn">
							{ props.editDetails ? "save" : "submit"}
						</button>
					</div>
				</div>
			</form>
		</section>
	)
}

export default FullForm
