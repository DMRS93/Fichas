# 1. React

Normalmente me desenvolvimento web começamos por criar os websites com base em protótipos, também referidos como mockups. Caso tenham dúvidas sobre como passar de mockups para html e css podem ver este [vídeo](https://www.youtube.com/watch?v=GTyMUjhA-o4).

## 1.1. Extração de Componentes

Em React, Angular e Vue seguimos uma linha de pensamento baseada em componentes. Componentes neste domínio são excertos de código reutilizáveis, um exemplo deste tipo de código seria o header. Headers normalmente são reutilizadas ao longo de toda a aplicação e um exemplo seria:

```html
<header className="App-header">
  <h3>Todo list by "Insert Student Name"</h3>
</header>
```

O componente em React seria:

```js
export default function MyHeader() {
  return (
    <header className="App-header">
      <h3>Todo list by "Insert Student Name"</h3>
    </header>
  );
}
```

Depois no código onde queremos chamar o componente `MyHeader`, importamos:

```js
import MyHeader from "./components/MyHeader";
```

Dentro desse componente, teriamos que retornar o nosso componente (`<MyHeader />` é igual a `<MyHeader></MyHeader>`):

```js
return (
  <>
    ...
    <MyHeader />
    ...
  </>
);
```

## Uso de variáveis e props

Em React variáveis são normalmente criadas com funções especiais chamadas de `useState()` que retorna um array cujo primeiro índice é a variável e o segundo é uma função para modificar a variável.

```js
const [texto, setTexto] = useState(“”);
```

No exemplo acima estamos a criar uma variável `texto` do tipo string. Ao utilizar o `setTexto` para alterar o valor da variável `texto`, o React, tal como o nome indica, reage fazendo as componentes que utilizam esta variável renderizar de novo. Para mudar o estado das variáveis temos de usar sempre a função `setNomeVariável` porque ela notifica o react que a variável `nomeVariável` mudou e que é preciso renderizar de novo o componente.

Em react os elementos do html passam a aceitar props. Props podem ser variáveis, funções ou até mesmo objetos. Usando o exemplo do input abaixo, nós conseguimos ver que ele aceita várias props, como por exemplo um type, um value e um onChange. É possivel verificar na documentação do react [aqui](https://reactjs.org/docs/dom-elements.html) as diferentes props para os diferentes elemetos. No caso de criarmos uma componente nossa podemos obter estas props através do parâmetro props na função.

```js
function MyHeader(props) {
  return <h3>Todo list by "{props.studentName}"</h3>;
}

...

<MyHeader studentName={text} />;
```

## Pedidos HTTP

Em desenvolvimento web faz-se muito uso de pedidos a um servidor. Hoje em dia os pedidos mais normais de se encontrarem são pedidos HTTP a um servidor que segue uma arquitetura REST.

Os pedidos HTTP a um servidor REST são constituídos por alguns conceitos principais:

- Verbos http, que representam o tipo de operação que está a ser realizada. Os verbos que irão ser abordados são o GET, POST, PUT, DELETE que servem respetivamente para ir buscar informação, criar informação no servidor, atualizar informação e apagar informação;
- Urls, que em REST representam a localização da informação do servidor. Por exemplo, se quiséssemos ir buscar informação sobre uma lista de pessoas, fazíamos um pedido GET ao url `http://www.endereço/getPessoas`;
- Finalmente temos a forma como passamos e recebemos informação. Ao fazer o pedido ao url podemos passar informação diretamente no url por meio de parâmetros do url ou por um corpo. Pegando no exemplo dado anteriormente podíamos passar informação extra para filtrar dados http://`www.endereço/getPessoas?name=Jorge`. Os parâmetros do url começam obrigatoriamente depois de um ponto de interrogação e são passados, separados por um & os pares de nome do parâmetro e valor `nome_parametro=valor`. Devido as limitações das passagens por parâmetros, foi criado também a passagem por corpo. Esta abordagem coloca os parâmetros em uma parte especial do pedido inteiramente dedicada a dados. A forma como estes dados são passados depende dos valores usados no header “Content-type”.

## Pedidos usando o fetch

Vamos a um exemplo prático, pegando no exemplo anterior podemos fazer o pedido get da seguinte forma utilizando o fetch:

```js
fetch("http://www.localhost:8080/getPessoas?name=Jorge", {
  method: "GET",
  headers: {
    "Content-type": "application/json",
  },
})
  .then((response) => {
    return response.json();
  })
  .then((parsedResponse) => {
    console.log(parsedResponse);
    setPessoas(parsedResponse);
  })
  .catch((error) => {
    alert(error);
  });
```

No exemplo anterior, podemos ver que o fetch aceita 2 parametros, o URL e um objeto JSON de configuração onde são colocados coisas como o método/verbo http, headers, e o corpo(body).

```js
fetch("http://www.localhost:8080/addPessoa", {
  method: "POST",
  headers: {
    "Content-type": "application/json",
  },
  body: JSON.stringify("Corpo vai aqui!"),
})
  .then((response) => {
    return response.json();
  })
  .then((parsedResponse) => {
    //Fazer o que é necessário fazer se for sucesso a criação
  })
  .catch((error) => {
    alert(error);
  });
```

Neste exemplo como é feito um pedido POST, precisamos de passar alguma informação extra. Primeiro temos de indicar que o método é POST, depois temos de indicar que tipo de dados vamos enviar no corpo, neste caso é json, depois passamos o JSON com os parâmetros no corpo.

## Bibliotecas React

Uma boa Engenharia de software é baseada na reutilização. React usa muito este principio nas suas bibliotecas, nós temos bibliotecas que já fazem muitas coisas por nós como por exemplo:

- Para navegação temos React-Router-Dom;
- Para gestão de estado de forma global temos React Redux;
- Para componentes temos Material UI;
- Para pedidos http temos fetch e axios;
- Etc…

## Material UI

O material UI é uma biblioteca de componentes pré-feitos para facilitar o trabalho dos desenvolvedores. Ele oferece uma série de componentes que podem ser usados e que tem props parecidas com as habituais como onClick, onChange, onFocus, etc..

Quando estamos a trabalhar com bibliotecas de componentes convem primeiro analisar os [getting started guides](https://mui.com/getting-started/installation/), a lista de componentes que a [biblioteca usa](https://mui.com/components/) e as respetivas [apis dos componentes](https://mui.com/api/) para saber o que passar como props.

Alguns detalhes que temos de ter em conta que são específicos do Material UI:
• O material UI não usa os headers nem os parágrafos normais como o h1-6 e os p. Em vez disso ele usa um componente chamado Typography que aceita uma prop onde indicamos o tipo de texto que ela irá ser.
• Não somos obrigados a usar exclusivamente o leque de componentes já existente podemos continuar a criar os nossos.

# Fazer a minha primeira app

1. Fazer uma analise dos mockups e verificar as componentes que podem ser extraídas;
2. Criar as componentes sem variáveis e props;
3. Compor a ui;
4. Pensar nos dados que são precisos e ver quais componentes fazem uso desses dados;
   - Se várias componentes precisarem de o mesmo dado, colocar as variáveis na componente diretamente acima na hierarquia. Por exemplo, se tiverem uma caixa de texto e um header, coloquem a variável na componente que consegue passar como prop a variável para o header e para a caixa de texto.
   - Se componentes mais abaixo na hierarquia mudarem o estado da variável, passar a função de setNomeVariável como prop até o componente que a necessita.
5. Se virem excertos de código repetido:
   - se for de interface, é provável que pode ser passado para uma componente
   - se for de código tipo manipular lista, dar set ao estado de uma forma especifica, passar para uma função

# Outras fontes utéis para aprender React

- ReactJs guia feito pelos developers [aqui](https://reactjs.org/docs/getting-started.html);
- Crash course completo react [aqui](https://www.youtube.com/watch?v=w7ejDZ8SWv8) e [aqui](https://www.youtube.com/watch?v=4UZrsTqkcW4);
- Hooks do React Explicados [aqui](https://www.youtube.com/watch?v=TNhaISOUy6Q);
- Quick Guide de Fetch api [aqui](https://www.youtube.com/watch?v=cuEtnrL9-H0);
- Fetch API documentation [aqui](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch);
- React Router DOM documentation [aqui](https://reactrouter.com/docs/en/v6/getting-started/overview);

# Notas importante

Ter em atenção que o React está sempre em evolução e atualização. Ao ver um tutorial, verificar se está a ser utilizado a versão mais recente. Por exemplo, alguns tutoriais estão a utilizar a `versão 5 do react-router-dom` e a mais atualizada é a `versão 6` (a versão mais recente é a que deve ser utilizada).
