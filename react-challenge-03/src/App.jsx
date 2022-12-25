/*
* CHALLENGE progresso do formulário

* INSTRUÇÕES
Neste desafio sua missão é criar um formulário e seus 4 campos (com controlled inputs),
juntamente com uma barra de progresso que altera-se conforme o usuário preenche os campos.
- Crie também validações para cada campo conforme instruções abaixo.

* BARRA DE PROGRESSO
Para aproveitar estilização já definida, crie:
- a barra com um elemento pai chamado .bar-container e seu filho .bar

* CAMPOS DO FORMULÁRIO:
input - nome completo - válido se digitar no mínimo dois nomes,
input - email - válido se digitar um e-mail,
select - estado civil,
radio - gênero

Para validação de e-mail use a seguinte RegEx: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

* FUNCIONAMENTO
Espera-se que o formulário tenha 4 campos ao todo. Portanto, quando o usuário preencher
o primeiro campo, a barra de progresso deve assumir 25% do tamanho total;
o segundo campo, 50% e assim por diante...

Caso o usuário não tenha definido valores para os elementos de select e radio,
os mesmos não devem ser considerados como preenchidos até então.

Se o usuário preencher um campo e apagar seu valor, este campo deve ser considerado como vazio,
fazendo com que a barra de progresso regrida novamente.

Desabilitar o botão de enviar caso todos os campos não estejam preenchidos/válidos.

Ao enviar, deve-se apresentar um alert javascript com sucesso, limpar todos os campos
do formulário e zerar a barra de progresso novamente.
*/

import { useEffect, useState } from "react";

function App() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [maritalStatus, setMaritalStatus] = useState("");
  // const [gender, setGender] = useState("");
  const [data, setData] = useState({
    name: "",
    email: "",
    maritalStatus: "",
    gender: "",
  });
  const [statusBar, setStatusBar] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      const newData = { ...prev, [name]: value };
      return newData;
    });
  };

  const progress = () => {
    let value = 0;
    if (data.name) {
      // if (data.name.trim().indexOf(" ") != -1) {
      //   value += 25;
      // }
      if (data.name.split(" ")[1]) {
        value = +25;
      }
    }
    if (data.email) {
      let regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(data.email)) {
        value += 25;
      }
    }
    if (data.maritalStatus) {
      value += 25;
    }
    if (data.gender) {
      value += 25;
    }
    return value;
  };

  const handleSubmit = () => {
    alert("Formulário enviado com sucesso!");
    console.log(data);
    setData({
      name: "",
      email: "",
      maritalStatus: "",
      gender: "",
    });
  };

  return (
    <div className="App">
      <h3>desafio fernandev</h3>
      <h1>progresso do formulário</h1>

      <main>
        <div className="bar-container">
          <div className="bar" style={{ width: `${progress()}%` }}></div>
        </div>
        <div className="form-group">
          <label htmlFor="name">Nome Completo</label>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={data.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={data.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="maritalStatus">Estado Civil</label>
          <select
            name="maritalStatus"
            onChange={handleChange}
            value={data.maritalStatus}
          >
            <option value="">- selecione...</option>
            <option value="solteiro">Solteiro</option>
            <option value="casado">Casado</option>
            <option value="divorciado">Divorciado</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="">Gênero</label>
          <div className="radios-container">
            <span>
              <input
                type="radio"
                name="gender"
                value="masculino"
                onChange={handleChange}
                checked={data.gender === "masculino"}
              />
              Masculino
            </span>
            <span>
              <input
                type="radio"
                name="gender"
                value="feminino"
                onChange={handleChange}
                checked={data.gender === "feminino"}
              />
              Feminino
            </span>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={
            !data.name || !data.email || !data.maritalStatus || !data.gender
          }
        >
          Enviar Formulário
        </button>
      </main>
    </div>
  );
}

export default App;
