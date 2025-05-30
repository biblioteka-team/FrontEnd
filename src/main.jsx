import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import './main.scss';
import { store } from './redux/store.js'
import './utils/i18n.js'

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // Не оновлювати автоматично при фокусі
			staleTime: 120000, // Глобальне кешування (20 хвилин)
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Router>
			<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<App />
			</Provider>
			</QueryClientProvider>
		</Router>
	</React.StrictMode>
);
