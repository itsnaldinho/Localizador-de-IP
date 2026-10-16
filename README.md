# Localizador de IP NAT (CGNAT)

Uma ferramenta web leve e segura desenvolvida em Google Apps Script (HTML, CSS e JavaScript) para provedores de internet e analistas de redes. O sistema tem o propósito de investigar logs de CGNAT, localizando qual IP privado (NAT) estava utilizando um determinado IP público (Válido) e Porta em um dia e horário exatos.

## 🌟 Benefícios e Funcionalidades

* **Processamento 100% Client-Side (Privacidade e Velocidade):** Toda a leitura, filtragem por Regex e reconstrução de sessões ocorre diretamente na memória do navegador do usuário. Nenhum arquivo de log (`.txt` ou `.log`) é enviado para os servidores do Google, garantindo sigilo total de dados sensíveis e evitando lentidão de upload.
* **Reconstrução Inteligente de Sessões:** O script rastreia as tags `T` (início da sessão) e `Y` (fim da sessão) no log para determinar exatamente o intervalo de tempo em que a porta esteve alocada ao cliente.
* **Suporte a Múltiplos Dias:** Como as sessões de internet frequentemente atravessam a meia-noite, a interface possui três slots de upload de arquivo (Dia Anterior, Dia da Ocorrência, Dia Posterior)[cite: 8]. Se o sistema localizar o fim de uma sessão mas não o início, ele orientará o usuário a anexar o arquivo do dia anterior[cite: 8].
* **Tratamento de Virada de Ano:** O código possui uma função dedicada (`resolverAno`) que deduz o ano correto caso o evento ocorra entre dezembro e janeiro, já que algumas linhas de log de roteadores registram apenas o mês e o dia[cite: 8].

---

## 🚀 Pré-work (Como colocar o código em funcionamento)

Como não há uso de planilhas ou banco de dados, a implantação é direta e simples:

### 1. Configurar o Google Apps Script
1. Acesse o [Google Apps Script](https://script.google.com/) e crie um "Novo Projeto".
2. Crie dois arquivos no projeto:
   * **`codigo.gs`**: Cole o código backend fornecido, que contém apenas a função `doGet()` para renderizar a página[cite: 8].
   * **`Index.html`**: Crie um arquivo HTML e cole todo o código de frontend (CSS, layout e JavaScript lógico)[cite: 8].

### 2. Deploy (Implantação)
1. No canto superior direito, clique em **Implantar > Nova implantação**.
2. Selecione o tipo **App da Web** (ícone de engrenagem).
3. Configurações:
   * **Executar como:** *Eu*
   * **Quem pode acessar:** Escolha *Somente eu*, *Qualquer pessoa em seu domínio* ou *Qualquer pessoa*, dependendo da política de segurança da sua empresa.
4. Clique em **Implantar**. Autorize as permissões solicitadas e copie o link gerado (URL do Web App).

---

## 🛠️ Customização: Implementando em um Novo Ambiente

Se você precisar utilizar este sistema em outro provedor ou com equipamentos de rede diferentes, as seguintes alterações são estritamente necessárias:

### 1. Ajuste da Expressão Regular (Regex) do Log
Esta é a alteração mais importante. O sistema atualmente busca linhas em um formato Syslog específico (ex: `<135> Jul  4 23:46:33.69 CGNAT-VOX-MCL NAT-UDP-T: 100.65.7.135 -> 187.62.199.124:51712,52223#015`)[cite: 8]. 
Se o seu roteador (MikroTik, Huawei, Cisco, Juniper) gera logs estruturados de maneira diferente, você **deve** atualizar a constante `LINE_RE` no arquivo `Index.html`:
```javascript
const LINE_RE = /^<\d+>\s+(\w{3})\s+(\d{1,2})\s+(\d{2}):(\d{2}):(\d{2})\.\d+\s+\S+\s+NAT-(TCP|UDP)-([TY]):\s+([\d.]+)\s+->\s+([\d.]+):(\d+),(\d+)/;
