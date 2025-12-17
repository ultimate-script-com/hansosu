'use strict';
//ゲーム用変数
const area_button = document.getElementById('area_button');
const area_question = document.getElementById('area_question');
const prime_array = [191, 193, 197, 199];
const history = document.getElementById('history');

let sign = ['✕', '='];
let users_input = {};
let correct = 0;
let now_input = '';

history.textContent = '入力欄に数字を入力';

//乱数を取得する関数
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // 上限は除き、下限は含む
}

//入力ボタンを生成する
for (let j = 0; j < prime_array.length; j++) {
    const button = document.createElement('button');
    button.setAttribute('class', 'prime_button');
    button.setAttribute('id', `button_${j}`);
    button.textContent = prime_array[j];
    area_button.appendChild(button);
}

//半素数を生成する関数
const semiprimeGenerator = () => {
    const a = prime_array[getRandomInt(0, prime_array.length)];
    const b = prime_array[getRandomInt(0, prime_array.length)];
    if (a * b === correct) {
        console.log('重複！'); //同じ問題が連続して出ないようにする
        
        semiprimeGenerator();
    } else {
        sign.push(a * b);
        correct = a * b;
        console.log(a, b);
    }
}


const wrongAnswer = (element) => {
    console.log('不正解アニメーション実行');
}


//答え合わせをする関数
const checkingAnswer = (n) => {
    const question = document.getElementById('area_question');
    const a = question.textContent;
    if (n === 2) {
        const value = Object.values(users_input);
        console.log(value);
        const answer = Number(value[0]) * Number(value[1]);
        console.log(answer);
        if (answer === correct) {
            console.log(a);
            //クリアした問題を表示する
            history.textContent = `正解！ ${a}`;
            history.style.color = 'turquoise';
            questionGenerator();
        } else {
            wrongAnswer(question);
        }
    }
}

//入力欄を初期化する関数
const resetInput = () => {
    let input = document.getElementsByClassName('question_input');
    input = Array.prototype.slice.call(input);
    input.forEach(element => {
        element.style.color = 'whitesmoke';
        element.style.borderWidth = '0.6dvmin';
    });
}

//問題文の要素がクリックされた時の関数
area_question.addEventListener('click', e => {
    const id = e.target.id;
    now_input = '';
    resetInput(); //入力欄を初期化する
    if (e.target.className === 'question_input') {
        const input = document.getElementById(id);
        input.style.color = 'turquoise';
        input.style.borderWidth = '0.8dvmin';
        now_input = id;
        //正解時に文字色とテキストを変更
        history.style.color = 'darkgray';
        history.textContent = '入力欄に数字を入力';
    }
});

//入力用のボタンがクリックされた時の関数
area_button.addEventListener('click', e => {
    const id = e.target.id;
    const button = document.getElementById(id);
    if (now_input !== '') {
        const input = document.getElementById(now_input);
        input.textContent = button.textContent;
        users_input[now_input] = button.textContent;
        checkingAnswer(Object.keys(users_input).length);
    }
});

//問題を生成する関数
const questionGenerator = () => {
    let n_sign = 0;
    //問題文の要素を初期化
    document.getElementById('area_question').textContent = '';
    sign = ['✕', '='];
    users_input = {};
    now_input = '';
    semiprimeGenerator(); //半素数を生成する関数
    console.log(correct); //同じ値が連続して生成されていないかのチェック
    //問題の式を生成するループ
    for (let j = 0; j < 5; j++) {
        const div = document.createElement('div');
        if (j % 2 === 0 && j !== 4) {
            div.setAttribute('class', 'question_input');
            div.setAttribute('id', `question_input${j}`);
        } else {
            div.setAttribute('class', 'question_sign');
            div.setAttribute('id', `question_sign${j}`);
            div.textContent = sign[n_sign];
            n_sign++;
        }
        area_question.appendChild(div);
    }
}
questionGenerator(); //ページ読み込み時に問題を生成する
