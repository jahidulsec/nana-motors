
export const wait = async(time=1000) => {
    await new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}