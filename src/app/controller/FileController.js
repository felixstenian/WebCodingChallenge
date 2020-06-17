import readline from "readline";
import fs from "fs";
import File from "../../models/File";
import {
  startOfHour,
  parseISO,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from "date-fns";

class FileController {
  async index(req, res) {
    const data = [
      "Diminuindo tempo de execução de testes em aplicações Rails enterprise 60min;",
      "Reinventando a roda em ASP clássico 45min;",
      "Apresentando Lua para as massas 30min;",
      "Erros de Ruby oriundos de versões erradas de gems 45min;",
      "Erros comuns em Ruby 45min;",
      "Rails para usuários de Django lightning;",
      "Trabalho remoto: prós e cons 60min;",
      "Desenvolvimento orientado a gambiarras 45min;",
      "Aplicações isomórficas: o futuro (que talvez nunca chegaremos) 30min;",
      "Codifique menos, Escreva mais! 30min;",
      "Programação em par 45min;",
      "A mágica do Rails: como ser mais produtivo 60min;",
      "Ruby on Rails: Por que devemos deixá-lo para trás 60min;",
      "Clojure engoliu Scala: migrando minha aplicação 45min;",
      "Ensinando programação nas grotas de Maceió 30min;",
      "Ruby vs. Clojure para desenvolvimento backend 30min;",
      "Manutenção de aplicações legadas em Ruby on Rails 60min;",
      "Um mundo sem StackOverflow 30min;",
      "Otimizando CSS em aplicações Rails 30min;",
    ];

    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];

    // }
    const schedulesTrackA = {
      "Track A": {
        "09:00": "",
        "10:00": "",
        "10:45": "",
        "11:15": "",
        "12:00": "Almoço",
        "13:00": "",
        "14:00": "",
        "14:15": "",
        "14:45": "",
        "15:30": "",
        "16:00": "",
        "16:30": "",
        "17:00": "Evento de Networking.",
      },
    };

    const schedulesTrackB = {
      "Track B": {
        "09:00": "",
        "10:00": "",
        "10:45": "",
        "11:15": "",
        "12:00": "Almoço",
        "13:00": "",
        "14:00": "",
        "14:15": "",
        "14:45": "",
        "15:30": "",
        "16:00": "",
        "16:30": "",
        "17:00": "Evento de Networking.",
      },
    };

    const teste = [];

    const tt = data.map((palestra) => {
      var parts = palestra.split(" ");
      var positionTempo = parts.length - 1;
      var duracao = parts[positionTempo].split(/\s*;\s*/)[0];
      var tempoMin = duracao.split(/(\d)/);
      var tempo = parseInt(tempoMin[1] + tempoMin[3]);
      if (duracao == "lightning") {
        var tempo = 5;
      }

      return {
        palestra,
        tempo,
      };
    });

    return res.json(tt);
  }

  async store(req, res) {
    const file = req.file;

    const fileStream = fs.createReadStream(file.path);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    const list = [];
    for await (const line of rl) {
      list.push(line);
    }

    const tt = list.map((palestra) => {
      var parts = palestra.split(" ");
      var positionTempo = parts.length - 1;
      var duracao = parts[positionTempo].split(/\s*;\s*/)[0];
      var tempoMin = duracao.split(/(\d)/);
      var tempo = parseInt(tempoMin[1] + tempoMin[3]);
      if (duracao == "lightning") {
        var tempo = 5;
      }

      return {
        palestra: palestra,
        tempo: tempo,
      };
    });

    const Palestras = {
      TrackA: [],
      TrackB: [],
    };

    for (let index = 0; index < tt.length; index++) {
      if (Palestras.TrackA.length < 9) {
        Palestras.TrackA.push(tt[index].palestra);
      } else if (Palestras.TrackB.length < 10) {
        Palestras.TrackB.push(tt[index].palestra);
      }
    }

    return res.json({
      "Traker A": {
        "09:00": Palestras.TrackA[0],
        "10:00": Palestras.TrackA[1],
        "10:45": Palestras.TrackA[2],
        "11:15": Palestras.TrackA[3],
        "12:00": "Almoço",
        "13:00": Palestras.TrackA[6],
        "14:00": Palestras.TrackA[4],
        "14:45": Palestras.TrackA[7],
        "15:30": Palestras.TrackA[9],
        "16:00": Palestras.TrackA[8],
        "16:30": Palestras.TrackB[0],
        "17:00": "Evento de Networking.",
      },
      "Traker B": {
        "09:00": Palestras.TrackB[2],
        "10:00": Palestras.TrackB[3],
        "11:00": Palestras.TrackB[6],
        "11:30": Palestras.TrackB[9],
        "12:00": "Almoço",
        "13:00": Palestras.TrackB[1],
        "13:45": Palestras.TrackB[4],
        "14:30": Palestras.TrackB[5],
        "15:00": Palestras.TrackB[7],
        "16:00": Palestras.TrackB[8],
        "16:30": Palestras.TrackA[5],
        "17:00": "Evento de Networking.",
      },
    });
  }
}

export default new FileController();
