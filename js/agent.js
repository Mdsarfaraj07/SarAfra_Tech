/* ============================================================
   DevCraft Studio — agent.js
   ARIA — AI Requirements Agent chat flow
   ============================================================ */

let agentStep    = 0;
let agentAnswers = {};
let agentTyping  = false;

function initAgent() {
  renderSteps();
  setTimeout(() => agentAsk(0), 600);

  const input = document.getElementById('chatInput');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }
}

// ── Render step progress bar ─────────────────────────────────
function renderSteps() {
  const bar = document.getElementById('stepsBar');
  if (!bar) return;
  bar.innerHTML = AGENT_STEPS.map((s, i) => `
    <div class="step-item ${i === 0 ? 'active' : ''}" id="step-${i}">
      ${i + 1}. ${s.label}
    </div>
  `).join('');
}

function updateStep(i) {
  AGENT_STEPS.forEach((_, idx) => {
    const el = document.getElementById('step-' + idx);
    if (!el) return;
    el.className = 'step-item ' + (idx < i ? 'done' : idx === i ? 'active' : '');
  });
}

// ── Ask a question ────────────────────────────────────────────
function agentAsk(stepIndex) {
  if (stepIndex >= AGENT_STEPS.length) { generateProposal(); return; }
  const step = AGENT_STEPS[stepIndex];
  let text = step.question.replace('{name}', agentAnswers.name || 'there');
  if (step.hint) text += '\n\n💡 ' + step.hint;

  showTyping();
  setTimeout(() => {
    removeTyping();
    appendBot(text, step.options);
    updateStep(stepIndex);
    enableInput();
  }, 900);
}

// ── Handle user send ──────────────────────────────────────────
function sendMessage() {
  if (agentTyping) return;
  const input = document.getElementById('chatInput');
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;

  appendUser(val);
  input.value = '';
  processAnswer(val);
}

function selectOption(val) {
  document.getElementById('chatInput').value = val;
  sendMessage();
}

function processAnswer(val) {
  const step = AGENT_STEPS[agentStep];
  agentAnswers[step.key] = val;
  disableInput();
  agentStep++;
  agentAsk(agentStep);
}

