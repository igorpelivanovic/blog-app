const formatNumber = (val: number): string =>{
    return new Intl.NumberFormat().format(val)
}

export { formatNumber }