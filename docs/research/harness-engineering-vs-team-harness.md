# 하네스 엔지니어링 vs team-harness (자기평가)

하네스 엔지니어링 분야 정본에 team-harness를 대보고, 회사 runtime 하네스로 가는 갭을 뽑는다.

정본 공식: **`Agent = Model + Harness`. 모델 아닌 건 전부 하네스.** 하네스 = 가이드(제약·유도) + 센서(관찰·검증).

## team-harness는 하네스 엔지니어링을 충족한다

- **가이드**: 13개 스킬(오케스트레이터), PreToolUse 모델 티어링 훅, git flow 강제, 의도 라우터(route-intent.mjs)
- **센서**: `/code-review`, `verifier`(opus 재검토), `security-reviewer`, `release-check`, dry-run 리허설(v0.24.2 day-1 데드락 실제 적발)

정의상 이론 여지 없이 하네스 엔지니어링. 그것도 개인 기법을 **팀 거버넌스로 제도화한** 성숙한 사례.

## 두 축 좌표

### 축 A — 기법 ↔ 거버넌스 (altitude)
기법(오케스트레이터 스킬·컨텍스트 보존 스크립트·PR 풀자동)은 team-harness에 다 있고, 그 위에 **강제(enforcement)**가 얹힘: 스킬을 기계 게이트로 강제, 모델 티어링, git flow 보호, 적대적 검증, CI 게이트.
→ **기법 + 팀 거버넌스 제도까지 만들었다.** (대부분은 기법만 앎)

### 축 B — dev-time ↔ runtime (target) → 회사 갭
| 축 | dev-time (team-harness) | runtime (회사 목표) |
|---|---|---|
| 관측 | 제품 A급 + 런루프 센서(/loop stuck·max) | 에이전트 행동 eval·텔레메트리(신규) |
| 메모리 | decisions.md + agent-memory(성숙) | OKF/위키 semantic layer(재조준) |
| 샌드박스 | worktree + dry-run 리허설(v0.24.2 실전검증) | 액션 샌드박스(초안·시뮬 — Apps Script로 프로토타입) |

이 3개 runtime 갭이 회사 에이전트 하네스 설계 체크리스트.

## 오케스트레이션 축 — 인-세션 vs 외부 프로세스

| | 외부 프로세스 오케스트레이션 | 인-세션(team-harness) |
|---|---|---|
| 방식 | 외부 러너가 단계마다 새 세션 스폰 + 디스크 상태 | CC 플러그인 스킬 + 서브에이전트 + 훅 |
| 컨텍스트 보존 | 단계마다 세션 리셋 | 서브에이전트 격리 + 모델 티어링 |
| 강점 | 자율주행·재개성 | 거버넌스·강제(게이트·CI·secret-scan) |

→ 상보적. 단, **손으로 재발명 금지** — 네이티브 프리미티브로: 인터랙티브/dev = Workflow + 서브에이전트, 배포형 자율(cron 무인) = Agent SDK / Managed Agents(스케줄 배포·세션 상태·resume). ([[principles]] #2)

**회사 runtime 함의:** 장기 자율 비즈니스 워크플로(예: 매일 주간 채널 리포트 = 데이터수집→P&L→인사이트초안→슬랙발송, 단계별 격리·상태·체크포인트·마지막 사람확인)를 축 B의 runtime 하네스로. 구현은 위 네이티브 프리미티브.

## 결론

- team-harness = dev 하네스를 **팀 거버넌스로 제도화**한 성숙 사례. 이미 초과 달성.
- 남은 것 = **"암묵지 → 에이전트가 읽는 데이터 스토리지(RAG 불필요)"** = OKF/위키 = 회사 Phase 3.
- 목적지는 [[roadmap]]과 동일.
