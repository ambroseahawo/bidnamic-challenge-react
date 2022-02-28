import React from "react"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css'
import './details.css'

const VerifyAge = ({ handleVerification, selectedDate, setSelectedDate, error, errorMessage }) => {
	return (
        <section className="section-center">
            <form className="details-form" onSubmit={ handleVerification }>
                <h3>Verification</h3>
                <div className="form-control">
                    <div className="form-field">
                        <label htmlFor="name">Date of Birth: </label>
                        <DatePicker selected={selectedDate} onChange={ date => setSelectedDate(date)}
                                        dateFormat='dd/MM/yyyy' showYearDropdown
                                        scrollableMonthYearDropdown className="detail"
                                        maxDate={new Date()}
                        />
                        { error && (
                            <span style={{color: "red"}}>{ errorMessage }</span>
                        )}
                    </div>
                    <div className="custom-margin">
						<button type="submit" className="submit-btn">
							submit
						</button>
					</div>
                </div>
            </form>
			{/* <button type="submit" className="btn">
				delete account
			</button> */}
        </section>
    )
}

export default VerifyAge
