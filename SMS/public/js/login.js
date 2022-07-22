const login = async (collegeId, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '127.0.0.1:3001/api/v1/students/login',
            data: {
                collegeId,
                password
            }
        })
        if (res.data.status === 'success') {
            location.assign('/home')
        }
    } catch (err) {
        console.log(err)
    }
}

document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const collegeId = document.getElementById('logemail').value;
    const password = document.getElementById('logpass').value;

    login(collegeId, password);
})