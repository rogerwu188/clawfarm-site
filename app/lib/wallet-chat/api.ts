import type { SolanaNetworkId } from '@/app/lib/network/config'

export type WalletPaymentChain = 'solana-devnet' | 'solana-mainnet'

export type WalletChatModel = {
  id: string
  name?: string
  api?: string
  api_url?: string
  pricing?: {
    prompt?: string
    completion?: string
  }
  object?: string
  created?: number
  owned_by?: string
}

export type WalletBrowserChainConfig = {
  chain: WalletPaymentChain
  enabled: boolean
  usdc_mint: string
  usdc_decimals: number
  payment_delegate: string
}

export type WalletBrowserConfigResponse = {
  enabled: boolean
  settlement_mode: string
  max_output_tokens?: number
  chains: WalletBrowserChainConfig[]
}

export type WalletChatMessage = {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export type WalletPaymentMetadata = {
  requestNonce: string | null
  paymentStatus: string | null
  maxChargeAtomic: string | null
  chargeAtomic: string | null
  settlementTx: string | null
  sessionId: string | null
  sessionSpentAtomic: string | null
  sessionReservedAtomic: string | null
  sessionRequestsUsed: string | null
}

export type WalletPaymentSession = {
  sessionId: string
  wallet: string
  chain: WalletPaymentChain
  protocol: string
  allowedModels: string[]
  maxPerRequestAtomic: string
  totalBudgetAtomic: string
  spentAtomic: string
  reservedAtomic: string
  requestsUsed: number
  maxRequests: number
  expiresAt: number
  status?: string
}

export type WalletAuthInput = {
  walletPubkey: string
  chain: WalletPaymentChain
  model: string
  maxChargeAtomic: string
  signMessage: (message: Uint8Array) => Promise<Uint8Array>
  quoteId?: string
}

export type LoadWalletChatModelsInput = {
  gatewayUrl: string
  walletPubkey: string
  chain: WalletPaymentChain
  signMessage: (message: Uint8Array) => Promise<Uint8Array>
}

export type SendWalletChatInput = {
  gatewayUrl: string
  walletPubkey: string
  chain: WalletPaymentChain
  model: string
  maxTokens: number
  maxChargeAtomic: string
  messages: WalletChatMessage[]
  signMessage?: (message: Uint8Array) => Promise<Uint8Array>
  session?: WalletPaymentSession | null
  walletPaymentConfig?: Pick<WalletBrowserConfigResponse, 'max_output_tokens'> | null
}

export type SendWalletChatResult = {
  assistantContent: string
  metadata: WalletPaymentMetadata
}

type ModelsResponse = {
  data?: WalletChatModel[]
}

type OpenAIChatResponse = {
  choices?: Array<{
    message?: {
      content?: unknown
    }
    delta?: {
      content?: unknown
    }
    text?: unknown
  }>
}

type LoadWalletPaymentConfigInput = {
  gatewayUrl: string
}

const PAYMENT_DOMAIN = 'clawfarm.payment.v1'
const PAYMENT_SESSION_DOMAIN = 'clawfarm.payment.session.v1'
const PAYMENT_PROTOCOL = 'openai-completions'
const MODEL_AUTH_SENTINEL = 'models'
const SESSION_RENEWAL_ERROR_CODES = new Set([
  'session_expired',
  'session_exhausted',
  'session_not_found',
  'session_budget_exceeded',
  'session_request_cap_exceeded',
])

export const CLAWFARM_GATEWAY_URL = process.env.NEXT_PUBLIC_CLAWFARM_GATEWAY_URL || ''
export const WALLET_CHAT_MAX_OUTPUT_TOKENS = getConfiguredMaxOutputTokens()
export const DEFAULT_WALLET_CHAT_MAX_CHARGE_ATOMIC = '1'

export class WalletChatError extends Error {
  code: string
  status?: number

  constructor(code: string, message: string, status?: number) {
    super(message)
    this.name = 'WalletChatError'
    this.code = code
    this.status = status
  }
}

export function networkIdToPaymentChain(networkId: SolanaNetworkId): WalletPaymentChain {
  return networkId === 'devnet' ? 'solana-devnet' : 'solana-mainnet'
}

export function normalizeGatewayUrl(value: string): string {
  return value.trim().replace(/\/+$/, '')
}

export function buildGatewayUrl(gatewayUrl: string, path: string): string {
  const base = normalizeGatewayUrl(gatewayUrl)
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalizedPath}`
}

export function buildWalletConfigUrl(gatewayUrl: string): string {
  return buildGatewayUrl(gatewayUrl, '/clawfarm/v1/wallet/config')
}

export function buildModelsUrl(gatewayUrl: string): string {
  return buildGatewayUrl(gatewayUrl, '/clawfarm/v1/models')
}

export function buildChatCompletionsUrl(gatewayUrl: string): string {
  return buildGatewayUrl(gatewayUrl, '/clawfarm/chat/completions')
}

export function buildWalletSessionsUrl(gatewayUrl: string): string {
  return buildGatewayUrl(gatewayUrl, '/clawfarm/v1/wallet/sessions')
}

export function isWalletChatModel(value: WalletChatModel): boolean {
  return value.api === PAYMENT_PROTOCOL && !value.id.startsWith('clawfarm/')
}

export function effectiveWalletChatMaxOutputTokens(
  config: Pick<WalletBrowserConfigResponse, 'max_output_tokens'> | null | undefined
): number {
  const gatewayLimit = config?.max_output_tokens
  if (Number.isSafeInteger(gatewayLimit) && gatewayLimit && gatewayLimit > 0) {
    return Math.min(WALLET_CHAT_MAX_OUTPUT_TOKENS, gatewayLimit)
  }
  return WALLET_CHAT_MAX_OUTPUT_TOKENS
}

export function estimateWalletChatMaxChargeAtomic(input: {
  maxTokens: number | string
  model: Pick<WalletChatModel, 'pricing'> | null | undefined
}): string {
  const maxTokens = typeof input.maxTokens === 'number'
    ? input.maxTokens
    : Number(String(input.maxTokens).trim())
  const completionPrice = Number(input.model?.pricing?.completion?.trim() || '0')
  if (!Number.isSafeInteger(maxTokens) || maxTokens <= 0 || !Number.isFinite(completionPrice) || completionPrice <= 0) {
    return DEFAULT_WALLET_CHAT_MAX_CHARGE_ATOMIC
  }

  const atomic = Math.ceil(maxTokens * completionPrice)
  return String(Math.max(1, atomic))
}

export function nextWalletChatMaxChargeAtomic(input: {
  currentMaxChargeAtomic: string
  estimatedMaxChargeAtomic: string
  userEditedMaxCharge: boolean
}): string {
  return input.userEditedMaxCharge ? input.currentMaxChargeAtomic : input.estimatedMaxChargeAtomic
}

export function selectWalletPaymentChainConfig(
  config: WalletBrowserConfigResponse,
  chain: WalletPaymentChain
): WalletBrowserChainConfig {
  if (!config.enabled) {
    throw new WalletChatError('WALLET_CONFIG_DISABLED', 'ClawFarm wallet payments are not enabled by this Gateway.')
  }
  if (config.settlement_mode !== 'sync_after_upstream') {
    throw new WalletChatError('WALLET_CONFIG_INVALID', 'Gateway wallet settlement mode is unsupported.')
  }

  const chainConfig = config.chains.find((item) => item.chain === chain)
  if (!chainConfig || !chainConfig.enabled) {
    throw new WalletChatError('WALLET_CHAIN_DISABLED', `ClawFarm wallet payments are not enabled for ${chain}.`)
  }
  if (
    !chainConfig.usdc_mint ||
    !chainConfig.payment_delegate ||
    !Number.isSafeInteger(chainConfig.usdc_decimals) ||
    chainConfig.usdc_decimals < 0
  ) {
    throw new WalletChatError('WALLET_CONFIG_INVALID', 'Gateway wallet payment config is invalid.')
  }
  return chainConfig
}

export function parsePositiveInteger(value: string, fieldName: string): number {
  const trimmed = value.trim()
  if (!/^\d+$/.test(trimmed)) {
    throw new WalletChatError('INVALID_INPUT', `${fieldName} must be a positive whole number.`)
  }
  const parsed = Number(trimmed)
  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    throw new WalletChatError('INVALID_INPUT', `${fieldName} must be a positive whole number.`)
  }
  return parsed
}

function getConfiguredMaxOutputTokens(): number {
  const rawValue = process.env.NEXT_PUBLIC_WALLET_CHAT_MAX_OUTPUT_TOKENS?.trim()
  if (!rawValue) return 512

  const parsed = Number(rawValue)
  if (!Number.isSafeInteger(parsed) || parsed <= 0) return 512
  return parsed
}

export function createPaymentNonce(): string {
  const random = new Uint8Array(12)
  crypto.getRandomValues(random)
  return `clawfarm_${Date.now()}_${bytesToBase64Url(random)}`
}

export function createPaymentSessionNonce(): string {
  const random = new Uint8Array(12)
  crypto.getRandomValues(random)
  return `clawfarm_session_${Date.now()}_${bytesToBase64Url(random)}`
}

export function createQuoteId(): string {
  const random = new Uint8Array(8)
  crypto.getRandomValues(random)
  return `q_web_${Date.now()}_${bytesToBase64Url(random)}`
}

export function canonicalPaymentIntentJson(input: {
  walletPubkey: string
  chain: WalletPaymentChain
  model: string
  maxChargeAtomic: string
  nonce: string
  expiresAt: number
  quoteId?: string
}): string {
  if (input.quoteId) {
    return JSON.stringify({
      domain: PAYMENT_DOMAIN,
      chain: input.chain,
      wallet: input.walletPubkey,
      quote_id: input.quoteId,
      model: input.model,
      protocol: PAYMENT_PROTOCOL,
      max_charge_atomic: input.maxChargeAtomic,
      nonce: input.nonce,
      expires_at: input.expiresAt,
    })
  }

  return JSON.stringify({
    domain: PAYMENT_DOMAIN,
    chain: input.chain,
    wallet: input.walletPubkey,
    model: input.model,
    protocol: PAYMENT_PROTOCOL,
    max_charge_atomic: input.maxChargeAtomic,
    nonce: input.nonce,
    expires_at: input.expiresAt,
  })
}

export function canonicalPaymentSessionIntentJson(input: {
  walletPubkey: string
  chain: WalletPaymentChain
  allowedModels: string[]
  maxPerRequestAtomic: string
  totalBudgetAtomic: string
  maxRequests: number
  nonce: string
  expiresAt: number
}): string {
  return JSON.stringify({
    domain: PAYMENT_SESSION_DOMAIN,
    chain: input.chain,
    wallet: input.walletPubkey,
    protocol: PAYMENT_PROTOCOL,
    allowed_models: input.allowedModels,
    max_per_request_atomic: input.maxPerRequestAtomic,
    total_budget_atomic: input.totalBudgetAtomic,
    max_requests: input.maxRequests,
    nonce: input.nonce,
    expires_at: input.expiresAt,
  })
}

export async function createWalletAuthHeaders(input: WalletAuthInput): Promise<{
  headers: Record<string, string>
  nonce: string
  expiresAt: number
}> {
  const maxChargeAtomic = String(parsePositiveInteger(input.maxChargeAtomic, 'Max charge atomic'))
  const nonce = createPaymentNonce()
  const expiresAt = Math.floor(Date.now() / 1000) + 5 * 60
  const canonicalJson = canonicalPaymentIntentJson({
    walletPubkey: input.walletPubkey,
    chain: input.chain,
    model: input.model,
    maxChargeAtomic,
    nonce,
    expiresAt,
    quoteId: input.quoteId,
  })
  const canonicalBytes = new TextEncoder().encode(canonicalJson)
  const signature = await input.signMessage(canonicalBytes)

  return {
    nonce,
    expiresAt,
    headers: {
      Authorization: `Bearer wallet-${input.chain}-${input.walletPubkey}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-ClawFarm-Wallet': input.walletPubkey,
      'X-ClawFarm-Payment-Intent': bytesToBase64Url(canonicalBytes),
      'X-ClawFarm-Payment-Signature': bytesToBase64(signature),
    },
  }
}

