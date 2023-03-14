const html = document.getElementsByTagName("html")[0];
const boardElem = document.getElementById("board");
const squaresElem = document.getElementById("squares");
const inHandsElems = [document.getElementById("in_hands_0"), document.getElementById("in_hands_1")];
const reverseButtonElem = document.getElementById("reverse");
const lightYouUpButtonElem = document.getElementById("light_you_up");

const board = new Array(9).fill(0).map(_ => new Array(9).fill(null));
const inHands = [[], []];
let turn = 0;
let clickedPiece = null;
let canMoveTo = null;

let boardIsOrange = true;
let boardIsGaming = false;

let squaresInner = "";
for (let i = 0; i < 9; ++i) {
    squaresInner += "<tr>";
    for (let j = 0; j < 9; ++j) {
        squaresInner += `<td id="l-${i}-${j}"></td>`;
    }
    squaresInner += "</tr>";
}
squaresElem.innerHTML = squaresInner;

const squareElemsArr = new Array(9).fill(0).map((val, idx) => new Array(9).fill(0).map((val2, idx2) => document.getElementById(`l-${idx}-${idx2}`)));

const defaultBoard = [
    ["lance", "knight", "silver", "gold", "king_2", "gold", "silver", "knight", "lance"],
    [0, "rook", 0, 0, 0, 0, 0, "bishop"],
    ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
    [],
    [],
    [],
    ["pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn", "pawn"],
    [0, "bishop", 0, 0, 0, 0, 0, "rook"],
    ["lance", "knight", "silver", "gold", "king", "gold", "silver", "knight", "lance"]
];

function init() {
    turn = 0;
    defaultBoard.forEach((it, line) => {
        it.forEach((square, row) => {
            if (square)
                board[line][row] = new Piece(square, [line, row], line < 3);
        });
    });
}

const pieceTypes = {
    "king": {
        "display": "王",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives = [
                [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]
            ];
            return relCoordsToAbs(currentPos, relatives, isEnemy);
        },
    },
    "king_2": {
        "display": "玉",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives = [
                [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]
            ];
            return relCoordsToAbs(currentPos, relatives, isEnemy);
        },
    },
    "rook": {
        "display": "飛",
        "promotedTo": "dragon",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives = [
                [0, 1], [0, -1], [1, 0], [-1, 0]
            ];
            return relLinesToAbsolutes(currentPos, relatives, isEnemy);
        },
    },
    "dragon": {
        "display": "龍",
        "promotedFrom": "rook",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives_1 = [
                [0, 1], [0, -1], [1, 0], [-1, 0]
            ];
            const relatives_2 = [
                [1, 1], [1, -1], [-1, 1], [-1, -1]
            ];
            return relLinesToAbsolutes(currentPos, relatives_1, isEnemy).concat(relCoordsToAbs(currentPos, relatives_2, isEnemy));
        },
    },
    "bishop": {
        "display": "角",
        "promotedTo": "horse",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives = [
                [1, 1], [1, -1], [-1, 1], [-1, -1]
            ];
            return relLinesToAbsolutes(currentPos, relatives, isEnemy);
        },
    },
    "horse": {
        "display": "馬",
        "promotedFrom": "bishop",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives_1 = [
                [1, 1], [1, -1], [-1, 1], [-1, -1]
            ];
            const relatives_2 = [
                [0, 1], [0, -1], [1, 0], [-1, 0]
            ];
            return relLinesToAbsolutes(currentPos, relatives_1, isEnemy).concat(relCoordsToAbs(currentPos, relatives_2, isEnemy));
        },
    },
    "gold": {
        "display": "金",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives = [
                [1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]
            ];
            return relCoordsToAbs(currentPos, relatives, isEnemy);
        },
    },
    "silver": {
        "display": "銀",
        "promotedTo": "proSilver",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives = [
                [1, 1], [-1, 1], [-1, 0], [-1, -1], [1, -1]
            ];
            return relCoordsToAbs(currentPos, relatives, isEnemy);
        },
    },
    "proSilver": {
        "display": "全",
        "promotedFrom": "silver",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives = [
                [1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]
            ];
            return relCoordsToAbs(currentPos, relatives, isEnemy);
        },
    },
    "knight": {
        "display": "桂",
        "promotedTo": "proKnight",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives = [[-2, 1], [-2, -1]];
            return relCoordsToAbs(currentPos, relatives, isEnemy);
        },
    },
    "proKnight": {
        "display": "今",
        "promotedFrom": "knight",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives = [
                [1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]
            ];
            return relCoordsToAbs(currentPos, relatives, isEnemy);
        },
    },
    "lance": {
        "display": "香",
        "promotedTo": "proLance",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives = [
                [-1, 0]
            ];
            return relLinesToAbsolutes(currentPos, relatives, isEnemy);
        },
    },
    "proLance": {
        "display": "仝",
        "promotedFrom": "lance",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives = [
                [1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]
            ];
            return relCoordsToAbs(currentPos, relatives, isEnemy);
        },
    },
    "pawn": {
        "display": "歩",
        "promotedTo": "proPawn",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives = [[-1, 0]];
            return relCoordsToAbs(currentPos, relatives, isEnemy);
        },
    },
    "proPawn": {
        "display": "と",
        "promotedFrom": "pawn",
        "checkToMove": (currentPos, isEnemy) => {
            const relatives = [
                [1, 0], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1]
            ];
            return relCoordsToAbs(currentPos, relatives, isEnemy);
        },
    },
};

