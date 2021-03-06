const fs = require('fs');
const path = require('path');

const frontmatter = require('./frontmatter');
const kebabToPascal = require('@creuna/utils/kebab-to-pascal').default;

function getComponentMetadata(filePath, fileExtension) {
  const folderPath = path.dirname(filePath);
  const indexFile = path.join(folderPath, 'index.js');
  const fileName = path.basename(filePath, fileExtension);
  const folderName = path.basename(folderPath);

  if (fileName === folderName) {
    const componentName =
      folderName[0] === folderName[0].toUpperCase()
        ? folderName
        : kebabToPascal(folderName);

    const componentFileContent = fs.readFileSync(filePath, {
      encoding: 'utf-8'
    });

    const { data } = frontmatter(componentFileContent);
    const url = data ? data.path || folderName : folderName;
    const name = data ? data.name || componentName : componentName;
    const group = data ? data.group || '' : '';

    return {
      componentName,
      filePath: fs.existsSync(indexFile) ? folderPath : filePath,
      group,
      name,
      path: url.startsWith('/') ? url : '/' + url
    };
  }

  return {};
}

module.exports = getComponentMetadata;
