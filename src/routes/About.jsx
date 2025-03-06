import { createFileRoute } from '@tanstack/react-router'
import RouteComponent from '../pages/About'

export const Route = createFileRoute('/About')({
  component: RouteComponent,
})
