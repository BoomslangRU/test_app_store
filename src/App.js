import { observer } from 'mobx-react-lite'

import { Header } from './components/Header/Header'
import { RoutesPage } from './routes/RoutesPage'

import './App.scss'




const App = () => {
	return (
		<div className='App'>
			<Header />
			<main className='App_Content'>
				<RoutesPage />
			</main>
		</ div>
	)
}

export default observer(App)
