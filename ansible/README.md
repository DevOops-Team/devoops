# ansible

Kubernetes 노드 설치 플레이북 (kubeadm, containerd, Calico).

- 노드 목록(인벤토리)의 실제 IP는 레포 밖에서 관리하고, 여기에는 `inventory.example.ini`만 둔다.
- 볼트 비밀번호 파일(`.vault_pass*`)은 커밋하지 않는다.
