/* ============================================================
   DevCraft Studio — invoice.js
   Generates and saves invoice after payment.
   ============================================================ */

async function renderInvoice(paymentId, totalWithGst, clientName) {
  const wrap = document.getElementById('invoiceWrap');
  if (!wrap) return;

  // Back-calculate base amount from total (total = base * 1.18)
  const base  = Math.round(totalWithGst / 1.18);
  const cgst  = Math.round(base * 0.09);
  const sgst  = Math.round(base * 0.09);
  const total = base + cgst + sgst;
  const invNo = invoiceNum();

  const items = [
    { desc: 'Discovery & Architecture Planning', qty: 1, rate: Math.round(base * 0.10 / 1000) * 1000 },
    { desc: 'UI/UX Design & Prototyping',         qty: 1, rate: Math.round(base * 0.15 / 1000) * 1000 },
    { desc: 'Frontend Development',               qty: 1, rate: Math.round(base * 0.30 / 1000) * 1000 },
    { desc: 'Backend & API Development',           qty: 1, rate: Math.round(base * 0.30 / 1000) * 1000 },
    { desc: 'Testing, QA & Bug-fixing',           qty: 1, rate: Math.round(base * 0.08 / 1000) * 1000 },
    { desc: 'Deployment & Documentation',          qty: 1, rate: Math.round(base * 0.07 / 1000) * 1000 }
  ];

  const tableRows = items.map(it => `
    <tr>
      <td>${it.desc}</td>
      <td style="text-align:center">${it.qty}</td>
      <td style="text-align:right">${formatINR(it.rate)}</td>
      <td style="text-align:right">${formatINR(it.rate * it.qty)}</td>
    </tr>`).join('');

  const html = `
    <div class="invoice-header">
      <div>
        <div class="invoice-logo"><span>Dev</span>Craft Studio</div>
        <div style="font-size:.8rem;color:#666;margin-top:.25rem">GST: 29ABCDE1234F1Z5</div>
        <div style="font-size:.8rem;color:#666">Koramangala, Bangalore — 560034</div>
        <div style="font-size:.8rem;color:#666">hello@devcraft.studio</div>
      </div>
      <div style="text-align:right">
        <div class="invoice-badge">PAID ✓</div>
        <div style="margin-top:.75rem;font-size:.8rem;color:#666">Invoice No: <strong>${invNo}</strong></div>
        <div style="font-size:.8rem;color:#666">Date: <strong>${todayStr()}</strong></div>
        <div style="font-size:.8rem;color:#666">Payment ID: <strong>${paymentId}</strong></div>
      </div>
    </div>

    <div class="invoice-details">
      <div>
        <div class="invoice-label">Billed To</div>
        <div class="invoice-value">${clientName}</div>
        <div style="font-size:.85rem;color:#555;margin-top:.25rem">
          ${agentAnswers.company || '—'}
        </div>
        <div style="font-size:.82rem;color:#777">${agentAnswers.email || ''}</div>
      </div>
      <div>
        <div class="invoice-label">Project</div>
        <div class="invoice-value">${agentAnswers.type || 'Custom Software Development'}</div>
        <div style="font-size:.82rem;color:#777;margin-top:.25rem">Timeline: ${agentAnswers.timeline || '—'}</div>
      </div>
    </div>

    <table class="invoice-table">
      <thead>
        <tr>
          <th>Description</th>
          <th style="text-align:center">Qty</th>
          <th style="text-align:right">Rate</th>
          <th style="text-align:right">Amount</th>
        </tr>
      </thead>
      <tbody>${tableRows}</tbody>
    </table>

    <div class="invoice-totals">
      <div class="invoice-total-row"><span>Subtotal</span><span>${formatINR(base)}</span></div>
      <div class="invoice-total-row"><span>CGST (9%)</span><span>${formatINR(cgst)}</span></div>
      <div class="invoice-total-row"><span>SGST (9%)</span><span>${formatINR(sgst)}</span></div>
      <div class="invoice-total-row grand"><span>Total Paid</span><span>${formatINR(total)}</span></div>
    </div>

    <div class="invoice-footer">
      <div class="invoice-note">
        Thank you for choosing DevCraft Studio!<br>
        Payment received in full on ${todayStr()}.<br>
        Project kick-off will be scheduled within 2 business days.
      </div>
      <div class="invoice-actions">
        <button class="btn-primary" style="background:#000;color:#fff;font-size:.82rem;padding:.6rem 1.2rem" onclick="window.print()">
          🖨️ Print / Save PDF
        </button>
      </div>
    </div>`;

  wrap.style.display = 'block';
  wrap.innerHTML = html;
  wrap.scrollIntoView({ behavior: 'smooth', block: 'start' });

  // Save invoice to DB
  await saveInvoice({
    proposalId:  window._currentProposalId || null,
    paymentId:   paymentId,
    amount:      total,
    invoiceHtml: html
  });
}
