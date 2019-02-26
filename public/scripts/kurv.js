class Kurv {

    static TagKurv() {
        if (localStorage['kurv'] == undefined) {
            localStorage['kurv'] = JSON.stringify([]);
        }
        return JSON.parse(localStorage['kurv']);
    }

    static GemKurv(kurv) {
        for (let i = kurv.length - 1; i >= 0; i--) {
            if (kurv[i].antal <= 0) {
                kurv.splice(i, 1);
            }
        }
        localStorage['kurv'] = JSON.stringify(kurv);
    }

    static PutIKurv(id, navn, pris, antal) {
        let nyt_produkt = true;

        let kurv = Kurv.TagKurv();

        kurv.forEach(kaffe => {
            if (kaffe.id == id) {
                kaffe.antal += parseInt(antal);
                nyt_produkt = false;
            }
        });
        if (nyt_produkt) {
            kurv.push({
                'id': id,
                'navn': navn,
                'pris': parseFloat(pris),
                'antal': parseInt(antal)
            });
        }
        Kurv.GemKurv(kurv);
    }

    static SletKurv() {
        delete localStorage['kurv'];
    }

    static get Total() {
        let total = 0;
        Kurv.TagKurv().forEach(kaffe => {
            total += (kaffe.pris * kaffe.antal);
        });
        return total;
    }
}