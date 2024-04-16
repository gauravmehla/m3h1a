import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Hi, my name is &nbsp;
          <code className="font-mono font-bold">Gaurav Mehla</code>
        </p>
      </div>

      <Image
        src="/v0/b/m3h1a-1n.appspot.com/o/mehla.in%2Fstatic%2Fimg%2Fmehla_logo.JPG?alt=media&token=83473051-7b21-4704-8834-c7adbae88098"
        alt="Gaurav Mehla"
        width={400}
        height={400}
        className="rounded-full"
        style={{
          margin: "auto",
        }}
      />
    </main>
  );
}
