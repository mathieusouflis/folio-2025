import { SectionGridFullPage } from '@/components/base/section-full-page'
import { Project } from '@/payload-types'
import { CollaboratorCard } from './collaborator-card'
import { TH2 } from '@/components/typograpgy/h2'

export function ProjectCollaboratorsSection(props: {
  collaborators: Project['collaborators'] | null | undefined
}) {
  return (
    <SectionGridFullPage className="py-24 gap-3 flex-col justify-center items-center gap-24">
      <TH2 className="text-2xl uppercase">Crédits</TH2>
      <div className="gap-2 flex flex-col">
        {props.collaborators &&
          props.collaborators.map((item) => {
            if (
              !item ||
              typeof item === 'number' ||
              !item.collaborator ||
              typeof item.collaborator === 'number'
            ) {
              return
            }
            const collaborator = item.collaborator

            return (
              <CollaboratorCard
                key={item.id}
                collaborator={collaborator}
                id={item.id ?? String(collaborator.id)}
                roles={item.roles ?? []}
              />
            )
          })}
      </div>
    </SectionGridFullPage>
  )
}
