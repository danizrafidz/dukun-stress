const textPertanyaan = document.getElementById("txt-pertanyaan")
const form = document.getElementById("form-rad")
const rad = document.getElementsByName("rad")
const buttons = document.getElementsByClassName("buttons")[0]
const submitOutput = document.getElementById("submit-output")

// READ hasil dari localStorage
const namaUser = localStorage.getItem('namaUser');
    
// UPDATE hasil di <p> element dengan id 'nama-user'
document.getElementById('nama-user').innerText = `Halo ${namaUser}!`|| 'Gagal';

let s = 0 // index untuk STORAGE
let storage = [
    {
        pertanyaan: '1. Seberapa sering Anda merasa kesal karena terjadi sesuatu yang tidak Anda harapkan?',
        score: null
    },
    {
        pertanyaan: '2. Seberapa sering Anda merasa bahwa Anda tidak dapat mengontrol hal-hal penting dalam hidup Anda?',
        score: null
    },
    {
        pertanyaan: '3. Seberapa sering Anda merasa grogi dan tertekan?',
        score: null
    },
    {
        pertanyaan: '4. Seberapa sering Anda merasa yakin dengan kemampuan Anda untuk menghadapi masalah personal Anda?',
        score: null
    },
    {
        pertanyaan: '5. Seberapa sering Anda merasa hal-hal terjadi sesuai rencana Anda?',
        score: null
    },
    {
        pertanyaan: '6. Seberapa sering Anda merasa bahwa Anda tidak dapat mengatasi hal-hal yang harus Anda lakukan?',
        score: null
    },
    {
        pertanyaan: '7. Seberapa sering Anda dapat mengatasi gangguan yang terjadi dalam hidup Anda ?',
        score: null
    },
    {
        pertanyaan: '8. Seberapa sering Anda merasa bahwa Anda dapat mengontrol segala hal dengan sangat baik?',
        score: null
    },
    {
        pertanyaan: '9. Seberapa sering Anda merasa marah karena hal-hal yang terjadi di luar kontrol Anda?',
        score: null
    },
    {
        pertanyaan: '10.Seberapa sering Anda merasa berada dalam kesultan yang berat sehingga Anda tidak dapat mengatasinya?',
        score: null
    },
]

// READ check radio button mana yang dipilih dan mengembalikan berupa value
function getCheckedValue() {
    for (let i = 0; i < rad.length; i++) {
        if (rad[i].checked === true) {
            return Number(rad[i].value)
        }
    }
    return null
}

// SAVE ke dalam storage berupa array of object
function saveToStorage() {
    let checkedValue = getCheckedValue();
    storage[s].score = checkedValue
}

function submitButton() {
    saveToStorage()

    let scoreTotal = 0
    for (let i = 0; i < storage.length; i++) {
        let perNum = storage[i].score
        
        if (perNum === null) {
            return submitOutput.innerText = 'Isi semua pertanyaan!'
        }

        if (i == 3 || i == 4 || i == 6 || i == 7) {
            perNum = 4 - perNum
        }
        
        scoreTotal += perNum
    }

    let textResult = ''
    if (scoreTotal >= 21) {
        textResult = 'Anda mengalami stress berat'
    } else if (scoreTotal >= 16) {
        textResult = 'Anda mengalami stress cukup berat'
    } else if (scoreTotal >= 12) {
        textResult = 'Anda mengalami stress sedang'
    } else if (scoreTotal >= 8) {
        textResult = 'Anda mengalami stress ringan'
    } else if (scoreTotal >= 0) {
        textResult = 'Anda normal'
    }

    // // Simpan hasil di localStorage
    localStorage.setItem('stressResult', textResult);

    // Redirect ke submit.html
    window.location.href = 'submit.html';
}

// READ radio mana yang ter-CHECKED pada pertanyaan sebelum, dilihat dari index storage []
function readCheckedRadio() {
    switch (storage[s].score) {
        case 0:
            rad[0].checked = true;
            break;
        case 1:
            rad[1].checked = true;
            break;
        case 2:
            rad[2].checked = true;
            break;
        case 3:
            rad[3].checked = true;
            break;
        case 4:
            rad[4].checked = true;
            break;
        default:
            form.reset()
            break;
    }
}

function prevButton() {
    if (s <= 0) {
        return
    }

    if (submitOutput.innerText !== '') {
        submitOutput.innerText = ''
    }

    let prevBtn = document.getElementById("btn-prev")

    saveToStorage()
    console.log(storage);
    s--
    textPertanyaan.innerText = storage[s].pertanyaan

    // JIKA kembali ke pertanyaan 9
    if (s === 8) {
        // DELETE tombol submit
        let submitBtn = document.getElementById('btn-submit')
        submitBtn.remove()

        // CREATE tombol next
        let nextBtn = document.createElement('button')
        nextBtn.setAttribute('type', 'button')
        nextBtn.setAttribute('class', 'func-btn')
        nextBtn.setAttribute('onclick', 'nextButton()')
        nextBtn.setAttribute('id', 'btn-next')
        nextBtn.innerText = 'next'
        // PREVIEW created html: <button type="button" onclick="nextButton()" id="btn-next">next</button>

        buttons.append(nextBtn)
    }

    readCheckedRadio()
}

function nextButton() {
    if (s >= 9) {
        return
    }

    saveToStorage()
    console.log(storage);
    s++
    textPertanyaan.innerText = storage[s].pertanyaan

    // JIKA menuju ke pertanyaan 10
    if (s === 9) {
        // DELETE tombol next
        let nextBtn = document.getElementById("btn-next")
        nextBtn.remove()

        // CREATE tombol submit
        let submitBtn = document.createElement('button')
        submitBtn.setAttribute('type', 'button')
        submitBtn.setAttribute('class', 'func-btn')
        submitBtn.setAttribute('onclick', 'submitButton()')
        submitBtn.setAttribute('id', 'btn-submit')
        submitBtn.innerText = 'submit'
        // PREVIEW created html: <button type="button" onclick="submitButton()" id="btn-submit">submit</button>

        buttons.append(submitBtn)
    }

    readCheckedRadio()
}