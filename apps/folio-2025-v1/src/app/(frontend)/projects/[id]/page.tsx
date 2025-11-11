import { ProjectPage } from '@/features/project'
import { Project } from '@/payload-types'
import config from '@/payload.config'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'

export default async function Page({ params }: { params: { id: string } }) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { id } = await params

  let project: Project

  try {
    project = await payload.findByID({
      collection: 'projects',
      id,
      depth: 1,
    })
  } catch (err) {
    console.error(err)
    return redirect('/')
  }

  return <ProjectPage project={project} />
}
