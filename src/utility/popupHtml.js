

const popupHtml = (onlyArea,areaName,data,dataName) =>{
    return onlyArea?`<html><head><style>table, th, td{border: 1px solid black; border-collapse: collapse;}th, td{padding: 5px; text-align: left;}</style></head><body><table style="width: 100% ; min-width:250px"><tr> <th style="width:20% ; background: green; color: white;font-size:14px">Area Name:</th> <td style="font-size:14px" >${areaName}</td></tr></table></body></html>`:`<html><head><style>table, th, td{border: 1px solid black; border-collapse: collapse;}th, td{padding: 5px; text-align: left;}</style></head><body><table style="width: 100% ; min-width:250px"><tr> <th style="width:20% ; background: green; color: white;font-size:14px">Area Name:</th> <td style="font-size:14px" >${areaName}</td></tr><tr> <th style="width:40% ; background: green; color: white;font-size:14px">${dataName}</th> <td style="font-size:14px" >${data}</td></tr></table></body></html>`
    
}

export default popupHtml;