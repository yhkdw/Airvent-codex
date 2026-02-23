#!/bin/bash
# ─────────────────────────────────────────────────────────
# AirVent Subscription — Solana Devnet 배포 스크립트
# ─────────────────────────────────────────────────────────
# 사용법: bash scripts/deploy-devnet.sh
# 사전 요구: Solana CLI, Anchor CLI, Rust 설치 필요

set -e

echo "═══════════════════════════════════════════════════"
echo "   AirVent Subscription — Devnet 배포"
echo "═══════════════════════════════════════════════════"
echo ""

# 전역 환경 설정 (PATH 보장)
export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
export PATH="$HOME/.cargo/bin:$PATH"
export PATH="$HOME/.local/bin:$PATH"
export PATH="/home/vscode/.local/share/solana/install/active_release/bin:$PATH"
export PATH="/home/vscode/.cargo/bin:$PATH"
export PATH="/home/vscode/.local/bin:$PATH"

# 1. Rust 및 Cargo 설치 확인
if ! command -v cargo &> /dev/null; then
    echo "⚠️ Rust가 설치되어 있지 않습니다. 설치를 시작합니다..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source $HOME/.cargo/env
    export PATH="$HOME/.cargo/bin:$PATH"
    echo "✅ Rust 설치 완료"
fi

# 2. Solana CLI 설치 확인 및 설치 (Ultra-Robust 모드)
if ! command -v solana &> /dev/null; then
    echo "⚠️ Solana CLI를 찾을 수 없습니다. 초강력 설치 모드를 시작합니다..."
    
    # 방법 1: curl (SSL 무시 옵션 추가)
    if ! curl -sSfL -k --retry 5 https://release.solana.com/v1.18.12/install | sh; then
        echo "⚠️ curl 설치 실패. wget으로 우회 시도합니다..."
        # 방법 2: wget (SSL 무시 옵션 추가)
        wget -q --no-check-certificate -O - https://release.solana.com/v1.18.12/install | sh
    fi
    
    # 경로 강제 주입
    export PATH="$HOME/.local/share/solana/install/active_release/bin:$PATH"
    export PATH="/home/vscode/.local/share/solana/install/active_release/bin:$PATH"
    
    # 최종 확인
    if ! command -v solana &> /dev/null; then
        echo "❌ 모든 방법이 실패했습니다. 네트워크 방화벽이나 SSL 프록시 문제일 수 있습니다."
        echo "대안: 'curl -k'를 터미널에 직접 입력해 보시거나, Codespaces를 새로 생성해 보세요."
        exit 1
    fi
    echo "✅ Solana CLI 설치 성공!"
fi

# 2. Anchor CLI 설치 확인 및 설치 (Binary 방식 권장)
if ! command -v anchor &> /dev/null; then
    echo "⚠️ Anchor CLI를 찾을 수 없습니다. npm을 통해 바이너리 설치를 시작합니다..."
    # npm으로 설치하면 컴파일 과정 없이 바이너리를 바로 내려받아 에러를 방지합니다.
    npm install -g @coral-xyz/anchor-cli@0.30.1 --prefix ~/.local
    export PATH="$HOME/.local/bin:$PATH"
    echo "✅ Anchor CLI 설치 완료"
fi

# 3. Solana CLI를 Devnet으로 설정
echo "📡 [1/6] Solana CLI를 Devnet으로 설정 중..."
solana config set --url https://api.devnet.solana.com
echo ""

# 2. 키페어 확인 또는 생성
KEYPAIR_PATH="$HOME/.config/solana/id.json"
if [ ! -f "$KEYPAIR_PATH" ]; then
    echo "🔑 [2/6] 키페어가 없습니다. 새로 생성합니다..."
    solana-keygen new --outfile "$KEYPAIR_PATH" --no-bip39-passphrase
else
    echo "🔑 [2/6] 기존 키페어를 사용합니다."
fi

WALLET_ADDRESS=$(solana address)
echo "   지갑 주소: $WALLET_ADDRESS"
echo ""

# 3. Devnet SOL 에어드롭
echo "💰 [3/6] Devnet SOL 에어드롭 요청 중..."
solana airdrop 1 --url devnet || echo "   ⚠ 에어드롭 요청이 거부되었습니다. (이미 충분하거나 제한 도달)"
echo ""

# 4. 잔고 확인
echo "💳 [4/6] 잔고 확인 중..."
BALANCE=$(solana balance)
echo "   현재 잔고: $BALANCE"
echo ""

# 5. Anchor 빌드
echo "🔨 [5/6] Anchor 프로젝트 빌드 중..."
anchor build
echo ""

# 6. Devnet 배포
echo "🚀 [6/6] Devnet에 배포 중..."
anchor deploy --provider.cluster devnet

# 배포된 프로그램 ID 가져오기
PROGRAM_ID=$(solana address -k target/deploy/airvent_subscription-keypair.json 2>/dev/null || echo "확인 필요")

echo ""
echo "═══════════════════════════════════════════════════"
echo "   ✅ 배포 완료!"
echo "═══════════════════════════════════════════════════"
echo ""
echo "   프로그램 ID: $PROGRAM_ID"
echo "   클러스터:    Devnet"
echo "   Explorer:    https://explorer.solana.com/address/$PROGRAM_ID?cluster=devnet"
echo ""
echo "   ⚠ 다음 파일을 업데이트하세요:"
echo "     1. Anchor.toml → [programs.devnet] 섹션"
echo "     2. programs/airvent_subscription/src/lib.rs → declare_id!()"
echo "     3. dashboard/src/solana/provider.ts → PROGRAM_ID"
echo ""
