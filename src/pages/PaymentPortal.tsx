import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  CreditCard,
  Building2,
  Lock,
  CheckCircle2,
  Copy,
  Check,
  Download,
  Printer,
  ArrowRight,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Zap,
  Globe2,
  FileCheck,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  RotateCcw,
} from 'lucide-react'

type PaymentMethodType = 'card' | 'wire' | 'wallet' | 'po'
type ServiceCategory =
  | 'software-dev'
  | 'bpo-operations'
  | 'cloud-infra'
  | 'tech-support'
  | 'discovery-deposit'
  | 'consulting-retainer'
  | 'custom'

interface PresetInvoice {
  invoiceNumber: string
  clientName: string
  serviceName: string
  category: ServiceCategory
  amount: number
  currency: string
  dueDate: string
  description: string
}

const PRESET_INVOICES: PresetInvoice[] = [
  {
    invoiceNumber: 'INV-2026-7841',
    clientName: 'Nexus Cloud Systems Corp.',
    serviceName: 'Enterprise Cloud Migration & DevOps Sprint #4',
    category: 'cloud-infra',
    amount: 6450.0,
    currency: 'USD',
    dueDate: '2026-09-15',
    description: 'Kubernetes cluster deployment, zero-downtime CI/CD automation & observability setup.',
  },
  {
    invoiceNumber: 'INV-2026-9023',
    clientName: 'AeroGlobal Logistics Inc.',
    serviceName: 'Dedicated 24/7 BPO Technical Support (Tier 2/3 - Month 8)',
    category: 'bpo-operations',
    amount: 4200.0,
    currency: 'USD',
    dueDate: '2026-09-01',
    description: 'Dedicated 8-agent Tier 2 technical helpdesk & real-time omnichannel ticketing.',
  },
  {
    invoiceNumber: 'INV-2026-1185',
    clientName: 'Fintech Horizon Ltd.',
    serviceName: 'SaaS Platform Development - Milestone #2 Acceptance',
    category: 'software-dev',
    amount: 8900.0,
    currency: 'USD',
    dueDate: '2026-09-20',
    description: 'React/Node API microservices, multi-tenant billing backend & KYC integration.',
  },
]

const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar', rateToUSD: 1.0 },
  { code: 'PHP', symbol: '₱', name: 'Philippine Peso', rateToUSD: 56.5 },
  { code: 'EUR', symbol: '€', name: 'Euro', rateToUSD: 0.92 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rateToUSD: 0.79 },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar', rateToUSD: 1.52 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rateToUSD: 1.34 },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar', rateToUSD: 1.36 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rateToUSD: 154.0 },
]

