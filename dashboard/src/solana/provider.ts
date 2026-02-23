/**
 * Solana Provider 유틸리티
 *
 * Phantom 지갑 연결 + Anchor Provider 설정을 다루는 모듈입니다.
 * 대시보드에서 import 하여 사용합니다.
 */
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Buffer } from "buffer";
import { IDL, AirventSubscription } from "../idl/airvent_subscription";

// ──────────────────────────────────────────
// 상수
// ──────────────────────────────────────────

/** 프로그램 ID — 배포 후 실제 값으로 교체 */
export const PROGRAM_ID = new PublicKey(
    "C245wF5gEDvBzgtskqooaz4yCdqFrgutt1CLub8iLWsF"
);

/** Solana 클러스터 (testnet / devnet / mainnet-beta) */
export type SolanaCluster = "testnet" | "devnet" | "mainnet-beta";

export const CLUSTER: SolanaCluster =
    (import.meta.env.VITE_SOLANA_CLUSTER as SolanaCluster) || "testnet";

/** RPC 엔드포인트 (사용자 지정 또는 기본 클러스터) */
export const RPC_ENDPOINT: string =
    import.meta.env.VITE_SOLANA_RPC || clusterApiUrl(CLUSTER);

// ──────────────────────────────────────────
// Phantom 지갑 타입
// ──────────────────────────────────────────

interface PhantomWallet {
    isPhantom: boolean;
    publicKey: PublicKey | null;
    connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: PublicKey }>;
    disconnect: () => Promise<void>;
    signTransaction: (tx: any) => Promise<any>;
    signAllTransactions: (txs: any[]) => Promise<any[]>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    off: (event: string, callback: (...args: any[]) => void) => void;
}

/** window에 Phantom 타입 추가 */
declare global {
    interface Window {
        solana?: PhantomWallet;
    }
}

// ──────────────────────────────────────────
// 연결 유틸리티
// ──────────────────────────────────────────

/** Solana Connection 인스턴스 (싱글턴) */
let _connection: Connection | null = null;

export function getConnection(): Connection {
    if (!_connection) {
        _connection = new Connection(RPC_ENDPOINT, "confirmed");
    }
    return _connection;
}

/**
 * Phantom 지갑이 설치되어 있는지 확인
 */
export function isPhantomInstalled(): boolean {
    const solana = getPhantomProvider();
    return !!solana?.isPhantom;
}

/**
 * Phantom 지갑 제공자 가져오기
 */
function getPhantomProvider() {
    if (typeof window === "undefined") return null;

    if ("phantom" in window) {
        const anyWindow = window as any;
        const provider = anyWindow.phantom?.solana;
        if (provider?.isPhantom) {
            return provider;
        }
    }
    return window.solana;
}

/**
 * Phantom 지갑에 연결하고 publicKey를 반환
 */
export async function connectPhantom(onlyIfTrusted = false): Promise<PublicKey> {
    const provider = getPhantomProvider();

    if (!provider?.isPhantom) {
        if (onlyIfTrusted) return null as any; // Silent fail for auto-connect
        throw new Error("Phantom 지갑이 설치되어 있지 않거나 감지되지 않았습니다. https://phantom.app 에서 설치를 확인해 주세요.");
    }

    try {
        const resp = await provider.connect(onlyIfTrusted ? { onlyIfTrusted: true } : undefined);
        return resp.publicKey;
    } catch (err: any) {
        if (onlyIfTrusted) return null as any; // Silent fail for auto-connect
        throw new Error(err.message || "지갑 연결 중 오류가 발생했습니다.");
    }
}

/**
 * Phantom 지갑 연결 해제
 */
export async function disconnectPhantom(): Promise<void> {
    if (window.solana) {
        await window.solana.disconnect();
    }
}

/**
 * 현재 연결된 지갑의 PublicKey 반환 (연결 안됐으면 null)
 */
export function getWalletPublicKey(): PublicKey | null {
    return window.solana?.publicKey ?? null;
}

// ──────────────────────────────────────────
// Anchor Provider & Program
// ──────────────────────────────────────────

/**
 * AnchorProvider를 생성합니다.
 * Phantom 지갑이 연결된 상태에서 호출해야 합니다.
 */
export function getProvider(): AnchorProvider {
    if (!window.solana?.publicKey) {
        throw new Error("지갑이 연결되어 있지 않습니다. 먼저 connectPhantom()을 호출하세요.");
    }

    const connection = getConnection();
    const provider = new AnchorProvider(
        connection,
        window.solana as any,
        { commitment: "confirmed" }
    );
    return provider;
}

/**
 * Anchor Program 인스턴스를 생성합니다.
 */
export function getProgram(): Program<any> {
    const provider = getProvider();
    // @ts-ignore - IDL version mismatch
    return new Program(IDL as any, provider);
}

// ──────────────────────────────────────────
// PDA 유틸리티
// ──────────────────────────────────────────

/**
 * 사용자의 구독 상태 PDA 주소를 계산합니다.
 */
export function getSubscriptionPDA(userPublicKey: PublicKey): [PublicKey, number] {
    // 1. PublicKey 인스턴스 호환성 보장 (가장 원시적인 bytes로 변환 후 재생성)
    const ownerPubkey = new PublicKey(userPublicKey.toBytes());

    // 2. 모든 Seed를 명시적으로 Buffer.from()으로 감싸서 'Expected Buffer' 에러 원천 차단
    // TextEncoder().encode() 결과나 toBytes() 결과를 현재 파일의 Buffer로 다시 한번 감싸줍니다.
    const seedSubscription = Buffer.from(new TextEncoder().encode("subscription"));
    const seedUser = Buffer.from(ownerPubkey.toBytes());

    return PublicKey.findProgramAddressSync(
        [seedSubscription, seedUser],
        PROGRAM_ID
    );
}

/**
 * Solana Explorer 링크 생성
 */
export function getExplorerUrl(
    address: string,
    type: "tx" | "address" = "address"
): string {
    const base = "https://explorer.solana.com";
    const clusterParam = CLUSTER === "mainnet-beta" ? "" : `?cluster=${CLUSTER}`;
    return `${base}/${type}/${address}${clusterParam}`;
}