export async function loadWalletPaymentConfig(
  input: LoadWalletPaymentConfigInput
): Promise<WalletBrowserConfigResponse> {
  const gatewayUrl = assertGatewayUrl(input.gatewayUrl)

  let response: Response
  try {
    response = await fetch(buildWalletConfigUrl(gatewayUrl), {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
  } catch (error) {
    console.error('ClawFarm wallet payment config request failed', error)
    throw new WalletChatError('GATEWAY_UNREACHABLE', 'Gateway payment config is unavailable.')
  }

  const payload = await readJsonResponse<WalletBrowserConfigResponse>(response)
  if (!response.ok) {
    throw gatewayErrorFromPayload(payload, response.status, 'Gateway payment config is unavailable.')
  }
  if (!payload || typeof payload !== 'object' || !Array.isArray(payload.chains)) {
    throw new WalletChatError('INVALID_GATEWAY_RESPONSE', 'Gateway payment config is invalid.')
  }
  return payload
}

export async function loadWalletChatModels(input: LoadWalletChatModelsInput): Promise<WalletChatModel[]> {
  const gatewayUrl = assertGatewayUrl(input.gatewayUrl)
  const auth = await createWalletAuthHeaders({
    walletPubkey: input.walletPubkey,
    chain: input.chain,
    model: MODEL_AUTH_SENTINEL,
    maxChargeAtomic: '1',
    signMessage: input.signMessage,
  })

  let response: Response
  try {
    response = await fetch(buildModelsUrl(gatewayUrl), {
      method: 'GET',
      headers: auth.headers,
    })
  } catch (error) {
    console.error('ClawFarm model list request failed', error)
    throw new WalletChatError('GATEWAY_UNREACHABLE', 'ClawFarm Gateway is unreachable.')
  }

  const payload = await readJsonResponse<ModelsResponse>(response)
  if (!response.ok) {
    throw gatewayErrorFromPayload(payload, response.status, 'Gateway could not load wallet chat models.')
  }

  const models = Array.isArray(payload.data) ? payload.data : []
  return models.filter(isWalletChatModel)
}

export async function createWalletPaymentSession(input: {
  gatewayUrl: string
  walletPubkey: string
  chain: WalletPaymentChain
  maxPerRequestAtomic: string
  totalBudgetAtomic: string
  maxRequests: number
  signMessage: (message: Uint8Array) => Promise<Uint8Array>
}): Promise<WalletPaymentSession> {
  const gatewayUrl = assertGatewayUrl(input.gatewayUrl)
  const maxPerRequestAtomic = String(parsePositiveInteger(input.maxPerRequestAtomic, 'Max per-request charge'))
  const totalBudgetAtomic = String(parsePositiveInteger(input.totalBudgetAtomic, 'Session total budget'))
  if (!Number.isSafeInteger(input.maxRequests) || input.maxRequests <= 0) {
    throw new WalletChatError('INVALID_INPUT', 'Session max requests must be a positive whole number.')
  }

  const nonce = createPaymentSessionNonce()
  const expiresAt = Math.floor(Date.now() / 1000) + 10 * 60
  const canonicalJson = canonicalPaymentSessionIntentJson({
    walletPubkey: input.walletPubkey,
    chain: input.chain,
    allowedModels: ['*'],
    maxPerRequestAtomic,
    totalBudgetAtomic,
    maxRequests: input.maxRequests,
    nonce,
    expiresAt,
  })
  const canonicalBytes = new TextEncoder().encode(canonicalJson)
  const signature = await input.signMessage(canonicalBytes)

  let response: Response
  try {
    response = await fetch(buildWalletSessionsUrl(gatewayUrl), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-ClawFarm-Wallet': input.walletPubkey,
        'X-ClawFarm-Session-Intent': bytesToBase64Url(canonicalBytes),
        'X-ClawFarm-Session-Signature': bytesToBase64(signature),
      },
    })
  } catch (error) {
    console.error('ClawFarm wallet session request failed', error)
    throw new WalletChatError('GATEWAY_UNREACHABLE', 'ClawFarm Gateway could not create a wallet payment session.')
  }

  const payload = await readJsonResponse<unknown>(response)
  if (!response.ok) {
    throw gatewayErrorFromPayload(payload, response.status, 'Gateway could not create a wallet payment session.')
  }
  return normalizeWalletPaymentSession(payload)
}

