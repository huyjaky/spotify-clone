import { GetServerSideProps } from "next";
import Head from "next/head";
import { getProviders, ClientSafeProvider, signIn } from "next-auth/react";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '300', '500', '700', '900'],
  variable: '--font-montserrat'
});



interface Props {
  providers: Awaited<ReturnType<typeof getProviders>>;
}

const Login = ({ providers }: Props) => {
  const arrImg: string[] = [
    "https://img.icons8.com/ios-filled/256/spotify.png",
  ];

  const { name: providerName, id: providerId } =
    providers?.spotify as ClientSafeProvider;
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <main
        className={`bg-gradient-to-t from-slate-900  to-emerald-500 h-[100vh] w-full flex
          ${montserrat.className}
        `}
      >
        <div className="m-auto">
          <div className="img mb-5">
            <img src={arrImg[0]} alt="" />
          </div>
          <button className="rounded-full bg-emerald-400 w-full h-full
            text-white font-bold text-[24px] hover:scale-125 transition-transform
          "
            onClick={()=> {
              signIn(providerId, {callbackUrl: '/'})
            }}
          >Login with {providerName}</button>
        </div>
      </main>
    </>
  );
};
export default Login;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
};
