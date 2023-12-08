let idProyek = document.querySelector('#id_proyek');
let idRisiko = document.querySelector('#id_risiko');
let judulProyek = document.querySelector('#judul_proyek');
let judulRisiko = document.querySelector('#judul_risiko');
let main = document.querySelector('main');
let kembaliRiskIndex = document.querySelector('#kembali_risk_index')

//Initial state for Risk
const receivedRiskData = (e) => {
    if (e.data && e.data.type === 'initiateRiskData') {
        const data = e.data.payload;

        idProyek.textContent = data.idProyek;
        idRisiko.textContent = data.idRisiko;
        judulProyek.textContent = data.namaProyek;
        judulRisiko.textContent = data.kodeRisiko;

        main.innerHTML = `<div class="upper_risiko"> <h2 class="judul_upper_risiko">Deskripsi Umum</h2>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Kode Kegiatan</h3> <p class="deskripsi_risiko">${data.kodeKegiatan}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Kegiatan Rujukan</h3> <p class="deskripsi_risiko">${data.kegiatanRujukan}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Kode Risiko</h3> <p class="deskripsi_risiko">${data.kodeRisiko}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Status Risiko</h3> <p class="deskripsi_risiko">${data.statusRisiko}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Peluang atau Ancaman</h3> <p class="deskripsi_risiko">${data.peluangAtauAncaman}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Kategori Risiko</h3> <p class="deskripsi_risiko">${data.kategoriRisiko}</p> </div> </div>+
            <div class="upper_risiko"> <h2 class="judul_upper_risiko">Identifikasi Risiko</h2>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Unit Kerja</h3> <p class="deskripsi_risiko">${data.unitKerja}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Sasaran</h3> <p class="deskripsi_risiko">${data.sasaran}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Periode Identifikasi Risiko</h3> <p class="deskripsi_risiko">${data.periodeIdentifikasiRisiko}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Deskripsi Risiko</h3> <p class="deskripsi_risiko">${data.deskripsiRisiko}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Akar Penyebab</h3> <p class="deskripsi_risiko">${data.akarPenyebab}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Indikator Risiko</h3> <p class="deskripsi_risiko">${data.indikatorRisiko}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Internal Control</h3> <p class="deskripsi_risiko">${data.internalControl}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Dampak Kualitatif</h3> <p class="deskripsi_risiko">${data.dampakKualitatif}</p> </div> </div>
            <div class="upper_risiko"> <h2 class="judul_upper_risiko">Risiko Inherent</h2>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Probabilitas</h3> <p class="deskripsi_risiko">${data.probabilitas}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Dampak</h3> <p class="deskripsi_risiko">${data.dampak}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Skor Risiko Inherent</h3> <p class="deskripsi_risiko">${data.skorRisikoInherent}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Tingkat Risiko Inherent</h3> <p class="deskripsi_risiko">${data.tingkatRisikoInherent}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Probabilitas Risiko Inherent Kualitatif</h3> <p class="deskripsi_risiko">${data.probabilitasRisikoInherentKualitatif}%</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Dampak Finansial Risiko Inherent</h3> <p class="deskripsi_risiko">Rp. ${new Intl.NumberFormat("id-ID").format(data.dampakFinansialRisikoInherent)}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Nilai Bersih Risiko Inherent</h3> <p class="deskripsi_risiko">Rp. ${new Intl.NumberFormat("id-ID").format(data.nilaiBersihRisikoInherent)}</p> </div> </div>
            <div class="upper_risiko"> <h2 class="judul_upper_risiko">Pemilik Risiko</h2>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Pemilik Risiko</h3> <p class="deskripsi_risiko">${data.pemilikRisiko}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Jabatan Pemilik Risiko</h3> <p class="deskripsi_risiko">${data.jabatanPemilikRisiko}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">No. HP Pemilik Risiko</h3> <p class="deskripsi_risiko">${data.hpPemilikRisiko}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Email Pemilik Risiko</h3> <p class="deskripsi_risiko">${data.emailPemilikRisiko}</p> </div> </div>
            <div class="upper_risiko"> <h2 class="judul_upper_risiko">Evaluasi Rencana Penanganan Risiko</h2>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Strategi</h3> <p class="deskripsi_risiko">${data.strategi}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Penanganan Risiko</h3> <p class="deskripsi_risiko">${data.penangananRisiko}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Biaya Penanganan Risiko</h3> <p class="deskripsi_risiko">Rp. ${new Intl.NumberFormat("id-ID").format(data.biayaPenangananRisiko)}</p> </div> </div>
            <div class="upper_risiko"> <h2 class="judul_upper_risiko">Penanganan</h2>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Penanganan yang Telah Dilakukan</h3> <p class="deskripsi_risiko">${data.penangananYangTelahDilakukan}</p> </div> </div>
            <div class="upper_risiko"> <h2 class="judul_upper_risiko">Risiko Residual</h2>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Probabilitas Risiko Residual</h3> <p class="deskripsi_risiko">${data.probabilitasRisikoResidual}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Dampak Risiko Residual</h3> <p class="deskripsi_risiko">${data.dampakRisikoResidual}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Skor Risiko Residual</h3> <p class="deskripsi_risiko">${data.skorRisikoResidual}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Tingkat Risiko Residual</h3> <p class="deskripsi_risiko">${data.tingkatRisikoResidual}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Probabilitas Risiko Residual Kualitatif</h3> <p class="deskripsi_risiko">${data.probabilitasRisikoResidualKualitatif}%</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Dampak Finansial Risiko Residual</h3> <p class="deskripsi_risiko">Rp. ${new Intl.NumberFormat("id-ID").format(data.dampakFinansialRisikoResidual)}</p> </div>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Nilai Bersih Risiko Residual</h3> <p class="deskripsi_risiko">Rp. ${new Intl.NumberFormat("id-ID").format(data.nilaiBersihRisikoResidual)}</p> </div> </div>
            <div class="upper_risiko"> <h2 class="judul_upper_risiko">Departemen</h2>
            <div class="risiko"> <h3 class="judul_deskripsi_risiko">Departemen (Unit Kerja)</h3> <p class="deskripsi_risiko">${data.departemenUnitKerja}</p> </div> </div>`;
    };
};

window.addEventListener('message', receivedRiskData);

window.risk.initiateRisk();

//Return to Risk Index
kembaliRiskIndex.addEventListener('click', (e) => {
    window.risk.showProject(idProyek.textContent);
})