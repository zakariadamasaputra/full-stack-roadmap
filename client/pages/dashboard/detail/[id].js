import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { Alert } from '../../../config'
import Loading from '../../../components/Loading'
import BackToDashboard from '../../../components/BackToDashboard'

export async function getServerSideProps({ query, req }) {
  const cookies = new Cookies(req.headers.cookie)
  const { id } = query
  try {
    const res = await axios.get(`${process.env.API_URL}/roadmap/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    })
    return {
      props: {
        status: res.status,
        error: null,
        data: res.data.data,
        submitter: res.data.submitter,
      },
    }
  } catch (err) {
    return {
      props: {
        status: err.response.status,
        error: err,
        data: null,
      },
    }
  }
}

export default function Detail({ status, error, data, submitter }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(async () => {
    switch (status) {
      case 404:
        Alert.fire({
          icon: 'error',
          title: 'Data tidak ditemukan',
        }).then((res) => {
          if (res.isConfirmed) {
            router.push('/dashboard')
          }
        })
        break
      case 500:
        Alert.fire({
          icon: 'error',
          title: 'Data fetching gagal',
        }).then((res) => {
          if (res.isConfirmed) {
            router.push('/dashboard')
          }
        })
        break
    }
    if (data) setIsLoading(false)
  })

  return (
    <div>
      {' '}
      <Loading isLoading={isLoading} />
      <div className='px-6 md:px-56 lg:px-64 py-3 text-gray-200 space-y-4'>
        <p className='font-extrabold text-2xl flex justify-center'>Detail</p>
        <div>
          <BackToDashboard />
          {data && (
            <div
              className={`bg-${data.color} w-full rounded-md p-4 shadow-lg shadow-${data.color}/50 text-gray-800 space-y-1`}
            >
              <div className='flex items-center space-x-1'>
                <span className='font-bold'>Title:</span>{' '}
                <div className='flex space-x-1 items-center'>
                  <img
                    src={data.icon}
                    alt={`Icon ${data.icon}`}
                    className={`${data.title == 'Express' ? 'w-5' : 'h-5'}`}
                  />
                  <p>{data.title}</p>
                </div>
              </div>
              <div>
                <span className='font-bold'>Type:</span>{' '}
                <span>{data.type}</span>
              </div>
              <div>
                <p className='font-bold'>Description:</p>{' '}
                <p className='text-sm leading-snug text-justify'>
                  {data.description}
                </p>
              </div>
              <div>
                <p className='font-bold'>Video's Link:</p>{' '}
                <p className='break-all text-sm leading-snug'>
                  {data.linkVideo}
                </p>
              </div>
              <div>
                <p className='font-bold'>Documentation's Link:</p>{' '}
                <p className='break-all text-sm leading-snug'>
                  {data.linkDocs}
                </p>
              </div>
              <div>
                <span className='font-bold'>Submitted By:</span>{' '}
                <span>{submitter}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
