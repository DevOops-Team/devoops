import UsingDesktopContainer from "@/components/desktop/using-desktop-container";
import { mockData } from "@/dummydata/desktop";
import { mockSession } from "@/dummydata/session";

const session = mockSession;

export default async function DashboardPage() {
  //   const session = await getServerSession(authOptions);

  if (!session?.user) {
    return null;
  }

  //   const response = await fetch("/api/desktops");

  //   if (!response.ok) {
  //     throw new Error("Failed to fetch desktops");
  //   }

  //   const data = await response.json();

  return (
    <main className="mx-auto w-full max-w-7xl px-6 py-8">
      {/* Header */}
      <section className="flex flex-col gap-16">
        <div>
          <h1 className="text-3xl font-bold">
            안녕하세요, {session?.user?.username} 님
          </h1>

          <p className="mt-2 text-muted-foreground">
            원하는 OS를 선택하면 전용 데스크톱이 준비됩니다.
          </p>
        </div>

        {/* quota */}
        <UsingDesktopContainer session={session} data={mockData} />
      </section>

      {/* OS */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          {/* <h2 className="text-lg font-semibold">새 데스크톱</h2> */}
        </div>

        {/* VDI_IMAGES → OS Card */}
      </section>

      {/* Desktop */}
    </main>
  );
}
