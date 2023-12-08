let idProyek = document.querySelector('#id_proyek');
let idRisiko = document.querySelector('#id_risiko');
let judulProyek = document.querySelector('#judul_proyek');
let judulRisiko = document.querySelector('#judul_risiko');
let kembaliRiskIndex = document.querySelector('#kembali_risk_index');
let riskInputForm = document.querySelector('#risk_input_form');

let kodeKegiatan = document.querySelector('#kode_kegiatan');
let kegiatanRujukan = document.querySelector('#kegiatan_rujukan');
let kodeRisiko = document.querySelector('#kode_risiko');
let statusRisiko = document.querySelector('#status_risiko');
let peluangAtauAncaman = document.querySelector('#peluang_atau_ancaman');
let kategoriRisiko = document.querySelector('#kategori_risiko');

let unitKerja = document.querySelector('#unit_kerja');
let sasaran = document.querySelector('#sasaran');
let periodeIdentifikasiRisiko = document.querySelector('#periode_identifikasi_risiko');
let deskripsiRisiko = document.querySelector('#deskripsi_risiko');
let akarPenyebab = document.querySelector('#akar_penyebab');
let indikatorRisiko = document.querySelector('#indikator_risiko');
let internalControl = document.querySelector('#internal_control');
let dampakKualitatif = document.querySelector('#dampak_kualitatif');

let probabilitas = document.querySelector('#probabilitas');
let dampak = document.querySelector('#dampak');
let probabilitasRisikoInherentKualitatif = document.querySelector('#probabilitas_risiko_inherent_kualitatif');
let dampakFinansialRisikoInherent = document.querySelector('#dampak_finansial_risiko_inherent');

let pemilikRisiko = document.querySelector('#pemilik_risiko');
let jabatanPemilikRisiko = document.querySelector('#jabatan_pemilik_risiko');
let hpPemilikRisiko = document.querySelector('#hp_pemilik_risiko');
let emailPemilikRisiko = document.querySelector('#email_pemilik_risiko');

let strategi = document.querySelector('#strategi');
let penangananRisiko = document.querySelector('#penanganan_risiko');
let biayaPenangananRisiko = document.querySelector('#biaya_penanganan_risiko');
let penangananYangTelahDilakukan = document.querySelector('#penanganan_yang_telah_dilakukan');
let probabilitasRisikoResidual = document.querySelector('#probabilitas_risiko_residual');
let dampakRisikoResidual = document.querySelector('#dampak_risiko_residual');
let probabilitasRisikoResidualKualitatif = document.querySelector('#probabilitas_risiko_residual_kualitatif');
let dampakFinansialRisikoResidual = document.querySelector('#dampak_finansial_risiko_residual');
let departemenUnitKerja = document.querySelector('#departemen_unit_kerja');

function formatNumber(number) {
    return new Intl.NumberFormat('id-ID').format(number);
}

function getFinalValue(value) {
    return value.replace(/[^\d]/g, '');
}

//Intercept number input
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

dampakFinansialRisikoInherent.addEventListener('input', (e) => {
    let value = e.target.value;
    value = (value === 'Rp. ') ? '0' : value;
    value = value.replace(/\D/g, '');
    value = formatNumber(value);
    value = 'Rp. ' + value;
    e.target.value = value;
})

biayaPenangananRisiko.addEventListener('input', (e) => {
    let value = e.target.value;
    value = (value === 'Rp. ') ? '0' : value;
    value = value.replace(/\D/g, '');
    value = formatNumber(value);
    value = 'Rp. ' + value;
    e.target.value = value;
})

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

dampakFinansialRisikoResidual.addEventListener('input', (e) => {
    let value = e.target.value;
    value = (value === 'Rp. ') ? '0' : value;
    value = value.replace(/\D/g, '');
    value = formatNumber(value);
    value = 'Rp. ' + value;
    e.target.value = value;
})

