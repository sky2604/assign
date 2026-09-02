/**
 * Structured content for the FlytBase case study experience.
 * Every claim below is traceable to FlytBase_Problem3_Thinking_Document_v2_1.md.
 * Full original text lives in fullDocument.ts for the detailed document reader.
 */

export const meta = {
  candidate: 'Sky Sinha',
  role: 'Product Marketing, FlytBase',
  dateLabel: 'September 2026',
  docTitle: 'Problem 3: Why Sales Can’t Explain the Difference',
}

export const nav = [
  { id: 'challenge', label: 'Challenge' },
  { id: 'thinking', label: 'Thinking' },
  { id: 'insight', label: 'Insight' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'execution', label: 'Execution' },
]

export const hero = {
  eyebrow: 'FlytBase, Product Marketing case study',
  headline: 'Sales can’t explain the difference.',
  headlineLine2: 'The fix probably isn’t a battlecard.',
  thesis:
    'A working strategy document, turned into an experience. My diagnosis, my evidence, my assumptions, and the first artifact I’d build, all shown, not just claimed.',
  primaryCta: 'Explore the thinking',
  secondaryCta: 'Read detailed document',
}

export const challenge = {
  eyebrow: '01, The challenge',
  heading: 'Three problems on the table. I picked the one upstream of the other two.',
  prompt:
    'Sales and partners can’t articulate what makes FlytBase different from other drone-in-a-box or autonomy platforms. I’m joining with no internal access, and I have to figure out what’s actually broken before I decide what to build.',
  reasoningHeading: 'Why this one, not outbound or partner co-marketing',
  reasoning: [
    {
      label: 'Problem 1, outbound and ABM',
      description: 'A distribution problem: getting a message in front of more of the right people, more efficiently.',
    },
    {
      label: 'Problem 2, partner co-marketing',
      description:
        'Also distribution, and it hands the same translation problem to a partner with less product depth and more incentive to fall back on generic drone jargon.',
    },
    {
      label: 'Problem 3, messaging',
      description:
        'A message problem: whether the message is worth distributing in the first place. Fix it, and the other two get easier as a side effect.',
    },
  ],
  jobPostingNote:
    'I looked up the actual FlytBase PMM posting only after leaning toward Problem 3. It describes the role as sharpening how FlytBase talks about itself across verticals, personas, and use cases, plus battlecards, competitive intel, customer evidence. That’s Problem 3, almost verbatim. Flagging the alignment, not hiding it, but it’s a sanity check, not the reason I picked it.',
}

export const whyHard = {
  eyebrow: '02, Why this is hard',
  heading: 'The complexity is visible the moment you look for it.',
  intro:
    'I don’t have internal access, so I can’t prove root cause. Everything here is outside-in: FlytBase’s own site, its closest public competitors, and the job posting. Evidence tier 5 to 6 of 8 on my own scale, customer conversations at the top, my own assumption at the bottom. Enough for a hypothesis and a fast test, not enough for a repositioning.',
  categoryDescriptions: [
    {
      source: 'Homepage',
      quote: 'Enterprise Physical AI platform for drone autonomy',
    },
    {
      source: 'About page',
      quote: 'The autonomy layer for drones',
    },
    {
      source: 'Platform page',
      quote: 'Defined in opposition to traditional drone-in-a-box solutions, fleet orchestration over single-drone automation',
    },
  ],
  categoryTakeaway:
    'None of these are wrong. They’re all true descriptions of different facets of the product. But a buyer who lands on two pages in one session gets two different mental models of what they’re evaluating. That’s a symptom of a company that hasn’t decided which one sentence it wants to own in the buyer’s head.',
  buyerRoleGap: {
    flytbase:
      'Twelve verticals listed: Public Safety, Oil and Gas, Mining, Solar, Utilities, Maritime Ports, Corrections, and more. Zero buyer roles named anywhere on the public site.',
    percepto:
      'A direct competitor in overlapping industries, with a narrower, less technically differentiated product, names buyer roles explicitly: Director of operations transformation, Power plant manager, SVP business transformation. Leads with plain-language outcomes: keeping people out of harm’s way, paid for itself.',
    skydio:
      'Positions almost entirely by mission and vertical, public safety, defense, energy, with specific named wins: U.S. Air Forces Central selects Skydio Dock to secure U.S. airbases. Narrower platform than FlytBase’s by FlytBase’s own claims, but legible in a sentence.',
    implication:
      'Percepto has done positioning work FlytBase hasn’t, with a less differentiated product. That’s not evidence FlytBase is behind. If anything, the opposite: sophistication became a liability. The more true things you can say about a platform, the harder it gets to pick the one sentence to lead with. That’s a marketing gap, not a product gap, and it’s closeable.',
  },
  reviewGap:
    'No meaningful public review footprint for FlytBase on G2 or Capterra style sites. Either the category doesn’t have mature review behavior yet, or nobody’s pushed customers to leave reviews. Either way, I can’t lean on review-mined buyer language the way I could for a more familiar SaaS category.',
}

