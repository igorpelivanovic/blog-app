import plugin from "tailwindcss/plugin";

const defaultStyle = {
    content: '""',
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    borderWidth: "0px",
    borderStyle: "solid",
    borderImageSlice: "fill 1",
    transition: ".5s"
}

const pluginBorderImage = plugin(function({ addUtilities}){
    addUtilities({
      '.border-image-fill-gradient': { 
        '&::before': {
            ...defaultStyle,
            borderImageSource: "linear-gradient(0deg, rgba(12,0,255,1) 0%, rgba(21,0,255,0.3337710084033614) 0%, rgba(37,0,255,0) 31%, rgba(46,0,255,0) 100%)",
        }
      },
      '.border-image-fill-gradient-hover': { 
        '&::before': {
            ...defaultStyle,
            borderImageSource: "linear-gradient(0deg, rgba(12,0,255,1) 0%, rgba(21,0,255,0.3337710084033614) 33%, rgba(37,0,255,0) 52%, rgba(46,0,255,0) 100%)",
        }
      } 
    })
  })


  export { pluginBorderImage }