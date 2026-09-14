window.CASES = [
  {
    id: 'admin-hire', client: 'LFSA Admin Hire', type: 'Working solution demo · sample data',
    title: 'The email says complete. The files do not.',
    problem: 'A document coordinator must verify what actually arrived instead of trusting an email that says everything was sent.',
    build: 'I built a Slack-operated assistant that checks document dates and coverage, maintains a tracker, and prepares only necessary follow-up drafts for human review.',
    output: 'In the completed demo, the assistant catches Cedar’s half-month statement and missing sales export, prepares one reviewable draft, then withdraws it when the complete files arrive. The original first pass stays preserved, and no client message is sent.',
    result: 'Specific gaps found. Obsolete follow-up withdrawn. Original evidence preserved.',
    media: [
      {src:'assets/admin-first-review.png',alt:'Admin Hire saved first-review dashboard with Cedar selected and two document gaps visible.',caption:'Saved first review · Cedar blocked by two verified gaps'},
      {src:'assets/admin-follow-up.png',alt:'Admin Hire saved follow-up view showing one local draft awaiting human review.',caption:'One targeted local draft · awaiting human review · never sent'},
      {src:'assets/admin-updated-review.png',alt:'Admin Hire updated saved review with all three sample clients ready and the Cedar draft withdrawn.',caption:'Updated review · all three ready · stale draft withdrawn'}
    ],
    links: [{href:'record.html',label:'Open the completed demo',primary:true}]
  },
  {
    id: 'win10min', client: 'Win10Min', type: 'Own product · iOS app',
    title: 'Turn a big task into ten focused minutes.',
    problem: 'People can know what they need to do and still struggle to begin or stay away from distracting apps.',
    build: 'I built an iPhone app combining short focus sessions, app blocking and AI-assisted task breakdown. Completing sessions advances a Roman-themed city and map.',
    output: 'The current app screens show ten-minute focus, AI task breakdown, app-blocking schedules, Roman city progression and activity stats. This is my own working iOS product, shown with real device state.',
    result: 'A working iOS product combining focus, task breakdown and visible progression.',
    media: [
      {src:'assets/win10-current-focus.png',alt:'Current Win10Min Focus screen with the ten-minute timer and app-blocking actions.',caption:'Current app screen · Focus'},
      {src:'assets/win10-current-empire.png',alt:'Current Win10Min Empire screen showing the Roman territory map and progression.',caption:'Current app screen · Empire'},
      {src:'assets/win10-current-tasks.png',alt:'Current Win10Min Saved Tasks screen showing scheduled app-blocking routines.',caption:'Current app screen · Tasks and Blocks'},
      {src:'assets/win10-current-stats.png',alt:'Current Win10Min Imperium Stats screen showing success rate and an activity heatmap.',caption:'Current app screen · Imperium Stats'}
    ],
    links: [
      {href:'https://win10minutes.app/',label:'Visit Win10Min',primary:true},
      {href:'https://apps.apple.com/br/app/win-10-minutes-focus-timer/id6751601664',label:'View on the App Store'}
    ]
  },
  {
    id: 'ainvictus-receptionist', client: 'AInvictus AI Receptionist', type: 'Own product · verified end to end',
    title: 'Answer the call. Put the job in the right system.',
    problem: 'Home-service businesses can lose after-hours and overflow calls when nobody is available to qualify the request or create the booking.',
    build: 'I built a multi-tenant voice receptionist that answers and qualifies inbound calls, transfers when needed, and books through one selected scheduling connector per client: Google Calendar or Jobber.',
    output: 'A real phone test completed the Jobber path: availability checked, request created, dashboard record stored and internal notifications completed. The workflow is verified end to end and ready for scoped client pilots.',
    result: 'Verified voice-to-Jobber path with reviewable records and human fallback.',
    media: [
      {src:'assets/ainvictus-receptionist-flow.svg',alt:'Diagram of the AInvictus AI Receptionist from inbound call through qualification, booking or transfer, and operator review.',caption:'Verified product flow diagram · no customer data'},
      {src:'assets/ainvictus-receptionist-proof.svg',alt:'Diagram of the verified AInvictus phone-to-Jobber test path and its recorded outcome.',caption:'Verified phone-to-Jobber test'},
      {src:'assets/ainvictus-receptionist-operator.svg',alt:'Interface map of the call, outcome, connector and human-handoff records available to an AInvictus operator.',caption:'Reviewable operator handoff · privacy-safe map'}
    ],
    links: [{href:'https://ainvictus.org/',label:'Visit AInvictus',primary:true}]
  },
  {
    id: 'ainvictus-callback', client: 'AInvictus 60-Second Callback', type: 'Own product · pilot-ready workflow',
    title: 'Call while the submitted lead still remembers the form.',
    problem: 'Shared insurance leads lose value when an agency waits too long to respond after the prospect submits a form.',
    build: 'I built a consent-gated outbound route with number validation, suppression checks, calling hours, 30-minute deduplication, attempt logging, dynamic lead context, warm transfer and a booking fallback.',
    output: 'The guarded workflow is built for controlled rollout. The pilot plan confirms carrier delivery, pickup, transfer behavior, CRM writeback and called-party timezone handling before broader use.',
    result: 'A consent-gated callback workflow with a clear controlled rollout plan.',
    media: [
      {src:'assets/ainvictus-callback-flow.svg',alt:'Diagram of the AInvictus callback flow from a consented lead through safety gates, call attempt and outcome logging.',caption:'Pilot-ready callback workflow · controlled rollout'},
      {src:'assets/ainvictus-callback-safety.svg',alt:'Diagram of five implemented guards that refuse unsafe AInvictus callback requests.',caption:'Implemented safety gates · human oversight retained'},
      {src:'assets/ainvictus-callback-readiness.svg',alt:'Pilot checklist showing built controls and the behaviors confirmed during controlled rollout.',caption:'Pilot checklist · controlled rollout checks'}
    ], links: []
  },
  {
    id: 'ainvictus-deal-desk', client: 'AInvictus Deal Desk', type: 'Own product · built and tested',
    title: 'Control who sees the deal, what they ask, and what they offer.',
    problem: 'M&A advisors need buyer screening, NDA gating, controlled documents, question handling and offer comparison without losing information control.',
    build: 'I built a gated buyer journey from screening and NDA acceptance into a tokenized deal room, with controlled documents, cited question answering, broker escalation, structured offer versions and comparison.',
    output: 'The product is built and verified end to end. These portfolio views use fixed sample data so buyer identities, deal documents and offers remain confidential.',
    result: 'A gated buyer journey with traceable access, answers and offer history.',
    media: [
      {src:'assets/ainvictus-deal-access.svg',alt:'Diagram of AInvictus Deal Desk buyer screening, NDA gating, tokenized access and access history.',caption:'Built product flow · controlled buyer access'},
      {src:'assets/ainvictus-deal-room.svg',alt:'Diagram of the AInvictus Deal Desk review room with controlled documents, cited answers and broker escalation.',caption:'Controlled deal room · sample data'},
      {src:'assets/ainvictus-deal-offers.svg',alt:'Diagram of AInvictus Deal Desk structured offers, version history, status and broker comparison.',caption:'Structured offer history · sample data'}
    ], links: []
  },
  {
    id: 'clinic', client: 'Medical clinic', type: 'Historical client work',
    title: 'From social messages to a usable lead queue.',
    problem: 'The clinic needed a consistent way to handle Instagram and Facebook inquiries without losing the context of a conversation.',
    build: 'I built a messaging assistant connected to its CRM, knowledge base and lead queue. It identifies language, groups messages sent together, keeps context, and routes cases that need a person.',
    output: 'The sanitized maps show intake, CRM updates and routing boundaries. Routine questions use approved knowledge; clinical, urgent or uncertain questions move to a person. The walkthrough frame shows the implemented workflow without patient records.',
    result: 'Connected inquiry handling, lead records and human handoff.',
    media: [
      {src:'assets/clinic-intake-map.svg',alt:'Sanitized map of clinic social messages grouped with context before entering a reviewable lead queue.',caption:'Sanitized workflow map · intake and context preservation'},
      {src:'assets/clinic-routing-map.svg',alt:'Sanitized map separating routine clinic inquiries from clinical or urgent questions requiring human handoff.',caption:'Sanitized workflow map · approved routing boundaries'},
      {src:'assets/clinic-45.png',alt:'Secondary walkthrough frame showing the implemented clinic workflow without patient conversations.',caption:'Secondary walkthrough still · no patient records'}
    ],
    links: [{href:'https://www.tella.tv/video/vid_cmqf249xu00dd04jr7co3ctif/view',label:'Watch the 1:29 walkthrough',primary:true}]
  },
  {
    id: 'insurance', client: 'Insurance agency', type: 'Historical client work',
    title: 'Separate call roles. Connected follow-up.',
    problem: 'The agency needed different handling for incoming inquiries, warm leads and outbound conversations, with useful records after each call.',
    build: 'I built specialized voice-agent workflows rather than one script for every situation. The system connects lead checks, calling rules, CRM logging and post-call processing.',
    output: 'The existing walkthrough shows distinct pipelines and how outcomes feed follow-up. The build includes business-hour and do-not-call checks before calling, then records appointment or transfer outcomes afterward. These frames expose workflow logic, not customer records or call recordings.',
    result: 'Role-specific call workflows with post-call records and human handoff.',
    media: [
      {src:'assets/insurance-10.png',alt:'Privacy-reviewed insurance workflow frame showing the separate voice automation routes.',caption:'Actual workflow · role-specific routes · no customer records'},
      {src:'assets/insurance-40.png',alt:'Privacy-reviewed insurance workflow frame showing connected call handling logic.',caption:'Actual workflow · call handling logic · no recordings'},
      {src:'assets/insurance-90.png',alt:'Privacy-reviewed insurance workflow frame showing post-call processing components.',caption:'Actual workflow · post-call processing · no prospect data'}
    ],
    links: [{href:'https://www.tella.tv/video/vid_cmqf1zk15014e04jpas7r1cng/view',label:'Watch the 1:52 walkthrough',primary:true}]
  },
  {
    id: 'b2b', client: 'B2B Languages', type: 'Historical client work',
    title: 'Placement tasks that include writing and speech.',
    problem: 'B2B Languages needed placement tests that captured how students write and speak, not only which multiple-choice answers they select.',
    build: 'I built a task-based assessment with two written responses and two recorded-audio answers, supported by separate scoring and reporting workflows. Students can listen, record and review before continuing.',
    output: 'The first visual recreates the actual Slack result format with identity and contact fields removed. It shows separate scoring, two transcribed audio responses and a result prepared for teacher review. The remaining visuals are original blank writing and audio tasks.',
    result: 'Written and spoken tasks converted into a reviewable placement report in Slack.',
    media: [
      {src:'assets/b2b-slack-audio-result.svg',alt:'Sanitized reconstruction of the B2B Languages Slack result showing scoring, two transcribed audio responses, an assessment summary and teacher review.',caption:'Actual workflow format · sanitized reconstruction · Slack delivery'},
      {src:'assets/b2b-writing.png',alt:'Original blank B2B Languages writing-task screen with no student response.',caption:'Original interface · writing task · blank response'},
      {src:'assets/b2b-audio-one.png',alt:'Original blank B2B Languages audio-task screen for a workday response, with no recording.',caption:'Original interface · audio task one · no recording'},
      {src:'assets/b2b-audio-two.png',alt:'Original blank B2B Languages audio-task screen for a travel response, with no recording.',caption:'Original interface · audio task two · no recording'}
    ], links: []
  },
  {
    id: 'lead-scoring', client: 'AI Automation to Qualify Leads', type: 'Upwork portfolio project',
    title: 'Know who to call and what they care about.',
    problem: 'A business collecting Facebook leads needed to identify who deserved a sales conversation and which problems its marketing should address.',
    build: 'I built a Make workflow that processes form responses in Airtable, uses ChatGPT to score leads against defined criteria, and summarizes their stated concerns.',
    output: 'Airtable views separate sales priority from pain-point summaries for content planning, while Slack alerts surface hot leads. The original Upwork project image shows the workflow without exposing business records.',
    result: 'Prioritized leads, sales alerts and pain-point summaries for content.',
    media: [
      {src:'assets/lead-qualifying-overview.png',alt:'Original Upwork project image showing a Make workflow with ChatGPT and Airtable modules.',caption:'Original Upwork project image · complete workflow overview'}
    ], links: [{href:'https://www.upwork.com/freelancers/~01e126644a693dc488?p=1779998279571210240',label:'View the Upwork project'}]
  },
  {
    id: 'mestre', client: 'Mestre Gráfica', type: 'Quote intake · WhatsApp agent prototype',
    title: 'A clearer request before someone prices it.',
    problem: 'Print quotes need product, quantity, specifications, deadline and artwork context, not only “How much?”',
    build: 'I connected the website quote form to a workflow that organizes requests and notifies the team, then built a WhatsApp agent prototype to gather missing details and prepare a staff handoff.',
    output: 'The first diagram shows the current quote path. The second shows the WhatsApp prototype and its handoff boundaries. Staff retain pricing, exception and delivery decisions, and the final image adds real print context without customer data.',
    result: 'Structured quote intake now, with a WhatsApp prototype for conversational intake.',
    media: [
      {src:'assets/mestre-quote-flow.svg',alt:'Diagram of Mestre Grafica quote intake from website or WhatsApp through staff review.',caption:'Current workflow diagram · staff retain pricing control'},
      {src:'assets/mestre-whatsapp-wip.svg',alt:'Diagram of the Mestre Grafica WhatsApp quote-intake agent prototype and its human handoff.',caption:'WhatsApp prototype · human pricing and commitments'},
      {src:'assets/mestre-print-context.webp',alt:'Mestre Grafica branded circular sticker mockup used as print-product context.',caption:'Existing print-product image · contextual, not an automation screen'}
    ], links: []
  }
];

const displayOrder = [
  'admin-hire',
  'win10min',
  'clinic',
  'insurance',
  'b2b',
  'ainvictus-receptionist',
  'ainvictus-callback',
  'ainvictus-deal-desk',
  'lead-scoring',
  'mestre'
];

window.CASES.sort((a,b)=>displayOrder.indexOf(a.id)-displayOrder.indexOf(b.id));
