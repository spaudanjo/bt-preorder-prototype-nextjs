import { NextPage } from 'next'
import { useRouter } from 'next/router'

const PreOrder: NextPage = () => {
  const router = useRouter()
  const { formId } = router.query

  return <p>Pre-Order form with id {formId}</p>
}

export default PreOrder