export async function sendWalletChatCompletion(input: SendWalletChatInput): Promise<SendWalletChatResult> {
  const gatewayUrl = assertGatewayUrl(input.gatewayUrl)
  const maxTokens = parsePositiveInteger(String(input.maxTokens), 'Max tokens')
  const maxOutputTokens = effectiveWalletChatMaxOutputTokens(input.walletPaymentConfig)
  if (maxTokens > maxOutputTokens) {
    throw new WalletChatError('INVALID_INPUT', `Max tokens must be ${maxOutputTokens} or less.`)
  }
  const maxChargeAtomic = String(parsePositiveInteger(input.maxChargeAtomic, 'Max charge atomic'))
  const headers = input.session
    ? walletSessionHeaders(input)
    : (await createWalletAuthHeaders({
      walletPubkey: input.walletPubkey,
      chain: input.chain,
      model: input.model,
      maxChargeAtomic,
      signMessage: requireSignMessage(input.signMessage),
      quoteId: createQuoteId(),
    })).headers

  let response: Response
  try {
    response = await fetch(buildChatCompletionsUrl(gatewayUrl), {
      method: 'POST',
      headers,
      body: JSON.stringify({
        model: input.model,
        max_tokens: maxTokens,
        stream: false,
        messages: input.messages,
      }),
    })
  } catch (error) {
    console.error('ClawFarm chat completion request failed', error)
    throw new WalletChatError('GATEWAY_UNREACHABLE', 'ClawFarm Gateway is unreachable.')
  }

  const metadata = paymentMetadataFromHeaders(response.headers)
  const payload = await readJsonResponse<OpenAIChatResponse>(response)
  if (!response.ok) {
    const error = gatewayErrorFromPayload(payload, response.status, 'Gateway could not complete the chat request.')
    error.message = appendRequestNonce(error.message, metadata.requestNonce)
    throw error
  }

  return {
    assistantContent: extractAssistantContent(payload),
    metadata,
  }
}

