let idProyek = document.querySelector('#id_proyek');
let judulProyek = document.querySelector('#judul_proyek')
let kembaliRiskIndex = document.querySelector('#kembali_risk_index')
let riskInputForm = document.querySelector('#risk_input_form');

function formatNumber(number) {
    return new Intl.NumberFormat('id-ID').format(number);
}

function getFinalValue(value) {
    return value.replace(/[^\d]/g, '');
}

//Initiate state for Risk Input
const receivedRiskData = (e) => {
    if (e.data && e.data.type === 'initiateRiskInputData') {
        const data = e.data.payload;

        idProyek.textContent = `${data.idProyek}`;
        judulProyek.textContent = `${data.namaProyek}`
    };
};

window.addEventListener('message', receivedRiskData);

window.risk.initiateRiskInput();

//Return to Risk Index
kembaliRiskIndex.addEventListener('click', (e) => {
    window.risk.showProject(idProyek.textContent);
})

//Intercept number input
let probabilitasRisikoInherentKualitatif = document.querySelector('#probabilitas_risiko_inherent_kualitatif');
probabilitasRisikoInherentKualitatif.addEventListener('input', (e) => {
    let value = e.target.value;
    value = (value === '%') ? '' : value;
    value = value.replace(/\D/g, '');
    value = parseInt(value, 10)
    if (isNaN(value)) {
        value = ''; 
    }
    value = value + '%';
    let cursorPosition = e.target.selectionStart;
    e.target.value = value;
    e.target.setSelectionRange(cursorPosition, cursorPosition);
})

let dampakFinansialRisikoInherent = document.querySelector('#dampak_finansial_risiko_inherent');
dampakFinansialRisikoInherent.addEventListener('input', (e) => {
    let value = e.target.value;
    value = (value === 'Rp. ') ? '0' : value;
    value = value.replace(/\D/g, '');
    value = formatNumber(value);
    value = 'Rp. ' + value;
    e.target.value = value;
})

let biayaPenangananRisiko = document.querySelector('#biaya_penanganan_risiko');
biayaPenangananRisiko.addEventListener('input', (e) => {
    let value = e.target.value;
    value = (value === 'Rp. ') ? '0' : value;
    value = value.replace(/\D/g, '');
    value = formatNumber(value);
    value = 'Rp. ' + value;
    e.target.value = value;
})

let probabilitasRisikoResidualKualitatif = document.querySelector('#probabilitas_risiko_residual_kualitatif');
probabilitasRisikoResidualKualitatif.addEventListener('input', (e) => {
    let value = e.target.value;
    value = (value === '%') ? '' : value;
    value = value.replace(/\D/g, '');
    value = parseInt(value, 10)
    if (isNaN(value)) {
        value = '';
    }
    value = value + '%';
    let cursorPosition = e.target.selectionStart;
    e.target.value = value;
    e.target.setSelectionRange(cursorPosition, cursorPosition);
})

let dampakFinansialRisikoResidual = document.querySelector('#dampak_finansial_risiko_residual');
dampakFinansialRisikoResidual.addEventListener('input', (e) => {
    let value = e.target.value;
    value = (value === 'Rp. ') ? '0' : value;
    value = value.replace(/\D/g, '');
    value = formatNumber(value);
    value = 'Rp. ' + value;
    e.target.value = value;
})

