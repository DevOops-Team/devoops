# terraform

OpenStack 자원 (네트워크, 라우터, 보안그룹, flavor, 이미지 등).

- 흐름: PR → `terraform plan` 결과를 PR 코멘트로 → 승인 → `apply` (서버 안 self-hosted runner)
- 인증 정보(`clouds.yaml`, Application Credential)와 `*.tfstate`, `*.tfvars`는 커밋하지 않는다. 예시는 `*.tfvars.example`로 둔다.
- 사용자 데스크톱 VM은 포털이 런타임에 만들므로 Terraform 관리 대상이 아니다.
