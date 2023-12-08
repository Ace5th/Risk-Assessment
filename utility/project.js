const { app } = require('electron');
const fs = require('fs');
const path = require('path');

const { wordExport } = require('./export.js')

const storagePath = path.join(__dirname, '../storage/projects.json');

const dataToStore = {
    projects: []
};

const initiateProjectStorage = () => {
    fs.access(storagePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File doesn't exist, create and add new data type structure
            fs.writeFile(storagePath, JSON.stringify(dataToStore, null, 2), (writeErr) => {
                if (writeErr) {
                    console.error('Error creating file:', writeErr);
                } else {
                    console.log('File created.');
                }
            });
        } else {
            // File exists, check if new data type exists
            fs.readFile(storagePath, 'utf8', (readErr, data) => {
                if (readErr) {
                    console.error('Error reading file:', readErr);
                } else {
                    const existingData = JSON.parse(data);

                    if (!existingData.projects) {
                        existingData.projects = [];

                        fs.writeFile(storagePath, JSON.stringify(existingData, null, 2), (updateErr) => {
                            if (updateErr) {
                                console.error('Error updating file:', updateErr);
                            } else {
                                console.log('New data type added to existing file.');
                            }
                        });
                    } else {
                        console.log('Data type already exists in the file.');
                    }

                }
            });
        }
    });
};

const createProject = (obj, callback) => {
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            try {
                const parsedData = JSON.parse(data);
                parsedData.projects.push(obj);

                fs.writeFile(storagePath, JSON.stringify(parsedData, null, 2), (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing file:', writeErr);
                    } else {
                        console.log('New project added.');
                        callback();
                    }
                });
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError)
            }
        }
    });
};

const editProject = (obj) => {
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        }

        try {
            const parsedData = JSON.parse(data);

            const findProjectById = (projectId) => {
                return parsedData.projects.find((project) => project.idProyek === projectId)
            };

            const projectToEdit = findProjectById(obj.idProyek);

            if (projectToEdit) {
                projectToEdit.namaProyek = obj.namaProyek;
                projectToEdit.namaOPD = obj.namaOPD;
                projectToEdit.tahunAnggaran = obj.tahunAnggaran;
            }

            const updatedData = JSON.stringify(parsedData, null, 2);

            fs.writeFile(storagePath, updatedData, 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing file:', writeErr);
                }
                console.log('Data updated successfully.');
            });
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });
};

const deleteProject = (obj, callback) => {
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        }

        try {
            const parsedData = JSON.parse(data);

            const indexToDelete = parsedData.projects.findIndex((project) => project.idProyek === obj.idProyek)

            if (indexToDelete !== -1) {
                parsedData.projects.splice(indexToDelete, 1);
            } else {
                console.log('Project not found');
            }

            const updatedData = JSON.stringify(parsedData, null, 2);

            fs.writeFile(storagePath, updatedData, 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing file:', writeErr);
                }
                console.log('Project deleted successfully.');
                callback();
            });
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });
};

const exportProject = (id) => {
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        }

        try {
            const parsedData = JSON.parse(data);
            const findProjectById = (projectId) => {
                return parsedData.projects.find((project) => project.idProyek === projectId)
            };

            const projectData = findProjectById(id);
            wordExport(projectData)
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });
};

const createRisk = (ary, callback) => {
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        } else {
            try {
                const parsedData = JSON.parse(data)
                const findProjectById = (projectId) => {
                    return parsedData.projects.find((project) => project.idProyek === projectId)
                };

                const projectData = findProjectById(ary[0]);
                projectData.risks.push(ary[1])

                fs.writeFile(storagePath, JSON.stringify(parsedData, null, 2), (writeErr) => {
                    if (writeErr) {
                        console.error('Error writing file:', writeErr);
                    } else {
                        console.log('New risk added.');
                        callback();
                    }
                });
            } catch (parseError) {
                console.error('Error parsing JSON:', parseError)
            }
        }
    });
};

