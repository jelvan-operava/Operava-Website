/** Fixed assessment blueprints — answers scored by Worker AI, not exposed to client. */

export type PositionCode = 'tech' | 'ops' | 'cx'

export interface AssessmentQuestion {
  id: string
  section: 'position' | 'english'
  prompt: string
  topic: string
}

const ENGLISH: AssessmentQuestion[] = [
  { id: 'en-01', section: 'english', topic: 'grammar', prompt: 'Rewrite this sentence correctly: "The client have send the report yesterday."' },
  { id: 'en-02', section: 'english', topic: 'grammar', prompt: 'Choose the better workplace sentence and explain why: A) "Please advise." B) "Could you please confirm the next steps by Friday?"' },
  { id: 'en-03', section: 'english', topic: 'vocabulary', prompt: 'In a professional email, what does "ASAP" mean, and when is it appropriate to use it?' },
  { id: 'en-04', section: 'english', topic: 'comprehension', prompt: 'A customer writes: "I still have not received the item I ordered two weeks ago." Summarize the issue in one clear sentence.' },
  { id: 'en-05', section: 'english', topic: 'writing', prompt: 'Write a polite 2–3 sentence reply acknowledging a delayed shipment and promising a follow-up within 24 hours.' },
  { id: 'en-06', section: 'english', topic: 'grammar', prompt: 'Correct the errors: "Me and the team is working on the tickets since this morning."' },
  { id: 'en-07', section: 'english', topic: 'vocabulary', prompt: 'Explain the difference between "affect" and "effect" with one workplace example each.' },
  { id: 'en-08', section: 'english', topic: 'comprehension', prompt: 'Read: "Please escalate only after Level 1 steps are documented." What must happen before escalation?' },
  { id: 'en-09', section: 'english', topic: 'writing', prompt: 'Rewrite casually: "ur order is delayed sorry" into a professional customer message.' },
  { id: 'en-10', section: 'english', topic: 'grammar', prompt: 'Fill in: "If the system ___ (fail) again, notify the on-call engineer immediately." Use the correct verb form and briefly justify it.' },
  { id: 'en-11', section: 'english', topic: 'vocabulary', prompt: 'What does "bandwidth" mean metaphorically in a workplace conversation about capacity?' },
  { id: 'en-12', section: 'english', topic: 'writing', prompt: 'Write a short subject line and opening sentence for an email requesting missing documents from a client.' },
  { id: 'en-13', section: 'english', topic: 'comprehension', prompt: 'Policy: responses must be sent within 4 business hours. A ticket arrives Friday 5pm local. What should you communicate about timing?' },
  { id: 'en-14', section: 'english', topic: 'grammar', prompt: 'Which is correct and why? A) "The data are incomplete." B) "The data is incomplete." (Accept either with a clear professional justification.)' },
  { id: 'en-15', section: 'english', topic: 'writing', prompt: 'Draft two sentences de-escalating an angry customer without promising a refund you cannot authorize.' },
]

const TECH: AssessmentQuestion[] = [
  { id: 'tech-01', section: 'position', topic: 'http', prompt: 'A web API starts returning HTTP 500 for many users. List the first three investigation steps you would take.' },
  { id: 'tech-02', section: 'position', topic: 'git', prompt: 'Explain the difference between git merge and git rebase in practical team terms.' },
  { id: 'tech-03', section: 'position', topic: 'api', prompt: 'What is a REST API, and name two HTTP methods with their typical use.' },
  { id: 'tech-04', section: 'position', topic: 'db', prompt: 'When would you use an index on a database column? Give one benefit and one trade-off.' },
  { id: 'tech-05', section: 'position', topic: 'debug', prompt: 'Describe how you would debug a feature that works locally but fails in production.' },
  { id: 'tech-06', section: 'position', topic: 'security', prompt: 'Name three basic practices to reduce the risk of exposing secrets in a web application.' },
  { id: 'tech-07', section: 'position', topic: 'architecture', prompt: 'What is the difference between frontend and backend responsibilities in a typical web app?' },
  { id: 'tech-08', section: 'position', topic: 'cloud', prompt: 'Explain what "horizontal scaling" means and when it helps.' },
  { id: 'tech-09', section: 'position', topic: 'testing', prompt: 'Why write automated tests? Give one unit-test example relevant to your experience.' },
  { id: 'tech-10', section: 'position', topic: 'js', prompt: 'What is the difference between synchronous and asynchronous code execution?' },
  { id: 'tech-11', section: 'position', topic: 'sql', prompt: 'Write a conceptual SQL query: select users who registered in the last 7 days (describe columns you would use).' },
  { id: 'tech-12', section: 'position', topic: 'ci', prompt: 'What is CI/CD and how does it help a development team?' },
  { id: 'tech-13', section: 'position', topic: 'perf', prompt: 'A page loads slowly. What metrics and tools would you check first?' },
  { id: 'tech-14', section: 'position', topic: 'auth', prompt: 'Explain the purpose of JWT or session cookies for authentication at a high level.' },
  { id: 'tech-15', section: 'position', topic: 'problem', prompt: 'Describe a technical problem you solved: symptoms, diagnosis, and fix (3–6 sentences).' },
]