export const orchestrationComplexity = {
  eyebrow: 'Why "fleet orchestration" is hard, not just a tagline',
  heading: 'One pilot, five drones, real engineering work most buyers never see.',
  intro:
    'Running one drone from a dock on a schedule is a solved problem industry-wide. Running several drones across several sites from one interface, with one pilot legally responsible for more airspace than they can watch on a single screen, means the software has to do real work a human used to do.',
  items: [
    {
      title: 'Deconfliction',
      description: 'Keep flight paths from converging in shared airspace, without a person cross-checking every path by eye.',
    },
    {
      title: 'Bandwidth contention',
      description: 'Video and telemetry from multiple simultaneous flights compete for the same bandwidth and the same operator’s attention.',
    },
    {
      title: 'Cross-jurisdiction BVLOS paperwork',
      description: 'Regulatory conditions and waivers have to hold across every jurisdiction the fleet operates in. A waiver in one country doesn’t travel with the hardware to the next site.',
    },
  ],
  translation:
    'The claim worth translating for a buyer isn’t "we orchestrate fleets." It’s "your safety officer doesn’t need to double the headcount every time you add a site."',
}

export interface QuestionItem {
  question: string
  whyItMatters: string
}

export const questions: QuestionItem[] = [
  {
    question: 'Is the complaint about win rate, cycle length, or leadership’s gut sense that pitches feel inconsistent?',
    whyItMatters: 'Different symptoms point to different fixes. Conflating them wastes the first month.',
  },
  {
    question: 'Do resellers and SIs sell FlytBase as a feature of their own integration, or as a named platform decision?',
    whyItMatters: 'Changes whether the translation layer needs to speak to the end customer at all, or primarily to the partner’s own sales engineers.',
  },
  {
    question: 'Is there one recurring competitive matchup that dominates losses, or is it diffuse?',
    whyItMatters: 'A dominant matchup would justify a narrower, battlecard-first approach instead of a full translation layer.',
  },
  {
    question: 'How technical are the actual economic buyers, on average?',
    whyItMatters: 'Non-technical approvers need the layer compressed toward business outcomes. Technical evaluators with real veto power need a credible technical mid-layer too.',
  },
  {
    question: 'Does platform-vs-drone-in-a-box actually matter to the buyer, or more to FlytBase’s own engineering identity?',
    whyItMatters: 'The one I’d protect hardest against my own bias, since I find the platform argument compelling myself.',
  },
  {
    question: 'Who else is in the room besides the person I’m writing for?',
    whyItMatters: 'Enterprise physical-infrastructure buying rarely has one decision-maker. A map with a vertical axis and no stakeholder axis is only half a tool.',
  },
  {
    question: 'Why would any of these buyers act now, rather than next year or never?',
    whyItMatters: 'The real competitor for most of these deals is the customer’s manual process or existing vendor, not Percepto or Skydio. "Why change, why now" deserves its own line in the map.',
  },
]

export interface EvidenceItem {
  text: string
}

export interface AssumptionItem {
  text: string
  wouldChangeMind: string
}