// ── DOM helpers ───────────────────────────────────────────────
function appendBot(text, options) {
  const wrap = document.getElementById('chatMessages');
  if (!wrap) return;

  const optHtml = options ? `
    <div class="quick-replies">
      ${options.map(o => `<button class="qr-btn" onclick="selectOption('${o.replace(/'/g,"\\'")}')">
        ${o}
      </button>`).join('')}
    </div>` : '';

  const safeText = text.replace(/\n/g, '<br>');
  const div = document.createElement('div');
  div.className = 'msg bot';
  div.innerHTML = `
    <div class="msg-avatar">AI</div>
    <div>
      <div class="msg-bubble">${safeText}</div>
      ${optHtml}
    </div>`;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function appendUser(text) {
  const wrap = document.getElementById('chatMessages');
  if (!wrap) return;
  const div = document.createElement('div');
  div.className = 'msg user';
  div.innerHTML = `
    <div class="msg-avatar">You</div>
    <div class="msg-bubble">${text}</div>`;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function showTyping() {
  agentTyping = true;
  disableInput();
  const wrap = document.getElementById('chatMessages');
  if (!wrap) return;
  const div = document.createElement('div');
  div.className = 'msg bot'; div.id = 'typingMsg';
  div.innerHTML = `
    <div class="msg-avatar">AI</div>
    <div class="msg-bubble">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>`;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
}

function removeTyping() {
  agentTyping = false;
  const el = document.getElementById('typingMsg');
  if (el) el.remove();
}

function enableInput() {
  const i = document.getElementById('chatInput');
  const b = document.getElementById('chatSend');
  if (i) { i.disabled = false; i.focus(); }
  if (b) b.disabled = false;
}

function disableInput() {
  const i = document.getElementById('chatInput');
  const b = document.getElementById('chatSend');
  if (i) i.disabled = true;
  if (b) b.disabled = true;
}

// ── Generate proposal ─────────────────────────────────────────
async function generateProposal() {
  showTyping();
  await delay(1500);
  removeTyping();
  appendBot("✅ Perfect! I have everything I need. Generating your custom proposal now...");

  await delay(1200);
  showTyping();
  await delay(2000);
  removeTyping();

  const est = estimateFromBudget(agentAnswers.budget);
  const proposalHtml = buildProposalHTML(agentAnswers, est);

  const box = document.getElementById('proposalBox');
  if (box) {
    box.style.display = 'block';
    box.innerHTML = proposalHtml;
    box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // Save to Supabase
  await saveProposal({
    clientName:   agentAnswers.name,
    company:      agentAnswers.company,
    projectType:  agentAnswers.type,
    description:  agentAnswers.description,
    features:     agentAnswers.features,
    budget:       agentAnswers.budget,
    timeline:     agentAnswers.timeline,
    clientEmail:  agentAnswers.email,
    proposalHtml: proposalHtml
  });

  // Update all steps to done
  updateStep(AGENT_STEPS.length);
}

function buildProposalHTML(a, est) {
  const items = [
    { name: 'Discovery & Architecture', pct: 0.10 },
    { name: 'UI/UX Design', pct: 0.15 },
    { name: 'Frontend Development', pct: 0.30 },
    { name: 'Backend & API Development', pct: 0.30 },
    { name: 'Testing & QA', pct: 0.08 },
    { name: 'Deployment & Documentation', pct: 0.07 }
  ];

  const rows = items.map(it => {
    const amount = Math.round(est.base * it.pct / 1000) * 1000;
    return `<div class="proposal-row"><span>${it.name}</span><span>${formatINR(amount)}</span></div>`;
  }).join('');

  const cgst = Math.round(est.base * 0.09);
  const sgst = Math.round(est.base * 0.09);
  const total = est.base + cgst + sgst;

  return `
    <div>
      <h3>Project Proposal for ${a.company || a.name}</h3>
      <div class="proposal-meta">Prepared by DevCraft Studio &nbsp;·&nbsp; ${todayStr()} &nbsp;·&nbsp; Valid for 30 days</div>

      <div class="proposal-section">
        <h4>Project Overview</h4>
        <div class="proposal-row"><span>Client</span><span>${a.name}${a.company ? ' — ' + a.company : ''}</span></div>
        <div class="proposal-row"><span>Project Type</span><span>${a.type}</span></div>
        <div class="proposal-row"><span>Timeline</span><span>${a.timeline}</span></div>
        <div class="proposal-row"><span>Contact Email</span><span>${a.email}</span></div>
      </div>

      <div class="proposal-section">
        <h4>Scope & Requirements</h4>
        <div class="proposal-row" style="flex-direction:column;gap:.4rem;">
          <span style="color:var(--muted);font-size:.85rem;">${a.description}</span>
        </div>
        <div class="proposal-row"><span>Key Features</span><span style="text-align:right;max-width:60%;color:var(--muted);font-size:.85rem">${a.features}</span></div>
      </div>

      <div class="proposal-section">
        <h4>Cost Breakdown</h4>
        ${rows}
        <div class="proposal-row"><span>Subtotal</span><span>${formatINR(est.base)}</span></div>
        <div class="proposal-row"><span>CGST (9%)</span><span>${formatINR(cgst)}</span></div>
        <div class="proposal-row"><span>SGST (9%)</span><span>${formatINR(sgst)}</span></div>
        <div class="proposal-total"><span>Total (incl. GST)</span><span>${formatINR(total)}</span></div>
      </div>

      <div class="proposal-actions">
        <button class="btn-primary" onclick="initiatePayment(${total}, '${a.name.replace(/'/g,"\\'")}', '${a.email}')">
          Pay & Get Invoice →
        </button>
        <button class="btn-outline" onclick="window.print()">📄 Print Proposal</button>
      </div>
    </div>`;
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)); }
