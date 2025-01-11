import { GetServerSideProps } from 'next'
import React from 'react'
import { sql } from '@vercel/postgres'
import { LayoutWithFooter } from '@/components/layouts/Layout'

interface Dataset {
  id: number
  name: string
  description: string
  file_name: string
}

interface HomeProps {
  datasets: Dataset[]
}

const Home = ({ datasets }: HomeProps) => {
  console.log(datasets)
  return (
    <LayoutWithFooter>
      <>
        <h1>OPEN3D Map</h1>
        {datasets.map((dataset) => (
          <div key={dataset.id}>
            <h2>{dataset.name}</h2>
            <p>{dataset.description}</p>
          </div>
        ))}
      </>
    </LayoutWithFooter>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const { rows } = await sql`SELECT * FROM open3d.datasets`

    return {
      props: {
        datasets: rows,
      },
    }
  } catch (error) {
    console.error('データベースクエリエラー:', error)
    return {
      props: {
        datasets: [],
      },
    }
  }
}
