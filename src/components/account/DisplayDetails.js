import React from "react"

const DisplayDetails = (props) => {
	return (
		<React.Fragment>
			<div className="details-list">
				<article className="details-item">
					<p className="title">Title :</p>
					<p className="title sec-col">{props.title}</p>
				</article>
				<article className="details-item">
					<p className="title">First Name :</p>
					<p className="title sec-col">{props.firstName}</p>
				</article>
				<article className="details-item">
					<p className="title">Surname :</p>
					<p className="title sec-col">{props.surname}</p>
				</article>
				<article className="details-item">
					<p className="title">Date of birth :</p>
					<p className="title sec-col">{props.dob}</p>
				</article>
				<article className="details-item">
					<p className="title">Company Name :</p>
					<p className="title sec-col">{props.companyName}</p>
				</article>
				<article className="details-item">
					<p className="title">Address :</p>
					<p className="title sec-col-2">{props.address}</p>
				</article>
				<article className="details-item">
					<p className="title">Telephone :</p>
					<p className="title sec-col">{props.telephone}</p>
				</article>
				<article className="details-item">
					<p className="title">Bid Settings :</p>
					<p className="title sec-col">{props.biddingSettings}</p>
				</article>
				<article className="details-item">
					<p className="title">Google Ads Account ID :</p>
					<p className="title sec-col">{props.googleAdsId}</p>
				</article>
			</div>
			<div className="custom-margin">
				<button type="submit" onClick={props.handleEdit} className="btn custom-btn">
					edit
				</button>
				<div className="divider"></div>
				<button type="submit" onClick={ props.handleDeleteDetails } className="btn danger-btn">
					delete all details
				</button>
				<div className="divider"></div>
				<button type="submit" onClick={ props.handleDeleteUsers } className="btn danger-btn">
					delete account
				</button>
			</div>
		</React.Fragment>
	)
}

export default DisplayDetails
