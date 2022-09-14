export const colors = {
  groups: {
    A: 'bg-blue-900',
    B: 'bg-gray-400',
    C: 'bg-red-400',
    D: 'bg-yellow-400',
    E: 'bg-green-900',
    F: 'bg-green-500',
    G: 'bg-blue-500',
    H: 'bg-pink-500',
    FWC: 'bg-black',
  },
}

//   return countriesvalues.map(country => {
//     return {
//       country,
//       colors: formattedData[country],
//     }
//   })

// export const arrayOfColorsToTailwindGradient = colors => {
//   const gradient = colors.map(color => {
//     return `${color.toLowerCase()}${specialColors[color.toLowerCase()] ? '' : '-800'}`
//   })

//   //   first color just return the color, n colors return the word via- and the color, and last color return the word to- and the color
//   return `bg-gradient-to-t from-${gradient[0]}${
//     gradient.length > 2
//       ? ` via-${gradient.slice(1, -1).join(' via-')} to-${gradient[gradient.length - 1]}`
//       : ''
//   }`
// }

// export const countryColors = country => {
//   const colors = formattedData[country]
//   console.log('data', getData())
//   const tailwindColors = colors?.map(color => {
//     return specialColors[color.toLowerCase()] || color.toLowerCase()
//   })
//   if (tailwindColors)
//     return `bg-${tailwindColors[0]}${
//       tailwindColors[0] === 'white' || tailwindColors[0] === 'black' ? '' : '-800'
//     }`
//   return 'bg-white'

//   //   return arrayOfColorsToTailwindGradient(tailwindColors)
//   //   return 'bg-gradient-to-t from-blue-500 to-white'
// }
