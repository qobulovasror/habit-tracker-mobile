const colors=["#E81B2BFF","#F4891EFF", "#EACE2BFF", "#08A34FFF", "#459FE3FF","#693499FF", "#6D340CFF", "#00f"];
const randomColor = () =>{
  // const colors=["#ffc801","#000dfd", "#dcf000", "#4ffb00", "#b301ff","#00bfff", "#ff00aa"];
  return colors[Math.round(Math.random()*colors.length-1)]
}

export {randomColor, colors}