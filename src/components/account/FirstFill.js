import React, { useState } from "react"
import FullForm from "../form/FullForm"
import VerifyAge from "../form/VerifyAge"
import { validateOver18 } from "../../utils/Validate"
import { convertDate } from "../../utils/Utilities"

const FirstFill = () => {
    const [isOver18, setIsOver18] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [dob, setDob] = useState('')

    const handleVerification = (e) => {
        e.preventDefault()
        setError(false)
        if(validateOver18(selectedDate)){
            setDob(convertDate(selectedDate))
            setIsOver18(true)
        }else{
            setError(true)
            setErrorMessage("You need to be at least 18 years old to proceed.*")
        }
    }

	return (
        <React.Fragment>
            { !isOver18 ? <VerifyAge selectedDate={ selectedDate } setSelectedDate={ setSelectedDate }
                                        handleVerification={ handleVerification } error={error}
                                        errorMessage={errorMessage} /> 
                        :  <FullForm dob={ dob } editDetails={ false} />}
        </React.Fragment>
    )
}

export default FirstFill
