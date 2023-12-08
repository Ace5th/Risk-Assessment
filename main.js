const { app, BrowserWindow, session, ipcMain, dialog, Menu } = require('electron');
const { initiateProjectStorage, createProject, editProject, deleteProject, exportProject, createRisk, editRisk, deleteRisk } = require('./utility/project.js')
const fs = require('fs')
const path = require('path');
const { v4 : uuid } = require('uuid')

const storagePath = path.join(__dirname, './storage/projects.json');

let mainWindow;
let contextMenu = Menu.buildFromTemplate([
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { role: 'undo' },
    { role: 'redo' },
])

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
};

// Create the main window.
const createMainWindow = () => {
    let mainSes = session.fromPartition('persist:mainSes')
    mainWindow = new BrowserWindow({
    width: 800, minWidth: 350,
    height: 600, minHeight: 300,
    icon: path.join(__dirname, './images/Logo_Kab_Toraja_Utara.ico'),
    title: 'Risk Based Budget Analysis',
    maximizable: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        session: mainSes,
        preload: path.join(__dirname, './preload.js'),
    },
  })

  //To clear the session storage data
  //mainSes.clearStorageData()

  // Open the DevTools.
  //if (process.env.NODE_ENV !== 'production') {
  //    mainWindow.webContents.openDevTools();
  //}

  mainWindow.webContents.on('context-menu', (e) => {
      contextMenu.popup()
  })

  Menu.setApplicationMenu(null)

  // Load the index.html of the app.
  mainWindow.maximize();

  mainWindow.loadFile(path.join(__dirname, './renderer/html/index.html'));

  // Additional process once the window is ready
  mainWindow.once('ready-to-show', () => {
      initiateProjectStorage();

      fs.readFile(storagePath, 'utf8', (err, data) => {
          if (err) {
              console.error('Error reading file:', err);
          };
          try {
              const initiateProjectsData = JSON.parse(data);
              const obj = {mode: 'Start', ...initiateProjectsData}

              mainWindow.webContents.send('initiate-projects-data', obj);
          } catch (parseError) {
              console.error('Error parsing JSON:', parseError);
          };
      });
  });
};

//IPC Process///////////////////////////////////////////////////////////////////////
//IPC Process for Project Index
ipcMain.on('create-project', (e, obj) => {
    try {
        const newObj = { idProyek: uuid(), ...obj };
        createProject(newObj, () => {
            fs.readFile(storagePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                };
                try {
                    const parsedData = JSON.parse(data)
                    mainWindow.loadFile(path.join(__dirname, './renderer/html/index.html'));
                    mainWindow.webContents.on('did-stop-loading', () => {
                        e.sender.send('initiate-projects-data', parsedData);
                    })
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                };
            });
        });
    } catch (err) {
        console.error(err);
        return null;
    };
});

ipcMain.handle('edit-project', (e, obj) => {
    try {
        editProject(obj);
        return 'Finished editing the project';
    } catch (err) {
        console.error(err);
        return null;
    };
});

ipcMain.on('delete-project', (e, obj) => {
    let answers = ['Iya', 'Tidak']
    dialog.showMessageBox({
        title: 'Delete Project',
        message: `Apakah anda yakin ingin menghapus: ${obj.namaProyek}`,
        detail: 'Silahkan pilih salah satu opsi',
        cancelId: 1,
        buttons: answers
    }).then(result => {
        if (answers[result.response] === 'Iya') {
            try {
                deleteProject(obj, () => {
                    fs.readFile(storagePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                        }
                        try {
                            const initiateProjectsdata = JSON.parse(data);
                            mainWindow.loadFile(path.join(__dirname, './renderer/html/index.html'));

                            mainWindow.webContents.on('did-stop-loading', () => {
                                e.sender.send('initiate-projects-data', initiateProjectsdata);
                            });
                        } catch (parseError) {
                            console.error('Error parsing JSON:', parseError);
                        };
                    });
                });
            } catch (err) {
                console.error(err);
            };
        } else if (answers[result.response] === 'Tidak') {
            console.log('Project removal cancelled.');
        } else {
            console.log('Dialog closed. Project removal cancelled')
        }
    }).catch(err => {
        console.error(err);
        console.log('Dialog closed. Project removal cancelled.');
    });
});

ipcMain.on('export-project', (e, obj) => {
    let answers = ['Iya', 'Tidak']
    dialog.showMessageBox({
        title: 'Export Project',
        message: `Apakah anda yakin ingin melakukan proses export terhadap: ${obj.namaProyek}`,
        detail: 'Silahkan pilih salah satu opsi',
        cancelId: 1,
        buttons: answers
    }).then(result => {
        if (answers[result.response] === 'Iya') {
            try {
                exportProject(obj.idProyek)
            } catch (err) {
                console.error(err);
            };
        } else if (answers[result.response] === 'Tidak') {
            console.log('Project export cancelled.');
        } else {
            console.log('Dialog closed. Project export cancelled');
        }
    }).catch(err => {
        console.error(err);
        console.log('Dialog closed. Project export cancelled.');
    });
});

ipcMain.on('show-project-index', (e) => {
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        }
        try {
            const projectsData = JSON.parse(data);

            mainWindow.loadFile(path.join(__dirname, './renderer/html/index.html'));

            mainWindow.webContents.on('did-stop-loading', () => {
                e.sender.send('initiate-projects-data', projectsData);
            });
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError)
        };
    });
});

