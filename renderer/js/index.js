let proyek = document.querySelector('#proyek');
let cari = document.querySelector('#cari');
let buatBaruBg = document.querySelector('#buat_baru_bg');
let bukaBuatBaru = document.querySelector('#buka_buat_baru');
let adaProyekAction = document.querySelectorAll('.adaProyekAction');
let simpanBuatBaru = document.querySelector('#simpan_buat_baru');
let editBuatBaru = document.querySelector('#edit_buat_baru');
let tutupBuatBaru = document.querySelector('#tutup_buat_baru');
let idProyekInput = document.querySelector('#id_proyek_input');
let namaProyekInput = document.querySelector('#nama_proyek_input');
let namaOPDInput = document.querySelector('#nama_opd_input');
let tahunAnggaranInput = document.querySelector('#tahun_anggaran_input');

const refreshInput = () => {
    idProyekInput.textContent = '';
    namaProyekInput.value = '';
    namaOPDInput.value = '';
    tahunAnggaranInput.value = '';
}

//Initial state for Index
const receivedProjectsData = (e) => {
    if (e.data && e.data.type === 'initiateProjectsData') {
        const data = e.data.payload;
        const projects = data.projects;

        if (data.mode && data.mode === 'Start') {
            // Show the popup after a brief delay for effect
            setTimeout(function () {
                document.getElementById('welcome_popup_container_bg').classList.add('show');
            }, 200); // Delay of 1 second (adjust as needed)

            // Hide the popup after 5 seconds (adjust the time as needed)
            setTimeout(function () {
                document.getElementById('welcome_popup_container_bg').classList.remove('show');
            }, 3000); // 5000 milliseconds = 5 seconds
        }

        proyek.innerHTML = '';

        //let projectSample = document.createElement('div');
        //projectSample.setAttribute('class', 'ada_proyek_sample');
        //projectSample.innerHTML = `<h2 class="ada_proyek_h2_id_proyek">ID Proyek</h2> <h2 class="ada_proyek_h2_nama_proyek">Nama Proyek</h2>
        //<div class="ada_proyek_div"> <div class="left_ada_proyek_div"> <h3 class="ada_proyek_h3_nama_opd">Nama OPD</h3> <h3 class="ada_proyek_h3_i">|</h3>
        //<h3 class="ada_proyek_h3_tahun_anggaran">Tahun Anggaran</h3> </div> </div>`;

        //proyek.appendChild(projectSample)

        for (let i = 0; i < projects.length; i++) {
            let projectNode = document.createElement('div');
            let { idProyek, namaProyek, namaOPD, tahunAnggaran } = projects[i];

            projectNode.setAttribute('class', 'ada_proyek');
            projectNode.innerHTML = `<div class="ada_proyek_div"> <div class="left_ada_proyek_div"> 
                <h2 class="ada_proyek_h2_id_proyek">${idProyek}</h2> <h2 class="ada_proyek_h2_nama_proyek">${namaProyek}</h2> 
                </div> <div class="right_ada_proyek_div"> <select class="ada_proyek_action" name="action"> 
                <option value="opsi" disabled selected hidden>OPSI</option> <option value="buka">BUKA</option> 
                <option value="edit">EDIT</option> <option value="hapus">HAPUS</option> <option value="export">EXPORT</option>
                </select> </div> </div> <div class="ada_proyek_lower_div"> <h3 class="ada_proyek_h3_nama_opd">${namaOPD}</h3> 
                <h3 class="ada_proyek_h3_tahun_anggaran">${tahunAnggaran}</h3> </div>`

            proyek.appendChild(projectNode);
        }
    }
}

window.addEventListener('message', receivedProjectsData)

window.index.initiateProjects()

//Search function
cari.addEventListener('keyup', (e) => {
    Array.from(document.getElementsByClassName('ada_proyek')).forEach((item) => {
        let namaProyek = item.querySelector('.ada_proyek_h2_nama_proyek').textContent.toLowerCase();

        let hasMatch = namaProyek.includes(cari.value);
        item.style.display = hasMatch ? 'flex' : 'none';
    });
});

//Open and closing Buat Baru
bukaBuatBaru.addEventListener('click', (e) => {
    buatBaruBg.style.display = 'flex';
    simpanBuatBaru.style.display = 'inline-block';
    editBuatBaru.style.display = 'none';
});

tutupBuatBaru.addEventListener('click', (e) => {
    buatBaruBg.style.display = 'none';
    simpanBuatBaru.style.display = 'inline-block';
    editBuatBaru.style.display = 'none';
    refreshInput();
});

