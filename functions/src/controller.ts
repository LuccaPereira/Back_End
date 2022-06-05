import {Payment} from "./structurs";

/**
 * Gera um numero aleatorio inteiro entre
 * um intervalo inclusivo
 * @param {number} min - Minimo
 * @param {number} max - Maximo
 * @return {number} um número
 */
export function GetRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Gera uma string txId de tamanho 64
 * @return {string} transaction id
 */
export function GenerateTxIdStr() {
  const alfabeto = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuXx1234567890";
  const l = alfabeto.length;
  let c = 0;
  let txId = "";
  while (c < 64) {
    txId += alfabeto.charAt(GetRandomIntInclusive(0, l));
    c = c + 1;
  }
  return txId;
}
/**
 * Função que analisa se um produto é válido para ser gravado no banco.
 * Exemplo de validação na entrada. Complemente com as regras que achar
 * importante.
 * @param {payment} d - Objeto produto a ser validado.
 * @return {number} - Retorna 0 se válido ou o código de erro.
 **/
export function Analyze(valor: string, qtdeTempo: string, placa: string, pix: string) {
  if (!valor) {
    return 1;
  }
  if (!qtdeTempo) {
    return 2;
  }
  if (!placa) {
    return 3;
  }
  if (!pix) {
    return 4;
  }

  return 0;
}


/**
 * Função que dado o código de erro obtido na analyzeProduct,
 * devolve uma mensagem
 * @param {number} code - Código do erro
 * @return {string} - String com a mensagem de erro.
 */
export function MensagemErro(code: number): string {
  let message = "";
  switch (code) {
    case 1: {
      message = "Numero do cartão deve ser informado.";
      break;
    }
    case 2: {
      message = "tem de ser superior a zero";
      break;
    }
    case 3: {
      message = "tem de ser superior a zero";
      break;
    }
    case 4: {
      message = "tem de ser superior a zero";
      break;
    }
  }
  return message;
}

export function CalcValorPagar(PaymentData: Payment): Payment {
  const ret = PaymentData;
  if (PaymentData.qtdeTempo > 4 ) {
    const pagarPorHora = 0;
    const valorDahora = 10;
    const precoAtraso = PaymentData.valor + (pagarPorHora * valorDahora);
    return precoAtraso;
  }

  return ret;
}
