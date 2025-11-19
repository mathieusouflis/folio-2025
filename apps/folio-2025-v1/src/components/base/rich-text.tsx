import type { DefaultNodeTypes, SerializedLinkNode } from '@payloadcms/richtext-lexical'
import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from '@payloadcms/richtext-lexical/lexical'

import {
  JSXConvertersFunction,
  LinkJSXConverter,
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

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug

  switch (relationTo) {
    case 'posts':
      return `/posts/${slug}`
    case 'categories':
      return `/category/${slug}`
    case 'pages':
      return `/${slug}`
    default:
      return `/${relationTo}/${slug}`
  }
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  paragraph: ({ nodesToJSX, node, ...args }) => (
    <TP>{nodesToJSX({ nodes: node.children, ...args })}</TP>
  ),
  heading: ({ nodesToJSX, node, ...args }) =>
    node.tag === 'h1' ? (
      <TH1>{nodesToJSX({ nodes: node.children, ...args })}</TH1>
    ) : node.tag === 'h2' ? (
      <TH2>{nodesToJSX({ nodes: node.children, ...args })}</TH2>
    ) : node.tag === 'h3' ? (
      <TH3>{nodesToJSX({ nodes: node.children, ...args })}</TH3>
    ) : node.tag === 'h4' ? (
      <TH4>{nodesToJSX({ nodes: node.children, ...args })}</TH4>
    ) : null,
  list: ({ nodesToJSX, node, ...args }) => (
    <TList>{nodesToJSX({ nodes: node.children, ...args })}</TList>
  ),
  listitem: ({ nodesToJSX, node, ...args }) => (
    <TListItem>{nodesToJSX({ nodes: node.children, ...args })}</TListItem>
  ),
  quote: ({ nodesToJSX, node, ...args }) => (
    <TBlockquote>{nodesToJSX({ nodes: node.children, ...args })}</TBlockquote>
  ),
  ...LinkJSXConverter({ internalDocToHref }),
})

export const RichText: React.FC<{
  lexicalData: SerializedEditorState<SerializedLexicalNode>
}> = ({ lexicalData }) => {
  return <RichTextConverter converters={jsxConverters} data={lexicalData} />
}
