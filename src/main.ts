// Modulo que permite operação com arquivos
const fs = require("fs");

// Le o arquivo json
function readJSON(filename: string) {
  const rawdata = fs.readFileSync(filename);
  const benchmarkJSON = JSON.parse(rawdata);
  return benchmarkJSON;
}


// Cria uma mensagem em formato markdown
function createMessage(benchmark, comparisonBenchmark) : string {
    let message = "## Resultado dos testes \n";
  
    // Titulo da tabela 
    message += "| Key | Current PR | Default Branch |\n";
  
    // Definição das colunas da tabela
    message += "| :--- | :---: | :---: |\n";
  
    for(const key in benchmark) {
    
      // Primeira coluna
      message += `| ${key}`;
  
      // Segunda coluna
      const value = benchmark[key];
      message += `| ${value.toFixed(2)}`;
  
      // Terceica coluna
      try {
          const oldValue = comparisonBenchmark[key];
          message += `| ${oldValue.toFixed(2)}`;
      } catch (error) {
          console.log("Não foi possível ler a chave", key, "do arquivo de comparação.")
          message += "| ";
      }
      message += "| \n";
    }
  
    return message;
  }


  // Le o arquivo criado
const benchmark = readJSON("benchmark.json")

//
const comparisonBenchmark = readJSON("benchmark.json")

// Criar uma mensagem 
const message = createMessage(benchmark, comparisonBenchmark)

// Loga no terminal
console.log(message)