let s = 0
let storage = []
// TEST: [1, 2, 1, 3, 4, 0, 2, 1, 2, 3]
let halaman = document.getElementById("hal")

let form = document.getElementById("form-rad")
let rad = document.getElementsByName("rad")
let submitOutput = document.getElementById("submit-output")

let pertanyaanForms = [
    '1. Seberapa sering Anda merasa kesal karena terjadi sesuatu yang tidak Anda harapkan?',
    '2. Seberapa sering Anda merasa bahwa Anda tidak dapat mengontrol hal-hal penting dalam hidup Anda?',
    '3. Seberapa sering Anda merasa grogi dan tertekan?',
    '4. Seberapa sering Anda merasa yakin dengan kemampuan Anda untuk menghadapi masalah personal Anda?',
    '5. Seberapa sering Anda merasa hal-hal terjadi sesuai rencana Anda?',
    '6. Seberapa sering Anda merasa bahwa Anda tidak dapat mengatasi hal-hal yang harus Anda lakukan?',
    '7. Seberapa sering Anda dapat mengatasi gangguan yang terjadi dalam hidup Anda ?',
    '8. Seberapa sering Anda merasa bahwa Anda dapat mengontrol segala hal dengan sangat baik?',
    '9. Seberapa sering Anda merasa marah karena hal-hal yang terjadi di luar kontrol Anda?',
    '10.Seberapa sering Anda merasa berada dalam kesultan yang berat sehingga Anda tidak dapat mengatasinya?'
]

function getCheckedValue() {
    for (let i = 0; i < rad.length; i++) {
        if (rad[i].checked === true) {
            return Number(rad[i].value)
        }
    }
    return null
}

function saveToStorage() {
    let checkedValue = getCheckedValue();
    storage[s] = checkedValue
}

function submitButton() {
    saveToStorage()

    let scoreTotal = 0
    for (let i = 0; i < storage.length; i++) {
        let perNum = storage[i];
        scoreTotal += perNum

        if (perNum === null) {
            return submitOutput.innerText = 'Isi semua pertanyaan!'
        }
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

    submitOutput.innerText = textResult

    console.log('Total score stress anda: ' + scoreTotal);
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
    halaman.innerText = pertanyaanForms[s]

    // JIKA kembali ke pertanyaan 9
    if (s === 8) {
        // DELETE tombol submit
        let submitBtn = document.getElementById('btn-submit')
        submitBtn.remove()

        // CREATE tombol next
        let nextBtn = document.createElement('button')
        nextBtn.setAttribute('type', 'button')
        nextBtn.setAttribute('onclick', 'nextButton()')
        nextBtn.setAttribute('id', 'btn-next')
        nextBtn.innerText = 'next'
        // PREVIEW created html: <button type="button" onclick="nextButton()" id="btn-next">next</button>

        form.append(nextBtn)
    }

    readCheckedRadio()
}

// READ radio mana yang ter-CHECKED pada pertanyaan sebelum, dilihat dari index storage []
function readCheckedRadio() {
    switch (storage[s]) {
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

function nextButton() {
    if (s >= 9) {
        return
    }

    saveToStorage()
    console.log(storage);
    s++
    halaman.innerText = pertanyaanForms[s]

    // JIKA menuju ke pertanyaan 10
    if (s === 9) {
        // DELETE tombol next
        let nextBtn = document.getElementById("btn-next")
        nextBtn.remove()

        // CREATE tombol submit
        let submitBtn = document.createElement('button')
        submitBtn.setAttribute('type', 'button')
        submitBtn.setAttribute('onclick', 'submitButton()')
        submitBtn.setAttribute('id', 'btn-submit')
        submitBtn.innerText = 'submit'
        // PREVIEW created html: <button type="button" onclick="submitButton()" id="btn-submit">submit</button>

        form.append(submitBtn)
    }

    readCheckedRadio()
}