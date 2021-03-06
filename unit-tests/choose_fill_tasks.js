"use strict";

function get_random(max) {
    return Math.floor(Math.random() * (max + 1));
}

function write_exercise(exercise) {
    let ex = document.getElementById("exercise");
    ex.innerHTML = exercise[0].toUpperCase() +  exercise.slice(1);
}

function make_answers_ind(ir) {
    let pos_right = get_random(3);
    let answers_ind = [0, 0, 0, 0];
    answers_ind[pos_right] = ir;
	let indexes = [ir];
    let x = 0;
    for (let i = 0; i < 4; i++) {
        if (i != pos_right) {
            x = get_random(words.length - 1 - indexes.length);
			for (let j = 0; j < indexes.length; j++) {
                if (x >= indexes[j]) {
                    x++;
                }
            }
            answers_ind[i] = x;
            indexes.push(x);
            indexes.sort(function (a, b) {
                return a - b;
            });
        }
    }
    return [pos_right, answers_ind];
}

function make_answers(answers_ind) {
    let answers = ["", "", "", ""];
    for (let i = 0; i < 4; i++) {
        if ((task1 == "choose") && (lang == "eng")) {
            answers[i] = words[answers_ind[i]].translation;
        } else {
            answers[i] = words[answers_ind[i]].word
        }
    }
    return answers;
}

function write_answers(answers) {
    let labels = document.querySelectorAll(".form-check-label");
    for (let i = 0; i < 4; i++) {
        labels[i].innerHTML = answers[i][0].toUpperCase() +  answers[i].slice(1);
    }
}

function switch_off_radio_button() {
    let radio_buttons = document.querySelectorAll(".form-check-input");
    for (let i = 0; i < 4; i++) {
        let radio_button = radio_buttons[i];
        radio_button.checked = false;
    }
}

function check_answer_on_click(pos_right, answers) {
    let radio_buttons = document.querySelectorAll(".form-check-input");
    for (let i = 0; i < 4; i++) {
        let radio_button = radio_buttons[i];
        radio_button.onclick = function () {
            if (answers[i].trim().toLowerCase() != answers[pos_right].trim().toLowerCase()) {
                alert("??????????????, ???????????????????? ??????????: " + answers[pos_right]);
            }
            choose_and_fill_tasks();
        }
    }
}

function search_all_words_from_words_combination(word_arr, s) {
    let w1 = "";
    for (let i = 0; i < word_arr.length - 1; i++) {
        w1 += ("\\b" + word_arr[i] + "[a-z]*\\b|");
        if (word_arr[i][word_arr[i].length - 1] == "y") {
            w1 += ("\\b" + word_arr[i].slice(0, word_arr[i].length - 1) + "ied\\b|");
        }
    }
    w1 += "\\b" + word_arr[word_arr.length - 1] + "[a-z]*\\b"
    if (word_arr[word_arr.length - 1][word_arr[word_arr.length - 1].length - 1] == "y") {
        w1 += ("|\\b" + word_arr[word_arr.length - 1].slice(0, word_arr[word_arr.length - 1].length - 1) + "ied\\b");
    }
    let re1 = new RegExp(w1, "gi");
    let s_words = Array.from(s.matchAll(re1));
    return [s_words, re1];
}

function search_words_combination(word_arr, s_words) {
    let s_words1 = [];
    let corr_ans = "";
    for (let i = 0; i < s_words.length - word_arr.length + 1; i++) {
        let k = 0;
        for (let j = 0; j < word_arr.length; j++) {
            let w2 = "\\b" + word_arr[j] + "[a-z]*\\b";
            if (word_arr[j][word_arr[j].length - 1] == "y") {
                w2 += ("|\\b" + word_arr[j].slice(0, word_arr[j].length - 1) + "ied\\b");
            }
            let re2 = new RegExp(w2, "i");
            if (s_words[i + j][0].search(re2) != -1) {
                k++;
            }
        }
        if (k == word_arr.length) {
            for (let j = 0; j < word_arr.length; j++) {
                s_words1.push(s_words[i + j]);
                corr_ans += (s_words[i + j][0] + " ");
            }
        }
    }
    corr_ans = corr_ans.trim();
    return [s_words1, corr_ans];
}

function replace_word_combination_with_underscore(s_words1, s, re1) {
    let x = s_words1[0].index;
    let y = s_words1[s_words1.length - 1].index + s_words1[s_words1.length - 1][0].length;
    let s1 = s.slice(x, y);
    s1 = s1.replace(re1, "______");
    s = s.slice(0, x) + s1 + s.slice(y, s.length);
    let re3 = /(______\s)+______/g;
    s = s.replace(re3, "______");
    return s;
}

function give_word_required_case(word_arr, word) {
    word = word.split(" ");
    for (let i = 0; i < word.length; i++) {
        word[i] = word[i].toLowerCase();
        if (word_arr[i][0] == word_arr[i][0].toUpperCase()) {
            word[i] = word[i][0].toUpperCase() + word[i].slice(1, word[i].length)
        }
    }
    word = word.join(" ");
    return word;
}

function search_word_in_example(word, s) {
    let word_arr = word.split(" ");
    let re = new RegExp("\\b" + word + "\\b", "i");
    if (s.search(re) == -1) {
        re = new RegExp("\\b" + word + "[a-z]+\\b", "i");
    }
    if ((s.search(re) == -1) && (word[word.length - 1] == "y")) {
        re = new RegExp("\\b" + word.slice(0, word.length - 1) + "ied\\b", "i");
    }
    if (s.search(re) != -1) {
        word = s.match(re)[0];
        s = s.replace(re, "______");
    } else {
        let sw_re = search_all_words_from_words_combination(word_arr, s);
        let s_words = sw_re[0];
        let re1 = sw_re[1];
        let sw1_ca = search_words_combination(word_arr, s_words);
        let s_words1 = sw1_ca[0];
        let corr_ans = sw1_ca[1];
        word = corr_ans;
        if (corr_ans == "") {
            return [word, s];
        }
        s = replace_word_combination_with_underscore(s_words1, s, re1);
    }
    word = give_word_required_case(word_arr, word);
    return [word, s];
}

function choose_and_fill_tasks() {
    let ir = get_random(words.length - 1);
    if (task1 == "choose") {
        if (lang1 == "eng") {
            write_exercise(words[ir].word);
        } else {
            write_exercise(words[ir].translation);
        }
    } else {
        let word = words[ir].word.trim();
        let s = words[ir].examples[0].eng;
        let sw = search_word_in_example(word, s);
        word = sw[0];
        s = sw[1];
        write_exercise(s);
    }
    let pr_ai = make_answers_ind(ir);
    let pos_right = pr_ai[0];
    let answers_ind = pr_ai[1];
    let answers = make_answers(answers_ind);
    write_answers(answers);
    switch_off_radio_button();
    check_answer_on_click(pos_right, answers);
}

let url1 = new URL(document.location.href);
let task1 = url1.searchParams.get("task");
let lang1 = url1.searchParams.get("lang");
let input = document.querySelector('.form');
if ((task1 == "choose") || (task1 == "fill")) { 
    input.style.display = "none";
    choose_and_fill_tasks();
}