export const knowDontKnow = {
  eyebrow: '03, What I know and don’t',
  heading: 'Fact, inference, assumption, hypothesis, held to different standards on purpose.',
  intro:
    'I don’t have internal access to FlytBase. Everything below is labeled by how I know it, not flattened into one confident voice.',
  facts: [
    { text: 'FlytBase’s homepage describes it as an enterprise Physical AI platform for drone autonomy.' },
    { text: 'FlytBase’s about page describes it as the autonomy layer for drones.' },
    { text: 'FlytBase’s platform page defines itself against traditional drone-in-a-box solutions.' },
    { text: 'FlytBase’s industries page lists twelve verticals and names zero buyer roles anywhere on the public site.' },
    { text: 'Percepto, a narrower competitor in overlapping industries, names buyer roles explicitly on its site.' },
    { text: 'Skydio positions by mission and vertical with specific named customer wins.' },
    { text: 'No meaningful public review footprint exists for FlytBase on G2 or Capterra style sites.' },
  ] as EvidenceItem[],
  inferences: [
    { text: 'A buyer who lands on two FlytBase pages in one session likely forms two different mental models of the product.' },
    { text: 'Sophistication became a liability: the more true things a platform can say about itself, the harder it is to pick one sentence to lead with.' },
    { text: 'This evidence sits at tier 5 to 6 of 8 on my own trust scale, enough to justify a hypothesis and a fast test, not a repositioning.' },
    { text: 'Status quo inertia, not a named competitor, is likely the harder objection in verticals like mining.' },
  ] as EvidenceItem[],
  assumptions: [
    {
      text: 'The "can’t articulate differentiation" complaint reflects genuine inconsistency across reps, not one or two loud recent losses.',
      wouldChangeMind: 'If the first round of call listening shows a mostly-consistent story with a couple of rough edges, this is a much smaller, faster fix.',
    },
    {
      text: 'The category-description inconsistency is felt by buyers, not just visible to an outside marketer reading three web pages back to back.',
      wouldChangeMind: 'If buyer interviews show people don’t parse that distinction and self-select on outcome and vertical fit regardless of label.',
    },
    {
      text: 'A lightweight, rep-validated internal reference beats a heavier, polished asset in month one.',
      wouldChangeMind: 'If reps credibly say they only act on something visibly sanctioned by sales leadership, this becomes partly a change-management problem, not a content one.',
    },
    {
      text: 'Partners are a secondary audience for this first pass.',
      wouldChangeMind: 'If partner-sourced deals turn out to be the majority of pipeline, the map needs to be partner-first from day one, a materially different design.',
    },
    {
      text: 'One document format, cut by vertical and stakeholder, can hold together across all twelve listed verticals.',
      wouldChangeMind: 'If mining, corrections, and maritime security need genuinely different formats, that’s evidence for a market-focus problem, not just a template fix.',
    },
  ] as AssumptionItem[],
  hypothesis: {
    text: 'The highest-leverage constraint is the absence of a shared translation layer, a documented, evolving mapping from technical capability to operational use case to buyer’s own words to a defensible economic number. Without it, every rep and partner independently invents their own translation in real time.',
    counterEvidence: [
      'If reps do have a consistent story and simply lack polished collateral, this is wrong and Problem 3 is a battlecard problem.',
      'If win rates are healthy and the complaint is really about deal velocity or one competitive matchup, the constraint is competitive intel, not translation.',
      'If most losses trace to a single recurring objection, the fix is narrower than a full translation layer.',
    ],
  },
}

export interface SignalItem {
  rank: number
  title: string
  description: string
  trust: 'highest' | 'high' | 'medium' | 'low' | 'lowest'
}

