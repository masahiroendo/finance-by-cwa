import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="space-y-4">
      <p>Hi this is a protected page accessible only by login in</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
