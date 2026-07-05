# CLAUDE.md — ax-playbook

사내 AI 플랫폼/AX(AI 전환)를 설계하는 아키텍트를 위한 **재사용 플레이북**. 특정 회사 비종속.

## ⚠️ 이 repo는 PUBLIC이다 — 절대 규칙

- **특정 회사명·채용공고 원문·내부 관측(섀도 IT·야근·병목 등)을 커밋하지 않는다.** 한 번 push하면 삭제해도 인덱싱·캐시로 남는다.
- 예시는 **제네릭**으로만 (`roadmap.md` 배경 = 익명 예시 시나리오). 실제 회사에 적용할 땐 개인 메모/로컬에 두고, 이 repo엔 방법론만 남긴다.
- 회사 특정 버전이 필요하면 **로컬 또는 private repo**에 따로 둔다.

## 성격 (right-size)

- **문서 중심 repo** — 루트 `.harness-lite`로 harness-guard의 dev git-flow 강제를 면제한다(원칙 #5). 코드 repo 표준(AGENTS.md·TDD·PR 게이트)은 적용하지 않는다.
- 파괴적 안전가드(코어 삭제·검증기 삭제 등)는 여전히 유효.
- 문서는 한국어.

## 구조

- `docs/roadmap.md` — 5단계 로드맵(회사·개인)
- `docs/principles.md` — 설계 원칙 정본(2축 + 8원칙)
- `docs/goal.md` — 목표 문장(아키텍트)
- `docs/research/` — OKF, 하네스 자기평가
- `automations/sheet-reply-draft/` — 첫 자동화 샘플(Apps Script + Claude). **브랜드·채널·언어는 환경에 맞게 교체하는 템플릿.**
