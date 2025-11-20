import { SectionGridFullPage } from '@/components/base/section-full-page'
import { TH2 } from '@/components/typograpgy/h2'
import { TP } from '@/components/typograpgy/p'
import { isDate } from '@/lib/utils/is-date'
import { Project } from '@/payload-types'
import { CATEGORIES } from '../constants'
import { LaunchButton } from '../components/launch'

export function ProjectDescriptionSection(params: { project: Project }) {
  return (
    <SectionGridFullPage className="flex-col justify-between py-[100px]">
      <div className="flex flex-col gap-10  w-7/12">
        <TH2>{params.project.subtitle}</TH2>
        <TP className="text-base">{params.project.description}</TP>
      </div>
      <div className="flex flex-row justify-between items-end">
        <div className="flex flex-col gap-4 w-full">
          {CATEGORIES.map((category, index) => {
            let itemsInCategory: React.ReactNode[] = []
            const categoryValue = params.project[category.key]

            if (Array.isArray(categoryValue)) {
              itemsInCategory = categoryValue.map((item, index) => {
                if (typeof item !== 'number') {
                  return (
                    <TP key={item.id}>
                      {'name' in item ? item.name : item.id}
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
                      {isDate(categoryValue)
                        ? new Date(categoryValue).getFullYear()
                        : categoryValue}
                    </TP>,
                  ]
                : []
            }

            return (
              <div key={index} className="flex flex-row gap-2">
                <TP className="font-semibold text-muted w-1/12">{category.displayName}</TP>
                {itemsInCategory}
              </div>
            )
          })}
        </div>
        {params.project.projectUrl && <LaunchButton url={params.project.projectUrl} />}
      </div>
    </SectionGridFullPage>
  )
}
