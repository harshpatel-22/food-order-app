import { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../util/formatting'
import Input from './UI/Input'
import Button from './UI/Button'
import UserProgressContext from '../store/UserProgressContext'
import axios from 'axios'
import useHttp from '../hooks/useHttp'
import Error from './Error'



const requestConfig = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
	},
}

export default function Checkout() {
    const cartCtx = useContext(CartContext)

    const userProgressCtx = useContext(UserProgressContext);

    const {
		data,
		isLoading: isSending,
		error,
		sendRequest,
		clearData,
	} = useHttp('http://localhost:3000/orders', requestConfig)

    const cartTotal = cartCtx.items.reduce((acc, item) => {
		return acc + item.quantity * item.price
	}, 0)

    function handleClose() {
        userProgressCtx.hideCheckout()
    }

    function handleFinish() {
        userProgressCtx.hideCheckout()
        cartCtx.clearCart();
        clearData();
    }
    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target)
        const customerData = Object.fromEntries(formData.entries()) //result the object like {email:test@gmail.com}

        const payload = JSON.stringify({
			order: {
				items: cartCtx.items,
				customer: customerData,
			},
		})

		sendRequest(payload)
    }

    let actions = (
		<>
			<Button textOnly onClick={handleClose}>
				Close
			</Button>
			<Button>Submit Order</Button>
		</>
	)

    if (isSending) {
        actions = <span>Sending Order Data</span>
    }

    if (data && !error) {
        return (
			<Modal
				open={userProgressCtx.progress === 'checkout'}
				onClose={handleFinish}
			>
				<h2>Success!</h2>
				<p>Your order was submitted successfully</p>
				<p>we will get back to you via email within next few minutes</p>
				<p className='modal-actions'>
					<Button onClick={handleClose}>Okay</Button>
				</p>
			</Modal>
		)
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
                {error && <Error title='Failed to submit order' message={error} /> }    
                <p className='modal-actions'>
                   {actions}
                </p>
			</form>
		</Modal>
	)
}
  