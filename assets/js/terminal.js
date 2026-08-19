/* ============================================================
   terminal.js - the conversational terminal on samueljdavis.com
   No dependencies. Everything below is hand-written content.
   ============================================================ */
(function () {
  'use strict';

  var screenEl = document.getElementById('termScreen');
  var formEl   = document.getElementById('termForm');
  var inputEl  = document.getElementById('termInput');
  var chipsEl  = document.getElementById('termChips');
  var termEl   = document.getElementById('term');
  if (!screenEl || !formEl || !inputEl) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- contact details ----------
     Masked and kept in contact.js; decoded here only when someone runs the
     `contact` command, which is always a deliberate keystroke or click. */
  function mail() { return window.SJDContact ? window.SJDContact.mail() : ''; }

  /* ---------- tiny output DSL ---------- */
  function L(text, cls) { return { text: text, cls: cls || 't-out' }; }
  function D(text)      { return { text: text, cls: 't-dim' }; }
  function A(text)      { return { text: text, cls: 't-accent' }; }
  function HEAD(text)   { return { text: text, cls: 't-head' }; }
  function RULE()       { return { text: '─'.repeat(52), cls: 't-rule' }; }
  function SP()         { return { spacer: true }; }
  function RAW(html)    { return { html: html }; }
  function LINK(href, label) {
    return RAW('<a class="t-link" href="' + href + '" target="_blank" rel="noopener">' + label + '</a>');
  }
  function RUNS(label) {
    var out = ['<span class="t-dim">try:</span> '];
    for (var i = 0; i < label.length; i++) {
      out.push('<button type="button" class="t-run" data-cmd="' + esc(label[i]) + '">' + esc(label[i]) + '</button>');
    }
    return RAW(out.join(''));
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ============================================================
     COMMANDS
     ============================================================ */
  var COMMANDS = {

    help: {
      hint: 'everything this terminal knows',
      run: function () {
        return [
          HEAD('COMMANDS'),
          RULE(),
          L('  whoami        the 30-second version'),
          L('  about         the longer story'),
          L('  experience    where I have worked and what changed'),
          L('  skills        what I actually do all day'),
          L('  approach      how I run a security program'),
          L('  wins          results, with numbers'),
          L('  culture       why awareness training usually fails'),
          L('  ir            what I do on the bad day'),
          L('  military      the Army years'),
          L('  education     degree + certifications'),
          L('  speaking      talks, workshops, storytelling'),
          L('  hire          for recruiters and hiring managers'),
          L('  contact       email and LinkedIn'),
          L('  resume        download the PDF'),
          L('  links         everywhere else I exist'),
          SP(),
          D('  ask <question>   ...or just type a question in plain English'),
          D('  clear · banner · help'),
          SP(),
          D('Shortcuts: [Tab] completes · [↑ ↓] history · [Esc] clears the line'),
          SP(),
          RUNS(['whoami', 'hire', 'wins'])
        ];
      }
    },

    whoami: {
      hint: 'the 30-second version',
      run: function () {
        return [
          HEAD('SAMUEL J. DAVIS, CISSP'),
          RULE(),
          L('Director of Information Security / Head of Cybersecurity'),
          L('Highlights for Children, Inc. · Columbus, Ohio'),
          SP(),
          L('I build enterprise security programs where none existed, and I explain'),
          L('them in language that gets a decision instead of a blank stare.'),
          SP(),
          L('Founded the company\'s first formal cybersecurity program. Cut PCI DSS'),
          L('scope by roughly half. Report cyber risk straight to the executive team.'),
          SP(),
          D('Before security: senior manager over network, cloud, and web operations.'),
          D('Before that: architect, programmer, and a U.S. Army Military Police Sergeant.'),
          SP(),
          RUNS(['about', 'experience', 'wins'])
        ];
      }
    },

    about: {
      hint: 'the longer story',
      alias: ['story', 'bio'],
      run: function () {
        return [
          HEAD('THE LONGER STORY'),
          RULE(),
          L('I did not start in security. I started by building the things security'),
          L('people later told me to fix: applications, architectures, websites,'),
          L('networks. That order matters. It is why my requirements tend to be'),
          L('implementable, and why engineers usually stop bracing when I show up.'),
          SP(),
          L('In 2019 I earned the CISSP on my own time, mostly because I was tired of'),
          L('having opinions I could not back. It changed the conversations I was'),
          L('allowed to be in. Those conversations eventually became a formal'),
          L('enterprise security program, and in 2023 I was asked to lead it.'),
          SP(),
          L('What I found interesting was not the technology. It was the translation.'),
          L('Almost every serious problem I have watched unfold was preceded by'),
          L('someone who understood the risk and someone who made the decision,'),
          L('and they were not the same person, and they were not speaking the'),
          L('same language.'),
          SP(),
          A('So I became the translator. That is the whole job.'),
          SP(),
          RUNS(['approach', 'culture', 'military'])
        ];
      }
    },

    experience: {
      hint: 'where I have worked',
      alias: ['work', 'jobs', 'history'],
      run: function () {
        return [
          HEAD('EXPERIENCE'),
          RULE(),
          A('Apr 2023 – Present · Director of Information Security / Head of Cybersecurity'),
          D('Highlights for Children, Inc. · Columbus, OH'),
          L('  · Established the enterprise Information Security function end to end:'),
          L('    strategy, governance, risk management, incident response.'),
          L('  · Senior-most authority on cyber risk; report posture and'),
          L('    recommendations directly to executive leadership.'),
          L('  · Led PCI DSS governance and auditor engagement. Scope down ~50%.'),
          L('  · Stood up third-party/SaaS risk assessment: 20+ vendors a year,'),
          L('    embedded into procurement decisions.'),
          L('  · Authored the multi-year "Resilience Blueprint" roadmap.'),
          SP(),
          A('Jun 2017 – Apr 2023 · Senior Manager, Network Services'),
          D('Highlights for Children, Inc. · Columbus, OH'),
          L('  · Led network, cloud (Azure), and web operations teams for'),
          L('    customer-facing and internal platforms.'),
          L('  · Owned uptime, resilience, and operational health.'),
          L('  · Grew engineers; set operational standards; prioritized the queue.'),
          L('  · Earned CISSP and used it to argue a security program into existence.'),
          SP(),
          A('Earlier career'),
          L('  Web Development Manager · Applications & Solutions Architect ·'),
          L('  Senior Applications Programmer · Programmer / Analyst.'),
          L('  Application development, systems architecture, physical security,'),
          L('  enterprise platforms, and vendor coordination.'),
          SP(),
          RUNS(['wins', 'skills', 'resume'])
        ];
      }
    },

    skills: {
      hint: 'what I do all day',
      alias: ['stack', 'tech'],
      run: function () {
        return [
          HEAD('PROFESSIONAL'),
          RULE(),
          L('Security program design · Cybersecurity strategy · Risk management'),
          L('Risk assessment & reporting · Security governance · Policy development'),
          L('Regulatory compliance · Incident response management · Vendor risk'),
          L('Security roadmapping · Business continuity planning'),
          L('Agile & Waterfall delivery · Executive risk and tradeoff briefing'),
          L('IT audit & controls · Third-party and MSSP oversight · Data governance'),
          SP(),
          HEAD('TECHNICAL'),
          RULE(),
          L('NIST CSF · Zero Trust · Identity management · MFA / SSO'),
          L('Privileged access · Cloud security · Microsoft Azure'),
          L('Microsoft data and analytics platforms · Security architecture'),
          L('Security monitoring · SIEM oversight · EDR / MDR'),
          L('Vulnerability management · Data protection · Disaster recovery'),
          SP(),
          D('The unlisted one: getting four departments to agree on a definition'),
          D('of "critical" before an auditor asks them separately.'),
          SP(),
          RUNS(['approach', 'experience'])
        ];
      }
    },

    approach: {
      hint: 'how I run a program',
      alias: ['philosophy', 'principles'],
      run: function () {
        return [
          HEAD('HOW I RUN A SECURITY PROGRAM'),
          RULE(),
          A('1. Govern first.'),
          L('   A framework is not a magic spell, it is a shared vocabulary and an'),
          L('   honest scorecard. We built on NIST CSF because it let a company with'),
          L('   no security history describe where it actually stood.'),
          SP(),
          A('2. Shrink the problem before defending it.'),
          L('   Half of our PCI scope did not need to exist. Segmented, retired, or'),
          L('   taken out of the flow. The cheapest control is the system you no'),
          L('   longer own.'),
          SP(),
          A('3. Trust is checked per request, not granted per badge.'),
          L('   Identity is the perimeter. MFA, SSO, and privileged access management'),
          L('   move a mid-sized company\'s risk further than any appliance, and'),
          L('   they do not require employees to become security experts.'),
          SP(),
          A('4. The vendor is part of your attack surface.'),
          L('   Security review sits in front of procurement, not behind it. "Not'),
          L('   like that" is free before signature and expensive after.'),
          SP(),
          A('5. If you do not know you have it, you cannot protect it.'),
          L('   Every framework opens with an inventory and almost every one of'),
          L('   them has stopped being true. Knowing what you own is a control,'),
          L('   not the paperwork you do before the real controls.'),
          SP(),
          A('6. Say the number.'),
          L('   Risk without a likelihood, an impact, and a date is just a mood.'),
          SP(),
          RUNS(['wins', 'culture', 'ir'])
        ];
      }
    },

    wins: {
      hint: 'results, with numbers',
      alias: ['impact', 'results', 'achievements'],
      run: function () {
        return [
          HEAD('RESULTS'),
          RULE(),
          A('  0 → 1'),
          L('    The first formal cybersecurity program in the company\'s'),
          L('    history: governance, operating model, and a multi-year'),
          L('    strategy aligned to NIST CSF.'),
          SP(),
          A('  ~50%'),
          L('    PCI DSS scope reduction over three years, led through'),
          L('    auditor engagement. Less to audit, less to patch, less'),
          L('    to explain. Permanently.'),
          SP(),
          A('  20+ / year'),
          L('    Third-party and SaaS security assessments, with the review'),
          L('    embedded into procurement so the answer arrives before the'),
          L('    contract does.'),
          SP(),
          A('  Board level'),
          L('    Cyber risk posture, roadmap, and investment recommendations'),
          L('    delivered directly to executive leadership, and understood.'),
          SP(),
          D('Numbers I like less but track anyway: how fast people report a'),
          D('mistake, and whether they still do it after the third time.'),
          SP(),
          RUNS(['approach', 'hire'])
        ];
      }
    },

    culture: {
      hint: 'why awareness training fails',
      alias: ['awareness', 'training'],
      run: function () {
        return [
          HEAD('ON SECURITY CULTURE'),
          RULE(),
          L('The most valuable sentence in this field is "I think I clicked'),
          L('something." It buys you hours. Sometimes it buys you the whole company.'),
          SP(),
          L('People only say it when they are certain they will not be punished for'),
          L('it. That certainty is built long before the incident, in how the last'),
          L('person who admitted a mistake was treated in front of everyone else.'),
          SP(),
          L('So I run awareness as storytelling, not homework:'),
          L('  · short, specific, and about something that actually happened'),
          L('  · aimed at a decision, not a definition'),
          L('  · occasionally funny, because people remember funny'),
          L('  · never a quiz someone can pass and forget by Thursday'),
          SP(),
          A('You cannot buy the four seconds in which someone decides to tell you.'),
          A('You can only have already earned them.'),
          SP(),
          RUNS(['speaking', 'ir'])
        ];
      }
    },

    ir: {
      hint: 'the bad day',
      alias: ['incident', 'response', 'breach'],
      run: function () {
        return [
          HEAD('THE ARC OF A BAD DAY'),
          RULE(),
          L('  DETECT   →  a signal, not a siren. Most start quietly.'),
          L('  TRIAGE   →  what is actually true? Scope before speed.'),
          L('  CONTAIN  →  stop the bleeding, preserve the evidence.'),
          L('  RECOVER  →  prove it is clean before you say it is clean.'),
          L('  REVIEW   →  blameless, and it produces fixes with owners and dates.'),
          SP(),
          L('Three things I insist on, settled while it is quiet:'),
          L('  1. Roles before rules. Who decides, who talks, who touches the'),
          L('     keyboard. Ambiguity is the real outage.'),
          L('  2. Communicate up early. Executives forgive bad news. They do not'),
          L('     forgive late news.'),
          L('  3. Rehearse it. The Army taught me that calm is manufactured in'),
          L('     advance. A plan nobody has practiced is a document, not a plan.'),
          SP(),
          RUNS(['military', 'approach'])
        ];
      }
    },

    military: {
      hint: 'the Army years',
      alias: ['army', 'veteran', 'service'],
      run: function () {
        return [
          HEAD('U.S. ARMY & ARMY RESERVE'),
          RULE(),
          L('Military Police Sergeant · Communications Specialist'),
          SP(),
          L('Two habits from those years never left:'),
          SP(),
          L('  Rehearsal beats improvisation. You do not rise to the occasion;'),
          L('  you fall to your level of training. That is the entire argument'),
          L('  for tabletop exercises, and it is why mine are not optional.'),
          SP(),
          L('  Someone has to own the decision. In a real incident the worst'),
          L('  outcome is not a wrong call. It is four capable people waiting'),
          L('  politely for someone else to make one.'),
          SP(),
          D('Also: I have written the incident report at 3 a.m. in both careers.'),
          D('The paperwork is remarkably similar. So is the coffee.'),
          SP(),
          RUNS(['about', 'ir'])
        ];
      }
    },

    education: {
      hint: 'degree + certifications',
      alias: ['edu', 'certs', 'certifications', 'cissp', 'degree'],
      run: function () {
        return [
          HEAD('EDUCATION'),
          RULE(),
          L('B.S., Computer Information Systems'),
          D('DeVry University · Columbus, OH'),
          SP(),
          HEAD('CERTIFICATION'),
          RULE(),
          L('CISSP: Certified Information Systems Security Professional'),
          D('(ISC)², 2019. Earned on my own initiative, mid-career, at night.'),
          RAW('<span class="t-dim">Verify: </span><a class="t-link" href="https://www.credly.com/badges/480a0618-11e8-4d96-857b-8e042e246642" target="_blank" rel="noopener">credly.com/badges/480a0618 ↗</a>'),
          SP(),
          HEAD('MEMBERSHIPS'),
          RULE(),
          L('(ISC)² Central Ohio Chapter · Security MBA'),
          D('Sep 2019 – Present'),
          L('Central Ohio ISSA · Member'),
          D('Jun 2015 – Present'),
          L('InfraGard · Member'),
          D('2015 – 2024'),
          SP(),
          RUNS(['skills', 'hire'])
        ];
      }
    },

    speaking: {
      hint: 'talks and workshops',
      alias: ['talks', 'storytelling', 'workshop'],
      run: function () {
        return [
          HEAD('SPEAKING & STORYTELLING'),
          RULE(),
          L('I like rooms where nobody works in security. Executives, editors,'),
          L('warehouse teams, parents, boards. Topics I can do without slides:'),
          SP(),
          L('  · "What actually happens during a breach," the unglamorous version'),
          L('  · Explaining cyber risk to a board without the fear-o-meter'),
          L('  · Why your vendors are your attack surface'),
          L('  · Building a security program when the budget is a rounding error'),
          L('  · Safe habits for families and small businesses, no jargon'),
          SP(),
          L('Format is flexible: 15-minute all-hands slot, lunch-and-learn,'),
          L('half-day tabletop exercise, or a panel where I promise to disagree'),
          L('with at least one person.'),
          SP(),
          RUNS(['contact', 'culture'])
        ];
      }
    },

    hire: {
      hint: 'for recruiters',
      alias: ['recruiter', 'hiring', 'job', 'opportunity', 'role'],
      run: function () {
        return [
          HEAD('FOR RECRUITERS & HIRING MANAGERS'),
          RULE(),
          A('What I am:'),
          L('  A hands-on security executive who has built a program from zero'),
          L('  inside a real company with real constraints, not a consultant'),
          L('  who left before the hard part.'),
          SP(),
          A('Titles that fit:'),
          L('  CISO · Deputy CISO · Director/Head of Information Security ·'),
          L('  VP Security · VP Information Security & Audit ·'),
          L('  Fractional or virtual CISO'),
          SP(),
          A('Where I do my best work:'),
          L('  Organizations with regulated or sensitive data and a security'),
          L('  function that is early, under-resourced, or needs rebuilding.'),
          L('  Bonus points if leadership is willing to hear the real number.'),
          SP(),
          A('Location:'),
          L('  Columbus, Ohio. Open to remote and hybrid;'),
          L('  happy to travel for the parts that need a room.'),
          SP(),
          A('The fastest path:'),
          RAW('  Send the role and the honest version of the challenge to <button type="button" class="t-run" data-cmd="contact">contact</button>'),
          L('  I answer everything that is not a cold sales pitch.'),
          SP(),
          RUNS(['resume', 'wins', 'contact'])
        ];
      }
    },

    contact: {
      hint: 'how to reach me',
      alias: ['email', 'reach', 'connect', 'phone', 'call'],
      run: function () {
        return [
          HEAD('CONTACT'),
          RULE(),
          RAW('<span class="t-dim">email     </span><a class="t-link" href="mailto:' + mail() + '">' + mail() + '</a>'),
          RAW('<span class="t-dim">linkedin  </span><a class="t-link" href="https://linkedin.com/in/samueljdavis/" target="_blank" rel="noopener">linkedin.com/in/samueljdavis ↗</a>'),
          RAW('<span class="t-dim">resume    </span><a class="t-link" href="assets/Samuel-J-Davis-Resume.pdf" download>Samuel-J-Davis-Resume.pdf ↓</a>'),
          RAW('<span class="t-dim">based in  </span><span class="t-key">Columbus, Ohio</span>'),
          SP(),
          D('Real inbox, real human, usually within a day. If it is urgent and'),
          D('security-related, say so in the subject line and I will move it up.'),
          SP(),
          RUNS(['hire', 'speaking'])
        ];
      }
    },

    links: {
      hint: 'everywhere else',
      alias: ['social', 'socials'],
      run: function () {
        return [
          HEAD('LINKS'),
          RULE(),
          RAW('<span class="t-dim">→ </span><a class="t-link" href="https://linkedin.com/in/samueljdavis/" target="_blank" rel="noopener">LinkedIn · /in/samueljdavis ↗</a>'),
          RAW('<span class="t-dim">→ </span><a class="t-link" href="https://www.credly.com/badges/480a0618-11e8-4d96-857b-8e042e246642" target="_blank" rel="noopener">Credly · CISSP verification ↗</a>'),
          RAW('<span class="t-dim">→ </span><a class="t-link" href="assets/Samuel-J-Davis-Resume.pdf" download>Résumé (PDF) ↓</a>'),
          SP(),
          D('No, there is no crypto newsletter.'),
          SP()
        ];
      }
    },

    resume: {
      hint: 'download the PDF',
      alias: ['cv', 'download'],
      run: function () {
        setTimeout(function () {
          var a = document.createElement('a');
          a.href = 'assets/Samuel-J-Davis-Resume.pdf';
          a.download = 'Samuel-J-Davis-Resume.pdf';
          document.body.appendChild(a); a.click(); a.remove();
        }, 700);
        return [
          D('fetching Samuel-J-Davis-Resume.pdf ...'),
          A('✓ download started. Check your downloads folder.'),
          RAW('<span class="t-dim">If your browser blocked it: </span><a class="t-link" href="assets/Samuel-J-Davis-Resume.pdf" download>click here ↓</a>'),
          SP()
        ];
      }
    },

    banner: {
      hint: 'redraw the header',
      run: function () { return banner().concat([SP()]); }
    },

    clear: {
      hint: 'wipe the screen',
      alias: ['cls'],
      run: function () { screenEl.innerHTML = ''; return []; }
    },

    /* ---- small talk & easter eggs ---- */
    ls: {
      hidden: true,
      run: function () {
        return [
          RAW('<span class="t-key">about/</span>  <span class="t-key">experience/</span>  <span class="t-key">skills/</span>  <span class="t-key">wins/</span>  <span class="t-key">culture/</span>'),
          RAW('<span class="t-key">ir/</span>     <span class="t-key">military/</span>    <span class="t-key">hire/</span>    <span class="t-key">contact/</span>  resume.pdf'),
          D('.plans  .coffee  .no-secrets-here'),
          SP()
        ];
      }
    },
    'cat .plans': { hidden: true, run: function () { return [L('Lead a security program somewhere the mission is worth defending.'), D('Also: finish the garage.'), SP()]; } },
    sudo: {
      hidden: true,
      run: function (args) {
        if (/hire/.test(args)) return [A('Permission granted. Excellent choice.'), RUNS(['contact']), SP()];
        return [L('samuel is not in the sudoers file. This incident has been reported.'), D('(It genuinely has. That is sort of my whole job.)'), SP()];
      }
    },
    coffee: { hidden: true, run: function () { return [L('☕ Black. Early. Non-negotiable.'), D('Error 418: I am a security director, not a teapot.'), SP()]; } },
    whoareyou: { hidden: true, alias: ['hello', 'hi', 'hey', 'yo'], run: function () { return [L('Hi, Sam Davis. Ask me anything, or type ' + 'help' + ' for the menu.'), RUNS(['whoami', 'hire']), SP()]; } },
    date: { hidden: true, run: function () { return [D(new Date().toString()), SP()]; } },
    exit: { hidden: true, alias: ['quit', 'logout'], run: function () { return [D('There is no exit. There is only the contact form.'), RUNS(['contact']), SP()]; } },
    rm: { hidden: true, run: function () { return [L('Nice try.'), D('Backups are tested quarterly. Ask me about the restore drill.'), SP()]; } },
    help_me: { hidden: true, alias: ['halp'], run: function () { return COMMANDS.help.run(); } }
  };

  /* ============================================================
     FREE-TEXT INTENTS: the "chat" half of the terminal
     ============================================================ */
  var INTENTS = [
    {
      k: ['leadership style', 'manage', 'management style', 'lead a team', 'team style', 'your style'],
      out: function () {
        return [
          HEAD('ON LEADING PEOPLE'),
          RULE(),
          L('Context over instructions. If an engineer knows why a thing matters,'),
          L('they will design a better version of it than the one I asked for.'),
          SP(),
          L('Three rules I hold myself to:'),
          L('  · Never surprise my team in a meeting, and never let a meeting'),
          L('    surprise them either.'),
          L('  · Take the blame publicly, hand out the credit the same way.'),
          L('  · Protect the queue. An overloaded team does not fail loudly,'),
          L('    it fails quietly and then all at once.'),
          SP()
        ];
      }
    },
    {
      k: ['budget', 'no money', 'cheap', 'resource', 'small team', 'underfunded', 'startup'],
      out: function () {
        return [
          HEAD('SECURITY ON A SMALL BUDGET'),
          RULE(),
          L('Almost every program I have built ran on less than it deserved.'),
          L('The order that works:'),
          SP(),
          L('  1. Know what you have. An honest asset and data inventory is free'),
          L('     and it embarrasses everyone exactly once.'),
          L('  2. Identity first. MFA everywhere, SSO where you can, and take'),
          L('     admin rights away from accounts nobody defends in writing.'),
          L('  3. Delete scope. Retire, segment, consolidate. Costs nothing to'),
          L('     defend a system you no longer run.'),
          L('  4. Prove your backups. Untested backups are a rumor.'),
          L('  5. Then buy tools, and only ones somebody has time to watch.'),
          SP(),
          A('A tool with no owner is just a subscription with a dashboard.'),
          SP()
        ];
      }
    },
    {
      k: ['board', 'executive', 'ceo', 'cfo', 'leadership team', 'present', 'communicate risk', 'c-suite'],
      out: function () {
        return [
          HEAD('TALKING TO EXECUTIVES ABOUT RISK'),
          RULE(),
          L('They are not confused, they are busy. Give them a decision, not'),
          L('a weather report.'),
          SP(),
          L('  · Lead with the business consequence, not the vulnerability.'),
          L('  · One page, three options, a recommendation, and a cost.'),
          L('  · Say what happens if we do nothing, plainly, without theater.'),
          L('  · Never use fear as leverage. It works once and costs you'),
          L('    credibility for the rest of your tenure.'),
          SP(),
          L('If I cannot state a risk in one breath, I do not understand it yet,'),
          L('and I go back and do more work before I take up their time.'),
          SP()
        ];
      }
    },
    {
      k: ['ransomware', 'attack', 'hacked', 'breach happen', 'threat'],
      out: function () {
        return [
          HEAD('ON RANSOMWARE'),
          RULE(),
          L('It is rarely a genius. It is usually an unpatched edge device, a'),
          L('reused password, or a vendor connection nobody re-reviewed since'),
          L('2019.'),
          SP(),
          L('What actually decides the outcome:'),
          L('  · Can you detect it before encryption? (identity + endpoint)'),
          L('  · Can you contain fast? (segmentation, rehearsed authority)'),
          L('  · Can you restore without paying? (tested, offline backups)'),
          L('  · Can you talk about it? (comms plan, counsel, insurer, regulators)'),
          SP(),
          A('The company that recovers well is the one that practiced badly'),
          A('in a conference room six months earlier.'),
          SP()
        ];
      }
    },
    {
      k: ['ai ', ' ai', 'artificial intelligence', 'llm', 'chatgpt', 'copilot', 'machine learning'],
      out: function () {
        return [
          HEAD('ON AI'),
          RULE(),
          L('Two honest halves.'),
          SP(),
          L('Defensively it is genuinely useful for triage and for summarizing'),
          L('the mountain of alerts nobody reads. It is not a control, and it'),
          L('does not get to be an owner.'),
          SP(),
          L('The bigger near-term risk is not sentient malware. It is data:'),
          L('employees pasting confidential material into tools nobody assessed,'),
          L('and vendors quietly turning on a model that trains on your content.'),
          L('That is a third-party risk problem wearing a new hat, and I already'),
          L('have a process for that.'),
          SP(),
          D('Also, phishing got grammatically correct. Tell your users the old'),
          D('"look for typos" advice is retired.'),
          SP()
        ];
      }
    },
    {
      k: ['phishing', 'click', 'email scam', 'social engineering'],
      out: function () {
        return [
          HEAD('ON PHISHING'),
          RULE(),
          L('Stop teaching people to spot typos and start teaching them to spot'),
          L('pressure. Nearly every successful lure has the same three fingerprints:'),
          SP(),
          L('  urgency  ·  authority  ·  secrecy'),
          SP(),
          L('"Right now", "this is the CFO", "do not discuss this with anyone."'),
          L('If a message has all three, it is a scam until proven otherwise,'),
          L('and the proof is a phone call to a number you already had.'),
          SP(),
          L('And build the reporting button into the place people already are.'),
          L('Friction is why they stay quiet.'),
          SP()
        ];
      }
    },
    {
      k: ['advice', 'regular people', 'family', 'personal', 'protect myself', 'at home', 'parents'],
      out: function () {
        return [
          HEAD('FOR NORMAL HUMANS (NOT COMPANIES)'),
          RULE(),
          L('  1. A password manager. One good password protecting the rest.'),
          L('  2. MFA on email first. It is the skeleton key to everything else.'),
          L('  3. Freeze your credit. It is free and takes about ten minutes.'),
          L('  4. Update your phone. Most attacks are old bugs, not new ones.'),
          L('  5. Agree on a family code word for "is this really you?" calls.'),
          SP(),
          D('That is it. Anyone selling you more before you have done those five'),
          D('is selling, not helping.'),
          SP()
        ];
      }
    },
    {
      k: ['why cyber', 'get into security', 'why security', 'how did you start', 'career change', 'break into'],
      out: function () {
        return [
          HEAD('HOW I GOT HERE'),
          RULE(),
          L('Sideways, and later than most.'),
          SP(),
          L('I spent years building: code, architecture, websites, networks. Then'),
          L('I ran operations, which is where you learn that reliability and'),
          L('security are the same conversation held by different departments.'),
          SP(),
          L('I earned the CISSP at night because I was tired of having opinions'),
          L('I could not defend. It bought me a seat in different rooms, and in'),
          L('those rooms I kept noticing the same gap: the people who understood'),
          L('the risk were not the people making the call.'),
          SP(),
          A('Closing that gap turned out to be a whole career.'),
          SP(),
          D('If you are trying to get in: the builders make the best defenders.'),
          D('Do not throw away the years you spent shipping things.'),
          SP()
        ];
      }
    },
    {
      k: ['remote', 'relocate', 'onsite', 'hybrid', 'where do you live', 'located', 'location'],
      out: function () {
        return [
          L('Based in Columbus, Ohio.'),
          SP(),
          L('Open to remote and hybrid roles, and happy to travel for the parts'),
          L('that genuinely need a room: tabletops, board sessions, and the first'),
          L('few weeks of anything new.'),
          SP(),
          RUNS(['hire', 'contact'])
        ];
      }
    },
    {
      k: ['salary', 'compensation', 'rate', 'how much', 'pay'],
      out: function () {
        return [
          L('Happy to talk numbers, just not before I understand the scope.'),
          SP(),
          L('Tell me the size of the environment, what the security function looks'),
          L('like today, who I would report to, and what the first year has to'),
          L('deliver. I will give you a straight answer, quickly.'),
          SP(),
          RUNS(['contact'])
        ];
      }
    },
    {
      k: ['weakness', 'hardest', 'failure', 'mistake', 'wrong', 'struggle'],
      out: function () {
        return [
          HEAD('THE HONEST ANSWER'),
          RULE(),
          L('Early on I confused being right with being effective. I would walk'),
          L('into a room with an airtight technical case and walk out having'),
          L('changed nothing, and I would blame the room.'),
          SP(),
          L('What fixed it was learning to write the one-pager: the risk, the'),
          L('business consequence, three options, a recommendation, a cost. Same'),
          L('facts. Completely different outcome.'),
          SP(),
          L('I still have to watch it. When something is urgent my instinct is'),
          L('to go faster, and going faster is usually how you lose the room.'),
          SP()
        ];
      }
    },
    {
      k: ['first 90', '90 days', 'first year', 'start a program', 'from scratch', 'where would you start', 'new job'],
      out: function () {
        return [
          HEAD('FIRST 90 DAYS'),
          RULE(),
          L('  Days 1–30 · Listen and inventory. What do we have, what data'),
          L('  matters, who owns it, what has already gone wrong, and what does'),
          L('  leadership believe is true? (Some of it will not be.)'),
          SP(),
          L('  Days 31–60 · Baseline against a framework and write it down'),
          L('  honestly. Fix the free things immediately: MFA gaps, orphaned'),
          L('  admin accounts, backups nobody has restored.'),
          SP(),
          L('  Days 61–90 · Bring leadership one page: where we are, the three'),
          L('  risks that keep me up, what I recommend, what it costs, and what'),
          L('  I need decided. Then publish the roadmap so it is a commitment'),
          L('  and not a wish.'),
          SP(),
          D('Nothing here requires a purchase order. That is deliberate.'),
          SP()
        ];
      }
    },
    {
      k: ['compliance', 'audit', 'pci', 'auditor', 'regulat'],
      out: function () {
        return [
          HEAD('ON COMPLIANCE'),
          RULE(),
          L('Good security practice is the goal. Compliance is the outcome.'),
          L('Run it backwards, chasing the checklist and hoping security'),
          L('follows, and you get a binder that passes and an environment'),
          L('that does not.'),
          SP(),
          L('Compliance is a floor, not a ceiling. Passing is the least a'),
          L('regulator will accept, not the standard worth building to.'),
          SP(),
          L('Leading PCI DSS governance, the win was not passing the audit. It'),
          L('was cutting scope by about half over three years, so that passing'),
          L('got permanently cheaper and the environment got permanently smaller.'),
          SP(),
          L('Your auditor is a partner, working the same problem you are. Show'),
          L('your work. The relationship is worth more than the certificate.'),
          SP()
        ];
      }
    },
    {
      k: ['hobby', 'fun', 'free time', 'outside work', 'personal life', 'truck'],
      out: function () {
        return [
          L('Ohio life. Family, a garage that always has one more project in it,'),
          L('and a stubborn affection for anything I can take apart and put back'),
          L('together.'),
          SP(),
          D('Yes, the email address has a truck in it. It is a long story and'),
          D('I am not sorry.'),
          SP()
        ];
      }
    },
    {
      k: ['zero trust'],
      out: function () {
        return [
          HEAD('ON ZERO TRUST'),
          RULE(),
          L('It is not a product, and anyone selling you one is selling you a'),
          L('component. It is a design assumption: the network does not vouch'),
          L('for anybody.'),
          SP(),
          L('Every request gets evaluated on identity, device health, privilege,'),
          L('context, and the sensitivity of what is being reached, and the'),
          L('answer is re-checked rather than remembered.'),
          SP(),
          L('For most mid-sized companies the practical version is: strong'),
          L('identity, MFA everywhere, least privilege that is actually enforced,'),
          L('and segmentation where the crown jewels live. Start there.'),
          SP()
        ];
      }
    },
    {
      k: ['nist', 'framework', 'csf', 'iso 27001', 'cis'],
      out: function () {
        return [
          L('We built on the NIST Cybersecurity Framework.'),
          SP(),
          L('Not because it is magic. Because it gives an organization with no'),
          L('security history a shared vocabulary and an honest scorecard. Govern,'),
          L('Identify, Protect, Detect, Respond, Recover. It maps cleanly to how'),
          L('a business already thinks about accountability.'),
          SP(),
          L('The function everyone skips is Govern, and it is the one that makes'),
          L('the other five survive a reorganization.'),
          SP(),
          RUNS(['approach'])
        ];
      }
    },
    {
      k: ['thank', 'thanks', 'appreciate', 'nice site', 'cool site', 'great site', 'love this'],
      out: function () { return [A('Thank you, genuinely. Built by hand, which is either charming or a red flag.'), RUNS(['contact']), SP()]; }
    },
    {
      k: ['are you a bot', 'is this real', 'chatgpt wrote', 'ai wrote', 'are you human'],
      out: function () {
        return [
          L('Fair question. This terminal is hand-written, not a language model.'),
          L('Every answer here is something I actually wrote and would say out loud.'),
          SP(),
          L('If you want the unscripted version, that is what the email is for.'),
          SP(),
          RUNS(['contact'])
        ];
      }
    }
  ];

  /* ============================================================
     RENDERING
     ============================================================ */
  var token = 0;
  var busy = false;

  function append(item) {
    var el = document.createElement('div');
    if (item.spacer) {
      el.className = 't-spacer';
    } else if (item.html) {
      el.className = 't-line t-out';
      el.innerHTML = item.html;
    } else {
      el.className = 't-line ' + item.cls;
      el.textContent = item.text;
    }
    screenEl.appendChild(el);
    return el;
  }

  function scrollDown() { screenEl.scrollTop = screenEl.scrollHeight; }

  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  async function emit(items, speed) {
    var my = ++token;
    busy = true;
    var delay = reduceMotion ? 0 : (speed == null ? 22 : speed);
    for (var i = 0; i < items.length; i++) {
      if (my !== token) return;
      append(items[i]);
      scrollDown();
      if (delay) await sleep(items[i].spacer ? 4 : delay);
    }
    busy = false;
    scrollDown();
  }

  function echo(cmd) {
    var el = document.createElement('div');
    el.className = 't-line t-echo';
    el.innerHTML = '<span class="t-ps1">guest@samueljdavis<b>:~$</b></span> ' + esc(cmd);
    screenEl.appendChild(el);
    scrollDown();
  }

  /* Built rather than typed, so the box can never drift out of alignment. */
  function banner() {
    var w = 48;
    function bar(l, r) { return l + new Array(w + 1).join('═') + r; }
    function row(s) {
      var pad = w - s.length;
      var left = Math.floor(pad / 2);
      return '║' + new Array(left + 1).join(' ') + s + new Array(pad - left + 1).join(' ') + '║';
    }
    return [
      RAW('<pre class="t-banner">' + [
        bar('╔', '╗'),
        row('S A M U E L   J .   D A V I S  ·  C I S S P'),
        row('security leadership, in plain english'),
        bar('╚', '╝')
      ].join('\n') + '</pre>')
    ];
  }

  /* ============================================================
     COMMAND RESOLUTION
     ============================================================ */
  var LOOKUP = {};
  Object.keys(COMMANDS).forEach(function (name) {
    LOOKUP[name] = name;
    (COMMANDS[name].alias || []).forEach(function (a) { LOOKUP[a] = name; });
  });

  var COMPLETIONS = Object.keys(COMMANDS).filter(function (n) { return !COMMANDS[n].hidden; });

  function normalize(s) {
    return s.toLowerCase().trim().replace(/[?!.,;:]+$/g, '').replace(/\s+/g, ' ');
  }

  function matchIntent(raw) {
    var s = ' ' + normalize(raw) + ' ';
    var best = null, bestScore = 0;
    for (var i = 0; i < INTENTS.length; i++) {
      var score = 0;
      for (var j = 0; j < INTENTS[i].k.length; j++) {
        var kw = INTENTS[i].k[j];
        if (s.indexOf(kw) !== -1) score += kw.length;
      }
      if (score > bestScore) { bestScore = score; best = INTENTS[i]; }
    }
    return bestScore >= 3 ? best : null;
  }

  function unknown(raw) {
    return [
      L('Not a command I know, but I probably have an opinion anyway.'),
      SP(),
      D('Try asking it as a question ("how do you talk to a board?"), or pick one:'),
      RUNS(['help', 'whoami', 'hire', 'approach', 'contact']),
      SP()
    ];
  }

  function run(raw) {
    var input = raw.trim();
    if (!input) return;

    echo(input);
    pushHistory(input);

    var norm = normalize(input);
    var head = norm.split(' ')[0];
    var rest = norm.slice(head.length).trim();

    /* explicit "ask ..." prefix */
    if (head === 'ask' && rest) {
      var it = matchIntent(rest);
      return emit(it ? it.out() : unknown(rest));
    }

    /* exact command (single word, or a known two-word key) */
    var direct = LOOKUP[norm] || (rest === '' ? LOOKUP[head] : null);
    if (!direct && LOOKUP[head] && (head === 'sudo' || head === 'cat' || head === 'rm' || head === 'echo')) direct = LOOKUP[head];

    if (direct) {
      var cmd = COMMANDS[direct];
      var out = cmd.run(rest);
      return emit(out, direct === 'help' ? 14 : 22);
    }

    /* otherwise: treat it as conversation */
    var intent = matchIntent(norm);
    if (intent) return emit(intent.out());

    /* last resort: does the sentence mention a command topic? */
    var mentioned = Object.keys(LOOKUP).filter(function (k) {
      return k.length > 3 && norm.indexOf(k) !== -1;
    });
    if (mentioned.length) return emit(COMMANDS[LOOKUP[mentioned[0]]].run(''));

    return emit(unknown(norm));
  }

  /* ============================================================
     INPUT: history, tab-completion, chips
     ============================================================ */
  var history = [];
  var hIndex = -1;

  function pushHistory(v) {
    if (history[history.length - 1] !== v) history.push(v);
    hIndex = history.length;
  }

  formEl.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = inputEl.value;
    inputEl.value = '';
    run(v);
  });

  inputEl.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (hIndex > 0) { hIndex--; inputEl.value = history[hIndex]; moveCaretEnd(); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (hIndex < history.length - 1) { hIndex++; inputEl.value = history[hIndex]; moveCaretEnd(); }
      else { hIndex = history.length; inputEl.value = ''; }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      var stub = inputEl.value.toLowerCase().trim();
      if (!stub) return;
      var hit = COMPLETIONS.filter(function (c) { return c.indexOf(stub) === 0; });
      if (hit.length === 1) { inputEl.value = hit[0]; moveCaretEnd(); }
      else if (hit.length > 1) {
        echo(inputEl.value);
        emit([RAW(hit.map(function (h) { return '<span class="t-key">' + h + '</span>'; }).join('  ')), SP()], 0);
      }
    } else if (e.key === 'Escape') {
      inputEl.value = '';
    } else if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      screenEl.innerHTML = '';
    }
  });

  function moveCaretEnd() {
    var v = inputEl.value;
    inputEl.value = '';
    inputEl.value = v;
  }

  /* click-to-run: chips, toolbar buttons, inline suggestions */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cmd]');
    if (!btn) return;
    e.preventDefault();
    var cmd = btn.getAttribute('data-cmd');
    if (termEl && !isInViewport(termEl)) termEl.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    inputEl.focus({ preventScroll: true });
    run(cmd);
  });

  function isInViewport(el) {
    var r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.8 && r.bottom > 0;
  }

  /* clicking anywhere in the screen focuses the prompt (unless selecting text) */
  screenEl.addEventListener('click', function (e) {
    if (e.target.closest('a,button')) return;
    if (String(window.getSelection())) return;
    inputEl.focus({ preventScroll: true });
  });

  /* ============================================================
     BOOT
     ============================================================ */
  async function boot() {
    var steps = [
      D('samueljdavis.com · session opened ' + new Date().toLocaleDateString()),
      D('authenticating guest ......................... ok'),
      D('loading career history ....................... ok'),
      D('loading opinions (strongly held) ............. ok'),
      D('sanitizing input, obviously .................. ok'),
      SP()
    ];
    await emit(steps, reduceMotion ? 0 : 130);
    await emit(banner(), 0);
    await emit([
      SP(),
      L('Hi, I\'m Sam. Director of Information Security, CISSP, and a')  ,
      L('recovering builder who now spends his days translating risk.'),
      SP(),
      RAW('Type <span class="t-key">help</span> for the menu, or just ask me a question the way you would in person.'),
      D('Recruiters: type "hire". Everyone else: try "story".'),
      SP()
    ], reduceMotion ? 0 : 34);
  }

  /* only boot when the terminal is actually on screen, so the animation is seen */
  var booted = false;
  function startBoot() { if (booted) return; booted = true; boot(); }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { startBoot(); io.disconnect(); } });
    }, { threshold: 0.25 });
    io.observe(termEl);
    setTimeout(startBoot, 6000); /* fallback for anyone who never scrolls */
  } else {
    startBoot();
  }

  /* expose for the rest of the site (e.g. deep links like #terminal?cmd=hire) */
  window.SJDTerminal = { run: run, focus: function () { inputEl.focus(); } };
})();
