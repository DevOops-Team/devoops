# devoops

현대오토에버 모빌리티스쿨 클라우드 4기 6조 — DevOps 환경 구축 + 서비스 배포 팀 프로젝트

## 프로젝트: OS 선택형 셀프서비스 VDI

웹 포털에서 OS를 고르면 사용자 전용 네트워크 안에 해당 OS의 데스크톱 VM이 만들어지고, 브라우저만으로 원격 접속한다.

> OpenStack은 격리된 데스크톱 인프라를 제공하고, Kubernetes는 그 인프라를 서비스로 운영한다.

## 아키텍처

| 계층 | 구성 |
|---|---|
| 가상화 | Proxmox VE (물리 서버 1대) |
| 데스크톱 (데이터 계층) | OpenStack (Kolla-Ansible) — Controller 1 + Compute 2, 사용자별 Neutron 네트워크 |
| 운영 계층 | Kubernetes (kubeadm) — Master 1 + Worker 2, 포털 · Guacamole · ArgoCD · 모니터링 · Runner |
| 원격 접속 | Apache Guacamole (RDP) |
| 제공 OS | Linux (Ubuntu, Rocky, Debian) + Windows |
| CI/CD | GitHub Actions → GHCR → ArgoCD (GitOps pull) |
| 모니터링 | Prometheus · Grafana · Loki · Alertmanager |
| IaC | Terraform (OpenStack 자원), Packer (OS 이미지), Ansible (K8s 노드) |

## 레포 구조 (초안)

| 경로 | 내용 |
|---|---|
| [`portal/`](portal/) | 셀프서비스 포털 (FE / BE), Dockerfile, 테스트 |
| [`manifests/`](manifests/) | Kubernetes 매니페스트 — Kustomize `base` / `overlays/{dev,prod}`, ArgoCD Application |
| [`terraform/`](terraform/) | OpenStack 자원 (네트워크, 보안그룹, flavor, 이미지) |
| [`packer/`](packer/) | 데스크톱 OS 이미지 템플릿 |
| [`ansible/`](ansible/) | K8s 노드 설치 플레이북 |
| [`docs/`](docs/) | 설계 문서, 런북, 회의록 |
| `.github/` | PR 템플릿, GitHub Actions 워크플로 |

## 협업 규칙

- **main 직접 push 금지.** 브랜치를 만들어 PR을 올리고, 리뷰 1명 이상 승인 후 merge한다.
- **브랜치 이름:** `feat/…`, `fix/…`, `chore/…`, `docs/…`, `infra/…`
- **커밋 메시지:** `type: 요약` — `feat` `fix` `chore` `docs` `refactor` `test` `ci` `infra`
- **공개 레포다.** 토큰, 키, 비밀번호, kubeconfig, `*.tfstate`, `clouds.yaml`은 절대 커밋하지 않는다. PR마다 `secret-scan` 워크플로(gitleaks)가 검사한다.
- IP, 계정 같은 환경 정보는 레포 밖 팀 공유 문서로 관리한다.
- 실수로 비밀정보를 커밋했다면 삭제 커밋으로는 부족하다 — 즉시 해당 키를 폐기·재발급하고 팀에 알린다.

## 일정

| 주차 | 기간 | 목표 |
|---|---|---|
| 1주 | 9/28 – 10/4 | Proxmox, 네트워크, L1 VM / 로컬 연습 (Kolla AIO, kubeadm, kind) |
| 2주 | 10/5 – 10/11 | OpenStack 멀티노드, K8s 클러스터 가동 |
| 3주 | 10/12 – 10/18 | OpenStack 연동, ArgoCD · 모니터링 · 포털 이주 |
| 4주 | 10/19 – 10/25 | dev → prod 통합, Packer, 알림 · DORA |
| 5주 | 10/26 – 10/31 | prod 동결, 리허설 |
