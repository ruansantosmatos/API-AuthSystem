export const OTP = (limit: number): string => {
    let OTP: string = ''
    let index: number = 0
    
    const converter: number = 10
    const digits: string = '0123456789'

    for (index; index < limit; index++) { OTP += digits[Math.floor(Math.random() * converter)] }
    return OTP
}