import Cart from './component/Cart'
import Checkout from './component/Checkout'
import Header from './component/Header'
import Meals from './component/Meals'
import { CartContextProvider } from './store/CartContext'
import { UserProgressContextProvider } from './store/UserProgressContext'

function App() {
	return (
		<>
			<UserProgressContextProvider>
				<CartContextProvider>
					<Header />
                    <Meals />
                    <Cart />
                    <Checkout/>
				</CartContextProvider>
			</UserProgressContextProvider> 
		</>
	)
}

export default App
