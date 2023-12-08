const { app, contextBridge, ipcRenderer } = require('electron')

//For Project Index///////////////////////////////////////////////////////////////////////
contextBridge.exposeInMainWorld('index', {
    electron: () => process.versions.electron,
    initiateProjects: () => {
        ipcRenderer.on('initiate-projects-data', (e, obj) => {
            try {
                window.postMessage({ type: 'initiateProjectsData', payload: obj }, '*')
            } catch (err) {
                console.error(err);
                return null;
            }
        })
    },
    createProject: (obj) => {
        ipcRenderer.send('create-project', obj);
    },
    showProjects: () => {
        ipcRenderer.send('show-project-index')
    },
    editProject: async (obj) => {
        try {
            const data = await ipcRenderer.invoke('edit-project', obj);
            console.log(data);
        } catch (err) {
            console.error(err);
            return null;
        }
    },
    deleteProject: (obj) => {
        ipcRenderer.send('delete-project', obj);    
    },
    exportProject: (obj) => {
        ipcRenderer.send('export-project', obj);
    }
})

//For Risk Index///////////////////////////////////////////////////////////////////////
contextBridge.exposeInMainWorld('risk', {
    showProject: (projectId) => {
        ipcRenderer.send('show-project', projectId)
    },
    initiateProject: () => {
        ipcRenderer.on('initiate-project-data', (e, project) => {
            try {
                window.postMessage({ type: 'initiateProjectData', payload: project }, '*')
            } catch (err) {
                console.error(err);
                return null;
            };
        });
    },
    showRiskInput: (projectId) => {
        ipcRenderer.send('show-risk-input', projectId)
    },
    initiateRiskInput: () => {
        ipcRenderer.on('initiate-risk-input-data', (e, obj) => {
            try {
                window.postMessage({ type: 'initiateRiskInputData', payload: obj }, '*')
            } catch (err) {
                console.error(err);
                return null;
            };
        });
    },
    createRisiko: (ary) => {
        ipcRenderer.send('create-risk', ary);
    },
    tingkatRisiko: (lvl) => {
        const val = parseInt(lvl)
        switch (true) {
            case val >= 1 && val <= 3:
                return "Low Risk";
            case val >= 4 && val <= 6:
                return "Medium Risk";
            case val === 8 || val === 10 || val === 12:
                return "High Risk";
            case val === 15 || val === 16 || val === 20 || val === 25:
                return "Extreme High Risk";
            default:
                return "Tingkat Risiko Tidak Dapat Ditentukan";
        }
    },
    showRisk: (obj) => {
        ipcRenderer.send('show-risk', obj)
    },
    initiateRisk: () => {
        ipcRenderer.on('initiate-risk-data', (e, obj) => {
            try {
                window.postMessage({ type: 'initiateRiskData', payload: obj }, '*')
            } catch (err) {
                console.error(err);
                return null;
            };
        });
    },
    showRiskEdit: (obj) => {
        ipcRenderer.send('show-risk-edit', obj)
    },
    initiateRiskEdit: () => {
        ipcRenderer.on('initiate-risk-edit-data', (e, obj) => {
            try {
                window.postMessage({ type: 'initiateRiskEditData', payload: obj }, '*')
            } catch (err) {
                console.error(err);
                return null;
            };
        });
    },
    riskEdit: (ary) => {
        ipcRenderer.send('edit-risk', ary);
    },
    deleteRisk: (obj) => {
        ipcRenderer.send('delete-risk', obj);
    }
})