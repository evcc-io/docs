import React from 'react'
import CodeBlock from '@theme/CodeBlock';

export default ({file}) => {
  try {
    const code = require(`js-yaml-loader!./configs/${file}.yaml`)
    return <CodeBlock title={code.name} className="language-yaml">{code.sample}</CodeBlock>
  } catch (e) {
    console.warn(e);
    return <p className="admonition admonition-danger alert alert--danger">Config file <code>./configs/{file}.yaml</code> not found</p>
  }
}