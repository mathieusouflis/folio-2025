import { ProjectPage } from '@/features/project'
import { Project } from '@/payload-types'
import config from '@/payload.config'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export default async function Page({ params }: { params: { id: string } }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { id } = params

  let project: Project
  let previousProject: Project | null = null
  let nextProject: Project | null = null

  try {
    const allProjects = await payload.find({
      collection: 'projects',
      limit: 1000,
      depth: 0,
    })

    project = await payload.findByID({
      collection: 'projects',
      id,
      depth: 3,
    })

    const currentIndex = allProjects.docs.findIndex((p) => p.id === parseInt(id))

    if (currentIndex !== -1) {
      const previousIndex = currentIndex > 0 ? currentIndex - 1 : allProjects.docs.length - 1
      if (allProjects.docs[previousIndex]) {
        previousProject = await payload.findByID({
          collection: 'projects',
          id: allProjects.docs[previousIndex].id,
          depth: 3,
        })
      }

      const nextIndex = currentIndex < allProjects.docs.length - 1 ? currentIndex + 1 : 0
      if (allProjects.docs[nextIndex]) {
        nextProject = await payload.findByID({
          collection: 'projects',
          id: allProjects.docs[nextIndex].id,
          depth: 3,
        })
      }
    }
  } catch (err) {
    console.error(err)
    return redirect('/')
  }

  return (
    <ProjectPage project={project} previousProject={previousProject} nextProject={nextProject} />
  )
}
