// DOM Elementen Variablen zuweisen
let form = document.querySelector('#form');
let userInput = document.querySelector('#input');
let scriptOutput = document.querySelector('#output');
let columnCount = document.querySelector('#number');
let copy = document.querySelector('#copy');
// Initialisierung der Variablen für das Stringarray & verschlüsselte Nachricht
let message = []
let encrypted = '';

// EventListener für Laden des DOMs (der Seite) & kopieren Funktion
document.addEventListener('DOMContentLoaded', () => userInput.focus())
copy.addEventListener('click', () => navigator.clipboard.writeText(scriptOutput.value));;

/* Diese Funktion (ES6 Arrow Syntax) liest das Stringarray (message) aus und das Ergebnis
* wird der Variable message zugewiesen
*/
const readMessageArray = (cols, rows, message) => {
    //Äußerer For Loop für die Anzahl der Spalten des message Arrays
    for (let i = 0; i < cols; i++) {
        // Einzelne Sequenzen des verschlüsselten Strings, z. B. "bet", "ele" usw.
        let sequence = '';
        for (let j = 0; j < rows; j++) {
            /* Wenn die Indexe des message Arrays nicht leer sind
            * dann füge es der Variable sequence hinzu
            */
            if (message[j] && message[j][i] !== '') {
                sequence += message[j][i];
            }
        }

        /* Sequenz wird mit Leerzeichen hinzugefügt, um den verschlüsselten String 
        * die Leerzeichen hinzuzufügen wie z. B. "bet ele ikx slt pa ir"
        */
        encrypted += `${sequence} `;
    }
    // Verschlüsselte Nachricht wird ins Inputfeld hinzugefügt
    scriptOutput.value = encrypted;;
    /* Zwei console.log Statements, damit man das Array und die verschlüsselte Nachricht
    * in der Console sehen kann zum Verständnis
    */
    console.log(message)
    console.log(encrypted)
};

/* Funktion für das Hinzufügen der Reihen
* 3 Parameter. string ist userInput, cols ist Versatz, 
* callback ist die Funktion die nach der Ausführung dieser Funktion aufgerufen wird 
+ also readMessageArray
*/
const addRows = (string, cols, callback) => {
    // Reihen berechnen mit dem String & Versatz, es wird immer aufgerundet (Math.ceil)
    let rows = Math.ceil(string.length / cols);
    // Startpunkt für das durchlaufen aller Zeichen im String
    let index = 0;

    // Äußerer For Loop für die einzelnen inneren Arrays, die als Reihen dienen
    for (let i = 0; i < rows; i++) {
        let row = [];
        // Innerer For Loop der 
        for (let j = 0; j < cols; j++) {
            /* Bei jeder Iterierung wird ein Zeichen vom
            * String in die Reihe hinzugefügt. Das geht so lange, bis
            * die Variable index einen höheren Wert hat als die Länge des Strings
            * Wenn die Variable index einen höheren Wert hat, dann wird 
            * ein leerer String hinzugefügt 
            */
            if (index < string.length) {
                row.push(string[index])
                /* Index wird hier um 1 erhöht, damit im nächsten Durchgang 
                + auf das nächste Zeichen zugegriffen wird
                */
                index++;
            } else {
                // Gebe dem Array einen leeren String, wenn das Zeichen nicht existiert
                row.push('');
            }
        }
        // Das jeweilige Endergebnis dem message Array zuweisen
        message.push(row);
    }
    /* Der Callback wird ausgeführt, also eine andere Funktion wird jetzt aufgerufen, 
    * die die Anzahl der Spalten (Versatz), Reihen und das Endergebnis als Parameter erhält
    */
    callback(cols, rows, message);
};

/* Submit EventListener, der überwacht, ob das Formular abgesendet wird, also ob 
* man auf Enter drückt, um die Verschlüsselung zu starten oder auf den SUbmitbutton 
* "Verschlüsseln" klickt
*/
form.addEventListener('submit', (e) => {
    // Standardverhalten eines Submits canceln, damit die Seite nicht neu geladen wird
    e.preventDefault();
    /* Initialisierung zweier Variablen, einmal String, einmal Versatz, welcher
    * vom Datentyp String in Datentyp Number umgewandelt wird. 
    */
    let string = userInput.value;
    let cols = Number(columnCount.value);

    /* In diesem If statement überprüfe ich, ob etwas bereits im Output ist, wenn ja,
    * wird es geleert
    */
   if (scriptOutput.value !== '') {
    message = [];
    encrypted = '';
   }

    /* Funktion addRows wird aufgerufen und erhält die beiden definierten Variablen
    * ein callback (die Funktion readMessageArray)
    */
    addRows(string, cols, readMessageArray);
});