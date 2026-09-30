import { Desktop } from "@/types/desktop";
import { Badge, Button, Card } from "antd";

interface DesktopCardProps {
  desktop: Desktop;
  onConnect?: (desktop: Desktop) => void;
  onDelete?: (desktop: Desktop) => void;
}

export default function UsingDesktopCard({
  desktop,
  onConnect,
  onDelete,
}: DesktopCardProps) {
  return (
    <Card
      title={desktop.osName}
      extra={<a href="#">More</a>}
      style={{ width: 300 }}
      className="flex flex-col gap-4"
    >
      <div>
        <p className="mt-1 text-xs text-muted-foreground">{desktop.id}</p>
      </div>

      <Badge>{desktop.status}</Badge>
      <div className="space-y-4">
        {/* 기본 정보 */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">OS</p>
            <p className="mt-1 font-medium">{desktop.osName}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Node</p>
            <p className="mt-1 font-medium">{desktop.node ?? "-"}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Instance ID</p>
            <p className="mt-1 font-medium">{desktop.instanceId ?? "-"}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">Floating IP</p>
            <p className="mt-1 font-medium">{desktop.floatingIp ?? "-"}</p>
          </div>
        </div>

        {/* 생성 시간 */}
        <div className="border-t pt-3">
          <p className="text-xs text-muted-foreground">생성 시간</p>

          <p className="mt-1 text-sm">
            {new Date(desktop.createdAt).toLocaleString("ko-KR")}
          </p>
        </div>

        {/* 액션 */}
        <div className="flex gap-2">
          <Button
            className="flex-1"
            disabled={desktop.status !== "READY"}
            onClick={() => onConnect?.(desktop)}
          >
            접속
          </Button>

          <Button
            type="default"
            disabled={
              desktop.status === "DELETING" || desktop.status === "CREATING"
            }
            onClick={() => onDelete?.(desktop)}
          >
            삭제
          </Button>
        </div>
      </div>
    </Card>
  );
}