//IPC Process for Risk Index
//I can use obj here to refer the id of the project that I want to inquire
ipcMain.on('show-project', (e, id) => { 
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        }
        try {
            const parsedData = JSON.parse(data).projects;
            const findProjectById = (projectId) => {
                return parsedData.find((project) => project.idProyek === projectId)
            };
            const projectData = findProjectById(id);

            mainWindow.loadFile(path.join(__dirname, './renderer/html/risk_index.html'));

            mainWindow.webContents.on('did-stop-loading', () => {
                e.sender.send('initiate-project-data', projectData);
            });
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        };
    });
});

ipcMain.on('show-risk-input', (e, id) => {
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        }
        try {
            const parsedData = JSON.parse(data).projects;
            const findProjectById = (projectId) => {
                return parsedData.find((project) => project.idProyek === projectId)
            };

            const projectData = findProjectById(id);
            const obj = { mode: 'create', ...projectData };

            mainWindow.loadFile(path.join(__dirname, './renderer/html/risk_input.html'));

            mainWindow.webContents.on('did-stop-loading', () => {
                e.sender.send('initiate-risk-input-data', obj);
            });
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        };
    });
});

ipcMain.on('create-risk', (e, ary) => {
    try {
        const newAry = [ary[0], { idRisiko: uuid(), ...ary[1] }]
        createRisk(newAry, () => {
            fs.readFile(storagePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                }
                try {
                    const parsedData = JSON.parse(data).projects
                    const findProjectById = (projectId) => {
                        return parsedData.find((project) => project.idProyek === projectId)
                    };
                    const projectData = findProjectById(ary[0]);

                    mainWindow.loadFile(path.join(__dirname, './renderer/html/risk_index.html'));

                    mainWindow.webContents.on('did-stop-loading', () => {
                        e.sender.send('initiate-project-data', projectData);
                    })
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                }
            });
        });
    } catch (err) {
        console.error(err);
    };
});

ipcMain.on('show-risk', (e, obj) => {
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        }
        try {
            const parsedData = JSON.parse(data).projects;

            const findProjectById = (projectId) => {
                return parsedData.find((project) => project.idProyek === projectId)
            };
            const projectData = findProjectById(obj.idProyek);

            const findRiskById = (riskId) => {
                return projectData.risks.find((risk) => risk.idRisiko === riskId)
            };
            const riskData = findRiskById(obj.idRisiko);
            
            const res = { idProyek:obj.idProyek, namaProyek:projectData.namaProyek , ...riskData}
            mainWindow.loadFile(path.join(__dirname, './renderer/html/risk.html'));

            mainWindow.webContents.on('did-stop-loading', () => {
                e.sender.send('initiate-risk-data', res);
            });
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        };
    });
});

ipcMain.on('show-risk-edit', (e, obj) => {
    fs.readFile(storagePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
        }
        try {
            const parsedData = JSON.parse(data).projects;

            const findProjectById = (projectId) => {
                return parsedData.find((project) => project.idProyek === projectId)
            };
            const projectData = findProjectById(obj.idProyek);

            const findRiskById = (riskId) => {
                return projectData.risks.find((risk) => risk.idRisiko === riskId)
            };
            const riskData = findRiskById(obj.idRisiko);

            const res = { idProyek: obj.idProyek, namaProyek: projectData.namaProyek, ...riskData };
            mainWindow.loadFile(path.join(__dirname, './renderer/html/risk_edit.html'));

            mainWindow.webContents.on('did-stop-loading', () => {
                e.sender.send('initiate-risk-edit-data', res);
            });
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        };
    });
});

ipcMain.on('edit-risk', (e, ary) => {
    try {
        editRisk(ary, () => {
            fs.readFile(storagePath, 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                }
                try {
                    const parsedData = JSON.parse(data).projects;

                    const findProjectById = (projectId) => {
                        return parsedData.find((project) => project.idProyek === projectId)
                    };
                    const projectData = findProjectById(ary[0]);

                    mainWindow.loadFile(path.join(__dirname, './renderer/html/risk_index.html'));

                    mainWindow.webContents.on('did-stop-loading', () => {
                        e.sender.send('initiate-project-data', projectData);
                    });
                } catch (parseError) {
                    console.error('Error parsing JSON:', parseError);
                };
            });
        });
    } catch (err) {
        console.error(err);
    };
});

ipcMain.on('delete-risk', (e, obj) => {
    let answers = ['Iya', 'Tidak']
    dialog.showMessageBox({
        title: 'Delete Risk',
        message: `Apakah anda yakin ingin menghapus: ${obj.kodeRisiko}`,
        detail: 'Silahkan pilih salah satu opsi',
        cancelId: 1,
        buttons: answers
    }).then(result => {
        if (answers[result.response] === 'Iya') {
            try {
                deleteRisk(obj, () => {
                    fs.readFile(storagePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error('Error reading file:', err);
                        }
                        try {
                            const parsedData = JSON.parse(data).projects;

                            const findProjectById = (projectId) => {
                                return parsedData.find((project) => project.idProyek === projectId)
                            };
                            const projectData = findProjectById(obj.idProyek);

                            mainWindow.loadFile(path.join(__dirname, './renderer/html/risk_index.html'));

                            mainWindow.webContents.on('did-stop-loading', () => {
                                e.sender.send('initiate-project-data', projectData);
                            });
                        } catch (parseError) {
                            console.error('Error parsing JSON:', parseError);
                        };
                    });
                });
            } catch (err) {
                console.error(err);
            };
        } else if (answers[result.response] === 'Tidak') {
            console.log('Risk removal cancelled.');
        } else {
            console.log('Dialog closed. Risk removal cancelled')
        }
    }).catch(err => {
        console.error(err);
        console.log('Dialog closed. Risk removal cancelled.');
    });
});
//IPC Process///////////////////////////////////////////////////////////////////////

// App is ready
app.on('ready', () => {
    createMainWindow()

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    })
});

// Quit when all windows are closed, except for MAC
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
