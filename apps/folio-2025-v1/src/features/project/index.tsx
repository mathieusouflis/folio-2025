import { Project } from '@/payload-types'
import { ProjectHeaderSection } from './sections/header-section'
import { ProjectDescriptionSection } from './sections/description-section'
import { ProjectContentSection } from './sections/project-content'
import { ProjectCollaboratorsSection } from './sections/collaborators'
import { ProjectNavigationSection } from './sections/navigation-section'

export function ProjectPage(params: {
  project: Project
  previousProject: Project | null
  nextProject: Project | null
}) {
  return (
    <>
      <ProjectHeaderSection title={params.project.title} showreel={params.project.cover} />
      <ProjectDescriptionSection project={params.project} />
      <ProjectContentSection contents={params.project.projectContents} />

      {params.project.collaborators &&
        Array.isArray(params.project.collaborators) &&
        params.project.collaborators.length > 0 && (
          <ProjectCollaboratorsSection collaborators={params.project.collaborators} />
        )}

      <ProjectNavigationSection
        previousProject={params.previousProject}
        nextProject={params.nextProject}
      />
    </>
  )
}