//Submit form
riskInputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let kodeKegiatan = document.querySelector('#kode_kegiatan').value;
    let kegiatanRujukan = document.querySelector('#kegiatan_rujukan').value;
    let kodeRisiko = document.querySelector('#kode_risiko').value;
    let statusRisiko = document.querySelector('#status_risiko').value;
    let peluangAtauAncaman = document.querySelector('#peluang_atau_ancaman').value;
    let kategoriRisiko = document.querySelector('#kategori_risiko').value;

    let unitKerja = document.querySelector('#unit_kerja').value;
    let sasaran = document.querySelector('#sasaran').value;
    let periodeIdentifikasiRisiko = document.querySelector('#periode_identifikasi_risiko').value;
    let deskripsiRisiko = document.querySelector('#deskripsi_risiko').value;
    let akarPenyebab = document.querySelector('#akar_penyebab').value;
    let indikatorRisiko = document.querySelector('#indikator_risiko').value;
    let internalControl = document.querySelector('#internal_control').value;
    let dampakKualitatif = document.querySelector('#dampak_kualitatif').value;

    let probabilitas = document.querySelector('#probabilitas').value;
    let dampak = document.querySelector('#dampak').value;
    let probabilitasRisikoInherentKualitatif = getFinalValue(document.querySelector('#probabilitas_risiko_inherent_kualitatif').value);
    let dampakFinansialRisikoInherent = getFinalValue(document.querySelector('#dampak_finansial_risiko_inherent').value);

    let pemilikRisiko = document.querySelector('#pemilik_risiko').value;
    let jabatanPemilikRisiko = document.querySelector('#jabatan_pemilik_risiko').value;
    let hpPemilikRisiko = document.querySelector('#hp_pemilik_risiko').value;
    let emailPemilikRisiko = document.querySelector('#email_pemilik_risiko').value;

    let strategi = document.querySelector('#strategi').value;
    let penangananRisiko = document.querySelector('#penanganan_risiko').value;
    let biayaPenangananRisiko = getFinalValue(document.querySelector('#biaya_penanganan_risiko').value);
    let penangananYangTelahDilakukan = document.querySelector('#penanganan_yang_telah_dilakukan').value;
    let probabilitasRisikoResidual = document.querySelector('#probabilitas_risiko_residual').value;
    let dampakRisikoResidual = document.querySelector('#dampak_risiko_residual').value;
    let probabilitasRisikoResidualKualitatif = getFinalValue(document.querySelector('#probabilitas_risiko_residual_kualitatif').value);
    let dampakFinansialRisikoResidual = getFinalValue(document.querySelector('#dampak_finansial_risiko_residual').value);
    let departemenUnitKerja = document.querySelector('#departemen_unit_kerja').value;

    let skorRisikoInherent = (parseInt(probabilitas) * parseInt(dampak)).toString() || null;
    let tingkatRisikoInherent = window.risk.tingkatRisiko(skorRisikoInherent) || null;
    let nilaiBersihRisikoInherent = ((parseInt(probabilitasRisikoInherentKualitatif)/100) * parseInt(dampakFinansialRisikoInherent)).toString() || null;
    let skorRisikoResidual = (parseInt(probabilitasRisikoResidual) * parseInt(dampakRisikoResidual)).toString() || null;
    let tingkatRisikoResidual = window.risk.tingkatRisiko(skorRisikoResidual) || null;
    let nilaiBersihRisikoResidual = ((parseInt(probabilitasRisikoResidualKualitatif)/100) * parseInt(dampakFinansialRisikoResidual)).toString() || null;

    let obj = {
        kodeKegiatan, kegiatanRujukan, kodeRisiko, statusRisiko, peluangAtauAncaman, kategoriRisiko, unitKerja, sasaran, periodeIdentifikasiRisiko, deskripsiRisiko,
        akarPenyebab, indikatorRisiko, internalControl, dampakKualitatif, probabilitas, dampak, skorRisikoInherent, tingkatRisikoInherent,
        probabilitasRisikoInherentKualitatif, dampakFinansialRisikoInherent, nilaiBersihRisikoInherent, pemilikRisiko, jabatanPemilikRisiko,
        hpPemilikRisiko, emailPemilikRisiko, strategi, penangananRisiko, biayaPenangananRisiko, penangananYangTelahDilakukan, probabilitasRisikoResidual,
        dampakRisikoResidual, skorRisikoResidual, tingkatRisikoResidual, probabilitasRisikoResidualKualitatif, dampakFinansialRisikoResidual,
        nilaiBersihRisikoResidual, departemenUnitKerja
    }

    let ary = [idProyek.textContent, obj]

    window.risk.createRisiko(ary)
});