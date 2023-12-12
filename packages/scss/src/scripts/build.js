const fs = require('fs');
const path = require('path');
const sass = require('sass');

/**
 * compile scss file to css
 * @param {string} src source file
 * @param {string} output output file 
 */
const compile = (src, output)=>{
  const result =  sass.compile(path.resolve(src), {
        style: 'expanded',
        verbose: true,
    
    })

    fs.writeFileSync(path.resolve(output), result.css)
}

// compile global scss file
compile('src/global.scss', 'dist/global.css');


/**
 *  get all components from src atoms, molecules and organisms
 * @param {string} dir 
 * @returns Object[] return an array of objects with src and output properties
 */
const getComponents = (dir)=>{
  let allComponents =[];

  const types = ['atoms', 'molecules', 'organisms'];

  types.forEach(type=>{
    const allFiles = fs.readdirSync(`src/${type}`).map(file=>(
      {
        src: `src/${type}/${file}`,
        output: `dist/${file.slice(0, -4)}.css`
      }
    ))

    allComponents = [...allComponents, ...allFiles];
  });

  return allComponents;

}

// compile all components
getComponents().forEach(component=>{
  compile(component.src, component.output);
})
