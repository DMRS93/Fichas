import "./App.css";
import { useState } from "react";

const API_URL = "https://pessoa-backend.herokuapp.com";

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [selecionado, setSelecionado] = useState();

  function addPessoa() {
    let pessoa = { name: "David Aula", age: "60" };

    fetch(API_URL + "/addPessoa", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(pessoa),
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("There was an error finding pessoas");
        }

        console.log(response);

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        setPessoas(parsedResponse.pessoas);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function fetchPessoas() {
    fetch(API_URL + "/getPessoas/", {
      mode: "cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("There was an error finding pessoas");
        }
        console.log(response);

        return response.json();
      })
      .then((parsedResponse) => {
        console.log(parsedResponse);
        //Como ele só chega aqui se tiver sucesso basta atualizar a variavel Pessoas
        //setPessoasList(parsedResponse);
        setPessoas(parsedResponse);
        //console.log(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className="App">
      {pessoas.map((elemento) => {
        return (
          <div key={elemento.id}>
            {elemento.name + " " + elemento.age}
            <button
              onClick={() => {
                setSelecionado(elemento.id);
                console.log(elemento.id);
              }}
            >
              Teste
            </button>
          </div>
        );
      })}

      <button
        onClick={() => {
          if (selecionado !== undefined) {
            let listaAux = pessoas;

            listaAux = listaAux.filter((_, index) => {
              return index !== selecionado;
            });

            console.log(listaAux);
            setPessoas(listaAux);
          }
        }}
      >
        Delete elemento
      </button>
      <button
        onClick={() => {
          fetchPessoas();
        }}
      >
        Clicar
      </button>
      <button
        onClick={() => {
          addPessoa();
        }}
      >
        Adicionar
      </button>
    </div>
  );
}

export default App;
