# portal

셀프서비스 포털 (FE / BE). 기술 스택은 미정.

## REST API (설계)

| 메서드 | 경로 | 역할 |
|---|---|---|
| POST | `/api/auth/login` | 로그인, 토큰 발급 |
| GET | `/api/images` | 선택 가능한 OS 목록 (Glance) |
| POST | `/api/desktops` | 생성 요청 — 202, 비동기 처리. 할당량 초과 시 409 |
| GET | `/api/desktops` | 내 데스크톱 목록·상태 |
| GET | `/api/desktops/{id}` | 상태 조회 (프론트 폴링) |
| DELETE | `/api/desktops/{id}` | 반납 (비동기 삭제) |
| GET | `/metrics` | Prometheus 지표 |

## 상태 머신

`CREATING → READY → IN_USE ↔ IDLE → DELETING → DELETED`, 실패 시 `CREATING → ERROR` (롤백 후 재신청 가능)

- READY 판정은 인스턴스 ACTIVE가 아니라 RDP 3389 응답으로 한다 (Linux 5분 / Windows 10분 타임아웃).
- OpenStack 연동 모듈은 `create / delete / status` 인터페이스로 분리해 mock · Proxmox 구현과 교체할 수 있게 한다.
