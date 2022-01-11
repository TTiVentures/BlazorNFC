
function ReadNFC(DotNetReference) {
    if ('NDEFReader' in window) { /* Scan and write NFC tags */
        const ndef = new NDEFReader();
        ndef.scan().then(() => {
            console.log("Scan started successfully.");
            DotNetReference.invokeMethodAsync('OnNFCRead', "Scan started successfully.");
            ndef.onreadingerror = () => {
                console.log("Cannot read data from the NFC tag. Try another one?");
                DotNetReference.invokeMethodAsync('OnNFCRead', "Cannot read data from the NFC tag. Try another one?");
            };
            ndef.onreading = (event) => {
                console.log(event);
                DotNetReference.invokeMethodAsync('OnNFCRead', event.serialNumber);

            };
        }).catch(error => {
            console.log(`Error! Scan failed to start: ${error}.`);
            return `Error! Scan failed to start: ${error}.`;
        });
    }
    else {
        console.log(`No NFC device found`);
        return(`No NFC device found`);
    }
    console.log(`I'm listening`);
    return "I'm listening"
}
