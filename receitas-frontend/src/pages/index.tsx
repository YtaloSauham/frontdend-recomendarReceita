import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [dificuldade, setDificuldade] = useState('');
  const [tipo, setTipo] = useState('');
  const [receitas, setReceitas] = useState([]);

  const handleRecomendar = async () => {
    try {
      const response = await axios.post('http://localhost:5000/recomendar', { dificuldade, tipo });

      setReceitas(response.data.receitas_recomendadas);

    } catch (error) {
      console.error(error);
    }
  };

  const handleDificuldadeChange = (e) => {
    setDificuldade(e.target.value);
    console.log(dificuldade)
  };

  const handleTipoChange = (e) => {

    setTipo(e.target.value);
    console.log(tipo)
  };

  return (
    <div className='w-full text-white font-bold'>
      <div className="bg-cover bg-center h-64 flex items-center">
        <h1 className="text-white text-4xl mx-auto">O que vou comer hoje?</h1>
      </div>

      <div className='flex flex-1 container'>
        <div className=" mx-auto my-8">

          <div className="flex flex-col mb-4 ">
            <span className="mb-2">Dificuldade:</span>
            <div className="flex">
              <div className="mr-4">
                <input
                  type="radio"
                  id="facil"
                  name="dificuldade"
                  value="Fácil"
                  checked={dificuldade === 'Fácil'}
                  onChange={handleDificuldadeChange}
                />
                <label htmlFor="facil" className="ml-2">Fácil</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="media"
                  name="dificuldade"
                  value="Média"
                  checked={dificuldade === 'Média'}
                  onChange={handleDificuldadeChange}
                />
                <label htmlFor="media" className="ml-2">Média</label>
              </div>
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <span className="mb-2">Tipo:</span>
            <div className="flex">
              <div className="mr-4">
                <input
                  type="radio"
                  id="principal"
                  name="tipo"
                  value="Prato Principal"
                  checked={tipo === 'Prato Principal'}
                  onChange={handleTipoChange}
                />
                <label htmlFor="principal" className="ml-2">Prato Principal</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="acompanhamento"
                  name="tipo"
                  value="Acompanhamento"
                  checked={tipo === 'Acompanhamento'}
                  onChange={handleTipoChange}
                />
                <label htmlFor="acompanhamento" className="ml-2">Acompanhamento</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="sobremesa"
                  name="tipo"
                  value="Sobremesa"
                  checked={tipo === 'Sobremesa'}
                  onChange={handleTipoChange}
                />
                <label htmlFor="sobremesa" className="ml-2">Sobremesa</label>
              </div>
            </div>
          </div>
          <button onClick={handleRecomendar} className="bg-blue-500 text-white px-4 py-2 rounded">
            Recomendar
          </button>

        </div>

        <div className='text-white flex-2 w-[50rem]'>
          <ul className="mt-4">
            {receitas?.map((receita, index) => (
              <li key={index} className="border-b py-4">
                <h3 className="text-xl mb-2">{receita.title}</h3>
                <p>Tempo de preparo: {receita.prep_time} minutos</p>
                <p >Modo de preparo: {receita.instructions}</p>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}
