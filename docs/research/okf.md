# Open Knowledge Format (OKF) 리서치

출처: https://discuss.pytorch.kr/t/open-knowledge-format-okf-google-ai-feat-llm-wiki/10701

## 무엇인가

Google Cloud가 제안한 **AI 에이전트용 지식 공유 개방 표준**. 조직에 흩어진 메타데이터·맥락을 통일 포맷으로 표현/교환.

핵심 주장: AI의 병목은 모델이 아니라 **정확한 컨텍스트의 부재**. 테이블 스키마·비즈니스 지표 정의·런북이 여러 시스템에 산재.

## Karpathy의 LLM Wiki와 연관

> "LLMs don't get bored, don't forget to update a cross-reference, and can touch 15 files in one pass."

OKF는 이 아이디어를 누구나 생산/소비 가능한 상호운용 포맷으로 표준화.

## 기술 구조 (극단적으로 단순)

- **번들(Bundle)** = 마크다운 파일들의 디렉토리
- **파일 1개 = 개념(Concept) 1개**, 파일 경로가 곧 정체성
- YAML 프론트매터(`type`만 필수) + 구조화된 본문(Schema/Examples/Citations)
- Git diff 가능, SDK 불필요 (`cat` + `git clone`)
- 파일 간 경로 링크로 개념 관계 표현

## 특징

| 특성 | 설명 |
|---|---|
| 형태 | YAML 프론트매터 + 마크다운 |
| 버전관리 | Git 호환, diff 가능 |
| 접근성 | SDK 불필요 |
| 상호링크 | 절대/상대 경로 |

## 레퍼런스 구현

- 인리치먼트 에이전트: BigQuery 메타데이터 자동 생성
- 시각화: 정적 HTML 그래프 뷰
- 샘플 번들: GA4, Stack Overflow, Bitcoin

## 다른 포맷과 차이

- Obsidian/Notion과 달리 **공개 명세**로 표준화
- 도메인 스키마(Avro/Protobuf)를 대체 X, **참조**
- MCP와 **보완적**(OKF=저장, MCP=접근)

## 현황·리스크

- **v0.1** — 출발점, 하위호환 성장 설계
- 레퍼런스가 **BigQuery/데이터 카탈로그 중심** → 코드/의사결정/런북 지식엔 결이 다를 수 있음

## 회사 적용 판단

- **강한 적합**: 지표 정의(ACOS·공헌이익·ROP·FIFO)의 단일 소스화 = semantic layer as code
- **주의**: v0.1을 핵심 인프라에 조기 베팅 X. **포맷이 아니라 아이디어(md+프론트매터+git+링크)를 채택.**
- **타이밍**: Phase 3 중장기. "정의 충돌"의 아픔을 겪은 뒤.
- 개인 memory/decisions.md 철학과 거의 동일 → 자연스러운 오너십 대상
