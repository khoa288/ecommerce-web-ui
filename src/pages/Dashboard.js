import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ServicesContext from '../services/ServicesContext'
import { variables } from '../Variables'
import ProductTable from '../components/ProductTable'

const Dashboard = () => {
	const navigate = useNavigate()
	const [isTwoFactorAuth, setIsTwoFactorAuth] = useState('')
	const { userService } = useContext(ServicesContext)

	useEffect(() => {
		async function getTwoFactorAuthStatus() {
			await userService.getTwoFactorAuth(setIsTwoFactorAuth, navigate)
		}

		getTwoFactorAuthStatus()
	}, [userService, navigate])

	const handleSwitch = async (e) => {
		e.preventDefault()

		if (isTwoFactorAuth) {
			await userService.deactivateTwoFactorAuth(setIsTwoFactorAuth, navigate)
		} else {
			navigate(variables.TOTP_ACTIVATE)
		}
	}

	const handleLogout = async (e) => {
		e.preventDefault()
		await userService.logout(navigate)
	}

	return (
		<section className="vh-100">
			<div className="container py-5 h-100">
				<div className="row">
					<div className="col-auto me-auto">
						<h1 className="btn-center">Dashboard</h1>
					</div>
					<div className="col-auto">
						<div className="form-check form-switch mb-3" style={{ paddingTop: '1%' }}>
							<input
								className="form-check-input"
								id="two-factor-auth-checkbox"
								type="checkbox"
								role="switch"
								onChange={handleSwitch}
								checked={isTwoFactorAuth}
								style={{ borderColor: '#000' }}
							/>
							<label className="form-check-label" htmlFor="two-factor-auth-checkbox">
								Two-factor authentication
							</label>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-auto me-auto">
						<p>Welcome to the dashboard!</p>
					</div>
					<div className="col-auto">
						<button
							className="btn btn-block"
							style={{ borderColor: '#000' }}
							onClick={handleLogout}
						>
							Logout
						</button>
					</div>
				</div>

				<ProductTable />
			</div>
		</section>
	)
}

export default Dashboard
