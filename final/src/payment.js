import React, { useState } from 'react';
import { useGlobalContext } from "./context";
import 'bootstrap/dist/css/bootstrap.min.css'


const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handlePayment = () => {
    // Here you would integrate with a payment gateway to process the payment
    // This is just a simulated example
    // You might want to do validation before processing the payment
    if (cardNumber && cardHolder && expiryDate && cvv) {
      setPaymentComplete(true);
    } else {
      alert('Please fill in all the fields.');
    }
  };

  return (
    <div className=' d-flex p-5 justify-content-center'>          
    <div className='bg-warning p-3 rounded w-25  '>
      <h2>Card Details</h2>
      {paymentComplete ? (
        <div>
          <h2>Payment Successful!</h2>
          <p>Thank you for your payment.</p>
        </div>
      ) : (
        <form class="form-inline"  >
        <div className='mb-3'>
             <label htmlFor='Card Number'><strong>Card Number:</strong></label>
             <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value) } className='form-control rounded-0' required
            />
        </div>
        <div className='mb-3'>
             <label htmlFor='Card Holder'><strong>Card Holder:</strong></label>
             <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)} className='form-control rounded-0' required
            />
        </div>
        <div className='mb-3'>
             <label htmlFor='Expiry Date:'><strong>Expiry Date:</strong></label>
             <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)} className='form-control rounded-0' required
            />
        </div>
        <div className='mb-3'>
             <label htmlFor='CVV:'><strong>CVV:</strong></label>
             <input
              type="number"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
        </div>
        <button className='  btn-default border   bg-light text-decoration-none' onClick={handlePayment} >Make Payment</button>
       </form>
  )}
  </div>
  </div> 
  )
      };

export default Payment;