const editRisk = (ary,callback) => {
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        };

        try {
            const parsedData = JSON.parse(data);

            const findProjectById = (projectId) => {
                return parsedData.projects.find((project) => project.idProyek === projectId)
            };
            const projectToEdit = findProjectById(ary[0]);

            const findRiskById = (riskId) => {
                return projectToEdit.risks.find((risk) => risk.idRisiko === riskId)
            };
            const riskToEdit = findRiskById(ary[1].idRisiko);

            if (riskToEdit) {
                riskToEdit.kodeKegiatan = ary[1].kodeKegiatan;
                riskToEdit.kegiatanRujukan = ary[1].kegiatanRujukan;
                riskToEdit.kodeRisiko = ary[1].kodeRisiko;
                riskToEdit.statusRisiko = ary[1].statusRisiko;
                riskToEdit.peluangAtauAncaman = ary[1].peluangAtauAncaman;
                riskToEdit.kategoriRisiko = ary[1].kategoriRisiko;
                riskToEdit.unitKerja = ary[1].unitKerja;
                riskToEdit.sasaran = ary[1].sasaran;
                riskToEdit.periodeIdentifikasiRisiko = ary[1].periodeIdentifikasiRisiko;
                riskToEdit.deskripsiRisiko = ary[1].deskripsiRisiko;
                riskToEdit.akarPenyebab = ary[1].akarPenyebab;
                riskToEdit.indikatorRisiko = ary[1].indikatorRisiko;
                riskToEdit.internalControl = ary[1].internalControl;
                riskToEdit.dampakKualitatif = ary[1].dampakKualitatif;
                riskToEdit.probabilitas = ary[1].probabilitas;
                riskToEdit.dampak = ary[1].dampak;
                riskToEdit.skorRisikoInherent = ary[1].skorRisikoInherent;
                riskToEdit.tingkatRisikoInherent = ary[1].tingkatRisikoInherent;
                riskToEdit.probabilitasRisikoInherentKualitatif = ary[1].probabilitasRisikoInherentKualitatif;
                riskToEdit.dampakFinansialRisikoInherent = ary[1].dampakFinansialRisikoInherent;
                riskToEdit.nilaiBersihRisikoInherent = ary[1].nilaiBersihRisikoInherent;
                riskToEdit.pemilikRisiko = ary[1].pemilikRisiko;
                riskToEdit.jabatanPemilikRisiko = ary[1].jabatanPemilikRisiko;
                riskToEdit.hpPemilikRisiko = ary[1].hpPemilikRisiko;
                riskToEdit.emailPemilikRisiko = ary[1].emailPemilikRisiko;
                riskToEdit.strategi = ary[1].strategi;
                riskToEdit.penangananRisiko = ary[1].penangananRisiko;
                riskToEdit.biayaPenangananRisiko = ary[1].biayaPenangananRisiko;
                riskToEdit.penangananYangTelahDilakukan = ary[1].penangananYangTelahDilakukan;
                riskToEdit.probabilitasRisikoResidual = ary[1].probabilitasRisikoResidual;
                riskToEdit.dampakRisikoResidual = ary[1].dampakRisikoResidual;
                riskToEdit.skorRisikoResidual = ary[1].skorRisikoResidual;
                riskToEdit.tingkatRisikoResidual = ary[1].tingkatRisikoResidual;
                riskToEdit.probabilitasRisikoResidualKualitatif = ary[1].probabilitasRisikoResidualKualitatif;
                riskToEdit.dampakFinansialRisikoResidual = ary[1].dampakFinansialRisikoResidual;
                riskToEdit.nilaiBersihRisikoResidual = ary[1].nilaiBersihRisikoResidual;
                riskToEdit.departemenUnitKerja = ary[1].departemenUnitKerja;
            };

            const updatedData = JSON.stringify(parsedData, null, 2);

            fs.writeFile(storagePath, updatedData, 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing file:', writeErr);
                };
                console.log('Risk updated successfully.');
                callback();
            });
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        };
    });
};

const deleteRisk = (obj, callback) => {
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        }

        try {
            const parsedData = JSON.parse(data);

            const findProjectById = (projectId) => {
                return parsedData.projects.find((project) => project.idProyek === projectId)
            };
            const projectData = findProjectById(obj.idProyek);

            const indexToDelete = projectData.risks.findIndex((risk) => risk.idRisiko === obj.idRisiko);

            if (indexToDelete !== -1) {
                projectData.risks.splice(indexToDelete, 1);
            } else {
                console.log('Risk not found');
            };

            const updatedData = JSON.stringify(parsedData, null, 2);

            fs.writeFile(storagePath, updatedData, 'utf8', (writeErr) => {
                if (writeErr) {
                    console.error('Error writing file:', writeErr);
                }
                console.log('Data deleted successfully.');
                callback();
            });
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });
};

module.exports = {
    initiateProjectStorage, createProject, editProject, deleteProject, exportProject, createRisk, editRisk, deleteRisk
}