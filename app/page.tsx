import Image from "next/image";
import Test from "./_components/Test";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Test></Test>
    </main>
  );
}
