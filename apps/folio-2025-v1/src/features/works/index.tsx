import config from '@/payload.config'
import { getPayload } from 'payload'
import { ProjectShowcase } from './project-showcase'

export async function WorksPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const response = await payload.find({
    collection: 'projects',
    populate: {
      skills: {
        name: true,
      },
      projectTypes: {
        name: true,
      },
    },
    where: {
      archive: {
        equals: false,
      },
    },
  })
  return (
    <>
      {response.docs.map((project) => (
        <ProjectShowcase
          key={project.id}
          projectId={project.id}
          title={project.title}
          endDate={project.endDate}
          client={project.clientName ?? ''}
          cover={typeof project.cover !== 'number' ? project.cover : undefined}
          skills={
            project.skills
              ? project.skills
                  .map((skill) => typeof skill !== 'number' && skill.name)
                  .filter((skill) => skill !== false)
              : []
          }
          projectType={
            project.projectType && typeof project.projectType !== 'number'
              ? project.projectType.name
              : ''
          }
        />
      ))}
    </>
  )
}
