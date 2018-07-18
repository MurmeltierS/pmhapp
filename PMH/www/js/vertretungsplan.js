class Vertretungsplan {
    constructor(pKlasseVal, pUnterGruppeVal) {
        this.klasseId = this.convertValToId(pKlasseVal);
        this.unterGruppeId = this.convertValtoId(pUnterGruppeVal);
    }

    convertValtoId(pVal) { //fügt die Nötige Anzahl an "Füllnullen" hinzu um zur Form "00326" zu kommen
        var val = pVal;
        var zeros = "";
        for (var i = 0; i < 5 - val.length; i++) {
            zeros = zeros + "0";
        }

        var id = "" + (zeros) + (val.toString());

        return id;
    }
}