function relCoordsToAbs(currentPos, relCoords, isEnemy) {
    const coef = isEnemy ? -1 : 1;
    return relCoords.map((it) => {
        const [newPosX, newPosY] = [coef * it[0] + currentPos[0], coef * it[1] + currentPos[1]];
        if (canBeMovedTo(newPosX, newPosY)) return [newPosX, newPosY];
    }).filter(it => it);
}

function relLinesToAbsolutes(currentPos, relLines, isEnemy) {
    const coef = isEnemy ? -1 : 1;
    const res = [];
    relLines.forEach(it => {
        let [x, y] = currentPos;
        do {
            if (board[x][y] && (board[x][y].isEnemy ^ turn)) {
                res.push("pop()生贄");
                break;
            }
            [x, y] = [x + it[0] * coef, y + it[1] * coef];
            res.push([x, y]);
        } while (canBeMovedTo(x, y));
        res.pop();
    });
    return res;
}

function canBeMovedTo(x, y) {
    return 0 <= x && x < 9 && 0 <= y && y < 9 && (!board[x][y] || (board[x][y].isEnemy ^ turn));
}

function canBeMovedToArray(pos) {
    return canBeMovedTo(pos[0], pos[1]);
}

function canBePlacedTo(x, y) {
    return !board[x][y];
}

function setPieceDisplay(pos, display, isEnemy) {
    const element = squareElemsArr[pos[0]][pos[1]];
    element.innerText = display;
    if (isEnemy) {
        element.classList.add("enemies");
    } else {
        element.classList.remove("enemies");
    }
}

function clearPieceDisplay(pos) {
    const element = squareElemsArr[pos[0]][pos[1]];
    element.innerText = "";
    element.classList.remove("enemies");
}

function clearClickedStyle() {
    const target = document.getElementById(`l-${clickedPiece.currentPos[0]}-${clickedPiece.currentPos[1]}`);
    if (target)
        target.style.fontWeight = "";
    canMoveTo.forEach(it => {
        squareElemsArr[it[0]][it[1]].style.backgroundColor = "";
    });
}

function inHandsRenewer() {
    let inHandsElemInner = "";
    inHands.forEach((val, idx) => {
        inHandsElemInner = ""
        val.forEach(val2 => {
            inHandsElemInner += "<div>" + pieceTypes[val2]["display"] + "</div>";
        })
        inHandsElems[idx].innerHTML = inHandsElemInner;
    })
}

function checkIfHeBrokeTheRules() {
    // 直前の指し手が反則ならば true を返す
    // 未実装
    //if () { }
    return;
}