export const investigation = {
  eyebrow: '04, The investigation',
  heading: 'How I’d move from uncertainty to a decision.',
  signals: [
    {
      rank: 1,
      title: 'Live or shadowed sales calls, across at least 3 verticals',
      description: 'The single highest-value thing available in week one, realistically obtained just by asking to sit in on whatever’s already scheduled.',
      trust: 'highest',
    },
    {
      rank: 2,
      title: 'Closed-lost reasons and rep-reported objections from CRM',
      description: 'Actual deal behavior, even a rough export, targeted for week two.',
      trust: 'high',
    },
    {
      rank: 3,
      title: '30-minute structured interviews with 3 to 4 reps, 1 to 2 partner reps',
      description: 'Cut by rep versus vertical. Reps are a biased source, they’ll always ask for more content, but their agreement or disagreement with each other is the signal.',
      trust: 'high',
    },
    {
      rank: 4,
      title: 'Existing internal content audit',
      description: 'Not to judge quality, but to see whether a consistent narrative already exists and simply isn’t distributed.',
      trust: 'medium',
    },
    {
      rank: 5,
      title: 'The public site and competitor sites',
      description: 'Good for forming a hypothesis before internal access. Weak as a final answer.',
      trust: 'low',
    },
    {
      rank: 6,
      title: 'Analyst and market commentary on drone-in-a-box',
      description: 'Context on how fragmented category language is industry-wide. Low weight for FlytBase-specific decisions.',
      trust: 'lowest',
    },
  ] as SignalItem[],
  stagedPlan: [
    {
      week: 'Week one',
      actions: 'A direct conversation with my manager, framed explicitly as a hypothesis, plus shadowing whatever sales calls are already scheduled, plus finishing the public-research pass.',
    },
    {
      week: 'Week two',
      actions: '3 to 4 structured 30-minute rep interviews and a CRM export request for closed-lost reasons, once week one’s context makes the questions sharper.',
    },
  ],
  decisiveCut: {
    heading: 'The cut that actually decides this: by rep, or by vertical',
    byRep: 'Different reps, same vertical, different stories. A translation-layer problem, squarely fixable by PMM.',
    byVertical: 'Reps are consistent within a vertical, but the story doesn’t hold together across verticals. A harder conversation: the company hasn’t decided which 3 to 4 of twelve verticals it’s actually trying to win, and marketing is being asked to paper over a strategy decision that hasn’t been made.',
    stance: 'I’d rather say that plainly on day thirty than spend a quarter building a polished document that papers over a scope problem. I’d still build the highest-leverage map either way, because a validated map of where the story does and doesn’t hold together is exactly the evidence that scope conversation would need.',
  },
}

export const insight = {
  eyebrow: '05, The strategic insight',
  observation: 'Sales and partners can’t explain what makes FlytBase different.',
  commonConclusion: 'Build a better battlecard. A sharper one-pager. A competitive matrix.',
  actualInsight:
    'It’s probably not a missing asset. It’s a missing shared vocabulary, between engineering, marketing, and the field, for translating a genuinely complex, multi-layered platform into the specific operational language of a buyer who doesn’t share FlytBase’s internal mental model.',
  implication:
    'A battlecard built on top of that gap doesn’t close it. It just gives the rep a more polished way to say the same unclear thing.',
}

