
function createPostiveZProbTable() {
 
    // Create the z-score table header row
    let row = ["Z-score"];
    for (let i = 0; i <= 9; i++) {
        let hundredths = i / 100;
        row.push(hundredths);
    }

    // Create rest of rows from 0.0 to 3.4
    let zScores = [];
    zScores[0] = row;
    for (let i = 0; i <=34; i++) {
        let zRow = [];
        let zHead = i / 10;
        zRow.push(zHead);
        for (let j = 0; j <= 9; j++) {
            let zScore = zHead + j/100;
            let zProb = getZPercent(zScore);
            zProb = zProb.toFixed(4);
            zRow.push(zProb);
        }
        zScores[i+1] = zRow;
    }

    // Display the table
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    caption.textContent = "Positive Z-Values - Probability Left of Z-Score";
    table.appendChild(caption);
    for (let i = 0; i < zScores.length; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < zScores[i].length; j++) {
            const cell = document.createElement("td");
            cell.textContent = zScores[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    document.body.appendChild(table);
}


function createNegativeZProbTable() {

    // Create the z-score table header row
    let row = ["Z-score"];
    for (let i = 0; i <= 9; i++) {
        let hundredths = i / 100;
        row.push(hundredths);
    }

    // Create rest of rows from 0.0 to 3.4
    let zScores = [];
    zScores[0] = row;
    for (let i = -34; i <=0; i++) {
        let zRow = [];
        let zHead = i / 10;
        zRow.push(zHead);
        for (let j = 0; j <= 9; j++) {
            let zScore = zHead - j/100;
            let zProb = getZPercent(zScore);
            zProb = zProb.toFixed(4);
            zRow.push(zProb);
        }
        zScores[i+34+1] = zRow;
    }

    // Display the table
    const table = document.createElement("table");
    const caption = document.createElement("caption");
    caption.textContent = "Negative Z-Values - Probability Left of Z-Score";
    table.appendChild(caption);
    for (let i = 0; i < zScores.length; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < zScores[i].length; j++) {
            const cell = document.createElement("td");
            cell.textContent = zScores[i][j];
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
    document.body.appendChild(table);
}

function getZPercent(z) {

    // z == number of standard deviations from the mean

    // if z is greater than 6.5 standard deviations from the mean the
    // number of significant digits will be outside of a reasonable range

    if (z < -6.5) {
    return 0.0;
    }

    if (z > 6.5) {
    return 1.0;
    }

    var factK = 1;
    var sum = 0;
    var term = 1;
    var k = 0;
    var loopStop = Math.exp(-23);

    while(Math.abs(term) > loopStop) {
    term = .3989422804 * Math.pow(-1,k) * Math.pow(z,k) / (2 * k + 1) / Math.pow(2,k) * Math.pow(z,k+1) / factK;
    sum += term;
    k++;
    factK *= k;
    }

    sum += 0.5;

    return sum;
}