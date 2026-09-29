# packer

데스크톱 OS 이미지 템플릿.

| OS | 구성 |
|---|---|
| Ubuntu 24.04 · Rocky · Debian | cloud 이미지 + xrdp + 접속 계정 |
| Windows Server (평가판) | VirtIO 드라이버 + cloudbase-init + sysprep, RDP 기본 내장 |

- 흐름: push → Packer 빌드 (self-hosted runner) → 테스트 부팅 (RDP 응답 확인) → Glance에 버전 태그로 등록
- Windows 이미지는 수동 1회 제작 후 자동화한다.
