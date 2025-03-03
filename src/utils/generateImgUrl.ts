export type ImgDimension = Record<'width' | 'height', number>

const dimenstionDefault: ImgDimension = {
    width: 200,
    height: 200
}

type GenerateImgUrlFn = (id: number, dimension?: ImgDimension)=>string

const generatePostImgUrlFromID: GenerateImgUrlFn = ( id, dimension = dimenstionDefault) => {
    return `${import.meta.env.VITE_POST_IMG_URL}/${id}/${dimension.width}/${dimension.height}`
}


export { generatePostImgUrlFromID }