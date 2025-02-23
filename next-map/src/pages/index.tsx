import React, { useEffect, useState } from 'react'
import { LayoutWithFooter } from '@/components/layouts/Layout'
import Article from '@/components/blocks/Article'
import { cultural_property as culturalPropertyService } from '@/domains/services'
import { CulturalProperties } from '@/domains/models/cultural_property'
import NavigationTab from '@/components/blocks/NavigationTab'

const Home = () => {
  const [properties, setProperties] = useState<CulturalProperties>([])

  const actions = {
    onload: async () => {
      const properties = await culturalPropertyService.getProperties()
      setProperties(properties)
    },
  }

  useEffect(() => {
    actions.onload()
  }, [])

  return (
    <LayoutWithFooter>
      <>
        <NavigationTab />
        {properties.map((property) => (
          <Article
            key={property.id}
            imageUrls={property.images.map((image) => image.image)}
            title={property.name}
            description={property.note ?? ''}
            linkHref={`/luma/${property.movies[0].id}`}
            linkText="3Dモデルを見る"
          />
        ))}
      </>
    </LayoutWithFooter>
  )
}

export default Home
