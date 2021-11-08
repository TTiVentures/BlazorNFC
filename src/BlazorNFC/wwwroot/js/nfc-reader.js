
function ReadNFC(DoNetReference) {
    if ('NDEFReader' in window) { /* Scan and write NFC tags */
        const ndef = new NDEFReader();
        ndef.scan().then(() => {
            console.log("Scan started successfully.");
            DoNetReference.invokeMethodAsync('OnNFCRead', "Scan started successfully.");
            ndef.onreadingerror = () => {
                console.log("Cannot read data from the NFC tag. Try another one?");
                DoNetReference.invokeMethodAsync('OnNFCRead', "Cannot read data from the NFC tag. Try another one?");
            };
            ndef.onreading = (event) => {
                const message = event.message;
                DoNetReference.invokeMethodAsync('OnNFCRead', JSON.stringify(event));

                for (const record of message.records) {
                    console.log("Record type:  " + record.recordType);
                    console.log("MIME type:    " + record.mediaType);
                    console.log("Record id:    " + record.id);
                    switch (record.recordType) {
                        case "text":
                            // TODO: Read text record with record data, lang, and encoding.
                            break;
                        case "url":
                            // TODO: Read URL record with record data.
                            break;
                        default:
                        // TODO: Handle other records with record data.
                    }
                }
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