document.addEventListener('click', e => {
    const target = e.target;
    if (target.parentNode == inHandsElems[turn]) {
        if (clickedPiece) clearClickedStyle();
        const pieceIndex = [...inHandsElems[turn].children].indexOf(target);
        clickedPiece = new Piece(inHands[turn][pieceIndex], [-1, pieceIndex], turn == 1, true);
        target.style.fontWeight = "bold";
        canMoveTo = [];
        for (let i = 0; i < 9; ++i) {
            for (let j = 0; j < 9; ++j) {
                if (canBePlacedTo(i, j)) {
                    canMoveTo.push([i, j])
                }
            }
        }
        canMoveTo.forEach(it => {
            squareElemsArr[it[0]][it[1]].style.cssText = "background-color: #ffff00 !important;";
        });
    }
    if (target.id.match(/^l-[0-9]-[0-9]$/) != undefined) {
        const pos = target.id.split("-").splice(1, 2).map(it => Number(it));
        const piece = board[pos[0]][pos[1]];
        if (canMoveTo && canMoveTo.some(it => it[0] == pos[0] && it[1] == pos[1])) {
            clearClickedStyle();
            const prevPos = clickedPiece.currentPos;
            if (board[pos[0]][pos[1]]) {
                inHands[turn].push(board[pos[0]][pos[1]].type.promotedFrom ?? board[pos[0]][pos[1]].id);
                inHandsRenewer();
            }
            if (clickedPiece.type.promotedTo && ((!turn && pos[0] < 3) || turn && pos[0] > 5) && prevPos[0] != -1 && confirm("成りますか?")) {
                board[pos[0]][pos[1]] = new Piece(clickedPiece.type.promotedTo, pos, clickedPiece.isEnemy);
            } else {
                board[pos[0]][pos[1]] = clickedPiece;
                clickedPiece.currentPos = pos;
                clickedPiece.setDisplay(pos);
            }
            if (prevPos[0] != -1) {
                board[prevPos[0]][prevPos[1]] = null;
                clearPieceDisplay(prevPos);
            } else {
                inHandsElems[turn].children[prevPos[1]].remove();
                inHands[turn].splice(prevPos[1], 1);
            }
            clickedPiece = null;
            canMoveTo = null;
            checkIfHeBrokeTheRules();
            turn = turn ? 0 : 1;
            return;
        }
        if (!piece) {
            console.log("駒がありません.");
            return;
        }
        if (piece.isEnemy ^ turn) {
            console.log("あなたの駒ではありません.");
            return;
        }
        if (clickedPiece) clearClickedStyle();
        target.style.fontWeight = "bold";
        canMoveTo = piece.type.checkToMove(pos, piece.isEnemy);
        canMoveTo.forEach(it => {
            squareElemsArr[it[0]][it[1]].style.cssText = "background-color: #ffff00 !important;";
        });
        clickedPiece = piece;
    }
});
reverseButtonElem.addEventListener("click", () => {
    console.log(boardIsOrange);
    if (boardIsOrange) {
        html.style.backgroundColor = "#f9c270";
        boardElem.style.backgroundColor = "#90ee90";
    } else {
        html.style.backgroundColor = "#90ee90";
        boardElem.style.backgroundColor = "#f9c270";
    }
    boardIsOrange = !boardIsOrange;
    console.log(boardIsOrange);
})
lightYouUpButtonElem.addEventListener("click", () => {
    if (boardIsGaming) {
        clearAnimations();
    } else {
        setAnimations();
    }
    boardIsGaming = !boardIsGaming;
})

function setAnimations() {
    html.style.animation = "gaming 2s reverse infinite";
    boardElem.style.animation = "graduation 2s linear infinite";
    boardElem.style.background = "0 0 / 200% 200% linear-gradient(-45deg, magenta, yellow, cyan, magenta, yellow, cyan)"
}

function clearAnimations() {
    html.style.backgroundColor = (boardIsOrange ? "#90ee90" : "#f9c270");
    boardElem.style.background = "";
    boardElem.style.backgroundColor = (boardIsOrange ? "#f9c270" : "#90ee90");
    html.style.animation = "";
    boardElem.style.animation = "";
}

class Piece {
    id;
    currentPos;
    isEnemy;
    type;

    constructor(id, current, isEnemy, notDisplay) {
        this.id = id;
        this.currentPos = current;
        this.isEnemy = isEnemy;
        this.type = pieceTypes[id];
        if (!notDisplay)
            this.setDisplay(current);
    }

    setDisplay(current) {
        setPieceDisplay(current, this.type.display, this.isEnemy)
    }
}

init();