export default function PaymentPortal() {
  // Mode selection: lookup invoice vs custom payment
  const [entryMode, setEntryMode] = useState<'invoice' | 'custom'>('invoice')
  const [invoiceLookupQuery, setInvoiceLookupQuery] = useState('')
  const [lookupMessage, setLookupMessage] = useState<string | null>(null)

  // Form states
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-7841')
  const [companyName, setCompanyName] = useState('Nexus Cloud Systems Corp.')
  const [contactName, setContactName] = useState('Alex Henderson')
  const [billingEmail, setBillingEmail] = useState('billing@nexuscloud.io')
  const [phone, setPhone] = useState('+1 (555) 234-8901')
  const [taxId, setTaxId] = useState('')
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>('cloud-infra')
  const [projectNotes, setProjectNotes] = useState('Enterprise Cloud Migration & DevOps Sprint #4')

  // Financial amounts
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [rawAmount, setRawAmount] = useState<number>(6450.0)
  const [isCrossBorderExport, setIsCrossBorderExport] = useState(true) // Cross-border international 0% VAT

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card')

  // Card input states
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolder, setCardHolder] = useState('Alex Henderson')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [zipCode, setZipCode] = useState('')

  // Bank Wire states
  const [wireReferenceCode, setWireReferenceCode] = useState(() => `OPV-WIRE-${Math.floor(100000 + Math.random() * 900000)}`)
  const [bankRemittanceNote, setBankRemittanceNote] = useState('')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Digital Wallet selection
  const [walletType, setWalletType] = useState<'stripe' | 'paypal' | 'gcash' | 'maya'>('stripe')

  // PO states
  const [poNumber, setPoNumber] = useState('')

  // Submission / Receipt States
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [transactionData, setTransactionData] = useState<{
    txnId: string
    authCode: string
    timestamp: string
    amountPaid: string
    currency: string
    method: string
    email: string
    company: string
    invoice: string
    itemDesc: string
  } | null>(null)

  // Quick-fill invoice preset
  const handleSelectPreset = (preset: PresetInvoice) => {
    setInvoiceNumber(preset.invoiceNumber)
    setCompanyName(preset.clientName)
    setServiceCategory(preset.category)
    setRawAmount(preset.amount)
    setSelectedCurrency(preset.currency)
    setProjectNotes(preset.description)
    setLookupMessage(`Loaded verified statement ${preset.invoiceNumber}`)
    setTimeout(() => setLookupMessage(null), 3500)
  }

  // Handle invoice lookup search
  const handleLookup = () => {
    if (!invoiceLookupQuery.trim()) {
      setLookupMessage('Please enter an Invoice or Reference number.')
      return
    }
    const cleanQuery = invoiceLookupQuery.trim().toUpperCase()
    const found = PRESET_INVOICES.find((inv) => inv.invoiceNumber.toUpperCase() === cleanQuery)

    if (found) {
      handleSelectPreset(found)
      setInvoiceLookupQuery('')
    } else {
      // Allow custom invoice number lookup
      setInvoiceNumber(cleanQuery)
      setLookupMessage(`Initialized billing record for ${cleanQuery}. Please review line amount below.`)
      setTimeout(() => setLookupMessage(null), 4000)
    }
  }

  // Format Card Number (adds spaces every 4 digits)
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16)
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ')
    setCardNumber(formatted)
  }

  // Format Expiration Date (MM/YY)
  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4)
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`)
    } else {
      setCardExpiry(raw)
    }
  }

  // Detect card brand
  const cardBrand = useMemo(() => {
    const clean = cardNumber.replace(/\s/g, '')
    if (clean.startsWith('4')) return 'Visa'
    if (/^5[1-5]/.test(clean) || /^2[2-7]/.test(clean)) return 'Mastercard'
    if (/^3[47]/.test(clean)) return 'American Express'
    if (/^35/.test(clean)) return 'JCB'
    return 'Card'
  }, [cardNumber])

  // Calculation breakdown
  const currencyObj = CURRENCIES.find((c) => c.code === selectedCurrency) || CURRENCIES[0]
  const subtotal = Math.max(1, rawAmount)
  const vatRate = isCrossBorderExport ? 0 : 0.12 // 0% for zero-rated international export, 12% domestic PH
  const taxAmount = subtotal * vatRate
  const gatewayFee = paymentMethod === 'card' ? subtotal * 0.029 : paymentMethod === 'wallet' ? subtotal * 0.025 : 0 // 0% on Wire & PO
  const totalPayable = subtotal + taxAmount + gatewayFee

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(label)
    setTimeout(() => setCopiedField(null), 2500)
  }

  // Handle Payment Submit
  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault()

    if (totalPayable <= 0) {
      alert('Please specify a valid payment amount.')
      return
    }

    if (!companyName.trim() || !billingEmail.trim()) {
      alert('Please provide your Company Name and Billing Email Address.')
      return
    }

    setIsProcessing(true)

    // Simulate secure 256-bit payment gateway tokenization and verification
    setTimeout(() => {
      setIsProcessing(false)
      const txn = {
        txnId: `TXN-${new Date().getFullYear()}-${Math.floor(10000000 + Math.random() * 90000000)}`,
        authCode: `AUTH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        timestamp: new Date().toUTCString(),
        amountPaid: `${currencyObj.symbol}${totalPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${currencyObj.code}`,
        currency: currencyObj.code,
        method:
          paymentMethod === 'card'
            ? `${cardBrand} (•••• ${cardNumber.slice(-4) || '8842'})`
            : paymentMethod === 'wire'
            ? `Bank Wire / SWIFT (${wireReferenceCode})`
            : paymentMethod === 'wallet'
            ? `Digital Checkout (${walletType.toUpperCase()})`
            : `Corporate Purchase Order (${poNumber || 'NET-30'})`,
        email: billingEmail,
        company: companyName,
        invoice: invoiceNumber || 'CUSTOM-DIRECT',
        itemDesc: projectNotes || 'OPERAVA Professional Services & Deliverables',
      }
      setTransactionData(txn)
      setIsSuccess(true)
      window.scrollTo({ top: 150, behavior: 'smooth' })
    }, 1800)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadReceipt = () => {
    if (!transactionData) return
    const receiptContent = `=====================================================
OPERAVA GLOBAL SOLUTIONS OPC
OFFICIAL PAYMENT SETTLEMENT RECEIPT
=====================================================
Transaction ID:      ${transactionData.txnId}
Authorization Code:  ${transactionData.authCode}
Date & Timestamp:    ${transactionData.timestamp}
Settlement Status:   PAID / COMPLETED (256-BIT SECURE)

-----------------------------------------------------
BILLING ENTITY & CLIENT DETAILS:
-----------------------------------------------------
Client Company:      ${transactionData.company}
Billing Email:       ${transactionData.email}
Invoice Reference:   ${transactionData.invoice}
Description / Notes: ${transactionData.itemDesc}

-----------------------------------------------------
PAYMENT BREAKDOWN:
-----------------------------------------------------
Payment Channel:     ${transactionData.method}
Subtotal Amount:     ${currencyObj.symbol}${subtotal.toFixed(2)} ${transactionData.currency}
Tax / VAT (0% Exp):  ${currencyObj.symbol}${taxAmount.toFixed(2)} ${transactionData.currency}
Processing Fee:      ${currencyObj.symbol}${gatewayFee.toFixed(2)} ${transactionData.currency}
TOTAL SETTLED:       ${transactionData.amountPaid}

-----------------------------------------------------
OPERAVA GLOBAL SOLUTIONS OPC
Corporation registered under the laws of the Republic of the Philippines.
Official Billing Desk: billing@operavaglobal.com | cs@operavaglobal.com
Official Website:      https://www.operavaglobal.com
Refund Policy:         https://www.operavaglobal.com/refund-policy
Terms & Conditions:    https://www.operavaglobal.com/terms
=====================================================`

    const blob = new Blob([receiptContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `OPERAVA_Receipt_${transactionData.txnId}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleResetForNewPayment = () => {
    setIsSuccess(false)
    setTransactionData(null)
    setCardNumber('')
    setCardExpiry('')
    setCardCvc('')
    setWireReferenceCode(`OPV-WIRE-${Math.floor(100000 + Math.random() * 900000)}`)
  }

  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-900 selection:bg-violet-600 selection:text-white pt-16 lg:pt-18 pb-24">
      {/* ── TOP SECURE HEADER BADGE BAR ── */}
      <div className="bg-violet-900 border-b border-violet-800/80 text-xs text-violet-100 py-2.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span className="font-bold text-emerald-300 tracking-wide uppercase text-[11px]">
              256-Bit SSL Encrypted
            </span>
            <span className="text-violet-400 hidden sm:inline">•</span>
            <span className="hidden sm:inline text-violet-100/90 font-medium">
              OPERAVA Global Solutions Official Client Payment Gateway
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-violet-200">
            <span className="flex items-center gap-1.5 font-medium text-violet-100">
              <Lock className="w-3.5 h-3.5 text-emerald-300" />
              PCI-DSS Level 1 Verified
            </span>
            <span className="hidden md:inline text-violet-400/60">|</span>
            <Link
              to="/refund-policy"
              className="text-violet-200 hover:text-white transition-colors underline decoration-violet-400/60 underline-offset-2 font-medium"
            >
              Refund Policy
            </Link>
            <Link
              to="/terms"
              className="text-violet-200 hover:text-white transition-colors underline decoration-violet-400/60 underline-offset-2 font-medium"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* ── HERO BANNER ── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-violet-50/70 via-white to-slate-50 border-b border-violet-100/90 py-4 px-4 sm:px-6 lg:px-8">
        {/* Subtle violet ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-violet-400/10 blur-xl pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 mb-3">
            OPERAVA <span className="text-violet-600">Secured Payment Portal</span>
          </h1>

          {/* Quick Trust Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto text-left">
            <div className="p-2 rounded-lg bg-white border border-violet-100 shadow-xs flex items-center gap-2 hover:border-violet-300 transition-colors">
              <div className="w-6 h-6 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-900 leading-tight">PCI-DSS L1</div>
                <div className="text-[9px] text-slate-500 leading-tight">Bank-Grade Security</div>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-white border border-violet-100 shadow-xs flex items-center gap-2 hover:border-violet-300 transition-colors">
              <div className="w-6 h-6 rounded-md bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
                <Globe2 className="w-3.5 h-3.5 text-sky-600" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-900 leading-tight">8 Currencies</div>
                <div className="text-[9px] text-slate-500 leading-tight">USD, PHP, EUR...</div>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-white border border-violet-100 shadow-xs flex items-center gap-2 hover:border-violet-300 transition-colors">
              <div className="w-6 h-6 rounded-md bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
                <Building2 className="w-3.5 h-3.5 text-violet-600" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-900 leading-tight">Wire / SWIFT</div>
                <div className="text-[9px] text-slate-500 leading-tight">0% Surcharge</div>
              </div>
            </div>

            <div className="p-2 rounded-lg bg-white border border-violet-100 shadow-xs flex items-center gap-2 hover:border-violet-300 transition-colors">
              <div className="w-6 h-6 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0">
                <FileCheck className="w-3.5 h-3.5 text-amber-600" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-900 leading-tight">Instant Receipts</div>
                <div className="text-[9px] text-slate-500 leading-tight">Official E-Invoice</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-5">
        {/* ── SUCCESS RECEIPT VIEW (DISPLAYED AFTER SUBMISSION) ── */}
        {isSuccess && transactionData ? (
          <div className="bg-white border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden mb-12 animate-in fade-in zoom-in-95 duration-300">
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 blur-3xl pointer-events-none rounded-full" />

            <div className="text-center max-w-xl mx-auto mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 mb-4 shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Payment Settled Successfully</h2>
              <p className="text-slate-600 text-sm">
                Your transaction has been securely authorized. A confirmation receipt and tax invoice has been dispatched to{' '}
                <span className="font-bold text-violet-700">{transactionData.email}</span>.
              </p>
            </div>

            {/* Official Digital Receipt Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-xs text-slate-800 mb-8 font-mono text-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-5">
                <div>
                  <div className="font-sans font-black text-lg text-slate-900">OPERAVA GLOBAL SOLUTIONS OPC</div>
                  <div className="text-[11px] text-slate-500">Official Electronic Receipt</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-emerald-700 font-bold uppercase tracking-wider">● SETTLED / PAID</div>
                  <div className="text-[11px] text-slate-500">{transactionData.txnId}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-5 border-b border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Client / Organization</span>
                  <span className="font-bold text-slate-900">{transactionData.company}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Invoice Reference</span>
                  <span className="font-bold text-violet-700">{transactionData.invoice}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Settlement Date</span>
                  <span className="text-slate-700">{transactionData.timestamp}</span>
                </div>
                <div>
                  <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Payment Channel</span>
                  <span className="text-slate-700">{transactionData.method}</span>
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-500 block uppercase tracking-wider text-[10px]">Description</span>
                  <span className="text-slate-700">{transactionData.itemDesc}</span>
                </div>
              </div>

              <div className="pt-5 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-800">
                    {currencyObj.symbol}
                    {subtotal.toFixed(2)} {transactionData.currency}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Taxes (0% Export / Zero-Rated):</span>
                  <span className="font-semibold text-slate-800">
                    {currencyObj.symbol}
                    {taxAmount.toFixed(2)} {transactionData.currency}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Processing / Gateway:</span>
                  <span className="font-semibold text-slate-800">
                    {currencyObj.symbol}
                    {gatewayFee.toFixed(2)} {transactionData.currency}
                  </span>
                </div>
                <div className="flex justify-between text-base font-sans font-black text-slate-900 pt-2.5 border-t border-slate-300">
                  <span>Total Settled:</span>
                  <span className="text-emerald-600">{transactionData.amountPaid}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                <span>Auth Code: {transactionData.authCode}</span>
                <span className="text-violet-700 font-semibold">Protected by 256-Bit SSL</span>
              </div>
            </div>

            {/* Actions for Receipt */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-sm font-bold transition-colors shadow-xs"
              >
                <Printer className="w-4 h-4 text-slate-600" />
                Print / Save PDF
              </button>

              <button
                type="button"
                onClick={handleDownloadReceipt}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-sm font-bold transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Download Statement (.TXT)
              </button>

              <button
                type="button"
                onClick={handleResetForNewPayment}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-violet-200 hover:bg-violet-50 text-violet-700 text-sm font-bold transition-colors shadow-xs"
              >
                <RotateCcw className="w-4 h-4 text-violet-600" />
                Make Another Payment
              </button>
            </div>
          </div>
        ) : (
          /* ── MAIN PAYMENT WORKFLOW ── */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: PAYMENT DETAILS & METHOD (7 COLS) */}
            <div className="lg:col-span-7 space-y-6">
              {/* ENTRY MODE SELECTOR (LOOKUP INVOICE VS CUSTOM) */}
              <div className="bg-white border border-violet-100 rounded-2xl p-5 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet-600"></span>
                    Payment Mode
                  </span>
                  <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setEntryMode('invoice')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        entryMode === 'invoice'
                          ? 'bg-violet-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Pay Existing Invoice
                    </button>
                    <button
                      type="button"
                      onClick={() => setEntryMode('custom')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        entryMode === 'custom'
                          ? 'bg-violet-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Custom Service / Retainer
                    </button>
                  </div>
                </div>

                {/* INVOICE LOOKUP BAR */}
                {entryMode === 'invoice' && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={invoiceLookupQuery}
                          onChange={(e) => setInvoiceLookupQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                          placeholder="Search Invoice # (e.g. INV-2026-7841)"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleLookup}
                        className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold shrink-0 transition-colors shadow-xs"
                      >
                        Lookup
                      </button>
                    </div>

                    {/* Notification message */}
                    {lookupMessage && (
                      <div className="text-xs text-violet-900 bg-violet-50 border border-violet-200 rounded-xl px-3 py-2 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                        {lookupMessage}
                      </div>
                    )}

                    {/* Quick Preset Badges */}
                    <div>
                      <span className="text-[11px] text-slate-500 block mb-2 font-semibold">
                        Quick Demo Statements (Click to populate):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {PRESET_INVOICES.map((inv) => (
                          <button
                            key={inv.invoiceNumber}
                            type="button"
                            onClick={() => handleSelectPreset(inv)}
                            className={`text-[11px] px-2.5 py-1.5 rounded-lg border text-left transition-all ${
                              invoiceNumber === inv.invoiceNumber
                                ? 'bg-violet-100 border-violet-400 text-violet-950 font-bold shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50/50'
                            }`}
                          >
                            <span className="font-mono font-bold text-violet-700 mr-1.5">{inv.invoiceNumber}</span>
                            <span className="text-slate-600">${inv.amount.toLocaleString()}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CLIENT & BILLING INFORMATION */}
              <div className="bg-white border border-violet-100 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-violet-600" />
                  1. Client & Billing Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">
                      Company / Organization Name <span className="text-violet-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Acme Corp LLC"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">
                      Billing Email Address <span className="text-violet-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={billingEmail}
                      onChange={(e) => setBillingEmail(e.target.value)}
                      placeholder="billing@yourcompany.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Contact Person</label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Jane Smith"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">
                      Invoice / Statement Reference #
                    </label>
                    <input
                      type="text"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      placeholder="e.g. INV-2026-XXXX or OPV-PO"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono placeholder-slate-400 focus:bg-white focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">
                      Client Tax ID / VAT / TIN (Optional)
                    </label>
                    <input
                      type="text"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      placeholder="e.g. EU123456789 or PH-TIN"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 mb-1 font-semibold">
                      Service Category & Description
                    </label>
                    <input
                      type="text"
                      value={projectNotes}
                      onChange={(e) => setProjectNotes(e.target.value)}
                      placeholder="e.g. Milestone 2 - Frontend & Cloud Integration"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>
                </div>
              </div>

              {/* PAYMENT METHOD SELECTOR */}
              <div className="bg-white border border-violet-100 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-violet-600" />
                    2. Select Payment Method
                  </h3>
                  <span className="text-[11px] text-emerald-700 flex items-center gap-1 font-bold">
                    <Lock className="w-3 h-3" /> TLS 1.3 Verified
                  </span>
                </div>

                {/* Method Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-violet-50 border-violet-600 text-slate-900 shadow-xs ring-1 ring-violet-500/40'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50/30'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 mb-1.5 text-violet-600" />
                    <div className="text-xs font-bold text-slate-900">Credit / Debit</div>
                    <div className="text-[10px] text-slate-500">Visa, MC, Amex</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wire')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'wire'
                        ? 'bg-violet-50 border-violet-600 text-slate-900 shadow-xs ring-1 ring-violet-500/40'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50/30'
                    }`}
                  >
                    <Building2 className="w-5 h-5 mb-1.5 text-emerald-600" />
                    <div className="text-xs font-bold text-slate-900">Bank Wire / SWIFT</div>
                    <div className="text-[10px] text-slate-500">0% Surcharge</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'wallet'
                        ? 'bg-violet-50 border-violet-600 text-slate-900 shadow-xs ring-1 ring-violet-500/40'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50/30'
                    }`}
                  >
                    <Zap className="w-5 h-5 mb-1.5 text-amber-600" />
                    <div className="text-xs font-bold text-slate-900">Digital Checkout</div>
                    <div className="text-[10px] text-slate-500">Stripe, PayPal, GCash</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('po')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      paymentMethod === 'po'
                        ? 'bg-violet-50 border-violet-600 text-slate-900 shadow-xs ring-1 ring-violet-500/40'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-violet-300 hover:bg-violet-50/30'
                    }`}
                  >
                    <FileCheck className="w-5 h-5 mb-1.5 text-sky-600" />
                    <div className="text-xs font-bold text-slate-900">Purchase Order</div>
                    <div className="text-[10px] text-slate-500">Net-30 / Escrow</div>
                  </button>
                </div>

                {/* ── SUB-FORM: CREDIT / DEBIT CARD ── */}
                {paymentMethod === 'card' && (
                  <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 space-y-3.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-700 font-semibold">Card Information</span>
                      <span className="text-[11px] text-slate-600 font-mono">
                        Brand detected:{' '}
                        <strong className="text-violet-700">{cardBrand}</strong>
                      </span>
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        placeholder="•••• •••• •••• ••••"
                        maxLength={19}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono text-sm tracking-wider placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-slate-700 mb-1 text-[11px] font-semibold">Expires (MM/YY)</label>
                        <input
                          type="text"
                          required
                          value={cardExpiry}
                          onChange={(e) => handleExpiryChange(e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono text-xs placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 mb-1 text-[11px] font-semibold">CVC / CVV</label>
                        <input
                          type="password"
                          required
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          placeholder="•••"
                          maxLength={4}
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono text-xs placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 mb-1 text-[11px] font-semibold">Postal / ZIP</label>
                        <input
                          type="text"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          placeholder="ZIP Code"
                          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1 text-[11px] font-semibold">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        placeholder="Name as it appears on card"
                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                      />
                    </div>
                  </div>
                )}

                {/* ── SUB-FORM: BANK WIRE / SWIFT DETAILS ── */}
                {paymentMethod === 'wire' && (
                  <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4 text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                      <div>
                        <div className="font-bold text-slate-900 text-sm">Official Bank Remittance Details</div>
                        <div className="text-[11px] text-slate-500">
                          Direct SWIFT / Domestic Wire to OPERAVA Corporate Account
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold uppercase">
                          0% Gateway Surcharge
                        </span>
                      </div>
                    </div>

                    {/* Wire details list with copy buttons */}
                    <div className="space-y-2.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                        <div>
                          <span className="text-slate-500 block text-[10px]">Beneficiary Account Name</span>
                          <span className="text-slate-900 font-sans font-bold">OPERAVA GLOBAL SOLUTIONS OPC</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy('OPERAVA GLOBAL SOLUTIONS OPC', 'beneficiary')}
                          className="p-1.5 rounded text-slate-600 hover:text-violet-700 bg-slate-100 hover:bg-violet-50 transition-colors"
                          title="Copy Beneficiary Name"
                        >
                          {copiedField === 'beneficiary' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                          <div>
                            <span className="text-slate-500 block text-[10px]">Bank Name & Branch</span>
                            <span className="text-slate-900 font-sans font-semibold">BDO Unibank / Ortigas Pasig</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy('BDO Unibank, Inc. Ortigas Center Branch', 'bank')}
                            className="p-1.5 rounded text-slate-600 hover:text-violet-700 bg-slate-100 hover:bg-violet-50 transition-colors"
                          >
                            {copiedField === 'bank' ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                          <div>
                            <span className="text-slate-500 block text-[10px]">SWIFT / BIC Code</span>
                            <span className="text-violet-700 font-bold">BNORPHMMXXX</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy('BNORPHMMXXX', 'swift')}
                            className="p-1.5 rounded text-slate-600 hover:text-violet-700 bg-slate-100 hover:bg-violet-50 transition-colors"
                          >
                            {copiedField === 'swift' ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 shadow-xs">
                        <div>
                          <span className="text-slate-500 block text-[10px]">Account Number (Multi-Currency USD / PHP)</span>
                          <span className="text-emerald-700 font-bold tracking-wider">108-924-004-819</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopy('108924004819', 'account')}
                          className="p-1.5 rounded text-slate-600 hover:text-violet-700 bg-slate-100 hover:bg-violet-50 transition-colors"
                        >
                          {copiedField === 'account' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Unique Remittance Reference */}
                      <div className="p-3 rounded-xl bg-violet-100/90 border border-violet-200 text-violet-950">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-violet-800 text-[10px] uppercase font-bold tracking-wider">
                              Required Remittance Memo / Wire Reference:
                            </span>
                            <div className="text-sm font-bold text-violet-950 font-mono mt-0.5">
                              {wireReferenceCode} - {invoiceNumber || 'DIRECT'}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleCopy(`${wireReferenceCode} - ${invoiceNumber}`, 'memo')}
                            className="px-2.5 py-1 rounded-md bg-violet-600 hover:bg-violet-700 text-white text-[10px] font-sans font-bold transition-colors flex items-center gap-1 shadow-xs"
                          >
                            {copiedField === 'memo' ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-300" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" /> Copy Memo
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[10px] text-violet-800 mt-1 font-sans">
                          Include this reference in your bank wire description so our finance department can automatically match and settle your account.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── SUB-FORM: DIGITAL CHECKOUT (STRIPE / PAYPAL / GCASH) ── */}
                {paymentMethod === 'wallet' && (
                  <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 space-y-3 text-xs">
                    <span className="text-slate-700 block font-semibold">Select Instant Payment Gateway:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setWalletType('stripe')}
                        className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                          walletType === 'stripe'
                            ? 'bg-violet-600 border-violet-600 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-violet-50/50 hover:border-violet-300'
                        }`}
                      >
                        Stripe Checkout
                      </button>
                      <button
                        type="button"
                        onClick={() => setWalletType('paypal')}
                        className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                          walletType === 'paypal'
                            ? 'bg-violet-600 border-violet-600 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-violet-50/50 hover:border-violet-300'
                        }`}
                      >
                        PayPal Express
                      </button>
                      <button
                        type="button"
                        onClick={() => setWalletType('gcash')}
                        className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                          walletType === 'gcash'
                            ? 'bg-violet-600 border-violet-600 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-violet-50/50 hover:border-violet-300'
                        }`}
                      >
                        GCash QR
                      </button>
                      <button
                        type="button"
                        onClick={() => setWalletType('maya')}
                        className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                          walletType === 'maya'
                            ? 'bg-violet-600 border-violet-600 text-white shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-violet-50/50 hover:border-violet-300'
                        }`}
                      >
                        Maya Business
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                      You will be prompted to authenticate your session through our secure hosted checkout window.
                    </p>
                  </div>
                )}

                {/* ── SUB-FORM: PURCHASE ORDER / NET-30 ── */}
                {paymentMethod === 'po' && (
                  <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 space-y-3 text-xs">
                    <label className="block text-slate-700 font-semibold">
                      Corporate Purchase Order # or MSA Agreement ID
                    </label>
                    <input
                      type="text"
                      value={poNumber}
                      onChange={(e) => setPoNumber(e.target.value)}
                      placeholder="e.g. PO-2026-CORP-991"
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 font-mono text-xs placeholder-slate-400 focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                    />
                    <p className="text-[11px] text-slate-500">
                      Standard corporate Net-30 credit terms are available for approved enterprise accounts with signed Master Service Agreements.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: CURRENCY, BREAKDOWN & SECURE CHECKOUT (5 COLS) */}
            <div className="lg:col-span-5 space-y-6">
              {/* ORDER SUMMARY & AMOUNT INPUT */}
              <div className="bg-white border border-violet-100 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5 sticky top-24">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    Payment Summary
                  </h3>
                  <div className="text-[11px] px-2.5 py-0.5 rounded bg-violet-100 text-violet-800 border border-violet-200 font-mono font-bold">
                    {invoiceNumber || 'CUSTOM'}
                  </div>
                </div>

                {/* Currency Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Settlement Currency
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {CURRENCIES.map((curr) => (
                      <button
                        key={curr.code}
                        type="button"
                        onClick={() => setSelectedCurrency(curr.code)}
                        className={`px-2 py-1.5 rounded-lg border text-center text-xs font-bold transition-all ${
                          selectedCurrency === curr.code
                            ? 'bg-violet-600 border-violet-600 text-white shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-violet-50/50 hover:border-violet-300'
                        }`}
                      >
                        {curr.code} ({curr.symbol})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Amount to Pay ({currencyObj.code})
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">
                      {currencyObj.symbol}
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      required
                      value={rawAmount || ''}
                      onChange={(e) => setRawAmount(parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-3 text-lg font-mono font-bold text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-violet-600 focus:ring-2 focus:ring-violet-500/20"
                    />
                  </div>
                </div>

                {/* Cross-border export tax status toggle */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-800 font-semibold">International / Zero-Rated VAT</span>
                    <button
                      type="button"
                      onClick={() => setIsCrossBorderExport(!isCrossBorderExport)}
                      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        isCrossBorderExport ? 'bg-violet-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          isCrossBorderExport ? 'translate-x-4' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {isCrossBorderExport
                      ? '0% VAT applicable for qualified foreign/cross-border clients (Export of IT/BPO Services).'
                      : 'Standard 12% Philippine VAT will be applied for domestic Philippine entities.'}
                  </p>
                </div>

                {/* Line Items Breakdown */}
                <div className="space-y-2.5 pt-2 text-xs border-t border-slate-200">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Amount:</span>
                    <span className="font-mono font-semibold text-slate-900">
                      {currencyObj.symbol}
                      {subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>VAT / Tax ({isCrossBorderExport ? '0%' : '12%'}):</span>
                    <span className="font-mono font-semibold text-slate-900">
                      {currencyObj.symbol}
                      {taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex justify-between text-slate-600">
                    <span>
                      Payment Processing (
                      {paymentMethod === 'wire' || paymentMethod === 'po' ? '0% Wire' : paymentMethod === 'card' ? '2.9%' : '2.5%'}
                      ):
                    </span>
                    <span className="font-mono font-semibold text-slate-900">
                      {currencyObj.symbol}
                      {gatewayFee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-3 border-t border-slate-200 text-sm">
                    <span className="font-bold text-slate-900">Total Amount:</span>
                    <div className="text-right">
                      <span className="text-xl font-black text-violet-700 font-mono">
                        {currencyObj.symbol}
                        {totalPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold block">{currencyObj.code}</span>
                    </div>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleProcessPayment}
                  className="w-full py-3.5 px-6 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 text-white font-bold text-sm tracking-wide transition-all duration-200 shadow-md shadow-violet-600/20 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      Authorizing 256-Bit Payment...
                    </>
                  ) : paymentMethod === 'wire' ? (
                    <>
                      <FileCheck className="w-4 h-4 text-emerald-300" />
                      Confirm Bank Wire / Generate Notice
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-violet-200" />
                      Settle Payment Now ({currencyObj.symbol}
                      {totalPayable.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Direct Help & Refund Policy reassurance */}
                <div className="text-[11px] text-slate-500 text-center space-y-1 pt-1">
                  <div>
                    Need assistance or custom invoicing? Contact{' '}
                    <a
                      href="mailto:billing@operavaglobal.com"
                      className="text-violet-700 hover:underline font-bold"
                    >
                      billing@operavaglobal.com
                    </a>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    All payments subject to our{' '}
                    <Link to="/refund-policy" className="text-violet-700 hover:underline font-medium">
                      Refund Policy
                    </Link>{' '}
                    and{' '}
                    <Link to="/terms" className="text-violet-700 hover:underline font-medium">
                      Terms of Service
                    </Link>
                    .
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── FREQUENTLY ASKED BILLING QUESTIONS & COMPLIANCE ── */}
        <div className="mt-16 pt-12 border-t border-violet-100">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
              Billing & Invoicing Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear, transparent financial guidelines for our enterprise clients globally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-xs sm:text-sm">
            <div className="bg-white border border-violet-100 rounded-2xl p-5 space-y-2 shadow-xs">
              <h4 className="font-bold text-slate-900">
                Will I receive an official tax invoice and receipt?
              </h4>
              <p className="text-slate-600 leading-relaxed text-xs">
                Yes. Upon successful authorization or bank remittance clearance, OPERAVA Global Solutions issues an official electronic receipt and BIR-compliant invoice with your company’s VAT/TIN details directly to your billing email.
              </p>
            </div>

            <div className="bg-white border border-violet-100 rounded-2xl p-5 space-y-2 shadow-xs">
              <h4 className="font-bold text-slate-900">
                How long do international wire transfers take to clear?
              </h4>
              <p className="text-slate-600 leading-relaxed text-xs">
                SWIFT and cross-border bank wires typically clear within 1 to 3 international business days. As long as your unique Wire Reference Code is included in the bank memo, your project balance is automatically matched.
              </p>
            </div>

            <div className="bg-white border border-violet-100 rounded-2xl p-5 space-y-2 shadow-xs">
              <h4 className="font-bold text-slate-900">
                What currencies are accepted without conversion loss?
              </h4>
              <p className="text-slate-600 leading-relaxed text-xs">
                We accept payments directly in USD, PHP, EUR, GBP, AUD, SGD, CAD, and JPY. You can select your preferred billing currency on this portal to match your local corporate accounts.
              </p>
            </div>

            <div className="bg-white border border-violet-100 rounded-2xl p-5 space-y-2 shadow-xs">
              <h4 className="font-bold text-slate-900">
                How are milestone refunds or billing disputes handled?
              </h4>
              <p className="text-slate-600 leading-relaxed text-xs">
                All transactions are governed by our official{' '}
                <Link to="/refund-policy" className="text-violet-700 underline font-bold">
                  Refund Policy
                </Link>
                . Billing disputes or scope credit inquiries are reviewed by our finance committee with decisions issued within 30 business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
