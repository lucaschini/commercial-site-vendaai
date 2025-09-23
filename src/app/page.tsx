import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <Image src={} height={} width={}></Image>

        <nav>
          <Link href={}>Como Funciona</Link>
          <Link href={}>Aplicações</Link>
          <Link href={}>Funcionalidades</Link>
          <Link href={}>FAQ</Link>
          <Link href={}>
            <button>Download</button>
          </Link>
        </nav>
      </header>
    </>
  );
}
