# AirVent Subscription — Solana Anchor 스마트 컨트랙트

AirVent DePIN 플랫폼의 무료/프리미엄 구독 관리를 Solana 블록체인 위에 구현한 Anchor 프로젝트입니다.

## 📋 프로젝트 구조

```
Airvent-codex/
├── Anchor.toml              # Anchor 프레임워크 설정
├── Cargo.toml               # Rust 워크스페이스 설정
├── programs/
│   └── airvent_subscription/
│       ├── Cargo.toml
│       └── src/lib.rs        # 스마트 컨트랙트 (개선 완료)
├── app/                      # 프론트엔드 연동 코드
│   ├── idl/
│   │   └── airvent_subscription.ts   # IDL 타입 정의
│   ├── solana/
│   │   ├── provider.ts       # Solana 연결 유틸리티
│   │   └── subscription.ts   # 컨트랙트 호출 함수
│   └── components/
│       └── SubscriptionCard.tsx  # 구독 관리 UI
├── migrations/
│   └── deploy.ts
└── tests/                    # (향후 추가)
```

## 🔧 스마트 컨트랙트 기능

| 기능 | 함수명 | 설명 |
|------|--------|------|
| 무료 계정 생성 | `initialize_free_subscription` | 대시보드 가입 시 온체인 계정 생성 |
| 포인트 적립 | `earn_free_points` | 오라클/서버가 사용자에게 포인트 적립 (1~1000) |
| 프리미엄 업그레이드 | `upgrade_to_premium` | 하드웨어 시리얼 등록 및 프리미엄 전환 |
| 프리미엄 해제 | `downgrade_from_premium` | 무료 구독으로 다시 전환 |

## 🛠️ 빌드 및 배포

### 사전 요구사항
- [Rust](https://rustup.rs/)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools)
- [Anchor CLI](https://www.anchor-lang.com/docs/installation)

### 빌드
```bash
anchor build
```

### Devnet 배포
```bash
# 지갑 설정
solana-keygen new -o ~/.config/solana/id.json
solana config set --url devnet
solana airdrop 2

# 배포
anchor deploy

# 배포 후 Anchor.toml과 lib.rs의 프로그램 ID를 실제 값으로 업데이트
```

## 🔗 대시보드 연동 방법

### 1. 패키지 설치
```bash
cd Airvent_Dashboard
npm install @solana/web3.js @coral-xyz/anchor
```

### 2. 파일 복사
`app/` 폴더의 파일들을 대시보드 프로젝트로 복사:

```
app/idl/             → src/idl/
app/solana/          → src/solana/
app/components/      → src/components/ 에 추가
```

### 3. 환경 변수 (선택)
`.env` 파일에 추가:
```
VITE_SOLANA_CLUSTER=devnet
VITE_SOLANA_RPC=https://api.devnet.solana.com
```

### 4. DashboardPage에 통합
```tsx
import SubscriptionCard from "../components/SubscriptionCard";

// DashboardPage 내부에 추가:
<SubscriptionCard />
```

## 🔒 보안 사항

- **Authority 패턴**: 포인트 적립은 반드시 `authority` (서버/오라클) 서명이 필요합니다
- **단일 적립 제한**: 최대 1,000 포인트/건
- **오버플로우 보호**: `checked_add`로 안전하게 처리
- **PDA 기반**: 사용자당 하나의 고유 계정 (seeds: `["subscription", user_pubkey]`)
