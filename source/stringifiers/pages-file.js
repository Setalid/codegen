const importStatement = require('./import-statement');

module.exports = (pages = [], outputPath, fileExtension) => {
  const importStatements = pages.reduce(
    (accumulator, { componentName, filePath }) =>
      accumulator + importStatement(componentName, outputPath, filePath, fileExtension),
    ''
  );

  const exportContent = pages.map(
    page =>
      `{
        component: ${page.componentName},
        group: '${page.group}',
        name: '${page.name}',
        path: '${page.path}'
      }`
  );

  const exportStatement = `export default [\n${exportContent.join(',\n')}];`;
  return `${importStatements}\n${exportStatement}\n`;
};
