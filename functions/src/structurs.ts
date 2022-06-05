export interface Payment {
  placa: string,
  qtdeTempo: any,
  valor: any,
  pix: string,
}

export interface PaymentRequest {
  numeroCartao: number,
  validadeMes: number,
  validadeAno: number,
  cvv: number,
  titular: string,
}
