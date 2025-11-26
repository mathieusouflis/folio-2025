import { PayloadImage } from '@/components/base/payload-image'
import { RichText } from '@/components/base/rich-text'
import { SectionGridFullPage } from '@/components/base/section-full-page'
import { cn } from '@/lib/utils/cn'
import { Project } from '@/payload-types'
import Image from 'next/image'

export function ProjectContentSection({ contents }: { contents: Project['projectContents'] }) {
  return (
    <SectionGridFullPage className="h-fit">
      {contents &&
        contents.map((content, index) => {
          return <ProjectContentArticle key={index} content={content} />
        })}
    </SectionGridFullPage>
  )
}

function ProjectContentArticle({
  content,
}: {
  content: NonNullable<Project['projectContents']>[number]
}) {
  return (
    <article className="flex flex-col gap-14 py-32">
      {content.imageGroups && content.imageGroups.length > 0 && (
        <div className="flex flex-col gap-0">
          {content.imageGroups.map((imageGroup, idx) => (
            <div
              key={idx}
              className={cn(
                'flex',
                imageGroup.display === 'columns'
                  ? 'flex-row'
                  : imageGroup.display === 'rows'
                    ? 'flex-col'
                    : 'flex-row flex-wrap',
              )}
            >
              {imageGroup.images.map((image, index) => {
                if (typeof image.image !== 'number') {
                  const ratioX = parseInt(image.ratio.split('-')[0] ?? '1')
                  const ratioY = parseInt(image.ratio.split('-')[1] ?? '1')
                  const defaultSize = 3000
                  const width = defaultSize * ratioX
                  const height = (defaultSize / ratioX) * ratioY

                  const ratioStyles: {
                    [key in typeof image.ratio]: string
                  } = {
                    '16-10': 'aspect-16/10',
                    '16-9': 'aspect-16/9',
                    '21-9': 'aspect-21/9',
                    '4-3': 'aspect-4/3',
                    '5-1': 'aspect-5/1',
                  }

                  return (
                    <div
                      key={index}
                      className={cn(
                        imageGroup.display === 'columns' && 'flex-1',
                        imageGroup.display === 'rows' && 'flex-1',
                        imageGroup.display === 'grid' && 'w-1/2',
                        imageGroup.display === 'grid' &&
                          imageGroup.images.length === 3 &&
                          index === 2 &&
                          'w-full',
                      )}
                    >
                      <PayloadImage
                        src={image.image.url ?? ''}
                        alt={image.image.alt}
                        width={width}
                        height={height}
                        className={cn('object-cover w-full aspect-1/3', ratioStyles[image.ratio])}
                      />
                    </div>
                  )
                }
              })}
            </div>
          ))}
        </div>
      )}
      {content.description && (
        <RichText className="text-[16px]" lexicalData={content.description} />
      )}
    </article>
  )
}