//Saving Buat Baru
simpanBuatBaru.addEventListener('click', (e) => {
    if (namaProyekInput.value && namaOPDInput.value && tahunAnggaranInput.value) {
        const obj = { namaProyek: namaProyekInput.value, namaOPD: namaOPDInput.value, tahunAnggaran: tahunAnggaranInput.value, risks: [] };

        window.index.createProject(obj);

        buatBaruBg.style.display = 'none';
    };

    refreshInput();
});

//Edit Buat Baru
editBuatBaru.addEventListener('click', (e) => {
    if (idProyekInput.textContent && namaProyekInput.value && namaOPDInput.value && tahunAnggaranInput.value) {
        const obj = { idProyek: idProyekInput.textContent, namaProyek: namaProyekInput.value, namaOPD: namaOPDInput.value, tahunAnggaran: tahunAnggaranInput.value };
        const adaProyekDivs = document.querySelectorAll('.ada_proyek');

        for (let i = 0; i < adaProyekDivs.length; i++) {
            if (adaProyekDivs[i].querySelector('.ada_proyek_h2_id_proyek').textContent === idProyekInput.textContent) {
                idProyekNode = adaProyekDivs[i].querySelector('.ada_proyek_h2_id_proyek');
                namaProyekNode = adaProyekDivs[i].querySelector('.ada_proyek_h2_nama_proyek');
                namaOPNNode = adaProyekDivs[i].querySelector('.ada_proyek_h3_nama_opd');
                tahunAnggaranNode = adaProyekDivs[i].querySelector('.ada_proyek_h3_tahun_anggaran');

                idProyekNode.textContent = idProyekInput.textContent;
                namaProyekNode.textContent = namaProyekInput.value;
                namaOPNNode.textContent = namaOPDInput.value;
                tahunAnggaranNode.textContent = tahunAnggaranInput.value;
            };
        };
        window.index.editProject(obj);
    };
    buatBaruBg.style.display = 'none';
    simpanBuatBaru.style.display = 'inline-block';
    editBuatBaru.style.display = 'none';

    refreshInput();
});

proyek.addEventListener('click', (e) => {
    if (e.target.value === 'edit') {
        const projectNode = e.target.closest('.ada_proyek_action').closest('.ada_proyek').querySelector('.ada_proyek_h2_nama_proyek').closest('.ada_proyek');
        const idProyek = projectNode.querySelector('.ada_proyek_h2_id_proyek').textContent.trim();
        const namaProyek = projectNode.querySelector('.ada_proyek_h2_nama_proyek').textContent.trim();
        const namaOPD = projectNode.querySelector('.ada_proyek_h3_nama_opd').textContent.trim();
        const tahunAnggaran = projectNode.querySelector('.ada_proyek_h3_tahun_anggaran').textContent.trim();

        idProyekInput.textContent = idProyek;
        namaProyekInput.value = namaProyek;
        namaOPDInput.value = namaOPD;
        tahunAnggaranInput.value = tahunAnggaran;

        buatBaruBg.style.display = 'flex';
        simpanBuatBaru.style.display = 'none';
        editBuatBaru.style.display = 'inline-block';
        e.target.value = 'opsi';
    };
});

//Delete Buat Baru
proyek.addEventListener('click', (e) => {
    if (e.target.value === 'hapus') {
        const projectNode = e.target.closest('.ada_proyek_action').closest('.ada_proyek').querySelector('.ada_proyek_h2_nama_proyek').closest('.ada_proyek');
        const idProyek = projectNode.querySelector('.ada_proyek_h2_id_proyek').textContent.trim();
        const namaProyek = projectNode.querySelector('.ada_proyek_h2_nama_proyek').textContent.trim();
        const obj = { idProyek, namaProyek };

        e.target.value = 'opsi';
        window.index.deleteProject(obj);
    };
});

//Export project
proyek.addEventListener('click', (e) => {
    if (e.target.value === 'export') {
        const projectNode = e.target.closest('.ada_proyek_action').closest('.ada_proyek').querySelector('.ada_proyek_h2_nama_proyek').closest('.ada_proyek');
        const idProyek = projectNode.querySelector('.ada_proyek_h2_id_proyek').textContent.trim();
        const namaProyek = projectNode.querySelector('.ada_proyek_h2_nama_proyek').textContent.trim();
        const obj = { idProyek, namaProyek };

        e.target.value = 'opsi';
        window.index.exportProject(obj);
    };
});

//Open the project (Risk Index)
proyek.addEventListener('click', (e) => {
    if (e.target.value === 'buka') {
        const projectNode = e.target.closest('.ada_proyek_action').closest('.ada_proyek').querySelector('.ada_proyek_h2_nama_proyek').closest('.ada_proyek');
        const idProyek = projectNode.querySelector('.ada_proyek_h2_id_proyek').textContent.trim();
        window.risk.showProject(idProyek);

        e.target.value = 'opsi';
    };
});