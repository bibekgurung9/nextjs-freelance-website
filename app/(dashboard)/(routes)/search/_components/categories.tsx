"use client"

import { Category } from "@prisma/client";
import {IconType} from 'react-icons'
import { LuBanana } from "react-icons/lu";
import { CategoryItem } from "./category-item";


interface CategoriesProps {
  items: Category[];
}

//                 change the icons later here ////////////////////
const iconMap: Record<Category["name"], IconType> = {
  "Programming and Development" : LuBanana,
  "Digital Marketing" : LuBanana,
  "Sales and Marketing" : LuBanana,
  "Writing and Content Creation" : LuBanana,
  "Graphic Design and Multimedia" : LuBanana,
  "Online Tutoring and Education" : LuBanana,
  "E-commerce Services" : LuBanana,
  "Consulting and Business Services" : LuBanana,
  "Health and Wellness" : LuBanana,
  "Administrative Support" : LuBanana,
  "Translation and Language Services" : LuBanana,
  "Event Planning" : LuBanana,
  "Real Estate Services" : LuBanana,
  "Engineering and Architecture" : LuBanana,
}

export const Categories = ({
  items,
}: CategoriesProps ) => {

  return(
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  )
}