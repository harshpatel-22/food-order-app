import { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting'
import Input from './UI/Input'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'
import axios from 'axios'

export default function Checkout() {
    const cartCtx = useContext(CartContext)

    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((acc, item) => {
		return acc + item.quantity * item.price
	}, 0)

    function handleClose() {
        userProgressCtx.hideCheckout()
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target)
        const customerData = Object.fromEntries(formData.entries()) //result the object like {email:test@gmail.com}

        const order = {
			items: cartCtx.items,
			customer: customerData,
		}

        axios.post('http://localhost:3000/orders',{order})

    }
	return (
		<Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
			<form action='' onSubmit={handleSubmit}>
				<h2>Checkout</h2>
				<p>Total Amount:{currencyFormatter.format(cartTotal)}</p>
				<Input label='Full name' type='text' id='name' />
				<Input label='E-mail address' type='email' id='email' />
				<Input label='Street' type='text' id='street' />
				<div className='control-row'>
					<Input label='Postal Code' type='text' id='postal-code' />
					<Input label='City' type='text' id='city' />
                </div>
                
                <p className='modal-actions'>
                    <Button textOnly onClick={handleClose}>Close</Button>
                    <Button>Submit Order</Button>
                </p>
			</form>
		</Modal>
	)
}
