/*-------ESTE DOCUMENTO CONTIENE EL CÓDIGO DE UN PROGRAMA QUE RESUELVE UN SUDOKU NORMAL-----------------*/
/*-------EMPEZADO EL 18/08/2023 Y TERMINADO EL 19/08/2023----------------*/
/*-----------------ANGEL JORDE SOSA-------------------------*/

const size = 9;

// Crear un array de filas y columnas (matriz)
var matrizCasos = [];
var matrizAuxiliar = [];
var matrizCasosAuxiliar = [];

var matriz = [
    [null,6,null,1,null,4,null,5,null],
    [null,null,8,3,null,5,6,null,null],
    [2,null,null,null,null,null,null,null,1],
    [8,null,null,4,null,7,null,null,6],
    [null,null,6,null,null,null,3,null,null],
    [7,null,null,9,null,1,null,null,4],
    [5,null,null,null,null,null,null,null,2],
    [null,null,7,2,null,6,9,null,null],
    [null,4,null,5,null,8,null,7,null]
];

for (let i = 0; i < size; i++) {
    matrizCasos[i] = [];
    matrizCasosAuxiliar[i] = [];
    matrizAuxiliar[i] = [];

    for (let j = 0; j < size; j++) {
        matrizCasos[i][j] = 123456789;
        matrizCasosAuxiliar[i][j] = 123456789;
        matrizAuxiliar[i][j] = null;
    }
}

//Establecer las posibilidades en la matriz casos
for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        if(matriz[i][j] != null){
            matrizCasos[i][j] = matriz[i][j];
            matrizAuxiliar[i][j] = matriz[i][j];
        }
    }
}

resolver();

//Compruebo cual de las casillas son dos valores. 
for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        if(matrizCasos[i][j].toString().length == 2){
            for (let q = 0; q < size; q++) {
                for (let w = 0; w < size; w++) {
                    matrizCasosAuxiliar[q][w] = matrizCasos[q][w];
                    matrizAuxiliar[q][w] = matriz[q][w];
                }
            }
            var valorIteracion = matrizCasos[i][j].toString();
            var valorUno = parseInt(valorIteracion.charAt(0));
            var valorDos = parseInt(valorIteracion.charAt(1));

            matrizCasos[i][j] = valorUno;
            resolver();

            for (let z = 0; z < size;z++) {
                //CAMBIO LOS NaN POR 123456789 Y RESUELVO OTRA VEZ
                for (let x = 0; x < size; x++) {
                    if(isNaN(matrizCasos[z][x])){
                        matrizCasos[z][x] = 123456789;
                        matriz[z][x] = null;
                    }
                }
            }

            if(!comprobarResuelto()){
                for (let q = 0; q < size; q++) {
                    for (let w = 0; w < size; w++) {
                        matrizCasos[q][w] = matrizCasosAuxiliar[q][w];
                        matriz[q][w] = matrizAuxiliar[q][w]
                    }
                }
                matrizCasos[i][j] = valorDos;
                resolver();
            }
            resolver();  
        }
    }
}

resolver();
console.log(matriz);

function resolver(){//RESOLVER SUDOKU
    for (let p = 0; p < size; p++) {
        for (let o = 0; o < size; o++) {
            comprobarFila(p);
            comprobarColumna(o);
            for(let h = 0; h < size; h+=3){
                for(let k = 0; k < size; k+=3){
                    comprobarCuadrado(h,k);
                }
            }
        }
    }
    contarNull();
}

function comprobarFila(numeroFila){
    for(j = 1; j <= size; j++){
        for(i = 0; i < size; i++){
            if(matriz[numeroFila][i] == j){
                //Quito de la matriz Casos j en la columna que no sean i
                for(let h = 0; h < size; h++){//Vuelvo a repasar toda la fila
                    if(h!=i){ 
                        var auxiliar = matrizCasos[numeroFila][h].toString();
                        var auxiliarModificado = auxiliar.replace(j, '');
                        var auxiliarEntero = parseInt(auxiliarModificado);
                        matrizCasos[numeroFila][h] = auxiliarEntero;
                        if(auxiliarModificado.length == 1){
                            matriz[numeroFila][h] = auxiliarEntero;
                        }
                    } 
                }
            }
        }
    }
}

function comprobarColumna(numeroColumna){
    for(j = 1; j <= size; j++){
        for(i = 0; i < size; i++){
            if(matriz[i][numeroColumna] == j){
                //Quito de la matriz Casos j en la columna que no sean i
                for(let h = 0; h < size; h++){//Vuelvo a repasar toda la fila
                    if(h!=i){ 
                        var auxiliar = matrizCasos[h][numeroColumna].toString();
                        var auxiliarModificado = auxiliar.replace(j, '');
                        var auxiliarEntero = parseInt(auxiliarModificado);
                        matrizCasos[h][numeroColumna] = auxiliarEntero;
                        if(auxiliarModificado.length == 1){
                            matriz[h][numeroColumna] = auxiliarEntero;
                        }
                    }
                }
            }
        }
    }
}

function comprobarCuadrado(a,b){
    for(let j = 1; j <= size; j++){
        for(let i = a; i < a + size/3; i++){
            for(let h = b; h < b + size/3; h++){
                if(matriz[i][h] == j){//El numero j esta en la posicion i h
                    for(let k = a; k < a + size/3; k++){
                        for(let l = b; l < b + size/3; l++){
                            if(matriz[i][h] != matriz[k][l]){ 
                                var auxiliar = matrizCasos[k][l].toString();
                                var auxiliarModificado = auxiliar.replace(j, '');
                                var auxiliarEntero = parseInt(auxiliarModificado);
                                matrizCasos[k][l] = auxiliarEntero;
                                if(auxiliarModificado.length == 1){
                                    matriz[k][l] = auxiliarEntero;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function contarNull(){
    var contadorNull = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if(matriz[i][j] == null) contadorNull++; 
        }
    }
}

function comprobarResuelto(){
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if(matrizCasos[i][j].toString().length != 1){
                parseInt(matrizCasos[i][j]);
                return false; 
            }
            parseInt(matrizCasos[i][j]);
        }
    }
    return true;
}