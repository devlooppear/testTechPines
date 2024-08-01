const NoPage = () => {
  return (
    <>
      <div className="flex justify-center align-middle items-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-[50px]">
          <h1 className="text-4xl font-bold text-red-500">404</h1>
          <h2 className="text-2xl font-semibold mt-4">Página Não Encontrada</h2>
          <p className="mt-2 text-gray-600">
            Parece que a página que você está procurando não existe ou foi
            movida. Verifique o endereço e tente novamente.
          </p>
          <div className="mt-6">
            <a
              href="/"
              className="inline-block px-4 py-2 bg-neutral-500 text-white rounded-md hover:bg-neutral-600"
            >
              Voltar para a Página Inicial
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoPage;
