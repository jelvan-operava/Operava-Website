import { detectTopicRoute } from '../src/utils/avaRouting'

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`)
    process.exit(1)
  }
  console.log(`✅ PASSED: ${message}`)
}

console.log('Testing AVA Topic Router...')

// Test 1: Direct Apply Intent
const apply1 = detectTopicRoute('I want to apply')
assert(apply1 !== null && apply1.kind === 'CAREERS' && apply1.isDirectIntent === true, 'Matches direct apply intent')
assert(apply1?.to === '/apply', 'Direct apply routes to /apply')

// Test 2: Direct Apply with Tech Role
const applyTech = detectTopicRoute('I want to apply as a software developer')
assert(applyTech !== null && decodeURIComponent(applyTech.to).includes('OPERAVA Technology Executive'), 'Direct apply tech routes to Technology Executive')

// Test 3: Direct Apply with Customer Experience Role
const applyCSR = detectTopicRoute('How do I apply for customer service support?')
assert(applyCSR !== null && decodeURIComponent(applyCSR.to).includes('OPERAVA Customer Experience Executive'), 'Direct apply CSR routes to Customer Experience Executive')

// Test 4: Direct Quote Intent
const quote1 = detectTopicRoute('I want to request a quote')
assert(quote1 !== null && quote1.kind === 'SERVICES' && quote1.isDirectIntent === true, 'Matches direct quote intent')
assert(quote1?.to.startsWith('/quote'), 'Direct quote routes to /quote')

// Test 5: Direct Quote for Software Development
const quoteDev = detectTopicRoute('I want a quote for software development')
assert(quoteDev !== null && decodeURIComponent(quoteDev.to).includes('Information Technology') && decodeURIComponent(quoteDev.to).includes('Software Development'), 'Direct quote for software dev has category and service')

// Test 6: Direct Quote for BPO Help Desk
const quoteBPO = detectTopicRoute('Can I get a quote for technical support BPO?')
assert(quoteBPO !== null && decodeURIComponent(quoteBPO.to).includes('Business Process Outsourcing') && decodeURIComponent(quoteBPO.to).includes('Technical Support'), 'Direct quote for BPO has category and service')

// Test 7: Informational IT inquiry (Quick Topic)
const itInfo = detectTopicRoute('What IT and software services does OPERAVA offer?')
assert(itInfo !== null && itInfo.kind === 'SERVICES' && itInfo.isDirectIntent === false, 'Informational IT query returns route action without direct routing')
assert(itInfo?.to.includes('Information+Technology'), 'Informational IT routes to Information Technology category')

// Test 8: Informational BPO inquiry (Quick Topic)
const bpoInfo = detectTopicRoute('Tell me about OPERAVA BPO and customer operations.')
assert(bpoInfo !== null && bpoInfo.kind === 'SERVICES' && bpoInfo.isDirectIntent === false, 'Informational BPO query returns route action without direct routing')
assert(bpoInfo?.to.includes('Business+Process+Outsourcing'), 'Informational BPO routes to BPO category')

// Test 9: Informational Careers inquiry (Quick Topic)
const careerInfo = detectTopicRoute('What career tracks and benefits does OPERAVA offer?')
assert(careerInfo !== null && careerInfo.kind === 'CAREERS' && careerInfo.isDirectIntent === false, 'Informational Careers query returns route action without direct routing')
assert(careerInfo?.to.startsWith('/apply'), 'Informational Careers routes to /apply')

// Test 10: Non-business general query
const generalQuery = detectTopicRoute('What is the capital of France?')
assert(generalQuery === null, 'Irrelevant query produces no route action')

// Test 11: Quick Topic Engagement Models & Pricing
const engagementInfo = detectTopicRoute('How do OPERAVA engagements, milestones, and deliverables work?')
assert(engagementInfo !== null && engagementInfo.to === '/quote', 'Engagement models routes to /quote')

const pricingInfo = detectTopicRoute('How does OPERAVA handle pricing, rate cards, and invoices?')
assert(pricingInfo !== null && pricingInfo.to === '/quote', 'Pricing approach routes to /quote')

// Test 12: Direct Quote for Web & Mobile
const quoteWeb = detectTopicRoute('I want a quote for web application development')
assert(quoteWeb !== null && decodeURIComponent(quoteWeb.to).includes('Web & Mobile Application Development'), 'Direct quote web development matches service')

// Test 13: Direct Quote for Data Entry
const quoteData = detectTopicRoute('I need a quote for data entry and document processing')
assert(quoteData !== null && decodeURIComponent(quoteData.to).includes('Data Entry'), 'Direct quote data entry matches service')

// Test 14: Direct Apply Business Operations
const applyOps = detectTopicRoute('I want to apply for business operations and back office')
assert(applyOps !== null && decodeURIComponent(applyOps.to).includes('OPERAVA Business Operations Executive'), 'Direct apply ops matches Business Operations Executive')

// Test 15: Apply with HR / Recruitment specialization keyword
const applyHR = detectTopicRoute('I want to apply for HR and recruitment')
assert(applyHR !== null && decodeURIComponent(applyHR.to).includes('OPERAVA Business Operations Executive'), 'Apply with HR routes to Business Operations Executive')

// Test 16: Apply with Customer Experience Executive title
const applyCX = detectTopicRoute('Apply for Operava Customer Experience Executive')
assert(applyCX !== null && decodeURIComponent(applyCX.to).includes('OPERAVA Customer Experience Executive'), 'Apply CX matches Customer Experience Executive')

// Test 17: Apply with Technology Executive title
const applyTechExec = detectTopicRoute('Apply for Operava Technology Executive')
assert(applyTechExec !== null && decodeURIComponent(applyTechExec.to).includes('OPERAVA Technology Executive'), 'Apply Tech matches Technology Executive')

// Test 18: Contact & Compliance topic
const contactInfo = detectTopicRoute('How can I contact your office regarding data privacy compliance?')
assert(contactInfo !== null && contactInfo.to === '/contact' && contactInfo.kind === 'CONTACT', 'Contact and compliance routes to /contact')

console.log('All AVA Topic Routing tests passed successfully!')