export function paymentMetadataFromHeaders(headers: Headers): WalletPaymentMetadata {
  return {
    requestNonce: headers.get('X-ClawFarm-Request-Nonce'),
    paymentStatus: headers.get('X-ClawFarm-Payment-Status'),
    maxChargeAtomic: headers.get('X-ClawFarm-Max-Charge-Atomic'),
    chargeAtomic: headers.get('X-ClawFarm-Charge-Atomic'),
    settlementTx: headers.get('X-ClawFarm-Settlement-Tx'),
    sessionId: headers.get('X-ClawFarm-Session-ID'),
    sessionSpentAtomic: headers.get('X-ClawFarm-Session-Spent-Atomic'),
    sessionReservedAtomic: headers.get('X-ClawFarm-Session-Reserved-Atomic'),
    sessionRequestsUsed: headers.get('X-ClawFarm-Session-Requests-Used'),
  }
}

export function walletSessionStorageKey(gatewayUrl: string, chain: string, walletAddress: string): string {
  return `clawfarm.walletSession.${normalizeGatewayUrl(gatewayUrl)}.${chain}.${walletAddress}.${PAYMENT_PROTOCOL}`
}

export function isWalletPaymentSessionReady(session: WalletPaymentSession | null | undefined, nowSeconds = Math.floor(Date.now() / 1000)): boolean {
  return Boolean(session && session.expiresAt > nowSeconds && (!session.status || session.status === 'active'))
}

