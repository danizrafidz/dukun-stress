/**
 * JS Basic:
 * Primitive Data Type, Conditional (if & switch), Loop, Modular Functions, Array of Object
 * 
 * DOM:
 * .getElementById(), .getElementsByClassName(), .getElementsByName()
 * .createElement()
 * .setAttribute()
 * .remove()
 * .append()
 * .reset()
 * .alert()
 * .innerText
 * window.location.href
 * 
 * localStorage (.getItem & .setItem)
 * 
 */

// READ elements, 
const textPertanyaan = document.getElementById("txt-pertanyaan")
const form = document.getElementById("form-rad")
const rad = document.getElementsByName("rad")
const buttons = document.getElementsByClassName("buttons")[0]
const textInfo = document.getElementById("text-info")
const prevBtn = document.getElementById("btn-prev")

// READ hasil dari localStorage
const namaUser = localStorage.getItem('namaUser');

// UPDATE hasil di <p> element dengan id 'nama-user'
document.getElementById('nama-user').innerText = `Halo ${namaUser}!` || 'Gagal';

// DATABASE berupa Array of Object yang akan menyimpan semua data pertanyaan dan score
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

let feedbacks = {
    'normal': [
        'Selamat! Anda berada dalam kondisi mental yang normal. Tetap jaga kesehatan mental dengan rutin berolahraga, makan makanan bergizi, dan tidur cukup. Jangan lupa untuk meluangkan waktu untuk bersantai.',
        'Anda berada dalam kondisi baik. Pastikan untuk tetap menjaga keseimbangan antara pekerjaan dan kehidupan pribadi agar kondisi ini dapat dipertahankan.',
        'Kondisi mental Anda stabil. Terus lakukan aktivitas yang membuat Anda bahagia dan menjaga suasana hati tetap positif.'
    ],
    'stress ringan': [
        'Anda mengalami stres ringan. Cobalah teknik relaksasi seperti meditasi atau pernapasan dalam untuk membantu mengurangi tekanan yang dirasakan.',
        'Walaupun stres Anda masih tergolong ringan, penting untuk mengidentifikasi penyebabnya. Usahakan untuk berbicara dengan orang terdekat atau teman terpercaya untuk berbagi perasaan Anda.',
        'Luangkan waktu untuk diri sendiri. Aktivitas seperti mendengarkan musik, membaca buku, atau berjalan santai dapat membantu mengurangi stres ringan ini.'
    ],
    'stress sedang': [
        'Anda menunjukkan tanda-tanda stres sedang. Pertimbangkan untuk mengurangi beban kerja atau mengambil waktu untuk liburan singkat agar dapat merasa lebih rileks.',
        'Stres Anda membutuhkan perhatian lebih. Cobalah untuk membuat jadwal harian yang lebih teratur dan prioritaskan kegiatan yang mendukung kesejahteraan mental Anda.',
        'Diskusikan situasi Anda dengan teman, keluarga, atau konselor profesional jika memungkinkan. Hal ini dapat membantu meringankan beban pikiran yang sedang Anda rasakan.'
    ],
    'stress cukup berat': [
        'Anda mengalami stres yang cukup berat. Sangat disarankan untuk mulai mempraktikkan gaya hidup sehat seperti tidur yang cukup, menghindari kafein berlebihan, dan berolahraga ringan.',
        'Pertimbangkan untuk mencari bantuan profesional, seperti konselor atau psikolog, untuk mengatasi tekanan yang sedang Anda alami.',
        'Luangkan waktu untuk benar-benar beristirahat dan menjauh dari penyebab stres. Fokus pada diri Anda sendiri untuk sementara waktu agar pikiran lebih jernih.'
    ],
    'stress berat': [
        'Anda berada dalam kondisi stres berat. Jangan ragu untuk segera menghubungi tenaga profesional, seperti psikolog atau psikiater, untuk mendapatkan dukungan dan penanganan yang tepat.',
        'Cobalah untuk berbicara dengan seseorang yang Anda percayai. Dukungan dari keluarga atau teman dekat sangat penting dalam situasi seperti ini.',
        'Jangan terlalu keras pada diri sendiri. Beri tubuh dan pikiran Anda waktu untuk pulih. Jika memungkinkan, ambil cuti atau jeda dari rutinitas sehari-hari yang membebani Anda.'
    ]
}

