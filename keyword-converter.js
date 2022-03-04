const obj = require('./keywords.json')

for (let i=0; i<obj.keywords.length; i++){
  console.log(obj.keywords[i])
}

// Desired Output:
// {
//   'react': ['reactjs', 'react.js'],
//   'reactjs': ['react', 'react.js'],
//   'react.js': ['react', 'reactjs'],
//   'vue': ['vue.js', 'vuejs'],
//   'vue.js': ['vue', 'vuejs'],
//   'vuejs': ['vue', 'vue.js']
//   ...
// }