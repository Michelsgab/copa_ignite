import Image from "next/image";
import logoImg from "../assets/logo.svg";
import greenIconImg from "../assets/icon.svg";
import userAvatarImg from "../assets/user-avatar-example.png";
import appPreviewImg from "../assets/app-nlw-copa-preview.png";
import { api } from "../lib/axios";
import { FormEvent, useState } from "react";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/pools", {
        title: poolTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);

      alert(
        "Bolão criado com sucesso! O Código foi copiado para a área de transferência!"
      );
      setPoolTitle("");
    } catch (err) {
      console.log(err);
      alert("Falha ao criar o bolão! Tente novamente");
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW Copa" />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image
            src={userAvatarImg}
            alt="Icone de avatar de pessoas que usam o NLW Copa"
            quality={100}
          />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{userCount || 0}</span> pessoas
            já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            type="text"
            required
            placeholder="Qual o seu bolão?"
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm caret-gray-50 text-gray-100"
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            type="submit"
            className="bg-yellow-500 px-6 py-4 rounded font-bold text-sm uppercase text-gray-900 hover:bg-yellow-700"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas
        </p>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={greenIconImg} alt="Icone de Check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{poolCount || 0}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="w-px h-14 bg-gray-600"></div>
          <div className="flex items-center gap-6">
            <Image src={greenIconImg} alt="Icone de Check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{guessCount || 0}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreviewImg}
        alt="Dois celular exibindo uma prévia da aplicação mova do bolão do NLW copa"
      />
    </div>
  );
}

export async function getStaticProps() {
  const [poolCountResult, guessCountResult, userCountResult] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResult.data.count,
      guessCount: guessCountResult.data.count,
      userCount: userCountResult.data.count,
    },
  };
}

// export const getServerSideProps = async () => {
//   const [poolCountResponse, guessCountResponse, userCountResponse] =
//     await Promise.all([
//       api.get("pools/count"),
//       api.get("guesses/count"),
//       api.get("users/count"),
//     ]);

//   return {
//     props: {
//       poolCount: poolCountResponse.data.count,
//       guessCount: guessCountResponse.data.count,
//       userCount: userCountResponse.data.count,
//     },
//   };
// };