// READ check radio button mana yang dipilih dan mengembalikan berupa value
function getCheckedValue() {
    for (let i = 0; i < rad.length; i++) {
        if (rad[i].checked === true) {
            return Number(rad[i].value)
        }
    }
    return null
}

// SAVE value score ke dalam storage berupa number
function saveToStorage() {
    let checkedValue = getCheckedValue();
    storage[s].score = checkedValue
}

function submitButton() {
    saveToStorage()

    // KALKULASI total score
    let scoreTotal = 0
    for (let i = 0; i < storage.length; i++) {
        let perNum = storage[i].score

        // JIKA ada opsi yang belum dipilih
        if (perNum === null) {
            return textInfo.innerText = 'Isi semua pertanyaan!'
        }

        // JIKA pertanyaan 4, 5, 7, 8. MAKA tukar nilai score-nya
        if (i == 3 || i == 4 || i == 6 || i == 7) {
            perNum = 4 - perNum
        }
        scoreTotal += perNum
    }

    // menentukan textResult berdasarkan total score
    let textResult = ''
    if (scoreTotal >= 21) {
        textResult = 'stress berat'
    } else if (scoreTotal >= 16) {
        textResult = 'stress cukup berat'
    } else if (scoreTotal >= 12) {
        textResult = 'stress sedang'
    } else if (scoreTotal >= 8) {
        textResult = 'stress ringan'
    } else if (scoreTotal >= 0) {
        textResult = 'normal'
    }

    let r = Math.ceil(Math.random() * 3) - 1
    stressResult = feedbacks[textResult][r]

    // UPDATE hasil di localStorage
    localStorage.setItem('stressResult', stressResult);
    localStorage.setItem('scoreTotal', scoreTotal);

    // redirect ke submit.html
    window.location.href = 'submit.html';
}

// READ dan UPDATE radio mana yang ter-CHECKED pada pertanyaan sebelum, dilihat dari index storage []
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

/** BERLAKU UNTUK prevButton() & nextButton()
 * SAVE [value] ke dalam [index] storage WITH function saveToStorage()
 * UP / DOWN [index] storage
 * READ [index] storage dan UPDATE checked radio WITH function readCheckedRadio()
 */

/** CONDITION:
 * MIN index 0
 * JIKA index 8, MAKA 
 *      DELETE tombol submit
 *      CREATE tombol next 
 */
function prevButton() {
    if (s <= 0) {
        return
    }

    if (textInfo.innerText !== '') {
        textInfo.innerText = ''
    }

    saveToStorage()

    s--
    textPertanyaan.innerText = storage[s].pertanyaan

    if (s === 8) {
        let submitBtn = document.getElementById('btn-submit')
        submitBtn.remove()

        let nextBtn = document.createElement('button')
        nextBtn.setAttribute('type', 'button')
        nextBtn.setAttribute('class', 'func-btn')
        nextBtn.setAttribute('onclick', 'nextButton()')
        nextBtn.setAttribute('id', 'btn-next')
        nextBtn.innerText = 'next'
        // PREVIEW created html: <button type="button" class="func-btn" onclick="nextButton()" id="btn-next">next</button>

        buttons.append(nextBtn)
    }

    readCheckedRadio()
}

/**CONDITION:
 * MAX index 9
 * JIKA index 9, MAKA 
 *      DELETE tombol next
 *      CREATE tombol submit 
 */
function nextButton() {
    if (s >= 9) {
        return
    }

    saveToStorage()

    s++
    textPertanyaan.innerText = storage[s].pertanyaan

    if (s === 9) {
        let nextBtn = document.getElementById("btn-next")
        nextBtn.remove()

        let submitBtn = document.createElement('button')
        submitBtn.setAttribute('type', 'button')
        submitBtn.setAttribute('class', 'func-btn')
        submitBtn.setAttribute('onclick', 'submitButton()')
        submitBtn.setAttribute('id', 'btn-submit')
        submitBtn.innerText = 'submit'
        // PREVIEW created html: <button type="button" class="func-btn" onclick="submitButton()" id="btn-submit">submit</button>

        buttons.append(submitBtn)
    }

    readCheckedRadio()
}