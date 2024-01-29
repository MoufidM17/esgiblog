import { getServerSession } from "next-auth"
import authOptions from "./authOptions"
import { cookies, headers } from 'next/headers'

export default async function getServerSideProps() {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}