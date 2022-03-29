import { useEffect, useState } from "react";

import "./ToDo.css";

//Comvem colocar valores que vão ser usados de forma repetida em variáveis ou constantes
const API_URL = "https://pessoa-backend.herokuapp.com";

export function ToDo() {
  const [pessoasList, setPessoasList] = useState([]);
  const [novaPessoa, setNovaPessoa] = useState({ name: "", age: 1 });
  const [pessoaSelected, setPessoaSelected] = useState({});

  useEffect(() => {
    fetchPessoas();
  }, []);

  function fetchPessoas() {
    fetch(API_URL + "/getPessoas", {
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

        return response.json();
      })
      .then((parsedResponse) => {
        //Como ele só chega aqui se tiver sucesso basta atualizar a variavel Pessoas
        setPessoasList(parsedResponse);
        //console.log(parsedResponse);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function addPessoa() {
    if (novaPessoa.name.trim().length !== 0 && novaPessoa.age > 0) {
      fetch(API_URL + "/addPessoa", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(novaPessoa),
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
          if (!parsedResponse.status) {
            alert(parsedResponse.message);
            return;
          }

          setPessoasList(parsedResponse.pessoas);
          // Precisamos de refrescar a lista, se tivessemos o id bastava adicionar um novo com o id
          //fetchPessoas();
        })
        .catch((error) => {
          alert(error);
        });
    }
  }

  function removePessoa(id) {
    //Fazer uma copia dos 'to dos' que temos atualmente para evitar estragos colaterais
    let pessoasListAux = pessoasList;

    //Da set do selecionado a null caso seja apagado
    if (pessoaSelected.id === id) {
      setPessoaSelected(null);
    }

    fetch(API_URL + "/removePessoa", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("There was an error finding pessoas");
        }

        return response.json();
      })
      .then((res) => {
        console.log(res);
        //Filtramos o que não queremos
        pessoasListAux = pessoasListAux.filter((e, i) => e.id !== id);

        setPessoasList(pessoasListAux);
      })
      .catch((error) => {
        alert(error);
      });
  }

  function updatePessoa() {
    let updatedPessoa = {
      id: pessoaSelected.id,
      name: novaPessoa.name,
      age: novaPessoa.age,
    };

    fetch(API_URL + "/updatePessoa", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedPessoa),
    })
      .then((response) => {
        // Validar se o pedido foi feito com sucesso. Pedidos são feitos com sucesso normalmente quando o status é entre 200 e 299
        if (response.status !== 200) {
          throw new Error("There was an error finding pessoas");
        }

        return response.json();
      })
      .then((res) => {
        console.log(res);
        fetchPessoas();
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <>
      <header className="App-header-ToDo">
        <h3>Todo list by "Insert Student Name"</h3>
      </header>

      <section className="list-container">
        {pessoasList.map(function (element, index) {
          return (
            <div
              key={index}
              className="todo-card"
              onClick={() => setPessoaSelected(element)}
            >
              <p className="todo-text">
                {"Nome: " + element.name + ", idade: " + element.age}
              </p>
              <button
                className="todo-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  removePessoa(element.id);
                }}
              >
                X
              </button>
            </div>
          );
        })}
      </section>

      <div>
        <p>Pessoa Selecionada</p>
        <p>
          nome:
          {pessoaSelected?.name + " idade: " + pessoaSelected?.age}
        </p>
        <p>Nome:</p>
        <input
          type="text"
          value={novaPessoa.name}
          onChange={(e) => {
            setNovaPessoa({ ...novaPessoa, name: e.target.value });
          }}
        />
        <p>Idade:</p>
        <input
          type="number"
          value={novaPessoa.age}
          onChange={(e) => {
            setNovaPessoa({ ...novaPessoa, age: e.target.value });
          }}
        />
        <p>Ação:</p>
        <button onClick={addPessoa}>Add Pessoa</button>
        <button onClick={updatePessoa}>Update Pessoa</button>
      </div>
    </>
  );
}