export function isWalletPaymentSessionRenewalError(error: unknown): boolean {
  return error instanceof WalletChatError && SESSION_RENEWAL_ERROR_CODES.has(error.code)
}

export function isUnsupportedWalletChatModelError(error: unknown): boolean {
  if (!(error instanceof WalletChatError)) return false
  return /暂不支持该模型|model is not currently supported|unsupported model|model_not_supported/i.test(error.message)
}

function assertGatewayUrl(value: string): string {
  const gatewayUrl = normalizeGatewayUrl(value)
  if (!gatewayUrl) {
    throw new WalletChatError(
      'GATEWAY_URL_MISSING',
      'NEXT_PUBLIC_CLAWFARM_GATEWAY_URL is not configured for this build.'
    )
  }
  return gatewayUrl
}

async function readJsonResponse<T>(response: Response): Promise<T> {
  try {
    return (await response.json()) as T
  } catch (error) {
    console.error('ClawFarm Gateway returned non-JSON response', error)
    throw new WalletChatError('INVALID_GATEWAY_RESPONSE', `Gateway returned invalid JSON with HTTP ${response.status}.`, response.status)
  }
}

function gatewayErrorFromPayload(payload: unknown, status: number, fallback: string): WalletChatError {
  const message = extractGatewayErrorMessage(payload) || fallback
  const code = extractGatewayErrorCode(payload) || 'GATEWAY_ERROR'
  return new WalletChatError(code, `${message} (HTTP ${status})`, status)
}

function requireSignMessage(signMessage: SendWalletChatInput['signMessage']): (message: Uint8Array) => Promise<Uint8Array> {
  if (!signMessage) {
    throw new WalletChatError('WALLET_SIGN_MESSAGE_UNAVAILABLE', 'This wallet cannot authorize ClawFarm chat because it does not support message signing.')
  }
  return signMessage
}

