import React from "react"
import { Route, Routes } from "react-router-dom"
import { Container } from '@material-ui/core'
import Navbar from "./components/navbar/Navbar"
import Auth from "./components/auth/Auth"
import Account from "./components/account/Account"

function App() {
	return (
		<React.Fragment>
			<Navbar/>
			<Container maxWidth='lg'>
				<Routes>
					<Route exact path="/" element={<Auth/>}/>
					<Route exact path='/account' element={<Account/>}/>
				</Routes>
			</Container>
		</React.Fragment>
	)
}

export default App
