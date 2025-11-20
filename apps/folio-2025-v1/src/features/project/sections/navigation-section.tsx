import { SectionGridFullPage } from '@/components/base/section-full-page'
import { Media, Project } from '@/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import { TP } from '@/components/typograpgy/p'

function Prevarrow() {
  return (
    <span className="relative flex items-center justify-center w-full h-full">
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.416667"
          y="0.416667"
          width="149.167"
          height="149.167"
          rx="74.5833"
          strokeWidth="0.833333"
          stroke="white"
        />
        <rect
          width="1"
          height="46.8496"
          transform="translate(51.248 75.4414) rotate(-135)"
          fill="white"
        />
        <rect
          width="1"
          height="46.8496"
          transform="translate(50.8057 75) rotate(-45)"
          fill="white"
        />
      </svg>
    </span>
  )
}

function Nextarrow() {
  return (
    <span className="relative flex items-center justify-center w-full h-full">
      <svg
        width="150"
        height="150"
        viewBox="0 0 150 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="-0.416667"
          y="0.416667"
          width="149.167"
          height="149.167"
          rx="74.5833"
          transform="matrix(-1 0 0 1 149.167 0)"
          stroke="white"
          strokeWidth="0.833333"
        />
        <rect
          width="1"
          height="46.8496"
          transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 98.752 75.4414)"
          fill="white"
        />
        <rect
          width="1"
          height="46.8496"
          transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 99.1943 75)"
          fill="white"
        />
      </svg>
    </span>
  )
}

function ProjectNavigation(props: { type: 'next' | 'prev'; id: number; image: Media }) {
  return (
    <Link
      href={`/projects/${props.id}`}
      className="relative flex items-center justify-center w-full h-full"
    >
      {props.type === 'next' ? (
        <TP className="font-made-mirage text-5xl uppercase">Next</TP>
      ) : (
        <TP className="font-made-mirage text-5xl uppercase">Previous</TP>
      )}
      <Image
        src={props.image.url ?? ''}
        alt={props.image.alt}
        width={4000}
        height={4000}
        className="h-full w-full object-cover absolute top-0 left-0 -z-10 brightness-55"
      />
    </Link>
  )
}

export function ProjectNavigationSection(params: {
  previousProject: Project | null
  nextProject: Project | null
}) {
  return (
    params.previousProject &&
    params.nextProject && (
      <SectionGridFullPage className="h-96 mx-0">
        {params.previousProject.id !== params.nextProject.id &&
          typeof params.previousProject.cover !== 'number' && (
            <ProjectNavigation
              type="prev"
              id={params.previousProject.id}
              image={params.previousProject.cover}
            />
          )}
        {typeof params.nextProject.cover !== 'number' && (
          <ProjectNavigation
            type="next"
            id={params.nextProject.id}
            image={params.nextProject.cover}
          />
        )}
      </SectionGridFullPage>
    )
  )
}
