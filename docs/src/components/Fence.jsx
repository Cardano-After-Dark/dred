import { Fragment } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'

export function Fence({ children, language }) {
  return (
    <Highlight
      {...defaultProps}
      code={children.trimEnd()}
      language={language}
      theme={undefined}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <pre className={className} style={style}>
          <div className="code-header">
            {language && <span className="code-language">{language}</span>}
          </div>
          <code>
            {tokens.map((line, lineIndex) => (
              <div key={lineIndex} className="code-line">
                <span className="line-number">{lineIndex + 1}</span>
                <span className="line-content">
                  {line
                    .filter((token) => !token.empty)
                    .map((token, tokenIndex) => (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                </span>
              </div>
            ))}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
