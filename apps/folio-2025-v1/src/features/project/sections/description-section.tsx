import { SectionFullPage } from '@/components/base/section-full-page'
import { TH2 } from '@/components/typograpgy/h2'
import { TP } from '@/components/typograpgy/p'
import { isDate } from '@/lib/utils/is-date'
import { firstLetterUppercase } from '@/lib/utils/text/first-letter-uppercase'
import { Project } from '@/payload-types'
import { CATEGORIES } from '../constants'

export function ProjectDescriptionSection(params: { project: Project }) {
  return (
    <SectionFullPage className="flex-col justify-between py-[100px]">
      <div className="flex flex-col gap-10  w-7/12">
        <TH2>{params.project.subtitle}</TH2>
        <TP className="text-base">{params.project.description}</TP>
      </div>
      <div className="flex flex-col gap-4">
        {CATEGORIES.map((category, index) => {
          let itemsInCategory: React.ReactNode[] = []
          const categoryValue = params.project[category]

          if (Array.isArray(categoryValue)) {
            itemsInCategory = categoryValue.map((item, index) => {
              if (typeof item !== 'number') {
                return (
                  <TP key={item.id}>
                    {item.name}
                    {index + 1 === categoryValue.length ? '' : ','}
                  </TP>
                )
              }
              return null
            })
          } else if (typeof categoryValue === 'string') {
            itemsInCategory = categoryValue
              ? [
                  <TP key={`${index}-${category}`}>
                    {isDate(categoryValue) ? new Date(categoryValue).getFullYear() : categoryValue}
                  </TP>,
                ]
              : []
          }

          return (
            <div key={index} className="flex flex-row gap-2">
              <TP className="font-semibold w-1/12">{firstLetterUppercase(category)}</TP>
              {itemsInCategory}
            </div>
          )
        })}
      </div>
    </SectionFullPage>
  )
}
