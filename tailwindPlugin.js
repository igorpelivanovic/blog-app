import plugin from "tailwindcss/plugin";

const defaultBorderStyle = {
  borderWidth: "0px",
  borderStyle: "solid",
  borderImageSlice: "fill 1",
}


const defaultStylePseudoElement = {
  ...defaultBorderStyle,
    content: '""',
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    transition: ".5s",
}


const pluginBorderImage = plugin(function({ addUtilities, theme}){
    addUtilities({
      '.border-image-fill-gradient-before': { 
        '&::before': {
            ...defaultStylePseudoElement,
            borderImageSource: `linear-gradient(0deg,  rgba(37,0,255,0) 31%, rgba(46,0,255,0) 100%)`,
        }
      },
      '.border-image-fill-gradient-before-hover': { 
        '&::before': {
            ...defaultStylePseudoElement,
            borderImageSource: `linear-gradient(0deg, ${theme('colors.stone.400')}, ${theme('colors.secondary-transparent-20')} 33%, rgba(37,0,255,0) 52%, rgba(46,0,255,0) 100%)`,
        }
      },
      '.border-image-fill-gradient': {
        ...defaultBorderStyle,
        borderImageSource: "linear-gradient(0deg, white 0%,white 15%, transparent 50%)",
      }
    })
  })


  export { pluginBorderImage }