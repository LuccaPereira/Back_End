import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {Payment} from "./structurs";
import {Analyze as analyzi, GenerateTxIdStr as generateTxIdStr, getRandomIntInclusive as getRandomIntInclusive, MensagemErro as nensagemErro} from "./controller";

const app = admin.initializeApp();
const db = app.firestore();
const PaymentCollection = db.collection("Pagamento");
/* const PaymentRequired = db.collection("PagamentoDoResto"); */

export const addPagamento = functions
    .region("southamerica-east1")
    .https.onCall(async (PaymentData: Payment): Promise<Payment> => {
      let result: Payment;
      // inclua aqui a validacao.
      const errorCode = analyzi(PaymentData.valor, PaymentData.qtdeTempo, PaymentData.placa, PaymentData.pix);

      const errorMessage = nensagemErro(errorCode);
      if (errorCode > 0) {
        result = {
          placa: "Unlucky",
          qtdeTempo: "ERROR",
          valor: "0",
          pix: errorMessage,
        };
        console.log(result);
      } else {
        const docRef = await PaymentCollection.add({
          valor: PaymentData.valor,
          qtdeTempo: PaymentData.qtdeTempo,
          placa: PaymentData.placa,
          pix: PaymentData.pix,
        });

        result = {
          placa: "SUCESSO",
          qtdeTempo: "SUCESSO",
          valor: "SUCESSO",
          pix: docRef.id.toString(),
        };
        console.log(result);
      }
      return result;
    });

export const processarPagamentoTicket = functions
    .https.onCall(async (PaymentData: Payment) => {
      const Tickets = await PaymentCollection.get();
      const foundTicket = Tickets.forEach((ticket: any) =>{
        const ticketData = ticket.data();
        if (ticketData.placa = PaymentData.placa) {
          return generateTxIdStr();
        }
        if (ticketData.placa = PaymentData.valor) {
          return PaymentData.valor;
        }
        if (ticketData.placa = PaymentData.qtdeTempo) {
          return PaymentData.qtdeTempo;
        }
        if (ticketData.placa = PaymentData.pix) {
          return PaymentData.pix;
        }
      });
      const sorteio = getRandomIntInclusive(0, 1);
      if (sorteio === 1) {
        return foundTicket;
      } else {
        return "Não autorizada";
      }
    });

/*
export const processarPagamento = functions
    .https.onCall(async () => {
      const paymentRequest: Array<PaymentRequest> = [];
      const snapshot = await PaymentRequired.get();
      let dadosOutros: PaymentRequest;
      snapshot.forEach((doc:any) => {
        const d = doc.data(paymentRequest);
        dadosOutros = {
          numeroCartao: d.numeroCartao,
          validadeMes: d.validadeMes,
          validadeAno: d.validadeAno,
          cvv: d.cvv,
          titular: d.titular,
        };
        paymentRequest.push(dadosOutros);
      });
      const sorteio = getRandomIntInclusive(0, 1);
      if (sorteio === 1) {
        const transactionId = generateTxIdStr();
        return transactionId;
      } else {
        return "Não autorizada";
      }
    });
*/
