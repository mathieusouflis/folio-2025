import { Project } from '@/payload-types'
import { ProjectHeaderSection } from './sections/header-section'
import { ProjectDescriptionSection } from './sections/description-section'
import { ProjectCollaboratorsSection } from './sections/collaborators'

export function ProjectPage(params: { project: Project }) {
  return (
    <>
      <ProjectHeaderSection title={params.project.title} showreel={params.project.cover} />
      <ProjectDescriptionSection project={params.project} />
      {params.project.collaborators &&
        Array.isArray(params.project.collaborators) &&
        params.project.collaborators.length > 0 && (
          <ProjectCollaboratorsSection collaborators={params.project.collaborators} />
        )}
    </>
  )
}
