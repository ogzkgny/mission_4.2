document.addEventListener('DOMContentLoaded', function() {
    const tahminInputlari = document.querySelectorAll("#tahminler input");
    const tahminGirButonu = document.querySelector("#tahminGir");
    const kurayiCekButonu = document.querySelector("#kurayiCek");
    const lotoSayilariDiv = document.querySelector("#lotoSayilari");
    const bilenSayilarDiv = document.querySelector("#bilenSayilar");

    tahminGirButonu.addEventListener("click", function() {
        let gecerli = true;
        let tekrarli = false;
        const tahminler = [];

        tahminInputlari.forEach(input => {
            const deger = parseInt(input.value);
            if (isNaN(deger) || deger < 1 || deger > 49) {
                alert("1-49 sayıları arasında tahminler girilmelidir!");
                gecerli = false;
                return;
            }
            if (tahminler.includes(deger)) {
                alert("Aynı tahmin bir kez girilebilir.");
                tekrarli = true;
                return;
            }
            tahminler.push(deger);
        });

        if (gecerli && !tekrarli) {
            tahminGirButonu.disabled = true;
            kurayiCekButonu.disabled = false;
            bilenSayilarDiv.innerHTML = "Tahminler girildi.";
        }
    });

    kurayiCekButonu.addEventListener("click", function() {
        if (kurayiCekButonu.disabled) return;

        const lotoSayilari = lotoSayilariniUret();
        lotoSayilariDiv.innerHTML = lotoSayilari.join(", ");

        const tahminler = Array.from(tahminInputlari).map(input => parseInt(input.value));
        const bilenSayilar = lotoSayilari.filter(num => tahminler.includes(num));
        bilenSayilarDiv.innerHTML = `Bilen sayılar: ${bilenSayilar.join(", ")}`;
        bilenSayilarDiv.innerHTML += `<br>${bilenSayilar.length} adet sayı bildiniz.`;

        kurayiCekButonu.disabled = true;
        tahminGirButonu.disabled = false;
        tahminInputlari.forEach(input => input.value = '');
    });

    function lotoSayilariniUret() {
        const sayilar = [];
        while (sayilar.length < 6) {
            const sayi = Math.floor(Math.random() * 49) + 1;
            if (!sayilar.includes(sayi)) {
                sayilar.push(sayi);
            }
        }
        return sayilar.sort((a, b) => a - b);
    }
});