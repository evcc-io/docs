import React, {type ReactNode} from 'react';
import type {Props} from '@theme/CodeBlock/Line/Token';

// Pass-through components that users can swizzle and customize
export default function CodeBlockLineToken({
  line,
  token,
  ...props
}: Props): ReactNode {
  return <span {...props} />;
}
