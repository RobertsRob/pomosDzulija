let listArMn = [];
getDates();
function buttonPressDownload()
{
    let infoWhatAllTable = "";
    for(let i = 0; i < listArMn.length; i++)
    {
        infoWhatAllTable = infoWhatAllTable + listArMn[i];
    }
    if(listArMn.length >= 1)
    {
        
        let content = "Komanda,Speletaja Vards,Uzbrukumu pirms punkta iegušanas,Punkti,Speles laiks,Ievadisanas laiks,Parkapums,Ipasas Piezimes" + infoWhatAllTable;
    
        // const csvBlob = new Blob(["1, 5"]);
        const csvBlob = new Blob([content]);
    
        a2.download = "basketbolaDatuIevads.csv";
    
        a2.href = URL.createObjectURL(csvBlob);
    
        a2.click();

        Swal.fire(
        'Fails tika lejupieladets!',
        'Poga bija uzspiesta!',
        'success'
        )
    }
    else
    {
        Swal.fire({
          icon: 'error',
          title: 'Uzspied pogu pievienot metienu sakumā!',
          text: '',
        })
    }
}
function newVrInp()
{
    let canSendDates = true;



    let radioButtons = document.getElementsByName('teamChooseInputRadio');
    let checkedValue = null;

    for (var i = 0; i < radioButtons.length; i++)
    {
        if (radioButtons[i].checked) 
        {
            checkedValue = radioButtons[i].value;
            break;
        }
    }

    if (checkedValue === null) 
    {
        canSendDates = false;
    }

    //console.log(checkedValue);

    let playerName = document.getElementById("playerName").value;
    if(playerName.length < 2)
    {
        canSendDates = false;
    }

    let uzbrukumi = document.getElementById("uzbrukumi").value;
    if(uzbrukumi.length < 1)
    {
        canSendDates = false;
    }

    let punktuSkaits = document.getElementById("punktuSkaits").value;
    if(punktuSkaits.length < 1)
    {
        canSendDates = false;
    }

    let spelesLaiks = document.getElementById("spelesLaiks").value;
    if(spelesLaiks.length < 1)
    {
        canSendDates = false;
    }

    let piezimesIpasas = document.getElementById("piezimesIpasas").value;
    if(piezimesIpasas.length < 2)
    {
        canSendDates = false;
    }

    let currentdate = new Date(); 
    let datetime = + currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " - "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();



    let radioButtonsOsibki = document.getElementsByName('piezimeChooseInputRadio');
    let checkedValueOsibki = null;

    for (var i = 0; i < radioButtonsOsibki.length; i++)
    {
        if (radioButtonsOsibki[i].checked) 
        {
            checkedValueOsibki = radioButtonsOsibki[i].value;
            break;
        }
    }

    if (checkedValueOsibki === null) 
    {
        canSendDates = false;
    }





    if(canSendDates == false)
    {
        Swal.fire({
            icon: 'error',
            title: '<b style="font-family:arial;">Enter all gaps!</b>',
            text: 'You must to complete all gaps before downloading! Each gap must contain at least 2 symbols!',
        })
        return;
    }

    let whTP = "\n" + checkedValue +  "," + playerName + "," + uzbrukumi + "," + punktuSkaits + "," + spelesLaiks + "," + datetime + "," + checkedValueOsibki + "," + piezimesIpasas;
    listArMn.push(whTP);

    // localStorage.setItem("basketball", listArMn);
    saveDataToLocalStorage('massiveData', listArMn);

    Swal.fire({
    icon: 'info',
    title: 'Bija pielikts iemetiens!',
    text: 'Bija nospiesta poga!',})

    //anulesana
    document.getElementById("playerName").value = ""
    document.getElementById("uzbrukumi").value = ""
    document.getElementById("punktuSkaits").value = ""
    document.getElementById("spelesLaiks").value = ""
    document.getElementById("piezimesIpasas").value = ""
    for (let i = 0; i < radioButtons.length; i++) 
    {
        radioButtons[i].checked = false;
    }
    for (let i = 0; i < radioButtonsOsibki.length; i++) 
    {
        radioButtonsOsibki[i].checked = false;
    }
}


function getDates()
{
    if(getDataFromLocalStorage('massiveData') != null)
    {
        listArMn = getDataFromLocalStorage('massiveData');
    }
    console.log(listArMn);

}


function saveDataToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getDataFromLocalStorage(key) {
    const storedData = localStorage.getItem(key);
    return JSON.parse(storedData);
}


function clearIeprV()
{
    localStorage.clear();
    listArMn = [];
    Swal.fire({
        icon: 'info',
        title: 'Bija attirita atmiņa!',
        text: 'Bija nospiesta poga!',})
}