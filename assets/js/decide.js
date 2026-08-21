/* ============================================================
   decide.js - the executive decision simulator.

   Not a quiz. There is no scored answer, because the point of the section
   it lives in is that the risk and the tradeoffs go on the table and the
   decision stays with the person who owns the consequence. Every option
   here is one I would defend in a real room, and every result names what
   that choice quietly accepted.

   Hand-written content, same as the terminal. No dependencies.
   ============================================================ */
(function () {
  'use strict';

  var app = document.getElementById('decideApp');
  if (!app) return;

  var SCENARIOS = [
    {
      tag: 'PCI DSS · scope',
      title: 'The system nobody wants to touch',
      brief: [
        'A twelve-year-old order-entry system sits in the middle of the cardholder flow. It works. The person who wrote it left in 2019. It is the reason forty machines are in PCI scope, and it is most of the reason the audit costs what it costs.',
        'Replacing it is a real project, and it competes with things the business would much rather fund.'
      ],
      options: [
        {
          label: 'Replace it this year',
          note: 'Costs a funded project and a fight with the roadmap.',
          result: 'You bought a permanent reduction with a temporary argument. Scope drops, every audit after this one gets cheaper, and you spend two quarters explaining why a system that "works fine" is being rebuilt. That explanation is the actual work. If you cannot make it in one breath, the project dies at the first budget review.'
        },
        {
          label: 'Segment it and leave it running',
          note: 'Costs engineering time now, plus a boundary somebody proves every year.',
          result: 'The pragmatic middle, and the one I have usually taken. You get most of the scope reduction without the project, and you inherit a segmentation boundary that has to be documented, tested, and defended at every audit. That is a real recurring cost. It is usually smaller than the one you avoided, but it is not zero, and pretending otherwise is how boundaries quietly rot.'
        },
        {
          label: 'Leave it alone this year',
          note: 'Costs nothing today. Accepts the same audit surface indefinitely.',
          result: 'Genuinely defensible, and I have recommended it. You decided this year buys something else. The only thing that turns this into a bad decision is leaving it unsaid. Write down what you accepted and when you will revisit it, or next year it reads as an oversight rather than a choice.'
        }
      ]
    },
    {
      tag: 'Identity · session trust',
      title: 'Ninety days of trust',
      brief: [
        'Multi-factor sessions last ninety days. A stolen session token is therefore good for three months, and whoever is holding it never sees a prompt.',
        'Shortening it works. It also means everyone re-authenticates far more often, and you will hear about it.'
      ],
      options: [
        {
          label: 'Cut it to seven days',
          note: 'Costs roughly thirteen times more prompts, and about a week of complaints.',
          result: 'This is the one I made. A stolen session now dies in a week instead of a quarter. The complaints stopped in about ten days, because the prompt takes four seconds and people are reasonable once you tell them why. The cost was real but front-loaded. The risk you removed is permanent.'
        },
        {
          label: 'Cut it to thirty days',
          note: 'Costs less friction, and accepts a month of exposure per theft.',
          result: 'A reasonable trade and an easier one to sell. You removed most of the exposure for a fraction of the noise. Just be honest with yourself that thirty days is still a long time to hold somebody else\'s session, and that you partly picked the number because it was easier to defend, not only because it was right.'
        },
        {
          label: 'Leave it at ninety',
          note: 'Costs nothing. Accepts a quarter of access from a single theft.',
          result: 'You decided the friction was not worth it. That can be right in a year with three other painful changes already in flight, because change fatigue is a real risk and not a soft one. But name it as a deferral with a date rather than a position. Ninety days is not a security posture. It is a default nobody has revisited.'
        }
      ]
    },
    {
      tag: 'Third-party risk · procurement',
      title: 'The contract that is already signed',
      brief: [
        'A business unit signed a SaaS contract without a security review. The platform will hold customer data. Go-live is in three weeks and the launch has already been announced internally.',
        'The review you would have run takes about a week. Nobody asked for it.'
      ],
      options: [
        {
          label: 'Block go-live until the review is done',
          note: 'Costs a delayed launch and your reputation as the department of no.',
          result: 'Sometimes correct, and expensive in a currency you will need later. You get your review, and you also teach the organization that security is something that happens to them rather than something they take part in. If you spend this one, spend it on a platform that genuinely warrants it, and follow it immediately with a process that makes the next team come to you early.'
        },
        {
          label: 'Approve with conditions and a deadline',
          note: 'Costs you the interim risk, and requires you to actually enforce the date.',
          result: 'My usual answer, and the one that fails most often in practice. It works when the conditions are specific, dated, and owned by somebody who is not you. It becomes theater the moment a deadline passes without consequence, and every team watching learns that conditions are optional. The decision is the easy part. The follow-through is the whole thing.'
        },
        {
          label: 'Approve it and review afterwards',
          note: 'Costs nothing now. Accepts whatever is in there.',
          result: 'You chose the relationship and the launch date. That is a legitimate trade and I would not call it reckless by itself. What makes it reckless is not writing it down. Put it on the risk register with a name against it, because the version of this that ends badly always starts with nobody remembering who decided.'
        }
      ]
    },
    {
      tag: 'Incident response · Friday',
      title: 'Five o\'clock on a Friday',
      brief: [
        'Unusual sign-in activity on a finance account. It could be the controller traveling. It could be the first hour of something much worse. Your information is partial and it is not going to improve quickly.',
        'Payroll runs tonight.'
      ],
      options: [
        {
          label: 'Disable the account now',
          note: 'Costs you payroll, if you are wrong.',
          result: 'The safe move on the risk and the expensive move on everything else. If you are wrong you have broken a critical process and spent credibility you will want next time. That is survivable. What is not survivable is finding out on Monday that you watched and hoped. When the information is bad and the downside is severe, act and apologize. Just make sure somebody is already calling the controller while you click.'
        },
        {
          label: 'Kill the session, keep the account, escalate',
          note: 'Costs some dwell time, and a phone call you make yourself.',
          result: 'Usually the best available answer, and it depends entirely on whether you can do it in minutes rather than hours. Forcing re-authentication buys most of the containment without breaking the business. It only works if that capability existed before Friday. Nobody builds it at five o\'clock.'
        },
        {
          label: 'Monitor it and reassess in the morning',
          note: 'Costs nothing tonight. Accepts a night of dwell time if it is real.',
          result: 'The one that reads fine in the moment and badly in the write-up. Sometimes it is right, when the signal is genuinely weak and containment would be disproportionate. But be honest about why you picked it. If the reason is that it is Friday and you want to go home, that is not a risk assessment, and the postmortem will say so in words you have to read out loud.'
        }
      ]
    }
  ];

  var idx = 0;
  var answered = false;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function render() {
    var s = SCENARIOS[idx];
    app.innerHTML = '';
    answered = false;

    var head = el('div', 'decide__head');
    head.appendChild(el('span', 'decide__count', 'Decision ' + (idx + 1) + ' of ' + SCENARIOS.length));
    head.appendChild(el('span', 'decide__tag', s.tag));
    app.appendChild(head);

    app.appendChild(el('h3', 'decide__title', s.title));

    var brief = el('div', 'decide__brief');
    s.brief.forEach(function (p) { brief.appendChild(el('p', null, p)); });
    app.appendChild(brief);

    var opts = el('div', 'decide__opts');
    s.options.forEach(function (o, i) {
      var b = el('button', 'decide__opt');
      b.type = 'button';
      b.appendChild(el('b', null, o.label));
      b.appendChild(el('span', null, o.note));
      b.addEventListener('click', function () { choose(i); });
      opts.appendChild(b);
    });
    app.appendChild(opts);

    var out = el('div', 'decide__out');
    out.id = 'decideOut';
    out.setAttribute('role', 'status');
    out.setAttribute('aria-live', 'polite');
    app.appendChild(out);
  }

  function choose(i) {
    if (answered) return;
    answered = true;

    var s = SCENARIOS[idx];
    var buttons = app.querySelectorAll('.decide__opt');
    Array.prototype.forEach.call(buttons, function (b, n) {
      b.disabled = true;
      b.classList.add(n === i ? 'is-picked' : 'is-muted');
    });

    var out = document.getElementById('decideOut');
    out.innerHTML = '';
    out.appendChild(el('p', 'decide__verdict', 'What you just accepted'));
    out.appendChild(el('p', 'decide__body', s.options[i].result));

    var nav = el('div', 'decide__nav');
    if (idx < SCENARIOS.length - 1) {
      var next = el('button', 'decide__next', 'Next decision');
      next.type = 'button';
      next.addEventListener('click', function () { idx++; render(); focusHead(); });
      nav.appendChild(next);
    } else {
      out.appendChild(el('p', 'decide__close', 'That is the job. Four decisions, no clean answers, and somebody has to own each one. My part is making sure the person who owns it can see what they are choosing between. Yours is choosing.'));
      var again = el('button', 'decide__next', 'Start over');
      again.type = 'button';
      again.addEventListener('click', function () { idx = 0; render(); focusHead(); });
      nav.appendChild(again);
    }
    out.appendChild(nav);
  }

  function focusHead() {
    var h = app.querySelector('.decide__title');
    if (!h) return;
    h.setAttribute('tabindex', '-1');
    h.focus({ preventScroll: true });
  }

  render();
})();
