import { Collaborator, Role } from '@/payload-types'
import { TP } from '@/components/typograpgy/p'

export function CollaboratorCard(props: {
  collaborator: Collaborator
  roles: (number | Role)[]
  id: string
}) {
  const collaboratorName = props.collaborator.displayName ?? 'No Name'
  const rolesNames = props.roles.map((role) => typeof role !== 'number' && role.name)

  return (
    <div className="flex flex-row justify-between items-start gap-3 min-w-0 w-full">
      <TP key="name" className="flex-1 w-[188px]" title={collaboratorName}>
        {collaboratorName}
      </TP>
      <TP
        key="roles"
        className="text-right text-neutral-500 max-w-[270px] min-w-[188px]"
        title={rolesNames.join(' / ')}
      >
        {rolesNames.join(' / ')}
      </TP>
    </div>
  )
}
