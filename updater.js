const { autoUpdater } = require('electron-updater')
const { dialog } = require('electron')

autoUpdater.logger = require('electron-log')
autoUpdater.logger.transports.file.level = 'info'

autoUpdater.autoDownload = false

module.exports = () => {
    autoUpdater.checkForUpdates()

    autoUpdater.on('update-available', () => {
        dialog.showMessageBox({
            type: 'info',
            title: 'Pembaruan Tersedia',
            message: 'Versi baru dari app ini telah tersedia. Apakah anda ingin memperbarui app sekarang?',
            buttons: ['Update', 'Tidak']
        }).then(result => {
            let buttonIndex = result.response

            if (buttonIndex === 0) autoUpdater.downloadUpdate()
        })  
    })

    autoUpdater.on('update-downloaded', () => {
        dialog.showMessageBox({
            type: 'info',
            title: 'Pembaruan Siap',
            message: 'Install & restart sekarang?',
            buttons: ['Iya', 'Nanti']
        }).then(result => {
            let buttonIndex = result.response

            if ( buttonIndex === 0 ) autoUpdater.quitAndInstall(false, true)
        })
    })
}