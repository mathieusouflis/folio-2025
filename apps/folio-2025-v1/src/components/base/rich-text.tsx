import type { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

import {
  JSXConvertersFunction,
  RichText as RichTextConverter,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'
import { TP } from '../typograpgy/p'
import { TH1 } from '../typograpgy/h1'
import { TH2 } from '../typograpgy/h2'
import { TH3 } from '../typograpgy/h3'
import { TH4 } from '../typograpgy/h4'
import { TList, TListItem } from '../typograpgy/list'
import { TBlockquote } from '../typograpgy/blockquote'

const jsxConverters =
  (className?: string): JSXConvertersFunction<DefaultNodeTypes> =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    paragraph: ({ nodesToJSX, node, ...args }) => (
      <TP className={className}>{nodesToJSX({ nodes: node.children, ...args })}</TP>
    ),
    heading: ({ nodesToJSX, node, ...args }) =>
      node.tag === 'h1' ? (
        <TH1 className={className}>{nodesToJSX({ nodes: node.children, ...args })}</TH1>
      ) : node.tag === 'h2' ? (
        <TH2 className={className}>{nodesToJSX({ nodes: node.children, ...args })}</TH2>
      ) : node.tag === 'h3' ? (
        <TH3 className={className}>{nodesToJSX({ nodes: node.children, ...args })}</TH3>
      ) : node.tag === 'h4' ? (
        <TH4 className={className}>{nodesToJSX({ nodes: node.children, ...args })}</TH4>
      ) : null,
    list: ({ nodesToJSX, node, ...args }) => (
      <TList className={className}>{nodesToJSX({ nodes: node.children, ...args })}</TList>
    ),
    listitem: ({ nodesToJSX, node, ...args }) => (
      <TListItem className={className}>{nodesToJSX({ nodes: node.children, ...args })}</TListItem>
    ),
    quote: ({ nodesToJSX, node, ...args }) => (
      <TBlockquote className={className}>
        {nodesToJSX({ nodes: node.children, ...args })}
      </TBlockquote>
    ),
  })

export const RichText: React.FC<{
  lexicalData: SerializedEditorState<SerializedLexicalNode>
  className?: string
}> = ({ lexicalData, className }) => {
  return <RichTextConverter converters={jsxConverters(className)} data={lexicalData} />
}
