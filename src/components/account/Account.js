import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { handleLogout } from "../../utils/Utilities"
import APIService from "../../utils/APIService"
import DisplayDetails from "./DisplayDetails"
import FirstFill from "./FirstFill"
import FullForm from "../form/FullForm"
import './account.css'

const Account = () => {
    const navigate = useNavigate()
    const [cookies] = useCookies(['loginToken'])

    const [details, setDetails] = useState([])
    const [editDetails, setEditDetails] = useState(false)

    useEffect(() => {
        if(!cookies.loginToken){
            navigate('/')
        }
    }, [cookies.loginToken, navigate])

    useEffect(() => {
        APIService.FetchDetails(cookies.loginToken)
            .then((resp) => setDetails(resp))
    },[cookies.loginToken])

    const handleEdit = () => {
        setEditDetails(true)
    }

    const handleDeleteDetails = () =>{
        APIService.DeleteDetails(cookies.loginToken, details[0].id)
                    .then(() => window.location.reload())
                    // .catch((error) => console.log(error))
    }

    const handleDeleteUsers = () =>{
        APIService.DeleteUsers(cookies.loginToken)
                    .then(handleLogout)
                    // .catch((error) => console.log(error))
    }

    if(details.length === 0){
        return <FirstFill />
    }

	return (
        <React.Fragment>
            { editDetails ? <FullForm address={details[0].address} biddingSettings={details[0].bid} 
                                      companyName={details[0].company_name} googleAdsId={details[0].google_id}
                                      dob={details[0].dob} firstName={details[0].first_name} surname={details[0].surname}
                                      telephone={details[0].telephone} title={details[0].title} id={details[0].id}
                                      handleEdit={ handleEdit } editDetails={ editDetails } user={ details[0].user} /> 
            : (
                <section className="section-center">
                    <h3>Account Details</h3>
                    <div className="details-container">
                        { details && details.map(data => {
                            const { id, address, bid, company_name, dob, first_name,
                                        google_id, surname, telephone, title } = data
                            return(
                                <DisplayDetails key={id} address={address} biddingSettings={bid} companyName={company_name}
                                                dob={dob} firstName={first_name} googleAdsId={google_id} surname={surname}
                                                telephone={telephone} title={title} handleEdit={ handleEdit }
                                                handleDeleteDetails={ handleDeleteDetails } handleDeleteUsers={handleDeleteUsers} />
                            )
                        })}
                    </div>
                </section>
            )}
        </React.Fragment>
    )
}

export default Account
