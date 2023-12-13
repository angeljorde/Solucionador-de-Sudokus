//This function is used to check which cell is empty
function findEmpty(board){
    for(let i = 0; i < 9; i++){
        for(let j = 0; j < 9; j++){
            if(board[i][j] === 0){
                return [i, j]; //If an empty cell is found, we return the position [row, column] of this cell 
            }
        }
    }
    return [-1, -1]; //If no empty cell is found, we return this value.
}

//This function is used to check if a number can be in a cell.
//We have to check the corresponding square of 3x3 and the corresponding row and column.
function tryNumbers(row, col, board, num){
        //TO CHECK THE SQUARE 3X3
        //With the method Math.floor we can know in which square of 3x3 we are.
        //We assume the first one as 0 0 and the last one as 2 2.
        rowCell = Math.floor(row/3)
        colCell = Math.floor(col/3)
        for (let a = rowCell*3; a < rowCell*3 + 3; a++){
            for (let b = colCell*3; b < colCell*3 + 3; b++){
                if(num === board[a][b]) return false
            }
        }
        //TO CHECK THE ROW AND THE COLUMN
        //We can use the same loop.
        for(let x = 0; x < 9; x++){
            if(num === board[row][x] || num === board[x][col]) return false
        }
    //If the programme arrives here, we can insert num into the cell.
    return true
}

//This is the main function where the sudoku is solved
function solveSudoku(board){
    //We find which cell we should check
    let [row, col] = findEmpty(board)

    //We check if there was no value empty. True if the sudoku is solved.
    if(row == -1 && col == -1) return true
    //We check all the possible numbers.
    for(let num = 1; num <= 9; num++){
        let state = tryNumbers(row, col, board, num)
        //If we can insert num in the cell
        if(state){
            board[row][col] = num
            //We solve the sudoku with this assumption
            if(solveSudoku(board)) return true
            //If the assumption is not correct, we change the value to 0 and repeat.
            board[row][col] = 0
        }
    }
    return false
}

//We define the initial board
const board = [
    [0,6,0,1,0,4,0,5,0],
    [0,0,8,3,0,5,6,0,0],
    [2,0,0,0,0,0,0,0,1],
    [8,0,0,4,0,7,0,0,6],
    [0,0,6,0,0,0,3,0,0],
    [7,0,0,9,0,1,0,0,4],
    [5,0,0,0,0,0,0,0,2],
    [0,0,7,2,0,6,9,0,0],
    [0,4,0,5,0,8,0,7,0]
]

//We read the return of the function solveSudoku to know if the sudoku has been solved or not.
if(solveSudoku(board)){
    console.log("Solution of this sudoku: ")
    console.log(board)
}else{
    console.log("This sudoku doesn't have a solution")
}