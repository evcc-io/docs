import type {ReactNode} from 'react';

import type {Props} from '@theme/CodeBlock/Title';

// Just a pass-through component that users can swizzle and customize
export default function CodeBlockTitle({children}: Props): ReactNode {
  return children;
}
