import { SectionGridFullPage } from '@/components/base/section-full-page'
import { Project } from '@/payload-types'
import { CollaboratorCard } from './collaborator-card-old'

export function ProjectCollaboratorsSectionOld(props: {
  collaborators: Project['collaborators'] | null | undefined
}) {
  return (
    <SectionGridFullPage className="py-24 gap-3 justify-center">
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
    </SectionGridFullPage>
  )
}
