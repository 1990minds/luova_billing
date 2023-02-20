const limitDesc = (str, size=140) =>{

    return str.slice(0, size)+`....`;
}

export default limitDesc