// scopeCssSyncSimple.js
function scopeCssSync(css, blockClass, globalSelectors = ['html', 'body', ':root']) {
  const lines = css.split('\n');
  const result = [];
  let selectorBuffer = [];
  let insideRule = false;

  function isGlobal(sel) {
    return globalSelectors.some(g => sel.trim().startsWith(g));
  }

  function processSelectorLine(line) {
    // split by commas outside brackets
    const selectors = line.split(/,(?![^\[\]]*\])/).map(s => s.trim());
    return selectors.map(sel => {
      if (!isGlobal(sel) && sel.length > 0 && !sel.startsWith(`.${blockClass}`)) {
        return `.${blockClass} ${sel}`;
      }
      return sel;
    }).join(', ');
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!insideRule && line.endsWith('{')) {
      // combine buffered selectors
      selectorBuffer.push(line.replace('{', '').trim());
      const fullSelector = selectorBuffer.join(' ');
      const scopedSelector = processSelectorLine(fullSelector);
      result.push(`${scopedSelector} {`);
      selectorBuffer = [];
      insideRule = true;
    } else if (insideRule && line === '}') {
      result.push('}');
      insideRule = false;
    } else if (!insideRule && line.length > 0) {
      // buffer selector lines (multi-line selectors)
      selectorBuffer.push(line);
    } else {
      // property lines or empty lines
      result.push(rawLine);
    }
  }

  return result.join('\n');
}

export default scopeCssSync;