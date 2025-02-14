const currencies = {
    sum: 'Сум',
    dollar: '$',
}

export function currency(name) {
    return currencies[name] || name
}
