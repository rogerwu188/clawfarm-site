import { Program, type Idl, type Provider } from '@coral-xyz/anchor'
import BN from 'bn.js'
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token'
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  type TransactionInstruction,
} from '@solana/web3.js'
import type { SendTransactionOptions } from '@solana/wallet-adapter-base'

import {
  DEVNET_CLAW_MINT,
  DEVNET_MASTERPOOL_CONFIG,
  DEVNET_MASTERPOOL_PROGRAM_ID,
  DEVNET_POOL_AUTHORITY,
  DEVNET_TEST_USDC_MINT,
  FAUCET_SEEDS,
} from './constants'

export type FaucetPdas = {
  faucetConfig: PublicKey
  faucetGlobalState: PublicKey
  faucetClawVault: PublicKey
  faucetUsdcVault: PublicKey
  faucetUserState: PublicKey
}

export type FaucetWallet = {
  publicKey: PublicKey | null
  sendTransaction: (
    transaction: Transaction,
    connection: Connection,
    options?: SendTransactionOptions
  ) => Promise<string>
}

type FaucetClaimArgs = {
  clawAmount: BN
  usdcAmount: BN
}

type FaucetClaimAccounts = {
  config: PublicKey
  faucetConfig: PublicKey
  faucetGlobalState: PublicKey
  faucetUserState: PublicKey
  faucetClawVault: PublicKey
  faucetUsdcVault: PublicKey
  userClawToken: PublicKey
  userUsdcToken: PublicKey
  clawMint: PublicKey
  usdcMint: PublicKey
  poolAuthority: PublicKey
  user: PublicKey
  payer: PublicKey
  tokenProgram: PublicKey
  systemProgram: PublicKey
}

type FaucetProgram = Program<Idl> & {
  methods: {
    claimFaucet: (args: FaucetClaimArgs) => {
      accountsStrict: (accounts: FaucetClaimAccounts) => {
        instruction: () => Promise<TransactionInstruction>
      }
    }
  }
}

const FAUCET_IDL = {
  address: DEVNET_MASTERPOOL_PROGRAM_ID.toBase58(),
  metadata: {
    name: 'clawfarm_masterpool',
    version: '0.1.0',
    spec: '0.1.0',
  },
  instructions: [
    {
      name: 'claim_faucet',
      discriminator: [80, 7, 251, 108, 55, 145, 135, 68],
      accounts: [
        { name: 'config' },
        { name: 'faucet_config' },
        { name: 'faucet_global_state', writable: true },
        { name: 'faucet_user_state', writable: true },
        { name: 'faucet_claw_vault', writable: true },
        { name: 'faucet_usdc_vault', writable: true },
        { name: 'user_claw_token', writable: true },
        { name: 'user_usdc_token', writable: true },
        { name: 'claw_mint' },
        { name: 'usdc_mint' },
        { name: 'pool_authority' },
        { name: 'user', signer: true },
        { name: 'payer', writable: true, signer: true },
        { name: 'token_program', address: TOKEN_PROGRAM_ID.toBase58() },
        { name: 'system_program', address: SystemProgram.programId.toBase58() },
      ],
      args: [
        {
          name: 'args',
          type: {
            defined: {
              name: 'FaucetClaimArgs',
            },
          },
        },
      ],
    },
  ],
  types: [
    {
      name: 'FaucetClaimArgs',
      type: {
        kind: 'struct',
        fields: [
          { name: 'claw_amount', type: 'u64' },
          { name: 'usdc_amount', type: 'u64' },
        ],
      },
    },
  ],
} satisfies Idl

function seed(value: string): Buffer {
  return Buffer.from(value)
}

