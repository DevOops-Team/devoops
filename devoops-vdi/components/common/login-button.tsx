import { Button } from "antd";
import Link from "next/link";

export default function LoginButton() {
  return (
    <Link href="/login">
      <Button type="default" className="w-full">
        로그인
      </Button>
    </Link>
  );
}
