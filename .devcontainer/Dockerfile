FROM mcr.microsoft.com/devcontainers/base:ubuntu-24.04

# 최소 필수 패키지만 설치 (이미 베이스에 대부분 포함됨)
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

USER vscode

# Solana CLI 설치 (바이너리 다운로드 방식 - 빠름)
RUN sh -c "$(curl -sSfL https://release.anza.xyz/stable/install)"
ENV PATH="/home/vscode/.local/share/solana/install/active_release/bin:${PATH}"

# 참고: Node.js와 Rust는 devcontainer.json의 features에서 설치하는 것이 가장 안정적입니다.