export function deriveFaucetPdas(user: PublicKey): FaucetPdas {
  const [faucetConfig] = PublicKey.findProgramAddressSync(
    [seed(FAUCET_SEEDS.config)],
    DEVNET_MASTERPOOL_PROGRAM_ID
  )
  const [faucetGlobalState] = PublicKey.findProgramAddressSync(
    [seed(FAUCET_SEEDS.global)],
    DEVNET_MASTERPOOL_PROGRAM_ID
  )
  const [faucetClawVault] = PublicKey.findProgramAddressSync(
    [seed(FAUCET_SEEDS.clawVault)],
    DEVNET_MASTERPOOL_PROGRAM_ID
  )
  const [faucetUsdcVault] = PublicKey.findProgramAddressSync(
    [seed(FAUCET_SEEDS.usdcVault)],
    DEVNET_MASTERPOOL_PROGRAM_ID
  )
  const [faucetUserState] = PublicKey.findProgramAddressSync(
    [seed(FAUCET_SEEDS.user), user.toBuffer()],
    DEVNET_MASTERPOOL_PROGRAM_ID
  )

  return {
    faucetConfig,
    faucetGlobalState,
    faucetClawVault,
    faucetUsdcVault,
    faucetUserState,
  }
}

async function prepareAssociatedTokenAccount(input: {
  connection: Connection
  payer: PublicKey
  mint: PublicKey
  owner: PublicKey
}): Promise<{ address: PublicKey; instruction: TransactionInstruction | null }> {
  const address = getAssociatedTokenAddressSync(
    input.mint,
    input.owner,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  )
  const account = await input.connection.getAccountInfo(address, 'confirmed')

  if (account) {
    return { address, instruction: null }
  }

  return {
    address,
    instruction: createAssociatedTokenAccountInstruction(
      input.payer,
      address,
      input.owner,
      input.mint,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    ),
  }
}

export async function claimDevnetFaucet(input: {
  connection: Connection
  wallet: FaucetWallet
  clawBaseUnits: bigint
  usdcBaseUnits: bigint
}): Promise<string> {
  const user = input.wallet.publicKey
  if (!user) {
    throw new Error('Connect a wallet before claiming faucet tokens.')
  }

  const pdas = deriveFaucetPdas(user)
  const [userClawToken, userUsdcToken] = await Promise.all([
    prepareAssociatedTokenAccount({
      connection: input.connection,
      payer: user,
      mint: DEVNET_CLAW_MINT,
      owner: user,
    }),
    prepareAssociatedTokenAccount({
      connection: input.connection,
      payer: user,
      mint: DEVNET_TEST_USDC_MINT,
      owner: user,
    }),
  ])

  const provider: Provider = { connection: input.connection }
  const program = new Program(FAUCET_IDL, provider) as FaucetProgram
  const claimInstruction = await program.methods
    .claimFaucet({
      clawAmount: new BN(input.clawBaseUnits.toString()),
      usdcAmount: new BN(input.usdcBaseUnits.toString()),
    })
    .accountsStrict({
      config: DEVNET_MASTERPOOL_CONFIG,
      faucetConfig: pdas.faucetConfig,
      faucetGlobalState: pdas.faucetGlobalState,
      faucetUserState: pdas.faucetUserState,
      faucetClawVault: pdas.faucetClawVault,
      faucetUsdcVault: pdas.faucetUsdcVault,
      userClawToken: userClawToken.address,
      userUsdcToken: userUsdcToken.address,
      clawMint: DEVNET_CLAW_MINT,
      usdcMint: DEVNET_TEST_USDC_MINT,
      poolAuthority: DEVNET_POOL_AUTHORITY,
      user,
      payer: user,
      tokenProgram: TOKEN_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .instruction()

  const transaction = new Transaction()
  if (userClawToken.instruction) transaction.add(userClawToken.instruction)
  if (userUsdcToken.instruction) transaction.add(userUsdcToken.instruction)
  transaction.add(claimInstruction)
  transaction.feePayer = user

  const { blockhash, lastValidBlockHeight } = await input.connection.getLatestBlockhash('confirmed')
  transaction.recentBlockhash = blockhash

  const signature = await input.wallet.sendTransaction(transaction, input.connection)
  await input.connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, 'confirmed')

  return signature
}
