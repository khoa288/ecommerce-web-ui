// import * as signalR from '@microsoft/signalr'

// class SignalRService {
// 	constructor() {
// 		this.connection = new signalR.HubConnectionBuilder()
// 			.withUrl('/notificationHub')
// 			.configureLogging(signalR.LogLevel.Information)
// 			.build()
// 		this.connection.on('ReceiveNotification', this.onNotificationReceived)
// 	}

// 	startConnection = async () => {
// 		try {
// 			await this.connection.start()
// 			console.log('SignalR connected.')
// 		} catch (error) {
// 			console.error('SignalR connection error: ', error)
// 			setTimeout(() => this.startConnection(), 5000)
// 		}
// 	}

// 	onNotificationReceived = (message) => {
// 		console.log('Notification received:', message)
// 	}
// }

// const signalRService = new SignalRService()
// export default signalRService
