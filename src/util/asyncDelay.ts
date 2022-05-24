export async function asyncDelay(wait: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, wait);
    });
}