//Initiate state for Risk Input
const receivedRiskEditData = (e) => {
    if (e.data && e.data.type === 'initiateRiskEditData') {
        const data = e.data.payload;
        
        idProyek.textContent = data.idProyek;
        idRisiko.textContent = data.idRisiko;
        judulProyek.textContent = data.namaProyek;
        judulRisiko.textContent = data.kodeRisiko;
        
        kodeKegiatan.value = data.kodeKegiatan;
        kegiatanRujukan.value = data.kegiatanRujukan;
        kodeRisiko.value = data.kodeRisiko;
        statusRisiko.value = data.statusRisiko;
        peluangAtauAncaman.value = data.peluangAtauAncaman;
        kategoriRisiko.value = data.kategoriRisiko;

        unitKerja.value = data.unitKerja;
        sasaran.value = data.sasaran;
        periodeIdentifikasiRisiko.value = data.periodeIdentifikasiRisiko;
        deskripsiRisiko.value = data.deskripsiRisiko;
        akarPenyebab.value = data.akarPenyebab;
        indikatorRisiko.value = data.indikatorRisiko;
        internalControl.value = data.internalControl;
        dampakKualitatif.value = data.dampakKualitatif;

        probabilitas.value = data.probabilitas;
        dampak.value = data.dampak;
        probabilitasRisikoInherentKualitatif.value = data.probabilitasRisikoInherentKualitatif + '%';
        dampakFinansialRisikoInherent.value = `Rp. ${new Intl.NumberFormat("id-ID").format(data.dampakFinansialRisikoInherent)}`;

        pemilikRisiko.value = data.pemilikRisiko;
        jabatanPemilikRisiko.value = data.jabatanPemilikRisiko;
        hpPemilikRisiko.value = data.hpPemilikRisiko;
        emailPemilikRisiko.value = data.emailPemilikRisiko;

        strategi.value = data.strategi;
        penangananRisiko.value = data.penangananRisiko;
        biayaPenangananRisiko.value = `Rp. ${new Intl.NumberFormat("id-ID").format(data.biayaPenangananRisiko)}`;
        penangananYangTelahDilakukan.value = data.penangananYangTelahDilakukan;
        probabilitasRisikoResidual.value = data.probabilitasRisikoResidual;
        dampakRisikoResidual.value = data.dampakRisikoResidual;
        probabilitasRisikoResidualKualitatif.value = data.probabilitasRisikoResidualKualitatif + '%';
        dampakFinansialRisikoResidual.value = `Rp. ${new Intl.NumberFormat("id-ID").format(data.dampakFinansialRisikoResidual)}`;
        departemenUnitKerja.value = data.departemenUnitKerja;
    };
};

window.addEventListener('message', receivedRiskEditData);

window.risk.initiateRiskEdit();

//Return to Risk Index
kembaliRiskIndex.addEventListener('click', (e) => {
    window.risk.showProject(idProyek.textContent);
})

//Submit form
riskInputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let skorRisikoInherent = (parseInt(probabilitas.value) * parseInt(dampak.value)).toString() || null;
    let tingkatRisikoInherent = window.risk.tingkatRisiko(skorRisikoInherent) || null;
    let nilaiBersihRisikoInherent = ((parseInt(getFinalValue(probabilitasRisikoInherentKualitatif.value)) / 100) * parseInt(getFinalValue(dampakFinansialRisikoInherent.value))).toString() || null;
    let skorRisikoResidual = (parseInt(probabilitasRisikoResidual.value) * parseInt(dampakRisikoResidual.value)).toString() || null;
    let tingkatRisikoResidual = window.risk.tingkatRisiko(skorRisikoResidual) || null;
    let nilaiBersihRisikoResidual = ((parseInt(getFinalValue(probabilitasRisikoResidualKualitatif.value)) / 100) * parseInt(getFinalValue(dampakFinansialRisikoResidual.value))).toString() || null;

    let obj = {
        idRisiko: idRisiko.textContent, kodeKegiatan: kodeKegiatan.value, kegiatanRujukan: kegiatanRujukan.value, kodeRisiko: kodeRisiko.value, statusRisiko: statusRisiko.value, peluangAtauAncaman: peluangAtauAncaman.value, kategoriRisiko: kategoriRisiko.value,
        unitKerja: unitKerja.value, sasaran: sasaran.value, periodeIdentifikasiRisiko: periodeIdentifikasiRisiko.value, deskripsiRisiko: deskripsiRisiko.value, akarPenyebab: akarPenyebab.value,
        indikatorRisiko: indikatorRisiko.value, internalControl: internalControl.value, dampakKualitatif: dampakKualitatif.value, probabilitas: probabilitas.value, dampak:dampak.value,
        skorRisikoInherent: skorRisikoInherent, tingkatRisikoInherent: tingkatRisikoInherent, probabilitasRisikoInherentKualitatif: getFinalValue(probabilitasRisikoInherentKualitatif.value),
        dampakFinansialRisikoInherent: getFinalValue(dampakFinansialRisikoInherent.value), nilaiBersihRisikoInherent: nilaiBersihRisikoInherent, pemilikRisiko:pemilikRisiko.value,
        jabatanPemilikRisiko: jabatanPemilikRisiko.value, hpPemilikRisiko: hpPemilikRisiko.value, emailPemilikRisiko: emailPemilikRisiko.value, strategi: strategi.value, penangananRisiko: penangananRisiko.value,
        biayaPenangananRisiko: getFinalValue(biayaPenangananRisiko.value), penangananYangTelahDilakukan: penangananYangTelahDilakukan.value, probabilitasRisikoResidual:probabilitasRisikoResidual.value,
        dampakRisikoResidual: dampakRisikoResidual.value, skorRisikoResidual: skorRisikoResidual, tingkatRisikoResidual: tingkatRisikoResidual, probabilitasRisikoResidualKualitatif: getFinalValue(probabilitasRisikoResidualKualitatif.value),
        dampakFinansialRisikoResidual: getFinalValue(dampakFinansialRisikoResidual.value), nilaiBersihRisikoResidual: nilaiBersihRisikoResidual, departemenUnitKerja:departemenUnitKerja.value
    };

    let ary = [idProyek.textContent, obj];

    window.risk.riskEdit(ary);
});