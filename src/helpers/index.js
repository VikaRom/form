export const uploadFile = (file) => {
    return new Promise((res, rej) => {
        const fR = new FileReader();

        fR.onload = () => {
            res(fR.result)
        }
        fR.error = (err) => {
            rej(err)
        }

        fR.readAsDataURL(file)
    })
}
