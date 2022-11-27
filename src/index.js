import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

import RootStore from './store'


const store = RootStore.create({})

export const StoreContext = createContext(store)

const root = ReactDOM.createRoot(document.getElementById('root'))



root.render(
	<BrowserRouter>
		<StoreContext.Provider value={store}>
			<App />
		</StoreContext.Provider>
	</BrowserRouter>
)