export const strategy = {
  eyebrow: '06, The strategy',
  heading: 'A Message-Gap Map, not a battlecard.',
  thesis:
    'Build a living document: a row per vertical, cut by stakeholder where the concern actually differs, laying out the job-to-be-done in the buyer’s own words, the capabilities that actually serve it, the proof point, the economic argument, and the likely objection, with first-pass responses flagged untested until a rep confirms them live.',
  whyNotBattlecardFirst:
    'A battlecard is a distribution format. If the underlying translation is wrong or inconsistent, a battlecard gives every rep the same wrong story instead of many different wrong ones, arguably worse, because it looks authoritative. The map has to exist first. The battlecard is a downstream output, a day of work once the map is validated against live calls.',
  ownership: [
    { label: 'Who creates it', detail: 'Me, first pass, from the research above, explicitly a draft.' },
    { label: 'Who uses it, and when', detail: 'Reps before a discovery call, partner sales engineers before a first customer conversation. A prep tool, not a leave-behind.' },
    { label: 'What triggers a revision', detail: 'Any rep interview or lost-deal debrief showing a job-to-be-done, objection, or proof point was wrong, surfaced within about 48 hours, not batched into a quarterly review.' },
    { label: 'How usage is measured, month one', detail: 'Whether reps open it before calls without being told to. Discovery-call-to-next-step conversion, tracked before and after rollout, as an early leading indicator, not a causal claim.' },
    { label: 'Who owns it long-term', detail: 'Product marketing, with a standing weekly feedback channel from sales. A translation layer nobody updates goes stale within a quarter.' },
    { label: 'How it connects to revenue', detail: 'Indirectly and slowly at first. Better-qualified discovery leads to clearer buyer self-selection leads to, hopefully, fewer wasted late-stage deals.' },
  ],
  miningExample: {
    heading: 'What one row actually looks like',
    subheading: 'Vertical: mining, continuous site safety and perimeter monitoring',
    intro:
      'Built entirely from FlytBase’s own public case studies, explicitly a draft, and exactly the kind of row I’d expect a rep to correct within the first working session.',
    jobToBeDone:
      'A mine safety or operations team trying to continuously monitor pit walls, stockpiles, and the perimeter for movement, intrusion, or hazard, without sending a person into an active blast zone, and without waiting on a scheduled manual flyover that might miss the thing that matters.',
    stakeholders: [
      { role: 'Economic buyer', detail: 'VP Operations or site GM, owns the safety and uptime budget.' },
      { role: 'Technical evaluator', detail: 'Site engineering or a robotics lead, cares whether this integrates with existing site monitoring and holds up in dust and heat.' },
      { role: 'Champion', detail: 'Often the safety officer who raises it first.' },
      { role: 'Security and data', detail: 'Sovereignty and access-control questions, especially at foreign-owned or state-adjacent sites.' },
      { role: 'Procurement', detail: 'Contract terms and hardware lock-in risk.' },
    ],
    capabilities: [
      'Multi-site fleet orchestration, one team running docks across several pits instead of a pilot per pit.',
      'Hardware-agnostic dock support, avoids a forced rip-and-replace at mines already running mixed vendor equipment.',
      'Automated tasking without a dedicated pilot per shift.',
    ],
    proofPoint:
      'FlytBase’s published case studies show directionally supportive results: SQM’s inspection cycle dropping from weeks to hours, Anglo American’s reduced travel time in Peru, faster intrusion response at Kansanshi via a partner integrator. Flagged as directionally supportive, not proof for this specific pitch. Unvalidated against an actual pit-wall-monitoring conversation.',
    economicArgument:
      'Manual inspection labor cost, plus safety-incident and insurance exposure avoided, plus uptime protected by faster hazard detection, weighed against dock and platform cost. Currently a placeholder, needs a real customer’s numbers.',
    objection:
      'We already run manual flyovers and haven’t had an incident, or we already have a drone vendor. Status quo inertia, ahead of Percepto or Skydio specifically. First-pass response: untested, flagged for the first live call.',
  },
  killTest: {
    heading: 'The kill test, applied honestly',
    items: [
      'If reps don’t use it, the problem isn’t a missing translation layer, it’s an adoption problem, or the map is wrong and reps can tell. Low usage in week two is real signal, not a reason to push distribution harder.',
      'If the real gap is proof, not messaging, reps can explain the difference but customers don’t believe it, the map still helps by forcing a proof point per claim, but the bigger investment shifts toward customer evidence.',
      'If partners resist a shared narrative because their incentive is to sell their own broader integration, the map needs a partner-specific cut, built around what the partner’s own sales engineer needs to defend the choice internally.',
    ],
  },
  distribution: {
    heading: 'Distribution, and why this over the alternatives',
    approach: 'Not a campaign, not new top-of-funnel content: a living internal reference plus a short recurring ritual.',
    plan: 'Get the first map version in front of 5 to 8 reps within three weeks, in a working session, not a document drop. Revise against live pushback. Convert only the validated parts into a one-page-per-vertical battlecard and a short opening-narrative script.',
    standard: 'The standard I’m holding this to is what does the rep need five minutes before the meeting, not what does marketing want to publish.',
  },
}

export const notDoing = {
  eyebrow: 'What I would not do',
  heading: 'Three tempting moves I’d deliberately avoid, and why.',
  items: [
    {
      title: 'A new brand narrative or repositioning exercise',
      why: 'Too slow, too risky before the translation is validated, and not a PMM’s unilateral call in month one.',
    },
    {
      title: 'A big content push',
      why: 'Treats the symptom, not the likely root cause, and is expensive relative to a 30-day window.',
    },
    {
      title: 'A large-scale battlecard rollout',
      why: 'Same logic as the kill test: distributing an unvalidated story at scale is worse than not distributing it at all.',
    },
  ],
}