const OPS: AssessmentQuestion[] = [
  { id: 'ops-01', section: 'position', topic: 'sop', prompt: 'What is an SOP, and why does it matter for operational consistency?' },
  { id: 'ops-02', section: 'position', topic: 'priority', prompt: 'You have five tasks due today. How do you prioritize them?' },
  { id: 'ops-03', section: 'position', topic: 'data', prompt: 'Describe how you ensure data accuracy when processing large spreadsheets.' },
  { id: 'ops-04', section: 'position', topic: 'process', prompt: 'Give an example of a process you improved. What changed and what was the result?' },
  { id: 'ops-05', section: 'position', topic: 'communication', prompt: 'How do you escalate a blocked task to a manager without creating unnecessary alarm?' },
  { id: 'ops-06', section: 'position', topic: 'tools', prompt: 'Which business tools (e.g. Excel, HRIS, accounting software) have you used, and for what tasks?' },
  { id: 'ops-07', section: 'position', topic: 'docs', prompt: 'Why is documentation important when handing off work to another team member?' },
  { id: 'ops-08', section: 'position', topic: 'qa', prompt: 'List three checks you perform before marking an administrative task complete.' },
  { id: 'ops-09', section: 'position', topic: 'confidential', prompt: 'How do you handle confidential employee or client information in daily work?' },
  { id: 'ops-10', section: 'position', topic: 'automation', prompt: 'Describe a repetitive task that could be automated and how you might approach it.' },
  { id: 'ops-11', section: 'position', topic: 'metrics', prompt: 'What operational metrics would you track for a support or admin team?' },
  { id: 'ops-12', section: 'position', topic: 'conflict', prompt: 'Two stakeholders give conflicting instructions. What do you do?' },
  { id: 'ops-13', section: 'position', topic: 'onboarding', prompt: 'Outline the first-week checklist you would give a new operations hire.' },
  { id: 'ops-14', section: 'position', topic: 'reporting', prompt: 'How would you structure a weekly operations status update for leadership?' },
  { id: 'ops-15', section: 'position', topic: 'scenario', prompt: 'A payroll file is late from a vendor. Walk through your response steps.' },
]

const CX: AssessmentQuestion[] = [
  { id: 'cx-01', section: 'position', topic: 'empathy', prompt: 'A customer is frustrated after waiting 20 minutes. What is your opening response approach?' },
  { id: 'cx-02', section: 'position', topic: 'deescalate', prompt: 'List three techniques for de-escalating an angry customer on chat or phone.' },
  { id: 'cx-03', section: 'position', topic: 'sla', prompt: 'What is an SLA in customer support, and why does it matter?' },
  { id: 'cx-04', section: 'position', topic: 'docs', prompt: 'Why document every customer interaction in the ticket system?' },
  { id: 'cx-05', section: 'position', topic: 'escalate', prompt: 'When should you escalate a case versus continuing to handle it yourself?' },
  { id: 'cx-06', section: 'position', topic: 'tools', prompt: 'Which support tools have you used (e.g. Zendesk, Intercom)? What did you use them for?' },
  { id: 'cx-07', section: 'position', topic: 'csat', prompt: 'What is CSAT, and how can an agent improve it day to day?' },
  { id: 'cx-08', section: 'position', topic: 'multichannel', prompt: 'How does handling email differ from live chat in tone and response length?' },
  { id: 'cx-09', section: 'position', topic: 'policy', prompt: 'A customer demands a refund outside policy. How do you respond professionally?' },
  { id: 'cx-10', section: 'position', topic: 'priority', prompt: 'You have three open chats and one VIP call. How do you prioritize?' },
  { id: 'cx-11', section: 'position', topic: 'knowledge', prompt: 'How do you use a knowledge base when you do not know the answer?' },
  { id: 'cx-12', section: 'position', topic: 'tone', prompt: 'Rewrite a blunt reply into a professional CX response: "That is not our fault."' },
  { id: 'cx-13', section: 'position', topic: 'recovery', prompt: 'Describe a service-recovery action after a company error (without inventing a refund you cannot give).' },
  { id: 'cx-14', section: 'position', topic: 'shift', prompt: 'What habits keep quality high during night-shift or high-volume periods?' },
  { id: 'cx-15', section: 'position', topic: 'scenario', prompt: 'Customer says the product never arrived, tracking shows delivered. Outline your handling steps.' },
]

export function buildQuestionSet(positionCode: PositionCode): AssessmentQuestion[] {
  const position =
    positionCode === 'tech' ? TECH : positionCode === 'ops' ? OPS : CX
  return [...position, ...ENGLISH]
}

export const PASS_CORRECT = 26
export const TOTAL_QUESTIONS = 30
