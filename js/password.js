
function generatePassword(options) {
    const similarChars = ['I', 'i', 'o', 'O', 'L', 'l', '0', '|'];
    const digits = options.digits === "2" ? '0123456789abcdefABCDEF' : '0123456789';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let special = options.specialChars || '*_-?!+#@;:';

    const unique = options.unique;

    let workRange = '';
    if (options.lower_case) workRange += lower;
    if (options.upper_case) workRange += upper;
    if (options.digits !== "0") workRange += digits;
    if (options.special) workRange += special;

    workRange = [...new Set(workRange)].filter(c => !similarChars.includes(c)).join('');

    if (workRange.length === 0) return '<< select options and submit';

    let password = '';
    while (password.length < options.length) {
        const char = workRange[Math.floor(Math.random() * workRange.length)];
        if (!unique || !password.includes(char)) {
            password += char;
        }
    }
    return password;
}

document.getElementById("passwordForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const options = {
        length: parseInt(document.getElementById("length").value),
        specialChars: document.getElementById("specialChars").value,
        lower_case: document.getElementById("lower_case").checked,
        upper_case: document.getElementById("upper_case").checked,
        digits: document.getElementById("digits").value,
        special: document.getElementById("special").checked,
        unique: document.getElementById("unique").checked,
    };
    const password = generatePassword(options);
    document.getElementById("passwordField").textContent = password;
});

document.getElementById('copyBtn').addEventListener('click', function () {
    const password = document.getElementById('passwordField').innerText;
    navigator.clipboard.writeText(password).then(() => {
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.innerText = 'Copied';
        setTimeout(() => { copyBtn.innerText = 'Copy'; }, 3000);
    });
});
