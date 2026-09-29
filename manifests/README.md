# manifests

Kubernetes 매니페스트. ArgoCD가 이 디렉터리를 당겨와(GitOps pull) 클러스터에 동기화한다.

```
manifests/
├── base/              # 공통 리소스
├── overlays/
│   ├── dev/           # vdi-dev 네임스페이스
│   └── prod/          # vdi-prod 네임스페이스 (PR 승인 후 승격)
└── argocd/            # ArgoCD Application 정의
```

- 이미지 태그는 CI(GitHub Actions)가 커밋 해시로 갱신한다. 손으로 `latest`를 쓰지 않는다.
- Secret 원문은 커밋하지 않는다 — Sealed Secrets로 암호화한 것만 올린다.
- 롤백은 `git revert`.
