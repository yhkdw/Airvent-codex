FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

# 의존성 설치
RUN apt-get update && apt-get install -y \
    build-essential \
    pkg-config \
    libssl-dev \
    libudev-dev \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

USER vscode

# Rust 설치
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/home/vscode/.cargo/bin:${PATH}"

# Solana CLI 설치
RUN sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"
ENV PATH="/home/vscode/.local/share/solana/install/active_release/bin:${PATH}"

# Anchor CLI 설치 (가장 안정적인 0.30.1 버전 소스 빌드)
# GLIBC 호환성을 위해 avm 대신 소스에서 직접 컴파일합니다.
RUN cargo install --git https://github.com/coral-xyz/anchor --tag v0.30.1 anchor-cli --locked --force

# 기존 .avm 경로가 PATH에 잡히지 않도록 확인 (필요시)
RUN rm -rf /home/vscode/.avm

CMD ["bash"]
