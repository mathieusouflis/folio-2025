import { Project } from '@/payload-types'
import { ProjectHeaderSection } from './sections/header-section'
import { ProjectDescriptionSection } from './sections/description-section'

export function ProjectPage(params: { project: Project }) {
  return (
    <>
      <ProjectHeaderSection title={params.project.title} showreel={params.project.showreel} />
      <ProjectDescriptionSection project={params.project} />
    </>
  )
}
