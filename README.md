# Airvent-codex

네, 가능합니다. 이 저장소에는 **공기질 데이터 위변조 검증기(Validator)**를 바로 실행해볼 수 있는 최소 예시를 추가했습니다.

## 어떤 방식으로 검증하나요?
1. **무결성 검증(HMAC-SHA256)**
   - 각 측정 레코드(`sensor_id`, `timestamp`, `pm25`, `pm10`, `co2`)에 대해 서버/디바이스 공유 비밀키로 서명합니다.
   - 수집 시점에 다시 계산한 서명과 `signature` 필드를 비교해 위변조 여부를 판정합니다.
2. **연속성/이상치 검증**
   - 같은 센서의 타임스탬프가 역행하지 않는지 검사합니다.
   - 짧은 시간에 값이 비정상 급등하면 `suspicious`로 분류합니다.
3. **ChatGPT 검증자 연동 지점**
   - `suspicious` 항목은 사람이 재검토하거나, ChatGPT 검증 워크플로우(추가 컨텍스트 + 규칙 기반 프롬프트)로 넘기도록 설계했습니다.

## 실행 방법
```bash
python air_quality_validator.py --input sample_data.jsonl --secret airvent-demo-key
```

예상 결과:
- `ok`: 정상 데이터
- `tampered`: 서명 불일치/시간 역행 등 위변조 의심
- `suspicious`: 서명은 맞지만 급격한 변화로 추가 검토 필요

## 파일 구성
- `air_quality_validator.py`: 검증 로직 + CLI
- `sample_data.jsonl`: 예시 입력(정상/위변조/이상치 포함)

## 운영 환경 적용 팁
- 디바이스 개별 키 또는 키 파생 전략(HKDF) 적용
- 키 순환(rotate) 및 키 버전(`key_id`) 필드 추가
- 수집 파이프라인에서 `tampered` 즉시 격리
- `suspicious`는 ChatGPT + 규칙 엔진 이중 판정
