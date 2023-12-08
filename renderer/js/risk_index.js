let main = document.querySelector('main');
let upperContent = document.querySelector('#upper_content');
let kembaliIndex = document.querySelector('#kembali_index');
let buatBaruRisk = document.querySelector('#buat_baru_risk');
let cari = document.querySelector('#cari')

//Initial state for Risk Index
const receivedProjectData = (e) => {
    if (e.data && e.data.type === 'initiateProjectData') {
        const data = e.data.payload;
        const risks = data.risks;

        main.innerHTML = '';

        let paragraphNode = document.createElement('p');
        paragraphNode.setAttribute('id', 'tidak_ada_risiko');
        paragraphNode.textContent = 'Tidak ada Risiko';

        main.appendChild(paragraphNode);

        upperContent.innerHTML = '';

        let projectNode = document.createElement('div');
        projectNode.setAttribute('id', 'proyek_detail');
        projectNode.innerHTML = `<div id="left_proyek_detail"> <h2 id="proyek_detail_id_proyek">${data.idProyek}</h2> 
        <h2 id="proyek_detail_nama_proyek">${data.namaProyek}</h2> <h2 id="proyek_detail_tahun_anggaran">${data.tahunAnggaran}</h2> 
        </div> <div id="right_proyek_detail"> <h2 id="proyek_detail_nama_opd">${data.namaOPD}</h2> </div>`

        upperContent.appendChild(projectNode);

        for (let i = 0; i < risks.length; i++) {
            let riskNode = document.createElement('div');
            riskNode.setAttribute('class', 'ada_risiko')
            
            let { idRisiko, kodeRisiko, kategoriRisiko, deskripsiRisiko } = risks[i]
            riskNode.innerHTML = `<div class="ada_risiko_div"> <div class="left_ada_risiko_div"> <h2 class="ada_risiko_h2_id_risiko">${idRisiko}</h2> <h2 class="ada_risiko_h2_kode_risiko">${kodeRisiko}</h2>
            <h3 class="ada_risiko_h3_kategori_risiko">${kategoriRisiko}</h3> </div> <div class="right_ada_risiko_div"> <select class="ada_risiko_action" name="action"> <option value="opsi" disabled selected hidden>OPSI</option>
            <option value="buka">BUKA</option> <option value="edit">EDIT</option> <option value="hapus">HAPUS</option> </select> </div> 
            </div> <h4 class="ada_risiko_judul_deskripsi_risiko">DESKRIPSI</h4> <p class="ada_risiko_deskripsi_risiko">${deskripsiRisiko}</p>`

            main.appendChild(riskNode)
        }
    };
};

window.addEventListener('message', receivedProjectData);

window.risk.initiateProject();

//Return to Index
kembaliIndex.addEventListener('click', (e) => {
    window.index.showProjects();
});

//Search function
cari.addEventListener('keyup', (e) => {
    Array.from(document.getElementsByClassName('ada_risiko')).forEach((item) => {
        let kodeRisiko = item.querySelector('.ada_risiko_h2_kode_risiko').textContent.toLowerCase();

        let hasMatch = kodeRisiko.includes(cari.value);
        item.style.display = hasMatch ? 'flex' : 'none';
    });
});

//Open Risk Input
buatBaruRisk.addEventListener('click', (e) => {
    const idProyek = document.querySelector('#proyek_detail_id_proyek').textContent;
    window.risk.showRiskInput(idProyek)
})

//Open Risk
main.addEventListener('click', (e) => {
    if (e.target.value === 'buka') {
        const riskNode = e.target.closest('.ada_risiko_action').closest('.ada_risiko').querySelector('.ada_risiko_h2_kode_risiko').closest('.ada_risiko');
        const idRisiko = riskNode.querySelector('.ada_risiko_h2_id_risiko').textContent.trim();
        const idProyek = document.querySelector('#proyek_detail_id_proyek').textContent.trim();
        const ids = { idProyek, idRisiko };
        
        e.target.value = 'opsi';
        window.risk.showRisk(ids)
    }
})

//Open Risk Edit
main.addEventListener('click', (e) => {
    if (e.target.value === 'edit') {
        const riskNode = e.target.closest('.ada_risiko_action').closest('.ada_risiko').querySelector('.ada_risiko_h2_kode_risiko').closest('.ada_risiko');
        const idRisiko = riskNode.querySelector('.ada_risiko_h2_id_risiko').textContent.trim();
        const idProyek = document.querySelector('#proyek_detail_id_proyek').textContent.trim();
        const ids = { idProyek, idRisiko };

        e.target.value = 'opsi';
        window.risk.showRiskEdit(ids)
    }
})

//Risk Delete
main.addEventListener('click', (e) => {
    if (e.target.value === 'hapus') {
        const riskNode = e.target.closest('.ada_risiko_action').closest('.ada_risiko').querySelector('.ada_risiko_h2_kode_risiko').closest('.ada_risiko');
        const idRisiko = riskNode.querySelector('.ada_risiko_h2_id_risiko').textContent.trim();
        const kodeRisiko = document.querySelector('.ada_risiko_h2_kode_risiko').textContent.trim();
        const idProyek = document.querySelector('#proyek_detail_id_proyek').textContent.trim();
        const obj = { idProyek, idRisiko, kodeRisiko };

        e.target.value = 'opsi';
        window.risk.deleteRisk(obj)
    }
})


