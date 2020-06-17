import readline from "readline";
import fs from "fs";
import File from "../../models/File";

class FileController {
  async index(req, res) {}

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
