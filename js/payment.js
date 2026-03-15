/* ============================================================
   DevCraft Studio — payment.js
   Razorpay integration with demo-mode fallback.
   Replace RAZORPAY_KEY with your actual key from razorpay.com
   ============================================================ */

// ── CONFIG — REPLACE WITH YOUR KEY ───────────────────────────
const RAZORPAY_KEY = '';
// ─────────────────────────────────────────────────────────────

const DEMO_MODE = RAZORPAY_KEY.includes('');

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) { resolve(true); return; }
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload  = () => resolve(true);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
}

async function initiatePayment(amountINR, clientName, clientEmail) {
  showToast('⚡ Opening payment gateway...', 'info');

  if (DEMO_MODE) {
    // Demo mode — simulate payment
    setTimeout(() => {
      const fakeId = 'demo_pay_' + Date.now();
      onPaymentSuccess({ razorpay_payment_id: fakeId }, amountINR, clientName);
    }, 1500);
    return;
  }

  const loaded = await loadRazorpayScript();
  if (!loaded) {
    showToast('❌ Could not load payment gateway. Please try again.', 'error');
    return;
  }

  const options = {
    key:          RAZORPAY_KEY,
    amount:       amountINR * 100,        // paise
    currency:     'INR',
    name:         'DevCraft Studio',
    description:  'Project Development — Custom Software',
    image:        'assets/favicon.svg',
    prefill: {
      name:  clientName,
      email: clientEmail
    },
    theme: { color: '#00e5ff' },
    modal: {
      ondismiss: () => showToast('Payment cancelled.', 'error')
    },
    handler: async function (response) {
      await onPaymentSuccess(response, amountINR, clientName);
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}

async function onPaymentSuccess(response, amountINR, clientName) {
  const paymentId = response.razorpay_payment_id;
  showToast('✅ Payment successful! Generating invoice...', 'success');

  // Save payment to DB
  await recordPayment(paymentId);

  // Generate invoice
  await renderInvoice(paymentId, amountINR, clientName);
}
