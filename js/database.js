/* ============================================================
   DevCraft Studio — database.js
   Supabase integration. Replace the two values below with
   your own project URL and anon key from supabase.com.
   ============================================================ */

// ── CONFIG — REPLACE THESE ───────────────────────────────────
const SUPABASE_URL = '';
const SUPABASE_KEY = '';
// ─────────────────────────────────────────────────────────────

const DB_READY = !SUPABASE_URL.includes('YOUR_PROJECT_ID');

function _headers() {
  return {
    'apikey':        SUPABASE_KEY,
    'Authorization': 'Bearer ' + SUPABASE_KEY,
    'Content-Type':  'application/json',
    'Prefer':        'return=representation'
  };
}

async function _post(table, payload) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/' + table, {
    method: 'POST', headers: _headers(),
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.message || 'DB error ' + res.status);
  }
  return res.json();
}

async function _patch(table, id, payload) {
  const res = await fetch(SUPABASE_URL + '/rest/v1/' + table + '?id=eq.' + id, {
    method: 'PATCH', headers: _headers(),
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('DB patch error ' + res.status);
  return res.json();
}

// ── Save contact-form submission ─────────────────────────────
async function saveContact({ name, email, budget, message }) {
  if (!DB_READY) { console.info('[DB no-op] saveContact', { name, email }); return { success: false }; }
  try {
    const rows = await _post('contacts', { name, email, budget, message });
    console.info('[DB] Contact saved:', rows[0]?.id);
    return { success: true, id: rows[0]?.id };
  } catch (e) {
    console.error('[DB] saveContact:', e.message);
    return { success: false };
  }
}

// ── Save ARIA proposal ───────────────────────────────────────
async function saveProposal({ clientName, company, projectType, description, features, budget, timeline, clientEmail, proposalHtml }) {
  if (!DB_READY) { console.info('[DB no-op] saveProposal', { clientName }); return { success: false }; }
  try {
    const rows = await _post('proposals', {
      client_name: clientName, company, project_type: projectType,
      description, features, budget, timeline,
      client_email: clientEmail, proposal_html: proposalHtml,
      payment_id: null, status: 'pending'
    });
    window._currentProposalId = rows[0]?.id;
    console.info('[DB] Proposal saved:', rows[0]?.id);
    return { success: true, id: rows[0]?.id };
  } catch (e) {
    console.error('[DB] saveProposal:', e.message);
    return { success: false };
  }
}

// ── Record Razorpay payment ───────────────────────────────────
async function recordPayment(paymentId, proposalId) {
  const pid = proposalId || window._currentProposalId;
  if (!DB_READY || !pid) { console.info('[DB no-op] recordPayment', paymentId); return { success: false }; }
  try {
    await _patch('proposals', pid, { payment_id: paymentId, status: 'paid' });
    console.info('[DB] Payment recorded:', paymentId);
    return { success: true };
  } catch (e) {
    console.error('[DB] recordPayment:', e.message);
    return { success: false };
  }
}

// ── Save invoice ─────────────────────────────────────────────
async function saveInvoice({ proposalId, paymentId, amount, invoiceHtml }) {
  if (!DB_READY) { console.info('[DB no-op] saveInvoice', { paymentId, amount }); return { success: false }; }
  try {
    const rows = await _post('invoices', {
      proposal_id: proposalId || window._currentProposalId || null,
      payment_id: paymentId, amount, invoice_html: invoiceHtml
    });
    console.info('[DB] Invoice saved:', rows[0]?.id);
    return { success: true, id: rows[0]?.id };
  } catch (e) {
    console.error('[DB] saveInvoice:', e.message);
    return { success: false };
  }
}

// ── Startup check ─────────────────────────────────────────────
(function () {
  if (!DB_READY) {
    console.warn(
      '%c[DevCraft] Supabase not configured — running in NO-DB mode.\n' +
      'Open js/database.js and set SUPABASE_URL + SUPABASE_KEY.',
      'color:#ffc940;font-weight:bold;font-size:12px'
    );
  } else {
    console.info('%c[DevCraft] Supabase connected ✓', 'color:#00e5ff;font-weight:bold');
  }
})();
