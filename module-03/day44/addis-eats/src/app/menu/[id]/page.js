import React from 'react'
import NotFound from '../not-found'
import { getDishes } from '../dishes';
import { getDish } from '@/db';
export async function generateStaticParams() {
  const dishes = getDishes()
  return [
    { id: "doro-wat" },
    { id: "tibs" },
    { id: "shiro" },
    { id: "kitfo" },
  ];
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);

  if (!dish) {
    return {
      title: "Dish Not Found",
      description: "This dish could not be found on the Addis Eats menu.",
    };
  }

  return {
    title: dish.name,
    description: `${dish.nameEn} costs ${dish.priceETB} ETB.`,
  };
}

export default async function DishPage({ params }) {
  const { id } = await params
  const dish = await getDish(id);
  if (!dish) return <NotFound />
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.nameEn,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: dish.priceETB,
      priceCurrency: "ETB",
      availability: "https://schema.org/InStock",
    },
  };
  return (

    <div>
      dish ID {id}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </div>
  )
}
