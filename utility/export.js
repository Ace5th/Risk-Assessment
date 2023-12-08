const { app, dialog } = require('electron');
const docx = require('docx')
const fs = require('fs');
const path = require('path');

const storagePath = path.join(__dirname, '../storage/projects.json');

const { Document,
    Packer,
    Paragraph,
    Tab,
    TextRun,
    AlignmentType,
    PageOrientation,
    convertInchesToTwip,
    Footer,
    HeadingLevel,
    ImageRun,
    Table,
    TableCell,
    TableRow,
    TabStopPosition,
    VerticalAlign,
    TextDirection,
    UnderlineType,
    WidthType,
    ShadingType,
    LevelFormat } = docx;

const wordExport = (proj) => {
    const risks = proj.risks

    //Creating the content for the docx
    const t1 = new TextRun({
        text: `${proj.namaProyek}`,
        heading: HeadingLevel.HEADING_1,
        size: 28,
        bold: true,
    });
    const t2 = new TextRun({
        text: `Tahun ${proj.tahunAnggaran}`,
        heading: HeadingLevel.HEADING_1,
        size: 28,
        bold: true,
    });
    const t3 = new TextRun({
        text: `Oleh ${proj.namaOPD}`,
        heading: HeadingLevel.HEADING_1,
        size: 28,
        bold: true,
    });

    let extremeHighRow = [new TableCell({
        verticalAlign: VerticalAlign.BOTTOM,
        width: {
            size: 13,
            type: WidthType.PERCENTAGE,
        },
        shading: {
            fill: "c00000",
            color: "auto",
        },
        children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: `EXTREME HIGH RISK`, size: 24, color: '000000' })] }), new Paragraph({ text: `\n` })],
    })];
    let highRow = [new TableCell({
        verticalAlign: VerticalAlign.BOTTOM,
        width: {
            size: 13,
            type: WidthType.PERCENTAGE,
        },
        shading: {
            fill: "ffc000",
            color: "auto",
        },
        children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: `HIGH RISK`, size: 24 })] }), new Paragraph({ text: `\n` }), new Paragraph({ text: `\n` })],
    })];
    let mediumRow = [new TableCell({
        verticalAlign: VerticalAlign.BOTTOM,
        width: {
            size: 13,
            type: WidthType.PERCENTAGE,
        },
        shading: {
            fill: "ffff00",
            color: "auto",
        },
        children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: `MEDIUM RISK`, size: 24 })] }), new Paragraph({ text: `\n` }), new Paragraph({ text: `\n` })],
    })];
    let lowRow = [new TableCell({
        verticalAlign: VerticalAlign.BOTTOM,
        width: {
            size: 13,
            type: WidthType.PERCENTAGE,
        },
        shading: {
            fill: "00b050",
            color: "auto",
        },
        children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: `LOW RISK`, size: 24 })] }), new Paragraph({ text: `\n` }), new Paragraph({ text: `\n` })],
    })];
    let idRiskRow = [new TableCell({
        verticalAlign: VerticalAlign.BOTTOM,
        width: {
            size: 13,
            type: WidthType.PERCENTAGE,
        },
        children: [new Paragraph({ alignment: AlignmentType.LEFT, children: [new TextRun({ text: `RISK ID`, size: 24 })] }), new Paragraph({ text: `\n` }), new Paragraph({ text: `\n` }), new Paragraph({ text: `\n` })],
    })];

    for (let i = 0; i < risks.length; i++) {
        let eHC = null;
        if (risks[i].tingkatRisikoInherent === 'Extreme High Risk' && risks[i].tingkatRisikoResidual === 'Extreme High Risk') {
            let extremeHighContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `O   +`, size: 32, color: '000000', bold: true })] })
            eHC = extremeHighContent;
        } else if (risks[i].tingkatRisikoInherent === 'Extreme High Risk' && risks[i].tingkatRisikoResidual !== 'Extreme High Risk') {
            let extremeHighContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `O`, size: 32, color: '000000', bold: true })] })
            eHC = extremeHighContent;
        } else if (risks[i].tingkatRisikoInherent !== 'Extreme High Risk' && risks[i].tingkatRisikoResidual === 'Extreme High Risk') {
            let extremeHighContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `+`, size: 32, color: '000000', bold: true })] })
            eHC = extremeHighContent;
        } else if (risks[i].tingkatRisikoInherent !== 'Extreme High Risk' && risks[i].tingkatRisikoResidual !== 'Extreme High Risk') {
            let extremeHighContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ``, size: 32, color: '000000', bold: true })] })
            eHC = extremeHighContent;
        }
        let extremeHigh = new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            width: {
                size: 16,
                type: WidthType.DXA,
            },
            shading: {
                fill: "c00000",
                color: "auto",
            },
            children: [eHC],
        })
        extremeHighRow.push(extremeHigh)

        let hC = null;
        if (risks[i].tingkatRisikoInherent === 'High Risk' && risks[i].tingkatRisikoResidual === 'High Risk') {
            let highContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `O   +`, size: 32, color: '000000', bold: true })] })
            hC = highContent;
        } else if (risks[i].tingkatRisikoInherent === 'High Risk' && risks[i].tingkatRisikoResidual !== 'High Risk') {
            let highContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `O`, size: 32, color: '000000', bold: true })] })
            hC = highContent;
        } else if (risks[i].tingkatRisikoInherent !== 'High Risk' && risks[i].tingkatRisikoResidual === 'High Risk') {
            let highContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `+`, size: 32, color: '000000', bold: true })] })
            hC = highContent;
        } else if (risks[i].tingkatRisikoInherent !== 'High Risk' && risks[i].tingkatRisikoResidual !== 'High Risk') {
            let highContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ``, size: 32, color: '000000', bold: true })] })
            hC = highContent;
        }
        let high = new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            width: {
                size: 16,
                type: WidthType.DXA,
            },
            shading: {
                fill: "ffc000",
                color: "auto",
            },
            children: [hC],
        })
        highRow.push(high)

        let mC = null;
        if (risks[i].tingkatRisikoInherent === 'Medium Risk' && risks[i].tingkatRisikoResidual === 'Medium Risk') {
            let mediumContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `O   +`, size: 32, color: '000000', bold: true })] })
            mC = mediumContent;
        } else if (risks[i].tingkatRisikoInherent === 'Medium Risk' && risks[i].tingkatRisikoResidual !== 'Medium Risk') {
            let mediumContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `O`, size: 32, color: '000000', bold: true })] })
            mC = mediumContent;
        } else if (risks[i].tingkatRisikoInherent !== 'Medium Risk' && risks[i].tingkatRisikoResidual === 'Medium Risk') {
            let mediumContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `+`, size: 32, color: '000000', bold: true })] })
            mC = mediumContent;
        } else if (risks[i].tingkatRisikoInherent !== 'Medium Risk' && risks[i].tingkatRisikoResidual !== 'Medium Risk') {
            let mediumContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ``, size: 32, color: '000000', bold: true })] })
            mC = mediumContent;
        }
        let medium = new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            width: {
                size: 16,
                type: WidthType.DXA,
            },
            shading: {
                fill: "ffff00",
                color: "auto",
            },
            children: [mC],
        })
        mediumRow.push(medium)

        let lC = null;
        if (risks[i].tingkatRisikoInherent === 'Low Risk' && risks[i].tingkatRisikoResidual === 'Low Risk') {
            let lowContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `O   +`, size: 32, color: '000000', bold: true })] })
            lC = lowContent;
        } else if (risks[i].tingkatRisikoInherent === 'Low Risk' && risks[i].tingkatRisikoResidual !== 'Low Risk') {
            let lowContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `O`, size: 32, color: '000000', bold: true })] })
            lC = lowContent;
        } else if (risks[i].tingkatRisikoInherent !== 'Low Risk' && risks[i].tingkatRisikoResidual === 'Low Risk') {
            let lowContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: `+`, size: 32, color: '000000', bold: true })] })
            lC = lowContent;
        } else if (risks[i].tingkatRisikoInherent !== 'Low Risk' && risks[i].tingkatRisikoResidual !== 'Low Risk') {
            let lowContent = new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: ``, size: 32, color: '000000', bold: true })] })
            lC = lowContent;
        }
        let low = new TableCell({
            verticalAlign: VerticalAlign.CENTER,
            width: {
                size: 16,
                type: WidthType.DXA,
            },
            shading: {
                fill: "00b050",
                color: "auto",
            },
            children: [lC],
        })
        lowRow.push(low)

        let idRisk = new TableCell({
            verticalAlign: VerticalAlign.BOTTOM,
            width: {
                size: 16,
                type: WidthType.DXA,
            },
            children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: `${i + 1}`, size: 24, bold: true })] })],
        })
        idRiskRow.push(idRisk)
    };

    const riskAppetiteTable = new Table({
        width: {
            size: 9000,
            type: WidthType.DXA,
        },
        columnWidths: [4000, 1000, 4000],
        indent: {
            size: 200,
            type: WidthType.DXA,
        },
        rows: [
            new TableRow({
                children: [...extremeHighRow]
            }),
            new TableRow({
                children: [...highRow]
            }),
            new TableRow({
                children: [...mediumRow]
            }),
            new TableRow({
                children: [...lowRow]
            }),
            new TableRow({
                children: [...idRiskRow]
            }),
        ]
    });


    const riskTables = []
    for (let i = 0; i < risks.length; i++) {
        let table = new Table({
            width: {
                size: 9000,
                type: WidthType.DXA,
            },
            columnWidths: [4000, 1000, 4000],
            indent: {
                size: 200,
                type: WidthType.DXA,
            },
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            columnSpan: 3,
                            shading: {
                                fill: "D3D3D3",
                                color: "auto",
                            },
                            children: [new Paragraph({})],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Kode Kegiatan`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].kodeKegiatan}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Kegiatan Rujukan`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].kegiatanRujukan}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Kode Risiko`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].kodeRisiko}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Status Risiko`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].statusRisiko}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Peluang atau Ancaman`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].peluangAtauAncaman}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Kategori Risiko`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].kategoriRisiko}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            columnSpan: 3,
                            children: [new Paragraph({ children: [new TextRun({ text: ``, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            columnSpan: 3,
                            children: [new Paragraph({ children: [new TextRun({ text: ` IDENTIFIKASI RISIKO`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Unit Kerja`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].unitKerja}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Sasaran`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].sasaran}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Periode Identifikasi Risiko`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].periodeIdentifikasiRisiko}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Deskripsi Risiko`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].deskripsiRisiko}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Akar Penyebab`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].akarPenyebab}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Indikator Risiko`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].indikatorRisiko}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Internal Control`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].internalControl}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Dampak Kualitatif`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].dampakKualitatif}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            columnSpan: 3,
                            children: [new Paragraph({ children: [new TextRun({ text: ``, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            columnSpan: 3,
                            children: [new Paragraph({ children: [new TextRun({ text: ` RISIKO INHERENT`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Probabilitas`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].probabilitas}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Dampak`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].dampak}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Skor Risiko Inherent`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].skorRisikoInherent}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Tingkat Risiko Inherent`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].tingkatRisikoInherent}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Probabilitas Risiko Inherent Kualitatif`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].probabilitasRisikoInherentKualitatif}%`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Dampak Finansial Risiko Inherent`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Rp. ${new Intl.NumberFormat("id-ID").format(risks[i].dampakFinansialRisikoInherent)}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Nilai Bersih Risiko Inherent`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Rp. ${new Intl.NumberFormat("id-ID").format(risks[i].nilaiBersihRisikoInherent)}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            columnSpan: 3,
                            children: [new Paragraph({ children: [new TextRun({ text: ``, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            columnSpan: 3,
                            children: [new Paragraph({ children: [new TextRun({ text: ` PEMILIK RISIKO`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Nama Pemilik Risiko`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].pemilikRisiko}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Jabatan Pemilik Risiko`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].jabatanPemilikRisiko}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` HP Pemilik Risiko`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].hpPemilikRisiko}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Email Pemilik Risiko`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].emailPemilikRisiko}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            columnSpan: 3,
                            children: [new Paragraph({ children: [new TextRun({ text: ``, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            columnSpan: 3,
                            children: [new Paragraph({ children: [new TextRun({ text: ` EVALUASI DAN RENCANA PENANGANAN RISIKO`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Strategi`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].strategi}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Penanganan Risiko`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].penangananRisiko}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Biaya Penanganan Risiko`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Rp. ${new Intl.NumberFormat("id-ID").format(risks[i].biayaPenangananRisiko)}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            columnSpan: 3,
                            children: [new Paragraph({ children: [new TextRun({ text: ``, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Penanganan Yang Telah Dilakukan`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].penangananYangTelahDilakukan}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            columnSpan: 3,
                            children: [new Paragraph({ children: [new TextRun({ text: ``, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            columnSpan: 3,
                            children: [new Paragraph({ children: [new TextRun({ text: ` RISIKO RESIDUAL`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Probabilitas Risiko Residual`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].probabilitasRisikoResidual}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Dampak Risiko Residual`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].dampakRisikoResidual}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Skor Risiko Residual`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].skorRisikoResidual}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Tingkat Risiko Residual`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].tingkatRisikoResidual}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Probabilitas Risiko Residual Kualitatif`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].probabilitasRisikoResidualKualitatif}%`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Dampak Finansial Risiko Residual`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Rp. ${new Intl.NumberFormat("id-ID").format(risks[i].dampakFinansialRisikoResidual)}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Nilai Bersih Risiko Residual`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Rp. ${new Intl.NumberFormat("id-ID").format(risks[i].nilaiBersihRisikoResidual)}`, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            columnSpan: 3,
                            children: [new Paragraph({ children: [new TextRun({ text: ``, size: 24 })] })],
                        }),
                    ],
                }),
                new TableRow({
                    children: [
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` Departemen (Unit Kerja)`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: `:`, size: 24 })] })],
                        }),
                        new TableCell({
                            verticalAlign: VerticalAlign.CENTER,
                            children: [new Paragraph({ children: [new TextRun({ text: ` ${risks[i].departemenUnitKerja}`, size: 24 })] })],
                        }),
                    ],
                }),
            ],
        })

        let tableTitle = [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: `Tabel Analisis ${i + 1}: ${risks[i].kodeKegiatan}`,
                        heading: HeadingLevel.HEADING_1,
                        size: 24,
                        bold: true,
                    }),
                ]
            }),
            new Paragraph({
                text: `\n`
            })
        ]

        let pageBreak = new Paragraph({
            text: ``, pageBreakBefore: true,
        })

        riskTables.push(...tableTitle)
        riskTables.push(table)
        riskTables.push(pageBreak)
    };

    //Creating the content for the docx

    //Initializing docx
    const doc = new Document({
        creator: `${proj.namaOPD}`,
        title: `${proj.namaProyek}`,
        styles: {
            default: {
                heading1: {
                    run: {
                        font: 'Times New Roman',
                        size: 24,
                        bold: true,
                    },
                    paragraph: {
                        alignment: AlignmentType.CENTER,
                        spacing: { line: 340 },
                    },
                },
            },
        },
        sections: [
            {
                properties: {
                    page: {
                        margin: {
                            top: 1440,
                            right: 1440,
                            bottom: 1440,
                            left: 1440,
                        },
                        size: {
                            orientation: PageOrientation.PORTRAIT,
                            height: 15840,
                            width: 12240,
                        },
                    },
                },
                children: [
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        //alignment: AlignmentType.CENTER,
                        //verticalAlign: VerticalAlign.CENTER,
                        children: [
                            new ImageRun({
                                data: fs.readFileSync(path.join(__dirname, '../images/Logo_Kab_Toraja_Utara.png')),
                                transformation: {
                                    width: 180,
                                    height: 200,
                                },
                                floating: {
                                    horizontalPosition: {
                                        offset: 3030000,
                                    },
                                    verticalPosition: {
                                        offset: 3200000,
                                    },
                                },
                            }),
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            t1,
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            t2,
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        verticalAlign: VerticalAlign.CENTER,
                        children: [
                            t3,
                        ]
                    }),
                    new Paragraph({
                        text: ``, pageBreakBefore: true,
                    }),
                    ...riskTables,
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: `Risk Appetite`,
                                heading: HeadingLevel.HEADING_1,
                                size: 24,
                                bold: true,
                            }),
                        ]
                    }),
                    new Paragraph({
                        text: `\n`
                    }),
                    riskAppetiteTable,
                    new Paragraph({
                        text: `\n`
                    }),
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                            new TextRun({
                                text: `Deksripsi Risk Appetite:`,
                                heading: HeadingLevel.HEADING_1,
                                size: 24,
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                            new TextRun({
                                text: `O   = Tingkat Risiko Inherent`,
                                size: 24,
                                bold: true,
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                            new TextRun({
                                text: `+    = Tingkat Risiko Residual`,
                                size: 24,
                                bold: true,
                            }),
                        ],
                    }),
                ],
            },
        ],
    });
    //Initializing docx

    //Saving docx
    const defaultPath = path.join(app.getPath('documents'), `${proj.namaProyek}.docx`);

    dialog.showSaveDialog({
        defaultPath: defaultPath,
        filters: [
            { name: "Word Documents", extensions: ['docx'] }
        ]
    }).then(result => {
        if (!result.canceled) {
            const filePath = result.filePath;
            const output = fs.createWriteStream(filePath);

            Packer.toBuffer(doc).then((buffer) => {
                output.write(buffer);
                output.end()
                console.log("Project successfully exported.");
            });
        };
    }).catch(err => {
        console.error(err);
    });
    //Saving docx
};

module.exports = { wordExport }