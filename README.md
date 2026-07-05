# ax-playbook — 사내 AI 플랫폼/AX 아키텍트 플레이북

회사 입사 전/후, 사내 AI 플랫폼·AX(AI 전환)를 설계하는 아키텍트를 위한 **재사용 플레이북** (특정 회사 비종속).
비즈니스 플랫폼(데이터 통합·업무 자동화·에이전트) 관련 리서치·로드맵·원칙·PoC를 관리한다.

## 구조

```
ax-playbook/
├── docs/
│   ├── roadmap.md            # 회사·개인 로드맵 (5단계 가설)
│   ├── principles.md         # 설계 원칙 정본 (2축 좌표 + 8원칙)
│   ├── goal.md               # 개인 목표 문장 (아키텍트)
│   └── research/
│       ├── okf.md            # Open Knowledge Format 리서치
│       └── harness-engineering-vs-team-harness.md  # 하네스 자기평가
└── automations/
    └── sheet-reply-draft/    # 첫 PoC: 시트 문의 → Claude 영문 답변 초안
        ├── Code.gs           # Apps Script 코드
        └── README.md         # 설정·사용 가이드
```

## 현재 상태

- [x] 로드맵 가설 v1 (입사 전, 인터뷰로 재조정 예정)
- [x] OKF 리서치
- [x] 첫 자동화 PoC 코드 작성 — Apps Script + Claude (시트 문의 → 영문 답변 초안)
- [ ] 첫 자동화 실제 배포·테스트 (구글 시트에 붙여넣고 API 키 등록 → 동작 확인)

## 핵심 원칙 (함정 방지)

1. 개발환경 거창하게 짓지 마라 — 3명, SCM 먼저, 빠른 승리는 값싸게 병행
2. 시트를 죽이지 마라 — 밑에 백본, 시트는 뷰/입력창으로
3. 거대 플랫폼 낙하산 금지 — 작게 신뢰부터
4. 위키/semantic layer는 "정의 충돌"의 아픔 뒤에
5. 처음엔 항상 사람 확인(초안까지만) — 신뢰가 자동화를 확장시킨다