export const causalChain = {
  eyebrow: 'The causal chain',
  heading: 'Why this compounds instead of just producing an asset.',
  steps: [
    'Message-Gap Map exists and reps use it before calls',
    'Discovery conversations reference the buyer’s actual operational problem, not generic platform capability',
    'Buyers self-qualify faster',
    'Objections cluster into recognizable, named patterns instead of feeling ad hoc',
    'Marketing gets a live feed of which objections and proof gaps repeat across verticals',
    'That feed becomes the input for the next case study, the next competitive response, eventually a genuine positioning refresh backed by real evidence',
  ],
  compoundingAsset:
    'Over two to three quarters, FlytBase has something a competitor can’t fast-follow. A competitor can copy a battlecard in a week. They can’t copy two years of rep-validated, continuously corrected market translation data. That’s the actual compounding asset: not the map itself, but the accumulated correction history behind it.',
  weakestLink:
    'Weakest link, stated plainly: "buyers self-qualify faster." I believe it directionally, have no data to size it, which is exactly why the 90-day claim stays modest and why a leading-indicator metric exists, to start closing that gap early rather than waiting for a quarter of deal-close data.',
}

export const categoryQuestion = {
  eyebrow: 'The category question',
  heading: 'A provisional default, not a resolved answer.',
  body:
    'FlytBase’s own site oscillates between selling a platform and being contrasted against a category, drone-in-a-box. The evidence doesn’t support recommending category creation now, that’s a multi-quarter, CEO or CMO-level bet, not a 30-day PMM deliverable. But declining to resolve it isn’t the same as having no default.',
  default:
    'Lead with the vertical operational outcome. Bring up platform depth and orchestration only once a technical evaluator is explicitly in the room and asking integration questions.',
  caveat: 'Untested, and I’d say so plainly if asked. A hypothesis with a stated default is more useful to a team than a hypothesis that stops at "worth testing."',
}

export const outcomes = {
  eyebrow: '07, What could realistically happen',
  heading: 'No promised win rate. A modest, honest 90 days.',
  notPromising: 'I would not promise a win-rate number, a cycle-time reduction, or a pipeline lift this early. No baseline data to size any of those credibly.',
  ninetyDays: [
    'A validated diagnosis of where the translation breaks down, tested against real sales calls, cut by rep versus vertical rather than my outside read of the website.',
    'A first-version Message-Gap Map, including worked rows like the mining example, that reps are voluntarily using before calls.',
    'Discovery-to-next-step conversion tracked as an early leading indicator, labeled as directional, not causal.',
    'A short ranked list of the two or three objections or proof gaps that recur most, feeding the next case study or competitive response.',
    'If the rep-vs-vertical cut points that way, an honest early flag to leadership that this might be partly a market-focus question, with the map itself as the evidence base for that harder conversation.',
  ],
  whatWouldSharpen: {
    heading: 'What information would have gotten me to a better answer',
    body: 'Five real sales call recordings would have told me more than everything above combined. Absent that, two things would sharpen this most: actual closed-lost reasons from CRM, even unstructured, and direct confirmation of whether most deals are majority direct-sales-led or majority partner-led, since the first deliverable’s design bends around that answer.',
    closing: 'Built on public-site evidence and pattern-matching against two comparable competitors: enough to justify a hypothesis and a fast, cheap first test. Sized to match the evidence I actually have, not the evidence I wish I had.',
  },
}

export const conclusion = {
  eyebrow: 'Where this leaves us',
  heading: 'A decision under uncertainty, made on purpose.',
  problem: 'Sales and partners can’t explain what makes FlytBase different, and the obvious fix, a better battlecard, treats a symptom.',
  theInsight: 'The likelier root cause is a missing translation layer between a genuinely complex platform and a buyer’s operational language, one nobody currently owns or maintains.',
  theDecision: 'Build a Message-Gap Map first: cut by vertical and stakeholder, validated against live rep and buyer signal, before any collateral gets distributed at scale.',
  whyItMatters: 'Because distributing an unvalidated story at scale, however polished, is worse than not distributing it. And because the accumulated correction history behind a living map is the kind of asset a competitor can’t fast-follow in a week.',
  whatsNext: 'Week one: shadow live calls, talk to my manager, finish the public research. Week two: structured rep interviews, a CRM pull, and the first draft of the map, ready to be wrong in public and corrected fast.',
  closingLine: 'This is how I’d approach an ambiguous, commercially important problem: name what I know, name what I’m assuming, build the smallest thing that tests the assumption, and say plainly what would change my mind.',
}