function walletSessionHeaders(input: SendWalletChatInput): Record<string, string> {
  if (!input.session) {
    throw new WalletChatError('SESSION_REQUIRED', 'Start a ClawFarm payment session before sending messages.')
  }
  if (!isWalletPaymentSessionReady(input.session)) {
    throw new WalletChatError('session_expired', 'ClawFarm payment session expired. Start a new chat session.')
  }

  return {
    Authorization: `Bearer wallet-${input.chain}-${input.walletPubkey}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-ClawFarm-Wallet': input.walletPubkey,
    'X-ClawFarm-Session-ID': input.session.sessionId,
  }
}

function normalizeWalletPaymentSession(payload: unknown): WalletPaymentSession {
  if (!payload || typeof payload !== 'object') {
    throw new WalletChatError('INVALID_GATEWAY_RESPONSE', 'Gateway wallet payment session response is invalid.')
  }
  const record = payload as Record<string, unknown>
  const session = {
    sessionId: stringField(record, 'session_id'),
    wallet: stringField(record, 'wallet'),
    chain: stringField(record, 'chain') as WalletPaymentChain,
    protocol: stringField(record, 'protocol'),
    allowedModels: arrayStringField(record, 'allowed_models'),
    maxPerRequestAtomic: stringField(record, 'max_per_request_atomic'),
    totalBudgetAtomic: stringField(record, 'total_budget_atomic'),
    spentAtomic: stringField(record, 'spent_atomic'),
    reservedAtomic: stringField(record, 'reserved_atomic'),
    requestsUsed: numberField(record, 'requests_used'),
    maxRequests: numberField(record, 'max_requests'),
    expiresAt: numberField(record, 'expires_at'),
    status: typeof record.status === 'string' ? record.status : undefined,
  }
  if (!session.sessionId || !session.wallet || !session.chain || !session.protocol || !session.expiresAt) {
    throw new WalletChatError('INVALID_GATEWAY_RESPONSE', 'Gateway wallet payment session response is incomplete.')
  }
  return session
}

function stringField(record: Record<string, unknown>, fieldName: string): string {
  const value = record[fieldName]
  return typeof value === 'string' ? value : ''
}

function numberField(record: Record<string, unknown>, fieldName: string): number {
  const value = record[fieldName]
  return typeof value === 'number' && Number.isFinite(value) ? value : 0
}

function arrayStringField(record: Record<string, unknown>, fieldName: string): string[] {
  const value = record[fieldName]
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function extractGatewayErrorMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== 'object') return null
  const record = payload as Record<string, unknown>
  if (typeof record.message === 'string') return record.message
  if (record.error && typeof record.error === 'object') {
    const error = record.error as Record<string, unknown>
    if (typeof error.message === 'string') return error.message
  }
  return null
}

function extractGatewayErrorCode(payload: unknown): string | null {
  if (!payload || typeof payload !== 'object') return null
  const record = payload as Record<string, unknown>
  if (typeof record.code === 'string') return record.code
  if (record.error && typeof record.error === 'object') {
    const error = record.error as Record<string, unknown>
    if (typeof error.code === 'string') return error.code
    if (typeof error.type === 'string') return error.type
  }
  return null
}

function extractAssistantContent(payload: OpenAIChatResponse): string {
  const choice = payload.choices?.[0]
  const content = choice?.message?.content ?? choice?.delta?.content ?? choice?.text
  if (typeof content === 'string' && content.trim()) return content
  if (Array.isArray(content)) {
    const joined = content
      .map((part) => {
        if (typeof part === 'string') return part
        if (part && typeof part === 'object' && typeof (part as { text?: unknown }).text === 'string') {
          return (part as { text: string }).text
        }
        return ''
      })
      .join('')
      .trim()
    if (joined) return joined
  }
  throw new WalletChatError('INVALID_GATEWAY_RESPONSE', 'Gateway response did not include assistant content.')
}

function appendRequestNonce(message: string, requestNonce: string | null): string {
  return requestNonce ? `${message} Request nonce: ${requestNonce}.` : message
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = ''
  const chunkSize = 0x8000
  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize)
    binary += String.fromCharCode(...Array.from(chunk))
  }
  return btoa(binary)
}

function bytesToBase64Url(bytes: Uint8Array): string {
  return bytesToBase64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}
